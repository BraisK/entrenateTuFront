export default function Home() {
  return (
    <main className="flex-1 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-blue-500/10 z-10" />
        <div className="relative h-[500px] w-full overflow-hidden">
          <img
            src="/placeholder.svg?height=500&width=1920"
            alt="Nadadores en entrenamiento"
            width={1920}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 absolute inset-0 flex items-center z-20">
          <div className="max-w-xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white dark:text-gray-100">
              Mejora tu técnica y rendimiento en natación
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 md:text-xl">
              Programas personalizados para todos los niveles, desde principiantes hasta competidores avanzados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md text-lg transition-colors">
                Comienza Ahora
              </button>
              <button className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 font-medium py-3 px-6 rounded-md text-lg transition-colors">
                Conoce Nuestros Programas
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-100">
            ¿Por qué elegir nuestros entrenamientos?
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 md:text-lg">
            Ofrecemos una experiencia completa para mejorar tu rendimiento en el agua
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Entrenadores Certificados</h3>
              <p className="text-gray-500 dark:text-gray-300 mb-4">
                Nuestro equipo cuenta con certificaciones internacionales y experiencia competitiva.
              </p>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Aprende con los mejores profesionales que te guiarán paso a paso para mejorar tu técnica y rendimiento.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Grupos Reducidos</h3>
              <p className="text-gray-500 dark:text-gray-300 mb-4">
                Atención personalizada en grupos pequeños para maximizar tu aprendizaje.
              </p>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Entrenamiento adaptado a tus necesidades específicas con correcciones individuales en cada sesión.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Horarios Flexibles</h3>
              <p className="text-gray-500 dark:text-gray-300 mb-4">Múltiples opciones de horarios para adaptarse a tu rutina diaria.</p>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Mañana, tarde y noche. Encuentra el horario perfecto para ti y cumple tus objetivos sin complicaciones.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
