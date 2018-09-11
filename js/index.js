var playerScore = 0;
var compScore = 0;
var draw = 0;
var rounds = 0;
var countRounds = 0;
var endMatch = 0;
var gameover = 'Game over, please press the new game button!';

//czekaj na zdarzenie związane z kliknęciem boxa 
document.getElementById('box_rock').onclick=function playRock() {playMove('rock')};
document.getElementById('box_paper').onclick=function playPaper() {playMove('paper')}
document.getElementById('box_scissor').onclick=function playScissors() {playMove('scissor')}
document.getElementById('NewGame').onclick=startNewGame;
  
//funkcja losowania wyboru komputera
function getCompChoice() {
  var compChooses = Math.floor(Math.random() * 3 + 1);
  return compChooses;
};

//funkcja start nowej gry i resetu
function startNewGame () {
  countRounds = window.prompt('How many rounds do you wanna play?')
  playerScore = 0;
  compScore = 0;
  rounds = 0;
  draw = 0;
  document.getElementById('playerScore').innerHTML = playerScore;
  document.getElementById('compScore').innerHTML = compScore;
  document.getElementById('rounds').innerHTML = rounds;
  document.getElementById('playerResult').innerHTML = '';
  document.getElementById('compResult').innerHTML = '';
  document.getElementById('winner').innerHTML = '';
  document.getElementById('draw').innerHTML = '0';
  document.getElementById('winnerGame').innerHTML = '';
  document.getElementById('info_play').innerHTML = '';
  if (countRounds == 0 || countRounds == null || isNaN(countRounds)) {
  document.getElementById('winnerGame').innerHTML = 'Enter correct data';
  }
  else {
    document.getElementById('info_play').innerHTML = 'You can play - make the first move';
    document.getElementById('countRounds').innerHTML = countRounds;
  }

};

//funkcja sprawdzająca czy jest koniec gry
function endofmatch () {
      if (rounds == countRounds && playerScore > compScore){
      document.getElementById('winnerGame').innerHTML = 'You won the entire game!<br><br>' + gameover;
      }   
      else if (rounds == countRounds && playerScore < compScore){
     document.getElementById('winnerGame').innerHTML = 'Computer won!<br><br>' + gameover;
             }
      else if (rounds == countRounds && playerScore == compScore) {
     document.getElementById('winnerGame').innerHTML = 'Match for a draw!<br><br>' + gameover;
     }
  };


// funkcja wywołująca grę
function playMove(userChoice) {
  //sprawdź czy podano liczbę gier
  if (countRounds == 0) {
  document.getElementById('winnerGame').innerHTML = 'Press the button: New game';
} 

  //sprawdz czy nie koniec gry - jeśli tak wywołaj funkcję
else if (countRounds == rounds) {
  endofmatch ();
} 
  
else {
 //wywołaj funkcję losowania przez komputer
  var compChoice = getCompChoice();
  document.getElementById('info_play').innerHTML = '';

  //zamien liczbę na string
  if (compChoice == 1) {compChoice = 'rock'}
  else if (compChoice == 2) {compChoice = 'paper'}
  else if (compChoice == 3) {compChoice = 'scissor'};
  
  //podaj wyniki wyboru i losowania
  document.getElementById('playerResult').innerHTML = 'You chose ' + userChoice + '.';
  document.getElementById('compResult').innerHTML = 'The computer chose ' +  compChoice + '.';
  document.getElementById('winnerGame').innerHTML = '';
      
  //spradź kto wygrał
  if(userChoice == compChoice){
  winner = null;
  document.getElementById('winner').innerHTML = "It is a draw!";
  draw++;
  rounds++;
  }
  else if((userChoice == 'rock' && compChoice == 'paper') || (userChoice == 'paper' && compChoice == 'scissor') || (userChoice == 'scissor' && compChoice == 'rock')){
  document.getElementById('winner').innerHTML = "Computer win!";
  compScore++;
  rounds++;
  }
  else {
  document.getElementById('winner').innerHTML = "You win!"; 
  playerScore++;
  rounds++;
  }
 
  // podaj wyniki gry i liczbę rund
  document.getElementById('playerScore').innerHTML = playerScore;
  document.getElementById('compScore').innerHTML = compScore;
  document.getElementById('draw').innerHTML = draw;
  //jeśli ostatnia runda wywołaj funkcję
  if (countRounds == rounds){
      document.getElementById('rounds').innerHTML = rounds;
      endofmatch ();
  }
  document.getElementById('rounds').innerHTML = rounds;
 }
};