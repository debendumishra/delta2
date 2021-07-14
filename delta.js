var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var x = 0;
var y = 0;
var wid = 50;
var hei = 50;

var objx = 100;
var objy = 300;
var scrollposition = 0;

var ballx=1250;
var bally=300;
var ballmove="u";
var ballvis = false;

//var dx=5;
var dy=5;

var upplatform = [];
var botplatform = [];

var mainloopstart;

var msggame = document.getElementById('gamelost');
var btnstart = document.getElementById('restart');
var shwmsg = document.getElementById('showmsg');

shwmsg.innerHTML="Welcome Player... Good Luck!!!";

var gamestart = true;
var yourscore = 0;

if (localStorage.highestscore) {
    localStorage.highestscore = localStorage.highestscore;
} else {
    localStorage.highestscore = 0;
}

for (i = 0; i < 27; i++) {
    upplatform.push(1);
    botplatform.push(1);
}

function upplat(type) {
    if(x < 1255){
        if (type === 0) {
            ctx.beginPath();
            ctx.rect(x, 50, 50, 150);
            ctx.fillStyle = "grey";
            ctx.fill();
            x = x + 50;
        }
        if (type >= 1) {
            ctx.beginPath();
            ctx.rect(x, 50, 50, 150);
            ctx.fillStyle = "black";
            ctx.fill();
            x = x + 50;
        }
    }
}

function botplat(type) {
    if (x < 1255) {
        if (type === 0) {
            ctx.beginPath();
            ctx.rect(x, 350, 50, 200);
            ctx.fillStyle = "grey";
            ctx.fill();
            x = x + 50;
        }
        if (type >= 1) {
            ctx.beginPath();
            ctx.rect(x, 350, 50, 200);
            ctx.fillStyle = "black";
            ctx.fill();
            x = x + 50;
        }
    }
}

botplatform.forEach(botplat);
x = 0;
upplatform.forEach(upplat);

/*function ball()
{
  ctx= myCanvas.getContext('2d');
  setInterval(drawball,10);
}

function drawball()
{
  ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
  ctx.beginPath();
  ctx.fillStyle="#ffffff";
  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
  ctx.arc(x,y,30,0,Math.PI*2,true);
  ctx.closePath();
  ctx.fill();
  if(y<350)
  dy=-dy;
  else if(y>200)

  //x+=dx;
  y+=dy;
}*/

function mainloop() {
    if(scrollposition < - 50){
        botplatform.shift();
        upplatform.shift();

        var upperplt = parseInt(Math.random() * 15);
        var botplt = parseInt(Math.random() * 15);
        if (upperplt === 0) {
            botplt = 1
        }

        botplatform.push(botplt);
        upplatform.push(upperplt);
        scrollposition = 0;
        x = scrollposition;
        if(parseInt(Math.random() * 30) == 2 && ballvis == false){
            ballvis = true;
        }
    }else{
        scrollposition = scrollposition-1;
        x = scrollposition;
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    upplatform.forEach(upplat);
    x = scrollposition;
    botplatform.forEach(botplat);
    x = scrollposition;

    //drawsq(objx, objy, 50, 50);
    drawTriangle(objx,objy,50,50,"d");

    if(ballvis == true){
        showball();
    }
    

    if (objy > 200) {
        p = ctx.getImageData(objx , objy + 55, 1, 1).data;
    }else if(objy < 350){
        p = ctx.getImageData(objx, objy - 55, 1, 1).data;
    }

    if(ballx > objx-50 && ballx < objx+50 && bally == objy){
        gamestart = false;
    }
    
    if (p[0] === 128) {
        gamestart = false;
    }

    yourscore++;
    
    ctx.font = "25px Arial";
    ctx.fillStyle = '#ffff';
    ctx.fillText("Your Score :" + yourscore, 10, 30);
    ctx.fillStyle = '#66ffff';
    ctx.fillText("Highest Score : " + localStorage.highestscore, 950, 30);
    if (!gamestart) {
        lostgame();
    }
}

function lostgame() {
    clearInterval(mainloopstart);
    if (yourscore > localStorage.highestscore) {
        localStorage.highestscore = yourscore;
    }
    shwmsg.innerHTML="You Lost !!!!";
    msggame.style.display = "inline";
    playMusic();
}

function drawball(x,y,wid,hei){
    ctx.beginPath();
    ctx.arc(x, y+25, 20, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffff00';
    ctx.stroke();
}

function showball(){
    //Ball Movements

    if(ballmove == "u"){
        bally -= 1;
    }
    if(ballmove == "d"){
        bally += 1;
    }

    if(bally == 300){
        ballmove = "u";
    }
    
    if(bally == 200){
        ballmove = "d";
    }

    if(ballx < -50){
        ballx = 1250;
    }else{
        ballx -= 1;
    }

    
    drawball(ballx, bally,50,50);
    
    if(ballx < 0){
        ballvis = false;
        ballx = 1250;
    }
    //Ball Move end
}

function drawTriangle(x, y, wid, hei,pos){
    if(objy == 300){
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + wid/2 , y + hei);
        ctx.lineTo(x - wid/2 , y + hei);
        ctx.closePath();
        ctx.fillStyle = '#728fce';
        ctx.fill();
    }else{
        y =y +50;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + wid/2 , y - hei);
        ctx.lineTo(x - wid/2 , y - hei);
        ctx.closePath();
        ctx.fillStyle = '#728fce';
        ctx.fill();
    }
}
    

