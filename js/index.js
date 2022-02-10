// const and variables
let inputdir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 5, y: 6 };



//methods
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed)
        return;

    lastPaintTime = ctime;

    gameEngine();
}

function isCollide(snakeArr) {
    //if snake bump in yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y)
            return true;
    }

    //if snake bump in boundary of board
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0)
        return true;

    return false;
}

function gameEngine() {

    //part 1:update the snake array and food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputdir = { x: 0, y: 0 };
        alert('Game Over. Press any key to play again!');
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
        scorebox.innerHTML = "Score: " + score;
    }

    //if snake has eaten the food increment the score and regenerate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y == food.y) {
        foodSound.play();
        snakeArr.unshift({
            x: snakeArr[0].x + inputdir.x,
            y: snakeArr[0].y + inputdir.y
        });

        score += 1;
        scorebox.innerHTML = "Score: " + score;

        //increase speed of game with score
        if (score >= 6 && score < 12) speed = 8;
        else if (score >= 12 && score < 18) speed = 11;
        else if(score>=18) speed = 15;
    
        //generate new food;
        let a = 2, b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    //Move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--)
        snakeArr[i + 1] = { ...snakeArr[i] };

    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;

    //part 2:display the sanke and food

    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    })

    //display the food
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}





//Main game Logic
musicSound.play();


window.requestAnimationFrame(main);

window.addEventListener('keydown', function (e) {
    //game start
    inputdir = { x: 0, y: 1 };
    moveSound.play();

    switch (e.code) {
        case 'ArrowUp':
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case 'ArrowDown':
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case 'ArrowLeft':
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case 'ArrowRight':
            inputdir.x = 1;
            inputdir.y = 0;
            break;

        default:
            break;
    }
})