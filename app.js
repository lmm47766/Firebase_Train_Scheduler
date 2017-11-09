

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


// Capture Button Click
$("#add-train").on("click", function() {
  
  event.preventDefault();

  database.ref().push({
    name: $("#name-input").val().trim(),
    destination: $("#destination-input").val().trim(),
    time: $("#time-input").val().trim(),
    frequency: $("#frequency-input").val().trim()
    
  });

});


database.ref().on("child_added", function(snapshot) {

  var freq = snapshot.val().frequency;
  var time = snapshot.val().time;
  var firstTrain = moment(time, 'HH:mm');
  var nowMoment = moment();



  if (firstTrain > nowMoment) {
    var nextArrival=firstTrain.format("hh:mm A");;
    var minutesAway = firstTrain.diff(nowMoment, 'minutes');
  }
  else{
    var minFirst = nowMoment.diff(firstTrain, 'minutes');
    var minLast = minFirst % freq;
    var minutesAway = freq - minLast;
    var nextArrival = nowMoment.add(minutesAway, 'minutes').format("hh:mm A");
    console.log(nextArrival);
  }



  $(".table").append("<tr><td> " + snapshot.val().name +
    " </td><td> " + snapshot.val().destination +
    " </td><td> " + snapshot.val().frequency + 
    " </td><td> " + nextArrival +
    " </td><td> " + minutesAway +
    " </td></tr>");



}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


