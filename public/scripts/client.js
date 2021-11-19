
$(document).ready(function () {

  //Function to generate tweet post body
  const createTweetElement = function (tweet) {

    let $tweet = `<article >
               <header class="old-tweet-header">
<div class="old-header-left">
<img class = "old-tweet-img" src="${tweet.user.avatars}" > 
<span class="img-name-tag" >${tweet.user.name}</span>
</div>
<span class="name-tag">${tweet.user.handle}</span>
</header>

<div class="old-tweet-text">
<p id="past-tweet">${escape(tweet.content.text)}</p>
</div>
<footer class="old-tweet-footer">
<div class="time passed">${timeago.format(tweet.created_at)}</div>
<div class="react icons">
<i class="fas fa-flag"></i>
<i class="fas fa-retweet"></i>
<i class="fas fa-heart"></i>
</div>
</footer>
</article>`

    return $tweet;
  }

  // To render several tweets
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      console.log(tweet)
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }

  // Escape function to avoid cross Site Scripting(XSS)
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Ajax get request and rendering tweets in the page
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then((response) => renderTweets(response));
  }

  //Calling the function to populate the page with previous tweets
  loadTweets()

  // Ajax post request up on submitting the form
  $("#tweet-form").submit(function (event) {
    event.preventDefault();

    const serializedFormData = $(this).serialize();
    let tweetLen = $(this).find('#tweet-text').val().length
    if (tweetLen > 140) {
      $(".errorLong").fadeIn().fadeOut(3000)
    } else if (tweetLen === 0) {
      $(".errorShort").fadeIn().fadeOut(3000)
    } else {
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: serializedFormData,
      })
        .then(function () {
          $('#tweet-text').val("")
          $(".counter").text(140)
          $("#tweets-form").empty();
          loadTweets()
        });
    }
  });


});

