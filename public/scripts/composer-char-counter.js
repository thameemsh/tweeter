$(document).ready(function() {

// Counter for test area

  $('#tweet-text').on('keyup', function() {
    //Get the length of the textarea after deducting 140
    let tweetLen = 140 - $(this).val().length;
    // Navigate to common parent node and find the counter from there. $('.counter') is bad practice
    const $counter = $(this).parentsUntil(".tweetcount").find(".counter")
    // Update the counter.text
    $counter.text(tweetLen);
     // to change the color to red when characters exceed 140 by adding seperate class else remove that class.
    if(tweetLen < 0){
      return $counter.addClass('overlimit');
    } else {
      $counter.removeClass('overlimit');
    }

  })
  

});