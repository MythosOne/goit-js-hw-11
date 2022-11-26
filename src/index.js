import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js'

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const card = document.querySelector('.country-info');
input.addEventListener('input', debounce(OnSearch, DEBOUNCE_DELAY));



function OnSearch(event) {
    const SearchValue= event.target.value.trim();
    if (!SearchValue) {
        list.remove();
        card.remove();
        return;
    }

    fetchCountries(SearchValue).then(data => {
        if (data.length > 10) {
            Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
        } else if (data.length > 1 && data.length <= 10) {
            card.innerHTML = '';
            creatMarkupFound(data);
        } else {
            list.innerHTML = '';
            creatMarkupCard(data);
        }
    });
}

function creatMarkupFound(data) {
    const markup = data.map(({ flags, name }) => `<li style='display : flex;'>
    <img src="${flags.svg}" width="40px" alt="${name}"/>
    <h2 style='margin: 0; margin-left: 10px'>${name}</h2>
    </li>`);
    list.style.cssText =
        `display : flex;
        flex-Direction : column;
        gap : 20px;
        padding: 0;
        list-style : none`;
    list.innerHTML = markup.join('');
}

function creatMarkupCard(data) {
    const markup = data.map(({ flags, name, capital, population, languages }) =>
    `<div class="country-info"><img src="${flags.svg}" width="70px" alt="${name}" />
    <h1>${name}</h1>
    <ul style ='margin: 0;
        padding: 0;
        list-style: none;'>
    <li><span>Capital: ${capital}</span></li>
    <li><span>Population: ${population}</span></li>
    <li><span>Languages: ${languages.map(({name})=> `<span>${name}</span>`).join(', ')}</span></li>
    </ul>
    </div>`
    );
    card.innerHTML = markup.join('');
}