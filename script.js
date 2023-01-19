import birdsData from "./birds.js";

let currentBirdId;
let score = 0;
let currentScore = 5;
let currentStep = 0;
const maxScore = birdsData.length * currentScore;
const defaultBirdImage = "assets/images/bird-shadow.jpg";
const defaultBirdName = "???";
const audio = new Audio('https://soundbible.com/mp3/Computer%20Error-SoundBible.com-399240903.mp3');
const audioRight = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3');

// список элементов
const birdsListEl = document.querySelector(".js-birds-list");
const scoreEl = document.querySelector(".js-score");
const questionBirdAudioEl = document.querySelector(".js-question-bird-audio");
const birdListEl = document.querySelector(".js-birds-list");
const questionBirdImgEl = document.querySelector(".js-question-bird-img");
const questionBirdNameEl = document.querySelector(".js-question-bird-name");
const questionBirdInformationEl = document.querySelector(".js-bird-information");
const nextButtonEl = document.querySelector(".js-next-button");
const startGameButton = document.querySelector(".start-game-button");
const newGameButton = document.querySelector(".new-game-button");
const newPage = document.querySelector(".start-page");
const gamePage = document.querySelector(".game-page");
const finishPage = document.querySelector(".finish-page");
const gameScore = document.querySelector(".js-game-score");
const messageEl = document.querySelector(".js-message");


//вывод птечек в список для выбора
function renderBirdsList(birdsList) {
  let birdsListTemplate = "";
  birdsList.forEach((bird) => {
    // шаблон для радио кнопки птички
    const templateBirdsItem = `<li><input type="radio" value="${bird.id}" name="question-${currentStep}" id="${bird.name}"><label for="${bird.name}"><span></span>${bird.name}</label></li>`;
    birdsListTemplate += templateBirdsItem;
  });
  birdsListEl.innerHTML = birdsListTemplate;
  checkBirdItem();
}

function checkBirdItem() {
  const answersList = document.querySelectorAll(".js-birds-list li input");
  answersList.forEach((item, index) => {
    item.addEventListener("change", (event) => {
      setRightAnswer(index)
      if (event.target.classList.contains("checked")) {
        return;
      }
      event.target.classList.add("checked");
      //is right answer
      if (event.target.value === currentBirdId) {
        nextButtonEl.removeAttribute("disabled");
        birdListEl.classList.add("hidden");
        messageEl.innerHTML = `<p>Правильный ответ! Нажмите кнопу дальше.</p>`;
        messageEl.classList.remove("hidden");
        document.getElementById('audio_id').src = '';
        audioRight.play();
        birdCard(index);
        renderScore();
      } else {
        audio.currentTime = 0;
        audio.play();
        currentScore -= 1;
      }
    });
  })
}

function setRightAnswer(index) {
  const bird = birdsData[currentStep][index];
  questionBirdInformationEl.innerHTML = `
            <div class="bird-title">
                <img src=${bird.image} alt=${bird.name}>
               <div class="bird-name">
                <h2>${bird.name}</h2>
                <p><strong>${bird.species}</strong></p>
              </div>
            </div>
            <audio controls>
              <source src="${bird.audio}" type="audio/mpeg">
              Your browser does not support the audio tag.
            </audio>
            <p>${bird.description}</p>`;
}

function renderScore() {
  score = score + currentScore;
  currentScore = 5;
  scoreEl.innerHTML = score;
  if (score === maxScore) {
    gameScore.innerHTML = `<p>Вы набрали максильмальное количество очков!!!</p>`;
  } else {
    gameScore.innerHTML = `<p>Вы прошли викторину и набрали ${score} из ${maxScore} возможных баллов</p>`;
  }
}

function refreshScore() {
  score = 0;
  scoreEl.innerHTML = score;
}

function refreshStep() {
  currentStep = 0;
}

function selectRightBird() {
  renderBirdsList(birdsData[currentStep]);
  setNavigationActive();
}

function setNavigationActive() {
  const elements = document.querySelectorAll(".navigation li");
  elements.forEach((el, index) => {
    el.classList.remove("active");
    if (index === currentStep) {
      el.classList.add("active");
    }
  });
}

function renderBirdQuestion() {
  const randomIndex = Math.floor(Math.random() * birdsData[currentStep].length);
  const currentBird = birdsData[currentStep][randomIndex];
  currentBirdId = birdsData[currentStep][randomIndex].id.toString();
  questionBirdAudioEl.innerHTML = `<audio id="audio_id" controls>
    <source src="${currentBird.audio}" type="audio/mpeg">
    Your browser does not support the audio tag.
  </audio>`
  questionBirdInformationEl.innerHTML = `<p>Выберите птицу из списка</p>`;
  birdListEl.classList.remove("hidden");
  messageEl.classList.add("hidden");
}

nextButtonEl.addEventListener("click", () => {
  clickNextStep();
})

function clickNextStep() {
  currentStep += 1;
  if (currentStep === birdsData.length) {
    newPage.classList.add("hidden");
    finishPage.classList.add("display");
    gamePage.classList.add("hidden");
    gamePage.classList.remove("display");
    nextButtonEl.setAttribute("disabled", "")
  }
  questionBirdImgEl.setAttribute("src", defaultBirdImage);
  questionBirdNameEl.innerHTML = defaultBirdName;
  selectRightBird();
  renderBirdQuestion();
  nextButtonEl.setAttribute("disabled", "")
}

function birdCard(index) {
  const bird = birdsData[currentStep][index];
  questionBirdImgEl.setAttribute("src", bird.image);
  questionBirdNameEl.innerHTML = bird.name;
}

function renderNewPage() {
  newPage.classList.add("hidden");
  gamePage.classList.add("display");
}

startGameButton.addEventListener("click", () => {
  renderNewPage();
})

newGameButton.addEventListener("click", () => {
  finishPage.classList.add("hidden");
  finishPage.classList.remove("display");
  gamePage.classList.remove("hidden");
  gamePage.classList.add("display");
  birdListEl.classList.remove("hidden");
  messageEl.classList.add("hidden");
  renderBirdsList(birdsData[0]);
  refreshScore();
  refreshStep();
  questionBirdInformationEl.innerHTML = `<p>Выберите птицу из списка</p>`;
  renderNewPage();
  setNavigationActive();
})


renderBirdQuestion();
renderBirdsList(birdsData[currentStep]);
