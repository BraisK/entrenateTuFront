"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TrainService } from "../services/trainService"
import type Train from "../models/Train"
import { StarRating } from "../components/StarRating"
import { Calendar, Clock, ArrowLeft, Ruler } from "lucide-react"

// Interfaces para el manejo de series de ejercicios
interface Exercise {
    repetitions: number
    distance: number
    unit: string
    style: string
    notes: string
}

interface Series {
    count: number
    exercises: Exercise[]
}

function TrainDetail() {
    const { id } = useParams()
    const [train, setTrain] = useState<Train>()
    const [series, setSeries] = useState<Series[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [totalMeters, setTotalMeters] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        TrainService.getById(Number(id))
            .then((data) => {
                setTrain(data)

                // Intentamos parsear la descripción como JSON para obtener las series
                if (data.description) {
                    try {
                        const parsedSeries: Series[] = JSON.parse(data.description)
                        if (Array.isArray(parsedSeries)) {
                            setSeries(parsedSeries)

                            // Calcular el total de metros y yardas
                            let meters = 0

                            parsedSeries.forEach((serie) => {
                                serie.exercises.forEach((exercise) => {
                                    const totalDistance = exercise.repetitions * exercise.distance * serie.count
                                    if (exercise.unit === "m") {
                                        meters += totalDistance
                                    }
                                })
                            })

                            setTotalMeters(meters)
                        }
                    } catch (e) {
                        // Si no se puede parsear, dejamos las series vacías
                        console.error("Error al parsear las series:", e)
                    }
                }
            })
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
                        <button
                            type="button"
                            onClick={() => navigate("/trains")}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Volver
                        </button>
                    </div>

                    {/* Mostrar el conteo total de metros/yardas */}
                    {series.length > 0 && (
                        <div className="bg-green-50 rounded-lg p-4 mb-6 border border-green-100">
                            <div className="flex items-center mb-2">
                                <Ruler className="w-5 h-5 text-green-600 mr-2" />
                                <h3 className="text-md font-medium text-gray-800">Distancia total</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {totalMeters > 0 && (
                                    <div className="bg-white px-3 py-1.5 rounded-md border border-green-200">
                                        <span className="font-semibold text-gray-700">{totalMeters.toLocaleString()}</span>
                                        <span className="text-gray-600 ml-1">metros</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Mostrar las series de ejercicios */}
                    {series.length > 0 ? (
                        <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Descripción del entreno</h2>

                            {series.map((serie, seriesIndex) => (
                                <div key={seriesIndex} className="mb-4 last:mb-0">
                                    <div className="bg-white p-3 rounded-lg border border-gray-200 mb-2">
                                        <p className="font-medium text-gray-700">
                                            Bloque {seriesIndex + 1}: {serie.count} {serie.count === 1 ? "Serie" : "Series"}
                                        </p>

                                        <ul className="mt-2 space-y-1">
                                            {serie.exercises.map((exercise, exerciseIndex) => (
                                                <li key={exerciseIndex} className="text-gray-600 flex items-center">
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                                    {exercise.repetitions}x{exercise.distance} {exercise.unit} {exercise.style}
                                                    {exercise.notes && <span className="text-gray-500 ml-1">({exercise.notes})</span>}
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Mostrar el subtotal de metros por serie */}
                                        <div className="mt-2 text-xs text-gray-500 flex justify-end">
                                            <span>
                                                Subtotal:{" "}
                                                {serie.exercises.reduce((total, ex) => {
                                                    if (ex.unit === "m") {
                                                        return total + ex.repetitions * ex.distance * serie.count
                                                    }
                                                    return total
                                                }, 0)}{" "}
                                                m
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <p className="text-lg text-gray-700">{train.description}</p>
                        </div>
                    )}

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
                </div>
            </div>
        </div>
    )
}

export default TrainDetail
