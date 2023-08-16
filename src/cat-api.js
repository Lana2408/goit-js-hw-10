import axios from "axios"

const API_KEY = 'live_xhkQb0BXoSmc2ohX85MrqPfg3vWxNAqBUpT2hGjFoNDhzNzxaV9OLyksuAUio0rC'
axios.defaults.headers.common["x-api-key"] = API_KEY;

export function fetchBreeds() {
    const url = 'https://api.thecatapi.com/v1/breeds'
    return axios.get(url)
      .then(response => response.data);
      
      };
export function fetchCatByBreed(breedId) {
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    return axios.get(url).then(responce => responce.data);
      }

