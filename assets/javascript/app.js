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
var questionsArray = [{question: "A canine's sense of smell is 100,000x stronger than a human's", answer: "True"}, { question: "Three dogs survived the sinking of the Titanic", answer: "True"},{question: "Dalmations are born with spots", answer: "False"}, {question: "Dogs’eyes contain a special membrane, which allows them to see in the dark.", answer: "True"}, {question: "Dogs have only two eyelids, just like us", answer: "False"}, {question: "Dogs are colorblind.", answer: "False"}, {question: "Dogs only sweat through the pads of their feet", answer: "True"}, {question: "Dogs that have not been spayed or neutered live longer", answer: "False"}, {question: "Every single U.S. President has owned a dog", answer: "False"}, {question: "The shape of a dog’s face suggests its longevity: A long face means a longer life.", answer: "True"}];
//var trueQuestionsArray = ["A canine's sense of smell is 100,000x stronger than a human's", "Three dogs survived the sinking of the Titanic", "Dogs’eyes contain a special membrane, which allows them to see in the dark.", "Dogs only sweat through the pads of their feet", "The shape of a dog’s face suggests its longevity: A long face means a longer life."];
//var falseQuestionArray = ["Dalmations are born with spots", "Dogs have only two eyelids, just like us", "Dogs are colorblind.", "Dogs that have not been spayed or neutered live longer", "Every single U.S. President has owned a dog"];
//var randQuestionSelection = [];
//var combinedQuestions = trueQuestionsArray.concat(falseQuestionArray);
var randGif;

function displayQuestion(){
    
    
    //randQuestionSelection = combinedQuestions[Math.floor(Math.random() * combinedQuestions.length)];
     randGif = Math.floor(Math.random() * 20);

    timerCountdown();

    for(var i = 0; i < questionsArray.length; i++){
        console.log(questionsArray[i].question);
        var questionDisplay = $("#question").text(questionsArray[i].question);
}
$("#question").text(questionsArray[0].question);

}

        //console.log(randQuestionSelection);
        //console.log(isTrue);
    


function nextQuestion(){
    
     //combinedQuestions = trueQuestionsArray.concat(falseQuestionArray);
     //randQuestionSelection = combinedQuestions[Math.floor(Math.random() * combinedQuestions.length)];
     randGif = Math.floor(Math.random() * 20);
    intervalId = setInterval(timerCountdown, 1000);
    timeRemaining = 30;
    //timerCountdown();
    $("#gifPic").html("");
    $("#answer").text("");
    
    displayQuestion();
    
    }
   


/*
    for(var i = 0; i < combinedQuestions.length; i++){
        
       if(randQuestionSelection === trueQuestionsArray[0] || randQuestionSelection === trueQuestionsArray[1] || randQuestionSelection === trueQuestionsArray[2] || randQuestionSelection === trueQuestionsArray[3] || randQuestionSelection === trueQuestionsArray[4]) {
           isTrue = true;
           
       } else {
           isTrue = false;
       }
       combinedQuestions.splice(combinedQuestions.indexOf(randQuestionSelection,1));
        $("#question").text(randQuestionSelection);
       }

       
       console.log(randQuestionSelection);
        console.log(isTrue);
    }
       
       */
       

function removeUsedQuestion() {
    
    if(randQuestionSelection === trueQuestionsArray[0]){
        trueQuestionsArray.splice(0,1);
    } else if(randQuestionSelection === trueQuestionsArray[1]){
        trueQuestionsArray.splice(1,1);
    } else if(randQuestionSelection === trueQuestionsArray[2]){
        trueQuestionsArray.splice(2,1);
    } else if(randQuestionSelection === trueQuestionsArray[3]){
        trueQuestionsArray.splice(3,1);
    } else if(randQuestionSelection ===trueQuestionsArray[4]){
        trueQuestionsArray.splice(4,1);
    } else if(randQuestionSelection === combinedQuestions[5]){
        combinedQuestions.splice(5,1);
    } else if(randQuestionSelection === combinedQuestions[6]){
        combinedQuestions.splice(6,1);
    } else if(randQuestionSelection === combinedQuestions[7]){
        combinedQuestions.splice(7,1);
    } else if(randQuestionSelection === combinedQuestions[8]){
        combinedQuestions.splice(8,1);
    } else if(randQuestionSelection === combinedQuestions[9]){
        combinedQuestions.splice(9,1);
    }
}

function timerCountdown() {
    if (timeRemaining == 0) {
      clearTimeout(intervalId);
      //doSomething();
    } else {
        $("#timer").text(timeRemaining + " Seconds Remaining");
      timeRemaining--;
    }
  }

/*function winsAndLosses() {
    if(isTrue){
       correctAnswer++;
    } else {
        wrongAnswer++;
    }
    console.log("number of wins " + correctAnswer);
    console.log("number of losses " + wrongAnswer)
}*/

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
    });
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