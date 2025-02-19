import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

const Button: React.FC<Props> = ({ children, onClick }) => (
  <button
    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"
    onClick={onClick}
  >
    {children}
  </button>
);

const Card: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="mt-6 w-full max-w-2xl p-6 bg-white shadow-lg rounded-2xl">
    {children}
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-blue-900 mt-10">
        SwimTrack: Organiza tus entrenos
      </h1>

      <Card>
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">
            Crea y guarda tus entrenamientos de natación de manera muy sencilla. 
          </p>
          <div className="text-6xl text-blue-500 mb-4">🏊‍♂️</div>
          <Button>➕ Crear nuevo entreno</Button>
        </div>
      </Card>
    </div>
  );
}
