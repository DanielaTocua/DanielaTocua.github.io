var played = 0
var wins = 0
var playedElement = document.getElementById("played")
var winsElement = document.getElementById("wins")


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
            //Half prob
            document.getElementById("button".concat(button)).src = buttonImages[1]
        orangeButtons.push(button)
        pressed +=1
        if (pressed == 1){
            pressed = 0
            played +=1
            if (Math.random() < 0.5){
                //winned
                wins +=1
                
                while (orangeButtons.length > 0){
                    tempButton  = orangeButtons.pop()
                    greenButtons.push(tempButton)
                    document.getElementById("button".concat(tempButton)).src = buttonImages[2]
                }
                sleep(500).then(() => { 
                    playedElement.innerHTML=playedLabel.concat(played)
                    winsElement.innerHTML=winsLabel.concat(wins)
                    while (greenButtons.length > 0){
                        tempButton  = greenButtons.pop()
                        document.getElementById("button".concat(tempButton)).src = buttonImages[0]
                    }
                });
            } else {
                sleep(200).then(() => { 
                    playedElement.innerHTML=playedLabel.concat(played)
                    winsElement.innerHTML=winsLabel.concat(wins)
                    while (orangeButtons.length > 0){
                        tempButton  = orangeButtons.pop()
                        document.getElementById("button".concat(tempButton)).src = buttonImages[0]
                    }
                });
                
            }
            
        }
        } else if (series < 12){
        //lose
            document.getElementById("button".concat(button)).src = buttonImages[1]
            orangeButtons.push(button)
            pressed +=1
            if (pressed == 1){
                pressed = 0
                played +=1
                sleep(1000).then(() => { 
                    playedElement.innerHTML=playedLabel.concat(played)
                    winsElement.innerHTML=winsLabel.concat(wins)
                    while (orangeButtons.length > 0){
                        tempButton  = orangeButtons.pop()
                        document.getElementById("button".concat(tempButton)).src = buttonImages[0]
                    }
                });
            }
        

        } else{
            //wins
            document.getElementById("button".concat(button)).src = buttonImages[1]
            orangeButtons.push(button)
            pressed +=1
            if (pressed == 1){
                //winned
                pressed = 0
                played +=1
                wins +=1
                
                while (orangeButtons.length > 0){
                    tempButton  = orangeButtons.pop()
                    greenButtons.push(tempButton)
                    document.getElementById("button".concat(tempButton)).src = buttonImages[2]
                }
                sleep(1000).then(() => { 
                    playedElement.innerHTML=playedLabel.concat(played)
                    winsElement.innerHTML=winsLabel.concat(wins)
                    while (greenButtons.length > 0){
                        tempButton  = greenButtons.pop()
                        document.getElementById("button".concat(tempButton)).src = buttonImages[0]
                    }
                });
            }

        }
        series = Math.floor(played / 25) // actualiza el número de serie       
    }
}
    

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}