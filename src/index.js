import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix'

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');


let selectedBreedId = null;

fetchBreeds()
    .then(breeds => {
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            selectEl.appendChild(option);
        });

        new SlimSelect({
            select: '#breedSelect'
        })

        loaderEl.style.display = 'none';

        selectEl.addEventListener('change', onBreedSelect);
    })
    .catch(error => {

        loaderEl.style.display = 'none';
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });


function onBreedSelect(event) {
    const selectedBreedId = event.target.value;


    loaderEl.style.display = 'block';
    catInfoEl.innerHTML = '';

    fetchCatByBreed(selectedBreedId)
        .then(cat => {
            const { url, breeds } = cat[0];
            const { name, description, temperament } = breeds[0];

            const catInfoMarkup = `
                <h1>${name}</h1>
                <p class = "description">${description}</p>
                <p><strong>Temperament: </strong>${temperament}</p>
                <img src="${url}" alt="${name}" />
            `;


            catInfoEl.innerHTML = catInfoMarkup;

            loaderEl.style.display = 'none';

        })
        .catch(error => {

            loaderEl.style.display = 'none';
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        });
}
