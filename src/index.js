import Notiflix from 'notiflix';
import './css/styles.css';
import apiService from './apiService.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

//https://pixabay.com/api/docs/
//API key: 31642520-d6a6357411a55db3459510987
//https://pixabay.com/api/?key=31642520-d6a6357411a55db3459510987&q=cat&image_type=photo&orientation=all&safesearch=true&per_page=10&page=1

const searchForm = document.querySelector('.search-form');
const createGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearch);
searchForm.addEventListener('input', inputValue);
loadMoreBtn.addEventListener('click', onLoadMore);

loadMoreBtn.style.display='none';

let searchQuery = '';
let page = 1;
let totalArr = 40;

function inputValue(event) {
    const searchValue = event.target.value;
    if (!searchValue) {
        createGallery.innerHTML = '';
        loadMoreBtn.style.display = 'none';
        return;
    }
}

function onSearch(event) {
    event.preventDefault();
    searchQuery = event.target.searchQuery.value;

    apiService(searchQuery, page).then(data => console.log(data));
    page = 1;
    apiService(searchQuery, page)
        .then(data => {
            if (!data.hits.length) {
                Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
            } else {
                Notiflix.Notify.info(`Hooray! We found totalHits ${data.totalHits} images.`);
                loadMoreBtn.style.display = 'block';
            }
            createGallery.innerHTML = '';
            createGallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
        });
}

function onLoadMore() {
    page += 1;
    apiService(searchQuery, page).then(data => {
        totalArr += data.hits.length;
        createGallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    //     new SimpleLightbox('.gallery a', {
    //     captionsData: "alt",
    //     captionPosition: "bottom",
    //     captionDelay: 250,
    // });
        if ( totalArr === data.totalHits) {
            Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
            loadMoreBtn.style.display = 'none';
        }
    });
}

function createMarkup(arr) {
    return arr.map(({ webformatURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
    <div class="thumb">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </div>
    <div class="info">
        <p class="info-item">
            <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
            <b>Views: ${views}</b>
        </p>
        <p class="info-item">
            <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads: ${downloads}</b>
        </p>
    </div>
</div>`).join('');
}