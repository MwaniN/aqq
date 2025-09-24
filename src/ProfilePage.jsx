
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  // Get auth state from Redux
  const { isAuthenticated, userData, isLoading } = useSelector(state => state.auth);

  console.log(userData, " user Data from the profile page")

  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>
  }

  // Show not logged in message only after auth check is complete
  if (!isAuthenticated || !userData) {
    return <div>Not logged in</div>
  }

  // User is authenticated, show profile
  let email = userData.email || ""
  let dateJoined = userData.date_joined ? new Date(Number(userData.date_joined)) : new Date()
  let highScore = userData.high_score || 0

  return (
    <>
      <div>Profile</div>
      <div className="stats">
        <div>User : {email}</div>
        <div>Joined : {dateJoined.toDateString()}</div>
      </div>
      <div>
        <div>High Score</div>
        <div>{highScore}</div>
      </div>
    </>
  )

}