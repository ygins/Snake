const BOARD_ID="board";
const BCKGROUND_ID="background";
const onLoad=(...funcs)=>window.addEventListener('load',()=>funcs.forEach(func=>func()));
const OPTIONS={
sqaureDiameter:20,
xGridSquareNumber:50,
zGridSquareNumber:25
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
    let genGridProp=(start)=>`${start}, ${start+1}`;
    let square=document.createElement('div');
    square.classList.add('square');
    square.classList.add(state.cssClass);
    square.style['grid-template-rows']=genGridProp(row);
    square.style['grid-template-columns']=genGridProp(column);
    this._square=square;
    this._state=state;
    grid.appendChild(square);
  }
  get docElement(){return this._square;}
  get state(){return this._state;}
  set state(state){
    this.docElement.classList.remove(this.state.cssClass);
    this.docElement.classList.add(state.cssClass);
    this._state=state;
  }
}

class Board{
  constructor(options){
    let grid=document.getElementById(BOARD_ID);
    let squares={};
    for(let r=1; r<=options.zGridSquareNumber; r++){
      squares[r]=new Array();
      for(let c=1; c<=options.xGridSquareNumber; c++){
        squares[r][c]=new Square(grid, r, c);
      }
    }
  this._squares=squares;
  }
  get squares(){
    return this._squares;
  }
}

onLoad(()=>{
  let myBoard=new Board(OPTIONS);
});
