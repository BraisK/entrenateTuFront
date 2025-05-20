import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { TrainService } from "../services/trainService"
import Train from "../models/Train"
import { StarRating } from "../components/StarRating"
import { Calendar, Clock, CheckCircle, XCircle, ArrowLeft } from "lucide-react"

function TrainDetail() {
    const { id } = useParams()
    const [train, setTrain] = useState<Train>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        TrainService.getById(Number(id))
            .then(setTrain)
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Cargando detalles del entreno...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-lg font-medium text-red-800">Error al cargar el entreno</p>
                            <p className="text-sm text-red-700 mt-1">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!train) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-lg font-medium text-yellow-800">Entreno no encontrado</p>
                            <p className="text-sm text-yellow-700 mt-1">
                                No se ha podido encontrar el entreno solicitado. Puede que haya sido eliminado o no exista.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div
                className={`bg-white rounded-xl shadow-sm overflow-hidden ${train.active ? "border-2 border-green-500" : "border-2 border-red-500"
                    }`}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-800">{train.title}</h1>
                        <div
                            className={`px-3 py-1 rounded-full text-sm font-medium ${train.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                        >
                            {train.active ? (
                                <div className="flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Activo
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Inactivo
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <p className="text-lg text-gray-700">{train.description}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Valoración</h2>
                        <StarRating idTrain={Number(id)} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                                <h3 className="text-md font-medium text-gray-800">Fecha de publicación</h3>
                            </div>
                            <p className="text-gray-700">{new Date(train.published).toLocaleString()}</p>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                                <h3 className="text-md font-medium text-gray-800">Fecha de finalización</h3>
                            </div>
                            <p className="text-gray-700">{new Date(train.expired).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex justify-end mt-8">
                        <button
                            type="button"
                            onClick={() => navigate("/trains")}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Volver
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrainDetail
