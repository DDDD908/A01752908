// Daniela Gil A01752908
// Actividad 4.4.1 Practica Conceptos Basicos de Videojuegos
// Breakout
// may 15, 2026

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;

// A variable to store the game object
let game;

// Variable to store the time at the previous frame
let oldTime = 0;
let initialSpeed = 0.5;
let paddleSpeed = 0.5;
let ballSpeed = 0.5;
let speedIncrease = 1.01;

class Ball extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "ball", sheetCols);
        this.velocity = new Vector(0, 0);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(ballSpeed).times(deltaTime));
        this.updateCollider();
    }

    reset() {
        this.position.x = canvasWidth / 2;
        this.position.y = canvasHeight / 2;
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    serve() {
        // Reandom angle for vertical movement
        let angle = Math.random() * Math.PI / 3 + Math.PI / 3; 
        this.velocity = new Vector(Math.cos(angle), -Math.sin(angle));
        ballSpeed = initialSpeed;
        // Select random direction
        if (Math.random() < 0.5) {
            this.velocity.x *= -1;
        }
    }
}

// Class for the main character in the game
class Paddle extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "player", sheetCols);
        this.velocity = new Vector(0, 0);
        // Structure with the directions the object can move
        this.motion = {
            left: {
                axis: "x",
                sign: -1,
            },
            right: {
                axis: "x",
                sign: 1,
            },
        }
        // Keys pressed to move the player
        this.keys = [];
    }

    update(deltaTime) {
        // Restart the velocity
        this.velocity.x = 0;
        this.velocity.y = 0;
        // Modify the velocity according to the directions pressed
        for (const direction of this.keys) {
            const axis = this.motion[direction].axis;
            const sign = this.motion[direction].sign;
            this.velocity[axis] += sign;
        }
        // TODO: Normalize the velocity to avoid greater speed on diagonals
        this.velocity = this.velocity.normalize().times(paddleSpeed);
        this.position = this.position.plus(this.velocity.times(deltaTime));
        this.clampWithinCanvas();
        this.updateCollider();
    }

    // Modified for horizontal movement of the paddle
    clampWithinCanvas() {
        if (this.position.x - this.halfSize.x < 0) {
            this.position.x = this.halfSize.x;
        }
        if (this.position.x + this.halfSize.x > canvasWidth) {
            this.position.x = canvasWidth - this.halfSize.x;
        }
    }
}

// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        // Initial scores
        this.defeatedBlocks = 0;
        this.level = 1;
        this.lives = 3;

        this.createEventListeners();
        this.initObjects();
        
        // Sound
        this.ping = document.createElement("audio");
        this.ping.src = "../resources/squeakyToy.wav";
        
        // Score labels
        this.scoreLabel = new TextLabel(canvasWidth-700, canvasHeight-20, "20px PT Mono", "lightcoral");
        this.livesLabel = new TextLabel(canvasWidth-200, canvasHeight-20, "20px PT Mono", "lightcoral");
        this.levelLabel = new TextLabel(canvasWidth-450, canvasHeight-570, "20px PT Mono", "lightcoral");
        this.messageLabel = new TextLabel(canvasWidth-500, canvasHeight/2+100, "40px PT Mono", "brown");
        
        this.inPlay = false; 
    }

    // Create the objects in the game
    initObjects() {
        // Player paddle
        let paddleWidth = 160; 
        this.paddle = new Paddle(new Vector(canvasWidth/2, canvasHeight-60), paddleWidth, 25, "rgb(250, 84, 123)");
        
        //Borders
        this.upperWall = new GameObject(new Vector(canvasWidth/2, 0), canvasWidth, 15, "pink");
        this.bottomWall = new GameObject(new Vector(canvasWidth/2, canvasHeight), canvasWidth, 15, "pink");
        this.rightWall = new GameObject(new Vector(canvasWidth, canvasHeight / 2), 15, canvasHeight, "pink");
        this.leftWall = new GameObject(new Vector(0, canvasHeight / 2), 15, canvasHeight, "pink");

        this.ball = new Ball(new Vector(canvasWidth/2, canvasHeight-80), 30, 30, "white");
        this.ball.setSprite("../resources/Totoro.png");
        this.blocks = [];

        // Increase rows of blocks

        let blockWidth = 80;
        let blockHeight = 30;
        let horizontalSpacing = 30;
        let verticalSpacing = 20;
        let x = blockWidth + horizontalSpacing;
        let y = blockHeight + verticalSpacing;

        let rows = this.level + 2;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < 6; col++) {
                let block = new GameObject(new Vector(130 + col * x, 60 + row * y), blockWidth, blockHeight, "lightcoral");
                this.blocks.push(block);
            }
        }

        // let totalWidth = cols * blockWidth + (cols - 1) * horizontalSpacing;
        // let startX = (canvasWidth - totalWidth) / 2;
        
        this.actors = [
            ...this.blocks, //individual blocks
            this.paddle,
            this.ball,
            this.upperWall,
            this.bottomWall,
            this.rightWall,
            this.leftWall,
        ];
    }

    draw(ctx) {
        for (let actor of this.actors) {
            actor.draw(ctx);
        }
        this.scoreLabel.draw(ctx, "Blocks: " + this.defeatedBlocks);
        this.livesLabel.draw(ctx, "Lives: " + this.lives);
        this.levelLabel.draw(ctx, "Level: " + this.level);
        if (this.level == 3 && this.blocks.length == 0) {
            this.messageLabel.draw(ctx, "VICTORY!");
        }
        if (this.lives <= 0) {
            this.messageLabel.draw(ctx, "GAME OVER");
        }
    }

    update(deltaTime) {
        // If there are no lives left or if the player already won
        if (this.lives <= 0 || (this.level == 3 && this.blocks.length == 0)) {
            return;
        }
        this.paddle.update(deltaTime);
        this.ball.update(deltaTime);
   
        // Collision with the paddle
        if (boxOverlap(this.paddle, this.ball)) {
            this.ball.velocity.y = -Math.abs(this.ball.velocity.y);
            ballSpeed *= speedIncrease;
        }

        // Collision with borderd
        if (boxOverlap(this.upperWall, this.ball)) {
            this.ball.velocity.y = Math.abs(this.ball.velocity.y);
            ballSpeed *= speedIncrease;
        }
        if (boxOverlap(this.bottomWall, this.ball)) {
            this.lives--;
            this.ball.reset();
            this.inPlay = false;
        }
        if (boxOverlap(this.leftWall, this.ball) || 
        boxOverlap(this.rightWall, this.ball)) {
            this.ball.velocity.x *= -1;
            ballSpeed *= speedIncrease;
        }
        
        // Collision with blocks
        for (let i = 0; i < this.blocks.length; i++) {
            if (boxOverlap(this.blocks[i], this.ball)) {
                this.ball.velocity.y *= -1;
                this.actors.splice(this.actors.indexOf(this.blocks[i]), 1);
                this.ping.play();
                let block = this.blocks[i];
                this.blocks.splice(i, 1);
                this.defeatedBlocks++;
                break;
            }
        }
        // Condition to change to the next level
        if (this.blocks.length == 0) { 
            if (this.level == 3) { 
                this.inPlay = false; 
                return; 
            } 
            this.level++; 
            this.initObjects(); 
            this.ball.reset(); 
            this.inPlay = false; 
        }
    }

    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.key == 'a') {
                this.addKey('left', this.paddle);
            }
            if (event.key == 'd'){
                this.addKey('right', this.paddle);
            }
            if (event.key == ' ') {
                if (!this.inPlay) {
                    this.ball.serve();
                    this.inPlay = true;
                }
            }
        });
        window.addEventListener('keyup', (event) => {
            if (event.key == 'a') {
                this.delKey('left', this.paddle);
            }
            if (event.key == 'd') {
                this.delKey('right', this.paddle);
            }
        });
    }

    // Add the key pressed to the 'keys' array for the object
    addKey(direction, object) {
        if (!object.keys.includes(direction)) {
            object.keys.push(direction);
        }
    }

    // Remove the key pressed
    delKey(direction, object) {
        if (object.keys.includes(direction)) {
            object.keys.splice(object.keys.indexOf(direction), 1);
        }
    }
}

// Starting function that will be called from the HTML page
function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');
    // Background color 
    ctx.canvas.style.background = "beige";
    // Create the game object
    game = new Game();
    drawScene(0);
}

// Main loop function to be called once per frame
function drawScene(newTime) {

    // Compute the time elapsed since the last frame, in milliseconds
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    game.update(deltaTime);
    game.draw(ctx);
    oldTime = newTime;
    requestAnimationFrame(drawScene);
}