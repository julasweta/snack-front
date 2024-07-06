import React, { useState, useEffect, useCallback } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { snackActions } from '../redux/slices/SnackSlice';
import { FoodType, Point } from '../interfaces/snack.interface';

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<string>('RIGHT');
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(300);
  const [showSpeed, setShowSpeed] = useState<number>(300);
  const [foodType, setFoodType] = useState<FoodType>(FoodType.ONE);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const userName = localStorage.getItem('userName');
  const dispatch = useAppDispatch();

  const generateFood = useCallback(() => {
    const newFoodX = Math.floor(Math.random() * 20);
    const newFoodY = Math.floor(Math.random() * 20);
    setFood({ x: newFoodX, y: newFoodY });

    if (foodType === FoodType.ONE) {
      setFoodType(FoodType.FIVE);
    } else if (foodType === FoodType.FIVE) {
      setFoodType(FoodType.TEN);
    } else {
      setFoodType(FoodType.TEN);
    }
  }, [foodType]);

  const handleKeyDown = (e: KeyboardEvent): void => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
      default:
        break;
    }
  };

  const gameOver = useCallback(async (): Promise<void> => {
    if (!isGameOver) {
      setIsGameOver(true);
      await dispatch(snackActions.createUser({ name: userName, score }));

      setSnake([{ x: 10, y: 10 }]);
      setFood({ x: 15, y: 15 });
      setScore(0);
      setFoodType(FoodType.ONE);
      setDirection('RIGHT');
      setIsPaused(true);
      setSpeed(300);
      setShowSpeed(300);
      dispatch(snackActions.setIsGameOver());
      console.log('Score successfully posted!');
    }
  }, [isGameOver, userName, score, dispatch]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction, isPaused]);

  const checkCollision = useCallback((): void => {
    const head = snake[0];
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
      gameOver();
    }
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        gameOver();
      }
    }
    if (head.x === food.x && head.y === food.y) {
      setScore(score + foodType);
      setSnake([...snake, {} as Point]);
      generateFood();
    }
  }, [snake, food, score, foodType, generateFood, gameOver]);

  const moveSnake = useCallback((): void => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }

    newSnake.unshift(head);
    newSnake.pop();
    setSnake(newSnake);
  }, [snake, direction]);

  useEffect(() => {
    if (!isPaused && !isGameOver) {
      const interval = setInterval(() => {
        moveSnake();
        checkCollision();
      }, speed);

      return () => clearInterval(interval);
    }
  }, [isPaused, isGameOver, speed, moveSnake, checkCollision]);

  const startGame = (): void => {
    setIsPaused(false);
    setIsGameOver(false); // Reset game over state when the game starts
  };

  const changeSpeedUp = (step: number) => {
    setSpeed(300 - 50 * step);
    setShowSpeed(300 + 50 * step);
  };

  useEffect(() => {
    if (score > 50 || score > 100 || score > 150 || score > 200 || score > 250 || score > 300) {
      changeSpeedUp(Math.floor(score / 50));
    }
  }, [score]);

  return (
    <div>
      <h1>Snake Game</h1>
      <div className="game" style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 20px)', gridGap: '1px' }}>
        {[...Array(20)].map((_, y) => [...Array(20)].map((_, x) => (
          <div
            key={`${x}-${y}`}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: snake.find(segment => segment.x === x && segment.y === y) ? 'green' : food.x === x && food.y === y ? 'red' : 'lightgrey',
            }}
          >
            <div className={!isPaused ? 'food' : ''}>{food.x === x && food.y === y && foodType}</div>
          </div>
        )))}
      </div>
      <p>Score: {score}</p>
      <p>Speed: {showSpeed}</p>
      {isPaused ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <button onClick={() => setIsPaused(!isPaused)}>Pause</button>
      )}
    </div>
  );
};

export default SnakeGame;
