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
    console.log(`Search response:`, data);

    // clear moviesContainer
    moviesContainer.innerHTML = "";

    if (data.Response === "True") {
        await displayMovies(data.Search);

        // Save movies to localStorage
        localStorage.setItem("movies", JSON.stringify(data.Search));
    } else {
        alert(
            "Unable to find what you’re looking for. Please try another search."
        );

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
    )}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(`Details response:`, data);

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
                    <div class="add-to-watchlist">
                        <img src="https://img.icons8.com/ios-filled/50/000000/add-to-list.png" alt="Add to Watchlist Icon" />
                        <span>Add to Watchlist</span>
                    </div>
                </div>

                <p class="plot">${movieDetails.Plot}</p>
            </div>

            <div class="divider"></div>
        `;
        moviesContainer.appendChild(movieElement);
    }
}
