

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
  
  // Firebase Authentication variables
  var txtEmail = document.getElementById('exampleDropdownFormEmail1');
  var txtPassword = document.getElementById('exampleDropdownFormPassword1');
  var signIn = document.getElementById('signIn');
  var register = document.getElementById('signUp');
  var forgotPW = document.getElementById('forgotPW')
  var logOut = document.getElementById('signOut');
  
  //password field validation
  var myInput = document.getElementById("exampleDropdownFormPassword1");
  var myInputE = document.getElementById("exampleDropdownFormEmail1");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var length = document.getElementById("length");
  var wrongPsw = $('<p id="passX">');
  var notAnEmail = $('<p id="emailX">');
  var runApp = false;
  // When the user clicks on the password field, show the message box
  myInput.onfocus = function() {
    document.getElementById("message").style.display = "block";
  }
  
  // When the user clicks outside of the password field, hide the message box
  myInput.onblur = function() {
    document.getElementById("message").style.display = "none";
  }
  
  // When the user starts to type something inside the password field
  myInput.onkeyup = function() {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(myInput.value.match(lowerCaseLetters)) {  
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }
    
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(myInput.value.match(upperCaseLetters)) {  
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }
    
    // Validate numbers
    var numbers = /[0-9]/g;
    if(myInput.value.match(numbers)) {  
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }
    
    // Validate length
    if(myInput.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }
  
  firebase.auth().onAuthStateChanged(function(user) {
    window.user = user;

  });

  document.querySelector('#signUp').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var email = document.querySelector('#exampleDropdownFormEmail1').value;
    var password = document.querySelector('#exampleDropdownFormPassword1').value
    // var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    var auth = firebase.auth();
    
    auth.createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      var pswCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      var emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (password !== pswCheck) {
        wrongPsw.text('Invalid Password Input');
        $('#pswForm').prepend(wrongPsw);
        console.log('not a valid password');
      }
      if (email !== emailCheck) {
        notAnEmail.text('Please enter a valid email address');
        $("#emailForm").prepend(notAnEmail);
      }
    
      console.log(error)
    });
    runApp = true;
  });
  

  // add realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      logOut.classList.remove('d-none');
      console.log(firebaseUser);
    } else {
      logOut.classList.add('d-none');
      console.log('user not logged in');
    }
  });



  document.querySelector('#signIn').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var email = document.querySelector('#exampleDropdownFormEmail1').value;
    var password = document.querySelector('#exampleDropdownFormPassword1').value
    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    var auth = firebase.auth();
    var currentUser = auth.currentUser;
    auth.signInAndRetrieveDataWithCredential(credential);


    
  });

  document.querySelector('#signOut').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    firebase.auth().signOut();
    logOut.classList.add('d-none');
  });
  



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
var resultArtist = [];
var sample = [];
var resultTrackName = [];
var size = 5;
var audioFig = $('<figure>');
var artistSearch = '';
var citySearch = '';
var masterResponse;
var artist = [];
var time = [];
var date = [];
var venue = [];
var venueSearch = '';
var buyTicket = [];
var audioFig = $('<figure>');
var artistSearch = [];
var citySearch = [];
var address = [];
var zip = [];
var addressSearch = '';
var zipSearch = '';
var mapSearch = [];
var convertDate = [];
var newDate = [];
var convertTime = [];
var newTime = [];
var resultsLength;
var artistAudioSearch = [];
var k = 0;
var j = -1;
var finalSample = [];
var finalArtist = [];
var finalTrack = [];


