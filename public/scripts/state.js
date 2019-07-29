class State{
  constructor(className){
    this._className=className;
  }
  get cssClass(){return this._className;}
}
export const EMPTY=new State('empty');
export const SNAKE=new State('snake');
export const APPLE=new State('apple');
