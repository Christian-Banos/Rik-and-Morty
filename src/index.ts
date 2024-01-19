import { Main, Info, Episode, Character } from "./interface/interfaces";

const episodeList = document.getElementById('nameEpisodes') as HTMLButtonElement;
const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;

const urlRM = "https://rickandmortyapi.com/api/episode";
printTitle(urlRM);

async function printTitle(url: string){
  try {
    const data = await fetch(urlRM);
    const JsonData: Main = await data.json();
    const episodes: Episode[] = JsonData.results;
    
    if(!data.ok){
      throw new Error(`HTTP error! Status: ${data.status}`);
    }
    
    episodes.forEach((e) => {
       episodeList?.insertAdjacentHTML('beforeend', `<button id="episode${e.episode}" episodeUrl="${e.url}">${e.name}</button>`);
      // episodeList.classList.add('nameEpisodes');
      // const btnListEpisodes = document.createElement('button');
      // btnListEpisodes.classList.add('btnEpisode');
      // btnListEpisodes.textContent = e.name;
      // episodeList.appendChild(btnListEpisodes);
      const clickEpisode = document.getElementById(`episode${e.episode}`) as HTMLElement;
      clickEpisode.addEventListener('click', displayElementInfo);
    });

    const NewEpisodes = JsonData.info.next;

    if (NewEpisodes) {
      nextBtn.addEventListener('click', () => {
          printTitle(NewEpisodes); //question
      }, { once: true });
  } else {
      nextBtn.remove();
  }


  } catch (error) {
    console.error('Error featching data: ', error);
    throw Error;
  }

}

/* Click Display Episodes */
async function displayElementInfo(click:MouseEvent) {
  const target = click.target as HTMLButtonElement;
  const urlEpisode = target.getAttribute("episodeUrl")!;
  console.log(urlEpisode);
  
  const data = await fetch(urlEpisode);
  const episodeInfo: Episode = await data.json();

  console.log(episodeInfo);  

  const displayepisodeInfo = `
    <p>${episodeInfo.name}</p>
    <p>${episodeInfo.air_date}</p>
    <p>${episodeInfo.episode}</p>
  `;
  const printDisplayEpisode = document.getElementById('printDisplayEpisode') as HTMLDivElement;
  // printDisplayEpisode.innerHTML = ''; //para borrar el contenedro
  printDisplayEpisode.innerHTML =  displayepisodeInfo;
  const characters = episodeInfo.characters;
  characters.forEach(async urlCharacters => {
    const data = await fetch(urlCharacters);
    const characterInfo: Character = await data.json();
    const displayCharacterInfo = `
    <p>${characterInfo.name}</p>
    <p>${characterInfo.id}</p>
    <p>${characterInfo.status}</p>
    <p>${characterInfo.species}</p>
    <p>${characterInfo.gender}</p>
    <img src="${characterInfo.image}">`
    printDisplayEpisode.insertAdjacentHTML("beforeend", displayCharacterInfo);
  });
  
} 




// const urlRickAndMOrti = "https://rickandmortyapi.com/api/episode";

// async function getEpisodes(): Promise<Main> {
//   try {
//     const infoApi = await fetch(urlRickAndMOrti);
//     const data: Main = await infoApi.json();
//     const episodes: Episode[] = data.results;

//     episodes.forEach((episode) => {
//       const container = document.querySelector(
//         "#nameEpisodes"
//       ) as HTMLButtonElement;
//       container.classList.add("nameEpisodes");
//       const btnEpisode = document.createElement("button");
//       btnEpisode.classList.add("btnEpisode");
//       btnEpisode.textContent = episode.name;
//       container?.appendChild(btnEpisode);
//     });
//     return data;
//   } catch (error) {
//     console.error("Error fetching data: ", error);
//     throw Error;
//   }
// }
// getEpisodes()
//     .then((res) => {
//   //return of the last function
//   getMoreEpisodes(res);
//     })
//     .then((res) => {

//     })

// //btn

// function getMoreEpisodes(res: Main): void {
//   const btnMore = document.querySelector("#btnMore") as HTMLButtonElement;
//   let checkEvent: Boolean = true;
//   btnMore.addEventListener("click", async () => {
//     if (checkEvent) {
//       checkEvent = false;
//       printNewEpisodes(res);
//     } else {
//     }
//   });
// }

// async function printNewEpisodes(res: Main): Promise<Main> {
//   try {
//     const response = await fetch(res.info.next);
//     const data: Main = await response.json();
//     const NewEpisodes: Episode[] = data.results;

//     NewEpisodes.forEach((episode) => {
//       const container = document.querySelector("#nameEpisodes") as HTMLButtonElement;
//       container.classList.add("nameEpisodes");
//       const btnEpisode = document.createElement("button");
//       btnEpisode.classList.add("btnEpisode");
//       btnEpisode.textContent = episode.name;
//       container.appendChild(btnEpisode);
//     });
//     return data;
//   } catch (error) {
//     throw new Error("Error");
//   }
// }

