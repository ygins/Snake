const BOARD_ID="board";
const BCKGROUND_ID="background";
requirejs(['options'], op=>onOptionsLoad(op));

function onOptionsLoad(options){


  define({
    Board: Board,
    Square: Square
  });
}
