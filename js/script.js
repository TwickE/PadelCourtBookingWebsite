/* const inputData = document.getElementById("inputData");

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;
inputData.setAttribute("min", today); */



let date = new Date();
let today = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

let monthAndYear = document.getElementById("month-year");
showCalendar(currentMonth, currentYear);

document.getElementById("prev-month").addEventListener("click", function () {
    if(currentMonth !== today.getMonth() || currentYear !== today.getFullYear()){
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        showCalendar(currentMonth, currentYear);
    }
});

document.getElementById("next-month").addEventListener("click", function () {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
});

function showCalendar(month, year) {
    let today = new Date();
    let date = new Date();
    date.setUTCDate(1);
    date.setUTCMonth(month);
    date.setUTCFullYear(year);
    let firstDay = (date.getUTCDay() + 6) % 7;
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
  
    let tbl = document.getElementById("calendar-days"); 
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
  
    let date2 = 1;
    for (let i = 0; i < 6; i++) {
      let row = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || (date2 > daysInMonth)) {
          let cell = document.createElement("td");
          let cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
        else {
          let cell = document.createElement("td");
          let cellText = document.createTextNode(date2);
          if(date2<today.getUTCDate() && month <= today.getUTCMonth() && year <= today.getUTCFullYear()){
             cell.classList.add("past");
          }
          cell.appendChild(cellText);
          row.appendChild(cell);
          date2++;
        }
      }
      tbl.appendChild(row); 
    }
  
}

