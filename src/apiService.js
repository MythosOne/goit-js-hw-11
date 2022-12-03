import axios from 'axios';

export default async function apiService(searchQuery, page) {
    const API_KEY = '31642520-d6a6357411a55db3459510987';
    const BASE_URL = 'https://pixabay.com/api/';

    return await axios(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
        .then(resp => {
            return resp.data;
        });
}
