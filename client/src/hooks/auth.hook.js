import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import api from '../api/api.js'
const API_URL = "http://localhost:5000"

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [userId, setUserId] = useState(false)
    const [role, setRole] = useState(0)

    const login = (id, role) => {
        setIsAuth(true)
        setUserId(id)
        setRole(role)
        localStorage.setItem('user', JSON.stringify({ id: id, role: role }));
    }

    const logout = () => {
        setIsAuth(false)
        setUserId(null)
        setRole(null)
        localStorage.clear();
    }

    const checkAuth = async () => {
        if(localStorage.getItem('user')) {
            try {
                const response = await axios.get(`${API_URL}/api/profile/token/refresh`, { withCredentials: true });
                if (response.status === 200) {
                    login(response.data.id, response.data.role)
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
    }, [login])

    return { isAuth, logout, userId, role, login }
}
