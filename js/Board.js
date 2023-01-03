export var originalWord;
const numTiles= 30;

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
      
      const gameStatus = document.getElementById("game-status");
      const gameResult = document.getElementById("game-result");
      const gameAttempt = document.getElementById("game-attempt");
      const gameBtn = document.getElementById("btnNew");

      var head1 = document.createElement("h1");
      var head2 = document.createElement("h1");
      var btn1 = document.createElement("button");
      gameStatus.style.visibility = "visible";
      
      head1.innerHTML = "Result: <span class='txtColor'>"+localStorage.getItem("gameResult")+"</span>";
      gameResult.appendChild(head1);
      
      head2.innerHTML = "Total Attempt: <span class='txtColor'>"+localStorage.getItem("totalAttempt")+"</span>";
      gameAttempt.appendChild(head2);

      btn1.innerHTML = "Play Again";
      btn1.addEventListener("click", () => {
         localStorage.clear();
         location.reload();

      });
      btn1.classList.add("btnCls");
      gameBtn.appendChild(btn1);
   }

}
const board1 = new Board(); //create board object
//this line is for test branch
