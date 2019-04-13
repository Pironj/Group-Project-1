var key = "jDG8c4z6my6XH8jVVebKu6i6eNqK1fY7";
var artist = "black";
var genre = "";
var size = 10;
var zip = "";
var city = "seattle";

var queryURL = "https://app.ticketmaster.com/discovery/v2/events?keyword=" + artist + "&city=" + city + "&postalCode=" + zip + "&size=" + size + "&apikey=" + key;


$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  // console.log(response);

  for (var i = 0; i < response._embedded.events.length; i++) {
    console.log(response._embedded.events.length);
    console.log(response._embedded.events[i].name);
    console.log(response._embedded.events[i].dates.start.localTime);
    console.log(response._embedded.events[i].dates.start.localDate);
    console.log(response._embedded.events[i]._embedded.venues[0].name);
    console.log(response._embedded.events[i].url);

    var artist = response._embedded.events[i].name;
    var time = response._embedded.events[i].dates.start.localTime;
    var date = response._embedded.events[i].dates.start.localDate;
    var venue = response._embedded.events[i]._embedded.venues[0].name;
    var buyTicket = response._embedded.events[i].url;

    var newRow = $('<tr>').append(
      $('<td>').text(artist),
      $('<td>').text(venue),
      $('<td>').text(date),
      $('<td>').text(time),
      $('<td>').html('<a href="' + buyTicket + '" class="btn btn-primary btn-lg" tabindex="-1" target="_blank" role="button" aria-disabled="true">Tickets</a>'),
      // $('<td>').html('<button><a target="_blank" href=' + buyTicket + '>Tickets</a></button>'),
    );

    $('#table-info > tbody').append(newRow)


  }
  console.log(response);

});