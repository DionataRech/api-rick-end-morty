const urlParams = new URLSearchParams(window.location.search);
let page = parseInt(urlParams.get("page")) || 1;
const divCards = document.getElementById("divCards");
const paginaAtual = document.getElementById("paginaAtual");
const proximaPagina = document.getElementById("proximaPagina");
const paginaAnterior = document.getElementById("paginaAnterior");

async function getCharacters() {
  try {
    const data = {
      page,
    };

    const response = await api.get("/character/", { params: data });
    const limite = response.data.info.pages;
    const character = response.data.results;
    character.forEach((character) => {
      const divCaracter = document.createElement("div");
      divCaracter.classList.add("cardStyle");
      divCaracter.innerHTML = `<div id="insideCard"><img src ="${character.image}"><div id="textCard"><h1> ${character.name}</h1><p>Status - ${character.status}</p><p>${character.species}</p></div></div>`;
      divCards.appendChild(divCaracter);
    });

    paginaAnterior.disabled = page === 1;
    proximaPagina.disabled = limite === page;
    paginaAtual.textContent = `Pagina atual ${page}`;
  } catch (error) {
    alert(error.message);
  }
}

getCharacters();

const proximaBtn = () => {
  page++;
  divCards.innerHTML = ``;
  getCharacters();
};

const btnAnterior = () => {
  if (page > 1) {
    page--;
    divCards.innerHTML = ``;
    getCharacters();
  }
};
