import axios from 'axios';
import { useEffect } from 'react';

export default function ProfilePage () {
  let username = 'placeholder name'
  let email = 'placeholder@email.com'
  let timeJoined = 'March 3rd, 1994'

  // axios.get('/userProfile', )

  // Favorite Quotes (view all favorited)
      // sort by time added or series name
      // ascending or descending
      // paginate results over a certain number

  return (
    <>
    <div>Hello {username}</div>
    <div className="stats">
      <div>Email {email}</div>
      <div>Date joined {timeJoined}</div>
    </div>
    <div>
      <div>View Bookmarked Quotes</div>
      <div>Quote Cards Go Here</div>
    </div>
    </>
  )
}