/* ------Psuedo Code------
-   trivia game that displays one question at a time and has a timer for that particular question
-   after the player guesses then they need to be shown if they got it right or wrong
-   after the user has guessed or the time has run out, the next question needs to come up automatically
-   if the user guess wrong then they need to be shown the correct answer
-   the final screen needs to show how many they guessed right or wrong and needs to give them the option to start over without             reloading the page
-   need to create html for the app that has a title, a div for diplaying the question and possibly use that same div to display if the     user won or lost
*/ 

$(document).ready(function() {

var correctAnswer = 0;
var wrongAnswer = 0;
isTrue = false;
var clockRunning = false;
var timeRemaining = 30;
intervalId = setInterval(timerCountdown, 1000);
var questionsArray = [{question: "A canine's sense of smell is 100,000x stronger than a human's", answer: "True"}, { question: "Three dogs survived the sinking of the Titanic", answer: "True"},{question: "Dalmations are born with spots", answer: "False"}, {question: "Dogs’eyes contain a special membrane, which allows them to see in the dark.", answer: "True"}, {question: "Dogs have only two eyelids, just like us", answer: "False"}, {question: "Dogs are colorblind.", answer: "False"}, {question: "Dogs only sweat through the pads of their feet", answer: "True"}, {question: "Dogs that have not been spayed or neutered live longer", answer: "False"}, {question: "Every single U.S. President has owned a dog", answer: "False"}, {question: "The shape of a dog’s face suggests its longevity: A long face means a longer life.", answer: "True"}, {question: "Game Over"}];
var randGif;

function displayQuestion(){
    randGif = Math.floor(Math.random() * 20);
    timerCountdown();
    for(var i = 0; i < questionsArray.length; i++){
        console.log(questionsArray[i].question);
        var questionDisplay = $("#question").text(questionsArray[i].question);
    }
    $("#question").text(questionsArray[0].question);
}


function nextQuestion(){
    randGif = Math.floor(Math.random() * 20);
    intervalId = setInterval(timerCountdown, 1000);
    timeRemaining = 30;
    //timerCountdown();
    $("#gifPic").html("");
    $("#answer").text("");
    displayQuestion();
    
    if(questionsArray[0].question === "Game Over"){
        endGame();
    }
}
   

function timerCountdown() {
    if (timeRemaining == 0 && questionsArray.length > 0) {
        $("#answer").text("Time's Up!");
        $("#timer").text("0 Seconds Remaining");
      clearTimeout(intervalId);

      $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q=sad+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
        method: "GET"
      }).then(function(response) {
          
          $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
          
      });
      wrongAnswer++;
      questionsArray.splice(0,1);
      setTimeout(nextQuestion, 5000);
    } else {
        $("#timer").text(timeRemaining + " Seconds Remaining");
      timeRemaining--;
    }
  }

  function endGame(){
    timeRemaining = 0;
    clearTimeout(intervalId);
    clearTimeout(setTimeout);
    $("#question").html("Correct Answers: " + correctAnswer + "\n" + "Incorrect Answers: " + wrongAnswer).wrap('<pre />');
    $("#timer").text("");
    $("#trueButton").html("");
    $("#falseButton").html("");
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q=funny+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
        method: "GET"
      }).then(function(response) { 
          $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
      });
  }


displayQuestion();


    $("#trueButton").on("click", function(){
        
        if(questionsArray[0].answer === "True" ){
        $("#answer").text("Correct!");
        correctAnswer++;
        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search?q=happy+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
            method: "GET"
          }).then(function(response) {
              $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");  
          });
        questionsArray.splice(0,1);
        clearInterval(intervalId);
        setTimeout(nextQuestion, 5000);
        console.log("number of wins " + correctAnswer);
        console.log("number of losses " + wrongAnswer);
        
        } else if(questionsArray.length === 1){
            $("#answer").text("Correct!");
            correctAnswer++;
            $.ajax({
                url: "http://api.giphy.com/v1/gifs/search?q=happy+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
                method: "GET"
              }).then(function(response) {
                  $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");  
              });
              
            clearInterval(intervalId);
            
            console.log("number of wins " + correctAnswer);
            console.log("number of losses " + wrongAnswer);
            

        } else {
            $("#answer").text("Wrong!");
            wrongAnswer++;
             $.ajax({
                 url: "http://api.giphy.com/v1/gifs/search?q=sad+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
                 method: "GET"
               }).then(function(response) {
                   
                   $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
                   
               });
               
            questionsArray.splice(0,1);
             clearInterval(intervalId);
             setTimeout(nextQuestion, 5000);
             console.log("number of wins " + correctAnswer);
             console.log("number of losses " + wrongAnswer);
             
        }

    } );

    $("#falseButton").on("click", function(){
        if(questionsArray[0].answer === "False" ){
        $("#answer").text("Correct");
        
        correctAnswer++;
        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search?q=sad+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
            method: "GET"
          }).then(function(response) { 
              $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
          });
          
        questionsArray.splice(0,1);
        clearInterval(intervalId);
        setTimeout(nextQuestion, 5000);
        
        
        console.log("number of wins " + correctAnswer);
        console.log("number of losses " + wrongAnswer);
        
        } else {
            $("#answer").text("Wrong!");
            
            wrongAnswer++;
              $.ajax({
                  url: "http://api.giphy.com/v1/gifs/search?q=happy+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
                  method: "GET"
                }).then(function(response) {
                    
                    $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
                    
                });
              clearInterval(intervalId);
              setTimeout(nextQuestion, 5000);
             
              questionsArray.splice(0,1);
              console.log("number of wins " + correctAnswer);
              console.log("number of losses " + wrongAnswer);
              
        }
        
    });

});