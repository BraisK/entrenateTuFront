"use client"

import {Link} from "react-router-dom"
import { Check, Star, Zap, Crown, Users, Calendar, BarChart3, Shield, ArrowRight, Sparkles } from "lucide-react"

export default function PricingPage() {
    const plans = [
        {
            name: "Básico",
            price: "GRATIS",
            period: "mes",
            description: "Perfecto para nadadores principiantes",
            icon: <Users className="w-8 h-8 text-blue-500" />,
            color: "blue",
            popular: false,
            features: [
                "Acceso a entrenamientos básicos",
                "Seguimiento de progreso",
                "Comunidad de nadadores",
                "Soporte por email",
                "Hasta 10 entrenamientos",
            ],
            notIncluded: ["Entrenamientos personalizados", "Análisis avanzado", "Coaching 1:1", "Planes de competición"],
        },
        {
            name: "Premium",
            price: "19.99",
            period: "mes",
            description: "Ideal para nadadores comprometidos",
            icon: <Zap className="w-8 h-8 text-purple-500" />,
            color: "purple",
            popular: true,
            features: [
                "Todo lo del plan Básico",
                "Entrenamientos personalizados",
                "Análisis avanzado de rendimiento",
                "Planes de entrenamiento ilimitados",
                "Seguimiento de métricas detalladas",
                "Acceso prioritario a nuevas funciones",
                "Soporte prioritario 24/7",
                "Integración con dispositivos wearables",
            ],
            notIncluded: ["Coaching personal 1:1", "Planes de competición profesional"],
        },
        {
            name: "Pro",
            price: "39.99",
            period: "mes",
            description: "Para atletas y competidores serios",
            icon: <Crown className="w-8 h-8 text-yellow-500" />,
            color: "yellow",
            popular: false,
            features: [
                "Todo lo del plan Premium",
                "Coaching personal 1:1",
                "Planes de competición profesional",
                "Análisis biomecánico avanzado",
                "Sesiones de video análisis",
                "Acceso a entrenadores certificados",
                "Planificación de temporada completa",
                "Nutrición deportiva personalizada",
                "Acceso exclusivo a masterclasses",
            ],
            notIncluded: [],
        },
    ]

    const benefits = [
        {
            icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
            title: "Seguimiento Avanzado",
            description: "Monitorea tu progreso con métricas detalladas y análisis en tiempo real",
        },
        {
            icon: <Calendar className="w-6 h-6 text-green-500" />,
            title: "Planificación Inteligente",
            description: "Entrenamientos adaptados a tu horario y objetivos específicos",
        },
        {
            icon: <Shield className="w-6 h-6 text-purple-500" />,
            title: "Prevención de Lesiones",
            description: "Programas diseñados para maximizar rendimiento y minimizar riesgos",
        },
    ]

    const testimonials = [
        {
            name: "María González",
            role: "Nadadora Amateur",
            content:
                "Desde que uso SwimTrack, he mejorado mis tiempos en un 15%. Los entrenamientos personalizados son increíbles.",
            rating: 5,
        },
        {
            name: "Carlos Ruiz",
            role: "Entrenador Profesional",
            content: "La plataforma me permite gestionar a todos mis atletas de manera eficiente. Altamente recomendado.",
            rating: 5,
        },
        {
            name: "Ana Martín",
            role: "Competidora Nacional",
            content:
                "El análisis biomecánico del plan Pro me ayudó a perfeccionar mi técnica y ganar mi primera medalla nacional.",
            rating: 5,
        },
    ]

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
            <section className="relative py-20 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-sky-400/10"></div>
                <div className="relative max-w-4xl mx-auto">
                    <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span>Planes diseñados para cada nivel</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                        Mejora tu{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">experiencia</span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Elige el plan perfecto para llevar tu natación al siguiente nivel. Desde principiantes hasta atletas
                        profesionales, tenemos lo que necesitas.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
                            >
                                {benefit.icon}
                                <span className="text-sm font-medium text-gray-700">{benefit.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative bg-white rounded-2xl shadow-lg overflow-visible transition-all duration-300 hover:shadow-xl hover:scale-105 ${plan.popular ? "ring-2 ring-purple-500 ring-offset-4" : ""
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                            Más Popular
                                        </div>
                                    </div>
                                )}

                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        {plan.icon}
                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-gray-800">
                                                €{plan.price}
                                                <span className="text-lg font-normal text-gray-500">/{plan.period}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                                    <p className="text-gray-600 mb-6">{plan.description}</p>

                                    <button
                                        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 mb-8 ${plan.popular
                                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl"
                                                : plan.color === "yellow"
                                                    ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:from-yellow-500 hover:to-orange-500"
                                                    : "bg-blue-500 text-white hover:bg-blue-600"
                                            }`}
                                    >
                                        Comenzar ahora
                                    </button>

                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-gray-800 flex items-center">
                                            <Check className="w-5 h-5 text-green-500 mr-2" />
                                            Incluye:
                                        </h4>
                                        <ul className="space-y-3">
                                            {plan.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-start">
                                                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {plan.notIncluded.length > 0 && (
                                            <div className="pt-4 border-t border-gray-100">
                                                <ul className="space-y-2">
                                                    {plan.notIncluded.map((feature, featureIndex) => (
                                                        <li key={featureIndex} className="flex items-start text-gray-400">
                                                            <span className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0">✕</span>
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-sky-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Lo que dicen nuestros usuarios</h2>
                        <p className="text-xl text-gray-600">Miles de nadadores ya han mejorado su rendimiento con SwimTrack</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                                <div>
                                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Preguntas Frecuentes</h2>
                        <p className="text-xl text-gray-600">Resolvemos tus dudas sobre nuestros planes</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-800 mb-2">¿Puedo cambiar de plan en cualquier momento?</h3>
                                <p className="text-gray-600">
                                    Sí, puedes actualizar o degradar tu plan cuando quieras. Los cambios se aplicarán en tu próximo ciclo
                                    de facturación.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-800 mb-2">¿Hay descuentos para pagos anuales?</h3>
                                <p className="text-gray-600">
                                    Sí, ofrecemos un 20% de descuento en todos los planes si eliges la facturación anual.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-800 mb-2">¿Ofrecen garantía de devolución?</h3>
                                <p className="text-gray-600">
                                    Ofrecemos una garantía de devolución de 30 días sin preguntas. Si no estás satisfecho, te devolvemos
                                    tu dinero.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-800 mb-2">
                                    ¿El coaching 1:1 está incluido en todos los planes?
                                </h3>
                                <p className="text-gray-600">
                                    El coaching personal 1:1 solo está disponible en el plan Pro. Los otros planes incluyen soporte por
                                    email y comunidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-sky-500">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Listo para mejorar tu natación?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Únete a miles de nadadores que ya han transformado su entrenamiento
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/register"
                            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Comenzar gratis
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                        <Link
                            to="/trains"
                            className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                        >
                            Ver entrenamientos
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