$("#submitBtn").on("click", function (event) {
  event.preventDefault()
  k = 0;

  artistSearch = $("#srch-term1").val();
  citySearch = $("#srch-term2").val();
  var queryURL = "https://app.ticketmaster.com/discovery/v2/events?keyword=" + artistSearch + "&city=" + citySearch + "&size=" + size + "&apikey=" + key;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    masterResponse = response;
    resultsLength = response._embedded.events.length;

    try {
      for (var i = 0; i < resultsLength; i++) {

        artist[i] = response._embedded.events[i].name;
        time[i] = response._embedded.events[i].dates.start.localTime;
        date[i] = response._embedded.events[i].dates.start.localDate;
        venue[i] = response._embedded.events[i]._embedded.venues[0].name;
        venueSearch = response._embedded.events[i]._embedded.venues[0].name;
        buyTicket[i] = response._embedded.events[i].url;
        address[i] = response._embedded.events[i]._embedded.venues[0].address.line1;
        zip[i] = response._embedded.events[i]._embedded.venues[0].postalCode;
        mapSearch[i] = address + " " + zip;
        artistAudioSearch[i] = response._embedded.events[i]._embedded.attractions[0].name;


        //Converts API date results to a more user-readable format
        convertDate[i] = moment(date[i]);
        newDate[i] = convertDate[i].format('ll');

        // Converts API time results to a more user-readable format
        convertTime[i] = moment(time, 'HH:mm:ss');
        newTime[i] = convertTime[i].format('LT');
      }

      for (i = 0; i < resultsLength; i++) {
        iTunesCall(artistAudioSearch[i]);
      }

      setTimeout(checkOutput, 750);
      setTimeout(displayResults, 750);


    }
    catch {
      displayError();
    }
  });

});

  function checkOutput() {
    for (i = 0; i < resultsLength; i++) {
      for (j = 0; j < resultsLength; j++) {
        if (artistAudioSearch[i] === resultArtist[j]) {
          finalArtist[i] = resultArtist[j];
          finalTrack[i] = resultTrackName[j];
          finalSample[i] = sample[j];
        }
      }
    }
  }


  function iTunesCall(term) {
  
    $.ajax({
      url: 'https://itunes.apple.com/search',
      crossDomain: true,
      dataType: 'jsonp',
      data: {
        term: term,
        media: 'track',
        entity: 'song',
        limit: resultsLength,
        explicit: 'No'
      },
      method: 'GET',
      success: function (data) {
        sample[k] = data.results[0].previewUrl;
        resultArtist[k] = data.results[0].artistName;
        resultTrackName[k] = data.results[0].trackName;
        k++;

      },
      error: function (e) {
        console.log(e);
      }
    });
  
  }

function displayError() {
  k = 0;
  if (artistSearch !== "") {
    $(".audioRow").empty();
    $(".tableRow").empty();
    var newRow = $('<tr>').addClass('tableRow');
    $('#table-info').append(newRow);
    var newErrorResult = $('<tr>').text("No Results Found");
    newRow.append(newErrorResult);
  }
}

function displayResults() {
  k = 0;
  if (artistSearch !== "") {
    $(".tableRow").empty();
    $("#table-info").empty();
    var newTableHeader = $('<tr>');
    newTableHeader.append(
      $('<th>').attr('scope', 'col').text('Event'),
      $('<th>').attr('scope', 'col').text('Venue'),
      $('<th>').attr('scope', 'col').text('Date'),
      $('<th>').attr('scope', 'col').text('Doors'),
      $('<th>').attr('scope', 'col').text('Purchase'),
    )
    $('#table-info').append(newTableHeader);
    audioFig.empty();

    // Create row for event details and append this row for each result returned
    for (i = 0; i < resultsLength; i++) {
      var newRow = $('<tr>').addClass('tableRow');
      newRow.append(
        $('<td>').text(artist[i]),
        $('<td>').html('<a href="https://www.google.com/maps/place/' + mapSearch[i] + '" target="_blank"><i class="fas fa-map-marker-alt"></i></a>' + " " + venue[i]),
        $('<td>').text(newDate[i]),
        $('<td>').text(newTime[i]),
        $('<td>').html('<a href="' + buyTicket[i] + '" class="btn btn-danger btn-lg" tabindex="-1" target="_blank" role="button" aria-disabled="true">Tickets</a>'),
      );
      $('#table-info').append(newRow);

      // Create row for audio sample for each result returned
      if (finalArtist[i] !== undefined) {
        var caption = $('<figcaption>');
        caption.text(finalArtist[i] + ": " + finalTrack[i]);
        audioFig = $('<figure>').append(caption);
        var samplePlayer = $('<audio controls></audio>');
        samplePlayer.attr('src', finalSample[i]);
        audioFig.append(samplePlayer);
        var newRowAudio = $('<tr>').addClass("audioRow");
        newRowAudio.append(audioFig);
        $("#table-info").append(newRowAudio);

      }
    }
  }
  sample = [];
  resultArtist = [];
  resultTrackName = [];
  finalArtist = [];
  finalTrack = [];
  finalSample = [];
}


