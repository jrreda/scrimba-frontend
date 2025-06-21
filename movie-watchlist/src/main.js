// define main constants and variables
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const startImage = document.getElementById("start-image");
const moviesContainer = document.getElementById("movies-container");

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value;
    console.log(`Searching for: ${searchTerm}`);

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

function fetchMovies(searchTerm) {
    // access the API key from the .env file
    const apiKey = import.meta.env.VITE_OMDB_API_KEY; // Ensure you have set this in your environment
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            if (data.Response === "True") {
                console.log(`Found ${data.Search.length} movies.`);
                console.log("Movies:", data.Search);

                displayMovies(data.Search);
            } else {
                alert("No movies found. Please try a different movie title.");
                startImage.style.display = "block";
            }
        })
        .catch((error) => {
            console.error("Error fetching movies:", error);
            alert(
                "An error occurred while fetching movies. Please try again later."
            );
        });
}

function displayMovies(movies) {
    movies.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h2>${movie.Title}</h2>
      <p>Year: ${movie.Year}</p>
      <button class="add-to-watchlist">Add to Watchlist</button>
      `;
        moviesContainer.appendChild(movieElement);
    });
}
