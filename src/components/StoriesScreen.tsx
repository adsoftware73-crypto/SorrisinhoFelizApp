import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { stories } from '../data';
import type { Medals } from '../App';

interface StoriesScreenProps {
  onNavigate: (screen: string) => void;
  medals: Medals;
}

export const StoriesScreen = ({ onNavigate, medals }: StoriesScreenProps) => {
  const [expandedStories, setExpandedStories] = useState<Set<number>>(new Set());

  const totalMedals = Object.values(medals).reduce((sum: number, dates: string[]) => sum + dates.length, 0);
  const unlockedStories = stories.slice(0, totalMedals);

  const toggleStory = (index: number) => {
    setExpandedStories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => onNavigate('inicio')}
          className="mb-4 p-2 bg-white rounded-full shadow-md"
        >
          <ArrowLeft className="text-blue-600" size={24} />
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-8 pb-4 border-b-2 border-indigo-200">
            Histórias do Dentinho 📚
          </h2>

          <div className="space-y-4">
            {unlockedStories.length > 0 ? (
              unlockedStories.map((story, index) => {
                const isExpanded = expandedStories.has(index);
                return (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-md transition-all">
                    <button onClick={() => toggleStory(index)} className="w-full text-left">
                      <h3 className="text-2xl font-bold text-purple-700 mb-2 text-center">{story.title} {story.emoji}</h3>
                    </button>
                    {isExpanded && (
                      <>
                        <div className="mt-4 text-gray-700 space-y-4 whitespace-pre-line">{story.body.split('\n\n').map((paragraph, pIndex) => (<p key={pIndex} className="text-base leading-relaxed">{paragraph}</p>))}</div>
                        <div className="mt-4 pt-4 border-t-2 border-purple-100"><p className="text-purple-800 font-semibold italic text-center"><strong>Moral da história:</strong> {story.moral}</p></div>
                      </>
                    )}
                  </div>
                );
              })
            ) : <p className="text-center text-gray-500">Você ainda não desbloqueou nenhuma história. Conquiste medalhas para começar!</p>}
          </div>

          <div className="mt-6 text-center"><div className="text-6xl mb-2">📖</div><p className="text-purple-700 font-bold">Conquiste mais medalhas para liberar mais historinhas</p></div>
        </div>
      </div>
    </div>
  );
};