import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signInWithRedirect, signInWithPopup } from 'firebase/auth';
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
    }
    // Note: Location capture is now handled in App.jsx handleSignInClick()
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
  // Initialize logs array
  let logs = JSON.parse(localStorage.getItem('googleSignInLogs') || '[]');
  
  const log = (message, data = null) => {
    const logEntry = { message, data, timestamp: new Date().toISOString() };
    logs.push(logEntry);
    console.log(message, data);
    // Immediately save to localStorage
    localStorage.setItem('googleSignInLogs', JSON.stringify(logs));
  };

  log('GoogleSignIn function called');
  log('Auth instance:', auth);
  log('Google provider:', googleProvider);
  log('Current URL:', window.location.href);
  log('Current origin:', window.location.origin);
  
  // Note: Location capture is now handled in App.jsx handleSignInClick()
  // The return location should already be stored when user clicked "Sign In"
  
  // Try popup first as a workaround for localhost redirect issues
  log('Starting Google sign-in with popup (redirect fallback)...');
  
  try {
    log('About to call signInWithPopup...');
    const popupPromise = signInWithPopup(auth, googleProvider);
    log('signInWithPopup called, promise created');
    
    popupPromise
      .then(async (result) => {
        log('Popup sign-in successful:', result);
        
        // Process the result immediately
        const idToken = await result.user.getIdToken();
        log('Got ID token from popup:', idToken);
        
        // Call backend to get user data
        const response = await axios({
          method: 'POST',
          url: 'http://localhost:3000/login',
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        });
        
        log('Backend response:', response.data);
        const userData = { ...response.data, token: idToken };
        
        // Save to localStorage
        localStorage.setItem('aqqUserInfo', JSON.stringify(userData));
        log('Saved user data to localStorage:', userData);
        
        // Dispatch to update Redux state
        dispatch(setUserData(userData));
        log('Dispatched setUserData to Redux');
        
        // Check Redux state after dispatch
        setTimeout(() => {
          const currentState = JSON.parse(localStorage.getItem('aqqUserInfo') || 'null');
          log('Current Redux state check:', currentState);
        }, 100);
        
        // Handle navigation
        log('Starting navigation logic...');
        const returnLocation = localStorage.getItem('returnAfterLogin');
        log('Return location from localStorage:', returnLocation);
        
        if (returnLocation) {
          try {
            const location = JSON.parse(returnLocation);
            log('Parsed return location:', location);
            localStorage.removeItem('returnAfterLogin');
            
            // Check if the stored location is not too old (24 hours)
            const isExpired = Date.now() - location.timestamp > 24 * 60 * 60 * 1000;
            log('Location expired?', isExpired);
            
            if (!isExpired && location.path !== '/login') {
              // Only navigate to the stored location if it's not the login page
              log('Navigating to:', location.path + location.search);
              navigate(location.path + location.search);
            } else {
              // If expired or trying to go back to login page, go to home instead
              log('Location expired or is login page, navigating to home');
              navigate('/');
            }
          } catch (error) {
            log('Error parsing return location:', error);
            localStorage.removeItem('returnAfterLogin');
            log('Navigating to home due to parse error');
            navigate('/');
          }
        } else {
          log('No return location, navigating to home');
          navigate('/');
        }
      })
      .catch((error) => {
        log('Popup sign-in error:', error);
        log('Full error details:', error);
        
        // If popup fails, try redirect as fallback
        log('Popup failed, trying redirect as fallback...');
        signInWithRedirect(auth, googleProvider).catch((redirectError) => {
          log('Redirect fallback also failed:', redirectError);
          localStorage.removeItem('returnAfterLogin');
        });
      });
  } catch (error) {
    log('Exception during signInWithPopup:', error);
  }
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