import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { TrainService } from "../services/trainService"
import Train from "../models/Train"

function TrainDetail() {
    const { id } = useParams()
    const [train, setTrain] = useState<Train>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)



    useEffect(() => {
        setLoading(true)
        //if(!id) return
        TrainService
            .getById(Number(id))
            .then(setTrain)
            .catch(error => setError(error.message))
            .finally(() => setLoading(false))
    }, [id])




    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!train) return <div>Entreno no encontrado</div>

    return (
        <div className="text-white">
            <div className="text-4xl font-extrabold dark:text-white">{train.title}</div>
            <div className="text-2xl font-extrabold dark:text-white">{train.description}</div>
            <div>Activo: {train.active ? 'SI' : 'NO'}</div>
            <div>Fecha publicación: {new Date(train.published).toLocaleString()}</div>
            <div>Fecha finalización: {new Date(train.expired).toLocaleString()}</div>
        </div>
    )
}

export default TrainDetail