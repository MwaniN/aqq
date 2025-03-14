# Anime Quote Quiz

Anime Quote Quiz is a game where users can guess which anime various quotes are from.

## Technology

The frontend utilizes:
* Vite
* React.js
* JavaScript
* Firebase Auth
* Axios

The backend:
* Node.js
* Express
* PostgreSQL
* Firebase Admin
* Axios

APIs:

* [Animechan.io](https://animechan.io/) provides the anime quote API.
* The frontend and backend interact using endpoints I designed in Node.js on the server side.

## Functionality

Users can choose a game length and answer 5, 10, or 15 questions. A random anime quote is returned each time and they're given the option of choosing from among popular anime, which is the correct choice. If right, they are awarded a point.

Users can also sign up / log in using Firebase Auth. If they are logged in they will see other options such as a profile page where they can see information about their specific profile such as date joined and number of games played.

## Future

I want to add more features in the future like allowing users to bookmark their favorite quotes, and the CSS is only a placeholder for now.

This is still actively in development so lots more is coming including refining the profile page and improving the robustness of the login and user management such as password resets and checking for a strong password.

I have a domain ready to deploy this on and will update when it's ready for V1 to go live.

## Contributing

I may create my own anime quote database which will undoubtedly be a long endeavor. If anyone is willing to contribute, please let me know!

Benefits of creating my own database would be I could improve the response times from the server, I could control how many quotes are from which anime so that some aren't overrepresented, and I could provide each quote with a unique ID (which animechan.io doesn't have currently) which would allow for easily bookmarking favorite quotes for users.

Please reach out if you have any questions!

Please Note: This is a work in progress and everything is subject to change, the above is a representation of where things are today.