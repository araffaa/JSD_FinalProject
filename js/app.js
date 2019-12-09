$(function () {

var url = "https://api.themoviedb.org/3/search/movie?"
var firstSearch= 0; // check if search has been clicked or not
var Data;// to hold response data
var counter=0; // search result counter
$('#search').on('click',function(){
 // console.log("i'm here");
  var title = $('#term').val();
  url += '&api_key=' + newapikey + '&query=' + title ;
  console.log(title);

$.get(url).done(function(response) {
    console.log(response);
    if (response.stat === 'fail') {
      console.log(response.message); 
    }  else {
      // Handle the successful response
      console.log('Request succeeded!');
     handleResponseSuccess(response);
     $('#searchResult').html('Search for <strong>'+title+"</strong> is complete: <strong>"+counter+" Results</strong>")
     counter=0; //reset counter for incase of mutliple search to get accurate counter for each search
    }
  });

  function handleResponseSuccess(response) {
     Data = response.results;
    var index=0; // to get index of results array
    firstSearch ==0 ? firstSearch++ : $('.images').empty() ; // to check if first search or not + clear old search results from images container
    $.each(Data, function() {
      if(this.poster_path != null){
      var element = $('<img>').attr('src', "http://image.tmdb.org/t/p/w500/"+ this.poster_path).addClass('image shrink');
      element.attr('id',index++);// add current index as id to img tag
      $('.images').append(element);
      counter++;
      }
      else{
        index++; // keep increasing incase of null poster
      }
      
    });
    $('img').on('click', function(){
      var poster="<img class=responsive-img src= http://image.tmdb.org/t/p/w500/"+ Data[$(this).attr('id')].poster_path +" >"
      var mtitle=Data[$(this).attr('id')].title
      var overview='<span class="black-text" style="font-size:large"><strong style="font-weight: bold">Plot: </strong>'+ Data[$(this).attr('id')].overview+'</span><br><br>'
      var rating='<span class="black-text" style="font-size:large"><strong style="font-weight: bold">Rating: </strong>'+ Data[$(this).attr('id')].vote_average+'</span><br><br>'
      var releaseDate='<span class="black-text" style="font-size:large"><strong style="font-weight: bold">Release Date: </strong>'+ Data[$(this).attr('id')].release_date+'</span><br><br>'
      localStorage.setItem('mPoster',poster);
      localStorage.setItem('mTitle',mtitle);
      localStorage.setItem('mOverview',overview);
      localStorage.setItem('mRating',rating);
      localStorage.setItem('mReleaseDate',releaseDate);
      window.open("details.html")


    })
  }
});
});