const express=require('express');
const path=require('path');
let app=express();

app.use(express.static(__dirname+"/public"))
app.get("/", (request, reply)=>{
  reply.sendFile(path.join(__dirname, "index.html"));
});



const listener = app.listen(8000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
