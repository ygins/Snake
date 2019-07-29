import * as State from "./state.js";
import {Square} from "./square.js";
export class Board{
  constructor(options, boardId){
    let grid=document.getElementById(boardId);
    let squares=[];
    for(let r=0; r<options.zGridSquareNumber; r++){
      squares[r]=[];
      for(let c=0; c<options.xGridSquareNumber; c++){
        squares[r][c]=new Square(grid, r, c);
      }
    }
  this._squares=squares;
  }
  get squares(){
    return this._squares;
  }
  spawnApple(){
    const getRandomSquare=()=>{
      let squares=this.squares;
      const randomIntFromInterval=(min,max)=> Math.floor(Math.random()*(max-min+1)+min);
      let row=randomIntFromInterval(0, squares.length-1);
      let column=randomIntFromInterval(0,squares[row].length-1);
      return squares[row][column];
    };
    let toChange=getRandomSquare();
    while(toChange.state!=State.EMPTY){
      toChange=getRandomSquare();
    }
    toChange.state=State.APPLE;
  }
}
