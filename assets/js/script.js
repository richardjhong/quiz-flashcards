var  timeEl = document.querySelector('.time');
var currentScoreEl = document.querySelector('#currentScore')
var startButton = document.querySelector('#start-game')
var remainingTime = 10;
var askedQuestions = [];
var score = 0;

var questionSetCollective = {
  "first": {
    header: "First Question",
    questions: [
      ["incorrect", "What is your name?"],
      ["correct", "What time is it?"],
      ["incorrect", "What is your name?"],
      ["incorrect", "What is your name?"],
    ]
  },
  "second": {
    header: "Second Question",
    questions: [
      ["incorrect", "What is your name?"],
      ["correct", "What time is it?"],
      ["incorrect", "What is your name?"],
      ["incorrect", "What is your name?"],
    ]
  },
  "third": {
    header: "Third Question",
    questions: [
      ["incorrect", "What is your name?"],
      ["correct", "What time is it?"],
      ["incorrect", "What is your name?"],
      ["incorrect", "What is your name?"],
    ]
  },
  "fourth": {
    header: "Fourth Question",
    questions: [
      ["incorrect", "What is your name?"],
      ["correct", "What time is it?"],
      ["incorrect", "What is your name?"],
      ["incorrect", "What is your name?"],
    ]
  },
  "fifth": {
    header: "Fifth Question",
    questions: [
      ["incorrect", "What is your name?"],
      ["correct", "What time is it?"],
      ["incorrect", "What is your name?"],
      ["incorrect", "What is your name?"],
    ]
  },
}

function getRandomInt(max) {
  let index = Math.floor(Math.random() * max);
  if (askedQuestions.includes(index)) {
    while (askedQuestions.includes(index)) {
      index = Math.floor(Math.random() * max);
    }
  }
  switch (index) {
    case 0: 
      askedQuestions.push(index)
      return "first";
      break;
    case 1: 
      askedQuestions.push(index)
      return "second";
      break;
    case 2:
      askedQuestions.push(index)
      return "third";
      break;
    case 3:
      askedQuestions.push(index)
      return "fourth"
      break;
    case 4:
      askedQuestions.push(index)
      return "fifth"
      break;
    default:
      return;
  }
}

function startGame() {
  clearCardContent()
  var questionSet = getRandomInt(Object.keys(questionSetCollective).length - 1)
  console.log("test: ", questionSet)
  createQuizCards(questionSet)
  setTime()
}

startButton.addEventListener("click", startGame)

function setTime () {
  var timerInterval = setInterval(function () {
    timeEl.textContent = remainingTime + " seconds remaining"
    remainingTime--;

    if (remainingTime === 0) {
      clearInterval(timerInterval)
      // clearCardContent()
      // var questionSet = getRandomInt(Object.keys(questionSetCollective).length - 1)
      // console.log("test: ", questionSet)
      // createQuizCards(questionSet)
      console.log("Time out")
    }
  }, 1000)
}

function clearCardContent () {
  var content = document.getElementById("content-card")
  console.log(document.getElementById("content-card"))
  while (content.firstChild) {  
    content.removeChild(content.firstChild)
  }
}

function createQuizCards (questionSet) {
  var content = document.getElementById("content-card")
  var installments = ['Installment 1', 'Installment 2', 'Installment 3', 'Installment 4', 'Installment 5'];

  var currentQuestionSet = questionSetCollective[questionSet]
  // console.log("number of objects: ", Object.keys(questionSetCollective))

  console.log("currentQuestionSet data: ", currentQuestionSet)
  // console.log("askedQuestions: ", askedQuestions)


  var questionHeader = document.createElement('h3')
  var questionList = document.createElement('ul')
  content.appendChild(questionHeader)
  content.appendChild(questionList)

  currentQuestionSet.questions.forEach(question => {
    var questionToAppend = document.createElement('li')
    questionToAppend.textContent = question[1]
   

    if (question[0] === "correct") {
      questionToAppend.addEventListener("click", correctSelection)
    } else {
      questionToAppend.addEventListener("click", incorrectSelection)
    }

    questionList.appendChild(questionToAppend)
  })
  
  questionHeader.textContent = currentQuestionSet.header
}

function correctSelection(event) {
  event.preventDefault();
  event.currentTarget.setAttribute(
    "style",
    "border: 1px solid black"
  )
  score++;
  currentScoreEl.textContent = `Current score: ${score}`;
}

function incorrectSelection(event) {
  event.preventDefault();
  event.currentTarget.setAttribute(
    "style",
    "border: 1px dotted red"
  )
  score--;
  currentScoreEl.textContent = `Current score: ${score}`;
}

