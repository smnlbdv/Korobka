import {useState, useEffect, useCallback} from 'react'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [role, setRole] = useState(0)

    const login = useCallback((jwtToken, id, role) => {
        setToken(jwtToken)
        setUserId(id)
        setRole(role)
        localStorage.setItem("userData", JSON.stringify({userId: id, token: jwtToken, role: role}))
    }, [])

    const logout = () => {
        setToken(null)
        setUserId(null)
        setRole(null)
        localStorage.removeItem('userData')
    }

    useEffect(() => {
        if(localStorage.getItem('userData')) {
            const data = JSON.parse(localStorage.getItem('userData'));
            login(data.token, data.userId, data.role)
        } else {
            logout()
        }

    }, [login])

    return {login, logout, token, userId, role, setRole}
}
