import {useState, useEffect, useCallback} from 'react'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem("userData", JSON.stringify({userId: id, token: jwtToken}))
    }, [])

    const logout = () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem('userData')
    }

    useEffect(() => {

        if(localStorage.getItem('userData')) {
            const data = JSON.parse(localStorage.getItem('userData'));
            login(data.token, data.userId)
        } else {
            logout()
        }

    }, [login])

    return {login, logout, token, userId}
}
