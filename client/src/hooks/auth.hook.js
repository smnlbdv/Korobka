import {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import api from '../api/api.js'
const API_URL = "http://localhost:5000"

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState(null)
    const [userId, setUserId] = useState(null)
    const [role, setRole] = useState(0)

    const login = useCallback((jwtToken, id, role) => {
        setIsAuth(true)
        setUserId(id)
        setRole(role)
        localStorage.setItem("token", jwtToken)
    }, [])

    const logout = async () => {
        setIsAuth(false)
        setUserId(null)
        setRole(null)
        localStorage.removeItem("token")
        await api.post(`${API_URL}/api/profile/token/logout`, {withCredentials: true})
    }

    const checkAuth = async () => {
        if(localStorage.getItem("token")) {
            try {
                const response = await axios.get(`${API_URL}/api/profile/token/refresh`, { withCredentials: true });
                if (response.status === 200) {
                    setIsAuth(true);
                    setUserId(response.data.user.id);
                    setRole(response.data.user.role);
                    localStorage.setItem("token", response.data.accessToken);
                }
            } catch (error) {
                logout();
            }
        } else {
            logout();
        }
    }

    useEffect(() => {
        checkAuth()
    }, [login])

    return {login, isAuth, userId, role, logout, checkAuth}
}
