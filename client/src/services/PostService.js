import api from '../api/api'

export default async function fetchAllBox(limit = 12, page = 1, search = null, category = null) {
    let params = { 
        _limit: limit, 
        _page: page,
        _search: search,
        _category: category
    }

    const response = await api.get('/api/products/all', {params})
    return response
}