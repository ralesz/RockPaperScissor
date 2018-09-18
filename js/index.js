
var compChoice;
var userChoice; 
var gameover = 'Game over, please press the new game button!';

var params = {
  playerScore: 0,
  compScore: 0, 
  draw: 0, 
  rounds: 0, 
  countRounds: 0, 
  endMatch: 0,
  progress: []};

(function(){
    var buttonChoice = document.querySelectorAll('.player-move');
	  for(var i = 0; i < buttonChoice.length; i++){
    buttonChoice[i].addEventListener('click', function(event) { 
        var gameButtonAtribute = event.target.getAttribute("data-move");
        playMove(gameButtonAtribute);
        });
      }

//czekaj na wciśnięcie przyciusku start i uruchom grę

    var modalLinks = document.getElementById('NewGame');
    for(var i = 0; i < modalLinks.length; i++){
        modalLinks[i].addEventListener('click', startNewGame);
    }
})();

// function getDateFromModal () {
//     document.querySelector('#modal-overlay').classList.add('show');
//     document.querySelector("#modal-start").classList.add('show');
//     params.countRounds = document.getElementById("countRounds");
//     console.log(params.countRounds);
// }

//funkcja losowania wyboru komputera
function getCompChoice() {
  var compChooses = Math.floor(Math.random() * 3 + 1);
  return compChooses;
};



//funkcja start nowej gry i resetu
function startNewGame () {
  newTable()
  params.countRounds = window.prompt('How many rounds do you wanna play?')

  params.playerScore = 0;
  params.compScore = 0;
  params.rounds = 0;
  params.draw = 0;
  // document.getElementById('playerScore').innerHTML = params.playerScore;
  // document.getElementById('compScore').innerHTML = params.compScore;
  // document.getElementById('rounds').innerHTML =  params.rounds;
  document.getElementById('playerResult').innerHTML = '';
  document.getElementById('compResult').innerHTML = '';
  document.getElementById('winner').innerHTML = '';
  // document.getElementById('draw').innerHTML = '0';
  document.getElementById('winnerGame').innerHTML = '';
  document.getElementById('info_play').innerHTML = '';
  console.log(params.countRounds);
  if (params.countRounds == 0 || params.countRounds == null || isNaN(params.countRounds)) {
  document.getElementById('winnerGame').innerHTML = 'Enter correct data';
  }
  else {
    document.getElementById('info_play').innerHTML = 'You can play - make the first move';
    // document.getElementById('countRounds').innerHTML = params.countRounds;
  }

};


//funkcja czyszczenia tabeli
function newTable() {
	var table = document.getElementById("tablescore");
	var rowNumbers = document.getElementById("tablescore").rows.length;
	for (var i = 1; i < rowNumbers; i++) {
    table.deleteRow(1);
    document.getElementById('currentRound').innerHTML = '';
	}
}


//funkcja sprawdzająca czy jest koniec gry i uruchamiająca modal
function endofmatch () {
    document.querySelector('#modal-overlay').classList.add('show');
    document.querySelector("#modal-one").classList.add('show');  
    
    if (params.rounds == params.countRounds && params.playerScore > params.compScore){
      // document.getElementById('winnerGame').innerHTML = 'You won the entire game!<br><br>' + 'gameover';

      var el = document.createElement("div");
      el.id = "myDiv";
      el.innerText = 'You won the entire game!';
      el.style.backgroundColor = "FF6633";    
      var div = document.querySelector(".txt_modal1"); //pobieramy miejsce docelowe
      div.appendChild(el); //wstawiamy element do drzewa dokumentu
      }   
      
      else if (params.rounds == params.countRounds && params.playerScore < params.compScore){
      var el = document.createElement("div");
      el.id = "myDiv";
      el.innerText = "Computer won!";
      el.style.backgroundColor = "FF6633";    
      var div = document.querySelector(".txt_modal1");
      div.appendChild(el);
    }
      else if (params.rounds == params.countRounds && params.playerScore == params.compScore) {
      var el = document.createElement("div");
      el.id = "myDiv";
      el.innerText = "Match for a draw!";
      el.style.backgroundColor = "FF6633";    
      var div = document.querySelector(".txt_modal1");
      div.appendChild(el);
     }
  };


