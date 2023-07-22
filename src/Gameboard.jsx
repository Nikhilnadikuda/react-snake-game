import React from 'react'
import { useEffect } from 'react'
import { useRef,useState } from 'react'
import "./Gameboard.css"
const GameBoard = () => {
  const [snake, setSnake] = useState([{ x: 100, y: 100 }]);
  const[score,setScore]=useState(0);
  const[highScore,setHighScore]=useState(score);
  const[food,setFood]=useState({x:200,y:300})
  const[gameOver,setGameOver]=useState(false);
  var directionRef=useRef("ArrowRight")
  var foodRef=useRef();
  
  useEffect(() => {
    if(!gameOver){
      const handleKeyDown = (event) => {
      if (event.code === "ArrowUp" && directionRef.current !== "ArrowDown") {
        const interval=setTimeout(()=>{
          directionRef.current = "ArrowUp";
        },20)
        return ()=>clearTimeout(interval)
      } else if (event.code === "ArrowDown" && directionRef.current !== "ArrowUp") {
        const interval=setTimeout(()=>{
          directionRef.current = "ArrowDown";
        },20)
        return ()=>clearTimeout(interval)
      } else if (event.code === "ArrowLeft" && directionRef.current !== "ArrowRight") {
        const interval=setTimeout(()=>{
          directionRef.current = "ArrowLeft";
        },20)
        return ()=>clearTimeout(interval)
      } else if (event.code === "ArrowRight" && directionRef.current !== "ArrowLeft") {
        const interval=setTimeout(()=>{
          directionRef.current = "ArrowRight";
        },20)
        return ()=>clearTimeout(interval)
      }
      
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      const intr=setTimeout(()=>{
        window.removeEventListener("keydown", handleKeyDown);
      },500)
      return ()=> clearTimeout(intr);
    };
  }
  }, [gameOver]);
  useEffect(() => {
    if (!gameOver) {
      const intervalId = setInterval(() => {
        setSnake((prevSnake) => {
          const newSnake = [...prevSnake];
          const head = { ...newSnake[0] };
          if (directionRef.current === "ArrowRight") {
            head.x += 10;
          } else if (directionRef.current === "ArrowLeft") {
            head.x -= 10;
          } else if (directionRef.current === "ArrowUp") {
            head.y -= 10;
          } else if (directionRef.current === "ArrowDown") {
            head.y += 10;
          }
          newSnake.unshift(head);
          for (let i = 1; i < newSnake.length; i++) {
            if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
              setGameOver(true);
              return newSnake;
            }
          }
          if (head.x === food.x && head.y === food.y) {
            console.log(head.x, head.y, food.x, food.y);
            console.log("hit", foodRef.current.style.visibility);
            foodRef.current.style.visibility = "hidden";
            const newFoodPosition = {
              x: Math.floor(Math.random() * 48) * 10,
              y: Math.floor(Math.random() * 48) * 10,
            };
            setFood(newFoodPosition);
            foodRef.current.style.visibility = "visible";
            setScore(score+1);
          } else {
            newSnake.pop();
          }
          if (head.x >= 490 || head.x <= -10 || head.y >= 490 || head.y <=-10) {
            setGameOver(true);
          }
          console.log("x "+head.x, "y "+head.y);
          return newSnake;
        });
      }, 200);
      return () => clearInterval(intervalId);
    }
    else {
      var msg;
      if( score>highScore) msg=(`Game Over Your New High Score : ${score}`)
      else{
        msg=`Game Over`
      }
      if(window.confirm(msg)===true){
        directionRef.current="ArrowRight"
        setHighScore((prev)=> Math.max(prev,score))
        setScore(0);
        setSnake([{ x: 100, y: 100 }]);
        setFood({ x: Math.floor(Math.random() * 48) * 10, y: Math.floor(Math.random() * 48) * 10 });
        setGameOver(false);
      }  
    }
  }, [gameOver, setGameOver, food, setFood, snake,score,highScore]);
  return (
    <div className="main">
      <div className="game-board-content">
        <h1>React Js Snake Game</h1>
        <h3 className="">Score : {score} High Score : {highScore}</h3>
        <div className="game-board">
        {snake.length!==0 && snake.map((segment, index) => (
            <div
              key={index}
              className="snake-segment"
              style={{
                position: "absolute",
                overflow:"unset",
                height: "15px",
                width: "15px",
                backgroundColor: "green",
                top: segment.y,
                left: segment.x,
                transition:"0.1s ease"
              }}
            ></div>
          ))}
        <div className="food" ref={foodRef} style={{position:"absolute",height:"12px",width:"12px",borderRadius:"12px",backgroundColor:"red",top:food.y,left:food.x,visibility:"visible",border:"1px"}}></div>
        </div>
      </div>
    </div>
  )
}

export default GameBoard