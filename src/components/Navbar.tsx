"use client"

import {Link, useNavigate} from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { Home, UserPlus, User, Users, Dumbbell, Plus, LogOut, Waves, MessageSquare, Menu, X, ChevronDown,  Shield,} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

function Navbar() {
    const navigate = useNavigate()
    const { user, isAdmin, isAuthenticated, logout } = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false)
    const [isMobileAdminDropdownOpen, setIsMobileAdminDropdownOpen] = useState(false)
    const adminDropdownRef = useRef<HTMLDivElement>(null)

    const userLogured = () => {
        if (!user) return ""
        if (isAuthenticated && user?.role === "admin") return "Admin"
        if (isAuthenticated && user?.role === "premium") return "Premium"
        if (isAuthenticated && user?.role === "vip") return "VIP"
        if (isAuthenticated) return "Usuario"
    }

    const handleToggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const handleCloseMenu = () => {
        setIsMenuOpen(false)
        setIsMobileAdminDropdownOpen(false)
    }

    const handleLogout = () => {
        logout()
        setIsMenuOpen(false)
        setIsAdminDropdownOpen(false)
        navigate("/")
    }

    // Cerrar dropdown de admin al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target as Node)) {
                setIsAdminDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Cerrar menú al redimensionar ventana
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false)
                setIsMobileAdminDropdownOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Prevenir scroll cuando el menú está abierto
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isMenuOpen])

    const adminMenuItems = [
        { href: "/userList", icon: Users, label: "Usuarios" },
        { href: "/suggestions", icon: MessageSquare, label: "Sugerencias" },
    ]

    return (
        <>
            <nav className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 shadow-lg border-b border-blue-500/30 relative z-50">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0" onClick={handleCloseMenu}>
                            <div className="bg-white/25 backdrop-blur-md p-2 sm:p-3 rounded-full hover:bg-white/40 transition duration-300">
                                <Waves className="text-white w-5 h-5 sm:w-7 sm:h-7" />
                            </div>
                            <span className="text-white text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-wide select-none hover:text-blue-200 transition duration-300">
                                SwimTrack
                            </span>
                        </Link>

                        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-1 justify-center max-w-4xl mx-8">
                            <ul className="flex items-center space-x-2 xl:space-x-4 font-semibold text-white text-sm xl:text-base">
                                <li>
                                    <Link
                                        to="/"
                                        className="flex items-center space-x-2 hover:text-blue-200 rounded-md px-2 xl:px-3 py-2 transition-colors duration-200 whitespace-nowrap"
                                    >
                                        <Home className="w-4 h-4 xl:w-5 xl:h-5" />
                                        <span>Inicio</span>
                                    </Link>
                                </li>

                                {!isAuthenticated && (
                                    <li>
                                        <Link
                                            to="/register"
                                            className="flex items-center space-x-2 hover:text-blue-200 rounded-md px-2 xl:px-3 py-2 transition-colors duration-200 whitespace-nowrap"
                                        >
                                            <UserPlus className="w-4 h-4 xl:w-5 xl:h-5" />
                                            <span>Registro</span>
                                        </Link>
                                    </li>
                                )}

                                {isAuthenticated && (
                                    <>
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="flex items-center space-x-2 hover:text-blue-200 rounded-md px-2 xl:px-3 py-2 transition-colors duration-200 whitespace-nowrap"
                                            >
                                                <User className="w-4 h-4 xl:w-5 xl:h-5" />
                                                <span>Perfil</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/trains"
                                                className="flex items-center space-x-2 hover:text-blue-200 rounded-md px-2 xl:px-3 py-2 transition-colors duration-200 whitespace-nowrap"
                                            >
                                                <Dumbbell className="w-4 h-4 xl:w-5 xl:h-5" />
                                                <span>Entrenamientos</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/comunidad"
                                                className="flex items-center space-x-2 hover:text-blue-200 rounded-md px-2 xl:px-3 py-2 transition-colors duration-200 whitespace-nowrap"
                                            >
                                                <Users className="w-4 h-4 xl:w-5 xl:h-5" />
                                                <span>Comunidad</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/suggestions/new"
                                                className="flex items-center space-x-2 hover:text-blue-200 rounded-md px-2 xl:px-3 py-2 transition-colors duration-200 whitespace-nowrap"
                                            >
                                                <Plus className="w-4 h-4 xl:w-5 xl:h-5" />
                                                <span className="hidden xl:inline">Nueva Sugerencia</span>
                                                <span className="xl:hidden">Sugerencia</span>
                                            </Link>
                                        </li>
                                    </>
                                )}

                                {isAdmin && (
                                    <li className="relative" >
                                        <button
                                            onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                                            className="flex items-center space-x-2 hover:text-blue-200 rounded-md px-2 xl:px-3 py-2 transition-colors duration-200 whitespace-nowrap"
                                        >
                                            <Shield className="w-4 h-4 xl:w-5 xl:h-5" />
                                            <span>Admin</span>
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform duration-200 ${isAdminDropdownOpen ? "rotate-180" : ""}`}
                                            />
                                        </button>

                                        {isAdminDropdownOpen && (
                                            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                                {adminMenuItems.map((item) => {
                                                    const Icon = item.icon
                                                    return (
                                                        <Link
                                                            key={item.href}
                                                            to={item.href}
                                                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                                                            onClick={() => setIsAdminDropdownOpen(false)}
                                                        >
                                                            <Icon className="w-4 h-4" />
                                                            <span>{item.label}</span>
                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div className="hidden lg:flex items-center space-x-3 xl:space-x-6 min-w-max">
                            {isAuthenticated && (
                                <div className="flex items-center space-x-2 xl:space-x-3 bg-white/20 backdrop-blur-sm px-3 xl:px-4 py-2 rounded-full max-w-xs overflow-hidden">
                                    <div className="bg-white/30 p-1.5 xl:p-2 rounded-full flex-shrink-0">
                                        <User className="w-4 h-4 xl:w-6 xl:h-6 text-white" />
                                    </div>
                                    <div className="truncate">
                                        <p
                                            className="text-white font-semibold truncate text-sm xl:text-base"
                                            style={{ color: user?.role?.toLowerCase() === "premium" ? "gold" : "white" }}
                                            title={user?.email}
                                        >
                                            {user?.email}
                                        </p>
                                        <p className="text-xs xl:text-sm text-blue-200 truncate">{userLogured()}</p>
                                    </div>
                                </div>
                            )}

                            {!isAuthenticated ? (
                                <Link
                                    to="/login"
                                    className="flex items-center space-x-2 xl:space-x-3 text-blue-700 bg-white hover:bg-blue-50 font-semibold rounded-full text-sm xl:text-base px-4 xl:px-6 py-2 xl:py-3 shadow-lg transition duration-300 hover:shadow-xl whitespace-nowrap"
                                >
                                    <User className="w-4 h-4 xl:w-6 xl:h-6" />
                                    <span>Iniciar Sesión</span>
                                </Link>
                            ) : (
                                <button
                                    className="flex items-center space-x-2 xl:space-x-3 text-white bg-red-600 hover:bg-red-700 font-semibold rounded-full text-sm xl:text-base px-3 xl:px-5 py-2 xl:py-3 shadow-lg transition duration-300 hover:shadow-xl whitespace-nowrap"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="w-4 h-4 xl:w-6 xl:h-6" />
                                    <span>Cerrar Sesión</span>
                                </button>
                            )}
                        </div>

                        <button
                            className="text-white lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-1 z-50 relative"
                            onClick={handleToggleMenu}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
                        </button>
                    </div>
                </div>
            </nav>

            {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={handleCloseMenu} />}

            <div
                className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-blue-700 bg-opacity-95 backdrop-blur-md z-50 transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-6 pt-20">
                    {isAuthenticated && (
                        <div className="mb-6 p-4 bg-white/20 backdrop-blur-sm rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="bg-white/30 p-2 rounded-full flex-shrink-0">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div className="truncate">
                                    <p
                                        className="text-white font-semibold truncate"
                                        style={{ color: user?.role?.toLowerCase() === "premium" ? "gold" : "white" }}
                                        title={user?.email}
                                    >
                                        {user?.email}
                                    </p>
                                    <p className="text-sm text-blue-200 truncate">{userLogured()}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <ul className="flex flex-col space-y-2 font-semibold text-white text-lg">
                        <li>
                            <Link
                                to="/"
                                className="flex items-center space-x-3 hover:bg-white/20 rounded-md px-3 py-3 transition-colors duration-200"
                                onClick={handleCloseMenu}
                            >
                                <Home className="w-5 h-5" />
                                <span>Inicio</span>
                            </Link>
                        </li>

                        {!isAuthenticated && (
                            <li>
                                <Link
                                    to="/register"
                                    className="flex items-center space-x-3 hover:bg-white/20 rounded-md px-3 py-3 transition-colors duration-200"
                                    onClick={handleCloseMenu}
                                >
                                    <UserPlus className="w-5 h-5" />
                                    <span>Registro</span>
                                </Link>
                            </li>
                        )}

                        {isAuthenticated && (
                            <>
                                <li>
                                    <Link
                                        to="/profile"
                                        className="flex items-center space-x-3 hover:bg-white/20 rounded-md px-3 py-3 transition-colors duration-200"
                                        onClick={handleCloseMenu}
                                    >
                                        <User className="w-5 h-5" />
                                        <span>Perfil</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/trains"
                                        className="flex items-center space-x-3 hover:bg-white/20 rounded-md px-3 py-3 transition-colors duration-200"
                                        onClick={handleCloseMenu}
                                    >
                                        <Dumbbell className="w-5 h-5" />
                                        <span>Entrenamientos</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/comunidad"
                                        className="flex items-center space-x-3 hover:bg-white/20 rounded-md px-3 py-3 transition-colors duration-200"
                                        onClick={handleCloseMenu}
                                    >
                                        <Users className="w-5 h-5" />
                                        <span>Comunidad</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/suggestions/new"
                                        className="flex items-center space-x-3 hover:bg-white/20 rounded-md px-3 py-3 transition-colors duration-200"
                                        onClick={handleCloseMenu}
                                    >
                                        <Plus className="w-5 h-5" />
                                        <span>Nueva Sugerencia</span>
                                    </Link>
                                </li>
                            </>
                        )}

                        {isAdmin && (
                            <li>
                                <button
                                    onClick={() => setIsMobileAdminDropdownOpen(!isMobileAdminDropdownOpen)}
                                    className="flex items-center justify-between w-full hover:bg-white/20 rounded-md px-3 py-3 transition-colors duration-200"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Shield className="w-5 h-5" />
                                        <span>Administración</span>
                                    </div>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-200 ${isMobileAdminDropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>

                                {isMobileAdminDropdownOpen && (
                                    <ul className="mt-2 ml-8 space-y-2">
                                        {adminMenuItems.map((item) => {
                                            const Icon = item.icon
                                            return (
                                                <li key={item.href}>
                                                    <Link
                                                        to={item.href}
                                                        className="flex items-center space-x-3 hover:bg-white/20 rounded-md px-3 py-2 transition-colors duration-200 text-blue-200"
                                                        onClick={handleCloseMenu}
                                                    >
                                                        <Icon className="w-4 h-4" />
                                                        <span>{item.label}</span>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </li>
                        )}
                    </ul>

                    <div className="mt-6 pt-6 border-t border-white/20">
                        {!isAuthenticated ? (
                            <Link
                                to="/login"
                                className="flex items-center justify-center space-x-3 text-blue-700 bg-white hover:bg-blue-50 font-semibold rounded-full text-base px-6 py-3 shadow-lg transition duration-300 w-full"
                                onClick={handleCloseMenu}
                            >
                                <User className="w-6 h-6" />
                                <span>Iniciar Sesión</span>
                            </Link>
                        ) : (
                            <button
                                className="flex items-center justify-center space-x-3 text-white bg-red-600 hover:bg-red-700 font-semibold rounded-full text-base px-5 py-3 shadow-lg transition duration-300 w-full"
                                onClick={handleLogout}
                            >
                                <LogOut className="w-6 h-6" />
                                <span>Cerrar Sesión</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
