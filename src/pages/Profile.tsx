import { useEffect, useState } from "react"
import { UserService } from "../services/userServices"
import type User from "../models/User"
import { UserCircle, Mail, UserCheck, BellRing } from "lucide-react"

function Profile() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        UserService.getProfile()
            .then(setUser)
            .catch((err) => {
                setError(err instanceof Error ? err.message : "Error desconocido")
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Cargando perfil de usuario...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-lg font-medium text-red-800">Error al cargar el perfil</p>
                            <p className="text-sm text-red-700 mt-1">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-lg font-medium text-yellow-800">Perfil no encontrado</p>
                            <p className="text-sm text-yellow-700 mt-1">
                                No se ha podido encontrar la información del perfil. Por favor, inicia sesión nuevamente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-50 to-sky-50 px-6 py-8 border-b border-gray-100">
                    <div className="flex flex-col items-center">
                        <div className="bg-blue-100 p-4 rounded-full mb-4">
                            <UserCircle className="h-16 w-16 text-blue-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {user.name} {user.surname || ""}
                        </h1>
                        <p className="text-gray-600 mt-1">{user.email}</p>
                        <div className="mt-4">
                            <span
                                className={`px-2 py-1 rounded-md text-xs font-medium
                                                    ${user.role === "admin" ? "bg-purple-100 text-purple-800" :
                                        user.role === "premium" ? "bg-yellow-100 text-yellow-700" :
                                            "bg-blue-100 text-blue-800"}
                                                `}
                            >
                                {user.role}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Información del perfil</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <UserCheck className="w-5 h-5 text-blue-500 mr-2" />
                                <h3 className="text-md font-medium text-gray-800">Estado de la cuenta</h3>
                            </div>
                            <div className="flex items-center mt-2">
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    <span className={`w-2 h-2 mr-1 rounded-full ${user.active ? "bg-green-500" : "bg-red-500"}`}></span>
                                    {user.active ? "Cuenta activa" : "Cuenta inactiva"}
                                </span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <BellRing className="w-5 h-5 text-blue-500 mr-2" />
                                <h3 className="text-md font-medium text-gray-800">Notificaciones</h3>
                            </div>
                            <div className="flex items-center mt-2">
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.accepNotifications ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                        }`}
                                >
                                    {user.accepNotifications ? "Notificaciones activadas" : "Notificaciones desactivadas"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Detalles de contacto</h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <Mail className="w-5 h-5 text-blue-500 mr-2" />
                                <h3 className="text-md font-medium text-gray-800">Correo electrónico</h3>
                            </div>
                            <p className="text-gray-700 ml-7">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
