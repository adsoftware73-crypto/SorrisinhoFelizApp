import { ArrowLeft } from 'lucide-react';
import { symptoms } from '../data';
import type { Medals } from '../App';

interface MedalHallScreenProps {
  onNavigate: (screen: string) => void;
  medals: Medals;
}

type MedalCategories = keyof Medals;

export const MedalHallScreen = ({ onNavigate, medals }: MedalHallScreenProps) => {
  const totalMedals = Object.values(medals).reduce((sum, dates: string[]) => sum + dates.length, 0);

  const renderCalendar = (category: MedalCategories) => {
    const categoryMedals = medals[category];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [
      ...Array.from({ length: firstDayOfMonth }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
    ];

    return (
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => <div key={i} className="font-bold text-gray-400">{day}</div>)}
        {days.map((day, index) => {
          if (!day) return <div key={`empty-${index}`}></div>;
          const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          const hasMedal = categoryMedals.includes(dateStr);
          return (
            <div key={day} className={`p-1 rounded-full flex items-center justify-center ${hasMedal ? 'bg-yellow-300' : 'bg-gray-100'}`}>
              {hasMedal ? '🏅' : <span className="text-gray-500">{day}</span>}
            </div>
          );
        })}
      </div>
    );
  };

  const categoryDetails = {
    'checklist': { title: 'Missão Sorriso Brilhante', emoji: '✅' },
    'gengivite': { title: 'Gengiva Vermelha', emoji: symptoms.gengivite.emoji },
    'halitose': { title: 'Tchau Bafinho', emoji: symptoms.halitose.emoji },
    'carie': { title: 'Dentinho com Dodói', emoji: symptoms.carie.emoji },
  };

  const today = new Date();
  const monthName = today.toLocaleString('pt-BR', { month: 'long' });

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-amber-300 p-4">
      <div className="max-w-md mx-auto">
        <button onClick={() => onNavigate('inicio')} className="mb-4 p-2 bg-white rounded-full shadow-md">
          <ArrowLeft className="text-yellow-800" size={24} />
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-yellow-800 mb-2">Sala de Troféus</h2>
            <div className="text-6xl my-4">🏆</div>
            <p className="text-gray-600">Total de medalhas: <strong className="text-2xl text-yellow-700">{totalMedals}</strong></p>
            <p className="text-sm text-gray-500 mt-2">Calendário de {monthName}</p>
          </div>

          <div className="space-y-6">
            {(Object.keys(categoryDetails) as MedalCategories[]).map(key => (
              <div key={key} className="bg-gray-50 p-4 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-700 mb-2 flex items-center">
                  <span className="text-2xl mr-2">{categoryDetails[key].emoji}</span> {categoryDetails[key].title} - <strong className="ml-1">{medals[key].length}</strong>
                </h3>
                {renderCalendar(key)}
              </div>
            ))}
          </div>

          {totalMedals === 0 && <p className="text-center text-gray-500 mt-6">Você ainda não tem medalhas. Complete as missões para começar a colecionar!</p>}
        </div>
      </div>
    </div>
  );
};