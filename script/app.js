/* VARIABLES */
let eleccion;
let mujer = "MujerName";
let hombre = "HombreName";
let otros = "OtrosName";
let tipocitas;
let sexo;
let citas;
let nombresAleatorios;
let resultadoFinal;
let eleccionapi;
let imgGenero;
let userLocalStorage;


const imagenHombre = './assets/gif/hombres/mensImage.webp'
const imagenMujer = './assets/gif/Mujeres/womenImage.webp'
const noBinarie = './assets/gif/otros/no-binarie.jpg'


let countCitas = {
  total: 0,
  wins: 0,
  loses: 0,
}


//Arrays
const otrosNames = [
  "Camila Paez",
  "David Salazar",
  "Fabian cortes",
  "Nikol Ardila",
];

const mujeresNames = ["Adriana Guzman", "Camila Castañeda", "Natalia muñoz", "Khaterin gonzales"];
const hombresNames = [
  "Camilo Ortega",
  "Jhoan Lopez",
  "David Estupiñan",
  "Willson Ordoñez",
];


const inputNombre = document.querySelector("#inputNombre");
const btnGuardar = document.querySelector("#btnGuardar");
const mainContent = document.querySelector("#mainContent");


const divElegir = document.createElement("DIV");
divElegir.classList.add("box_container", "box_shadow_container");
divElegir.setAttribute("id", "divElegir");

const labelElegir = document.createElement("LABEL");
labelElegir.setAttribute("for", "inputElegir");
labelElegir.classList.add("question");
labelElegir.textContent = "Selecciona el genero de preferencia ";
divElegir.appendChild(labelElegir);

const selectElegir = document.createElement("SELECT");
selectElegir.setAttribute("id", "inputElegir");
selectElegir.classList.add("form-control" , "input_select");
divElegir.appendChild(selectElegir);

const optionElegir1 = document.createElement("OPTION");
optionElegir1.setAttribute("value", "1");
optionElegir1.textContent = "Mujer";
selectElegir.appendChild(optionElegir1);

const optionElegir2 = document.createElement("OPTION");
optionElegir2.setAttribute("value", "2");
optionElegir2.textContent = "Hombre";
selectElegir.appendChild(optionElegir2);

const optionElegir3 = document.createElement("OPTION");
optionElegir3.setAttribute("value", "3");
optionElegir3.textContent = "Otros";
selectElegir.appendChild(optionElegir3);

const buttonElegir = document.createElement("BUTTON");
buttonElegir.setAttribute("id", "buttonElegir");
buttonElegir.classList.add("btn", "btn-warning", "mb-2", "mt-2");
buttonElegir.textContent = "Elegir";
divElegir.appendChild(buttonElegir);

const divResultado = document.createElement("DIV");
divResultado.setAttribute("id", `divResultado`);
divResultado.classList.add("box_container", "box_shadow_container");
divResultado.style = "padding: 30px;";

/* EVENTOS */
/* EVENTO SELECCION DE TIPO */
document.addEventListener("DOMContentLoaded", domCargado);
btnGuardar.addEventListener("click", () => {
  preguntarNombre(inputNombre.value)
});
buttonElegir.addEventListener("click", elegirTipo);

/* FUNCIONES */

function domCargado(){

  const resumenCitas = JSON.parse(localStorage.getItem("resumenCitas"));
  if (resumenCitas) {
    Swal.fire({
      title: "Oohh... Ya has ingresado anteriomente",
      text: "¿Deseas continar la cita anteriror o quieres iniciar una nueva cita?",
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: `Reiniciar`,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        countCitas = resumenCitas;
        userLocalStorage = localStorage.getItem("username");
        preguntarNombre(userLocalStorage);
        return;
      }
      localStorage.removeItem("resumenCitas");
      localStorage.removeItem("username");
      
      return;
    })
  }
}

function preguntarNombre(input){
  if (validarVacio(input)){
    sweetAlertDinamic("error", "Campo vacio", "Tu nombre no puede estar vacio")
    return;
  }

  if (!userLocalStorage){
    sweetAlert(`¿Estas seguro de guardar el nombre ${inputNombre.value}?`, guardarNombre);  
    return;
  } 
  inputNombre.value = userLocalStorage;
  guardarNombre()
}

function guardarNombre() {
  const h2Saludo = document.createElement("H2");
  h2Saludo.textContent = `Hola `;
  h2Saludo.classList.add("text-center", "mt-2", "text-uppercase");
  const spanSaludo = document.createElement("SPAN");
  spanSaludo.textContent = inputNombre.value;
  spanSaludo.classList.add("fw-bold");
  h2Saludo.appendChild(spanSaludo);


  mainContent.appendChild(h2Saludo);


  btnGuardar.style.display = "none";
  inputNombre.setAttribute("disabled", "true");

  mainContent.appendChild(divElegir);
}

