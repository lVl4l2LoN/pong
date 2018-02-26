/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


alert("script1.js");

var width = 700, height = 600, pi = Math.PI;

//key codes
var upArrow = 38; downArrow=40;

//update game state variables
var canvas, ctx, keystate;

//for logic game variables
var player, ai, ball;


player = {
     x: null,
     y: null,
     width: 20,
     height: 100,
     
     update: function(){
         if(keystate[upArrow]) this.y -=7;
         if(keystate[downArrow]) this.y +=7;
     },
     draw: function(){
         ctx.fillRect(this.x,this.y,this.width,this.height);
     }
};

ai = {
     x: null,
     y: null,
     width: 20,
     height: 100,
     
     update: function(){},
     draw: function(){
         ctx.fillRect(this.x,this.y,this.width,this.height);
     }
};

ball = {
     x: null,
     y: null,
     vel:null,
     side:20,
     speed: 5,
     
     update: function(){
         this.x += this.vel.x;
         this.y += this.vel.y;
         
         //this allows the ball to bounce when it touches the edge of the field
         if(this.y < 0 || this.y + this.side > height){
             
             //this bit of code prevents the ball from going inside the canvas
             //border when the speed variable is set higher.
             var offset = this.vel.y < 0 ? 0 - this.y : height - (this.y+this.side);
             this.y += 2*offset; //twice the offset to allow elastic bounce.
             
             this.vel.y *=-1;
         }
         
         //helper function that allows collision when the ball hits the paddle
         var AABBIntersect = function(ax,ay,aw,ah,bx,by,bw,bh){
             return ax < bx + bw && ay < by + bh && bx < ax + aw && by < ay + ah;
         };
         
         var paddle = this.vel.x < 0 ? player : ai;
         
         
         if(AABBIntersect(paddle.x,paddle.y,paddle.width,
         paddle.height,this.x,this.y,this.side,this.side)){
             
             //offset
             this.x = paddle===player? player.x + player.width : ai.x - this.side;
             
             var n = (this.y + this.side - paddle.y)/(paddle.height + this.side); 
             //collision angle of the ball bouncing off the paddle
             var phi = 0.25*pi*(2*n - 1); // 45 degree collisions
             this.vel.x = (paddle===player ? 1 : -1)*this.speed*Math.cos(phi);
             this.vel.y = this.speed*Math.sin(phi);
         }
     },
     draw: function(){
         ctx.fillRect(this.x,this.y,this.side,this.side);
     }
};

function main(){
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    
    keystate = {};
    
    document.addEventListener("keydown",function(evt){
        keystate[evt.keyCode] = true;
    });
    
    document.addEventListener("keyup",function(evt){
         delete keystate[evt.keyCode];
    });
    
    init();
    
    var loop = function(){
        update();
        draw();
        
        window.requestAnimationFrame(loop,canvas);
    };
    
    window.requestAnimationFrame(loop,canvas);
}

//setting up the playing field and the variables in it
function init(){
    player.x = player.width;
    player.y = (height-player.height)/2;
    
    ai.x = width-(player.width+ai.width);
    ai.y = (height-ai.height)/2;
    
    ball.x = (width-ball.side)/2;
    ball.y = (height-ball.side)/2;
    ball.vel = {
        x: ball.speed,
        y: 0
    };
}

function update(){
    ball.update();
    player.update();
    ai.update();
}

function draw(){
    
    ctx.fillRect(0,0, width,height);
    
    ctx.save();
    ctx.fillStyle = "#fff";
    
    ball.draw();
    player.draw();
    ai.draw();
    
    //creating the net at the middle of the field
    var w = 4;
    var x = (width-w)*0.5;
    var y = 0;
    var step = height/25 //the number determines how many lines will be drawn as the net
    //at the middle of the field. Higher number means more lines.
    
    while(y < height){
        ctx.fillRect(x,y+step*0.25, w, step*0.50);
        y += step;
    }
    
    
    ctx.restore();
}

main();