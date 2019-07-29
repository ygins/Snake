const DIRECTIONS=new Map();
export class Direction{
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

export const getDirection=(keyVal)=>DIRECTIONS.get(keyVal);

export const UP=new Direction(38);
export const DOWN=new Direction(40);
export const LEFT=new Direction(37);
export const RIGHT=new Direction(39);
