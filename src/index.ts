import { Main, Info, Episode, Character } from "./interface/interfaces";

const episodeList = document.getElementById(
  "nameEpisodes"
) as HTMLButtonElement;
const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;

const urlRM = "https://rickandmortyapi.com/api/episode";
printTitle(urlRM);

async function printTitle(url: string) {
  try {
    const data = await fetch(urlRM);
    const JsonData: Main = await data.json();
    const episodes: Episode[] = JsonData.results;

    if (!data.ok) {
      throw new Error(`HTTP error! Status: ${data.status}`);
    }

    episodes.forEach((e) => {
      episodeList?.insertAdjacentHTML(
        "beforeend",
        `<button id="episode${e.episode}" episodeUrl="${e.url}" class="btnEpisode ">${e.name}</button>`
      );
      const clickEpisode = document.getElementById(
        `episode${e.episode}`
      ) as HTMLElement;
      clickEpisode.addEventListener("click", displayElementInfo);
    });

    const NewEpisodes = JsonData.info.next;

    if (NewEpisodes) {
      nextBtn.addEventListener(
        "click",
        () => {
          printTitle(NewEpisodes);
        },
        { once: true }
      );
    } else {
      nextBtn.remove();
    }
  } catch (error) {
    console.error("Error featching data: ", error);
    throw Error;
  }
}

/* Click Display Episodes */
async function displayElementInfo(click: MouseEvent) {
  const target = click.target as HTMLButtonElement;
  const urlEpisode = target.getAttribute("episodeUrl")!;
  console.log("getTarget", urlEpisode);

  const data = await fetch(urlEpisode);
  const episodeInfo: Episode = await data.json();

  console.log(episodeInfo);

  const displayepisodeInfo = `
    <div class="displayepisodeInfo">
    <p">${episodeInfo.name}</p>
    <p">${episodeInfo.air_date}</p>
    <p">${episodeInfo.episode}</p>
    </div>
  `;
  const printDisplayEpisode = document.getElementById(
    "displayCharacterInfo"
  ) as HTMLDivElement;
 
  printDisplayEpisode.innerHTML = displayepisodeInfo;
  const characters = episodeInfo.characters;
  characters.forEach(async (urlCharacters) => {
    const data = await fetch(urlCharacters);
    const characterInfo: Character = await data.json();
    const displayCharacterInfo = `
      <div class="card">
        <img src="${characterInfo.image}">
        <p><b>Name:</b> ${characterInfo.name}</p>
        <p><b>Id:</b> ${characterInfo.id}</p>
        <p><b>Status:</b> ${characterInfo.status}</p>
        <p><b>Specie:</b> ${characterInfo.species}</p>
        <p><b>Gender:</b> ${characterInfo.gender}</p>
      </div>`;
    printDisplayEpisode.insertAdjacentHTML("beforeend", displayCharacterInfo);
  });
}
