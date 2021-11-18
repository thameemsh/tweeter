
$(document).ready(function () {
  const createTweetElement = function (tweet) {


    let $tweet = `<article >
<header class="old-tweet-header">
<div class="old-header-left">
<img class = "old-tweet-img" src="${tweet.user.avatars}" > 
<span>${tweet.user.name}</span>
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

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const renderTweets = function (tweets) {

    for (const tweet of tweets) {
      console.log(tweet)
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }

  const loadTweets = function () {
    $.ajax({
      url: `/tweets`,
      method: 'GET',
    })
      .then(function (tweetresponse) {
        renderTweets(tweetresponse);
      });
  }


  $("#tweet-form").submit(function (event) {
    event.preventDefault();
    const $form = $(this);
    const serializedFormData = $form.serialize();

    let tweetLen = $('#tweet-text').val().length
    if (tweetLen > 140) {
      $(".errorLong").fadeIn().fadeOut(3000)
    } else if (tweetLen <= 0) {
      $(".errorShort").fadeIn().fadeOut(3000)
    } else {

      $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: serializedFormData,
        success: loadTweets()
      });
      $("form")[0].reset();
    }
  });

  loadTweets();
});

