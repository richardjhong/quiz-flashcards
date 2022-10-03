var timeEl = document.querySelector('.time');
var currentScoreEl = document.querySelector('#currentActualScore')
var currentHighScore = document.querySelector('#currentHighScore')
var viewScores = document.querySelector('#highscorelink')
var startButton = document.querySelector('#start-game')
var remainingTime = 60;
var askedQuestions = [];
var score = 0;

var questionSetCollective = {
  "first": {
    header: "Complete the following: JavaScript is a(n) ______ language",
    questions: [
      ["incorrect", "Procedural"],
      ["correct", "Object-oriented"],
      ["incorrect", "Object-based"],
      ["incorrect", "Function-based"],
    ]
  },
  "second": {
    header: "Which of the following keywords is not used to define a variable in JavaScript?",
    questions: [
      ["incorrect", "const"],
      ["incorrect", "var"],
      ["correct", "dynam"],
      ["incorrect", "let"],
    ]
  },
  "third": {
    header: "Which of the following methods can be used to display data in some form using Javascript?",
    questions: [
      ["incorrect", "console.log()"],
      ["incorrect", "window.print()"],
      ["incorrect", "window.alert()"],
      ["correct", "All of the above"],
    ]
  },
  "fourth": {
    header: "Which of the following is a primitive type in JavaScript?",
    questions: [
      ["incorrect", "string"],
      ["incorrect", "boolean"],
      ["incorrect", "Neither A or B"],
      ["correct", "Both A and B"],
    ]
  },
  "fifth": {
    header: "Which function is used to serialize an object into a JSON string in Javascript?",
    questions: [
      ["incorrect", "parse()"],
      ["correct", "stringify()"],
      ["incorrect", "convert()"],
      ["incorrect", "insert()"],
    ]
  },
}

function getRandomInt(max) {
  let index = Math.floor(Math.random() * max);
  switch (askedQuestions[index]) {
    case 0: 
      askedQuestions.splice( index, 1 )
      return "first";
      break;
    case 1: 
      askedQuestions.splice( index, 1 )
      return "second";
      break;
    case 2:
      askedQuestions.splice( index, 1 )
      return "third";
      break;
    case 3:
      askedQuestions.splice( index, 1 )
      return "fourth"
      break;
    case 4:
      askedQuestions.splice( index, 1 )
      return "fifth"
      break;
    default:
      return;
  }
}

function startGame() {
  clearCardContent()
  askedQuestions = [0, 1, 2, 3, 4]
  createQuizCards(getRandomInt(askedQuestions.length))
  setTime()
}

startButton.addEventListener("click", startGame)
viewScores.addEventListener("click", showScoresPage)


function setTime () {
  var timerInterval = setInterval(function () {
    remainingTime--;
    timeEl.textContent = remainingTime + " seconds remaining"

    if (remainingTime <= 0 && askedQuestions.length !== 0) {
      clearInterval(timerInterval)
      endGame()
      console.log("Time out")
    } else if (askedQuestions.length === 0) {
      clearInterval(timerInterval)
    }
  }, 1000)
}

function clearCardContent () {
  var content = document.getElementById("content-card")
  while (content.firstChild) {  
    content.removeChild(content.firstChild)
  }
}

function createQuizCards (questionSet) {
  var content = document.getElementById("content-card")
  var currentQuestionSet = questionSetCollective[questionSet]
  var questionHeader = document.createElement('h3')
  var questionList = document.createElement('ol')
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
  clearCardContent()
  event.currentTarget.setAttribute(
    "style",
    "border: 1px solid black"
  )
  score++;
  currentScoreEl.textContent = `${score}`;
  
  if (askedQuestions.length > 0) {
    createQuizCards(getRandomInt(askedQuestions.length))
  } else {
    endGame()
  }
}

function incorrectSelection(event) {
  event.preventDefault();
  clearCardContent()
  event.currentTarget.setAttribute(
    "style",
    "border: 1px dotted red"
  )
  remainingTime -= 10;
  score--;
  currentScoreEl.textContent = `${score}`;
  
  if (askedQuestions.length > 0) {
    createQuizCards(getRandomInt(askedQuestions.length))
  } else {
    endGame()
  }
}

function endGame() {
  clearCardContent();
  var content = document.getElementById("content-card")

  var endScreenHeader = document.createElement("h3")
  var endScoreText = document.createElement("p")
  var inputContainer = document.createElement("div")
  var nameInitialsInput = document.createElement("input")
  var submitButton = document.createElement("button")

  var nameInputAttributes = {
    type: "text",
    placeholder: "Your initials here",
    id: "initials-input"
  }

  var inputContainerAttributes = {
    style: { margin: "5 auto"}
  }

  var submitButtonAttributes = {
    id: "submit-initials",
    style: { margin: "5 auto"}
  }

  setAttributes(nameInitialsInput, nameInputAttributes)
  setAttributes(inputContainer, inputContainerAttributes)
  setAttributes(submitButton, submitButtonAttributes)
  endScreenHeader.textContent = "All done!"
  endScoreText.textContent = `Your final score is ${score}.`
  submitButton.textContent = 'Submit'
  

  content.appendChild(endScreenHeader)
  content.appendChild(endScoreText)
  content.appendChild(inputContainer)

  inputContainer.appendChild(nameInitialsInput)
  inputContainer.appendChild(submitButton)

  submitButton.addEventListener("click", submitInitials)
}

function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(attr => {
    element.setAttribute(attr, attributes[attr]);
  });
}

function submitInitials() {
  var initials = document.querySelector("#initials-input")
  var allScores = JSON.parse(localStorage.getItem("scoreCollection")) || {}
  allScores[initials.value] = score
  localStorage.setItem("scoreCollection", JSON.stringify(allScores))
  showScoresPage()
}

function showScoresPage() {
  clearCardContent()
  var content = document.getElementById("content-card")
  var allScores = JSON.parse(localStorage.getItem("scoreCollection"))
  var sorted = Object.entries(allScores).sort((a,b) => b[1]-a[1])

  var highScoresHeader = document.createElement('h3')
  var scoreList = document.createElement('ol')
  var restartButton = document.createElement('button')

  var restartButtonAttributes = {
    id: "restartButton"
  }

  setAttributes(restartButton, restartButtonAttributes)

  highScoresHeader.textContent = "Highscores"
  restartButton.textContent = "New Game?"

  content.appendChild(highScoresHeader)
  content.appendChild(restartButton)
  content.appendChild(scoreList)

  Object.entries(sorted).forEach(individualScore => {
    var scoreToAppend = document.createElement('li')
    var individualInitials = individualScore[1][0], individualMatchedScore = individualScore[1][1]
    scoreToAppend.textContent = `${individualInitials}: ${individualMatchedScore}`
    scoreList.appendChild(scoreToAppend)
  })

  restartButton.addEventListener("click", startGame)
}