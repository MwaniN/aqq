import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router'
import { createUserWithEmailAndPassword, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from './firebase.js'
import GoogleButton from 'react-google-button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/authSlice';


export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Store ORIGINAL location when user navigates to signup page
  useEffect(() => {
    const originalLocation = {
      path: window.location.pathname,
      search: window.location.search,
      timestamp: Date.now()
    };
    localStorage.setItem('originalLocationBeforeSignup', JSON.stringify(originalLocation));
  }, []);

  // Handle Google sign-in redirect result
  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result) {
        // User signed in via redirect
        result.user.getIdToken().then((idToken) => {
          axios({
            method: 'POST',
            url: 'http://localhost:3000/signup',
            headers: {
              'Authorization': `Bearer ${idToken}`
            }
          })
          .then((response) => {
            console.log(response.data, " This is the data response from the server")
            let userStuff = response.data
            userStuff['token'] = idToken;
            dispatch(setUserData(userStuff))
            
            // Return to original location or home
            const returnLocation = localStorage.getItem('returnAfterLogin');
            if (returnLocation) {
              try {
                const location = JSON.parse(returnLocation);
                localStorage.removeItem('returnAfterLogin');
                
                // Check if the stored location is not too old (24 hours)
                const isExpired = Date.now() - location.timestamp > 24 * 60 * 60 * 1000;
                if (!isExpired) {
                  navigate(location.path + location.search);
                } else {
                  navigate('/');
                }
              } catch (error) {
                console.log('Error parsing return location:', error);
                localStorage.removeItem('returnAfterLogin');
                navigate('/');
              }
            } else {
              navigate('/');
            }
          })
          .catch((error) => {
            console.log('Error after redirect:', error);
            navigate('/');
          });
        });
      }
    }).catch((error) => {
      console.log('Redirect result error:', error);
    });
  }, [dispatch, navigate]);

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
                          
                          // Redirect to login page after successful signup
                          navigate("/login?justSignedUp=true");
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
      // Store current location before redirect
      const returnLocation = {
        path: window.location.pathname,
        search: window.location.search,
        timestamp: Date.now()
      };
      
      localStorage.setItem('returnAfterLogin', JSON.stringify(returnLocation));
      
      // Redirect to Google sign-in
      signInWithRedirect(auth, googleProvider).catch((error) => {
        console.log('Redirect error:', error);
        // Clean up stored location on error
        localStorage.removeItem('returnAfterLogin');
      });
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