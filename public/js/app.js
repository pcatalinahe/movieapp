

document.querySelector(".search-button").addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent form from submitting
    const search = document.querySelector("input[name='search']");
    const movieQuery = search.value;

    if (!movieQuery) {
        displayError("Please enter a movie name.");
        return;
    }

    // Fetch movie data
    const result = await getMovie(movieQuery);

    if (result && result.results && result.results.length > 0) {
        const movieId = result.results[0].id;
        const similarMovies = await getSimilar(movieId);

        if (similarMovies && similarMovies.results && similarMovies.results.length > 0) {
            displayMovies(similarMovies.results.slice(0, 5)); // Display top 5 similar movies
        } else {
            displayError("No similar movies found.");
        }
    } else {
        displayError("No movies found for your search.");
    }
});

async function getMovie(userMovie) {
    const apiKey = "f90f921a411b60f61d44a93d44091c3c";
    const movieApi = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(userMovie)}&api_key=${apiKey}`;

    try {
        const response = await fetch(movieApi);
        const data = await response.json();
        console.log("Movie Search Results:", data);
        return data;
    } catch (error) {
        console.error("Error fetching movie data:", error);
        displayError("Failed to fetch movie data.");
    }
}

async function getSimilar(movieId) {
    const apiKey = "f90f921a411b60f61d44a93d44091c3c";
    const similarApi = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`;

    try {
        const response = await fetch(similarApi);
        const data = await response.json();
        console.log("Similar Movies:", data);
        return data;
    } catch (error) {
        console.error("Error fetching similar movies:", error);
        displayError("Failed to fetch similar movies.");
    }
}

function displayMovies(movies) {
    const container = document.querySelector(".movies-container");
    container.innerHTML = ""; // Clear any existing content

    movies.forEach((movie) => {
        const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/150"; // Placeholder for missing posters
        
        const movieCard = `
            <div class="movie-card">
                <img src="${posterPath}" alt="${movie.title}">
                <h2>${movie.title}</h2>
                <p>Release Date: ${movie.release_date || "N/A"}</p>
                <p>Overview: ${movie.overview || "No overview available."}</p>
            </div>
        `;

        container.innerHTML += movieCard;
    });
}


