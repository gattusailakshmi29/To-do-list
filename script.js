const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const priority = document.getElementById("priority-select");

// Function to show the current time
function showCurrentTime() {
  const currentTimeElement = document.getElementById("current-time");
  let date = new Date();

  // Date formatting
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  let dayOfWeek = daysOfWeek[date.getDay()];
  let month = months[date.getMonth()];
  let day = date.getDate();
  let year = date.getFullYear();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;  // Adding leading zero to seconds
  currentTimeElement.innerHTML = `${month} ${day}, ${year} - ${hours}:${minutes}:${seconds} ${ampm}`;
}

// Update time every second
setInterval(showCurrentTime, 1000);

// Function to add a task
function addTask() {
  if (inputBox.value === "") {
    alert("Please enter a task");
    alert("Priority: " + priority.value);
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    
    let span = document.createElement("span");
    span.innerHTML = "\u00D7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

// Event listener for task actions (checking and deleting)
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

// Save tasks to localStorage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Load tasks from localStorage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

// Initial task load and time display
showTask();
showCurrentTime();
