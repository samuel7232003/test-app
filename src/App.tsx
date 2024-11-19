import { useEffect, useRef, useState } from 'react';
import './App.css';
import Point from './component/Points';

function App() {
    const [isPlay, setIsPlay] = useState(false);
    const [mode, setMode] = useState("LET'S PLAY");
    const [points, setPoints] = useState<number[]>([]);
    const [position, setPosition] = useState<{x:number, y:number}[]>([])
    const [curPoint, setCurPoint] = useState<number>(1);
    const [time, setTime] = useState(0.0);
    const [isRunning, setIsRunning] = useState(false);
    const [autoMode, setAutoMode] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isRunning) return;
        const intervalId = setInterval(() => {
            setTime((prevTime) => parseFloat((prevTime + 0.1).toFixed(1)));
        }, 100);
          
        return () => clearInterval(intervalId);
    }, [time, isRunning])

    function handlePlay(){
        setIsPlay(true);
        setIsRunning(true);
        const num = inputRef.current?.value;
        if(num){
            const numPoint = parseInt(num);
            let listPoint = [];
            let listPosition = [];
            for(let i = 0; i<numPoint; i++){
                listPoint.unshift(i+1);
                const x = Math.floor(Math.random() * 450);
                const y = Math.floor(Math.random() * 450);
                listPosition.unshift({x:x, y:y});
            }
            setPoints([...listPoint]);
            setPosition([...listPosition]);
            setCurPoint(listPoint[listPoint.length-1]);
        }
    }

    function handleRestart(){
        setTime(0.00);
        handlePlay();
        setMode("LET'S PLAY");
        setAutoMode(false);
    }

    function checkRight(num:number):boolean{
        if(num === curPoint){
            if(num === points[0]){
                setIsRunning(false);
                setMode("ALL CLEAR!");
                return true;
            }
            else{
                setCurPoint(curPoint + 1);
                return true;
            } 
        }
        else{
            setIsRunning(false);
            setMode("GAME OVER!");
            return false;
        }
    }

    return (
        <div className="App">
            <div className='title'>
                <h1>{mode}</h1>
                <div className='points'>
                    <p>Points</p>
                    <div><input ref={inputRef} type="text" defaultValue={5} /></div>
                </div>
                <div className='time'>
                    <p>Time</p>
                    <p>{time}s</p>
                </div>
                {!isPlay?<div className='buttons'>
                    <button onClick={handlePlay}>Play</button>
                </div>:<div className='buttons'>
                    <button onClick={handleRestart}>Restart</button>
                    {isRunning && <button onClick={() => setAutoMode(!autoMode)}>Auto Play {autoMode?"ON":"OFF"}</button>}
                </div>
                }
            </div>
            <div className='main'>
                <ul>
                    {points.map(index => 
                        <Point 
                            key={index} 
                            value={index} 
                            position={position[index-1]} 
                            checkRight={checkRight} 
                            isRun={isRunning}
                            time={time}
                            curPoint={curPoint}
                            autoMode={autoMode}
                        />
                    )}
                </ul>
                <p className='next'>Next: {curPoint}</p>
            </div>
        </div>
    );
}

export default App;
