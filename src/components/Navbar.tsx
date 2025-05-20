"use client"

import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Collapse } from "flowbite"
import { useRef } from "react"

function Navbar() {
    const navigate = useNavigate()
    const { user, isAdmin, isAuthenticated, logout } = useAuth()
    const menuHamburguesa = useRef(null)
    const menuHamburguesaTriger = useRef(null)
    const userLogured = () => {
        if (!user) return ""
        if (isAuthenticated && user?.role === "admin") return "Eres admin"
        if (isAuthenticated) return "Eres user"
    }

    const handleCollapse = () => {
        const collapse = new Collapse(menuHamburguesa.current, menuHamburguesaTriger.current)
        collapse.toggle()
        console.log("click")
    }
    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <nav className="bg-white border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/src/assets/logo.png" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">EntrenateTu</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {!isAuthenticated && (
                        <li>
                            <Link
                                to="/login"
                                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                            >
                                Login
                            </Link>
                        </li>
                    )}
                    {isAuthenticated && (
                        <button
                            className="block py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </button>
                    )}

                    <button
                        ref={menuHamburguesaTriger}
                        onClick={handleCollapse}
                        data-collapse-toggle="navbar"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-ky"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div ref={menuHamburguesa} id="targetEl" className="hidden"></div>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <Link
                                to="/"
                                className="block py-2 px-3 text-blue-500 bg-transparent rounded-sm md:bg-transparent md:text-blue-500 md:p-0"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>

                        {!isAuthenticated && (
                            <li>
                                <Link
                                    to="/register"
                                    className="block py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                                >
                                    Registro
                                </Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <li>
                                <Link
                                    to="/profile"
                                    className="block py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                                >
                                    Profile
                                </Link>
                            </li>
                        )}
                        {isAdmin && (
                            <li>
                                <Link
                                    to="/userList"
                                    className="block py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                                >
                                    Usuarios
                                </Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <li>
                                <Link
                                    to="/trains"
                                    className="block py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                                >
                                    Entrenos
                                </Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <li>
                                <Link
                                    to="/suggestions"
                                    className="block py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                                >
                                    Sugerencias
                                </Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <span className="text-gray-700">
                                <li>
                                    <Link
                                        to="/suggestions/new"
                                        className="block py-2 px-3 text-gray-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0"
                                    >
                                        Nueva sugerencia
                                    </Link>
                                </li>
                            </span>
                        )}
                        <span className="text-gray-700">
                            {user?.email} {userLogured()}
                        </span>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar