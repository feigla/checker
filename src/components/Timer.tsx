import React, {FC, memo, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Players";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
    setStartGame: React.Dispatch<React.SetStateAction<boolean>>
    startGame: boolean | null
    setCurrentPlayer: React.Dispatch<React.SetStateAction<Player | null>>
}
const Timer: FC<TimerProps> = ({currentPlayer, restart, setStartGame, startGame, setCurrentPlayer}) => {
    const [countSecBlack, setCountSecBlack] = useState(0)
    const [countSecWhite, setCountSecWhite] = useState(0);
    const [countMinWhite, setCountMinWhite] = useState(1)
    const [countMinBlack, setCountMinBlack] = useState(1)

    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    useEffect(() => {
        if (startGame) {
            startTimer()
        }
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer() : decrementBlackTimer()
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setCountSecBlack(prev => {
            if (prev === 0)  {
                setCountMinBlack(prev => prev - 1)
                return 59
            } else {
                return prev - 1
            }
        })
    }

    function decrementWhiteTimer() {
        setCountSecWhite(prev => {
            if (prev === 0)  {
                setCountMinWhite(prev => prev - 1)
                return 59
            } else {
                return prev - 1
            }
        })
    }

    function changeTimer() {
        setCountSecWhite(Number(prompt('Second White')))
        setCountSecBlack(Number(prompt('Second Black')))
        setCountMinBlack(Number(prompt('Minute Black')))
        setCountMinWhite(Number(prompt('Minute White')))
        if (timer.current) {
            clearInterval(timer.current)
        }
        setCurrentPlayer(null)
        setStartGame(false)
        restart()
    }

    return (

        <div className='timer'>
            <div className='timer_time'>
                <div className='timer_child'>
                    <h2>{countMinBlack}:{countSecBlack < 10 ? `0${countSecBlack}` : countSecBlack}</h2>
                    <span>Black</span>
                </div>
                <div className='timer__block'>
                    <div className='timer__button'>
                        <button onClick={changeTimer}>Choose time</button>
                    </div>
                </div>
                <div className='timer_child'>
                    <span>White</span>
                    <h2>{countMinWhite}:{countSecWhite < 10 ? `0${countSecWhite}` : countSecWhite}</h2>
                </div>
            </div>
        </div>
    );
};

export default memo(Timer);