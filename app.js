var key = "jDG8c4z6my6XH8jVVebKu6i6eNqK1fY7";
var artist = "punk";
var genre = "";
var size = 10;
var zip = "";
var city = "";

var queryURL = "https://app.ticketmaster.com/discovery/v2/events?keyword=" + artist + "&city=" + city + "&postalCode=" + zip + "&size=" + size + "&apikey=" + key;


$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  console.log(response);

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
    var address = response._embedded.events[i]._embedded.venues[0].address.line1;
    city = response._embedded.events[i]._embedded.venues[0].city.name;
    var state = response._embedded.events[i]._embedded.venues[0].state.stateCode;
    zip = response._embedded.events[i]._embedded.venues[0].postalCode;
    var buyTicket = response._embedded.events[i].url;

    var location = $('<div>');
    location.append(address);
    var locCityState = $('<div>');
    locCityState.append(city + ', ' + state);
    location.append(locCityState);
    var locZip = $('<div>');
    locZip.append(zip);
    location.append(locZip);
    var directions = $('<a>Directions</a>');
    directions.attr('href', "https://www.google.com/maps/place/" + address);
    location.append(directions);


    var newRow = $('<tr>').append(
      $('<td>').text(artist),
      $('<td>').append(location),
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