const BASE_URL =
    "https://sakanaction-api.onrender.com";

const API_URL =
    `${BASE_URL}/api/songs`;

let songs = [];

async function loadSongs() {

    try {

        const response =
            await fetch(API_URL);

        songs =
            await response.json();

        createAlbumFilter();

        filterSongs();

    } catch (error) {

        console.error(error);

        document.getElementById("songList")
            .innerHTML =
            "<p>データ取得失敗</p>";
    }
}

function createAlbumFilter() {

    const select =
        document.getElementById("albumFilter");

    const albums =
        [...new Set(songs.map(song => song.album))]
            .sort();

    albums.forEach(album => {

        const option =
            document.createElement("option");

        option.value = album;
        option.textContent = album;

        select.appendChild(option);
    });
}

function renderSongs(data) {

    const songList =
        document.getElementById("songList");

    songList.innerHTML = data.map(song => `
  <div class="card">

    ${song.image
            ? `
      <img
        src="${BASE_URL}${song.image}"
        alt="${song.title}"
      >
      `
            : ""
        }

    <div class="card-content">

      <div class="title">
        ${song.title}
      </div>

      <div class="album">
        ${song.album}
      </div>

      <div class="info">
        発売日: ${song.releaseDate}
      </div>

      <div class="info">
        作詞: ${song.lyricist ?? "なし"}
      </div>

    </div>

  </div>
`).join("");
}

function filterSongs() {

    const keyword =
        document.getElementById("search")
            .value
            .toLowerCase();

    const album =
        document.getElementById("albumFilter")
            .value;

    const sortType =
        document.getElementById("sortDate")
            .value;

    let result =
        songs.filter(song => {

            const matchTitle =
                song.title
                    .toLowerCase()
                    .includes(keyword);

            const matchAlbum =
                album === "" ||
                song.album === album;

            return matchTitle && matchAlbum;
        });

    result.sort((a, b) => {

        if (sortType === "new") {
            return new Date(b.releaseDate)
                - new Date(a.releaseDate);
        }

        return new Date(a.releaseDate)
            - new Date(b.releaseDate);
    });

    renderSongs(result);
}

document
    .getElementById("search")
    .addEventListener("input", filterSongs);

document
    .getElementById("albumFilter")
    .addEventListener("change", filterSongs);

document
    .getElementById("sortDate")
    .addEventListener("change", filterSongs);

loadSongs();