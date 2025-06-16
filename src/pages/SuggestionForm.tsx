"use client"

import { type FormEvent, useEffect, useState } from "react"
import useFormHook from "../components/FormHook"
import type Suggestion from "../models/Suggestion"
import { SuggestionService } from "../services/suggestionService"
import { useNavigate, useParams } from "react-router-dom"
import { Temporal } from "temporal-polyfill"
import toast from "react-hot-toast"

function SuggestionForm() {
    const now = Temporal.Now.plainDateTimeISO().toString().slice(0, 16)
    const ThreeMonthsLater = Temporal.Now.plainDateTimeISO().add({ months: 3 }).toString().slice(0, 16)

    const { datosForm, handleChange, handleChangeCheckbox, setDatosForm } = useFormHook<Partial<Suggestion>>({
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
            SuggestionService.getById(Number(id))
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
            if (id) SuggestionService.update(Number(id), formData)
            else SuggestionService.create(formData)
            navigate("/")
            toast.success("Sugerencia guardada correctamente")
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error desconocido")
            toast.error("Error al guardar la sugerencia")
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <p className="text-center text-gray-700 p-4">Cargando...</p>

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-md shadow-md p-6">

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                            Título
                        </label>
                        <input
                            id="title"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Título de la sugerencia"
                            required
                            name="title"
                            value={datosForm.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Describe tu sugerencia..."
                            required
                            name="description"
                            value={datosForm.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        <div>
                            <label htmlFor="published" className="block mb-2 text-sm font-medium text-gray-700">
                                Fecha de publicación
                            </label>
                            <input
                                type="datetime-local"
                                id="published"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                name="published"
                                value={datosForm.published}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="expired" className="block mb-2 text-sm font-medium text-gray-700">
                                Fecha de expiración
                            </label>
                            <input
                                type="datetime-local"
                                id="expired"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                name="expired"
                                value={datosForm.expired}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-5">
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
                                Sugerencia activa
                            </label>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            Las sugerencias activas serán visibles para todos los usuarios.
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SuggestionForm
