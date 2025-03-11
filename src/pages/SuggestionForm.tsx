import { FormEvent, useEffect, useState } from "react"
import useFormHook from "../components/FormHook"
import Suggestion from "../models/Suggestion"
import { SuggestionService } from "../services/suggestionService"
import { useNavigate, useParams } from "react-router-dom"
import { Temporal } from "temporal-polyfill"
import toast from "react-hot-toast"


function SuggestionForm() {

    const now = Temporal.Now.plainDateTimeISO().toString().slice(0, 16)
    const ThreeMonthsLater = Temporal.Now.plainDateTimeISO().add({ months: 3 }).toString().slice(0, 16)

    //partial Offer para ahorrarse el id
    //const ThreeMonthsLater=new Date().setMonth(new Date().getMonth()+3)
    const { datosForm, handleChange, handleChangeCheckbox, setDatosForm } = useFormHook<Partial<Suggestion>>({
        title: "",
        description: "",
        active: true,
        published: now,
        expired: ThreeMonthsLater
    })

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        if (id) {
            SuggestionService.getById(Number(id))
            .then((data) => setDatosForm({
                ...data,
                published: new Date(data.published || '').toISOString().slice(0, 16),
                expired: new Date(data.expired || '').toISOString().slice(0, 16),
            }))
            .catch((error: Error) => setError(error.message))
            .finally(() => setLoading(false))
        } else { setLoading(false) }
    }, [id, setDatosForm])


    const handleSubmit = (e: FormEvent) => {
        try {

            e.preventDefault()
            const formData = {
                ...datosForm,
                published: new Date(datosForm.published || '').toISOString(),
                expired: new Date(datosForm.expired || '').toISOString(),
            }
            if (id) SuggestionService.update(Number(id), formData)
            else SuggestionService.create(formData)
            navigate("/suggestions")
            toast.success('Sugerencia guardada correctamente')
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error desconocido")
            toast.error('Error al guardar la sugerencia')
        } finally {
            setLoading(false)
        }
    }


    if (loading) return <p>Loading...</p>//da fallos


    return (
        <>
            <div>
                <h1>Nueva Sugerencia</h1>
                <form onSubmit={handleSubmit} >
                    {error && <p>{error}</p>}
                    <div className="mb-5">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo</label>
                        <input id="title" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="name@flowbite.com" required name="title" value={datosForm.title} onChange={handleChange} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                        <input id="description" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required name="description" value={datosForm.description} onChange={handleChange} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="published" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Published</label>
                        <input type="datetime-local" id="pusblished" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" name="pusblished" value={datosForm.published} onChange={handleChange} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="expired" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiration</label>
                        <input type="datetime-local" id="expired" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" name="expired" value={datosForm.expired} onChange={handleChange} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="active" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiration</label>
                        <input type="checkbox" id="active" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" name="active" checked={datosForm.active} onChange={handleChangeCheckbox} />
                    </div>


                    <button>Guardar</button>


                </form>

            </div>

        </>
    )
}

export default SuggestionForm