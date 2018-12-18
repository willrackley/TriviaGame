$(document).ready(function() {

var correctAnswer = 0;
var wrongAnswer = 0;
var timeRemaining = 30;
var indexIncrement = 0;
var intervalId;
var clockRunning = false;
var questionsArray = [{question: "A canine's sense of smell is 100,000x stronger than a human's", answer: "True"}, { question: "Three dogs survived the sinking of the Titanic", answer: "True"}/*,{question: "Dalmations are born with spots", answer: "False"}, {question: "Dogs’eyes contain a special membrane, which allows them to see in the dark.", answer: "True"}, {question: "Dogs have only two eyelids, just like us", answer: "False"}, {question: "Dogs are colorblind.", answer: "False"}, {question: "Dogs only sweat through the pads of their feet", answer: "True"}, {question: "Dogs that have not been spayed or neutered live longer", answer: "False"}, {question: "Every single U.S. President has owned a dog", answer: "False"}, {question: "The shape of a dog’s face suggests its longevity: A long face means a longer life.", answer: "True"}*/, {question: "Game Over"}];
var randGif;

function displayQuestion(){
    
    intervalId = setInterval(timerCountdown, 1000);
    console.log("number of wins " + correctAnswer);
    console.log("number of losses " + wrongAnswer);
    randGif = Math.floor(Math.random() * 20);
    timerCountdown();
    $("#question").text(questionsArray[indexIncrement].question);
    
}


function nextQuestion(){
    randGif = Math.floor(Math.random() * 20);
    timeRemaining = 30;
    timerCountdown();
    $("#gifPic").html("");
    $("#answer").text("");
    indexIncrement++;
    displayQuestion();

    if(questionsArray[indexIncrement].question === "Game Over") {
        endGame();
    }
   
    $("#trueButton").one("click", function(){
        $(this).data('clicked', true);
        if($("#trueButton").data('clicked')){
            $("#falseButton").off("click");
        }
        
        if(questionsArray[indexIncrement].answer === "True" ){
        $("#answer").text("Correct!");
        correctAnswer++;
        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search?q=happy+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
            method: "GET"
          }).then(function(response) {
              $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");  
          });
        
        clearInterval(intervalId);
        setTimeout(nextQuestion, 5000);
       
        
        } else {
            $("#answer").text("Wrong!");
            wrongAnswer++;
            $.ajax({
                url: "http://api.giphy.com/v1/gifs/search?q=sad+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
                method: "GET"
            }).then(function(response) {  
                $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
            }); 
            
            clearInterval(intervalId);
            setTimeout(nextQuestion, 5000);
        }
    
    });
    $("#falseButton").one("click", function(){
       $(this).data('clicked', true);
        if($("#falseButton").data('clicked')){
            $("#trueButton").off("click");
        }
        if(questionsArray[indexIncrement].answer === "False" ){
        $("#answer").text("Correct");
        
        correctAnswer++;
        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search?q=sad+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
            method: "GET"
          }).then(function(response) { 
              $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
          });
          
        clearInterval(intervalId);
        setTimeout(nextQuestion, 5000);
        
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
                 
        }
        
    });
}
   
   

function timerCountdown() {
    
    if (timeRemaining == 0) {
        $("#answer").text("Time's Up!");
        $("#timer").text("0 Seconds Remaining");
      clearTimeout(intervalId);
      clockRunning = false;
      $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q=mad+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
        method: "GET"
      }).then(function(response) {
          
          $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
          
      });

      wrongAnswer++;
      setTimeout(nextQuestion, 5000);
    } else {
        $("#timer").text(timeRemaining + " Seconds Remaining");
      timeRemaining--;
      clockRunning = true;
    }
  }

function endGame(){
    clearTimeout(intervalId);
    clearTimeout(setTimeout);
    $("#question").html("Correct Answers: " + correctAnswer + "\n" + "Incorrect Answers: " + wrongAnswer).wrap('<pre />');
    $("#timer").text("");
    $("#trueButton").hide();
    $("#falseButton").hide();
    $("#tryAgainButton").show();
    $("#tryAgainButton").text("Try Again");
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q=funny+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
        method: "GET"
      }).then(function(response) { 
          $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
      });
      
  }

  function resetGame(){
    
    /*questionsArray = [{question: "A canine's sense of smell is 100,000x stronger than a human's", answer: "True"}, { question: "Three dogs survived the sinking of the Titanic", answer: "True"},{question: "Dalmations are born with spots", answer: "False"}, {question: "Dogs’eyes contain a special membrane, which allows them to see in the dark.", answer: "True"}, {question: "Dogs have only two eyelids, just like us", answer: "False"}, {question: "Dogs are colorblind.", answer: "False"}, {question: "Dogs only sweat through the pads of their feet", answer: "True"}, {question: "Dogs that have not been spayed or neutered live longer", answer: "False"}, {question: "Every single U.S. President has owned a dog", answer: "False"}, {question: "The shape of a dog’s face suggests its longevity: A long face means a longer life.", answer: "True"}, {question: "Game Over"}];*/
    
    timerCountdown();
   
    timeRemaining = 30;
    indexIncrement = 0;
    randGif = Math.floor(Math.random() * 20);
    correctAnswer = 0;
    wrongAnswer = 0;
    $("#gifPic").html("")
    $("#tryAgainButton").hide();
    $("#trueButton").show();
    $("#falseButton").show();
    displayQuestion();

    
}


displayQuestion();


$("#trueButton").one("click", function(){
    $(this).data('clicked', true);
    if($("#trueButton").data('clicked')){
        $("#falseButton").off("click");
    }
    
    if(questionsArray[indexIncrement].answer === "True" ){
    $("#answer").text("Correct!");
    correctAnswer++;
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q=happy+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
        method: "GET"
      }).then(function(response) {
          $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");  
      });
    
    clearInterval(intervalId);
    setTimeout(nextQuestion, 5000);
   
    
    } else {
        $("#answer").text("Wrong!");
        wrongAnswer++;
        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search?q=sad+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
            method: "GET"
        }).then(function(response) {  
            $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
        }); 
        
        clearInterval(intervalId);
        setTimeout(nextQuestion, 5000);
    }

});
$("#falseButton").one("click", function(){
   $(this).data('clicked', true);
    if($("#falseButton").data('clicked')){
        $("#trueButton").off("click");
    }
    if(questionsArray[indexIncrement].answer === "False" ){
    $("#answer").text("Correct");
    
    correctAnswer++;
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q=sad+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
        method: "GET"
      }).then(function(response) { 
          $("#gifPic").html("<img src=" + response.data[randGif].images.original.url + ">");
      });
      
    clearInterval(intervalId);
    setTimeout(nextQuestion, 5000);
    
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
    }
    
});
$("#tryAgainButton").on("click", function(){
    resetGame();
});



});