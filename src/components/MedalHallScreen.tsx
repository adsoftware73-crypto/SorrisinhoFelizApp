import { useState, useMemo } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { symptoms } from '../data';
import type { Medals } from '../App';

interface MedalHallScreenProps {
  onNavigate: (screen: string) => void;
  medals: Medals;
}

type MedalCategories = keyof Medals;

export const MedalHallScreen = ({ onNavigate, medals }: MedalHallScreenProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const totalMedals = Object.values(medals).reduce((sum, dates: string[]) => sum + dates.length, 0);

  const firstMedalDate = useMemo(() => {
    const allDates = Object.values(medals).flat();
    if (allDates.length === 0) {
      return null;
    }
    // As datas estão no formato 'YYYY-MM-DD', então a ordenação de string funciona
    allDates.sort();
    return new Date(allDates[0] + 'T00:00:00'); // Adiciona T00:00:00 para evitar problemas de fuso horário
  }, [medals]);

  const renderCalendar = (category: MedalCategories) => {
    const categoryMedals = medals[category];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
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

  const changeMonth = (offset: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const monthName = currentDate.toLocaleString('pt-BR', { month: 'long' });
  const yearName = currentDate.getFullYear();

  const now = new Date();
  const isCurrentMonth = now.getMonth() === currentDate.getMonth() && now.getFullYear() === currentDate.getFullYear();

  const isPastFirstMedalMonth = useMemo(() => {
    if (!firstMedalDate) return true; // Se não há medalhas, não pode voltar
    return (
      currentDate.getFullYear() > firstMedalDate.getFullYear() ||
      (currentDate.getFullYear() === firstMedalDate.getFullYear() && currentDate.getMonth() > firstMedalDate.getMonth())
    );
  }, [currentDate, firstMedalDate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-amber-300 p-4">
      <div className="max-w-md mx-auto">
        <button onClick={() => onNavigate('inicio')} className="mb-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <ArrowLeft className="text-yellow-800" size={24} strokeWidth={2.5} />
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-yellow-800 mb-2">Sala de Troféus</h2>
            <div className="text-6xl my-4">🏆</div>
            <p className="text-gray-600">Total de medalhas: <strong className="text-2xl text-yellow-700">{totalMedals}</strong></p>
            <div className="flex items-center justify-center mt-4 select-none">
              <button onClick={() => changeMonth(-1)} disabled={!isPastFirstMedalMonth} className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronLeft size={20} />
              </button>
              <p className="text-sm text-gray-500 font-semibold w-32 text-center capitalize">{monthName} de {yearName}</p>
              <button onClick={() => changeMonth(1)} disabled={isCurrentMonth} className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronRight size={20} />
              </button>
            </div>
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