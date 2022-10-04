var timeEl = document.querySelector('.time');
var currentScoreEl = document.querySelector('#currentActualScore')
var currentHighScore = document.querySelector('#currentHighScore')
var viewScores = document.querySelector('#highscorelink')
var content = document.getElementById("content-card")
var remainingTime;
var askedQuestions;
var score;

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
    header: "What keyword is used to check whether a given property is valid or not?",
    questions: [
      ["incorrect", "is in"],
      ["incorrect", "exists"],
      ["incorrect", "lies"],
      ["correct", "in"],
    ]
  },
  "fourth": {
    header: "Which of the following is a primitive type in JavaScript?",
    questions: [
      ["incorrect", "string"],
      ["incorrect", "boolean"],
      ["incorrect", "Neither string nor boolean"],
      ["correct", "Both string and boolean"],
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

startLoad()

function startLoad() {
  clearCardContent()
  var startLoadHeader = document.createElement("h3")
  var paragraphContainer = document.createElement("div")
  var buttonContainer = document.createElement("div")
  var paragraph = document.createElement("p")
  var startButton = document.createElement("button")

  startLoadHeader.textContent = "Coding Quiz Challenge"
  paragraph.textContent = "Try to answer the following code-related questions within the time limit (60s). Keep in mind that each incorrect answer will penalize your score and reduce remaining time by ten seconds!"
  startButton.textContent = "Start Quiz"
  startButton.setAttribute("id", "start-game")

  content.appendChild(startLoadHeader)
  content.appendChild(paragraphContainer)
  paragraphContainer.appendChild(paragraph)
  content.appendChild(buttonContainer)
  buttonContainer.appendChild(startButton)
}

function clearCardContent () {
  while (content.firstChild) {  
    content.removeChild(content.firstChild)
  }
}

function startGame() {
  clearCardContent()
  askedQuestions = [0, 1, 2, 3, 4]
  remainingTime = 60
  score = 0
  currentScoreEl.textContent = `${score}`
  createQuizCards(getRandomInt(askedQuestions.length))
  setTime()
}

function setTime () {
  var timerInterval = setInterval(function () {
    remainingTime--;
    timeEl.textContent = remainingTime + " seconds remaining"

    if (remainingTime <= 0 && askedQuestions.length !== 0) {
      clearInterval(timerInterval)
      endQuiz()
    } else if (askedQuestions.length === 0) {
      clearInterval(timerInterval)
    }
  }, 1000)
}

function getRandomInt(max) {
  let index = Math.floor(Math.random() * max);
  switch (askedQuestions[index]) {
    case 0: 
      askedQuestions.splice( index, 1 )
      return "first";
    case 1: 
      askedQuestions.splice( index, 1 )
      return "second";
    case 2:
      askedQuestions.splice( index, 1 )
      return "third";
    case 3:
      askedQuestions.splice( index, 1 )
      return "fourth"
    case 4:
      askedQuestions.splice( index, 1 )
      return "fifth"
    default:
      return;
  }
}

function randomizeAnswerOrder(answers) {
  var randomizedAnswers = []

  while (answers.length > 0) {
    let index = Math.floor(Math.random() * answers.length);
    randomizedAnswers.push(answers[index])
    answers.splice(index, 1)
  }

  return randomizedAnswers;
}

function createQuizCards (questionSet) {
  var content = document.getElementById("content-card")
  var currentQuestionSet = questionSetCollective[questionSet]
  var randomizedAnswers = randomizeAnswerOrder([...currentQuestionSet.questions])
  var questionHeader = document.createElement('h3')
  var questionList = document.createElement('ol')
  content.appendChild(questionHeader)
  content.appendChild(questionList)

  randomizedAnswers.forEach(answer => {
    var answerToAppend = document.createElement('li')
    answerToAppend.textContent = answer[1]

    if (answer[0] === "correct") {
      answerToAppend.setAttribute("id", "correct-answer")
    } else {
      answerToAppend.setAttribute("id", "incorrect-answer")
    }

    questionList.appendChild(answerToAppend)
  })
  
  questionHeader.textContent = currentQuestionSet.header
}

function endQuiz() {
  clearCardContent();
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

  setAttributes(nameInitialsInput, nameInputAttributes)
  submitButton.setAttribute("id", "submit-button")
  endScreenHeader.textContent = "All done!"
  endScoreText.textContent = `Your final score is ${score}.`
  submitButton.textContent = 'Submit'
  
  content.appendChild(endScreenHeader)
  content.appendChild(endScoreText)
  content.appendChild(inputContainer)

  inputContainer.appendChild(nameInitialsInput)
  inputContainer.appendChild(submitButton)
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
  var allScores = JSON.parse(localStorage.getItem("scoreCollection"))
  var highScoresHeader = document.createElement('h3')
  var buttonContainer = document.createElement('div')
  var goBackButton = document.createElement('button')

  
  content.appendChild(highScoresHeader)
  content.appendChild(buttonContainer)
  buttonContainer.appendChild(goBackButton)
  
  goBackButton.setAttribute("id", "go-back-button")
  goBackButton.textContent = "Go back?"

  if (allScores !== null) {
    var sorted = Object.entries(allScores).sort((a,b) => b[1]-a[1])
    var scoreList = document.createElement('ol')
    var clearScores = document.createElement('button')
    var restartButton = document.createElement('button')
  
    highScoresHeader.textContent = "Highscores"
    restartButton.textContent = "New Game?"
    clearScores.textContent = "Clear Scores?"
  
    buttonContainer.appendChild(restartButton)
    buttonContainer.appendChild(clearScores)
    content.appendChild(scoreList)

    restartButton.setAttribute("id", "restart-button")
    clearScores.setAttribute("id", "clear-scores-button")
  
    Object.entries(sorted).forEach(individualScore => {
      var scoreToAppend = document.createElement('li')
      var individualInitials = individualScore[1][0], individualMatchedScore = individualScore[1][1]
      scoreToAppend.textContent = `${individualInitials}: ${individualMatchedScore}`
      scoreList.appendChild(scoreToAppend)
    })
  
    clearScores.addEventListener("click", () => {
      localStorage.removeItem("scoreCollection")
      scoreList.innerHTML = ""
      buttonContainer.removeChild(buttonContainer.lastChild)
      buttonContainer.removeChild(buttonContainer.lastChild)
      highScoresHeader.textContent = "No scores available"
    })
  } else {
    highScoresHeader.textContent = "No scores available"
  }
}

function correctSelection() {
  clearCardContent()
  score++;
  currentScoreEl.textContent = `${score}`;
  
  if (askedQuestions.length > 0) {
    createQuizCards(getRandomInt(askedQuestions.length))
  } else {
    endQuiz()
  }
}

function incorrectSelection() {
  clearCardContent()
  remainingTime -= 10;
  score--;
  currentScoreEl.textContent = `${score}`;
  
  if (askedQuestions.length > 0) {
    createQuizCards(getRandomInt(askedQuestions.length))
  } else {
    endQuiz()
  }
}

function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(attr => {
    element.setAttribute(attr, attributes[attr]);
  });
}

content.addEventListener('click', function(e) {
  if (e.target.id === 'start-game' || e.target.id === "restart-button") {
    startGame()
  }
  
  if (e.target.id === 'correct-answer') {
    correctSelection()
  } else if (e.target.id === "incorrect-answer") {
    incorrectSelection()
  }
  
  if (e.target.id === "submit-button") {
    submitInitials()
  }
  
  if (e.target.id === "go-back-button") {
    startLoad()
  }
})

viewScores.addEventListener("click", showScoresPage)
