var played = 0
var wins = 0
var playedElement = document.getElementById("played")
var winsElement = document.getElementById("wins")
var mainMsg = document.getElementById("mainMsg")
var audio = new Audio('coin_get.mp3');


//Round Behaviour
const playedLabel = "Rondas Jugadas: "
const winsLabel = "Puntos Ganados: "
var pressed = 0
var series = 0
const buttonImages = ["images/1.png" , "images/2.png" , "images/3.png"]
var orangeButtons = []
var greenButtons = []
function buttonPressed(button){
    if (series < 13){

        if (series < 10){

        pressed +=1
        if (pressed == 7){
            pressed = 0
            played +=1
            if (Math.random() < 0.5){
                //winned
                wins +=1
                audio.play();
                
                //playedElement.innerHTML=playedLabel.concat(played)
                //winsElement.innerHTML=winsLabel.concat(wins)
            } else {

                    //playedElement.innerHTML=playedLabel.concat(played)
                    //winsElement.innerHTML=winsLabel.concat(wins)
            }
            
        }
        } else if (series < 12){
        //lose
            pressed +=1
            if (pressed == 7){
                pressed = 0
                played +=1
                //playedElement.innerHTML=playedLabel.concat(played)
                //winsElement.innerHTML=winsLabel.concat(wins)
            }
        

        } else{
            //wins

            pressed +=1
            if (pressed == 7){
                //winned
                pressed = 0
                played +=1
                wins +=1
                audio.play();
                //playedElement.innerHTML=playedLabel.concat(played)
                //winsElement.innerHTML=winsLabel.concat(wins)
                // sleep(1000).then(() => { 
                //     
                //     winsElement.innerHTML=winsLabel.concat(wins)
                //     while (greenButtons.length > 0){
                //         tempButton  = greenButtons.pop()
                //         document.getElementById("button".concat(tempButton)).src = buttonImages[0]
                //     }
                // });
            }

        }
        series = Math.floor(played / 25) // actualiza el número de serie       
    } else {
        mainMsg.innerHTML= "Finalizado"
    }
}
    

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}