"use strict";
const urlRickAndMOrti = 'https://rickandmortyapi.com/api/episode';
const listEpisodes = document.querySelector('#nameEpisodes');
fetch(urlRickAndMOrti)
    .then((response) => response.json())
    .then((data) => {
    const episodeName = data.results;
    episodeName.forEach((episode) => {
        const li = document.createElement('li');
        li.textContent = episode.name;
        listEpisodes === null || listEpisodes === void 0 ? void 0 : listEpisodes.appendChild(li);
    });
});
//# sourceMappingURL=index.js.map