const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;








const scoreValue = document.getElementById('score-value');
let attempts =12;
const attemptsValue =document.getElementById('attemps-value');

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    checkForMatch();
    updateAttempts();

  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  score += 1;
  scoreValue.textContent = score;
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 700);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function updateScore(value) {
    score += value;
    scoreValue.textContent = score;
  }

  function updateAttempts() {
    attempts -= 1;
    attemptsValue.textContent = attempts;
    if (attempts === 0) {
        restartGame();
      }
    }

    
    function restartGame() {
    
        score = 0;
        attempts = 12;
        scoreValue.textContent = score;
        attemptsValue.textContent = attempts;
        cards.forEach(card => {
            card.classList.remove('flip');
            card.addEventListener('click', flipCard);
          });
    }
      
        
      

  

cards.forEach(card => card.addEventListener('click', flipCard));
