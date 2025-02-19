import { ChangeEvent, useState } from 'react'



function useFormHook<T>(initialform: T) {

    //Estados
    const [datosForm, setDatosForm] = useState(initialform)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    //Control formulario

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        const { value, name } = e.target
        setDatosForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));

    }

    const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {

        const { checked, name } = e.target
        setDatosForm((prevForm) => ({
            ...prevForm,
            [name]: checked
        }));

    }

    const reset = () => { setDatosForm(initialform) }

    return { datosForm, handleChange, handleChangeCheckbox, setDatosForm, error, setError, loading, setLoading, reset }
}

export default useFormHook