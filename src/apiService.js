import Notiflix from 'notiflix';

// const loadMoreBtn = document.querySelector('.load-more');
// loadMoreBtn.addEventListener('click', onLoadMore);
// loadMoreBtn.setAttribute('disabled', true);

// let searchQuery = '';
// let page = 1;

export default async function apiService(searchQuery, page) {
    const API_KEY = '31642520-d6a6357411a55db3459510987';
    const BASE_URL = 'https://pixabay.com/api/';

    return await fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&${page}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error();
            }
            return resp.json();
        });
}

// function onLoadMore() {
//     page += 1;
//     apiService(searchQuery, page).then(data => { createGallery.insertAdjacentHTML('beforeend', createMarkup(data.hits)); });
// }

// function resetPage() {
//     page = 1;
// }
