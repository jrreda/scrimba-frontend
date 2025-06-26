// define main constants and variables
const moviesContainer = document.getElementById("movies-container");
const emptyList = document.getElementById("empty-watchlist");
const watchlistMovies =
    JSON.parse(localStorage.getItem("watchlist-movies")) || [];

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
                        <img src="../../public/minus-icon.svg" alt="remove to Watchlist Icon" />
                        <span>Remove</span>
                    </div>
                </div>

                <div class="plot">
                    <p>${movieDetails.Plot}</p>
                </div>
            </div>
        `;

        // Add event listener for the "Remove from Watchlist" button
        const removeFromWatchlistButton =
            movieElement.querySelector("#add-to-watchlist");
        removeFromWatchlistButton.addEventListener("click", () => {
            // Remove the movie from local storage
            const savedMovies =
                JSON.parse(localStorage.getItem("watchlist-movies")) || [];
            const updatedMovies = savedMovies.filter(
                (savedMovie) => savedMovie.Title !== movie.Title
            );
            localStorage.setItem(
                "watchlist-movies",
                JSON.stringify(updatedMovies)
            );

            // Reload the page to reflect the changes
            location.reload();
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

// Call the displayMovies function with the watchlist movies
document.addEventListener("DOMContentLoaded", () => {
    if (watchlistMovies.length > 0) {
        // clear the empty list message
        emptyList.style.display = "none";

        // clear the movies container
        moviesContainer.innerHTML = "";

        // display the movies in the watchlist
        displayMovies(watchlistMovies);
    }
});
