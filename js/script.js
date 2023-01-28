let data = [];
let horaInicio = 0;
let horaInicioAntiga = 0;
let minutoInicio = 0;
let minutoInicioAntigo = 0;
let horaFim = 0;
let horaFimAntiga = 0;
let minutoFim = 0;
let minutoFimAntigo = 0;

const diaSemanaFinal = document.getElementById('diaSemanaFinal');
const dataFinal = document.getElementById('dataFinal');
const horasFinal = document.getElementById('horasFinal');

let date = new Date();
let today = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

let monthAndYear = document.getElementById("month-year");
showCalendar(currentMonth, currentYear);

document.getElementById("prev-month").addEventListener("click", function () {
  if (currentMonth !== today.getMonth() || currentYear !== today.getFullYear()) {
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

function selectDay(year, month) {
  let selected = document.querySelector(".selected");
  let selectedDate = new Date(year, month, this.textContent);
  let today = new Date();
  if (selected) {
    selected.classList.remove("selected");
    selected.classList.remove("hover");
  }
  if (selectedDate >= today) {
    this.classList.add("selected");
    this.classList.remove("hover");
  }
}

function showCalendar(month, year) {
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
      } else {
        let cell = document.createElement("td");
        let cellText = document.createTextNode(date2);
        let cellDate = new Date(year, month, date2);
        if (cellDate > today) {
          cell.classList.add("disabled");
        }
        if (date2 === today.getUTCDate() && year === today.getUTCFullYear() && month === today.getUTCMonth()) {
          cell.classList.add("today");
        }
        if (date2 < today.getUTCDate() && month <= today.getUTCMonth() && year <= today.getUTCFullYear()) {
          cell.classList.add("past");
        }
        cell.appendChild(cellText);
        cell.addEventListener("click", function () {
          selectDay.call(this, year, month);
          data = [this.textContent, month + 1, year];
          let date = new Date(data[2], data[1] - 1, data[0]);
          let str = date.toLocaleString('pt-PT', {weekday: 'long'});
          let firstChar = str.charAt(0).toUpperCase();
          diaSemanaFinal.innerHTML = firstChar + str.slice(1);
          dataFinal.innerHTML = date.toLocaleString('pt-PT', {day: 'numeric', month: 'long', year: 'numeric'});
          console.log(dataFinal.innerHTML);
        });
        cell.addEventListener("mouseover", function () {
          if (!this.classList.contains("selected")) {
            this.classList.add("hover");
          }
        });
        cell.addEventListener("mouseout", function () {
          this.classList.remove("hover");
        });
        row.appendChild(cell);
        date2++;
      }
    }
    tbl.appendChild(row);
  }
  let lastRow = tbl.rows.length - 1; // get the last row
  let empty = true;
  for (let j = 0; j < 7; j++) {
    if (tbl.rows[lastRow].cells[j].textContent !== "") {
      empty = false;
      break;
    }
  }
  if (empty) {
    tbl.deleteRow(lastRow);
  }
}

document.querySelectorAll('.btn-horas-inicio').forEach(function(button) {
  button.addEventListener('click', function() {
    this.classList.add('selected');
    try {
      horaInicioAntiga.classList.remove('selected');
    } catch (error) {
    }

    horaInicioAntiga = this;
    horaInicio = this.textContent;
    console.log("horaInicio: " + horaInicio);
  });
});

document.querySelectorAll('.btn-min-inicio').forEach(function(button) {
  button.addEventListener('click', function() {
    this.classList.add('selected');
    try {
      minutoInicioAntigo.classList.remove('selected');
    } catch (error) {
    }

    minutoInicioAntigo = this;
    minutoInicio = this.textContent;
    console.log("minutoInicio: " + minutoInicio);
  });
});

document.querySelectorAll('.btn-horas-fim').forEach(function(button) {
  button.addEventListener('click', function() {
    this.classList.add('selected');
    try {
      horaFimAntiga.classList.remove('selected');
    } catch (error) {
    }

    horaFimAntiga = this;
    horaFim = this.textContent;
    console.log("horaFim: " + horaFim);
  });
});

document.querySelectorAll('.btn-min-fim').forEach(function(button) {
  button.addEventListener('click', function() {
    this.classList.add('selected');
    try {
      minutoFimAntigo.classList.remove('selected');
    } catch (error) {
    }

    minutoFimAntigo = this;
    minutoFim = this.textContent;
    console.log("minutoFim: " + minutoFim);
  });
});