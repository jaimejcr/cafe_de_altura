//COMENZAMOS A DARLE INTERACTIVIDAD A LA PAGINA
const cafe_API = "https://cafe-de-altura.vercel.app/api/products";
const divMuestrasCafe = Array.from(document.querySelectorAll(".bags div"));
//DIVMUESTRAS.. ES EL DIV DE NOVEDADES, DONDE SE MUESTRAN 4 BOLSAS DE CAFE
//LO CONVIERTO EN ARRAY PARA PODER ITERAR SOBRE CADA DIV CON UN FOREACH
async function destructureApi() {
  const response = await fetch(cafe_API);
  const data = await response.json();

  function showCoffeBags() {
    const bagsArray = data.products;
    console.log(bagsArray);
    //LAS SIGUIENTES VARIABLES CORRESPONDEN AL RESULTADO DEL FETCH Y CADA UNA DE ELLAS ESTA LA INFORMACION DE SU RESPECTIVO CAFE
    const costaRicaTarrazú = data.products[0];
    const ColombiaLosNaranjos = data.products[1];
    const laosAmanecer = data.products[2];
    const etiopíaYrgacheff = data.products[3];
    // const keniaNdunduri = data.products[4];
    // const etiopíaSidamo = data.products[5];
    // const costaRicaMonteBello = data.products[6];
    // A CADA DIV LE VAMOS A INTRODUCIR SU RESPECTIVO CAFE, PERO COMO EN NOVEDADES SOLO SE MUESTRAN 4, LOS DEMAS QUEDAN GUARDADOS POR SI LOS NECESITAMOS
    divMuestrasCafe.forEach((element, i) => {
      console.log(element);
      if (i === 0) {
        element.innerHTML += `
                    <img src="${costaRicaTarrazú.img_url}" alt="coffe bag">
                    <p>${costaRicaTarrazú.brand}</p>
                    <p>${costaRicaTarrazú.price}€</p>
                    <button class="bagbutton">Añadir</button>
                    `;
      }
      if (i === 1) {
        element.innerHTML += `
                    <img src="${ColombiaLosNaranjos.img_url}" alt="coffe bag">
                    <p>${ColombiaLosNaranjos.brand}</p>
                    <p>${ColombiaLosNaranjos.price}€</p>
                    <button class="bagbutton">Añadir</button>
                    `;
      }
      if (i === 2) {
        element.innerHTML += `
                    <img src="${laosAmanecer.img_url}" alt="coffe bag">
                    <p>${laosAmanecer.brand}</p>
                    <p>${laosAmanecer.price}€</p>
                    <button class="bagbutton">Añadir</button>
                    `;
      }
      if (i === 3) {
        element.innerHTML += `
                    <img src="${etiopíaYrgacheff.img_url}" alt="coffe bag">
                    <p>${etiopíaYrgacheff.brand}</p>
                    <p>${etiopíaYrgacheff.price}€</p>
                    <button class="bagbutton">Añadir</button>
                    `;
      }
    });
  }
  showCoffeBags();
  //CREAREMOS UN LISTENER PARA CADA BOTON DE CADA BOLSA EN LA SECCION DE NOVEDADES

  const bagButton = document.querySelectorAll(".bagbutton");
  //LA SIGUIENTE VARIABLE (BAGSJSON)SERÁ SUBIDA A LOCALSTORAGE Y EN ELLA HAREMOS UN PUSH CON LA INFO DE LA BOLSA SELECCIONADA AL CLICKAR SU BOTON
  const bags = [];

  bagButton.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      const divParent = e.target.parentElement;
      const targetBag = {
        img: divParent.children[0].src,
        name: divParent.children[1].textContent,
        price: parseInt(divParent.children[2].innerText),
      };
      bags.push(targetBag);
      const bagsJSON = JSON.stringify(bags);
      localStorage.setItem("coffeBags", bagsJSON);
    });
    //EN  ESTA PARTE SE CREA UN OBJETO CON LA INFORMACION DEL ELEMENTO PADRE DEL BOTON CORRESPONDIENTE Y SE PUSHEA A UNA VARIABLE ESTA VARIABLE, LA SUBIMOS AL LOCALSTORAGE
  });
}
destructureApi();

