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

$(document).ready(function() {
  new Slideshow;
});





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
      $('<td>').html('<a href="' + buyTicket + '" class="btn btn-danger btn-lg" tabindex="-1" target="_blank" role="button" aria-disabled="true">Tickets</a>'),
      // $('<td>').html('<button><a target="_blank" href=' + buyTicket + '>Tickets</a></button>'),
    );

    $('#table-info > tbody').append(newRow)


  }
  console.log(response);

});