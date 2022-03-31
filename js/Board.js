export var originalWord;
const numTiles= 30;

import {countdownTimeStart} from './Game.js';

export class Board{
   
   constructor(){
    var getGameStatus = localStorage.getItem("gameComplete"); 
    
      if(getGameStatus == 'true' || getGameStatus != null){
         this.showGameStatus();
      }
      else{ 
         this.getWordOfTheDay();   
         this.createGameBoard();
      } 
     
   }

    createGameBoard(){
         console.log("Board created");
         var board = document.getElementById("game-board");
         for(var i = 0; i < numTiles; i++){
            var tile = document.createElement('div');
            tile.id=`tiles-${i}`;
            tile.classList.add('tiles');
            //tile.innerHTML="A";
            board.appendChild(tile);
         }
   }

   async getWordOfTheDay(){
      const response = await fetch("http://localhost/wordle/api/getWordofTheDay.php");
      const today_word = await response.json();
      
      originalWord = today_word.toUpperCase().split('');
      //console.log(originalWord);
   }

   showGameStatus(){
      countdownTimeStart();// To calculate the recent time and show it on the screen
      const gameStatus = document.getElementById("game-status");
      const gameResult = document.getElementById("game-result");
      const gameAttempt = document.getElementById("game-attempt");
      var head1 = document.createElement("h1");
      var head2 = document.createElement("h1");
      gameStatus.style.visibility = "visible";
      
      head1.innerHTML = "Result: <span class='txtColor'>"+localStorage.getItem("gameResult")+"</span>";
      gameResult.appendChild(head1);
      
      head2.innerHTML = "Total Attempt: <span class='txtColor'>"+localStorage.getItem("totalAttempt")+"</span>";
      gameAttempt.appendChild(head2);
   }

}
const board1 = new Board(); //create board object

