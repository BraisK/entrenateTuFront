import { ChangeEvent, FormEvent, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState(
    {
      email: '',
      password: ''
    }
  )
  const [message, setMessage] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // mensaje por post al api del backend
    try {
      //await AuthService.loginUser(form.email, form.password) // backend
      await login(form.email, form.password) // llamada al contexto
      setMessage('login successfull')
      navigate("/");
      // Redirigir a otra pagina (ofertas)
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
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Inicia sesion</h5>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input type="email" value={form.email} onChange={handleChange}  name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
          <input type="password" value={form.password} onChange={handleChange}  name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>            
        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          ¿No estás registrado? <a href="/register" className="text-blue-700 hover:underline dark:text-blue-500">Crear cuenta</a>
        </div>
      </form>
      {message}
    </div>

  )
}

export default Login