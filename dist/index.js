var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlRickAndMOrti = "https://rickandmortyapi.com/api/episode";
function getEpisodes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const infoApi = yield fetch(urlRickAndMOrti);
            const data = yield infoApi.json();
            const episodes = data.results;
            episodes.forEach((episode) => {
                const container = document.querySelector("#nameEpisodes");
                container.classList.add("nameEpisodes");
                const btnEpisode = document.createElement("button");
                btnEpisode.classList.add("btnEpisode");
                btnEpisode.textContent = episode.name;
                container === null || container === void 0 ? void 0 : container.appendChild(btnEpisode);
            });
            return data;
        }
        catch (error) {
            console.error("Error fetching data: ", error);
            throw Error;
        }
    });
}
getEpisodes().then((res) => {
    getMoreEpisodes(res);
});
function getMoreEpisodes(res) {
    const btnMore = document.querySelector("#btnMore");
    let checkEvent = true;
    btnMore.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        if (checkEvent) {
            checkEvent = false;
            printNewEpisodes(res);
        }
        else {
        }
    }));
}
function printNewEpisodes(res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (res.info.next) {
                const response = yield fetch(res.info.next);
                const data = yield response.json();
                const NewEpisodes = data.results;
                NewEpisodes.forEach((episode) => {
                    const container = document.querySelector("#nameEpisodes");
                    container.classList.add("nameEpisodes");
                    const btnEpisode = document.createElement("button");
                    btnEpisode.classList.add("btnEpisode");
                    btnEpisode.textContent = episode.name;
                    container.appendChild(btnEpisode);
                });
            }
        }
        catch (error) {
            throw new Error("Error");
        }
    });
}
export {};
//# sourceMappingURL=index.js.map