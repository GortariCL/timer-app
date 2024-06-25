import {useState, useRef} from 'react';

import "./Timer.css";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isJuanin, setIsJuanin] = useState(false)
  const intervalRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const startTimer = () => {
    if (isActive || inputValue === '') return;
    const totalSeconds = parseInt(inputValue) * 60;

    setSeconds(totalSeconds);
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) setIsJuanin(!isJuanin);
        return prevSeconds - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setInputValue('');
    setIsJuanin(false);
    setSeconds(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="timer">
      <h1 className="title">Temporizador G17:</h1>
      <p className="message">Ingresa el tiempo</p>
      <div className="input__container">
        <input
          className="timer__input"
          type="number"
          placeholder=""
          value={inputValue}
          onChange={handleInputChange}
          disabled={isActive}
        />
        <p className="minutes__text">minutos</p>
      </div>
      {
        seconds <= 10 && seconds > 0
          ?
          <h1 className='red__time'>{seconds}</h1>
          :
          isJuanin
            ?
            <img src="/31minutos-estamos-al-aire.gif" alt="juanin"/>
            :
            <h1 className='time'>{formatTime(seconds)}</h1>

      }
      <div className="buttons">
        {!isActive ? (
          <button className={isJuanin ? 'start__button__disabled' : 'start__button'} onClick={startTimer} disabled={isJuanin}>Start</button>
        ) : (
          <button className={isJuanin ? 'stop__button__disabled' : 'stop__button'} onClick={stopTimer} disabled={isJuanin}>Stop</button>
        )}
        <button className="reset__button" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
