import {useState, useEffect, useCallback} from 'react'

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState(null)
    const [userId, setUserId] = useState(null)
    const [role, setRole] = useState(0)

    const login = useCallback((jwtToken, id, role) => {
        setIsAuth(jwtToken)
        setUserId(id)
        setRole(role)
        localStorage.setItem("token", jwtToken)
    }, [])

    const logout = () => {
        setIsAuth(null)
        setUserId(null)
        setRole(null)
        localStorage.removeItem("token")
    }

    // useEffect(() => {
    //     if(localStorage.getItem('token')) {
    //         const data = JSON.parse(localStorage.getItem('token'));
    //         login(data.token, data.userId, data.role)
    //     } else {
    //         logout()
    //     }

    // }, [login])  

    return {login, logout, isAuth, userId, role}
}