async function elegirTipo() {

    eleccion = parseInt(selectElegir.value);
    if (eleccion === 1) {
      sexo = mujer;
      tipocitas = "";
      imgGenero = imagenMujer;
    } else if (eleccion === 2) {
      sexo = hombre;
      tipocitas = "";
      imgGenero = imagenHombre;
    } else if (eleccion === 3) {
      sexo = otros;
      tipocitas = "";
      imgGenero = noBinarie;
  }

  const divmensaje1 = document.createElement("DIV");
  divmensaje1.setAttribute("id", "divmensaje1");
  divmensaje1.classList.add("box_container" , "box_shadow_container");
  mainContent.appendChild(divmensaje1);

  const tipomsg1 = document.createElement("P");
  tipomsg1.classList.add("text-center", "mt-2", "text-uppercase");
  if (eleccion === 1) {
    tipomsg1.innerHTML = `Seleccionaste <span class='fw-bold'>Mujeres</span>`
  } else if (eleccion === 2) {
    tipomsg1.innerHTML = `Seleccionaste  <span class='fw-bold'>Hombres</span>`;
  } else if (eleccion === 3) {
    tipomsg1.innerHTML = `Seleccionaste <span class='fw-bold'>Otros<span>`;
  }


  divmensaje1.appendChild(tipomsg1);

  const divImg = document.createElement("DIV");
  divImg.setAttribute("id", "divImg");
  divmensaje1.appendChild(divImg);

  const imgsexo = document.createElement("IMG");
  imgsexo.setAttribute("id", "imgsexo");
  imgsexo.setAttribute("src", imgGenero);
  imgsexo.setAttribute("width", "150px");
  divImg.appendChild(imgsexo);


  divElegir.style.display = "none";

  const divbutton1 = document.createElement("DIV");
  divbutton1.setAttribute("id", "divbutton1");
  divmensaje1.appendChild(divbutton1);

  const button1 = document.createElement("BUTTON");
  button1.setAttribute("id", "button1");
  button1.textContent = "continuar";
  button1.classList.add("btn", "btn-warning", "mb-2", "mt-2");
  divbutton1.appendChild(button1);

  button1.addEventListener("click", tipomsg2);

  
}

function tipomsg2() {
  const divmensaje2 = document.createElement("DIV");
  divmensaje2.setAttribute("id", "divmensaje2");
  mainContent.appendChild(divmensaje2);

  const tipomsg2 = document.createElement("label");
  tipomsg2.setAttribute("class", "tipomsg2");
  tipomsg2.innerHTML = `Estas son las personas que podrian gustarte ${asignarPowers()}`;
  divmensaje1.appendChild(tipomsg2);

  button1.style.display = "none";

  const divNombreSexo = document.createElement("DIV");
  divNombreSexo.setAttribute("id", "divNombreSexo");
  divNombreSexo.classList.add("box_container" , "box_shadow_container");
  mainContent.appendChild(divNombreSexo);

  const labelNombreSexo = document.createElement("LABEL");
  labelNombreSexo.setAttribute("for", "inputNombreSexo");
  labelNombreSexo.textContent = "Ha cual de estas personas te gustaria conocer? ";
  divNombreSexo.appendChild(labelNombreSexo);

  const inputNombreSexo = document.createElement("INPUT");
  inputNombreSexo.setAttribute("type", "text");
  inputNombreSexo.setAttribute("id", "inputNombreSexo");
  inputNombreSexo.setAttribute("placeholder", "Nombre");
  inputNombreSexo.classList.add("input" , "form-control");
  divNombreSexo.appendChild(inputNombreSexo);

  const buttonNombreSexo = document.createElement("BUTTON");
  buttonNombreSexo.setAttribute("id", "buttonNombreSexo");
  buttonNombreSexo.classList.add("btn", "btn-warning", "mb-2", "mt-2");
  buttonNombreSexo.textContent = "Aceptar";
  divNombreSexo.appendChild(buttonNombreSexo);

  buttonNombreSexo.addEventListener("click",  () => { guardarNombreSexo(inputNombreSexo.value) }
    );
}

/* divNombreSexo.style.display = "none" */
//powers

function asignarPowers() {
  if (eleccion === 1) {
    nombresAleatorios = randomElements(mujeresNames, 3);
  } else if (eleccion === 2) {
    nombresAleatorios = randomElements(hombresNames, 3);
  } else if (eleccion === 3) {
    nombresAleatorios = randomElements(otrosNames, 3);
  }

  let text = "<br>";


  nombresAleatorios.forEach((power) => {
    text += power + "<br>";
  });

  return text;
}

function guardarNombreSexo(input) {

    if (validarVacio(input)){
      sweetAlertDinamic("error", "Campo vacio", "El nombre no puede estar vacio")
      return;
    }
  	sweetAlert(`Quieres confirmar que ${inputNombreSexo.value} es la persona que quieres conocer?`, pedirCitas);
  }


