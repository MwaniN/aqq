import { useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase.js';
import { NavLink, useNavigate } from 'react-router';
import GoogleButton from 'react-google-button';


export default function LogIn () {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.getIdToken().then(function (idToken){
            // send idToken to the backend
            navigate("/")
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });

}

function GoogleSignIn() {
    signInWithPopup(auth, googleProvider).then((userCredential) => {
        const user = userCredential.user;
        const idToken = user.getIdToken();
        navigate("/")
        console.log(idToken);
    }
    ).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    })
    };

  return (
    <>
        <main >
            <section>
                <div>
                    <p> FocusApp </p>

                    <form>
                        <div>
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Email address"
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <button
                                onClick={onLogin}
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <div>OR</div>
                    <GoogleButton onClick={() => {GoogleSignIn()}} />

                    <p className="text-sm text-white text-center">
                        No account yet? {' '}
                        <NavLink to="/signup">
                            Sign up
                        </NavLink>
                    </p>

                </div>
            </section>
        </main>
    </>
)
}