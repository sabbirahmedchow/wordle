var isWrong = false;
var isWon = false;
var isComplete = false;
var totalStep = 0;
var j = 0;
var numKeyPress = 5;
var word= [];
var k = 0; 
var numberFound = 0;
var letterArr = [];

import {originalWord, Board} from './Board.js'; //import today's word and the board to initialize it when the game is finished.


document.addEventListener("keydown", function(event) { //When a key is pressed
    
    if(event.getModifierState("CapsLock"))
    {
        alert("Turn your caps lock off!!");
        event.preventDefault();
        return false;
    }
    var key = event.keyCode || event.charCode;

    if(key == 8 && numKeyPress < 5){ // if backspace is pressed
        j=j-1;  
        numKeyPress++;
        word.pop(0, -1);
        letterArr.pop(0, -1);
        document.getElementById(`tiles-${j}`).innerHTML = "";
        if(event.key != "Backspace")
        document.getElementById(`btn-${event.key}`).removeAttribute("id");
       }

    //set the pressed characters in to the respective tiles.
    while(numKeyPress != 0 && event.key != "Enter")
    {
        if(isWon == true)
        {
            event.preventDefault();
            return false;
        }
        if(isWrong == true)
        {
        j = j-5;
        isWrong = false;
        }
    
        if((key >= 65 && key <= 90) && key != 8) { //only allow letters
            letterArr.push(`btn-${event.key}`);
            numKeyPress--;
            document.getElementById(`tiles-${j}`).innerHTML = event.key.toUpperCase();
            word.push(event.key.toUpperCase());
            if(isWrong == false)
            j++;
        }
        return false;
    }
    // Once the 5 characters are pressed, turn the numKeyPress counter to zero for next turn.     
    if(event.key == "Enter" && numKeyPress == 0)
    {
        numKeyPress = 5;
        //send the word to check for further validation.
        checkWord(word, j, letterArr);
        word=[];
        
    }   
    
  });

  //create the keyboard and add functionality to it.
  const Keyboard = {
    
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        

        // Setup main elements
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", 
            "a", "s", "d", "f", "g", "h", "j", "k", "l", 
            "backspace", "z", "x", "c", "v", "b", "n", "m", "enter"
            
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");
            //keyElement.id= key.toUpperCase();
            keyElement.id= `btn-${key}`;
            
            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        if(numKeyPress < 5){  
                        j=j-1;  
                        numKeyPress++;
                        word.pop(0, -1);
                        letterArr.pop(0, -1);
                        document.getElementById(`tiles-${j}`).innerHTML = "";
                        document.getElementById(`btn-${key}`).removeAttribute("id");
                        this._triggerEvent("oninput");
                        }
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        numKeyPress = 5;
                        //send the word to check for further validation.
                        checkWord(word, j, letterArr);
                        word=[];
                        
                        this._triggerEvent("oninput");
                    });

                    break;

                default:
                    keyElement.textContent = key.toUpperCase();
                      
                    keyElement.addEventListener("click", (event) => {
                        letterArr.push(`btn-${key}`);
                        
                        while(numKeyPress != 0 && key != "Enter")
                        {
                            
                            if(isWrong == true)
                            {
                            j = j-5;
                            isWrong = false;
                            }
                            if(isWon == true)
                            {
                                event.preventDefault();
                                return false;
                            }
                        
                            if(((key >= 'A' && key <= 'Z') || (key >= 'a' && key <= 'z')) && key != 8) { //only allow letters
                                
                                numKeyPress--;
                                document.getElementById(`tiles-${j}`).innerHTML = key.toUpperCase();
                                word.push(key.toUpperCase());
                                
                                if(isWrong == false)
                                j++;
                                
                            }
                            return false;
                        }
                        this._triggerEvent("oninput");
                        
                    });
                    
                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
            
        });
       
        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

