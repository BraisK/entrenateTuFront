import { useEffect, useState } from "react"
import { SuggestionService } from "../services/suggestionService"
import Suggestion from "../models/Suggestion"
import { useAuth } from "../contexts/AuthContext"




function SuggestionsList() {


  const { user, isAdmin, isAuthenticated } = useAuth()

  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function call() {
      if (!isAuthenticated) {
        setSuggestions([])
        setLoading(false)
        return
      }

      try {
        const allSuggestions = await SuggestionService.getAll()

        let userSuggestions = allSuggestions
        if (!isAdmin) {
          userSuggestions = allSuggestions.filter((suggestion: Suggestion) => suggestion.idUserCreator === user?.id);
        }
        setSuggestions(userSuggestions)
      } catch (error) {
        const msg = error instanceof Error ? error.message : "Error desconocido"
        setError(msg)
      } finally {
        setLoading(false)
      }
    }

    call();
  }, [isAdmin, isAuthenticated, user]);

  return (
    <div>
      <h1 className="dark:text-white">Listado de Sugerencias</h1>


      {loading && <p className="dark:text-white">Loading....</p>}
      {error && <p className="dark:text-white">{error}</p>}
      {suggestions?.length === 0 && <p className="dark:text-white">No tienes ningun sugerencia </p>}
      <div className="flex flex-wrap flex-row gap-4 items-center justify-center">

        {suggestions?.map((suggestion) => (
          <div key={suggestion.id} className="">
            {suggestion.active &&
              <div
                className="block max-w-sm p-6 bg-white border border-green-700 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-green-700 dark:hover:bg-gray-700">

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {suggestion.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {suggestion.description}
                </p>
              </div>
            }
            {!suggestion.active &&
              <div
                className="block max-w-sm p-6 bg-white border border-red-700 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-red-700 dark:hover:bg-gray-700">

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {suggestion.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {suggestion.description}
                </p>
              </div>
            }
          </div>
        ))}
      </div>

    </div>
  )
}

export default SuggestionsList