

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCgNLxKu5cuhSrfa8P_RlJTpB7iwvkhtoM",
  authDomain: "fir-train-scheduler.firebaseapp.com",
  databaseURL: "https://fir-train-scheduler.firebaseio.com",
  projectId: "fir-train-scheduler",
  storageBucket: "fir-train-scheduler.appspot.com",
  messagingSenderId: "973934987540"
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

var trains=[];
var destinations=[];
var times=[];
var frequency=[];
var minAway=[];

// Capture Button Click
$("#add-train").on("click", function() {
  
  event.preventDefault();


  trains.push( $("#name-input").val().trim() );
  destinations.push( $("#destination-input").val().trim() );
  times.push( $("#time-input").val().trim() );
  frequency.push( $("#frequency-input").val().trim() );
  minAway.push();



  database.ref().set({
    name: trains,
    destination: destinations,
    time: times,
    frequency: frequency
    
  });

});

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("value", function(snapshot) {

  // Log everything that's coming out of snapshot
  console.log(snapshot.val());

  // for (var i = 0; i < Things.length; i++) {
  //   Things[i]
  // }

  // Change the HTML to reflect
  $("#tName").text(snapshot.val().name );
  $("#tDest").text(snapshot.val().destination );
  $("#tFreq").text(snapshot.val().time );
  $("#tNext").text(snapshot.val().frequency );


  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


