import * as State from "./state.js";
export class Square{
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
