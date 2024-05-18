import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import api from '../api/api.js'
const API_URL = "http://localhost:5000"

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState(null)
    const [userId, setUserId] = useState(null)
    const [role, setRole] = useState(0)

    const login = (id, email, role) => {
        setIsAuth(true)
        setUserId(id)
        setRole(role)
        localStorage.setItem('user', JSON.stringify({ id: id, email: email, role: role }));
    }

    const logout = useCallback(() => {
        setIsAuth(false)
        setUserId(null)
        setRole(null)
        localStorage.clear();
    }, [])

    const checkAuth = async () => {
        if(localStorage.getItem('user')) {
            try {
                const response = await axios.get(`${API_URL}/api/profile/token/refresh`, { withCredentials: true });
                if (response.status === 200) {
                    login(response.data.id, response.data.email, response.data.role)
                }
            } catch (error) {
                logout()
            }
        } else {
            logout()
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])


    return { isAuth, userId, role, login, checkAuth}
}
