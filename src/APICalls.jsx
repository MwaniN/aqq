import axios from 'axios';


export function APICalls (setQuote, setCorrectAnime, setChoices) {

  console.log("We're in the function")

   // retrive the first anime quote
   axios.get(`http://localhost:3000/randomQuote`
   ).then(function (response) {
     // console.log(response.data, " This is response.data")
     // console.log(response.data.anime, " This is response.anime")
   setQuote(response.data.content);
   setCorrectAnime(response.data.anime.name);

   axios.get(`http://localhost:3000/random3Anime`
   ).then( function (response) {
     // console.log(response, ' This is the response from the random3Anime call')
     setChoices(response.data)
     // console.log(choices, " This is the initial choices state Array")
   }
   ).catch(
     function(error) {
       if (error.response) {
         // The request was made and the server responded with a status code
         // that falls out of the range of 2xx
         console.log(error.response.data);
         console.log(error.response.status);
         console.log(error.response.headers);
       } else if (error.request) {
         // The request was made but no response was received
         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
         // http.ClientRequest in node.js
         console.log(error.request);
       } else {
         // Something happened in setting up the request that triggered an Error
         console.log('Error', error.message);
       }
       console.log(error.config);
     }
   )

 }).catch(
   function(error) {
     if (error.response) {
       // The request was made and the server responded with a status code
       // that falls out of the range of 2xx
       console.log(error.response.data);
       console.log(error.response.status);
       console.log(error.response.headers);
     } else if (error.request) {
       // The request was made but no response was received
       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
       // http.ClientRequest in node.js
       console.log(error.request);
     } else {
       // Something happened in setting up the request that triggered an Error
       console.log('Error', error.message);
     }
     console.log(error.config);
   }
 )

 return
}