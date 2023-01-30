let data = [];
let horaInicio = 0;
let horaInicioAntiga = 0;
let horaFim = 0;
let horaFimAntiga = 0;


const diaSemanaFinal = document.getElementById('diaSemanaFinal');
let diaPredefinido = new Date().getDate() + 1;
let mesPredefinido = new Date().getMonth();
let anoPredefinido = new Date().getFullYear();
let combinacaoData = new Date(anoPredefinido, mesPredefinido, diaPredefinido);
let str = combinacaoData.toLocaleString('pt-PT', {weekday: 'long'});
let firstChar = str.charAt(0).toUpperCase();
diaSemanaFinal.innerHTML = firstChar + str.slice(1);
const dataFinal = document.getElementById('dataFinal');
dataFinal.innerHTML = combinacaoData.toLocaleString('pt-PT', {day: 'numeric', month: 'long', year: 'numeric'});
const horasFinal = document.getElementById('horasFinal');
const btnHorasFim13 = document.getElementById('btn-horas-fim-13');
const btnHorasInicio12 = document.getElementById('btn-horas-inicio-12');
const btnData = document.getElementById('data');

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
        if (date2 < today.getUTCDate() && month <= today.getUTCMonth() && year <= today.getUTCFullYear()) {
          cell.classList.add("past");
        }
        let diaHoje = new Date();
        let dd = String(diaHoje.getDate()).padStart(2, '0');
        dd++;
        console.log(dd);
        if(date2 === dd) {
          console.log("diaHoje: " + dd);
          cell.classList.add("selected");
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
    if(btnHorasInicio12.classList.contains('selected')){
      btnHorasInicio12.classList.remove('selected');
    }

    this.classList.add('selected');
    try {
      horaInicioAntiga.classList.remove('selected');
    } catch (error) {
    }

    horaInicioAntiga = this;
    horaInicio = this.textContent;
    console.log("horaInicio: " + horaInicio);

    if(horaFim === 0){
      horasFinal.innerHTML = horaInicio + ":00 - ...";
    }else {
      horasFinal.innerHTML = horaInicio + ":00 - " + horaFim + ":00";
    }
  });
});

document.querySelectorAll('.btn-horas-fim').forEach(function(button) {
  button.addEventListener('click', function() {
    if(btnHorasFim13.classList.contains('selected')){
      btnHorasFim13.classList.remove('selected');
    }

    this.classList.add('selected');
    try {
      horaFimAntiga.classList.remove('selected');
    } catch (error) {
    }

    horaFimAntiga = this;
    horaFim = this.textContent;
    console.log("horaFim: " + horaFim);

    if(horaInicio === 0){
      horasFinal.innerHTML = "... - " + horaFim + ":00";
    }else {
      horasFinal.innerHTML = horaInicio + ":00 - " + horaFim + ":00";
    }
  });
});

btnData.addEventListener('click', function() {
  const tabPesquisa = document.getElementById('container-pesquisa');

  if(window.getComputedStyle(tabPesquisa).display === 'none'){
    tabPesquisa.setAttribute('style', 'display: flex;');
    btnData.style.backgroundColor = "#75fa96";
  }else {
    tabPesquisa.setAttribute('style', 'display: none;');
    btnData.style.backgroundColor = "#fff";
  }
});

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 50) {
    navbar.style.backgroundColor = 'rgba(62, 184, 93, 1)';
  } else {
    navbar.style.backgroundColor = 'transparent';
  }
});

const campos = [
  {
    id: 1,
    titulo:"Casas do Telhado",
    foto: "campos/campo1.jpeg",
    preco1: 4,
    preco2: 50,
    loacalizacao: "Castelões, Penafiel",
    avaliacoes: 5,
  },

  {
    id: 2,
    titulo:"Club Sport Marítimo",
    foto: "campos/campo2.jpeg",
    preco1: 3,
    preco2: 80,
    loacalizacao: "Funchal, Madeira",
    avaliacoes: 4.5,
  },

  {
    id: 3,
    titulo:"Clube Vila Rosa",
    foto: "campos/campo3.jpeg",
    preco1: 3,
    preco2: 40,
    loacalizacao: "Portimão, Algarve",
    avaliacoes: 4,
  },

  {
    id: 4,
    titulo:"GR Padel Maristas",
    foto: "campos/campo4.jpeg",
    preco1: 6,
    preco2: 50,
    loacalizacao: "Carcavelo, Cascais",
    avaliacoes: 4.5,
  },

  {
    id: 5,
    titulo:"Herdade da Cortesia",
    foto: "campos/campo5.jpeg",
    preco1: 5,
    preco2: 20,
    loacalizacao: "Avis, Portalegre",
    avaliacoes: 4.5,
  },

  {
    id: 6,
    titulo:"Jardim Panorâmico do Lido",
    foto: "campos/campo6.jpeg",
    preco1: 4,
    preco2: 30,
    loacalizacao: "Funchal, Madeira",
    avaliacoes: 3.5,
  },

  {
    id: 7,
    titulo:"Monte Xisto Hotel Rural",
    foto: "campos/campo7.jpeg",
    preco1: 6,
    preco2: 50,
    loacalizacao: "Santiago do Cacém, Alentejo",
    avaliacoes: 5,
  },

  {
    id: 8,
    titulo:"Oeste Padel",
    foto: "campos/campo8.jpeg",
    preco1: 5,
    preco2: 10,
    loacalizacao: "Torres Vedras",
    avaliacoes: 3,
  },

  {
    id: 9,
    titulo:"Ohai Nazaré ",
    foto: "campos/campo9.jpeg",
    preco1: 8,
    preco2: 10,
    loacalizacao: "Nazaré, Leiria",
    avaliacoes: 5,
  },
];

const sectionCampos = document.getElementById('section-campos');

campos.forEach(campo => {
  const childDiv = document.createElement("div");
  childDiv.classList.add("campo");
  childDiv.innerHTML = `
    <img src="${campo.foto}" alt="imagem do campo">
    <div class="container-preco-campo">
      <p>DESDE</p>
      <div class="container-preco">
        <span class="valor1">${campo.preco1}</span>
        <div class="conatiner-preco-2">
          <span class="valor2">€</span>
          <span class="valor2">,${campo.preco2}</span>
        </div>
      </div>
    </div>
    <p id="nomeCampo">${campo.titulo}</p>
    <p id="localizacaoCampo">${campo.loacalizacao}</p>
    <div class="container-estrelas">
      ${numeroEstrelas(campo.avaliacoes)}
    </div>
  `;
  sectionCampos.appendChild(childDiv);
});

function numeroEstrelas(numero){
  if(Number.isInteger(numero)) {
    return `${'<i class="fa-solid fa-star"></i>'.repeat(numero)}`;
  }else {
    return `${'<i class="fa-solid fa-star"></i>'.repeat(numero)}
    <i class="fa-solid fa-star-half"></i>`;
  }
}