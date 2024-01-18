import { Main, Info, Episode } from "./interface/interfaces";

const urlRickAndMOrti = 'https://rickandmortyapi.com/api/episode';

async function getEpisodes() {
    try {
        const infoApi = await fetch(urlRickAndMOrti);
        const data: Main = await infoApi.json();
        const episodes: Episode[] = data.results;
        
        episodes.forEach(episode => {
            const container = document.querySelector('#nameEpisodes') as HTMLButtonElement;
            container.classList.add('nameEpisodes');
            const btnEpisode = document.createElement('button');
            btnEpisode.classList.add('btnEpisode')
            btnEpisode.textContent = episode.name;
            container?.appendChild(btnEpisode)
            
        })

    } catch (error) {
        console.error('Error fetching data: ', error);
        throw Error;
    }
}
getEpisodes()
