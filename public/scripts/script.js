const BOARD_ID="board";
const BCKGROUND_ID="background";
const onLoad=(...funcs)=>window.addEventListener('load',()=>funcs.forEach(func=>func()));
const randomIntFromInterval=(min,max)=> Math.floor(Math.random()*(max-min+1)+min);
const OPTIONS={
sqaureDiameter:20,
xGridSquareNumber:50,
zGridSquareNumber:25
}
const DIRECTIONS=new Map();
class Direction{
  constructor(keyVal){
    this._keyVal=keyVal;
    DIRECTIONS.set(keyVal,this);
    if(keyVal=='38'){//up
      this._travelFunc=()=>[-1,0];
      this._name='UP';
    }
    else if(keyVal=='40'){//down
      this._travelFunc=()=>[1,0];
      this._name="DOWN";
    }
    else if(keyVal=='37'){//left
      this._travelFunc=()=>[0,-1];
      this._name="LEFT";
    } else if(keyVal=='39'){//right
      this._travelFunc=()=>[0,1];
      this._name="RIGHT";
    }
  }
  canMoveThisWayFrom(row, column,board){
      let modifiers=this._travelFunc();
      return row+modifiers[0]!=-1 && board.squares.length>row+modifiers[0] && column+modifiers[0]!=-1 && board.squares[row].length>column+modifiers[1];
  }
  getSquareInThisDirection(row, column, board){
    let modifiers=this._travelFunc();
    let [newRow, newColumn]=[row+modifiers[0], column+modifiers[1]];
    return board.squares[newRow][newColumn];
  }
  get name(){return this._name;}
}


class State{
  constructor(className){
    this._className=className
  }
  get cssClass(){return this._className;}
}
State.EMPTY=new State('empty');
State.SNAKE=new State('snake');
State.APPLE=new State('apple');

class Square{
  constructor(grid, row, column, state=State.EMPTY){
    let genGridProp=(start)=>`${start+1}, ${start+2}`;
    let square=document.createElement('div');
    square.classList.add('square');
    square.classList.add(state.cssClass);
    square.style['grid-template-rows']=genGridProp(row);
    square.style['grid-template-columns']=genGridProp(column);
    this._square=square;
    this._state=state;
    this._row=row;
    this._column=column;
    grid.appendChild(square);
  }
  get docElement(){return this._square;}
  get state(){return this._state;}
  set state(state){
    this.docElement.classList.remove(this.state.cssClass);
    this.docElement.classList.add(state.cssClass);
    this._state=state;
  }
  get row(){return this._row;}
  get column(){return this._column;}
}

class Board{
  constructor(options){
    let grid=document.getElementById(BOARD_ID);
    let squares=new Array();
    for(let r=0; r<options.zGridSquareNumber; r++){
      squares[r]=new Array();
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

onLoad(()=>{
  //Initialize Directions
  const UP=new Direction(38);
  const DOWN=new Direction(40);
  const LEFT=new Direction(37);
  const RIGHT=new Direction(39);
  let myBoard=new Board(OPTIONS);
  myBoard.squares[5][5].state=State.APPLE;
  let snakeHead={
    currentPosition:myBoard.squares[OPTIONS.zGridSquareNumber/2 |0][OPTIONS.xGridSquareNumber/2 |0],
    currentDirection: RIGHT,
    tailLength: 5
  };
  let trail=new Array();
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
    let direction=DIRECTIONS.get(event.keyCode);
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
