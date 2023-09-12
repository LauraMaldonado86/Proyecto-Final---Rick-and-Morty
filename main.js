
const containerPag = document.getElementById("containerPag")
const container = document.getElementById("container");

//console.log(container)

const btnTodos = document.querySelector(".btn-todos");
const btnFemale = document.querySelector(".btn-female");
const btnMale = document.querySelector(".btn-male");
const btnGenderless = document.querySelector(".btn-genderless");
const btnUnknown = document.querySelector(".btn-unknown");

const btnPrimera = document.querySelector(".btn-primera");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const btnUltima = document.querySelector(".btn-ultima");


let i = 1;
let totalPaginas = 0;
let genero = "";

const getCharacters = (i) => {
  fetch(`https://rickandmortyapi.com/api/character/?page=${i}&gender=${genero}`)
    .then(res => res.json())
    .then(data => {
      renderCharacters(data)
      totalPaginas = data.info.pages;
    })
}


getCharacters();


const renderCharacters = (data) => {
  //console.log(data)
  containerPag.innerHTML =
`<p>Página ${i} de ${data.info.pages}</p>
`;
  container.innerHTML = "";
  data.results.forEach(character => {
    //console.log(character.length)
    container.innerHTML +=
      `<div class="card">
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="">
      <button class="btn" onClick=verDescripcion("${character.url}")>Ver más</button>
      </div>
      `
  });
};


const verDescripcion = (characterUrl) => {
  container.innerHTML = ""
  fetch(characterUrl)
    .then(res => res.json())
    .then(characterUrl => {
      const episodios = characterUrl.episode.length;
      container.innerHTML =
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


btnTodos.addEventListener("click", () => {
  genero = "";
  i = 1;
  getCharacters();
});

btnFemale.addEventListener("click", () => {
  genero = "female";
  i = 1;
  getCharacters();
});

btnMale.addEventListener("click", () => {
  genero = "male";
  i = 1;
  getCharacters();
});

btnGenderless.addEventListener("click", () => {
  genero = "genderless";
  i = 1;
  getCharacters();
});

btnUnknown.addEventListener("click", () => {
  genero = "unknown";
  i = 1;
  getCharacters();
});


btnPrimera.addEventListener("click", () => {
  i=1;
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
  i=totalPaginas;
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




