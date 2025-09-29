import { ArrowLeft, Github, Trash2 } from 'lucide-react';
import { authors, orientadores } from '../data';
import { version } from '../../package.json';

interface AboutScreenProps {
  onNavigate: (screen: string) => void;
  onResetData: () => void;
}

export const AboutScreen = ({ onNavigate, onResetData }: AboutScreenProps) => (
  <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-100 p-4">
    <div className="max-w-md mx-auto">
      <button
        onClick={() => onNavigate('inicio')}
        className="mb-4 p-2 bg-white rounded-full shadow-md"
      >
        <ArrowLeft className="text-blue-600" size={24} />
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sobre o Sorrisinho Feliz</h2>
          <div className="text-6xl mb-2">😊</div>
          <p className="text-gray-600">
            Este aplicativo é um projeto acadêmico criado com o objetivo de ensinar crianças sobre saúde bucal de forma divertida e interativa.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-2xl mb-6">
          <h3 className="font-bold text-blue-800 mb-3 text-lg text-center">Desenvolvido por</h3>
          <div className="space-y-2 text-center text-blue-700">
            {authors.map((author, index) => (
              <p key={index}>{author}</p>
            ))}
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-2xl mb-6">
          <h3 className="font-bold text-blue-800 mb-3 text-lg text-center">Desenvolvido sobre a orientação dos discentes:</h3>
          <div className="space-y-2 text-center text-blue-700">
            {orientadores.map((author, index) => (
              <p key={index}>{author}</p>
            ))}
          </div>
        </div>
        <div className="text-center">
          <a
            href="https://github.com/adsoftware73-crypto/SorrisinhoFelizApp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Github size={20} />
            <span>Ver o código no GitHub</span>
          </a>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          <p>Versão {version}</p>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <button
            onClick={onResetData}
            className="inline-flex items-center space-x-2 bg-red-100 text-red-600 px-3 py-1 rounded-full hover:bg-red-200 transition-colors text-xs"
          >
            <Trash2 size={14} />
            <span>Apagar Progresso</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);