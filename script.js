let maxScore = 0;
let highestScore = 0;
let maxR1 = 0;
let maxR2 = 0;
let gameOn = false; 
//Initial Alert
window.alert("Welcome to the game!! \nHighest Scorer is "+ localStorage.getItem("highestScorer") +" and Highest Score is = " + localStorage.getItem("highestScore"));
const rod1 = document.getElementById('rod1'); //fetching rod1
const rod2 = document.getElementById('rod2');//fetching rod2
const ball = document.getElementById('ballId');//fetching ball
const gameBox = document.getElementById('game-box');//fetching gamebox
let aPressed = false;
let dPressed = false;
document.addEventListener('keydown',keyDownHandler);  //keydown event 
document.addEventListener('keyup',keyUpHandler);      //keyup event
//keyDownHandler
function keyDownHandler(e){
    if(e.key == 'a'){
        aPressed = true;
        console.log('a pressed');
    }
    else if(e.key == 'd'){
        dPressed = true;
    }
}
//keyUpHandler
function keyUpHandler(e){
    if(e.key == 'a'){
        aPressed = false;
    }
    else if(e.key == 'd'){
        dPressed = false;
    }
}

let Vx = -2; //Velocity in x direction
let Vy = -5;//Velocity in y direction

let V = Math.sqrt(Math.pow(Vx,2) + Math.pow(Vy,2)); //total velocity of the ball


