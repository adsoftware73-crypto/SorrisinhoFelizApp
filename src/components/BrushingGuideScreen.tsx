import { useEffect, useMemo } from 'react';
import { ArrowLeft, Play, Pause, Check, Award, HelpCircle } from 'lucide-react';
import { symptoms } from '../data';
import type { SymptomKey } from '../data';
import type { Medals } from '../App';

import fioDentalVideo from '../assets/video/fiodental.mp4';
import escovacaoVideo from '../assets/video/esovacao.mp4';
import limparLinguaVideo from '../assets/video/limparlingua.mp4';

interface BrushingGuideScreenProps {
  symptomKey: SymptomKey;
  onNavigate: (screen: string) => void;
  medals: Medals;
  setMedals: React.Dispatch<React.SetStateAction<Medals>>;
  brushingTimer: number;
  setBrushingTimer: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  completedSteps: Map<SymptomKey, Set<number>>;
  setCompletedSteps: React.Dispatch<React.SetStateAction<Map<SymptomKey, Set<number>>>>;
  setVideoModalContent: (content: { src: string; title: string } | null) => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const BrushingGuideScreen = ({
  symptomKey,
  onNavigate,
  medals,
  setMedals,
  brushingTimer,
  setBrushingTimer,
  isPlaying,
  setIsPlaying,
  completedSteps,
  setCompletedSteps,
  setVideoModalContent
}: BrushingGuideScreenProps) => {
  const guide = symptoms[symptomKey].brushingGuide;
  const completionMessage = symptoms[symptomKey].completionMessage;

  const currentSymptomCompletedSteps = useMemo(() => completedSteps.get(symptomKey) ?? new Set<number>(), [completedSteps, symptomKey]);

  const allStepsCompleted = currentSymptomCompletedSteps.size > 0 && currentSymptomCompletedSteps.size === guide.length;

  useEffect(() => {
    let interval: number;
    if (isPlaying && brushingTimer > 0) {
      interval = setInterval(() => {
        setBrushingTimer(prev => prev - 1);
      }, 1000);
    } else if (brushingTimer === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, brushingTimer]);

  useEffect(() => {
    if (allStepsCompleted) {
      const today = new Date().toISOString().split('T')[0];
      if (medals[symptomKey] && !medals[symptomKey].includes(today)) {
        setMedals(prev => ({
          ...prev,
          [symptomKey]: [...prev[symptomKey], today],
        }));
      }
    }
  }, [allStepsCompleted, symptomKey, medals, setMedals]);

  const handleToggleComplete = (index: number) => {
    setCompletedSteps(prevMap => {
      const newMap = new Map(prevMap);
      const steps = new Set(newMap.get(symptomKey) ?? []);
      if (steps.has(index)) {
        steps.delete(index);
      } else {
        steps.add(index);
      }
      newMap.set(symptomKey, steps);
      return newMap;
    });
  };

  const title = `Escovação para ${symptoms[symptomKey].title}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-pink-100 p-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => onNavigate(`sintoma-${symptomKey}`)}
          className="mb-4 p-2 bg-white rounded-full shadow-md"
        >
          <ArrowLeft className="text-blue-600" size={24} />
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center text-red-700 mb-2">
            {title} 🪥✨
          </h2>
          <p className="text-center text-gray-600 mb-6">Um guia especial para você!</p>

          <div className="bg-red-100 p-4 rounded-2xl mb-6 text-center">
            <div className="text-4xl mb-2">⏰</div>
            <div className="text-2xl font-bold text-red-700">{formatTime(brushingTimer)}</div>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="mt-2 bg-red-500 text-white p-2 rounded-full"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>

          <div className="space-y-4">
            {guide.map((step, index) => (
              <div
                onClick={() => handleToggleComplete(index)}
                key={index}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all bg-gray-50 border-gray-200 ${currentSymptomCompletedSteps.has(index) ? 'bg-green-100 border-green-400' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 relative">
                    <span className="text-3xl">{step.emoji}</span>
                    {step.step.toLowerCase().includes('fio dental') ? (
                      <div onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: fioDentalVideo, title: 'Como usar o Fio Dental?' }); }} className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5"><HelpCircle size={16} /></div>
                    ) : step.step.toLowerCase().includes('escovar os dentinhos') ? (
                      <div onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: escovacaoVideo, title: 'Como Escovar os Dentinhos?' }); }} className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5"><HelpCircle size={16} /></div>
                    ) : step.step.toLowerCase().includes('língua') || step.step.toLowerCase().includes('línguinha') ? (
                      <div onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: limparLinguaVideo, title: 'Como Limpar a Língua?' }); }} className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5"><HelpCircle size={16} /></div>
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-700 mb-1">{step.step}</h3>
                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                    {step.detail && <div className="bg-blue-50 p-2 rounded-lg"><p className="text-xs text-blue-700 font-medium">{step.detail}</p></div>}
                  </div>
                  {currentSymptomCompletedSteps.has(index) && <Check className="text-green-500" size={24} />}
                </div>
              </div>
            ))}
          </div>

          {allStepsCompleted && completionMessage && (
            <div className="mt-6 bg-gradient-to-r from-yellow-200 to-orange-200 p-6 rounded-2xl text-center animate-bounce">
              <div className="text-6xl mb-2">🎉</div>
              <h3 className="text-xl font-bold text-orange-700">Missão Cumprida!</h3>
              <p className="text-orange-600">{completionMessage}</p>
              <div className="flex justify-center mt-2"><Award className="text-yellow-500" size={32} /></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};