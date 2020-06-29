const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// create the snake
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

// create the food
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
}

// create the score variable
let score = 0;

// control the snake
let d;

document.addEventListener("keydown",direction);

function direction(event) {
  if (event.keyCode == 37) {
    d = "LEFT";
  } else if (event.keyCode == 38) {
    d = "UP";
  } else if (event.keyCode == 39) {
    d = "RIGHT";
  } else if (event.keyCode == 40) {
    d = "DOWN";
  }
}

// draw everything to canvas
function draw() {
  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = ( i == 0 ) ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.drawImage(foodImg, food.x, food.y);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction
  if ( d == "LEFT") snakeX -= box;
  if ( d == "UP") snakeY -= box;
  if ( d == "RIGHT") snakeX += box;
  if ( d == "DOWN") snakeY += box;

  // if the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    // generate new food
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    }
  } else {
    // remove the tail
    snake.pop();
  }

  // add new head
  let newHead = {
    x: snakeX,
    y: snakeY
  }
  snake.unshift(newHead);

  // score-board
  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2*box, 1.6*box);
}

// call draw function every 100ms
let game = setInterval(draw, 100);
