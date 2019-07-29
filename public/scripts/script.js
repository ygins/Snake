import {RIGHT, getDirection} from "./direction.js";
import * as State from "./state.js";
import {Square} from "./square.js";
import {Board} from './board.js';
import "../sass/style.scss";
const BOARD_ID="board";
const onLoad=(...funcs)=>window.addEventListener('load',()=>funcs.forEach(func=>func()));
const OPTIONS={
sqaureDiameter:20,
xGridSquareNumber:50,
zGridSquareNumber:25
};
onLoad(()=>{
  //Initialize Directions
  let myBoard=new Board(OPTIONS, BOARD_ID);
  myBoard.squares[5][5].state=State.APPLE;
  let snakeHead={
    currentPosition:myBoard.squares[OPTIONS.zGridSquareNumber/2 |0][OPTIONS.xGridSquareNumber/2 |0],
    currentDirection: RIGHT,
    tailLength: 5
  };
  let trail=[];
  snakeHead.move=function(){
    if(trail.length>snakeHead.tailLength){
      let oldTail=trail.shift();
      oldTail.state=State.EMPTY;
    }
      if(!snakeHead.currentDirection.canMoveThisWayFrom(snakeHead.currentPosition.row, snakeHead.currentPosition.column, myBoard)){
        return true;
      }
      let newSquare=snakeHead.currentDirection.getSquareInThisDirection(snakeHead.currentPosition.row, snakeHead.currentPosition.column, myBoard);
      if(newSquare.state==State.SNAKE){
        return true;
      }
      let apple=false;
      if(newSquare.state==State.APPLE){
        snakeHead.tailLength+=2;
        apple=true;
      }
      trail.push(snakeHead.currentPosition);
      snakeHead.currentPosition=newSquare;
      snakeHead.currentPosition.state=State.SNAKE;
      if(apple){
        myBoard.spawnApple();
      }

      return false;
    };
  window.addEventListener('keydown',(event)=>{
    let direction=getDirection(event.keyCode);
    if(direction!=undefined){
      event.preventDefault();
    }
    snakeHead.currentDirection= direction|| snakeHead.currentDirection;
  });

  let task=window.setInterval(()=>{
     let shouldStop=snakeHead.move();
     if(shouldStop){
       clearInterval(task);
       return;
     }
   },100);
});
