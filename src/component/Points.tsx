import { useEffect, useState } from "react";

interface Props{
    value: number;
    position: {x:number, y:number};
    checkRight: (num:number) => boolean;
    isRun: boolean;
    time: number;
    curPoint: number; 
    autoMode: boolean;
}

export default function Point({value, position, checkRight, isRun, curPoint, autoMode}:Props){
    const [timeLeft, setTimeLeft] = useState(3.0);
    const [isRunning, setIsRunning] = useState(false);
    const [opacity, setOpacity] = useState(1);
    const [display, setDisplay] = useState("flex");
    const [color, setColor] = useState("white");
         
    useEffect(() => {
        if (timeLeft <= 0 || !isRunning) {
            if(timeLeft<=0) setDisplay("none");
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => parseFloat((prevTime - 0.1).toFixed(1)));
            setOpacity((pre) => pre-0.04)
        }, 100);
          
        return () => {
            clearInterval(intervalId);
        }
    }, [timeLeft, isRunning]);

    useEffect(() =>{
        if(!isRun) {
            setIsRunning(isRun);
        }
    },[isRun])

    useEffect(() => {
        setTimeLeft(3);
        setIsRunning(false);
        setColor("white");
        setOpacity(1);
        setDisplay("flex");
    },[position])

    useEffect(() => {
        if(curPoint === value && autoMode) {
            setTimeout(() => handleClick(), 1000);
        }
    },[curPoint, autoMode])
    
    const handleClick = () => {
        if(isRun){
            setIsRunning(true);
            setColor("#ff6600");
            const isRight = checkRight(value);
            if(!isRight) setIsRunning(false);
        }
    };

    return(
        <li onClick={handleClick} style={{
            top:`${position.x}px`, 
            left:`${position.y}px`, 
            opacity: `${opacity}`, 
            display: `${display}`,
            background: `${color}`
        }}>
            <p className='num'>{value}</p>
            {(color !== "white") && <p className='time'>{timeLeft}s</p>}
        </li>
    )
    
}