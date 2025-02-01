import { useEffect, useState } from "react"
import { getUser } from "../services/userServices"

interface User {
    id: number
    name: string
    surname: string
    role: string
    course: string
    email: string
    active: boolean
    acepNotifications: boolean
}
function Profile() {
    const [user, setUser] = useState<User>()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function call() {
            try {
                const getuser = await getUser()
                setUser(getuser)
            } catch (error) {
                const msg = error instanceof Error ? error.message : 'Error desconocido'
                setMessage(msg)
            } finally {
                setLoading(false)
            }
        }
        call()
    }, [])

    if (loading) return <div>Loading...</div>


    return (
        <div className="relative overflow-x-auto m-32">
            {message}
            <label htmlFor="">Nombre</label>
            <input className="text-white" type="text" value={user?.name} />
        </div>
        

    )
}

export default Profile