function pedirCitas() {
  const divbattle = document.createElement("DIV");
  divbattle.setAttribute("id", "divbattle");
  divbattle.classList.add("box_container" , "box_shadow_container");
  mainContent.appendChild(divbattle);

  const labelCitas = document.createElement("LABEL");
  labelCitas.setAttribute("for", "inputCitas");
  labelCitas.classList.add("question");
  labelCitas.innerHTML = `¿Cuantas citas quieres tener con <span class="fw-bold">${inputNombreSexo.value}</span> ?`;
  divbattle.appendChild(labelCitas);

  divNombreSexo.style.display = "none";

  const inputCitas = document.createElement("INPUT");
  inputCitas.setAttribute("type", "number");
  inputCitas.setAttribute("min", "1");
  inputCitas.setAttribute("max", "10");
  inputCitas.setAttribute("placeholder", "Citas");
  inputCitas.classList.add("input" , "form-control");
  inputCitas.setAttribute("id", "inputCitas");
  divbattle.appendChild(inputCitas);

  const buttonCitas = document.createElement("BUTTON");
  buttonCitas.setAttribute("id", "buttonCitas");
  buttonCitas.classList.add("btn", "btn-warning", "mb-2", "mt-2");
  buttonCitas.textContent = "Buscando";
  divbattle.appendChild(buttonCitas);

  buttonCitas.addEventListener("click",() => { 
    aleatorio(inputCitas.value) });
}



async function aleatorio(input) {
  if (validarVacio(input)){
    sweetAlertDinamic("error", "Campo vacio", "El numero de citas no puede estar vacio")
    return;
  }
  citas = inputCitas.value;
  let citasTotalActual = countCitas.total;
  countCitas.total = parseInt(citas) + citasTotalActual;

  let result;

  mainContent.appendChild(divResultado);
  limpiarHtml(divResultado);

  for (let index = 0; index < citas; index++) {
    setTimeout(() => {
      result = resultBatalla();
      switch (result) {
        case 1:
          imprimirPantalla(index, "Ganado" , result);
          countCitas.wins++;
          break;
        case 2:
          imprimirPantalla(index, "Perdido" , result);
          countCitas.loses++;
          break;
      }
      console.log(countCitas);
    } , 6000 * index);
  }
  guardarLocalStorage( "resumenCitas" , countCitas);
  guardarLocalStorage( "username" , inputNombre.value);

}



function resultBatalla() {
  const result = Math.floor(Math.random() * 2) + 1;
  return result;
}

function imprimirPantalla(index, resultado, result) {
  const divImgResultado = document.createElement("DIV");
  renderizarGif(eleccion, resultado, divImgResultado, index)
  divResultado.appendChild(divImgResultado);
}

//!Funcion para extraer un aleatorio de un array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function randomElements(array, quantity) {
  return shuffleArray([...array]).slice(0, quantity);
}

//!limpiar html
function limpiarHtml(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}



//! Funcion para mostrar alertas
function sweetAlert(titulo, funcion) {
  Swal.fire({
    title: titulo,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    denyButtonText: `No guardar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      funcion();
      return;
    } 
    return;
  })
}



function sweetAlertDinamic(icon, title, text) {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
  })
}



//! Funcion para guardar en el localstorage
function guardarLocalStorage(name, data) {
  if (typeof data === "string") {
    localStorage.setItem(name, data);
    return;
  }
  localStorage.setItem(name, JSON.stringify(data));
}

//!funcion para validar vacios
function validarVacio(input) {
  if (input === "") {
    return true;
  } else {
    return false;
  }
}

//! Funcion que renderiza el gif por batalla
function renderizarGif(eleccion ,resultado, divPadre, index) {

  const divGif = document.createElement("DIV");
  divGif.setAttribute("id", `divGif${index}`);
  const pBattle = document.createElement("P");
  pBattle.setAttribute("id", `pBattle${index}`);
  const pBatallando = document.createElement("P");
  pBatallando.setAttribute("id", `pBatallando${index}`);
  pBatallando.textContent = "En proceso...";
  pBatallando.style = "color: black; font-size: 20px;  text-align: center; font-family: Pokemon";
  divPadre.appendChild(pBatallando);

  if ( eleccion === 1 ){
    TimingGif(resultado, index);
  } else if ( eleccion === 2 ){
    TimingGif(resultado, index);
  } else if ( eleccion === 3 ){
    TimingGif(resultado, index);
  }

  function TimingGif(res, ind) {
    setTimeout(() => {
      if (res === "Ganado") {
        pBattle.classList.add("win");
        pBatallando.remove();
        pBattle.innerHTML = `Tu cita con esta persona fue satisfactoria ${ind + 1}`;
      } else {
        pBattle.classList.add("lose");
        pBatallando.remove();
        pBattle.innerHTML = `Tu cita con esta persona no fue satisfactoria ${ind + 1}`;
      }
    } , 4000);
  }


  divPadre.appendChild(pBattle);
}