var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  w = canvas.width = window.innerWidth,
  h = canvas.height = window.innerHeight,
    
  lights = [],
  count = 0,
  maxLights = window.innerWidth / 4;

var canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
var half = canvas2.width/2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#FFF');
    gradient2.addColorStop(0.25, 'hsl(200, 60%, 6%)');
    gradient2.addColorStop(0.1, 'hsl(200, 100%, 30%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

var light = function() {

  this.xspeed = window.innerWidth * Math.random() / 2 + window.innerWidth * 0.01;
  this.yspeed = window.innerHeight * Math.random() / 2 + window.innerHeight * 0.01;
  
  this.x = Math.sin(this.count) * 500 / 2 + this.xspeed;
  this.y = Math.cos(this.count) * 500 / 2 + this.yspeed;

  this.radius = Math.sqrt(Math.pow(this.xspeed, 2) + Math.pow(this.yspeed, 2)) / 20;

  this.count = count;

  count++;
  lights[count] = this;
}

light.prototype.draw = function() {

  this.count -= 0.0005;

  this.x = Math.sin(this.count) * this.xspeed + window.innerWidth / 2;
  this.y = Math.cos(this.count) * this.xspeed + window.innerHeight / 2;

  ctx.drawImage(canvas2, this.x, this.y, this.radius, this.radius);

}

for (var i = 0; i < maxLights; i++) {
  new light();
}

function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h)
  
  for (var i = 1, l = lights.length; i < l; i++) {
    lights[i].draw();
  };  
  
  window.requestAnimationFrame(animation);
}

animation();