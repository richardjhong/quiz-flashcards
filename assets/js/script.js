var  timeEl = document.querySelector('.time');
var currentScoreEl = document.querySelector('#currentActualScore')
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
  if (askedQuestions.length === 0) {
    endGame()
    return "ended";
  } else {
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
}

function startGame() {
  clearCardContent()
  askedQuestions = [0, 1, 2, 3, 4]
  createQuizCards(getRandomInt(askedQuestions.length))
  // setTime()
}

startButton.addEventListener("click", startGame)

function setTime () {
  var timerInterval = setInterval(function () {
    timeEl.textContent = remainingTime + " seconds remaining"
    remainingTime--;

    if (remainingTime === 0) {
      clearInterval(timerInterval)
      endGame()
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
  var currentQuestionSet = questionSetCollective[questionSet]
  console.log("here is what createQuizCards is receiving: ", questionSet)
  console.log("currentQuestionSet data: ", currentQuestionSet)


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
  clearCardContent()
  event.currentTarget.setAttribute(
    "style",
    "border: 1px solid black"
  )
  score++;
  currentScoreEl.textContent = `${score}`;

  console.log("askedQuestions.length: ", askedQuestions.length)
  
  createQuizCards(getRandomInt(askedQuestions.length))

}

function incorrectSelection(event) {
  event.preventDefault();
  clearCardContent()
  event.currentTarget.setAttribute(
    "style",
    "border: 1px dotted red"
  )
  score--;
  currentScoreEl.textContent = `${score}`;
  
  createQuizCards(getRandomInt(askedQuestions.length))
  
}

function endGame() {
  clearCardContent();
  var content = document.getElementById("content-card")

  var endScreenHeader = document.createElement("h3")
  var endScoreText = document.createElement("p")

  endScreenHeader.textContent = "All done!"
  endScoreText.textContent = `Your final score is ${score}.`

  content.appendChild(endScreenHeader)
  content.appendChild(endScoreText)

}

