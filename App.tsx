
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          Bienvenido a tu nueva aplicación React
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Este es un punto de partida limpio y moderno para tu proyecto. Comienza a editar <code className="bg-gray-800 rounded-md px-2 py-1 text-sm font-mono text-pink-400">App.tsx</code> para dar vida a tu idea.
        </p>
        <div className="mt-8">
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 inline-block"
          >
            Aprender React
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
