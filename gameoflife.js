/*conway's game of life implementation
d.ruggiero 2015 */


var squares = [];
var toKill = [];
var toLive = [];
var ip;  
var w;
var h;
var run;

function setup() {
  ip = 0;
  w = 10;
  h = 10;
  run = 0;	

  frameRate(60);
  createCanvas(windowWidth-0.5, windowHeight-0.5);
   for (var y = 0; y<height; y = y + h){
     for (var x = 0; x<width; x = x + w){
        squares[ip] = new Square(x,y);
	ip = ip+1;
}
}


   for (var i =0; i<squares.length; i++){
     squares[i].display();
}
  noLoop();
 
   

}

function draw() {
for (var i = 0; i<squares.length; i++){
    //Da Rules
    if(squares[i].state==1 && squares[i].countNeighbors()<2){
     toKill.push(squares[i]);}
    else if(squares[i].state==1 && (squares[i].countNeighbors()==2 || squares[i].countNeighbors()==3)){
     toLive.push(squares[i]);}  //this case is technically redundant but retained for conceptual clarity
    else if (squares[i].state==1 && squares[i].countNeighbors()>3){
     toKill.push(squares[i]);}
    else if (squares[i].state==0 && squares[i].countNeighbors()==3){
     toLive.push(squares[i]);}
}

for(var i = 0; i<toKill.length; i++){
   toKill[i].turnOff();
}

for(var i = 0; i<toLive.length; i++){
  toLive[i].turnOn();
}


toLive.length = 0;
toKill.length = 0;


}


function mouseDragged(){

 var target = coorToIndex(mouseX, mouseY);
 squares[target].turnOn();
 
}

function mousePressed(){
 var target = coorToIndex(mouseX, mouseY);
 if(squares[target].state ==0){
 squares[target].turnOn();}
 else if (squares[target].state ==1){
 squares[target].turnOff();}


 //print(squares[target].countNeighbors());

}

function keyPressed(){
  if (keyCode == 32 && run == 0){
    //Press spacebar to run draw loop
    loop();
    run = !run;   
  }
  else if (keyCode == 32 && run ==1){
    noLoop();
    run = !run;
  }

  else if (keyCode == 67 && run == 0){
   //Press 'c' to clear
    print("CLEAR");
    for (var i = 0; i<squares.length; i++){
      if(squares[i].state==1){
       squares[i].turnOff();}
  }
    for (var i =0; i<squares.length; i++){
       squares[i].display();
  }

  }


  else if (keyCode == 84 && run == 0){
     // Press 't' to clear the trails
      
      for (var i =0; i<squares.length; i++){
         squares[i].display();
    }
  }

}

function coorToIndex(x,y){
  var boxX = floor(x/w);
  var boxY = floor(y/h);

  //print(str(boxX) + ' ' + str(boxY));

  var ind = boxY * ceil(width/w) + boxX;
  return ind;

}


function Square(x,y){
  this.state = 0;
  this.x = x;
  this.y = y;
  this.ind = coorToIndex(this.x, this.y);

  this.toString = function(){
    return "{Square " + str(x) + "," + str(y)+ " index: " + str(this.ind)+"}"
}

  this.turnOn = function(){
   this.state = 1;
   //print("index " + str(this.ind));
   //print(str(this.countNeighbors()));
   this.display();
}

  this.turnOff = function(){
   this.state = 0;
   this.display();
}

   
  this.countNeighbors = function(){
   var count =0;
   var neighs = [];
 
//stuff below deals with edge cases

 if(this.ind<ceil(width/w)){ //top row
  neighs[2] = 0;
  neighs[3] = 0;
  neighs[4] = 0;
   }
  else{
  neighs[2] =  squares[this.ind-ceil(width/w)].state;
 }



 if(this.ind % ceil(width/w)==0){ //left column
   neighs[0] = 0;
   neighs[3] = 0;
   neighs[6] = 0;}
   else {
   neighs[0] = squares[this.ind-1].state;
   if (neighs[3]!=0){
   neighs[3] = squares[this.ind-ceil(width/w)-1].state;}}

 
  if(this.ind>=(ceil(height/h) * ceil(width/w))-ceil(width/w)){ //bottom row
 neighs[5] = 0;
 neighs[6] = 0;
 neighs[7] = 0;
}

 else{
 neighs[5] = squares[this.ind+ceil(width/w)].state;
 if(neighs[6]!=0){
 neighs[6] = squares[this.ind+ceil(width/w)-1].state;}
}

if((this.ind - floor(width/w)) % ceil(width/w) == 0){  //right column
 neighs[1] = 0;
 neighs[4] = 0;
 neighs[7] = 0;
}

else{
 if(neighs[1]!=0){
 neighs[1] =  squares[this.ind+1].state;}
 if(neighs[4]!=0){
 neighs[4] = squares[this.ind-ceil(width/w)+1].state;}
 if(neighs[7]!=0){
 neighs[7] = squares[this.ind+ceil(width/w)+1].state;}
}


   for(var i = 0; i<neighs.length; i++){
    if(neighs[i]==1){
     count = count + 1;}
    
 }

   return count;
   
}

  this.display = function(){
   if(this.state ==1){
     fill(0);
     rect(x, y, w, h);
}
   else if(this.state==0){
     fill(255);
     rect(x, y, w, h);
}   
   strokeWeight(0.2);
  
	
}
}


 

