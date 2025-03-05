import { ChangeEvent, useEffect, useState } from "react"
import { TrainService } from "../services/trainService"
import { Link, useSearchParams } from "react-router-dom"
import toast from "react-hot-toast"
import Train from "../models/Train"




function TrainList() {


  const [queryparams, setQueryParams] = useSearchParams()
  const searchTitle = queryparams.get('title') || ''


  const [trains, setTrains] = useState<Train[]>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //promesas porque async await y iseEffect no son compatibles
    TrainService.search(searchTitle)
      .then((trains) => setTrains(trains))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))


  }, [searchTitle])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setQueryParams(newTitle ? { title: newTitle } : {})
  }




  async function handleDelete(id: number) {
    if (!window.confirm('¿Estas seguro de que quieres borrar este entreno?')) return
    try {
      await TrainService.delete(id)
      //No llamo a la Api para recargar ofertas
      setTrains(trains?.filter(train => train.id != id))
      toast.success('Entreno borrado correctamente.')
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido")
    }

  }

  return (
    <div>
      <h1 className="dark:text-white">Listado de Entrenos</h1>
      <div>


        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filtrar por titulo:</label>
        <input id="title" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required name="title" value={searchTitle ?? ""} onChange={handleChange} />

        <Link to="/trains/new">Añadir nuevo entreno</Link>

      </div>

      {loading && <p className="dark:text-white">Loading....</p>}
      {error && <p className="dark:text-white">{error}</p>}
      {trains?.length === 0 && <p className="dark:text-white">No tienes ningun entreno </p>}
      <div className="flex flex-wrap flex-row gap-4 items-center justify-center">

        {trains?.map((train) => (
          <div key={train.id} className="">
            {train.active &&
              <div
                className="block max-w-sm p-6 bg-white border border-green-700 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-green-700 dark:hover:bg-gray-700">

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {train.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {train.description}
                </p>
                <div className="flex items-center justify-center gap-4 mt-4">

                  <Link className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to={`/trains/${train.id}`}>Ver</Link>
                  <Link className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to={`/trains/edit/${train.id}`}>Editar</Link>
                  <button className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleDelete(train.id)}>Borrar</button>
                </div>
              </div>
            }
            {!train.active &&
              <div
                className="block max-w-sm p-6 bg-white border border-red-700 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-red-700 dark:hover:bg-gray-700">

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {train.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {train.description}
                </p>
                <div className="flex items-center justify-center gap-4 mt-4">

                  <Link className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to={`/trains/${train.id}`}>Ver</Link>
                  <Link className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to={`/trains/edit/${train.id}`}>Editar</Link>
                  <button className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleDelete(train.id)}>Borrar</button>
                </div>
              </div>
            }
          </div>
        ))}
      </div>

    </div>
  )
}

export default TrainList