import { ArrowLeft } from 'lucide-react';
import { symptoms } from '../data';
import type { SymptomKey } from '../data';

interface SymptomScreenProps {
  symptomKey: SymptomKey;
  onNavigate: (screen: string) => void;
}

export const SymptomScreen = ({ symptomKey, onNavigate }: SymptomScreenProps) => {
  const symptom = symptoms[symptomKey];
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => onNavigate('inicio')}
          className="mb-4 p-2 bg-white rounded-full shadow-md"
        >
          <ArrowLeft className="text-blue-600" size={24} />
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">{symptom.emoji}</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">{symptom.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{symptom.description}</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-2xl mb-6">
            <div className="text-6xl text-center mb-2">🦷</div>
            <p className="text-center text-gray-700">Não se preocupe! Vamos aprender como cuidar!</p>
          </div>

          <button
            onClick={() => onNavigate(`escovacao-${symptomKey}`)}
            className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white p-4 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Como cuidar? 🌟
          </button>
        </div>
      </div>
    </div>
  );
};