// funkcja wywołująca grę
function playMove(userChoice) {
  //sprawdź czy podano liczbę gier
  if (params.countRounds == 0 || params.countRounds == null || isNaN(params.countRounds)) {
  document.getElementById('winnerGame').innerHTML = 'Press the button: New game';
} 

  //sprawdz czy nie koniec gry - jeśli tak wywołaj funkcję
else if (params.countRounds == params.rounds) {
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
  var currentRound = (params.rounds + 1);
  document.getElementById('currentRound').innerHTML = 'Current round: ' + currentRound;
  document.getElementById('playerResult').innerHTML = 'You chose ' + userChoice + '.';
  document.getElementById('compResult').innerHTML = 'The computer chose ' +  compChoice + '.';
  document.getElementById('winnerGame').innerHTML = '';
      
  //spradź kto wygrał
  if(userChoice == compChoice){
  // winner = null;
  var roundwinner = "draw";

  document.getElementById('winner').innerHTML = "It is a draw!";
  params.draw++;
  params.rounds++;
  
  var currentRound = {
    playerScore: params.playerScore,
    compScore: params.compScore,
    rounds: params.rounds,
    draw: params.draw,
    userC: userChoice,
    compC: compChoice,
    roundW: roundwinner
  }
  params.progress.push(currentRound);
  showResult()
}

  else if((userChoice == 'rock' && compChoice == 'paper') || (userChoice == 'paper' && compChoice == 'scissor') || (userChoice == 'scissor' && compChoice == 'rock')){
  document.getElementById('winner').innerHTML = "Computer win!";
  var roundwinner = "Computer";
  params.compScore++;
  params.rounds++;
  var currentRound = {
    playerScore: params.playerScore,
    compScore: params.compScore,
    rounds: params.rounds,
    draw: params.draw,
    userC: userChoice,
    compC: compChoice,
    roundW: roundwinner
  }
  params.progress.push(currentRound);
  showResult()
  }
  else {
  document.getElementById('winner').innerHTML = "You win!";
  var roundwinner = "Player"; 
  params.playerScore++;
  params.rounds++;
  var currentRound = {
    playerScore: params.playerScore,
    compScore: params.compScore,
    rounds: params.rounds,
    draw: params.draw,
    userC: userChoice,
    compC: compChoice,
    roundW: roundwinner
  }
  params.progress.push(currentRound);
  showResult()
  }
  
  //jeśli ostatnia runda wywołaj funkcję
  if (params.countRounds == params.rounds){
      endofmatch ();
  }
  // document.getElementById('rounds').innerHTML = params.rounds;
 }
};


//funkcja wstawiająca wyniki gry do tablicy
function showResult() {
  var x = params.rounds-1;
  console.log(x);
  console.log(params.progress[x].compC);
  console.log(params.progress[x].userC);

	var table = document.getElementById("tablescore");
  var row = table.insertRow(params.rounds);
	var RoundTab = row.insertCell(0);
	var playerMoveTab = row.insertCell(1);
  var computerMoveTab = row.insertCell(2);
  var roundWin = row.insertCell(3);
  var roundresultTab = row.insertCell(4);
  // console.log(params.progress.compChoice);
	RoundTab.insertAdjacentHTML('beforeend', params.rounds);
	playerMoveTab.insertAdjacentHTML('beforeend', params.progress[x].userC);
  computerMoveTab.insertAdjacentHTML('beforeend', params.progress[x].compC);
  roundWin.insertAdjacentHTML('beforeend', params.progress[x].roundW);
  roundresultTab.insertAdjacentHTML('beforeend', params.playerScore + " - " + params.compScore);
}

//modale 

var showModal = function(event){
  event.preventDefault();		
  //znajdz aktywny modal  
  var activeModalLink = event.target.getAttribute('href');  
  //dodanie klasy "show" do aktywnego modala
  document.querySelector('#modal-overlay').classList.add('show');
  document.querySelector(activeModalLink).classList.add('show');     
};

(function () {
  var allModalLinks = document.querySelectorAll('.show-modal');
  for(var i = 0; i < allModalLinks.length; i++){
  allModalLinks[i].addEventListener('click', showModal);
  }
})();

// Funkcja zamykającą modal, oraz przywiązujemy ją do kliknięć na elemencie z klasą "close". 

var hideModal = function(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');  	

  var element = document.getElementById('txt_modal1');
  while (element.firstChild) {
  element.removeChild(element.firstChild);
  }

  //usunięcie klasy "show" z modali
  var allModal = document.querySelectorAll('.modal');
  var n;
    for (n = 0; n < allModal.length; n++) {
        allModal[n].classList.remove('show');
    }
};	

(function () {
  var closeButtons = document.querySelectorAll('.modal .close');	
  for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
  }

// zamnknięcie - kliknięcie w overlay 
  document.querySelector('#modal-overlay').addEventListener('click', hideModal);

// propagację kliknięć z modala 
var modals = document.querySelectorAll('.modal');	
  for(var i = 0; i < modals.length; i++){
  modals[i].addEventListener('click', function(event){
  event.stopPropagation();
  });
}

})();
