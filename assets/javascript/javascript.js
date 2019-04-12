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
  connectedRef.on("value", function(snap) { // .on event listener for whenever a value changes "value" we run this function. (snap) or (snapshot) can name whatever you want is literally just the data

  // If they are connected..
  if (snap.val()) { // snap is an object and has methods on it .val().  if true; snap.val() similar to ajax response.
      var con = connectionsRef.push(true);
      // increment site visit per connection
      conCount++;
      con.onDisconnect().remove();
  }
  });
  connectionsRef.on("value", function(snap) {
      $(".card-footer").text("Site Visits: " + conCount + ' ' + "# Watching: " + snap.numChildren());
  });


  //Initialize Search Variables
  var artistInput = "";
  var locationInput = "";
  var info = "";
  var price = "";
  var sample = "";
  var resultArtist = "";
  var resultTrackName = "";
  var generaArr = [];

  
  
  
  
  
  
  console.clear();
    
  function fetch(term) {
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
        console.log(data);
        
        
        $.each(data.results, function (i, result) {
          if (i > 0) { return false; }
          console.log(result.previewUrl)
          console.log(result.trackName)
          sample = result.previewUrl;
          resultArtist = result.artistName;
          resultTrackName = result.trackName;
          
          
          database.ref().push({
              resultArtist: resultArtist,
              resultTrackName: resultTrackName,
              locationInput: locationInput,
              info: info,
              price: price,
              sample: sample,
          
            });
        });
      },
      error: function (e) {
        console.log(e);
      }
    });
  }
  console.log()
  $('#submitBtn').on("click", function (event) {
    event.preventDefault();

    artistInput = $('#srch-term1').val().trim();
    locationInput = $('#srch-term2').val().trim();

  
    fetch(artistInput);
  
  
  });

// appending row data.
  database.ref().on("child_added", function (childSnapshot) {






    if (artistInput !== "") {

    
    
      // creating audio player widget using firebase
      var audioFig = $('<figure>');
      var caption = $('<figcaption>');
      caption.text(childSnapshot.val().resultArtist + ": " + childSnapshot.val().resultTrackName);
      audioFig.append(caption);
      var samplePlayer = $('<audio controls></audio>');
      samplePlayer.attr('src', childSnapshot.val().sample);
      audioFig.append(samplePlayer);
      var newRow = $('<tr>').append(
        $('<td>').text(artistInput),
        $('<td>').text(locationInput),
        $('<td>').text(childSnapshot.val().info),
        $('<td>').text(childSnapshot.val().price),
        $('<td>').append(audioFig),
        );
        $("#table-info").append(newRow);
      
    }
    });  

    
    
});