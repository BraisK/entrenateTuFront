"use client"

import { type FormEvent, useEffect, useState, useMemo } from "react"
import useFormHook from "../components/FormHook"
import type Train from "../models/Train"
import { TrainService } from "../services/trainService"
import { useNavigate, useParams } from "react-router-dom"
import { Temporal } from "temporal-polyfill"
import toast from "react-hot-toast"
import { Calendar, Clock, CheckCircle, Save, ArrowLeft, Plus, Trash2, Ruler } from "lucide-react"

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

function TrainForm() {
    const now = Temporal.Now.plainDateTimeISO().toString().slice(0, 16)
    const ThreeMonthsLater = Temporal.Now.plainDateTimeISO().add({ months: 3 }).toString().slice(0, 16)

    const { datosForm, handleChange, handleChangeCheckbox, setDatosForm } = useFormHook<Partial<Train>>({
        title: "",
        description: "",
        active: true,
        published: now,
        expired: ThreeMonthsLater,
    })

    // Estado para manejar las series de ejercicios
    const [series, setSeries] = useState<Series[]>([
        {
            count: 1,
            exercises: [{ repetitions: 1, distance: 100, unit: "m", style: "libre", notes: "" }],
        },
    ])

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const { id } = useParams()

    // Calcular totales de distancia
    const { totalMeters } = useMemo(() => {
        let meters = 0

        series.forEach((serie) => {
            serie.exercises.forEach((exercise) => {
                const totalDistance = exercise.repetitions * exercise.distance * serie.count
                if (exercise.unit === "m") {
                    meters += totalDistance
                }
            })
        })

        return { totalMeters: meters }
    }, [series])

    useEffect(() => {
        if (id) {
            TrainService.getById(Number(id))
                .then((data) => {
                    setDatosForm({
                        ...data,
                        published: new Date(data.published || "").toISOString().slice(0, 16),
                        expired: new Date(data.expired || "").toISOString().slice(0, 16),
                    })

                    // Si hay descripción, intentamos parsearla para convertirla en series
                    if (data.description) {
                        try {
                            // Intentamos parsear la descripción como JSON
                            const parsedSeries = JSON.parse(data.description)
                            if (Array.isArray(parsedSeries)) {
                                setSeries(parsedSeries)
                            } else {
                                // Si no es un array, mantenemos la descripción como está
                                // y dejamos las series por defecto
                            }
                        } catch (e) {
                            // Si no se puede parsear como JSON, asumimos que es texto plano
                            // y dejamos las series por defecto
                            console.error("Error al parsear la descripción:", e)
                        }
                    }
                })
                .catch((error: Error) => setError(error.message))
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [id, setDatosForm])

    // Función para generar la descripción a partir de las series
    const generateDescription = (): string => {
        try {
            return JSON.stringify(series)
        } catch (e) {
            return e instanceof Error ? e.message : "Error al generar descripción"
        }
    }

    // Función para formatear las series como texto legible
    const formatSeriesAsText = (): string => {
        return series
            .map((serie) => {
                const exercisesText = serie.exercises
                    .map((ex) => `${ex.repetitions}x${ex.distance} ${ex.unit} ${ex.style}${ex.notes ? ` (${ex.notes})` : ""}`)
                    .join(", ")
                return `${serie.count} series de: ${exercisesText}`
            })
            .join("; ")
    }

    // Funciones para manejar las series y ejercicios
    const addSeries = () => {
        setSeries([
            ...series,
            {
                count: 1,
                exercises: [{ repetitions: 1, distance: 100, unit: "m", style: "libre", notes: "" }],
            },
        ])
    }

    const removeSeries = (seriesIndex: number) => {
        setSeries(series.filter((_, index) => index !== seriesIndex))
    }

    const updateSeriesCount = (seriesIndex: number, count: number) => {
        const newSeries = [...series]
        newSeries[seriesIndex].count = count
        setSeries(newSeries)
    }

    const addExercise = (seriesIndex: number) => {
        const newSeries = [...series]
        newSeries[seriesIndex].exercises.push({
            repetitions: 1,
            distance: 100,
            unit: "m",
            style: "libre",
            notes: "",
        })
        setSeries(newSeries)
    }

    const removeExercise = (seriesIndex: number, exerciseIndex: number) => {
        const newSeries = [...series]
        newSeries[seriesIndex].exercises = newSeries[seriesIndex].exercises.filter((_, index) => index !== exerciseIndex)
        setSeries(newSeries)
    }

    const updateExercise = <K extends keyof Exercise>(
        seriesIndex: number,
        exerciseIndex: number,
        field: K,
        value: Exercise[K]
    ) => {
        const newSeries = [...series];
        newSeries[seriesIndex].exercises[exerciseIndex][field] = value;
        setSeries(newSeries);
    };

    const calculateSeriesSubtotal = (serie: Series): { distance: number; unit: string } => {
        if (serie.exercises.length === 0) return { distance: 0, unit: "m" }

        const distance = serie.exercises.reduce((total, ex) => {
            if (ex.unit === "m") {
                return total + ex.repetitions * ex.distance * serie.count
            }
            return total
        }, 0)

        return { distance, unit: "m" }
    }


    const handleSubmit = (e: FormEvent) => {
        try {
            e.preventDefault()

            // Generamos la descripción a partir de las series
            const formData = {
                ...datosForm,
                description: generateDescription(), // Guardamos las series como JSON en el campo description
                published: new Date(datosForm.published || "").toISOString(),
                expired: new Date(datosForm.expired || "").toISOString(),
            }

            if (id) TrainService.update(Number(id), formData)
            else TrainService.create(formData)

            navigate("/trains")
            toast.success("Entreno guardado correctamente")
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error desconocido")
            toast.error("Error al guardar el entreno")
        } finally {
            setLoading(false)
        }
    }

    if (loading)
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Cargando formulario...</p>
            </div>
        )

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">{id ? "Editar entreno" : "Nuevo entreno"}</h1>
                        <button
                            type="button"
                            onClick={() => navigate("/trains")}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Volver
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                                    Título
                                </label>
                                <input
                                    id="title"
                                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Título del entreno"
                                    required
                                    name="title"
                                    value={datosForm.title}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Mostrar el conteo total de metros/yardas */}
                            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
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

                            {/* Sección de series de ejercicios */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-medium text-gray-700">Series de ejercicios</label>
                                    <button
                                        type="button"
                                        onClick={addSeries}
                                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                                    >
                                        <Plus className="w-3 h-3 mr-1" />
                                        Añadir serie
                                    </button>
                                </div>

                                {/* Vista previa de la descripción */}
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <p className="text-sm text-gray-700 font-medium mb-1">Vista previa:</p>
                                    <p className="text-sm text-gray-600">{formatSeriesAsText()}</p>
                                </div>

                                {/* Series */}
                                <div className="space-y-6">
                                    {series.map((serie, seriesIndex) => {
                                        // Calcular subtotal para esta serie
                                        const subtotal = calculateSeriesSubtotal(serie)

                                        return (
                                            <div key={seriesIndex} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                                <div className="flex justify-between items-center mb-3">
                                                    <div className="flex items-center">
                                                        <label className="block text-sm font-medium text-gray-700 mr-2">
                                                            Serie {seriesIndex + 1}:
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            className="w-16 bg-white border border-gray-300 text-gray-700 text-sm rounded focus:ring-blue-500 focus:border-blue-500 p-1"
                                                            value={serie.count}
                                                            onChange={(e) => updateSeriesCount(seriesIndex, Number.parseInt(e.target.value) || 1)}
                                                        />
                                                        <span className="ml-2 text-sm text-gray-700">series</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="text-xs text-gray-500 mr-3">
                                                            Subtotal: {subtotal.distance} m
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSeries(seriesIndex)}
                                                            className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600"
                                                        >
                                                            <Trash2 className="w-3 h-3 mr-1" />
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Ejercicios */}
                                                <div className="space-y-3">
                                                    {serie.exercises.map((exercise, exerciseIndex) => (
                                                        <div key={exerciseIndex} className="bg-white p-3 rounded border border-gray-200">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="text-sm font-medium text-gray-700">Ejercicio {exerciseIndex + 1}</span>
                                                                <div className="flex items-center">
                                                                    <span className="text-xs text-gray-500 mr-2">
                                                                        Total: {exercise.repetitions * exercise.distance} {exercise.unit}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeExercise(seriesIndex, exerciseIndex)}
                                                                        className="inline-flex items-center px-1.5 py-0.5 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600"
                                                                    >
                                                                        <Trash2 className="w-3 h-3 mr-1" />
                                                                        Eliminar
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                                                <div>
                                                                    <label className="block text-xs text-gray-600 mb-1">Repeticiones</label>
                                                                    <input
                                                                        type="number"
                                                                        min="1"
                                                                        className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded focus:ring-blue-500 focus:border-blue-500 p-1.5"
                                                                        value={exercise.repetitions}
                                                                        onChange={(e) =>
                                                                            updateExercise(
                                                                                seriesIndex,
                                                                                exerciseIndex,
                                                                                "repetitions",
                                                                                Number.parseInt(e.target.value) || 1,
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs text-gray-600 mb-1">Distancia</label>
                                                                    <input
                                                                        type="number"
                                                                        min="1"
                                                                        className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded focus:ring-blue-500 focus:border-blue-500 p-1.5"
                                                                        value={exercise.distance}
                                                                        onChange={(e) =>
                                                                            updateExercise(
                                                                                seriesIndex,
                                                                                exerciseIndex,
                                                                                "distance",
                                                                                Number.parseInt(e.target.value) || 1,
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs text-gray-600 mb-1">Unidad</label>
                                                                    <select
                                                                        className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded focus:ring-blue-500 focus:border-blue-500 p-1.5"
                                                                        value={exercise.unit}
                                                                        onChange={(e) => updateExercise(seriesIndex, exerciseIndex, "unit", e.target.value)}
                                                                    >
                                                                        <option value="m">metros</option>
                                                                        <option value="ciclos">ciclos</option>
                                                                    </select>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs text-gray-600 mb-1">Estilo</label>
                                                                    <select
                                                                        className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded focus:ring-blue-500 focus:border-blue-500 p-1.5"
                                                                        value={exercise.style}
                                                                        onChange={(e) =>
                                                                            updateExercise(seriesIndex, exerciseIndex, "style", e.target.value)
                                                                        }
                                                                    >
                                                                        <option value="libre">Libre</option>
                                                                        <option value="espalda">Espalda</option>
                                                                        <option value="braza">Braza</option>
                                                                        <option value="mariposa">Mariposa</option>
                                                                        <option value="estilos">Estilos</option>
                                                                        <option value="suave">Suave</option>
                                                                        <option value="técnica">Técnica</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-span-2 md:col-span-4">
                                                                    <label className="block text-xs text-gray-600 mb-1">Notas adicionales</label>
                                                                    <input
                                                                        type="text"
                                                                        className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded focus:ring-blue-500 focus:border-blue-500 p-1.5"
                                                                        value={exercise.notes}
                                                                        placeholder="Opcional: pies, brazos, con material, etc."
                                                                        onChange={(e) =>
                                                                            updateExercise(seriesIndex, exerciseIndex, "notes", e.target.value)
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    <button
                                                        type="button"
                                                        onClick={() => addExercise(seriesIndex)}
                                                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600 mt-2"
                                                    >
                                                        <Plus className="w-3 h-3 mr-1" />
                                                        Añadir ejercicio
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="published" className="block mb-2 text-sm font-medium text-gray-700">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                                            Fecha de publicación
                                        </div>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="published"
                                        className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        name="published"
                                        value={datosForm.published}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="expired" className="block mb-2 text-sm font-medium text-gray-700">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1 text-blue-500" />
                                            Fecha de finalización
                                        </div>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="expired"
                                        className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        name="expired"
                                        value={datosForm.expired}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="active"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                        name="publico"
                                        checked={datosForm.publico}
                                        onChange={handleChangeCheckbox}
                                    />
                                    <label htmlFor="publico" className="ml-2 text-sm font-medium text-gray-700">
                                        <div className="flex items-center">
                                            <CheckCircle className="w-4 h-4 mr-1 text-blue-500" />
                                            Entreno público
                                        </div>
                                    </label>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    Los entrenos públicos serán visibles para todos los usuarios.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end">

                            <button
                                type="submit"
                                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-colors"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Guardar entreno
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TrainForm
