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
var trueQuestionsArray = ["A canine's sense of smell is 100,000x stronger than a human's", "Three dogs survived the sinking of the Titanic", "Dogs’eyes contain a special membrane, which allows them to see in the dark.", "Dogs only sweat through the pads of their feet", "The shape of a dog’s face suggests its longevity: A long face means a longer life."];
var falseQuestionArray = ["Dalmations are born with spots", "Dogs have only two eyelids, just like us", "Dogs are colorblind.", "Dogs that have not been spayed or neutered live longer", "Every single U.S. President has owned a dog"];
var randQuestionSelection = [];

function displayQuestion(){
    var combinedQuestions = trueQuestionsArray.concat(falseQuestionArray);
    var randQuestionSelection = combinedQuestions[Math.floor(Math.random() * combinedQuestions.length)];
    var randGif = Math.floor(Math.random() * 20);

    for(var i = 0; i < combinedQuestions.length; i++){
       console.log(randQuestionSelection);
       
       
       if(randQuestionSelection === trueQuestionsArray[0] || randQuestionSelection === trueQuestionsArray[1] || randQuestionSelection === trueQuestionsArray[2] || randQuestionSelection === trueQuestionsArray[3] || randQuestionSelection === trueQuestionsArray[4]) {
           isTrue = true;
           
       } else {
           isTrue = false;
       }
       
        $("#question").text(randQuestionSelection);
        console.log(isTrue);
    }
        if(isTrue) {
            $("#trueButton").on("click", function(){
                $("#answer").text("Correct!");
                winsAndLosses();

                $.ajax({
                    url: "http://api.giphy.com/v1/gifs/search?q=happy+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
                    method: "GET"
                  }).then(function(response) {
                      
                      $("#gifPic").append("<img src=" + response.data[randGif].images.original.url + ">");
                      
                  });

                combinedQuestions.splice(combinedQuestions.indexOf(randQuestionSelection),1);
                console.log(combinedQuestions);
            });
            $("#falseButton").on("click", function(){
                $("#answer").text("Wrong!");
                winsAndLosses();

                $.ajax({
                    url: "http://api.giphy.com/v1/gifs/search?q=sad+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
                    method: "GET"
                  }).then(function(response) {
                      
                      $("#gifPic").append("<img src=" + response.data[randGif].images.original.url + ">");
                      
                  });
                combinedQuestions.splice(combinedQuestions.indexOf(randQuestionSelection),1);
                console.log(combinedQuestions);
            });
        } else { 
            $("#trueButton").on("click", function(){
                $("#answer").text("Wrong!");
                winsAndLosses();
                $.ajax({
                    url: "http://api.giphy.com/v1/gifs/search?q=sad+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
                    method: "GET"
                  }).then(function(response) {
                      
                      $("#gifPic").append("<img src=" + response.data[randGif].images.original.url + ">");
                      
                  });
                combinedQuestions.splice(combinedQuestions.indexOf(randQuestionSelection),1);
                console.log(combinedQuestions);
            });
            $("#falseButton").on("click", function(){
                $("#answer").text("Correct!");
                winsAndLosses();
                $.ajax({
                    url: "http://api.giphy.com/v1/gifs/search?q=happy+dog&api_key=17HlEsY0GKfVxvXvmi1HZw2RI94pGhFc&limit=20",
                    method: "GET"
                  }).then(function(response) {
                      
                      $("#gifPic").append("<img src=" + response.data[randGif].images.original.url + ">");
                      
                  });
                combinedQuestions.splice(combinedQuestions.indexOf(randQuestionSelection),1);
                console.log(combinedQuestions);
            });
        }
}

function winsAndLosses() {
    if(isTrue){
        correctAnswer++;
    } else {
        wrongAnswer++;
    }
    console.log("number of wins " + correctAnswer);
    console.log("number of losses " + wrongAnswer)
}

displayQuestion();
});