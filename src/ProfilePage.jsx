
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
  let totalGamesPlayed = userData.total_games_played || 0

  // Game-specific stats
  let highScore5 = userData.high_score_5 || 0
  let highScore10 = userData.high_score_10 || 0
  let highScore15 = userData.high_score_15 || 0
  let gamesPlayed5 = userData.games_played_5 || 0
  let gamesPlayed10 = userData.games_played_10 || 0
  let gamesPlayed15 = userData.games_played_15 || 0

  return (
    <>
      <div>Profile</div>
      <div className="stats">
        <div>User : {email}</div>
        <div>Joined : {dateJoined.toDateString()}</div>
        <div>Total Games Played : {totalGamesPlayed}</div>
      </div>
      
      <div className="game-stats">
        <div className="stat-section">
          <h3>5 Question Games</h3>
          <div>High Score: {highScore5}</div>
          <div>Games Played: {gamesPlayed5}</div>
        </div>
        
        <div className="stat-section">
          <h3>10 Question Games</h3>
          <div>High Score: {highScore10}</div>
          <div>Games Played: {gamesPlayed10}</div>
        </div>
        
        <div className="stat-section">
          <h3>15 Question Games</h3>
          <div>High Score: {highScore15}</div>
          <div>Games Played: {gamesPlayed15}</div>
        </div>
      </div>
    </>
  )

}