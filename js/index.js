$(document).ready(function() {
    setInterval(function() {
      if (!$("#input").is(':focus'))
        $("#search-btn").effect("bounce");
    }, 2000);
});

function checkActive() {
  var value = $.trim($("#input").val());
  if (value.length > 0) {
    return true;
  } else
    return false;
}
//click on magnifying glass
$('.input-elements').click(function(event) {
  $('.author').hide();
  $('#input').show(1000);
  $('#input').focus();
  $('html').animate({
    backgroundColor: "#373737"
  }, 1000);
  event.stopPropagation();
});
//click outside the input div
$('.container').click(function() {
  if (!checkActive()) {
    $('.suggestions').empty();
    $('.author').show();
    $('#input').hide(1000);
    $('html').animate({
      backgroundColor: "#cccccc"
    }, 1000);
    $('#input').val("");
  }
});
//on key press
$('#input').keyup(function() {
  addSuggestions();
});

function getAPIurl() {
  var searchTerm = $("#input").val();
  return "https://en.wikipedia.org/w/api.php?action=query&format=json&uselang=user&prop=&list=search&continue=&formatversion=2&srsearch=" + searchTerm + "&srnamespace=0&srlimit=10&srqiprofile=classic&srwhat=text&srinfo=suggestion%7Crewrittenquery%7Ctotalhits&srprop=snippet&srenablerewrites=1&callback=?";
}

function addSuggestions() {
  $.getJSON(getAPIurl(),
    function(api) {
      var hits = api.query.searchinfo.totalhits;
      if (hits > 10)
        hits = 10;
      $('.sug').remove();
      for (var i = 0; i < hits; i++) {
        var title = api.query.search[i].title;
        var url = "http://en.wikipedia.org/wiki/" + title;
        $("<a class=\"title sug\" href=\"" + url + "\"target=\"_blank\"><p>" + title + "</p></a>").appendTo('.suggestions');
        var snippet = api.query.search[i].snippet;
        $("<p class=\"snippet sug\">" + snippet + "</p>").appendTo('.suggestions');
      }
    });
}