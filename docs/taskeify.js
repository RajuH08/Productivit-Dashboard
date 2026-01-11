function pageOpener() {
  var allElems = document.querySelectorAll(".elem-div");
  var allFullElems = document.querySelectorAll(".full-elems");
  var allFullElemsBackBtn = document.querySelectorAll(".full-elems .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      allFullElems[elem.id].style.display = "block";
    });
  });

  allFullElemsBackBtn.forEach(function (elem) {
    elem.addEventListener("click", function () {
      allFullElems[elem.id].style.display = "none";
    });
  });
}
pageOpener();

function taskManager() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task is Empty");
  }

  function renderTask() {
    var allTask = document.querySelector(".allTask");
    var sum = "";

    currentTask.forEach(function (elem, idx) {
      sum =
        sum +
        `<div class="task">
    <h5>${elem.task} <span class=${elem.idx}>imp</span></h5>
    <button id=${idx}>Done</button>
    </div>`;
    });

    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button ").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  var form = document.querySelector(".addTask form");
  var input = document.querySelector(".addTask form #taskInput");
  var taskDetailsInput = document.querySelector(".addTask form textarea");
  var taskCheckBox = document.querySelector(".addTask form  #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: input.value,
      details: taskDetailsInput.value,
      imp: taskCheckBox.checked,
    });

    renderTask();
    taskCheckBox.checked = false;
    input.value = "";
    taskDetailsInput.value = "";
  });
}
taskManager();

function dailyPlanner() {
  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var dayplanner = document.querySelector(".day-planner");

  var hours = Array.from(
    { length: 24 },
    (elem, idx) => `${0 + idx}:00 - ${1 + idx}:00`
  );

  var wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || "";

    wholeDaySum =
      wholeDaySum +
      `<div class="day-planner-time">
  <p>${elem}</p>
  <input id=${idx} type="text" placeholder="..." value=${savedData}>
  </div>`;
  });

  dayplanner.innerHTML = wholeDaySum;

  var dayplannerinput = document.querySelectorAll(".day-planner input");

  dayplannerinput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

function motivationalQuote() {
  var motivQuote = document.querySelector(".motiv-3 h2");
  var motivQuote3 = document.querySelector(".motiv-2 h2");
  var motivQuoteAuthor = document.querySelector(".author h2");
  var btn = document.querySelector(".motiv-btn");

  async function fetchQuote() {
    let response = await fetch("https://api.quotable.io/random");

    let data = await response.json();

    motivQuote3.innerHTML = data.tags;
    motivQuote.innerHTML = data.content;
    motivQuoteAuthor.innerHTML = data.author;
  }

  btn.addEventListener("click", fetchQuote);
  fetchQuote();
}
motivationalQuote();

function pomodoroTimer() {
  var timer = document.querySelector(".pomo-timer h1");
  var start = document.querySelector(".pomo-timer .start-timer");
  var pause = document.querySelector(".pomo-timer .pause-timer");
  var reset = document.querySelector(".pomo-timer .reset-timer");
  var session = document.querySelector(".full-elems-container .session");
  var isWorkSection = true;

  let timerInterval = null;
  let totalSeconds = 25 * 60;

  function upDateTime() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")} `;
  }

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSection) {
      totalSeconds = 25 * 60;
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
        } else {
          isWorkSection = false;
          clearInterval(timerInterval);
          timer.innerHTML = `05:00`;
          session.innerHTML = `break`;
          session.style.backgroundColor = `rgb(113, 20, 20)`;
        }
        upDateTime();
      }, 1000);
    } else {
      totalSeconds = 5 * 60;
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
        } else {
          isWorkSection = true;
          clearInterval(timerInterval);
          timer.innerHTML = `25:00`;
          session.innerHTML = `studying`;
          session.style.backgroundColor = ` rgb(68, 147, 147)`;
        }
        upDateTime();
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 25 * 60;
    upDateTime();
  }

  start.addEventListener("click", startTimer);
  pause.addEventListener("click", pauseTimer);
  reset.addEventListener("click", resetTimer);
}
pomodoroTimer();

function TimeDateWeather(){
var apiKey = `37f700ac92a74868a06135837261101`
var city = 'Bengaluru'

var headerDate = document.querySelector('.header2 h1')
var headerDay = document.querySelector('.header2 h4')
var headerTemp = document.querySelector('.header1 h2')
var headerCondition = document.querySelector('.header1 h4')
var headerHumidity = document.querySelector('.header1 .humi')
var headerPreciditon = document.querySelector('.header1 .preci')
var headerWind = document.querySelector('.header1 .wind')

var data = null

async function weatherAPICall(){
  var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
  var data = await response.json()

  headerTemp.innerHTML = `${data.current.temp_c}°c`
  headerCondition.innerHTML = `${data.current.condition.text}`
  headerHumidity.innerHTML = `Humidity:${data.current.humidity}%`
  headerPreciditon.innerHTML = `HeatIndex: ${data.current.heatindex_c}%`
  headerWind.innerHTML = `Wind: ${data.current.wind_kph} km/h`
}

weatherAPICall()


  var date = null
function timeDate(){

  let totalDaysOfWeek = ['sunday','monday','tuesday','wednesday','thrusday','friday','saturday']
  let monthss = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

  var date = new Date()
  var dayOfWeek = totalDaysOfWeek[date.getDay()]
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var dates = date.getDate()
  var month = monthss[date.getMonth()]
  var year = date.getFullYear()

  headerDay.innerHTML = `${dates} ${month}  ${year}`


  if(hours>12){
    headerDate.innerHTML = `${dayOfWeek}, ${String(hours-12).padStart('2','0')}:${String(minutes).padStart('2','0')}pm`
  }else{
    headerDate.innerHTML = `${dayOfWeek}, ${hours}:${minutes}am`
  }

}
timeDate()
}
TimeDateWeather()


function changeTheme() {
  
    var theme = document.querySelector('.theme')
    var rootElement = document.documentElement

    var flag = 0
    theme.addEventListener('click', function () {

        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#222831')
            rootElement.style.setProperty('--tri1', '#948979')
            rootElement.style.setProperty('--tri2', '#393E46')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#F1EFEC')
            rootElement.style.setProperty('--sec', '#030303')
            rootElement.style.setProperty('--tri1', '#D4C9BE')
            rootElement.style.setProperty('--tri2', '#123458')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#381c0a')
            rootElement.style.setProperty('--tri1', '#FEBA17')
            rootElement.style.setProperty('--tri2', '#74512D')
            flag = 0
        }

    })


}

changeTheme()