//LO SIGUIENTE QUE HARÉ SERA CREAR INTERACTIVIDAD EN LOS BOTONES DE LOS CUADROS DE LAS PREGUNTAS FRECUENTES
const questionsButtons = document.querySelectorAll(
  ".expande_preguntas_frecuentes"
);
const questionDiv1 = document.querySelector(".pf > div:nth-child(1)");
const questionDiv2 = document.querySelector(".pf > div:nth-child(2)");
const questionDiv3 = document.querySelector(".pf > div:nth-child(3)");

function question1Zone() {
  //EN ESTA FUNCIÓN NOS OCUPAREMOS DE CONFIGURAR EL LISTENER DEL BOTON DE EXPANSION DEL PRIMER DIV DE PREGUNTAS FRECUENTES
  questionsButtons.forEach((button, i) => {
    if (i === 0) {
      // LA (i) REPRESENTA CADA BOTÓN, SACADO DE LA NODELIST DE "questionsButtons" EN "0" ES EL PRIMERO

      button.addEventListener("click", (e) => {
        e.preventDefault();

        const paragraph = questionDiv1.lastChild.previousElementSibling;
        const dropdownArrow1 = document.getElementById("dropdown1");
        // GUARDAMOS EL PARRAFO EN UNA VARIABLE PARA PODER OCULTARLO O MOSTRARLO
        if (paragraph.style.display === "none") {
          paragraph.style.display = "flex";
          dropdownArrow1.src = "assets/Icon.png";
        } else {
          paragraph.style.display = "none";
          dropdownArrow1.src = "assets/icondown.png";
        }
      });
    }
  });
}
question1Zone();

function question2Zone() {
  questionsButtons.forEach((button2, i) => {
    if (i === 1) {
      button2.addEventListener("click", (e) => {
        e.preventDefault();

        const paragraph2 = questionDiv2.lastChild.previousElementSibling;
        const dropdownArrow2 = document.getElementById("dropdown2");

        if (paragraph2.style.display === "none") {
          paragraph2.style.display = "flex";
          dropdownArrow2.src = "assets/Icon.png";
        } else {
          paragraph2.style.display = "none";
          dropdownArrow2.src = "assets/icondown.png";
        }
      });
    }
  });
}
question2Zone();

// EN LA SIGUIENTE SECCION, VAMOS A INTERACTUAR CON EL FORMULARIO DE MODO QUE CUANDO SE "SUBMIT", LOS DAOS INGRESADOS SE SUBAN AL LS COMO OBJETO, (SOLO SI LOS CAMPOS ESTAN COMPLETOS Y CORRECTOS, EN CASO DE QUE NO AÑADIR UN MENSAJE DEBAJO DEL INPUT).

function formData() {
  const formulary = document.querySelector(".tellamamos");
  const inputNameValue = document.getElementById("name");
  const inputEmailValue = document.getElementById("email");
  const inputPhoneValue = document.getElementById("phone");
  const inputTextValue = document.getElementById("text");

  const dataContactLs = [];

  formulary.addEventListener("submit", (element) => {
    element.preventDefault();

    const clientForm = {
      name: inputNameValue.value,
      email: inputEmailValue.value,
      phone: inputPhoneValue.value,
      message: inputTextValue.value,
    };

    dataContactLs.push(clientForm);
    localStorage.setItem("clientFormulary", JSON.stringify(dataContactLs));
    console.log(inputNameValue.value);
  });
}
formData();

// EN LA SIGUIENTE FUNCION VAMOS A MODIFICAR LA SECCION DEL INPUT "ayuda", PARA QUE CUANDO ESCRIBAMOS LA PRIMERA LETRA DESAPAREZCA EL CONTENIDO INFORMATIVO EN SU INTERIOR
function check (){
  const cuadroAyuda = document.querySelector(".ayuda > label")
  
  cuadroAyuda.addEventListener("keydown", (e)=>{
    e.preventDefault();
    console.log(cuadroAyuda);
  })
}
check ();

