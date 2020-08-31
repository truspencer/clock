(() => {
	const init = () => {
		updateClock();
		setInterval(() => {
			updateClock();
		}, 1000);
	};

	const updateClock = () => {
		resetClock();
		getCurrentTime();
		displayCurrentTime();
	};

	const getCurrentTime = () => {
		let fullDate = new Date();
		let month = fullDate.getMonth();
		let date = fullDate.getDate();
		let year = fullDate.getFullYear();
		let day = fullDate.getDay();
		let	hours = fullDate.getHours();
		let	minutes = fullDate.getMinutes();
		let	seconds = fullDate.getSeconds();
		let period = (hours >= 12) ? "pm" : "am";

		window.clock = {};
		window.clock.time = {
			fullDate: fullDate,
			month: month,
			date: date,
			year: year,
			day: day,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
			period: period
		};
	};

	const displayCurrentTime = () => {
		let day = window.clock.time.day;
		let month = window.clock.time.month;
		let date = window.clock.time.date;
		let year = window.clock.time.year;
		let hours = window.clock.time.hours;
		let minutes = window.clock.time.minutes;
		let seconds = window.clock.time.seconds;
		let period = window.clock.time.period;

		//formats hours
		hours = (hours > 12) ? (hours - 12) : hours;
		hours = (hours === 0) ? 12 : hours;
		hours = (hours <= 9) ? ("0" + hours) : hours;
		//formats minutes
		minutes = (minutes <= 9) ? ("0" + minutes) : minutes;
		//formats seconds
		seconds = (seconds <= 9) ? ("0" + seconds) : seconds;
		//formats day
		let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		let dayText = ``;
		if(days[day].length === 6) dayText = `<span style="color: #2b2828;">ooo</span>${days[day]}`;
		if(days[day].length === 7) dayText = `<span style="color: #2b2828;">oo</span>${days[day]}`;
		if(days[day].length === 8) dayText = `<span style="color: #2b2828;">o</span>${days[day]}`;
		if(days[day].length === 9) dayText = `<span style="color: #2b2828;"></span>${days[day]}`;
		//formats mobile day
		let mobileDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		//formats month
		let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		//formats date
		date = (date <= 9) ? ("0" + date) : date;

		// targets the html
		const dayHtml = document.getElementsByClassName('day-alpha')[0];
		const mobileDayHtml = document.getElementsByClassName('day-alpha-mobile')[0];
		const monthHtml = document.getElementsByClassName('month-alpha')[0];
		const dateHtml = document.getElementsByClassName('date-number')[0];
		const yearHtml = document.getElementsByClassName('year-number')[0];
		const hoursHtml = document.getElementsByClassName('hours')[0];
		const minutesHtml = document.getElementsByClassName('minutes')[0];
		const secondsHtml = document.getElementsByClassName('seconds')[0];
		const periodHtml = document.getElementsByClassName(period)[0];

		// changes the html values
		dayHtml.innerHTML = dayText;
		mobileDayHtml.innerHTML = mobileDays[day];
		monthHtml.innerHTML = months[month];
		dateHtml.innerHTML = date;
		yearHtml.innerHTML = year;
		hoursHtml.innerHTML = hours;
		minutesHtml.innerHTML = minutes;
		secondsHtml.innerHTML = seconds;
		periodHtml.classList.add("light-on");
	};

	const resetClock = () => {
		const lights = document.querySelectorAll(".light-on");

		if(lights) {
			lights.forEach(item => {
				item.classList.remove("light-on")
			});
		}
	};

	return init();
})()

var time, alarm, currentH, currentM,
    activeAlarm = false,
    sound = new Audio("https://freespecialeffects.co.uk/soundfx/clocks/clock_chime.wav");

/*
  audio sound source: https://freesound.org/people/SieuAmThanh/sounds/397787/
*/

// loop alarm
sound.loop = true;

// define a function to display the current time
function displayTime() {
  var now = new Date();
  time = now.toLocaleTimeString();
  clock.textContent = time;
  // time = "1:00:00 AM";
  // watch for alarm
  if (time === alarm) {
    sound.play();
    
    // show snooze button
    snooze.className = "";
  }
  setTimeout(displayTime, 1000);
}
displayTime();

// add option values relative towards time
function addMinSecVals(id) {
  var select = id;
  var min = 59;
  
  for (i = 0; i <= min; i++) {
    // defined as new Option(text, value)
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i < 10 ? "0" + i : i);
  }
}
function addHours(id) {
  var select = id;
  var hour = 12;
  
  for (i = 1; i <= hour; i++) {
    // defined as new Option(text, value)
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}
addMinSecVals(minutes);
addMinSecVals(seconds);
addHours(hours);

// set and clear alarm
startstop.onclick = function() {
  // set the alarm
  if (activeAlarm === false) {
    hours.disabled = true;
    minutes.disabled = true;
    seconds.disabled = true;
    ampm.disabled = true;
    
    alarm = hours.value + ":" + minutes.value + ":" + seconds.value + " " + ampm.value;
    this.textContent = "Clear Alarm";
    activeAlarm = true;
  } else {
    // clear the alarm
    hours.disabled = false;
    minutes.disabled = false;
    seconds.disabled = false;
    ampm.disabled = false;
    
    sound.pause();
    alarm = "00:00:00 AM";
    this.textContent = "Set Alarm";
    
    // hide snooze button
    snooze.className = "hide";
    activeAlarm = false;
  }
};

// snooze for 5 minutes
snooze.onclick = function() {
  if (activeAlarm === true) {
    // grab the current hour and minute
    currentH = time.substr(0, time.length - 9);
    currentM = time.substr(currentH.length + 1, time.length - 8);
    
    if (currentM >= "55") {
      minutes.value = "00";
      hours.value = parseInt(currentH) + 1;
    } else {
      if (parseInt(currentM) + 5 <= 9) {
        minutes.value = "0" + parseInt(currentM + 5);
      } else {
        minutes.value = parseInt(currentM) + 5;
      }
    }
    
    // hide snooze button
    snooze.className = "hide";
    
    // now reset alarm
    startstop.click();
    startstop.click();
  } else {
    return false;
  }
};