//reset function to reset whenever one wins
function reset(rod){
    
    
     let winnerRod = localStorage.getItem("lastWon"); //keeping a track of who won at the last
     if(winnerRod === "rod2"){
         ball.style.top = rod1.offsetTop + rod1.offsetHeight + "px"; //rod1 gets the ball
     }
     else if(winnerRod === "rod1"){
        ball.style.top = gameBox.offsetHeight - rod2.offsetHeight - ball.offsetHeight + "px"; //rod2 gets the ball
     }
     Vx = -2;
     Vy = -5;
     V = Math.sqrt(Math.pow(Vx,2) + Math.pow(Vy,2));
   
    rod1.style.left = "calc(50% - 150px)"; //to take rod1 in the middle
    rod2.style.left = "calc(50% - 150px)";//to take rod2 in the middle
     ball.style.left = "calc(50% - 10px)";//ball position with respect to rod1 or rod 2
     gameOn = false;
    
}
//function to check collision
function checkCollison(activePaddle){
    //fetching ball's offset
let ballTopHeight = ball.offsetTop;
let ballBottomHeight = ball.offsetTop + ball.offsetHeight;
let ballLeft = ball.offsetLeft;
let ballRight = ball.offsetLeft + ball.offsetWidth;

//fetching active paddle's offset
let paddleTopHeight = activePaddle.offsetTop + activePaddle.offsetHeight;
let paddleBottomHeight = activePaddle.offsetTop;
let paddleLeft = activePaddle.offsetLeft;
let paddleRight = activePaddle.offsetLeft + activePaddle.offsetWidth;

if(ballRight >= paddleLeft && ballLeft <= paddleRight && ballTopHeight <= paddleTopHeight && ballBottomHeight >= paddleBottomHeight){
    console.log('collison detected');
    return true;
}
else{
    return false;
}
}
//function to determine winner
function winner(r2,r1){
    if(maxR2 > maxR1){
        localStorage.setItem("maxScore",maxR2);
        if(localStorage.getItem("highestScore") === undefined) {
        localStorage.setItem("highestScore","0");
        }
        if(localStorage.getItem("maxScore") > localStorage.getItem("highestScore") ){
            localStorage.setItem("highestScore",localStorage.getItem("maxScore"));
        }
        window.alert('ROD II is the Winner, Score = ' + localStorage.getItem("maxScore")+" Highest Score " +localStorage.getItem("highestScore"));
        
        console.log('rod 2');
        localStorage.setItem("highestScorer","Rod II"); //storing in local storage highestScorer
        localStorage.setItem("lastWon","rod2");//storing in local storage who last won
    }
    else if(maxR1 > maxR2){
        localStorage.setItem("maxScore",maxR1);
        if(localStorage.getItem("highestScore") === undefined) {
            localStorage.setItem("highestScore","0");
            }
            if(localStorage.getItem("maxScore") > localStorage.getItem("highestScore") ){
                localStorage.setItem("highestScore",localStorage.getItem("maxScore"));
            }
            window.alert('ROD I is the Winner, Score = ' + localStorage.getItem("maxScore")+" Highest Score " +localStorage.getItem("highestScore"));
        console.log('rod 1');
        localStorage.setItem("highestScorer","Rod I");//storing in local storage highestScorer
        localStorage.setItem("lastWon","rod1");//storing in local storage who last won
    }
}
//the main function that runs the game
function gameLoop(){
     if(!gameOn) {
        return;
     }
     if(ball.offsetTop < 0){
        
        winner(maxR2,maxR1);
        reset(rod1);
        reset(rod2);
        Vy = -Vy;
     }
     if(ball.offsetLeft > gameBox.offsetWidth - ball.offsetWidth ){
        Vx = -Vx; //ball will bounce
     }
     if(ball.offsetTop > gameBox.offsetHeight - ball.offsetHeight){
        winner(maxR2,maxR1);
        reset(rod1);
        reset(rod2);
        Vy = -Vy;
     }
     if(ball.offsetLeft < 0){
        Vx = -Vx; //ball will bounce
     }

     let activePaddle = ball.offsetTop < gameBox.offsetHeight / 2 ? rod1 : rod2; //fetching the active paddle
     let ballCenterX = ball.offsetLeft + (ball.offsetHeight / 2); //fetching center of the ball
     let paddleCenterX =  activePaddle.offsetLeft + (activePaddle.offsetWidth / 2);//fetching center of the paddle
     let angle = 0; 
     //checking if collison happens
     if(checkCollison(activePaddle)){
      if(activePaddle == rod1){
        if(ballCenterX > paddleCenterX){
            angle = -3*Math.PI/4; // giving direction to the ball
        }
        else if(ballCenterX < paddleCenterX){
            angle = -Math.PI/4;// giving direction to the ball
        }
        else{
            angle = 0;// giving direction to the ball
        }
        maxR1 += 50; //incrementing points after each collison
      }
      else if(activePaddle == rod2){
        if(ballCenterX > paddleCenterX){
            angle = 3*Math.PI/4;// giving direction to the ball
        }
        else if(ballCenterX < paddleCenterX){
            angle = Math.PI/4;// giving direction to the ball
        }
        else{
            angle = 0;// giving direction to the ball
        }
        maxR2 += 50;//incrementing points after each collison
      }
      V = V + 0.5;//increasing velocity by 0.5 after each collison

      //changing angle to degree
      Vx = V * Math.cos(angle);
      Vy = V * Math.sin(angle);

     }
     //giving the ball velocity
     ball.style.left = ball.offsetLeft - Vx + "px";
     ball.style.top = ball.offsetTop - Vy +"px";
     //rod movement inside the viewport
    if(aPressed && (rod1.offsetLeft > 0 && rod2.offsetLeft > 0)){
    rod1.style.left = rod1.offsetLeft - 5 + "px";
    rod2.style.left = rod2.offsetLeft - 5 + "px";
    }
    else if(dPressed  && (rod1.offsetLeft < gameBox.offsetWidth - rod1.offsetWidth && rod2.offsetLeft < gameBox.offsetWidth - rod2.offsetWidth)){
        rod1.style.left = rod1.offsetLeft + 5 + "px";
        rod2.style.left = rod2.offsetLeft + 5 + "px";
    }
    //to run the function on loop
    requestAnimationFrame(gameLoop);
    

}
//keyboard event listener
window.addEventListener('keyup',(event)=>{
    if(event.keyCode == 13 && !gameOn){
        localStorage.setItem("maxScore", 0);
        maxR1=0;
        maxR2=0;
        gameOn =true;
        gameLoop();
    }
    
    
});




