const URL = "http://localhost:3000/movies";

function deleteMovie(id) {
  fetch(`${URL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        fetchMovies();
      } else {
        throw new Error("Error deleting movie");
      }
    })
    .catch((err) => {
      console.log("Error Deleting", err);
    });
}

function fetchMovies() {
  fetch(URL)
    .then((response) => response.json())
    .then((movies) => {
      const movieLists = document.getElementById("movieLists");
      movieLists.innerHTML = ""; // Clear existing movie list

      movies.forEach((movie) => {
        let movieElem = createMovieElement(movie);
        movieLists.appendChild(movieElem);
      });
    });
}

function createMovieElement(movie) {
  let movieElem = document.createElement("div");
  movieElem.setAttribute("class", "movie");

  let headingElem = document.createElement("h1");
  headingElem.innerText = movie.title;
  movieElem.appendChild(headingElem);

  let spanElem = document.createElement("span");
  spanElem.innerText = "Directed By: " + movie.director;
  movieElem.appendChild(spanElem);

  let deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "deleteBtn");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", () => {
    deleteMovie(movie.id);
  });
  movieElem.appendChild(deleteBtn);

  let updateBtn = document.createElement("button");
  updateBtn.setAttribute("class", "updateBtn");
  updateBtn.innerText = "Update";
  updateBtn.addEventListener("click", () => {
    updateMovie(movie.id);
  });
  movieElem.appendChild(updateBtn);

  return movieElem;
}

function addMovie(title, genre, director, release) {
  const data = {
    title: title,
    genre: genre,
    director: director,
    releaseYear: release,
  };

  fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      fetchMovies();
    });
}

document.getElementById("movieForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const genre = e.target.genre.value;
  const releaseYear = e.target.release.value;
  const director = e.target.director.value;

  addMovie(title, genre, director, releaseYear);

  // Reset the form after adding the movie
  e.target.reset();
});

fetchMovies();
