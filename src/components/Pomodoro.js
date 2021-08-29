import React from 'react';
import { useState, useEffect } from "react";
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';
import RemoveTwoToneIcon from '@material-ui/icons/RemoveTwoTone';
import LocalCafeTwoToneIcon from '@material-ui/icons/LocalCafeTwoTone';
import LaptopChromebookTwoToneIcon from '@material-ui/icons/LaptopChromebookTwoTone';

function Menu(props) {
  return (
    <button
      id={props.id}
      className="bg-white hover:bg-green-50 font-bold hover:text-green-500 transition-all duration-500 rounded-md p-4"
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}

function TimeChanger(props) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h1 id={props.id} className="uppercase font-bold text-center m-4">
        {props.name}
      </h1>
      <div className="flex justify-evenly items-center">
        <button id={props.decrementID} onClick={props.decrement}>
          <RemoveTwoToneIcon />
        </button>
        <span id={props.valueID} className="font-bold text-2xl">
          {props.value}
        </span>
        <button id={props.incrementID} onClick={props.increment}>
          <AddTwoToneIcon />
        </button>
      </div>
    </div>
  );
}

function Audio() {
	return (
		<audio
			controls
			id="beep"
			className="sr-only"
			src="./beep.wav"
			type="audio/wav"
			autoPlay
			/>
	)
}


function Pomodoro() {

  let [minutes, setMinutes] = useState(25)
  let [seconds, setSeconds] = useState(0)
  let [isBreak, setIsBreak] = useState(false)
  let [isPause, setIsPause] = useState(true)
  let [isReset, setIsReset] = useState(false)

  let [breakTime, setBreakTime] = useState(5)
  let [workTime, setWorkTime] = useState(25)
	const beep = document.getElementById("beep")


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
    return isBreak ? setMinutes(breakTime) : setMinutes(workTime)
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

							// Play beep

							beep.play()

            }
            setSeconds(59)
          } else {
						setSeconds(seconds - 1)
          }
      }, 1000)
    }
    if(isReset && isPause) {
      setMinutes(25)
      setSeconds(0)
			beep.pause()
			beep.currentTime = 0
    }
  }, [seconds, isPause, isReset])

  return (
    <React.Fragment>

    <div className="grid grid-cols-12 gap-1 w-screen p-8">
      <h1 className="col-span-12 text-center text-4xl font-bold uppercase mb-8">
        Podomoro
      </h1>
      <div className="col-span-12 lg:col-start-4 lg:col-span-6 grid lg:grid-cols-2 gap-1">
        <TimeChanger
          id="break-label"
          incrementID="break-increment"
          decrementID="break-decrement"
          valueID="break-length"
          name="Thời gian nghỉ"
          value={breakTime}
          increment={() => breakTime === 60 ? breakTime : setBreakTime(breakTime + 5)}
          decrement={() => breakTime === 5 ? breakTime : setBreakTime(breakTime - 5)}
        />
        <TimeChanger
          id="session-label"
          incrementID="session-increment"
          decrementID="session-decrement"
          valueID="session-length"
          name="Thời gian làm"
          value={workTime}
          increment={() => workTime === 60 ? breakTime : setWorkTime(workTime + 5)}
          decrement={() => workTime === 5 ? breakTime : setWorkTime(workTime - 5)}
        />
      </div>

      <div className="grid grid-cols-2 items-stretch justify-items-stretch gap-1 col-span-12 lg:col-start-4 lg:col-span-6 text-center font-bold text-white">
        <div
          id="timer-label"
          className="bg-white text-gray-800 rounded-md flex justify-center items-center">
          {
            !isBreak ?
            <div><span className="sr-only">
            Làm
            </span><LocalCafeTwoToneIcon style={{fontSize: 50}} /></div> :
            <div><span className="sr-only">
            Nghỉ
            </span><LaptopChromebookTwoToneIcon style={{fontSize: 50}} /></div>
          }
        </div>
        <div
          id="time-left"
          className="bg-white text-6xl text-gray-800 rounded-md py-8">
          {minutesTimer}:{secondsTimer}
        </div>
      </div>

      <div className="col-span-12 lg:col-start-4 lg:col-span-6 grid grid-cols-3 gap-1">
					{
						!isPause ? <Menu id="start_stop" name="Pause" onClick={() => handlePause()} /> :
						<Menu id="start_stop" name="Play" onClick={() => handlePlay()} />
					}
        <Menu id="reset" name="Reset" onClick={() => handleReset()} />
      </div>

			<Audio />

    </div>
    </React.Fragment>
  )
}

export default Pomodoro
