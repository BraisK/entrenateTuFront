"use client"

import { type ChangeEvent, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Users, Search, Mail, Shield, CheckCircle, XCircle } from "lucide-react"
import { UserService } from "../services/userServices"

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

    const getRoleColor = (role: string) => {
        switch (role) {
            case "admin":
                return "bg-purple-100 text-purple-800 border-purple-200"
            case "premium":
                return "bg-yellow-100 text-yellow-700 border-yellow-200"
            default:
                return "bg-blue-100 text-blue-800 border-blue-200"
        }
    }

    const getRoleIcon = (role: string) => {
        switch (role) {
            case "admin":
                return <Shield className="w-3 h-3" />
            case "premium":
                return <Shield className="w-3 h-3" />
            default:
                return <Shield className="w-3 h-3" />
        }
    }

    // Solo mostramos el spinner de carga en la carga inicial
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-12">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                        <p className="mt-4 text-sm sm:text-base text-gray-600">Cargando usuarios...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="flex items-center">
                        <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mr-2 sm:mr-3" />
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Listado de Usuarios</h1>
                    </div>
                    <div className="sm:ml-auto">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {users.length} usuario{users.length !== 1 ? "s" : ""}
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                        Filtrar por email:
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </div>
                        <input
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-9 sm:pl-10 p-2.5 sm:p-3"
                            placeholder="Buscar por email..."
                            name="email"
                            value={searchEmail}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {message && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                        <p className="text-sm text-red-700">{message}</p>
                    </div>
                )}

                {users.length === 0 && !loading && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
                        <p className="text-sm text-blue-700">
                            {searchEmail ? "No se encontraron usuarios con el email especificado." : "No hay usuarios registrados."}
                        </p>
                    </div>
                )}

                <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-medium">
                                        Nombre
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium">
                                        Apellido
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium">
                                        Rol
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-medium">
                                        Estado
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {user.name}
                                        </th>
                                        <td className="px-6 py-4 text-gray-700">{user.surname}</td>
                                        <td className="px-6 py-4 text-gray-700">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}
                                            >
                                                {getRoleIcon(user.role)}
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.active ? (
                                                <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full border border-green-200">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Activo
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded-full border border-red-200">
                                                    <XCircle className="w-3 h-3" />
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

                <div className="lg:hidden space-y-4">
                    {users.map((user) => (
                        <div key={user.id} className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                                            {user.name} {user.surname}
                                        </h3>
                                        <span
                                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}
                                        >
                                            {getRoleIcon(user.role)}
                                            {user.role}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                        <Mail className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate">{user.email}</span>
                                    </div>
                                </div>

                                <div className="flex sm:flex-col items-center sm:items-end gap-2">
                                    {user.active ? (
                                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full border border-green-200">
                                            <CheckCircle className="w-3 h-3" />
                                            Activo
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded-full border border-red-200">
                                            <XCircle className="w-3 h-3" />
                                            Inactivo
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-gray-100 sm:hidden">
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>ID: {user.id}</span>
                                    <span>Notificaciones: {user.accepNotifications ? "Sí" : "No"}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {users.length === 0 && !loading && (
                    <div className="lg:hidden text-center py-12">
                        <Users className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No hay usuarios</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {searchEmail ? "Intenta con un email diferente" : "Comienza agregando usuarios al sistema"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserList
