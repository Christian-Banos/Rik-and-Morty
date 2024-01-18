import { Main, Info, Episode } from "./interface/interfaces";

const urlRickAndMOrti = "https://rickandmortyapi.com/api/episode";

async function getEpisodes(): Promise<Main> {
  try {
    const infoApi = await fetch(urlRickAndMOrti);
    const data: Main = await infoApi.json();
    const episodes: Episode[] = data.results;

    episodes.forEach((episode) => {
      const container = document.querySelector(
        "#nameEpisodes"
      ) as HTMLButtonElement;
      container.classList.add("nameEpisodes");
      const btnEpisode = document.createElement("button");
      btnEpisode.classList.add("btnEpisode");
      btnEpisode.textContent = episode.name;
      container?.appendChild(btnEpisode);
    });
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw Error;
  }
}
getEpisodes().then((res) => {
  //return of the last function

  // newsEpisodes.forEach((resEpisode) => {

  // })

  getMoreEpisodes(res);
});
//btn

function getMoreEpisodes(res: Main): void {
  const btnMore = document.querySelector("#btnMore") as HTMLButtonElement;
  let checkEvent: Boolean = true;
  btnMore.addEventListener("click", async () => {
    if (checkEvent) {
      checkEvent = false;
      printNewEpisodes(res);
    } else {
    }
  });
}

async function printNewEpisodes(res: Main) {
  try {
    if (res.info.next) {
        const response = await fetch(res.info.next);
        const data: Main = await response.json();
        const NewEpisodes: Episode[] = data.results;
    
        NewEpisodes.forEach((episode) => {
          const container = document.querySelector("#nameEpisodes") as HTMLButtonElement;
          container.classList.add("nameEpisodes");
          const btnEpisode = document.createElement("button");
          btnEpisode.classList.add("btnEpisode");
          btnEpisode.textContent = episode.name;
          container.appendChild(btnEpisode);
        });
    }
  } catch (error) {
    throw new Error("Error");
  }
}
