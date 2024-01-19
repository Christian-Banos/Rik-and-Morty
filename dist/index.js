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
                episodeList.classList.add('nameEpisodes');
                const btnListEpisodes = document.createElement('button');
                btnListEpisodes.classList.add('btnEpisode');
                btnListEpisodes.textContent = e.name;
                episodeList.appendChild(btnListEpisodes);
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
export {};
//# sourceMappingURL=index.js.map