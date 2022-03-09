import "bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.scss";

require("babel-core/register");
require("babel-polyfill");

const film = inputFilm();
const onloadMovies = getData("wars");

function inputFilm() {
  const input = document.querySelector(".form-control");
  input.addEventListener("change", () => {
    const cards = document.querySelectorAll(".card");
    getData(input.value);
  });
}

async function getData(movie) {
  removeElement();
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${movie}`;
  const res = await fetch(URL);
  const data = await res.json();

  createCard(data.results);
}

function removeElement() {
  const cards = document.querySelectorAll(".card-template");
  cards.forEach((el) => {
    el.remove();
  });
}

function createCard(data) {
  const containerCards = document.querySelector(".container-cards");

  if (data.length == 0) {
    const nothigIsFound = document.querySelector(".nothing-is-found");
    if (nothigIsFound) {
      nothigIsFound.remove();
    }
    const response = document.createElement("h5");
    response.classList.add("nothing-is-found");
    response.innerHTML = "Unfortunately nothing is found";
    containerCards.append(response);
  } else {
    const nothigIsFound = document.querySelector(".nothing-is-found");
    if (nothigIsFound) {
      nothigIsFound.remove();
    }

    data.forEach((movie, index) => {
      const card = document.createElement("div");
      card.classList.add("card-template");
      containerCards.append(card);
      card.innerHTML = `<div class="card" style="width: 18rem">
          <img
            src="https://image.tmdb.org/t/p/w1280${data[index].poster_path}"
            class="card-img-top"
            alt="Movie"
          />
          <div class="card-body">
            <h5 class="card-title">${data[index].original_title}</h5>
            <span class="card-text">
             ${data[index].vote_average}
            </span>
    
          </div>
    <div class="overview">
    <p>
      ${data[index].overview}
    </p>
    </div>
         </div>`;
    });
  }

  addColorVote();
}

function addColorVote() {
  const votes = document.querySelectorAll(".card-text");

  votes.forEach((el) => {
    if (el.textContent > 8) {
      el.style.color = "green";
    } else if (el.textContent < 8 && el.textContent > 6) {
      el.style.color = "blue";
    } else {
      el.style.color = "red";
    }
  });
}
