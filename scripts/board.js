const BOARD_CLASS="board";
const BCKGROUND_ID="background";
const onLoad=(...funcs)=>window.addEventListener('load',()=>funcs.forEach(func=>func()));
const createBoard=()=>{
  console.log(document.head);
  console.log(document.body);
let grid=document.createElement("div");
grid.classList.add(BOARD_CLASS);
document.getElementById(BCKGROUND_ID).appendChild(grid);
}

const createSquare=()=>{
  let grid=document.getElementsByClassName(BOARD_CLASS)[0];
  let square=document.createElement("div");
  square.classList.add('square');
  square.appendChild(document.createTextNode("Text"));
  grid.appendChild(square);
  console.log(document.body);
}
onLoad(createBoard, createSquare);

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
    square.classList.add(state);
    square.style['grid-template-rows']=genGridProp(row);
    square.style['grid-template-columns']=genGridProp(column);
    this._square=square;
  }
  get docElement(){return this._square;}
}

class Board{
  constructor(options){
    let grid=document.getElementsByClassName(BOARD_CLASS)[0];
  }
}

onLoad(()=>{
  let response=fetch('./options.json');
  if(response.ok){
    let json=response.json();
    alert("json loaded!");
  }else{
    alert("HTTP-Error: "+response.status)
  }
});
