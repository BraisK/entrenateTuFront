"use client"

import type React from "react"
import { type ChangeEvent, type FormEvent, useState } from "react"
import { AuthService } from "../services/authServices"
import type User from "../models/User"
import toast from "react-hot-toast"
import { useNavigate, Link } from "react-router-dom"
import type ErrorMsgData from "../utils/ErrorMsgData"
import InputForm from "../components/InputForm"
import { UserIcon, Mail, Lock, Bell } from "lucide-react"

const Register: React.FC = () => {
  const [form, setForm] = useState<Partial<User>>({
    name: "",
    surname: "",
    email: "",
    password: "",
    accepNotifications: false,
  })
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    try {
      setLoading(true)
      setErrors({})

      e.preventDefault()

      await AuthService.registerUser(form)

      toast.success("Usuario registrado con éxito!")
      navigate("/login")
    } catch (error) {
      toast.error("Error al registrar el usuario.")

      if (Array.isArray(error)) {
        const errorObj: Record<string, string> = error?.reduce((acc: Record<string, string>, err: unknown) => {
          const errorDetail = err as ErrorMsgData
          acc[errorDetail.path] = errorDetail.msg
          return acc
        }, {})
        setErrors(errorObj)
      } else if (error instanceof Error) {
        const msg = error instanceof Error ? error.message : "Error desconocido"
        setErrors({ message: msg || "Error desconocido" })
      } else {
        setErrors({ message: (error as string) || "Error desconocido" })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target
    setForm({ ...form, [name]: checked })
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Registrando usuario...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-4">
          <h2 className="text-xl font-bold text-white text-center">Registro de usuario</h2>
        </div>

        <div className="p-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputForm
              text="Nombre"
              name="name"
              value={form.name || ""}
              handleChange={handleChange}
              error={errors.name}
              placeholder="Tu nombre"
              icon={<UserIcon size={18} />}
            />
            <InputForm
              text="Apellidos"
              name="surname"
              value={form.surname || ""}
              handleChange={handleChange}
              error={errors.surname}
              placeholder="Tus apellidos"
              icon={<UserIcon size={18} />}
            />
            <InputForm
              text="Email"
              name="email"
              type="email"
              value={form.email || ""}
              handleChange={handleChange}
              error={errors.email}
              placeholder="ejemplo@correo.com"
              icon={<Mail size={18} />}
            />
            <InputForm
              text="Contraseña"
              type="password"
              name="password"
              value={form.password || ""}
              handleChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              icon={<Lock size={18} />}
            />

            <div className="flex items-center bg-blue-50 p-3 rounded-lg border border-blue-100">
              <input
                id="acceptNotifications"
                name="accepNotifications"
                type="checkbox"
                checked={form.accepNotifications}
                onChange={handleChangeCheckbox}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex items-center ml-3">
                <Bell size={16} className="text-blue-500 mr-2" />
                <label htmlFor="acceptNotifications" className="text-sm font-medium text-gray-700">
                  Aceptas recibir notificaciones?
                </label>
              </div>
            </div>
            {errors.accepNotifications && <p className="text-sm text-red-600">{errors.accepNotifications}</p>}

            {errors && errors.message && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <p className="text-sm text-red-700">{errors.message}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-md"
            >
              Registrarse
            </button>

            <div className="text-center mt-4">
              <Link
                to="/login"
                className="text-sm text-blue-500 hover:text-blue-700 hover:underline transition-colors duration-200"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
