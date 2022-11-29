import Notiflix from 'notiflix';
import axios from 'axios';
import './css/styles.css';

import apiService from './apiService.js';

//https://pixabay.com/api/docs/
//API key: 31642520-d6a6357411a55db3459510987
//https://pixabay.com/api/?key=31642520-d6a6357411a55db3459510987&q=cat&image_type=photo&orientation=all&safesearch=true&per_page=10&page=1

const searchForm = document.querySelector('.search-form');
const createGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.addEventListener('click', onLoadMore);

searchForm.addEventListener('submit', onSearch);

loadMoreBtn.style.display='none';

let searchQuery = '';
let page = 1;

function onSearch(event) {
    event.preventDefault();
    const searchQuery = event.target.elements.searchQuery.value;

    if (!searchQuery) {
        createGallery.innerHTML = '';
        return;
    }
    
    apiService(searchQuery, page).then(data => console.log(data));

    apiService(searchQuery, page).then(data => {
        if (!data.hits.length) {
            Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        } else {
            loadMoreBtn.style.display='block';
        }
    });
    
    apiService(searchQuery, page).then(data => { createGallery.insertAdjacentHTML('beforeend', createMarkup(data.hits)); });
}

function onLoadMore() {
    page += 1;
    apiService(searchQuery, page).then(data => { createGallery.insertAdjacentHTML('beforeend', createMarkup(data.hits)); });
}

function createMarkup(arr) {
    return arr.map(({webformatURL, tags, likes, views, comments, downloads}) => `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" width="240px" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <b>Likes ${likes}</b>
        </p>
        <p class="info-item">
            <b>Views ${views}</b>
        </p>
        <p class="info-item">
            <b>Comments ${comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads ${downloads}</b>
        </p>
    </div>
</div>`).join('');
}