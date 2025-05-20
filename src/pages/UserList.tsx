import { type ChangeEvent, useEffect, useState } from "react"
import { UserService } from "../services/userServices"
import { useSearchParams } from "react-router-dom"
import { Users, Search } from "lucide-react"

interface User {
    id: number
    name: string
    surname: string
    role: string
    email: string
    active: boolean
    accepNotifications: boolean
}

function UserList() {
    const [queryParams, setQueryParams] = useSearchParams()
    const searchEmail = queryParams.get("email") || ""

    const [users, setUsers] = useState<User[]>([])
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)

    // Cargar usuarios iniciales y cuando cambia el email de búsqueda
    useEffect(() => {
        async function fetchUsers() {
            try {
                // Solo mostramos el loading spinner en la carga inicial
                // No establecemos loading=true en búsquedas posteriores para evitar parpadeos
                const userList = await UserService.search(searchEmail || undefined)
                setUsers(userList)
                setMessage("")
            } catch (error) {
                const msg = error instanceof Error ? error.message : "Error desconocido"
                setMessage(msg)
            } finally {
                // Solo cambiamos loading a false si estaba en true
                if (loading) {
                    setLoading(false)
                }
            }
        }

        fetchUsers()
    }, [searchEmail, loading])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value
        setQueryParams(newEmail ? { email: newEmail } : {})
    }

    // Solo mostramos el spinner de carga en la carga inicial
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Cargando usuarios...</p>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-blue-500 mr-2" />
                <h1 className="text-2xl font-bold text-gray-800">Listado de Usuarios</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="mb-0">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                        Filtrar por email:
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                            placeholder="Buscar por email..."
                            name="email"
                            value={searchEmail}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {message && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                    <p className="text-sm text-red-700">{message}</p>
                </div>
            )}

            {users.length === 0 && !loading && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
                    <p className="text-sm text-blue-700">No se encontraron usuarios con el email especificado.</p>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Apellido
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Rol
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Activo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {user.name}
                                    </th>
                                    <td className="px-6 py-4">{user.surname}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 rounded-md text-xs font-medium ${user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.active ? (
                                            <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                                Activo
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                                Inactivo
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserList
