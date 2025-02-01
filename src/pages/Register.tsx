import { ChangeEvent, FormEvent, useState } from 'react'
import { registerUser } from '../services/userServices'

function Register() {

  const [form, setForm] = useState(
    {
      name: '',
      email: '',
      password: ''
    }
  )

  const [message, setMessage] = useState('')
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // mensaje por el post al api del backend
    try {
      await registerUser(form.name, form.email, form.password)
      console.log('Register successfull')
      setMessage('Register successfull')
      // redirigir a otra pagina (ofertas)
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Error desconocido'
      setMessage(msg)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setForm({ ...form, [name]: value, })

  }
  return (

    <div className="w-full max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="floating_first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
          <input type="text" name='name' value={form.name} onChange={handleChange} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder=" " required />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="floating_first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input type="email" name='email' value={form.email} onChange={handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder=" " required />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="floating_first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
          <input type="password" name='password' value={form.password} onChange={handleChange} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder=" " required />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrarse</button>
        {message}
      </form>
    </div>

  )
}

export default Register