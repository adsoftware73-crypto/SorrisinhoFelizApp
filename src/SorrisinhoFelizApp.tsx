import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Check, Award, Book, Info, Github, HelpCircle, Trophy, Trash2 } from 'lucide-react';
import { mascotPhrases, symptoms, stories, checklistTasks, authors, orientadores, parentsInfo } from './data';
import type { SymptomKey } from './data';
import { version } from '../package.json';

// Importe suas imagens aqui. Substitua pelos nomes corretos dos seus arquivos.
import fioDentalVideo from './assets/video/fiodental.mp4';
import escovacaoVideo from './assets/video/esovacao.mp4';
import limparLinguaVideo from './assets/video/limparlingua.mp4';
import carieImg1 from './assets/carie/carie1.jpg';
import carieImg2 from './assets/carie/carie2.jpg';
import carieImg3 from './assets/carie/carie3.jpg';
import carieImg4 from './assets/carie/carie4.jpg';

const getTodayDateString = () => new Date().toISOString().split('T')[0];

type MedalCategories = SymptomKey | 'checklist';
type Medals = Record<MedalCategories, string[]>;

const initialMedals: Medals = {
  gengivite: [],
  halitose: [],
  carie: [],
  checklist: [],
};
const SorrisinhoFelizApp = () => {
  const getScreenFromPath = () => {
    const path = window.location.pathname.slice(1);
    // Lista de telas válidas para evitar rotas arbitrárias
    const validScreens = ['home', 'parents', 'checklist', 'stories', 'about', 'medalHall', ...Object.keys(symptoms).map(k => `symptom-${k}`), ...Object.keys(symptoms).map(k => `brushing-${k}`)];
    if (validScreens.includes(path)) {
      return path;
    }
    // Se o caminho for vazio ou inválido, retorna para a home
    return 'home';
  };

  const [currentScreen, setCurrentScreen] = useState(getScreenFromPath);

  const [checklist, setChecklist] = useState(() => {
    const today = getTodayDateString();
    const savedData = localStorage.getItem('sorrisinhoFeliz_dailyData');
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.date === today) {
        return data.checklist;
      }
    }
    return {
      brushThreeTimes: false,
      floss: false,
      fruits: false,
      vegetables: false,
      fewSweets: false,
      water: false,
    };
  });
  const [medalAwardedToday, setMedalAwardedToday] = useState(false);
  const [medals, setMedals] = useState<Medals>(() => {
    const savedMedals = localStorage.getItem('sorrisinhoFeliz_medalsByCategory');
    return savedMedals ? { ...initialMedals, ...JSON.parse(savedMedals) } : initialMedals;
  });

  const [brushingTimer, setBrushingTimer] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [videoModalContent, setVideoModalContent] = useState<{ src: string; title: string } | null>(null);
  const [expandedStories, setExpandedStories] = useState<Set<number>>(new Set());

  useEffect(() => {
    const today = getTodayDateString();
    const dataToSave = JSON.stringify({ date: today, checklist });
    localStorage.setItem('sorrisinhoFeliz_dailyData', dataToSave);
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('sorrisinhoFeliz_medalsByCategory', JSON.stringify(medals));
  }, [medals]);

  const handleResetData = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Tem certeza de que deseja apagar todo o seu progresso? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('sorrisinhoFeliz_dailyData');
      localStorage.removeItem('sorrisinhoFeliz_medalsByCategory');
      window.location.reload();
    }
  };

  // Sincroniza a URL com a tela atual
  useEffect(() => {
    const path = currentScreen === 'home' ? '/' : `/${currentScreen}`;
    if (window.location.pathname !== path) {
      window.history.pushState({ screen: currentScreen }, '', path);
    }
  }, [currentScreen]);

  // Ouve os eventos de 'voltar/avançar' do navegador
  useEffect(() => {
    const handlePopState = (_event: PopStateEvent) => {
      setCurrentScreen(getScreenFromPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
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

  // Efeito para conceder medalhas dos guias de sintomas
  useEffect(() => {
    if (!currentScreen.startsWith('brushing-')) return;

    const symptomKey = currentScreen.replace('brushing-', '') as SymptomKey;
    const guide = symptoms[symptomKey]?.brushingGuide;

    if (guide && completedSteps.size === guide.length) {
      const today = getTodayDateString();
      if (!medals[symptomKey].includes(today)) {
        setMedals((prev: Medals) => ({
          ...prev,
          [symptomKey]: [...prev[symptomKey], today],
        }));
      }
    }
  }, [completedSteps, currentScreen, medals]);

  useEffect(() => {
    if (currentScreen.startsWith('brushing-')) {
      setCompletedSteps(new Set());
      setBrushingTimer(120);
      setIsPlaying(false);
    }
  }, [currentScreen]);

// Defina o tipo com base nas chaves do seu estado do checklist
type ChecklistItem = keyof typeof checklist;

const toggleChecklistItem = (item: ChecklistItem) => {
  const newChecklist = { ...checklist, [item]: !checklist[item] };
  setChecklist(newChecklist);
    
    const completed = Object.values(newChecklist).filter(Boolean).length;
    const today = getTodayDateString();

    // Garante que a medalha seja concedida apenas uma vez por dia
    if (completed === 6 && !medals.checklist.includes(today)) {
      setMedals((prev: Medals) => ({
        ...prev,
        checklist: [...prev.checklist, today]
      }));
      setMedalAwardedToday(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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

  const renderMascot = () => (
    <div className="flex flex-col items-center mb-6">
      <div className="w-32 h-32 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-6xl animate-bounce shadow-lg">
        😊
      </div>
      <div className="bg-white p-3 rounded-xl shadow-md mt-4 max-w-xs text-center">
        <p className="text-blue-600 font-medium">{mascotPhrases[0]}</p>
      </div>
    </div>
  );

  const renderHomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-green-200 to-blue-200 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">Sorrisinho Feliz</h1>
          <p className="text-blue-600">Cuidando do seu sorriso! ✨</p>
        </div>

        {renderMascot()}

        <div className="space-y-4">
          <button
            onClick={() => setCurrentScreen('parents')}
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
              onClick={() => setCurrentScreen(`symptom-${key}`)}
              className={`w-full p-4 ${symptom.color} border-2 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{symptom.emoji}</span>
                <span className="text-xl font-bold text-gray-700">{symptom.title}</span>
              </div>
            </button>
          ))}

          <button
            onClick={() => setCurrentScreen('checklist')}
            className="w-full p-4 bg-gradient-to-r from-green-200 to-teal-200 border-2 border-green-300 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <div className="flex items-center space-x-4">
              <span className="text-4xl">✅</span>
              <span className="text-xl font-bold text-gray-700">Missão Sorriso Brilhante</span>
            </div>
          </button>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={() => setCurrentScreen('medalHall')}
            className="bg-amber-500 text-white px-4 py-2 rounded-full flex items-center space-x-2"
          >
            <Trophy size={16} />
            <span>Troféus</span>
          </button>
          <button
            onClick={() => setCurrentScreen('stories')}
            className="bg-purple-500 text-white px-4 py-2 rounded-full flex items-center space-x-2"
          >
            <Book size={16} />
            <span>Histórias</span>
          </button>
          <button
            onClick={() => setCurrentScreen('about')}
            className="bg-gray-500 text-white px-4 py-2 rounded-full flex items-center space-x-2"
          >
            <Info size={16} />
            <span>Sobre</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSymptomScreen = (symptomKey: SymptomKey) => {
  const symptom = symptoms[symptomKey];
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setCurrentScreen('home')}
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
              onClick={() => setCurrentScreen(`brushing-${symptomKey}`)}
              className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white p-4 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Como cuidar? 🌟
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderBrushingGuideScreen = (symptomKey: SymptomKey) => {
    const guide = symptoms[symptomKey].brushingGuide;
    const completionMessage = symptoms[symptomKey].completionMessage;
    const allStepsCompleted = completedSteps.size > 0 && completedSteps.size === guide.length; // This line seems correct, no change needed.
    const handleToggleComplete = (index: number) => {
      setCompletedSteps((prev: Set<number>) => {
        const newSet = new Set(prev);
        if (newSet.has(index)) newSet.delete(index);
        else newSet.add(index);
        return newSet;
      });
    };
    const title = `Escovação para ${symptoms[symptomKey].title}`;
    return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-pink-100 p-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => setCurrentScreen(`symptom-${symptomKey}`)}
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
                key={index} // A div externa agora é o container principal do item
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all bg-gray-50 border-gray-200 ${completedSteps.has(index) ? 'bg-green-100 border-green-400' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 relative">
                    <span className="text-3xl">{step.emoji}</span>
                    {step.step.toLowerCase().includes('fio dental') ? (
                      <div // Trocado button por div para evitar aninhamento ilegal
                        onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: fioDentalVideo, title: 'Como usar o Fio Dental?' }); }}
                        className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5">
                        <HelpCircle size={16} />
                      </div>
                    ) : step.step.toLowerCase().includes('escovar os dentinhos') ? (
                      <div
                        onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: escovacaoVideo, title: 'Como Escovar os Dentinhos?' }); }}
                        className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5">
                        <HelpCircle size={16} />
                      </div>
                    ) : step.step.toLowerCase().includes('língua') || step.step.toLowerCase().includes('línguinha') ? (
                      <div
                        onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: limparLinguaVideo, title: 'Como Limpar a Língua?' }); }}
                        className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5">
                        <HelpCircle size={16} />
                      </div>
                    ) : (
                      null
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-700 mb-1">{step.step}</h3>
                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                    {step.detail && (
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <p className="text-xs text-blue-700 font-medium">{step.detail}</p>
                      </div>
                    )}
                  </div>
                  {completedSteps.has(index) && <Check className="text-green-500" size={24} />}
                </div>
              </div>
            ))}
          </div>

          {allStepsCompleted && completionMessage && (
            <div className="mt-6 bg-gradient-to-r from-yellow-200 to-orange-200 p-6 rounded-2xl text-center animate-bounce">
              <div className="text-6xl mb-2">🎉</div>
              <h3 className="text-xl font-bold text-orange-700">Missão Cumprida!</h3>
              <p className="text-orange-600">{completionMessage}</p>
              <div className="flex justify-center mt-2">
                <Award className="text-yellow-500" size={32} />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
  }

  const renderChecklistScreen = () => {
    const completedTasks = Object.values(checklist).filter(Boolean).length;
    const isComplete = completedTasks === 6;
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-teal-100 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setCurrentScreen('home')}
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
                  key={task.key} // O botão já é o container principal
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
                        <div // Trocado button por div
                          onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: fioDentalVideo, title: 'Como usar o Fio Dental?' }); }}
                          className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5">
                          <HelpCircle size={16} />
                        </div>
                      ) : task.key === 'brushThreeTimes' ? (
                        <div
                          onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: escovacaoVideo, title: 'Como Escovar os Dentinhos?' }); }}
                          className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5">
                          <HelpCircle size={16} />
                        </div>
                      ) : task.label.toLowerCase().includes('língua') ? ( // This is less ideal, but works for the checklist
                        <div
                          onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: limparLinguaVideo, title: 'Como Limpar a Língua?' }); }}
                          className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5">
                          <HelpCircle size={16} />
                        </div>
                      ) : (
                        null
                      )}
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

  const renderMedalHallScreen = () => {
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
          <button onClick={() => setCurrentScreen('home')} className="mb-4 p-2 bg-white rounded-full shadow-md">
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

  const renderAboutScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => setCurrentScreen('home')}
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
              onClick={handleResetData}
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

  const renderParentsScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => setCurrentScreen('home')}
          className="mb-4 p-2 bg-white rounded-full shadow-md"
        >
          <ArrowLeft className="text-blue-600" size={24} />
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            Informações para os Pais 👨‍👩‍👧‍👦
          </h2>

          <div className="space-y-6">  
            {parentsInfo.map(info => (
              <div key={info.title} className={`bg-${info.color}-50 p-4 rounded-2xl border border-${info.color}-200`}>
                <h3 className={`font-bold text-${info.color}-700 mb-2`}>{info.emoji} {info.title}</h3>
                {info.description && <p className="text-sm text-gray-700 mb-2">{info.description}</p>}
                {info.subTitle && <h4 className="font-semibold text-gray-800 mt-2 mb-1">{info.subTitle}</h4>}
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                  {info.points.map((point, index) => {
                    const hasFioDental = point.toLowerCase().includes('fio dental');
                    return (
                      <li key={index} className={hasFioDental ? 'flex items-center' : ''}>
                        <span dangerouslySetInnerHTML={{ __html: point }} />
                        {hasFioDental && (
                          <button
                            onClick={() => setVideoModalContent({ src: fioDentalVideo, title: 'Como usar o Fio Dental?' })}
                            className="ml-2 bg-blue-500 text-white rounded-full p-0.5 flex-shrink-0"
                          >
                            <HelpCircle size={16} />
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
                {info.title === 'Cárie' && (
                  <>
                    <p className="text-sm text-gray-700 mt-4 mb-2">Fotos representando diversos estados da Cárie:</p>
                    <div className="grid grid-cols-2 gap-4">
                      <img src={carieImg1} alt="Exemplo de cárie dentária" className="rounded-lg shadow-md w-full h-auto object-cover" />
                      <img src={carieImg2} alt="Dente com cárie" className="rounded-lg shadow-md w-full h-auto object-cover" />
                      <img src={carieImg3} alt="Ilustração de cárie" className="rounded-lg shadow-md w-full h-auto object-cover" />
                      <img src={carieImg4} alt="Outro exemplo de cárie" className="rounded-lg shadow-md w-full h-auto object-cover" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVideoModal = () => {
    if (!videoModalContent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setVideoModalContent(null)}>
        <div className="bg-white p-4 rounded-2xl shadow-xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-lg font-bold text-blue-700 mb-2 text-center">{videoModalContent.title}</h3>
          <video src={videoModalContent.src} controls autoPlay className="w-full rounded-md mb-4"></video>
          <button
            onClick={() => setVideoModalContent(null)}
            className="w-full bg-red-500 text-white p-3 rounded-xl font-bold"
          >
            Fechar Vídeo
          </button>
        </div>
      </div>
    );
  };

  const renderStoriesScreen = () => {
    const totalMedals = Object.values(medals).reduce((sum, dates: string[]) => sum + dates.length, 0);
    const unlockedStories = stories.slice(0, totalMedals);

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setCurrentScreen('home')}
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
                        <h3 className="text-2xl font-bold text-purple-700 mb-2 text-center">
                          {story.title} {story.emoji}
                        </h3>
                      </button>

                      {isExpanded && (
                        <>
                          <div className="mt-4 text-gray-700 space-y-4 whitespace-pre-line">
                            {story.body.split('\n\n').map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-base leading-relaxed">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t-2 border-purple-100">
                            <p className="text-purple-800 font-semibold italic text-center">
                              <strong>Moral da história:</strong> {story.moral}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500">Você ainda não desbloqueou nenhuma história. Conquiste medalhas para começar!</p>
              )}
            </div>

            <div className="mt-6 text-center">
              <div className="text-6xl mb-2">📖</div>
              <p className="text-purple-700 font-bold">Conquiste mais medalhas para liberar mais historinhas</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Screen routing
  return (
    <>
      {renderVideoModal()}
      {(() => {
        if (currentScreen === 'home') return renderHomeScreen();
        if (currentScreen.startsWith('symptom-')) {
          const symptomKey = currentScreen.replace('symptom-', '') as SymptomKey;
          return renderSymptomScreen(symptomKey);
        }
        if (currentScreen.startsWith('brushing-')) {
          const symptomKey = currentScreen.replace('brushing-', '') as SymptomKey;
          return renderBrushingGuideScreen(symptomKey);
        }
        if (currentScreen === 'checklist') return renderChecklistScreen();
        if (currentScreen === 'about') return renderAboutScreen();
        if (currentScreen === 'stories') return renderStoriesScreen();
        if (currentScreen === 'parents') return renderParentsScreen();
        if (currentScreen === 'medalHall') return renderMedalHallScreen();
        return renderHomeScreen();
      })()}
    </>
  );
};

export default SorrisinhoFelizApp;