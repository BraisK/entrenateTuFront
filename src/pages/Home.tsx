import { Link } from "react-router-dom"
import { Check, Users, Zap, Crown, ArrowRight, Star, Sparkles, Trophy, Target, Clock, BarChart3, Shield, Waves, Award, TrendingUp, Heart, Droplets, } from "lucide-react"

export default function Home() {
  const plans = [
    {
      name: "Básico",
      price: "0.00",
      description: "Perfecto para nadadores principiantes",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      popular: false,
      features: [
        "Acceso a entrenamientos básicos",
        "Seguimiento de progreso",
        "Comunidad de nadadores",
        "Soporte por email",
        "Hasta 10 entrenamientos",
      ],
    },
    {
      name: "Premium",
      price: "19.99",
      description: "Ideal para nadadores comprometidos",
      icon: <Zap className="w-6 h-6 text-purple-500" />,
      popular: true,
      features: [
        "Todo lo del plan Básico",
        "Entrenamientos personalizados",
        "Análisis avanzado de rendimiento",
        "Planes ilimitados",
        "Soporte prioritario 24/7",
      ],
    },
    {
      name: "Pro",
      price: "39.99",
      description: "Para atletas y competidores serios",
      icon: <Crown className="w-6 h-6 text-yellow-500" />,
      popular: false,
      features: [
        "Todo lo del plan Premium",
        "Coaching personal 1:1",
        "Planes de competición profesional",
        "Análisis biomecánico avanzado",
        "Acceso a entrenadores certificados",
      ],
    },
  ]

  const stats = [
    { number: "10,000+", label: "Nadadores activos", icon: <Users className="w-6 h-6" /> },
    { number: "500+", label: "Entrenamientos disponibles", icon: <Target className="w-6 h-6" /> },
    { number: "95%", label: "Mejora en rendimiento", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "24/7", label: "Soporte disponible", icon: <Clock className="w-6 h-6" /> },
  ]

  const features = [
    {
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      title: "Entrenadores Certificados",
      description:
        "Aprende con profesionales certificados internacionalmente con experiencia competitiva y métodos probados.",
      color: "yellow",
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "Entrenamientos Personalizados",
      description: "Programas adaptados a tu nivel, objetivos y disponibilidad de tiempo para maximizar tu progreso.",
      color: "blue",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-500" />,
      title: "Análisis de Rendimiento",
      description: "Seguimiento detallado de tu progreso con métricas avanzadas y reportes personalizados.",
      color: "green",
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "Prevención de Lesiones",
      description: "Programas diseñados para mejorar tu técnica mientras minimizas el riesgo de lesiones.",
      color: "purple",
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Comunidad Activa",
      description: "Únete a una comunidad de nadadores apasionados que comparten tips, experiencias y motivación.",
      color: "red",
    },
    {
      icon: <Award className="w-8 h-8 text-indigo-500" />,
      title: "Resultados Garantizados",
      description: "Metodología probada que ha ayudado a miles de nadadores a alcanzar sus objetivos deportivos.",
      color: "indigo",
    },
  ]

  return (
    <main className="flex-1">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-sky-600/70 z-10" />
        </div>

        <div className="absolute inset-0 z-5">
          <div className="absolute top-40 right-20 animate-pulse">
            <Waves className="w-12 h-12 text-sky-300/30" />
          </div>
        </div>

        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium border border-white/20">
              <Sparkles className="w-4 h-4" />
              <span>La plataforma #1 de entrenamiento de natación</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Transforma tu
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                natación
              </span>
              para siempre
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Únete a más de 10,000 nadadores que han mejorado su técnica y rendimiento con nuestros programas
              personalizados y entrenadores certificados
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 hover:scale-105 flex items-center"
              >
                Comenzar gratis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-white/80">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-sm">4.9/5 en reseñas</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm">Certificado por FINA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-sm">10,000+ nadadores</span>
              </div>
            </div>
          </div>
        </div>


      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-sky-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">{stat.icon}</div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              <span>¿Por qué elegir SwimTrack?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Todo lo que necesitas para
              <span className="block text-blue-600">dominar la natación</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combinamos tecnología avanzada, entrenadores expertos y una comunidad apasionada para ofrecerte la mejor
              experiencia de entrenamiento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`bg-${feature.color}-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Planes diseñados para cada nivel</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Mejora tu{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                experiencia
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Elige el plan perfecto para llevar tu natación al siguiente nivel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-xl overflow-visible transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 ${plan.popular ? "border-purple-500 ring-4 ring-purple-100" : "border-gray-100"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg">
                      ⭐ Más Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gray-100 p-3 rounded-2xl">{plan.icon}</div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-800">
                        €{plan.price}
                        <span className="text-lg font-normal text-gray-500">/mes</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{plan.name}</h3>
                  <p className="text-gray-600 mb-8">{plan.description}</p>

                  <Link
                    to="/register"
                    className={`block w-full py-4 px-6 rounded-2xl font-bold text-center transition-all duration-300 mb-8 ${plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl"
                      : "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                      }`}
                  >
                    Comenzar ahora
                  </Link>

                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/pricing"
              className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold text-lg transition-colors group"
            >
              Ver comparación completa de planes
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              <span>Testimonios reales</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Lo que dicen nuestros
              <span className="block text-indigo-600">nadadores</span>
            </h2>
            <p className="text-xl text-gray-600">Miles de nadadores ya han transformado su rendimiento</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "María González",
                role: "Nadadora Amateur",
                content:
                  "Desde que uso SwimTrack, he mejorado mis tiempos en un 15%. Los entrenamientos personalizados son increíbles.",
                image: "MG",
              },
              {
                name: "Carlos Ruiz",
                role: "Entrenador Profesional",
                content:
                  "La plataforma me permite gestionar a todos mis atletas de manera eficiente. Altamente recomendado.",
                image: "CR",
              },
              {
                name: "Ana Martín",
                role: "Competidora Nacional",
                content:
                  "El análisis biomecánico del plan Pro me ayudó a perfeccionar mi técnica y ganar mi primera medalla.",
                image: "AM",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10">
            <Waves className="w-32 h-32 text-white" />
          </div>
          <div className="absolute bottom-10 right-10">
            <Droplets className="w-24 h-24 text-white" />
          </div>
          <div className="absolute top-1/2 left-1/4">
            <Trophy className="w-20 h-20 text-white" />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Tu mejor versión te está
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              esperando
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Únete a la revolución del entrenamiento de natación. Más de 10,000 nadadores ya han transformado su técnica
            y rendimiento
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/register"
              className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-5 px-10 rounded-full text-xl transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 hover:scale-105 flex items-center"
            >
              Comenzar mi transformación
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/trains"
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 font-bold py-5 px-10 rounded-full text-xl transition-all duration-300 flex items-center"
            >
              Explorar entrenamientos
              <Target className="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 mt-16 text-blue-200">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Garantía de 30 días</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Certificado internacional</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Soporte 24/7</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
