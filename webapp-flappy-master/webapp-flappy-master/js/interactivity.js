jQuery('#scoreBtn').on('click', function() {
  jQuery('#content').empty();
  jQuery('#content').append(
    '<p>'+'Scores: '+ labelScore +'</p>'+'<br/>'
  )
  jQuery('#scoreBtn').addClass('active');
  jQuery('#helpBtn').removeClass('active');
  jQuery('#creditsBtn').removeClass('active');
})

jQuery('#helpBtn').on('click', function() {
  jQuery('#content').empty();
  jQuery('#content').append(
    '<p>'+'Help'+'</p>'+'<br/>'
  )
  jQuery('#scoreBtn').removeClass('active');
  jQuery('#helpBtn').addClass('active');
  jQuery('#creditsBtn').removeClass('active');
})

jQuery('#creditsBtn').on('click', function() {
  jQuery('#content').empty();
  jQuery('#content').append(
    '<p>'+'This game was made by the king himself:'+'<br/>'+'Pepe'+'</p>'
  )
  jQuery('#scoreBtn').removeClass('active');
  jQuery('#helpBtn').removeClass('active');
  jQuery('#creditsBtn').addClass('active');
})

function registerScore(score) {
  var name = prompt("What is your name?");
  var scoreEntry = "<li>" + name + ": " + score.toString() + "</li>";
  $("#scores").append(scoreEntry);
}
