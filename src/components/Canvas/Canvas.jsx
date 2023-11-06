import { useLayoutEffect } from "react";
import style from "./Canvas.module.css";

function Canvas() {
  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const headerHeight = 38;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight - headerHeight);
    const particles = [];
    const properties = {
      particleColor: `rgba(255, 240, 240, .64)`,
      particleRadius: 3.1,
      particleCount: 70,
      particleMaxVelocity: 0.1,
      lineLengthMax: 100,
      lineLengthMin: 50,
      mousePos: { x: 0, y: 0 },
    };
    canvas.onmousemove = (event) => {
      properties.mousePos.x =
        event.clientX - canvas.getBoundingClientRect().left;
      properties.mousePos.y =
        event.clientY - canvas.getBoundingClientRect().top;
    };

    window.onresize = function () {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight - headerHeight;
    };
    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * (h - 200);
        this.radius = (Math.random() * 2) + 2;
        this.velocityX =
          Math.random() * (properties.particleMaxVelocity * 2) -
          properties.particleMaxVelocity;
        this.velocityY =
          Math.random() * (properties.particleMaxVelocity * 2) -
          properties.particleMaxVelocity;
      }
      position() {
        (this.x + this.velocityX > w && this.velocityX > 0) ||
        (this.x + this.velocityX < 0 && this.velocityX < 0) 
          ? (this.velocityX *= -1)
          : this.velocityX;
        (this.y + this.velocityY > h - 200 && this.velocityY > 0) ||
        (this.y + this.velocityY < 0 && this.velocityY < 0)
          ? (this.velocityY *= -1)
          : this.velocityY;
          let d = getDistanse(this, properties.mousePos)
          if(d.d<50){
if(d.x>0){
  this.velocityX = Math.abs(this.velocityX)
}
else{
  this.velocityX = -Math.abs(this.velocityX)
}
if(d.y>0){
  this.velocityY = Math.abs(this.velocityX)
}
else{
  this.velocityY = -Math.abs(this.velocityX)
}
          }
        this.x += this.velocityX;
        this.y += this.velocityY;
      }
      reDraw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = properties.particleColor;
        ctx.fill();
      }
    }
    function reDrawBackground() {
      const image = new Image();
      image.src = "../../src/assets/bg.jpg";
      ctx.drawImage(image, 0, 0, w, h);
    }
    function drawLines() {
      let x1, y1, x2, y2, length, opacity;
      for (let i in particles) {
        for (let j in particles) {
          x1 = particles[i].x;
          y1 = particles[i].y;
          x2 = particles[j].x;
          y2 = particles[j].y;
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          if (
            length <= properties.lineLengthMax &&
            length >= properties.lineLengthMin
          ) {
            opacity = mapDistanceToValue(length, properties.lineLengthMin, properties.lineLengthMax)
            ctx.lineWidth = `.6`;
            ctx.strokeStyle = `rgba(4, ${length % 102}, 250 , ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
          }
        }
      }
    }
    function reDrawParticles() {
      for (let i in particles) {
        particles[i].position();
        particles[i].reDraw();
      }
    }
    function loop() {
      ctx.clearRect(0, 0, w, h);
      reDrawBackground();
      drawLines();
      reDrawParticles();
      requestAnimationFrame(loop);
    }
    function init() {
      for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
      }
      loop();
    }
    function getDistanse(pointA, piontB) {
      let x1 = pointA.x,
        y1 = pointA.y,
        x2 = piontB.x,
        y2 = piontB.y;
      const d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      return {d, x:x1-x2, y:y1-y2};
    }
    function mapDistanceToValue(distance, minDistance, maxDistance) {
      if (distance < minDistance || distance > maxDistance) {
        return 0;
      }
      
      if (distance === minDistance || distance === maxDistance) {
        return 1;
      }
      
      const range = maxDistance - minDistance;
      const normalizedDistance = (distance - minDistance) / range;
      
      return 1 - Math.abs(normalizedDistance - 0.5) * 2;
    }
    init();
  });

  return (
    <div>
      <canvas id="canvas"></canvas>
    </div>
  );
}

export { Canvas };
