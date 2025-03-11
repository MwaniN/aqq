import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase.js'
import GoogleButton from 'react-google-button';
import axios from 'axios';


export default function SignUp ({saveUserData}) {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e)  => {
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
                userCredential.user.getIdToken().then(function (idToken){
                    // send idToken to the backend
                    axios({
                        method: 'POST',
                        url: 'http://localhost:3000/signup',
                        headers: {
                            'Authorization': 'Bearer ' + idToken
                        }
                      })
                        .then(function (response) {
                          console.log(response, " This is the response from the server")
                          navigate("/")
                        });
                })
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
      });
    }

    function GoogleSignIn() {
        signInWithPopup(auth, googleProvider).then((userCredential) => {
             // Signed in
             userCredential.user.getIdToken().then(function (idToken){
                 // send idToken to the backend
                 axios({
                     method: 'POST',
                     url: 'http://localhost:3000/signup',
                     headers: {
                         'Authorization': 'Bearer ' + idToken
                     }
                   })
                     .then(function (response) {
                       console.log(response, " This is the response from the server")
                       saveUserData(response)
                       navigate("/")
                     });
             })
        }
        ).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        })
        };



  return (<main >
    <section>
        <div>
            <div>
                <h1> FocusApp </h1>
                <form>
                    <div>
                        <label htmlFor="email-address">
                            Email address
                        </label>
                        <input
                            type="email"
                            label="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email address"
                        />
                    </div>

                    <div>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            label="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={onSubmit}
                    >
                        Sign up
                    </button>

                </form>

                <div>OR</div>
                <GoogleButton onClick={() => {GoogleSignIn()}} />

                <p>
                    Already have an account?{' '}
                    <NavLink to="/login" >
                        Sign in
                    </NavLink>
                </p>
            </div>
        </div>
    </section>
</main>)
}