const jsonFile=require('../../options.json');
const data=JSON.parse(jsonFile);

class Options{
  constructor(jsonFile){
    this(data.squareDiameter, data["grid-square-number-width"], data["grid-square-number-width"]);
  }
  constructor(squareDiameter, widthSquareNumber, lengthSquareNumber){
    this._squareDiameter=squareDiameter;
    this._widthSquareNumber=widthSquareNumber;
    this._lengthSquareNumber=lengthSquareNumber;
  }
  
}
