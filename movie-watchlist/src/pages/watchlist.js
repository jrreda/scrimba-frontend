// define main constants and variables
const moviesContainer = document.getElementById("movies-container");
const emptyListMessage = document.getElementById("empty-list-message");
const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

function displayMovies(movies) {
    console.log(`Displaying ${movies.length} movies in the watchlist.`);

    // Check if there are any movies in the watchlist
    if (movies.length === 0) {
        return;
    }

    // Clear previous results
    moviesContainer.innerHTML = "";

    // hide empty list message
    emptyListMessage.style.display = "none";

    // Display each movie in the watchlist
    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">
            <h3 class="movie-title">${movie.Title}</h3>
            <p class="movie-year">${movie.Year}</p>
            <button class="add-to-watchlist">Add to Watchlist</button>
        `;
    });
    moviesContainer.appendChild(movieCard);
}

displayMovies(watchlist);