function drawsq(x, y, wid, hei) {
    ctx.fillStyle = '#728fce';
    ctx.fillRect(x, y, wid, hei);
}

window.onkeydown = function (event) {
    var keyPr = event.keyCode;

    if (keyPr === 32 && objy > 200) {
        objy = 200;
    }

    else if (keyPr === 32 && objy < 350) {
        objy = 300;
    }

};

btnstart.addEventListener('click', () => { 

    upplatform = [];
    botplatform = [];
    for (i = 0; i < 27; i++) {
        upplatform.push(1);
        botplatform.push(1);
    }
    gamestart = true;
    yourscore = 0;
    clearInterval(mainloopstart);
    mainloopstart = setInterval(mainloop, 3);
    msggame.style.display = "none";
    
    }
);
function switchobj() {
    if (objy > 200) {
        objy = 200;
    }

    else if (objy < 350) {
        objy = 300;
    }
}

canvas.addEventListener("click", switchobj, false);

function playMusic(){
    var music = new Audio('fail-buzzer-02.mp3');
    music.play();
    }





class MovingObstacle{
    constructor (start,width,direction){
        this.start=start;
        this.width=width;
        this.y=Math.floor((UP+this.width/2)+(Math.random() * (DOWN-UP-this.width)));
        this.direction=direction;
    }
    draw(){
        this.update();
        c.fillStyle="red";
        c.beginPath();
        c.arc(this.start+this.width/2,this.y,this.width/4,0,Math.PI*2);
        c.fill();
    }
    update(){
        let dy =Math.floor((DOWN-UP)/(60-score/50));
        if(this.direction=="d"){
            this.y+=dy;
        }else if(this.direction=="u"){
            this.y-=dy;
        }
        let radius=this.width/4;
        if(this.y<UP+radius){
            this.y=UP+radius;
            this.direction="d";
        }else if(this.y > DOWN - radius){
            this.y=DOWN-radius;
            this.direction="u";
        }
    }
    checkCollision(){
        //because the hit boxes are circles, there can be small imperfections in collision detection as the player object is triangular shaped. but it works good enough when i tried and i decided to leave it that way 
        if ( Math.sqrt(Math.pow(this.start+this.width/2-player.cx,2)+Math.pow(this.y-player.cy,2)) < this.width/4+player.size/2.5){ 
            return true;
        }
        else{
            return false;
        }
    }
}