export var originalWord;
const numTiles= 30;

class Board{
   
   constructor(){
    this.getWordOfTheDay();   
    this.createGameBoard();
       
       //Keyboard.init();
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
      console.log(originalWord);
   }

}
const board1 = new Board(); //create board object