async function checkWord(w, j, lArr){
    totalStep++;
    let text = w.toString().replace(/,/g,''); //convert array to string and remove comma from string 
    var counter = j-5;
    //check if the word is in the dictionary.
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
    const data = await response.json();
    if(data.title == "No Definitions Found")
        {
            iziToast.error({
                position: 'topCenter',
                backgroundColor: '#ff0000',
                messageColor: '#ffffff',
                progressBarColor: '#ffffff',
                color: '#ff0000',
                title: 'Error',
                message: 'Not in word list',
                
            });
            isWrong = true;
            letterArr.splice(-5);//remove invalid word from array
            for(var i = counter; i < j; i++)
            {
                document.getElementById(`tiles-${i}`).innerHTML = "";
            }
            
        }

        else{
           
         for(var i=0; i<5; i++)
         {
            console.log(originalWord)   
            if(originalWord.includes(w[i]))
            {
                 //console.log(`the found word is:${originalWord[i]} index is:${i}`);
                 if(originalWord[i] == w[i])
                 {
                  numberFound++;   
                  document.getElementById(`tiles-${k}`).classList.add('word-found');
                  if(numberFound == 5)
                  {
                        isWon = true;
                        iziToast.success({
                            position: 'topCenter',
                            backgroundColor: '#00ff00',
                            messageColor: '#ffffff',
                            progressBarColor: '#ffffff',
                            color: '#00ff00',
                            title: 'Success',
                            message: 'Great, You found the word!',
                            onClosing: function(){
                                isComplete = true;
                                localStorage.setItem("gameComplete", isComplete);
                                localStorage.setItem("gameResult", "Won");
                                countdownTimeStart();
                                const board1 = new Board(); //initialize the board once again
                                document.getElementById("game-board").style.display = "none";
                                document.getElementById("game-status").style.visibility = "visible";
                                Keyboard.close();
                           }
                        });
                        // FB.ui({
                        //     display: 'popup',
                        //     method: 'feed',
                            
                        //   }, function(response){});
                  }
                  document.getElementById(lArr[k]).classList.add('keyboard__key--found');  
                }
                  else
                  {
                    numberFound = 0;   

                    document.getElementById(`tiles-${k}`).classList.add('word-found-not-in-place');
                    document.getElementById(lArr[k]).classList.add('keyboard__key--nofound-place');
                  }
             }
             else{
                numberFound = 0;
               
                document.getElementById(`tiles-${k}`).classList.add('word-not-found');
                   document.getElementById(lArr[k]).classList.add('keyboard__key--not-found');
             }
             k++;
             
         }
         
         if(k == 30 && isWon == false) //when the game is completed
         {
            let today_word = originalWord.toString().replace(/,/g,'');
            iziToast.error({
                position: 'topCenter',
                backgroundColor: '#ff0000',
                messageColor: '#000000',
                progressBarColor: '#ffffff',
                color: '#ff0000',
                title: 'Failed',
                message: `The actual word is: ${today_word}`,
                onClosing: function(){
                    isComplete = true;
                    localStorage.setItem("gameComplete", isComplete);
                    localStorage.setItem("gameResult", "Lost");
                    countdownTimeStart();
                    const board1 = new Board(); //initialize the board once again
                    document.getElementById("game-board").style.display = "none";
                    document.getElementById("game-status").style.visibility = "visible";
                    Keyboard.close();
               }
            });
             
         }

        }
        localStorage.setItem("totalAttempt", totalStep);
    }
   
window.addEventListener("DOMContentLoaded", function () {
    if(localStorage.getItem("gameComplete") == "false" || localStorage.getItem("gameComplete") == null)
    Keyboard.init();

});

export function countdownTimeStart(){

var getCountDownDate = localStorage.getItem("countDownDate");

var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
console.log(currentDate)
var day = currentDate.getDate()
var month = currentDate.getMonth() + 1
var year = currentDate.getFullYear()
var time = currentDate.toLocaleTimeString();

var dateStr = convertDateForIos(`${year}-${month}-${day} ${time}`);

//var dateStr = new Date(`${year}-${month}-${day} ${time}`);

if(getCountDownDate == null)
var countDownDate = new Date(dateStr).getTime();
else
var countDownDate = getCountDownDate;

localStorage.setItem("countDownDate", countDownDate);

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();
  
  // Find the distance between now an the count down date
  var distance = countDownDate - now;
  
  // Time calculations for days, hours, minutes and seconds
  var hours = Math.floor(parseInt((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  var minutes = Math.floor(parseInt((distance % (1000 * 60 * 60)) / (1000 * 60)));
  var seconds = Math.floor(parseInt((distance % (1000 * 60)) / 1000));

  hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
  
  // If the count down is over, clear the localstorage and reload the page 
  if (distance < 0) {
      localStorage.clear();
      clearInterval(x);
      location.reload();
      return false;
   } 

  // Output the result in an element with id="demo"
  document.getElementById("time-remain").innerHTML = "<span>Next Word In:</span><br/>"+hours + "h "
  + minutes + "m " + seconds + "s ";

}, 1000);

}

function convertDateForIos(date) {
    var arr = date.split(/[- :]/);
    date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
    return date;
}










  