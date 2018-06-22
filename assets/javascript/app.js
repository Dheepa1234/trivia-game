//I start the code with the document-ready function //


$(document).ready(function(){
   
 


//This jQuery syntax should trigger an event, such as resetting the game.//

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">180</span> Seconds</h2>');
  game.loadQuestion();
});
 

//This is the question set with choice available for the user to answer. The user should click on an answer.//
//These are poetry questions. I provide lines of poetry. The user has to answer which poet wrote these lines.
//The index value is giveen in the correct answer propery.//


var questions = [{
    question: "Which poet wrote these lines?:
    "Do not go gentle into that good night,/
    Old age should burn and rave at close of day,/
    Rage, rage against the dying of the light.",
    
    choices: ["Robert Frost", "Lawrence Ferlinghetti", "Dylan Thomas", "Robert Browning"],
    correctAnswer: 3
}, {
    
  {
    question: "Which poet wrote these lines?:
I   "In Xanadu did Kubla Khan/
    A stately pleasure-dome decree :/
    Where Alph, the sacred river, ran/
    Through caverns measureless to man/
    Down to a sunless sea.",
    choices: ["William Wordsworth", "Allen Ginsberg", "Wallace Stevens", "Samuel T. Coleridge"],
    correctAnswer: 3

}, {
    question: "Who wrote this poem?:
    "I loved you, and I probably still do,/
    And for a while the feeling may remain.../
    But let my love no longer trouble you,/
    I do not wish to cause you any pain./
    I loved you; and the hopelessness I knew,/
    The jealousy, the shyness – though in vain –/
    Made up a love so tender and so true/
    As may God grant you to be loved again.",
    choices: ["Elizabeth Barrett Browning", "Emily Bronte", "Edgar Allan Poe", "Alexander Pushkin"],
    correctAnswer: 3

}, {
    question: "What poet wrote these lines?:
    "If you can keep your head when all about you/
    Are losing theirs and blaming it on you,/
    If you can trust yourself when all men doubt you,/
    But make allowance for their doubting too;/  
    If you can wait and not be tired by waiting,/
    Or being lied about, don’t deal in lies,/
    Or being hated, don’t give way to hating..../
    Yours is the Earth and everything that’s in it...."

    choices: ["Ralph Waldo Emerson", "Rudyard Kipling", "Pablo Neruda", "Edgar Allan Poe"],
    correctAnswer: 1

}, {
    question: "Who wrote this poem? 
    "Bright star, would I were stedfast as thou art –/ 
    Not in lone splendour hung aloft the night/
    And watching, with eternal lids apart,/
    Like nature's patient, sleepless Eremite,/
    The moving waters at their priestlike task/
    Of pure ablution round earth's human shores,/
    Or gazing on the new soft-fallen mask/
    Of snow upon the mountains and the moors –/
    No – yet still stedfast, still unchangeable,/
    Pillow'd upon my fair love's ripening breast,/
    To feel for ever its soft fall and swell,/
    Awake for ever in a sweet unrest,/
    Still, still to hear her tender-taken breath,/
    And so live ever – or else swoon to death."
    
    choices: ["William Blake", "Percy Bysshe Shelley", "Robert Browning", "John Keats"],
    correctAnswer: 0

    question: "Who wrote this poem?"
    "Death, be not proud, though some have called thee/
    Mighty and dreadful, for thou art not so;/
    For those whom thou think'st thou dost overthrow/
    Die not, poor Death, nor yet canst thou kill me."

    choices: ["Robert Browning", "John Milton", "Lady Jane Grey", "John Donne"],
    correctAnswer: 3
}, {


    question: "Which poet wrote these lines?:
    "April is the cruellest month, breeding
     Lilacs out of the dead land, mixing
      Memory and desire, stirring
      Dull roots with spring rain.""
    choices: ["T.S. Eliot", “E.E. Cummings", “J. Alfred  Prufrock", "Lewis Carroll"],
    correctAnswer: 0
}, {

}];

// These are potential arguments to load questions etc. These conditions should load questions, go on to the next question, clear and set intervals,//
//The code should try to append the correct answer for the user to see when it is answered incorrectly.//

var panel = $('#quiz-area');
var timerCounter =    ;
var winCoutner=0 ;
var lossCounter=0 ;

var game = {
  questions:       ,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIMES UP');
      game.timesUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

});