import api from '../api/api'

export default async function fetchAllBox(limit = 10, page = 1, search = null) {
    let params = { 
        _limit: limit, 
        _page: page,
    }

    if (search !== null) {
        params._search = search;
    }

    // if(category !== null) {
    //     params._category = category;
    // }

    const response = await api.get('/api/products/all', {params})
    return response
}