import api from '../api/api'

export default async function fetchAllBox(limit = 10, page = 1 ) {
    const response = await api.get('/api/products/all', {
        params: { 
            _limit: limit, 
            _page: page
        }
    })
    return response
}