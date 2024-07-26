class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.dx = 0;
        this.dy = 0;
        this.gravity = 0.5;
        this.friction = 0.9;
    }
    draw = (context) => {
        context.fillStyle = 'lightblue';
        context.strokeStyle = 'blue';
        context.lineWidth = 1;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
    drawTarget = () => {
        context.fillStyle = 'red';
        context.fillRect(targetX, targetY, targetSize, targetSize);
    }
    applyGravity = () => {
        this.dy += this.gravity;
    }
    update = () => {
        this.x += this.dx;
        this.y += this.dy;
        this.dx *= this.friction;
        this.dy *= this.friction;
        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            this.dy = 0;
        }
        else if (this.y <= 0) {
            this.y = 0;
        }
        if (this.x + this.width >= canvas.width) {
            this.x = canvas.width - this.width;
            this.dx = 0;
        }
        else if (this.x <= 0) {
            this.x = 0;
        }
    }

    checkCollision = () => {
        const withinX = (this.x >= 0) && (this.x + squareSize <= targetX+targetSize && this.x > targetX);
        const withinY = (this.y >= 0) && (this.y + squareSize <= targetY+targetSize && this.y > targetY);
        return withinX && withinY;
    }
}
const keypress = (event) => {
    sound.currentTime = 0;
    const offsetX = 3;
    const offsetY = 6;
    const logDiv = document.getElementById('keypress');
    let direction = '';
    const keyEvent = event.code;
    switch (keyEvent) {
        case 'ArrowUp':
            direction = 'up';
            rect.dy -= offsetY;
            break;
        case 'ArrowDown':
            direction = 'down';
            rect.dy += offsetY;
            break;
        case 'ArrowLeft':
            direction = 'left';
            rect.dx -= offsetX;
            break;
        case 'ArrowRight':
            direction = 'right';
            rect.dx += offsetX;
            break;
        default:
            direction = 'no direction';
    }
    logDiv.innerHTML = direction;
    sound.play();
}

document.addEventListener('keydown', keypress);

const sound = new Audio('./sounds/keypress.mp3');
const canvas = document.getElementById('canvas');
const winner = document.getElementById('winner');
const context = canvas.getContext('2d');
const squareX = 20, squareY = 20, squareSize = 10;
const targetSize = 30, targetX = 250, targetY = 30;
const rect = new Rect(squareX, squareY, squareSize, squareSize);
let timer = 0, goal = 100;
const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    rect.applyGravity();
    rect.update();
    rect.drawTarget();
    rect.draw(context);
    rect.checkCollision() ? timer++ : timer=0;
    timer>=goal ? alert("You Won!") : winner.innerHTML=`ticks = ${timer}, goal = ${goal}` ;
    console.log(timer)
    requestAnimationFrame(animate);
}
animate();

