import React from 'react';
import { useState, useEffect } from "react";
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

function Menu(props) {
  return (
    <button
      className="bg-white rounded-md p-4"
      onClick={props.onClick}>
      {props.name}
    </button>
  )
}

function TimeChanger(props) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h1 className="uppercase font-bold text-center m-4">
        {props.name}
      </h1>
      <div className="flex justify-evenly items-center">
        <button
          onClick={props.decrement}>
          <IndeterminateCheckBoxIcon color="action" />
        </button>
        <span className="font-bold text-2xl">
          {props.value}
        </span>
        <button
          onClick={props.increment}>
          <AddBoxIcon color="action" />
        </button>
      </div>
    </div>
  )
}

function Podomoro() {

  let [minutes, setMinutes] = useState(25)
  let [seconds, setSeconds] = useState(0)
  let [isBreak, setIsBreak] = useState(false)
  let [isPause, setIsPause] = useState(true)
  let [isReset, setIsReset] = useState(false)

  let [breakTime, setBreakTime] = useState(5)
  let [workTime, setWorkTime] = useState(1)

  let minutesTimer = minutes < 10 ? `0${minutes}` : minutes
  let secondsTimer = seconds < 10 ? `0${seconds}` : seconds

  const handlePlay = () => {
    setIsPause(false)
    setIsReset(false)
  }
  const handlePause = () => {
    setIsPause(true)
    setIsReset(false)
  }
  const handleReset = () => {
    setIsReset(true)
    setIsPause(true)
  }

  useEffect(() => {
    return isBreak ? setMinutes(breakTime - 1) : setMinutes(workTime - 1)
  }, [isBreak, workTime, breakTime])

  useEffect(() => {
    if(!isPause) {
      let interval = setInterval(() => {
        clearInterval(interval)
          if (seconds === 0) {
            if (minutes !== 0) {
              setMinutes(minutes - 1)
            } else {
              let newMinutes = !isBreak ? breakTime - 1 : workTime - 1
              setMinutes(newMinutes)
              setIsBreak(!isBreak)
            }
            setSeconds(59)
          } else {
            setSeconds(seconds - 1)
          }
      }, 100)
    }
    if(isReset && isPause) {
      setMinutes(25)
      setSeconds(0)
    }
  }, [seconds, isPause, isReset])

  return (
    <div className="grid grid-cols-12 gap-1 w-screen p-8">

      <div className="col-span-12 lg:col-start-4 lg:col-span-6 grid lg:grid-cols-2 gap-1">
        <TimeChanger
          name="Thời gian nghỉ"
          value={breakTime}
          increment={() => breakTime === 15 ? breakTime : setBreakTime(breakTime + 1)}
          decrement={() => breakTime === 1 ? breakTime : setBreakTime(breakTime - 1)}
        />
        <TimeChanger
          name="Thời gian làm"
          value={workTime}
          increment={() => workTime === 60 ? breakTime : setWorkTime(workTime + 1)}
          decrement={() => workTime === 1 ? breakTime : setWorkTime(workTime - 1)}
        />
      </div>

      <div className="grid grid-cols-2 gap-1 col-span-12 lg:col-start-4 lg:col-span-6 text-center font-bold text-white">
        <div className="bg-white text-gray-800 rounded-md py-8">
          {isBreak && "Đang giờ nghỉ nè"}
        </div>
        <div className="bg-white text-6xl text-gray-800 rounded-md py-8">
          {minutesTimer}:{secondsTimer}
        </div>
      </div>

      <div className="col-span-12 lg:col-start-4 lg:col-span-6 grid grid-cols-3 gap-1">
        <Menu name="Play" onClick={() => handlePlay()} />
        <Menu name="Pause" onClick={() => handlePause()} />
        <Menu name="Reset" onClick={() => handleReset()} />
      </div>

    </div>
  )
}

export default Podomoro
