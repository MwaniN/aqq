import axios from 'axios';


export function APICalls (setQuote, setCorrectAnime, setChoices) {

   // retrive the first anime quote
   axios.get(`http://localhost:3000/randomQuote`
   ).then(function (response) {
     console.log(response.data, " This is response.data")
   setQuote(response.data.content);
   setCorrectAnime(response.data.anime.name);

   // update the following call to prevent duplicated names
   // could be handled on the backend passing in the name retrieved in the first call

   axios.get(`http://localhost:3000/random4Anime`
   ).then( function (response) {
    
     setChoices(response.data)

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