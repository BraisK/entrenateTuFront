"use client"

import { type FormEvent, useEffect, useState } from "react"
import useFormHook from "../components/FormHook"
import type Train from "../models/Train"
import { TrainService } from "../services/trainService"
import { useNavigate, useParams } from "react-router-dom"
import { Temporal } from "temporal-polyfill"
import toast from "react-hot-toast"
import { Calendar, Clock, CheckCircle, Save, ArrowLeft } from "lucide-react"

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

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        if (id) {
            TrainService.getById(Number(id))
                .then((data) =>
                    setDatosForm({
                        ...data,
                        published: new Date(data.published || "").toISOString().slice(0, 16),
                        expired: new Date(data.expired || "").toISOString().slice(0, 16),
                    }),
                )
                .catch((error: Error) => setError(error.message))
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [id, setDatosForm])

    const handleSubmit = (e: FormEvent) => {
        try {
            e.preventDefault()
            const formData = {
                ...datosForm,
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

                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
                                    Descripción
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Describe el entreno..."
                                    required
                                    name="description"
                                    value={datosForm.description}
                                    onChange={handleChange}
                                />
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
                                        name="active"
                                        checked={datosForm.active}
                                        onChange={handleChangeCheckbox}
                                    />
                                    <label htmlFor="active" className="ml-2 text-sm font-medium text-gray-700">
                                        <div className="flex items-center">
                                            <CheckCircle className="w-4 h-4 mr-1 text-blue-500" />
                                            Entreno activo
                                        </div>
                                    </label>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    Los entrenos activos serán visibles para todos los usuarios.
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