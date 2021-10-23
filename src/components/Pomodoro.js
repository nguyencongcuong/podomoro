import React from 'react';
import { useState, useEffect } from "react";
import {
	RiAddFill,
	RiBriefcase2Fill,
	RiEyeCloseFill,
	RiPauseFill,
	RiPlayFill,
	RiRefreshLine,
	RiSubtractFill
} from "react-icons/ri";

function Menu(props) {
  return (
    <button
			style={props.style}
      id={props.id}
      className="bg-white hover:opacity-60 font-bold hover:text-gray-200 transition-all duration-500 rounded-md p-4"
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}

function TimeChanger(props) {
  return (
    <div style={props.style} className="rounded-lg p-4 hover:opacity-60 transition-all duration-500">
      <h1 id={props.id} className="uppercase font-bold text-center m-4">
        {props.name}
      </h1>
      <div className="flex justify-evenly items-center">
        <button id={props.decrementID} onClick={props.decrement}>
          <RiSubtractFill />
        </button>
        <span id={props.valueID} className="font-bold text-2xl">
          {props.value}
        </span>
        <button id={props.incrementID} onClick={props.increment}>
          <RiAddFill />
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

	let [bg, setBg] = useState("#f1f1f1")
	let [secondaryBg, setSecondaryBg] = useState("hsla(220, 14%, 96%, 10%)")


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
		{ isBreak ? setBg("hsl(105, 28%, 58%)") : setBg("hsl(0, 44%, 48%)") }
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
			setBreakTime(5)
			setWorkTime(25)
			beep.pause()
			beep.currentTime = 0
    }
  }, [seconds, isPause, isReset])

  return (
    <React.Fragment>

    <div
		 	style={{ background: `${bg}` }}
			className="grid grid-cols-12 gap-1 w-screen h-screen p-8 transition transition-all duration-500">
      <h1 className="col-span-12 text-center text-4xl text-gray-50 font-bold uppercase">
        Pomodoro
      </h1>
      <div className="col-span-12 lg:col-start-4 lg:col-span-6 grid grid-cols-2 gap-1">
        <TimeChanger
					style={{background: secondaryBg}}
          id="break-label"
          incrementID="break-increment"
          decrementID="break-decrement"
          valueID="break-length"
          name={<RiEyeCloseFill style={{fontSize: 50}} />}
          value={breakTime}
          increment={() => breakTime === 60 ? breakTime : setBreakTime(breakTime + 5)}
          decrement={() => breakTime === 5 ? breakTime : setBreakTime(breakTime - 5)}
        />
        <TimeChanger
					style={{background: secondaryBg}}
          id="session-label"
          incrementID="session-increment"
          decrementID="session-decrement"
          valueID="session-length"
          name={<RiBriefcase2Fill style={{fontSize: 50}} />}
          value={workTime}
          increment={() => workTime === 60 ? breakTime : setWorkTime(workTime + 5)}
          decrement={() => workTime === 5 ? breakTime : setWorkTime(workTime - 5)}
        />
      </div>

      <div className="grid grid-cols-8 items-stretch justify-items-stretch gap-1 col-span-12 lg:col-start-4 lg:col-span-6 text-center font-bold text-white">

				<div
					style={{ background: secondaryBg }}
          id="timer-label"
          className="col-span-3 bg-white rounded-md flex justify-center items-center uppercase hover:opacity-60 transition-all duration-500"
					>
					<span>{isBreak ? "Thư giãn" : "Làm việc"}</span>
        </div>

				<div
					style={{ background: secondaryBg }}
          id="time-left"
          className="col-span-5 flex justify-center items-center bg-white text-6xl rounded-md py-8 hover:opacity-60 transition-all duration-500"
					>
          {minutesTimer}:{secondsTimer}
        </div>

      </div>

      <div className="grid grid-cols-2 col-span-12 lg:col-start-4 lg:col-span-6 gap-1">
					{
						!isPause ?
						<Menu
							style={{ background: secondaryBg }}
							id="start_stop"
							name={<RiPauseFill style={{fontSize: 50}} />}
							onClick={() => handlePause()} /> :
						<Menu
							style={{ background: secondaryBg }}
							id="start_stop" name={<RiPlayFill style={{fontSize: 50}} />}
							onClick={() => handlePlay()} />
					}
        <Menu
					style={{ background: secondaryBg }}
					id="reset"
					name={<RiRefreshLine style={{fontSize: 50}} />}
					onClick={() => handleReset()} />
      </div>

			<Audio />

    </div>
    </React.Fragment>
  )
}

export default Pomodoro
