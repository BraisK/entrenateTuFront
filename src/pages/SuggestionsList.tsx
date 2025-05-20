import { useEffect, useState } from "react"
import { SuggestionService } from "../services/suggestionService"
import { UserService } from "../services/userServices"
import type Suggestion from "../models/Suggestion"
import type User from "../models/User"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

function SuggestionsList() {
  const { user, isAdmin, isAuthenticated } = useAuth()

  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [users, setUsers] = useState<Record<number, User>>({})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Cargar sugerencias
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
          userSuggestions = allSuggestions.filter((suggestion: Suggestion) => suggestion.idUserCreator === user?.id)
        }
        setSuggestions(userSuggestions)

        // Si es admin, cargar información de usuarios
        if (isAdmin && userSuggestions.length > 0) {
          //const userIds = [...new Set(userSuggestions.map((s: Suggestion) => s.idUserCreator))]

          // Cargar usuarios (esto depende de tu API)
          try {
            const allUsers = await UserService.getAll()
            const usersMap: Record<number, User> = {}

            allUsers.forEach((user: User) => {
              usersMap[user.id] = user
            })

            setUsers(usersMap)
          } catch (error) {
            console.error("Error al cargar usuarios:", error)
          }
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : "Error desconocido"
        setError(msg)
      } finally {
        setLoading(false)
      }
    }

    call()
  }, [isAdmin, isAuthenticated, user])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center mb-8 relative">
        <h1 className="text-2xl font-bold text-gray-800">Listado de Sugerencias</h1>
        <Link
          to="/suggestions/new"
          className="absolute right-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Nueva sugerencia
        </Link>
      </div>

      {loading && <p className="text-center text-gray-700">Cargando...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {suggestions?.length === 0 && !loading && (
        <p className="text-center text-gray-700">No tienes ninguna sugerencia</p>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {suggestions?.map((suggestion) => (
          <div
            key={suggestion.id}
            className="w-full max-w-md bg-white rounded-md shadow-sm overflow-hidden"
            style={{ borderLeft: suggestion.active ? "4px solid #22c55e" : "4px solid #ef4444" }}
          >
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{suggestion.title}</h2>
              <p className="text-gray-600 mb-4">{suggestion.description}</p>

              <div className="text-sm text-gray-500">
                <div className="flex mb-1">
                  <span className="w-24">Estado:</span>
                  <span className={suggestion.active ? "text-green-600" : "text-red-600"}>
                    {suggestion.active ? "Activa" : "Inactiva"}
                  </span>
                </div>

                <div className="flex mb-1">
                  <span className="w-24">Publicada:</span>
                  <span>{new Date(suggestion.published).toLocaleDateString()}</span>
                </div>

                <div className="flex mb-1">
                  <span className="w-24">Expira:</span>
                  <span>{new Date(suggestion.expired).toLocaleDateString()}</span>
                </div>

                {isAdmin && (
                  <div className="flex">
                    <span className="w-24">Creada por:</span>
                    <span className="text-blue-600">
                      {users[suggestion.idUserCreator]
                        ? users[suggestion.idUserCreator].email
                        : `Usuario ID: ${suggestion.idUserCreator}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SuggestionsList
