import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';
import { auth, googleProvider } from './firebase.js';
import { NavLink, useNavigate, useSearchParams } from 'react-router';
import GoogleButton from 'react-google-button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/authSlice';

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [justSignedUp, setJustSignedUp] = useState(false);

  // Check if user just signed up and handle location storage
  useEffect(() => {
    const justSignedUpParam = searchParams.get('justSignedUp') === 'true';
    setJustSignedUp(justSignedUpParam);
    
    if (justSignedUpParam) {
      // User just signed up - use the original location from signup
      const originalLocation = localStorage.getItem('originalLocationBeforeSignup');
      if (originalLocation) {
        localStorage.setItem('returnAfterLogin', originalLocation);
        localStorage.removeItem('originalLocationBeforeSignup');
      }
    } else {
      // Normal login flow - store current location
      const returnLocation = {
        path: window.location.pathname,
        search: window.location.search,
        timestamp: Date.now()
      };
      localStorage.setItem('returnAfterLogin', JSON.stringify(returnLocation));
    }
  }, [searchParams]);


  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in

        userCredential.user.getIdToken().then(function (idToken){
            // log in with token from the backend and save it to local storage for future reference

            axios({
                method: 'POST',
                url: 'http://localhost:3000/login',
                'Authorization': `Bearer ${idToken}`
              })
                .then(function (response) {
                  console.log(response.data, " This is the data response from the server")
                  let userStuff = response.data
                  userStuff['token'] = idToken;
                  // Dispatch Redux action instead of calling saveUserData prop
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
                });
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });

}

function GoogleSignIn() {
  console.log('GoogleSignIn function called');
  console.log('Auth instance:', auth);
  console.log('Google provider:', googleProvider);
  
  // Store current location before redirect
  const returnLocation = {
    path: window.location.pathname,
    search: window.location.search,
    timestamp: Date.now()
  };

  localStorage.setItem('returnAfterLogin', JSON.stringify(returnLocation));
  console.log('Stored return location:', returnLocation);
  
  // Redirect to Google sign-in
  console.log('Starting Google sign-in redirect...');
  signInWithRedirect(auth, googleProvider)
    .then(() => {
      console.log('signInWithRedirect promise resolved - redirect should be happening');
    })
    .catch((error) => {
      console.log('Redirect error:', error);
      console.error('Full error details:', error);
      // Clean up stored location on error
      localStorage.removeItem('returnAfterLogin');
    });
};

  return (
    <>
        <main >
            <section>
                <div>
                    <p> FocusApp </p>
                    
                    {justSignedUp && (
                        <div style={{ 
                            backgroundColor: '#d4edda', 
                            color: '#155724', 
                            padding: '10px', 
                            borderRadius: '4px', 
                            marginBottom: '20px',
                            border: '1px solid #c3e6cb'
                        }}>
                            ✅ Account created successfully! Please sign in to continue.
                        </div>
                    )}

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

                    {!justSignedUp && (
                        <>
                            <div>OR</div>
                            <GoogleButton onClick={() => {GoogleSignIn()}} />
                        </>
                    )}

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