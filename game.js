import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, snakeBody } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

let gameOver = false;
const gameBoard = document.getElementById('game-board');

const interval = setInterval(() => {
    if (gameOver) {
        clearInterval(interval)
        if (confirm(`You lost, your total length was ${snakeBody.length}. Try harder next time! `)) {
            window.location = '/';
        }
        return;
    }

    update();
    draw();
}, 1000 / SNAKE_SPEED)

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
    drawScore(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function drawScore(gameBoard) {
	const scoreElement = document.createElement('div');
	scoreElement.style.gridRowStart = 1;
	scoreElement.style.gridColumnStart = 1;
    scoreElement.classList.add('score');
    scoreElement.innerHTML= `‎${snakeBody.length}`
	gameBoard.appendChild(scoreElement);
}