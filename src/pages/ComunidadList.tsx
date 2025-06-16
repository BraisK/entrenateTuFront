import { type ChangeEvent, useEffect, useState } from "react"
import { TrainService } from "../services/trainService"
import { Link, useSearchParams } from "react-router-dom"
/*import toast from "react-hot-toast"*/
import type Train from "../models/Train"
import { Search, Eye, UserIcon, Calendar } from "lucide-react"
import { StarRating } from "../components/StarRating"
import { useAuth } from "../contexts/AuthContext"
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

function ComunidadList() {
  const [queryparams, setQueryParams] = useSearchParams()
  const searchTitle = queryparams.get("title") || ""
  const { user, isAdmin } = useAuth()
  const [trains, setTrains] = useState<Train[]>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    TrainService.comunidad(searchTitle)
      .then((trains) => setTrains(trains))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }, [searchTitle])



  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setQueryParams(newTitle ? { title: newTitle } : {})
  }

  /*async function handleDelete(id: number) {
    if (!window.confirm("¿Estás seguro de que quieres ocultar este entreno (ponerlo como no público)?")) return;

    try {
      await TrainService.update(id, { publico: false }); // Cambia el valor de `publico` a false

      // Opcional: actualiza el estado local para reflejar el cambio
      setTrains(trains?.map((train) =>
        train.id === id ? { ...train, publico: false } : train
      ));

      toast.success("Entreno ocultado correctamente.");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    }
  }*/


  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Comunidad</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
            Filtrar por título:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Buscar entrenos..."
              name="title"
              value={searchTitle ?? ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Cargando entrenamientos...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-md">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {trains?.length === 0 && !loading && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">No tienes ningún entreno. ¡Añade uno nuevo para comenzar!</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trains?.map((train) => (
          <div key={train.id} className="group">
            <div
              className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col
              ${train.active ? "border-2 border-green-500" : "border-2 border-red-500"}`}
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{train.title}</h3>
                  {!train.active && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Inactivo
                    </span>
                  )}
                </div>

                {(() => {
                  try {
                    const parsedSeries: Series[] = JSON.parse(train.description ?? "")
                    if (!Array.isArray(parsedSeries)) throw new Error()

                    let totalMeters = 0

                    parsedSeries.forEach((serie) => {
                      serie.exercises.forEach((exercise) => {
                        const total = exercise.repetitions * exercise.distance * serie.count
                        if (exercise.unit === "m") {
                          totalMeters += total
                        } else if (exercise.unit === "yd") {
                          totalMeters += total * 0.9144 // 1 yd = 0.9144 m
                        }
                      })
                    })

                    return (
                      <div className="text-gray-600 mb-4 space-y-2">
                        {parsedSeries.map((serie, seriesIndex) => (
                          <div key={seriesIndex}>
                            <p className="font-medium text-gray-700">
                              Bloque {seriesIndex + 1}: {serie.count} {serie.count === 1 ? "Serie" : "Series"}
                            </p>
                            <ul className="text-sm pl-4 list-disc">
                              {serie.exercises.map((exercise, exerciseIndex) => (
                                <li key={exerciseIndex}>
                                  {exercise.repetitions}x{exercise.distance} {exercise.unit} {exercise.style}
                                  {exercise.notes && <span className="text-gray-500"> ({exercise.notes})</span>}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        <p className="mt-2 text-sm font-semibold text-blue-700">
                          Total: {Math.round(totalMeters)} m
                        </p>
                      </div>
                    )
                  } catch {
                    return <p className="text-gray-600 mb-4">{train.description}</p>
                  }
                })()}


                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4 mr-1.5 text-blue-500" />
                  <span>Publicado: {formatDate(train.published)}</span>
                </div>

                {train.userCreator && (
                  <div className="mt-4 flex items-center bg-blue-50 p-2 rounded-lg">
                    <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                      <UserIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {train.userCreator.name} {train.userCreator.surname || ""}
                      </p>
                      <p className="text-xs text-gray-500">{train.userCreator.email}</p>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">Valoración</h2>
                  <StarRating idTrain={Number(train.id)} />
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <div className="flex items-center justify-start space-x-3">
                  <Link
                    to={`/trains/${train.id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Link>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComunidadList
