/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // const $tweet = $(`<article class="tweet">Hello world</article>`);

//   // Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    
    "user": {
              "name": "Descartes",
              "avatars": "https://i.imgur.com/nlhLi3I.png",
              "handle": "@rd" },
"content":  {
              "text": "Je pense , donc je suis"
             },
    "created_at": 1461113959088
  },

 
]

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for(const tweet of tweets){
    const $tweet = createTweetElement(tweet)
    $('#tweets-container').append($tweet);
    }
  }
  

const createTweetElement = function(tweet) {
  let $tweet = `<article >
  <header class="old-tweet-header">
  <div class="old-header-left">
  <img class = "old-tweet-img" src="${tweet.user.avatars}" > 
  <span>H${tweet.user.name}</span>
  </div>
  <span class="name-tag">${tweet.user.handle}</span>
  </header>
  
  <div class="old-tweet-text">
  <p id="past-tweet">${tweet.content.text}</p>
  </div>
  <footer class="old-tweet-footer">
  <div class="time passed">${timeago.format(tweet.created_at)}</div>
  <div class="react icons">
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
  </div>
  </footer>
  </article>
  `
  return $tweet;
}

renderTweets(data);



$( "#tweet-form" ).submit(function( event ) {
  // alert( "Handler for .submit() called." );
  event.preventDefault();
  
  //Getting the form data
  const $form = $(this);

//Sending AJAX post request
  $.ajax({
    url: $form.attr('action'),
    type: $form.attr('method'),
    data: $form.serialize(), 
  });
});

// $(function() {
//   const $button = $('#button');
//   $button.on('click', function (event) {
//     event.preventDefault();
//     $.ajax('more-posts.html', { method: 'GET' })
//     .then(function (morePostsHtml) {
//       console.log('Success: ', morePostsHtml);
//       $button.replaceWith(morePostsHtml);
//     });
//   });
// });


// Attach a submit handler to the form
// $( "#searchForm" ).submit(function( event ) {
 
//   // Stop form from submitting normally
//   event.preventDefault();
 
//   // Get some values from elements on the page:
//   const $form = $( this ),
//     term = $form.find( "input[name='s']" ).val(),
//     url = $form.attr( "action" );
 
//   // Send the data using post
//   var posting = $.post( url, { s: term } );
 
//   // Put the results in a div
//   posting.done(function( data ) {
//     var content = $( data ).find( "#content" );
//     $( "#result" ).empty().append( content );
//   });
});