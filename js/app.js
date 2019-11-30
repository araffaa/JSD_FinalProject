$(function () {

var url = "https://api.themoviedb.org/3/search/movie?"
var counter= 0; // check if search has been clicked or not

$('#search').on('click',function(){
 // console.log("i'm here");
  var title = $('#term').val();
  url += '&api_key=' + newapikey + '&query=' + title ;
  console.log(title);
$.get(url).done(function(response) {
    console.log(response);
    if (response.stat === 'fail') {
      console.log(response.message); // point out that for end users, we'll want to use DOM manipulation, but this is a quick and dirty
  // way of seeing if there's an error while we're building the app
    }  else {
      // Handle the successful response here
      console.log('Request succeeded!');
      // note that we will replace this with code to handle the data when it's received; this is just
      // to make sure our code is working to this point
     handleResponseSuccess(response);
    }
  });

  function handleResponseSuccess(response) {
    var Data = response.results; // not a jQuery object, so we have to use $.each below
    counter ==0 ? counter++ : $('.images').empty() ; // to check if first search or not + clear old search results from images container
    $.each(Data, function() {
      if(this.poster_path != null){
      var element = $('<img>').attr('src', "http://image.tmdb.org/t/p/w500/"+ this.poster_path).addClass('image');
      $('.images').append(element);
      }
      
    });
  }
});
});
// $(function () {

// var url = "http://www.omdbapi.com/?"


// var options = {
//     title: "john wick"
// }

// url += 't=' + options.title + '&apikey=' + apiKey;


// $.get(url).done(function(response) {
//     console.log(response);
//     if (response.stat === 'fail') {
//       console.log(response.message); // point out that for end users, we'll want to use DOM manipulation, but this is a quick and dirty
//   // way of seeing if there's an error while we're building the app
//     }  else {
//       // Handle the successful response here
//       console.log('Request succeeded!');
//       // note that we will replace this with code to handle the data when it's received; this is just
//       // to make sure our code is working to this point
//      // handleResponseSuccess(response);
//     }
//   });
// });

