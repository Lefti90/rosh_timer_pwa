import './App.css'
import { useState, useEffect, useCallback } from 'react'

function App() {
  const [gameMode, setGameMode] = useState("normal") //not yet set up for turbo
  const [roshanStatus, setRoshanStatus] = useState("roshan is up!");
  const [timeOfDeath, setTimeOfDeath] = useState("0000");
  const [aegisTime, setAegisTime] = useState("5:00");
  const [aegisTimer, setAegisTimer] = useState("");
  const [earlySpawn, setEarlySpawn] = useState("8:00");
  const [earlySpawnTimer, setEarlySpawnTimer] = useState("");
  const [lateSpawn, setLateSpawn] = useState("11:00");
  const [lateSpawnTimer, setLateSpawnTimer] = useState("");

  const statusColors = {
    "roshan is up!": "green",
    "roshan might be up": "orange",
    "roshan is dead!": "red"
  };

  const aegisRate = "5:00"
  const earlyRate = "8:00"
  const lateRate = "11:00"
  
  //TODO: set for turbo
  // if (gameMode === "normal"){
  //   const aegisRate = "5:00"
  //   const earlyRate = "8:00"
  //   const lateRate = "11:00"
  // } else {
  //   const aegisRate = "5:00"
  //   const earlyRate = "8:00"
  //   const lateRate = "11:00"
  // }


  // Function to update the timers every second
  const updateTimers = useCallback(() => {
    // Convert timer strings to seconds for easier manipulation
    const [aegisMin, aegisSec] = aegisTimer.split(':').map(Number);
    const [earlyMin, earlySec] = earlySpawnTimer.split(':').map(Number);
    const [lateMin, lateSec] = lateSpawnTimer.split(':').map(Number);

    // Update Aegis timer
    if (aegisMin > 0 || aegisSec > 0) {
      const updatedAegisSec = aegisMin * 60 + aegisSec - 1;
      const updatedAegisMin = Math.floor(updatedAegisSec / 60);
      const updatedAegisSecValue = updatedAegisSec % 60;
      setAegisTimer(
        `${String(updatedAegisMin).padStart(2, '0')}:${String(updatedAegisSecValue).padStart(2, '0')}`
      );
    }

    // Update Early Spawn timer
    if (earlyMin > 0 || earlySec > 0) {
      const updatedEarlySec = earlyMin * 60 + earlySec - 1;
      const updatedEarlyMin = Math.floor(updatedEarlySec / 60);
      const updatedEarlySecValue = updatedEarlySec % 60;
      setEarlySpawnTimer(
        `${String(updatedEarlyMin).padStart(2, '0')}:${String(updatedEarlySecValue).padStart(2, '0')}`
      );
    }

    // Update Late Spawn timer
    if (lateMin > 0 || lateSec > 0) {
      const updatedLateSec = lateMin * 60 + lateSec - 1;
      const updatedLateMin = Math.floor(updatedLateSec / 60);
      const updatedLateSecValue = updatedLateSec % 60;
      setLateSpawnTimer(
        `${String(updatedLateMin).padStart(2, '0')}:${String(updatedLateSecValue).padStart(2, '0')}`
      );
    }
    if(earlySpawnTimer === "00:00"){
      setRoshanStatus("roshan might be up")
    }

    if(lateSpawnTimer === "00:00"){
      setRoshanStatus("roshan is up!")
    }
  }, [aegisTimer, earlySpawnTimer, lateSpawnTimer]);

  useEffect(() => {
    const timerInterval = setInterval(updateTimers, 1000);

    return () => clearInterval(timerInterval);
  }, [updateTimers]);


  // Start timer button logic --------------------------------------------------------------
  const handleStartTimerClick = () => {
    // Get the values from the input fields
    const min = document.getElementById("death_time_min").value;
    const sec = document.getElementById("death_time_sec").value;

    // Validate and format the time
    if (min >= 0 && sec >= 0 && sec < 60 && min !== '' && sec !== '') {
      const formattedTime = `${min}:${sec}`;
      setTimeOfDeath(formattedTime);

      // Calculate and set the initial timer values
      const aegisMinutes = (parseInt(min, 10) + 5).toString().padStart(2, '0');
      const earlyMinutes = (parseInt(min, 10) + 8).toString().padStart(2, '0');
      const lateMinutes = (parseInt(min, 10) + 11).toString().padStart(2, '0');

      setAegisTime(`${aegisMinutes}:${sec}`);
      setAegisTimer(aegisRate);
      setEarlySpawn(`${earlyMinutes}:${sec}`);
      setEarlySpawnTimer(earlyRate);
      setLateSpawn(`${lateMinutes}:${sec}`);
      setLateSpawnTimer(lateRate);

      // Update the roshan status if needed
      setRoshanStatus("roshan is dead!");
    } else {
      alert("Invalid time format. Please enter valid minutes and seconds. \n For example, the first field '23' and the second field '34' if the roshan died at 23:34");
    }
    console.log(min, ":", sec)
  }
  //----------------------------------------------------------------------------------------
  
  //Copy to clip board logic
  const copyTimeForClipBoard = () => {
    // Construct the message to be logged and copied to clipboard
    const message = `aegis: ${aegisTime} early: ${earlySpawn} late: ${lateSpawn}`

    // Log the message to the console
    console.log(message)

    // Copy the message to the clipboard
    navigator.clipboard.writeText(message)
      .then(() => {
        alert("Timestamps copied to clipboard!")
      })
      .catch((error) => {
        console.error("Failed to copy message to clipboard:", error)
      })
  }

  //TODO: Pause timer

  const click_handler = () => {
    console.log('Click')
    setRoshanStatus("roshan is dead!")
  }

  return (
    <div className="div1">
      <header className="App-header">
        {/* logo */}
        <img className="logo_text" src="/images/logo_with_text.png" alt="logo_with_text.png"></img>
        {/* statustext */}
          <h2 className={`statusText ${statusColors[roshanStatus]}`}>{roshanStatus}</h2>
        {/* input time */}
        <form>
        <label className='custom-text'>time when roshan died:</label> <br/>
        <input type="number" id="death_time_min" name="death_time_min" placeholder='min'></input>
        <input type="number" id="death_time_sec" name="death_time_sec" placeholder='sec'></input>
        </form>
        {/* start timer */}
          <div className="img-wrap">
            <button className="button1" onClick={handleStartTimerClick}><img src="/images/btn_start_timer.png" alt="start_timer.png"></img></button>
          </div>
        {/* pause timer */}
          <div className="img-wrap">
            <button className="button1" onClick={copyTimeForClipBoard}><img src="/images/btn_pause_timer.png" alt="pause_timer.png"></img></button>
          </div>
        {/* text and timers */}
          <p className="custom-text2">aegis disappears in: <br/> {aegisTime} - {aegisTimer}</p>
          <p className="custom-text2">roshan early spawn: <br/> {earlySpawn} - {earlySpawnTimer}</p>
          <p className="custom-text2">roshan early spawn: <br/> {lateSpawn} - {lateSpawnTimer}</p>
        {/* stop timer */}
          <div className="img-wrap">
            <button className="button1" onClick={click_handler}><img src="/images/btn_stop_timer.png" alt="stop_timer.png" className="relative_img"></img></button>
          </div>

      </header>
    </div>
  )
}

export default App