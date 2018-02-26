/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


alert("script1.js");

var width = 700, height = 600, pi = Math.PI;

//update game state variables
var canvas, ctx, keystate;

//for logic game variables
var player, ai, ball;


player = {
     x: null,
     y: null,
     width: 20,
     height: 100,
     
     update: function(){},
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
     side:20,
     
     update: function(){},
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