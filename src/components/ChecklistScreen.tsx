import { ArrowLeft, Check, Award, HelpCircle } from 'lucide-react';
import { checklistTasks } from '../data';
import type { Medals } from '../App';

import fioDentalVideo from '../assets/video/fiodental.mp4';
import escovacaoVideo from '../assets/video/esovacao.mp4';
import limparLinguaVideo from '../assets/video/limparlingua.mp4';

type ChecklistState = Record<"brushThreeTimes" | "floss" | "fruits" | "vegetables" | "fewSweets" | "water", boolean>;
type ChecklistItem = keyof ChecklistState;

interface ChecklistScreenProps {
  onNavigate: (screen: string) => void;
  checklist: ChecklistState;
  toggleChecklistItem: (item: ChecklistItem) => void;
  medals: Medals;
  medalAwardedToday: boolean;
  setVideoModalContent: (content: { src: string; title: string } | null) => void;
}

export const ChecklistScreen = ({ onNavigate, checklist, toggleChecklistItem, medals, medalAwardedToday, setVideoModalContent }: ChecklistScreenProps) => {
  const completedTasks = Object.values(checklist).filter(Boolean).length;
  const isComplete = completedTasks === 6;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-teal-100 p-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => onNavigate('inicio')}
          className="mb-4 p-2 bg-white rounded-full shadow-md"
        >
          <ArrowLeft className="text-blue-600" size={24} />
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-green-700 mb-2">Missão Sorriso Brilhante</h2>
            <div className="text-6xl mb-2">🏆</div>
            <p className="text-gray-600">Checklist para fazer ao final do dia. Você foi muito bem, agora vamos ter uma boa noite do sono.</p>
          </div>

          {(isComplete || medalAwardedToday) && (
            <div className="bg-gradient-to-r from-yellow-200 to-orange-200 p-6 rounded-2xl mb-6 text-center animate-bounce">
              <div className="text-6xl mb-2">🎉</div>
              <h3 className="text-xl font-bold text-orange-700">Parabéns, Campeão!</h3>
              <p className="text-orange-600">Você ganhou uma medalha!</p>
              <div className="flex justify-center mt-2">
                <Award className="text-yellow-500" size={32} />
              </div>
            </div>
          )}

          <div className="space-y-4 mb-6">
            {checklistTasks.map((task) => (
              <button
                key={task.key}
                onClick={() => toggleChecklistItem(task.key)}
                className={`w-full p-4 rounded-2xl border-2 transition-all ${
                  checklist[task.key]
                    ? 'bg-green-100 border-green-400 shadow-lg'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 relative">
                    <span className="text-3xl">{task.emoji}</span>
                    {task.key === 'floss' ? (
                      <div onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: fioDentalVideo, title: 'Como usar o Fio Dental?' }); }} className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5"><HelpCircle size={16} /></div>
                    ) : task.key === 'brushThreeTimes' ? (
                      <div onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: escovacaoVideo, title: 'Como Escovar os Dentinhos?' }); }} className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5"><HelpCircle size={16} /></div>
                    ) : task.label.toLowerCase().includes('língua') ? (
                      <div onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: limparLinguaVideo, title: 'Como Limpar a Língua?' }); }} className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5"><HelpCircle size={16} /></div>
                    ) : null}
                  </div>
                  <span className="flex-1 font-bold text-gray-700 text-left">{task.label}</span>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    checklist[task.key] ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}>
                    {checklist[task.key] && <Check className="text-white" size={20} />}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-blue-100 p-4 rounded-2xl text-center">
            <div className="text-2xl mb-2">🏅</div>
            <p className="text-blue-700 font-bold">Total de Medalhas: {medals.checklist.length}</p>
            <p className="text-blue-600">Progresso de Hoje: {completedTasks}/6 tarefas</p>
          </div>
        </div>
      </div>
    </div>
  );
};