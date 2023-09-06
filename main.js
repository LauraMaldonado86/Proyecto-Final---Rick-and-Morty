
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
`<p>Pagina ${i} de ${data.info.pages}</p>
 <p>Ir a la pagina...</p>
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
        `<div class="card">
        <h2>${characterUrl.name}</h2>
        <img src="${characterUrl.image}" alt="">
        <p>Id: ${characterUrl.id}</p>
        <p>Género: ${characterUrl.gender}</p>
        <p>Especie: ${characterUrl.species}</p>
        <p>Estado: ${characterUrl.status}</p>
        <p>Origen: ${characterUrl.origin.name}</p>
        <p>Locación: ${characterUrl.location.name}</p>
        <p>Cant de episodios en que fue visto:${episodios}</p>
        <button class="btn" onClick=getCharacters(i)>Volver</button>
        </div>
        `
    })
};


btnTodos.addEventListener("click", () => {
  genero = "";
  getCharacters();
});

btnFemale.addEventListener("click", () => {
  genero = "female";
  getCharacters();
});

btnMale.addEventListener("click", () => {
  genero = "male";
  getCharacters();
});

btnGenderless.addEventListener("click", () => {
  genero = "genderless";
  getCharacters();
});

btnUnknown.addEventListener("click", () => {
  genero = "unknown";
  getCharacters();
});


btnPrimera.addEventListener("click", () => {
  i=1;
  getCharacters(i);
  if (i >= 1) {
    btnNext.removeAttribute("disabled", true);
  }
});

btnPrev.addEventListener("click", () => {
  i -= 1;
  if (i <= 1) {
    btnPrev.setAttribute("disabled", true);
  } else {
    btnNext.removeAttribute("disabled", true);
  }
  getCharacters(i);
});

btnNext.addEventListener("click", () => {
  i += 1;
  getCharacters(i);
  if (i >= 1) {
    btnPrev.removeAttribute("disabled", true);
  }
  if (i >= totalPaginas) {
    btnNext.setAttribute("disabled", true);
  }
});

btnUltima.addEventListener("click", () => {
  i=totalPaginas;
  getCharacters(i);
  if (i >= 1) {
    btnPrev.removeAttribute("disabled", true);
  }
});
