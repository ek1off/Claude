const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = [
  "#FF0A54",
  "#FF477E",
  "#FF7096",
  "#FF85A1",
  "#FBB1BD",
  "#F9BEC7",
  "#85E3FF",
  "#B9FBC0",
];
let confettis = [];
let animationFrame;

class Confetti {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = Math.random() * 10 + 5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedY = Math.random() * 3 + 2;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 10 - 5;
  }

  update() {
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
    if (this.y > canvas.height) {
      this.y = 0 - this.size;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettis.forEach((confetti) => {
    confetti.update();
    confetti.draw();
  });
  animationFrame = requestAnimationFrame(animate);
}

function launchConfetti() {
  for (let i = 0; i < 150; i++) {
    confettis.push(new Confetti());
  }
  animate();

  // Arrêt progressif après 6 secondes
  setTimeout(() => {
    cancelAnimationFrame(animationFrame);
    confettis = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 6190000);
}

// Lancer automatiquement à l’entrée du site
window.addEventListener("load", launchConfetti);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
