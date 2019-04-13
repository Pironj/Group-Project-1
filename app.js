
$(document).ready(function () {

  // Variable to store # of site visits in total
  var conCount = 0;


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAWzfwScYLalCRmNEnnX5--T1r3wikyBB4",
    authDomain: "eventhunter-46970.firebaseapp.com",
    databaseURL: "https://eventhunter-46970.firebaseio.com",
    projectId: "eventhunter-46970",
    storageBucket: "eventhunter-46970.appspot.com",
    messagingSenderId: "385498394865"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // All of our connections will be stored in this directory.
  var connectionsRef = database.ref("/connections");
  var connectedRef = database.ref(".info/connected"); //.info/connected is a special firebase selector taht tells the client if a user is connected.

  // When the client's connection state changes...
  connectedRef.on("value", function (snap) { // .on event listener for whenever a value changes "value" we run this function. (snap) or (snapshot) can name whatever you want is literally just the data

    // If they are connected..
    if (snap.val()) { // snap is an object and has methods on it .val().  if true; snap.val() similar to ajax response.
      var con = connectionsRef.push(true);
      // increment site visit per connection
      conCount++;
      con.onDisconnect().remove();
    }
  });
  connectionsRef.on("value", function (snap) {
    $(".card-footer").text("Site Visits: " + conCount + ' ' + "# Watching: " + snap.numChildren());
  });

});


console.clear();


//bg img JQuery
class Slideshow {

  constructor() {
    this.initSlides();
    this.initSlideshow();
  }

  // Set a `data-slide` index on each slide for easier slide control.
  initSlides() {
    this.container = $('[data-slideshow]');
    this.slides = this.container.find('img');
    this.slides.each((idx, slide) => $(slide).attr('data-slide', idx));
  }

  // Pseudo-preload images so the slideshow doesn't start before all the images
  // are available.
  initSlideshow() {
    this.imagesLoaded = 0;
    this.currentIndex = 0;
    this.setNextSlide();
    this.slides.each((idx, slide) => {
      $('<img>').on('load', $.proxy(this.loadImage, this)).attr('src', $(slide).attr('src'));
    });
  }

  // When one image has loaded, check to see if all images have loaded, and if
  // so, start the slideshow.
  loadImage() {
    this.imagesLoaded++;
    if (this.imagesLoaded >= this.slides.length) { this.playSlideshow() }
  }

  // Start the slideshow.
  playSlideshow() {
    this.slideshow = window.setInterval(() => { this.performSlide() }, 3500);
  }

  // 1. Previous slide is unset.
  // 2. What was the next slide becomes the previous slide.
  // 3. New index and appropriate next slide are set.
  // 4. Fade out action.
  performSlide() {
    if (this.prevSlide) { this.prevSlide.removeClass('prev fade-out') }

    this.nextSlide.removeClass('next');
    this.prevSlide = this.nextSlide;
    this.prevSlide.addClass('prev');

    this.currentIndex++;
    if (this.currentIndex >= this.slides.length) { this.currentIndex = 0 }

    this.setNextSlide();

    this.prevSlide.addClass('fade-out');
  }

  setNextSlide() {
    this.nextSlide = this.container.find(`[data-slide="${this.currentIndex}"]`).first();
    this.nextSlide.addClass('next');
  }

}

$(document).ready(function () {
  new Slideshow;
});





var key = "jDG8c4z6my6XH8jVVebKu6i6eNqK1fY7";
var resultArtist = "";
var sample = "";
var resultTrackName = "";
var size = 5;
var artist = '';
var time = '';
var date = '';
var venue = '';
var buyTicket = '';
var audioFig = $('<figure>');
var artistSearch = '';
var citySearch = '';

// var queryURL = "https://app.ticketmaster.com/discovery/v2/events?keyword=" + artist + "&city=" + city + "&postalCode=" + zip + "&size=" + size + "&apikey=" + key;


$("#submitBtn").on("click", function (event) {
  event.preventDefault()

  artistSearch = $("#srch-term1").val();
  citySearch = $("#srch-term2").val();
  // var queryURL = "https://app.ticketmaster.com/discovery/v2/events?keyword=" + artist + "&city=" + city + "&postalCode=" + zip + "&size=" + size + "&apikey=" + key;
  var queryURL = "https://app.ticketmaster.com/discovery/v2/events?keyword=" + artistSearch + "&city=" + citySearch + "&size=" + size + "&apikey=" + key;
  // var queryURL1 = "https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=" + artistSearch + "&city=" + citySearch + "&size=" + size + "&apikey=" + key;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // console.log(response);


    for (var i = 0; i < response._embedded.events.length; i++) {

      artist = response._embedded.events[i].name;
      time = response._embedded.events[i].dates.start.localTime;
      date = response._embedded.events[i].dates.start.localDate;
      venue = response._embedded.events[i]._embedded.venues[0].name;
      buyTicket = response._embedded.events[i].url;
    }
    iTunesCall(artistSearch);

  });



  function iTunesCall(term) {

    $.ajax({
      url: 'https://itunes.apple.com/search',
      crossDomain: true,
      dataType: 'jsonp',
      data: {
        term: term,
        media: 'track',
        entity: 'song',
        limit: 1,
        explicit: 'No'
      },
      method: 'GET',
      success: function (data) {
        console.log("second ajax call");
        console.log(data);


        $.each(data.results, function (i, result) {
          if (i > 0) { return false; }
          sample = result.previewUrl;
          resultArtist = result.artistName;
          resultTrackName = result.trackName;
          console.log(result);
          console.log(resultArtist);

        });

        displayResults();

      },
      error: function (e) {
        console.log(e);
      }
    });

  }

})


function displayResults() {
  if (artistSearch !== "") {

    $(".tableRow").empty();
    audioFig.empty();
    var newRow = $('<tr>').addClass('tableRow');
    newRow.append(
      $('<td>').text(artist),
      $('<td>').html('<a href="https://www.google.com/maps/place/' + mapSearch + '" target="_blank"><i class="fas fa-map-marker-alt"></i></a>' + " " + venue),
      $('<td>').text(newDate),
      $('<td>').text(newTime),
      $('<td>').html('<a href="' + buyTicket + '" class="btn btn-danger btn-lg" tabindex="-1" target="_blank" role="button" aria-disabled="true">Tickets</a>'),
    );

    $('#table-info').append(newRow);




    // creating audio player widget using firebase
    // var audioFig = $('<figure>');
    var caption = $('<figcaption>');

    caption.text(resultArtist + ": " + resultTrackName);
    console.log(caption);
    audioFig.append(caption);
    var samplePlayer = $('<audio controls></audio>');
    samplePlayer.attr('src', sample);
    audioFig.append(samplePlayer);
    var newRowAudio = $('<tr>').append(audioFig);
    $("#table-info").append(newRowAudio);

  }
}


