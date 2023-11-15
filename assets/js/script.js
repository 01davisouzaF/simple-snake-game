function game() {

    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    const menu = document.querySelector('.menu');
    const scoreFinal = document.querySelector('.score-final > span');
    const buttonPlay = document.querySelector('.play');
    let scoreDisplay = document.querySelector('#score');

    const size = 25;
    const initialPosition = {x: 250, y: 250};
    let snake = [initialPosition];
    let foodPosition = {x: 175, y: 175}
    
    let score = 0;
    let direction;

    function drawSnake() {
        ctx.fillStyle = '#1ABC9C';
        snake.forEach((position) => {
        ctx.fillRect(position.x, position.y, size, size);
        });
        
    }

    function getFoodPosition() {
        let foodPositionX = Math.floor(Math.random() * 19) * 25;
        let foodPositionY = Math.floor(Math.random() * 19) * 25;
        foodPosition = {x: foodPositionX, y: foodPositionY};
     }

    function drawFood() {
        ctx.fillStyle = '#EC7063'
        ctx.fillRect(foodPosition.x, foodPosition.y, size, size)
    }

    function moveSnake() {
        if (!direction) return

        const head = snake[snake.length - 1]

        if (direction === 'up') {
            snake.push({x: head.x, y: head.y - size});
        }
        if (direction === 'down') {
            snake.push({x: head.x, y: head.y + size});
        }
        if (direction === 'right') {
            snake.push({x: head.x + size, y: head.y});
        }
        if (direction === 'left') {
            snake.push({x: head.x - size, y: head.y});
        }

        snake.shift();

    }

    function checkEat() {
        const head = snake[snake.length - 1];

        if (
            head.x === foodPosition.x && head.y === foodPosition.y 
        ) {
            snake.push(head);
            getFoodPosition();
            score++
            incrementScore();

            while(snake.find((position) => position.x === foodPosition.x && position.y === foodPosition.y)) {
                getFoodPosition();
            }
        }
    }

    function takeDirection() {

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 38 && direction !== 'down') {
                direction = 'up';
            }

            if (e.keyCode === 40 && direction !== 'up') {
                direction = 'down';
            }

            if (e.keyCode === 39 && direction !== 'left') {
                direction = 'right';
            }

            if (e.keyCode === 37 && direction !== 'right') {
                direction = 'left';
            }
        })
    }

    function incrementScore() {
        scoreDisplay.innerHTML = score.toString().padStart(2, '0');
    }

    function checkColision() {
        const head = snake[snake.length - 1];
        const canvasLimit = canvas.width - size;
        const neckIndex = snake.length - 2;

        const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

        const selfCollision = snake.find((position, index) => {
            return index < neckIndex && position.x === head.x && position.y === head.y;
        });

        if (wallCollision || selfCollision) {
            gameOver();
        }
    }

    function gameOver() {
        direction = undefined;
        menu.style.display = 'flex';
        scoreFinal.innerHTML = score.toString().padStart(2, '0');;
        canvas.style.filter = 'blur(3px)'
    }

    function clearDisplay() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function restartGame() {
        buttonPlay.addEventListener('click', () => {
            scoreDisplay.innerHTML = '00';
            menu.style.display = 'none';
            canvas.style.filter = 'none';

            getFoodPosition();
            snake = [initialPosition];
        });
    }


    takeDirection();
    restartGame();

    function gameLoop() {
        clearDisplay();
        drawSnake();
        drawFood();
        moveSnake();
        checkEat();
        checkColision();
        
    }
    
    setInterval(gameLoop, 1000/5)

}

game();