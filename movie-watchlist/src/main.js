// define main constants and variables
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const startImage = document.getElementById("start-image");
const moviesContainer = document.getElementById("movies-container");

// display movies at dom load
document.addEventListener("DOMContentLoaded", () => {
    // fetch saved movies from local storage
    const savedMovies = JSON.parse(localStorage.getItem("movies")) || [];

    if (savedMovies.length > 0) {
        startImage.style.display = "none";
        displayMovies(savedMovies);
    } else {
        startImage.style.display = "block";
    }
});

// add event listener for the search form
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value;

    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }

    // Clear previous results
    moviesContainer.innerHTML = "";
    startImage.style.display = "none";

    // Fetch movies based on the search term
    fetchMovies(searchTerm);
});

async function fetchMovies(searchTerm) {
    // access the API key from the .env file
    const apiKey = import.meta.env.VITE_OMDB_API_KEY; // Ensure you have set this in your environment
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
        searchTerm
    )}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // clear moviesContainer
    moviesContainer.innerHTML = "";

    if (data.Response === "True") {
        await displayMovies(data.Search);

        // Save movies to localStorage
        localStorage.setItem("movies", JSON.stringify(data.Search));
    } else {
        // display "not found" message
        const notFoundText = document.createElement("p");
        notFoundText.classList.add("not-found-text");
        notFoundText.textContent =
            "Unable to find what you’re looking for. Please try another search.";
        moviesContainer.appendChild(notFoundText);
    }
}

async function fetchMovieDetails(movieTitle) {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY; // Ensure you have set this in your environment
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
        movieTitle
    )}&plot=full`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.Response !== "True") {
        console.error("Error fetching movie details:", data.Error);
        return null;
    }

    return data;
}

async function displayMovies(movies) {
    for (const movie of movies) {
        // get movie details from the API
        const movieDetails = await fetchMovieDetails(movie.Title);

        const movieElement = document.createElement("div");
        movieElement.classList.add("movie-card");
        movieElement.innerHTML = `
            <img class="poster" src="${movie.Poster}" alt="${movie.Title}">

            <div class="info">
                <div class='header'>
                    <h2>${movieDetails.Title}</h2>
                    <span class="rate">⭐ ${movieDetails.imdbRating}</span>
                </div>

                <div class="details">
                    <p>${movieDetails.Runtime}</p>
                    <p>${movieDetails.Genre}</p>
                    <div id="add-to-watchlist">
                        <img src="../public/plus-icon.svg" alt="Add to Watchlist Icon" />
                        <span>Watchlist</span>
                    </div>
                </div>

                <div class="plot">
                    <p>${movieDetails.Plot}</p>
                </div>
            </div>
        `;
        // Add event listener for the "Add to Watchlist" button
        const addToWatchlistButton =
            movieElement.querySelector("#add-to-watchlist");
        addToWatchlistButton.addEventListener("click", () => {
            // Add the movie to local storage
            const savedMovies =
                JSON.parse(localStorage.getItem("watchlist-movies")) || [];

            // Check if the movie is already in the watchlist
            const isMovieInWatchlist = savedMovies.some(
                (savedMovie) => savedMovie.imdbID === movie.imdbID
            );

            if (!isMovieInWatchlist) {
                savedMovies.push(movie);
                localStorage.setItem(
                    "watchlist-movies",
                    JSON.stringify(savedMovies)
                );
            }

            addToWatchlistButton.style.display = "none";
        });

        // add 'read more' button to the movie card
        if (movieDetails.Plot.length > 232) {
            const readMoreLink = document.createElement("span");
            readMoreLink.textContent = "Read More";
            readMoreLink.classList.add("read-more");
            readMoreLink.addEventListener("click", () => {
                movieElement
                    .querySelector(".plot")
                    .classList.toggle("expanded");
                readMoreLink.textContent = `${
                    readMoreLink.textContent === "Read More"
                        ? "Read Less"
                        : "Read More"
                }`;
            });
            movieElement.querySelector(".plot").appendChild(readMoreLink);
        }

        moviesContainer.appendChild(movieElement);
    }
}
