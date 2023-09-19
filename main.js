
const containerPersonajes = document.getElementById("containerPersonajes");
const containerCards = document.getElementById("containerCards");
const containerPag = document.getElementById("containerPag");

const btnTodosG = document.querySelector(".btn-todosG");
const btnFemale = document.querySelector(".btn-female");
const btnMale = document.querySelector(".btn-male");
const btnGenderless = document.querySelector(".btn-genderless");
const btnUnknownG = document.querySelector(".btn-unknownG");
const btnTodosS = document.querySelector(".btn-todosS");
const btnAlive = document.querySelector(".btn-alive");
const btnDead = document.querySelector(".btn-dead");
const btnUnknownS = document.querySelector(".btn-unknownS");

const btnPrimera = document.querySelector(".btn-primera");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const btnUltima = document.querySelector(".btn-ultima");


let i = 1;
let totalPaginas = 0;
let genero = "";
let estado = "";

const getCharacters = (i) => {
  fetch(`https://rickandmortyapi.com/api/character/?page=${i}&gender=${genero}&status=${estado}`)
    .then(res => res.json())
    .then(data => {
      renderCharacters(data)
      totalPaginas = data.info.pages;
    })
}

getCharacters();

const renderCharacters = (data) => {

  containerPersonajes.innerHTML =
    `<p>Personajes: ${data.info.count}</p>
  `;

  containerCards.innerHTML = "";
  data.results.forEach(character => {
    containerCards.innerHTML +=
      `<div class="card">
      <h2>${character.name} #${character.id}</h2>
      <img src="${character.image}" alt="">
      <button class="btn" onClick=verDescripcion("${character.url}")>Ver más</button>
      </div>
      `
  });

  containerPag.innerHTML =
    `<p>Página ${i} de ${data.info.pages}</p>
  `;
};


const verDescripcion = (characterUrl) => {
  containerCards.innerHTML = ""
  fetch(characterUrl)
    .then(res => res.json())
    .then(characterUrl => {
      const episodios = characterUrl.episode.length;
      containerCards.innerHTML =
        `<div class="card-2">
        <h2>${characterUrl.name}</h2>
        <img src="${characterUrl.image}" alt="">
        <p>ID: ${characterUrl.id}</p>
        <p>GENERO: ${characterUrl.gender}</p>
        <p>ESPECIE: ${characterUrl.species}</p>
        <p>ESTADO: ${characterUrl.status}</p>
        <p>ORIGEN: ${characterUrl.origin.name}</p>
        <p>LOCACION: ${characterUrl.location.name}</p>
        <p>EPISODIOS EN QUE APARECE: ${episodios}</p>
        <button class="btn" onClick=getCharacters(i)>Volver</button>
        </div>
        `
    })
};


btnTodosG.addEventListener("click", () => {
  genero = "";
  estado = "";
  i = 1;
  getCharacters();
});

btnFemale.addEventListener("click", () => {
  genero = "female";
  estado = "";
  i = 1;
  getCharacters();
});

btnMale.addEventListener("click", () => {
  genero = "male";
  estado = "";
  i = 1;
  getCharacters();
});

btnGenderless.addEventListener("click", () => {
  genero = "genderless";
  estado = "";
  i = 1;
  getCharacters();
});

btnUnknownG.addEventListener("click", () => {
  genero = "unknown";
  estado = "";
  i = 1;
  getCharacters();
});

btnTodosS.addEventListener("click", () => {
  estado = "";
  genero = "";
  i = 1;
  getCharacters();
});

btnAlive.addEventListener("click", () => {
  estado = "alive";
  genero = "";

  i = 1;
  getCharacters();
});

btnDead.addEventListener("click", () => {
  estado = "dead";
  genero = "";

  i = 1;
  getCharacters();
});

btnUnknownS.addEventListener("click", () => {
  estado = "unknown";
  genero = "";

  i = 1;
  getCharacters();
});


btnPrimera.addEventListener("click", () => {
  i = 1;
  getCharacters(i);
  if (i >= 1) {
    btnNext.removeAttribute("disabled", true);
  }
  if (i <= 1) {
    btnPrimera.setAttribute("disabled", true);
    btnPrev.setAttribute("disabled", true);
    btnUltima.removeAttribute("disabled", true);
  }
});

btnPrev.addEventListener("click", () => {
  i -= 1;
  if (i <= 1) {
    btnPrev.setAttribute("disabled", true);
    btnPrimera.setAttribute("disabled", true);
  } else {
    btnNext.removeAttribute("disabled", true);
  }
  if (i < totalPaginas) {
    btnUltima.removeAttribute("disabled", true);
  }
  getCharacters(i);
});

btnNext.addEventListener("click", () => {
  i += 1;
  getCharacters(i);
  if (i >= totalPaginas) {
    btnNext.setAttribute("disabled", true);
    btnUltima.setAttribute("disabled", true);
  }
  if (i > 1) {
    btnPrev.removeAttribute("disabled", true);
    btnPrimera.removeAttribute("disabled", true);
  }
});

btnUltima.addEventListener("click", () => {
  i = totalPaginas;
  getCharacters(i);
  if (i >= 1) {
    btnPrev.removeAttribute("disabled", true);
    btnPrimera.removeAttribute("disabled", true);
  }
  if (i >= totalPaginas) {
    btnNext.setAttribute("disabled", true);
    btnUltima.setAttribute("disabled", true);
  }
});




