async function MovieData() {
    var movie = document.getElementById("title").value;
    let url = `https://www.omdbapi.com/?t=${movie}&apikey=b977330b`;
    let res = await fetch(url);
    let data = await res.json();

    var box = document.getElementById("fill");
    box.innerHTML = '';

    if (data.Response === "True") {
        var outputCard = createMovieCard(data);
        box.appendChild(outputCard);
    } else {
        // Jika film tidak ditemukan
        var errorDiv = document.createElement("div");
        errorDiv.setAttribute("class", "alert alert-danger");
        errorDiv.innerHTML = "Movie not found or an error occurred.";
        box.appendChild(errorDiv);
    }

    // Tambahan kode untuk menampilkan daftar film
    let searchUrl = `https://www.omdbapi.com/?s=${movie}&apikey=b977330b`;
    let searchRes = await fetch(searchUrl);
    let searchData = await searchRes.json();

    if (searchData.Response === "True" && searchData.Search) {
        // Hapus hasil pertama jika sama dengan pencarian judul tunggal
        if (searchData.Search[0].Title === data.Title) {
            searchData.Search.shift();
        }

        for (const movie of searchData.Search) {
            var moreInfoUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=b977330b`;
            let moreInfoRes = await fetch(moreInfoUrl);
            let moreInfoData = await moreInfoRes.json();
            var outputCard = createMovieCard(moreInfoData);
            box.appendChild(outputCard);
        }
    }
}

function createMovieCard(movieData) {
    var outputCard = document.createElement("div");
    outputCard.setAttribute("class", "card mb-3");

    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    var contentWrapper = document.createElement("div");
    contentWrapper.setAttribute("class", "d-flex");

    var posterDiv = document.createElement("div");
    posterDiv.setAttribute("class", "mr-3");
    var poster = document.createElement("img");
    poster.setAttribute("class", "card-img-top");
    poster.setAttribute("style", "max-width: 100%");
    poster.src = movieData.Poster;
    posterDiv.appendChild(poster);

    var textContent = document.createElement("div");
    var title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.innerHTML = `Title: ${movieData.Title}`;

    var year = document.createElement("p");
    year.setAttribute("class", "card-text");
    year.innerHTML = `Release Date: ${movieData.Released}`;

    var genre = document.createElement("p");
    genre.setAttribute("class", "card-text");
    genre.innerHTML = "Genres: " + movieData.Genre;

    var language = document.createElement("p");
    language.setAttribute("class", "card-text");
    language.innerHTML = "Language: " + movieData.Language;

    var rat = document.createElement("p");
    rat.setAttribute("class", "card-text");
    if (parseFloat(movieData.imdbRating) > 8.5) {
        rat.innerHTML = `IMDb Rating: ${movieData.imdbRating} (RECOMMENDED BY IMDb)`;
    } else {
        rat.innerHTML = "IMDb Rating: " + movieData.imdbRating;
    }

    var Director = document.createElement("p");
    Director.setAttribute("class", "card-text");
    Director.innerHTML = "Director: " + movieData.Director;

    var Actors = document.createElement("p");
    Actors.setAttribute("class", "card-text");
    Actors.innerHTML = "Actors: " + movieData.Actors;

    var Plot = document.createElement("p");
    Plot.setAttribute("class", "card-text");
    Plot.innerHTML = "Story Plot: " + movieData.Plot;

    textContent.append(title, year, genre, language, rat, Director, Actors, Plot);
    contentWrapper.append(posterDiv, textContent);
    cardBody.appendChild(contentWrapper);
    outputCard.appendChild(cardBody);

    return outputCard;
}
