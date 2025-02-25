// import axios from 'axios';

export default function ProfilePage () {
  let email = 'placeholder@email.com'
  let timeJoined = 'March 3rd, 1994'

  // axios.get('/userProfile', )

  // user email
  // date joined
  // Favorite Quotes (view all favorited)
      // sort by time added or series name
      // ascending or descending
      // paginate results over a certain number

  return (
    <>
    <div>Welcome to your profile page</div>
    <div className="stats">
      <div>User {email}</div>
      <div>Date joined {timeJoined}</div>
    </div>
    <div>Bookmarked Quotes</div>
    <div>Quote Cards Go Here</div>
    </>
  )
}