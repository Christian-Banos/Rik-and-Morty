var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const episodeList = document.getElementById('nameEpisodes');
const nextBtn = document.getElementById('nextBtn');
const urlRM = "https://rickandmortyapi.com/api/episode";
printTitle(urlRM);
function printTitle(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetch(urlRM);
            const JsonData = yield data.json();
            const episodes = JsonData.results;
            if (!data.ok) {
                throw new Error(`HTTP error! Status: ${data.status}`);
            }
            episodes.forEach((e) => {
                episodeList === null || episodeList === void 0 ? void 0 : episodeList.insertAdjacentHTML('beforeend', `<button id="episode${e.episode}" episodeUrl="${e.url}">${e.name}</button>`);
                const clickEpisode = document.getElementById(`episode${e.episode}`);
                clickEpisode.addEventListener('click', displayElementInfo);
            });
            const NewEpisodes = JsonData.info.next;
            if (NewEpisodes) {
                nextBtn.addEventListener('click', () => {
                    printTitle(NewEpisodes);
                }, { once: true });
            }
            else {
                nextBtn.remove();
            }
        }
        catch (error) {
            console.error('Error featching data: ', error);
            throw Error;
        }
    });
}
function displayElementInfo(click) {
    return __awaiter(this, void 0, void 0, function* () {
        const target = click.target;
        const urlEpisode = target.getAttribute("episodeUrl");
        console.log(urlEpisode);
        const data = yield fetch(urlEpisode);
        const episodeInfo = yield data.json();
        console.log(episodeInfo);
        const displayepisodeInfo = `
    <p>${episodeInfo.name}</p>
    <p>${episodeInfo.air_date}</p>
    <p>${episodeInfo.episode}</p>
  `;
        const printDisplayEpisode = document.getElementById('printDisplayEpisode');
        printDisplayEpisode.innerHTML = displayepisodeInfo;
        const characters = episodeInfo.characters;
        characters.forEach((urlCharacters) => __awaiter(this, void 0, void 0, function* () {
            const data = yield fetch(urlCharacters);
            const characterInfo = yield data.json();
            const displayCharacterInfo = `
    <p>${characterInfo.name}</p>
    <p>${characterInfo.id}</p>
    <p>${characterInfo.status}</p>
    <p>${characterInfo.species}</p>
    <p>${characterInfo.gender}</p>
    <img src="${characterInfo.image}">`;
            printDisplayEpisode.insertAdjacentHTML("beforeend", displayCharacterInfo);
        }));
    });
}
export {};
//# sourceMappingURL=index.js.map