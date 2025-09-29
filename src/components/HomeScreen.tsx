import { Trophy, Book, Info } from 'lucide-react';
import { mascotPhrases, symptoms } from '../data';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const Mascot = () => (
  <div className="flex flex-col items-center mb-6">
    <div className="w-32 h-32 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-6xl animate-bounce shadow-lg">
      😊
    </div>
    <div className="bg-white p-3 rounded-xl shadow-md mt-4 max-w-xs text-center">
      <p className="text-blue-600 font-medium">{mascotPhrases[0]}</p>
    </div>
  </div>
);

export const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-green-200 to-blue-200 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">Sorrisinho Feliz</h1>
          <p className="text-blue-600">Cuidando do seu sorriso! ✨</p>
        </div>

        <Mascot />

        <div className="space-y-4">
          <button
            onClick={() => onNavigate('pais')}
            className="w-full p-4 bg-gradient-to-r from-blue-200 to-cyan-200 border-2 border-blue-300 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <div className="flex items-center space-x-4">
              <span className="text-4xl">👨‍👩‍👧‍👦</span>
              <span className="text-xl font-bold text-gray-700">Informações para os papais</span>
            </div>
          </button>

          {Object.entries(symptoms).map(([key, symptom]) => (
            <button
              key={key}
              onClick={() => onNavigate(`sintoma-${key}`)}
              className={`w-full p-4 ${symptom.color} border-2 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{symptom.emoji}</span>
                <span className="text-xl font-bold text-gray-700">{symptom.title}</span>
              </div>
            </button>
          ))}

          <button
            onClick={() => onNavigate('missao')}
            className="w-full p-4 bg-gradient-to-r from-green-200 to-teal-200 border-2 border-green-300 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <div className="flex items-center space-x-4">
              <span className="text-4xl">✅</span>
              <span className="text-xl font-bold text-gray-700">Missão Sorriso Brilhante</span>
            </div>
          </button>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button onClick={() => onNavigate('trofeus')} className="bg-amber-500 text-white px-4 py-2 rounded-full flex items-center space-x-2">
            <Trophy size={16} /> <span>Troféus</span>
          </button>
          <button onClick={() => onNavigate('historias')} className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center space-x-2">
            <Book size={16} /> <span>Histórias</span>
          </button>
          <button onClick={() => onNavigate('sobre')} className="bg-gray-500 text-white px-4 py-2 rounded-full flex items-center space-x-2">
            <Info size={16} /> <span>Sobre</span>
          </button>
        </div>
      </div>
    </div>
  );
};