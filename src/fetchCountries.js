import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v2';
const API_KEY = 'name,capital,population,flags,languages';

export default function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}?fields=${API_KEY}`)
        .then(resp => {
            if (!resp.ok) {
                Notiflix.Notify.failure(`Oops, there is no country with that name`);
                // throw new Error(resp.statusText);
            }
            return resp.json();
        });
}
