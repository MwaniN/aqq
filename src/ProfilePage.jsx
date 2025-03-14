
export default function ProfilePage ({userData}) {

  console.log(userData, " user Data from the profile page")

  //let username = 'placeholder name'
  let email = userData.email || ""

  if (userData) {
    var dateJoined = new Date(Number(userData.date_joined))
  }

  console.log(dateJoined, " this is datejoined now")
  // axios.get('/userProfile', )

  // Favorite Quotes (view all favorited)
      // sort by time added or series name
      // ascending or descending
      // paginate results over a certain number

      if (userData){
        return (
          <>
          <div>Profile</div>
          <div className="stats">
            <div>User : {email}</div>
            <div>Joined : {dateJoined.toDateString()}</div>
          </div>
          <div>
            <div>View Bookmarked Quotes</div>
            <div>Quote Cards Go Here</div>
          </div>
          </>
        )
      } else {

        return "Not logged in"
      }


}