import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Check, Award, Users, Book, Info, Github, HelpCircle } from 'lucide-react';
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

const SorrisinhoFelizApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [checklist, setChecklist] = useState({
    brushThreeTimes: false,
    floss: false,
    fruits: false,
    vegetables: false,
    fewSweets: false,
    water: false,
  });
  const [medals, setMedals] = useState(0);
  const [brushingTimer, setBrushingTimer] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [videoModalContent, setVideoModalContent] = useState<{ src: string; title: string } | null>(null);
  const [expandedStories, setExpandedStories] = useState<Set<number>>(new Set());

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
    if (completed === 6 && Object.values(checklist).filter(Boolean).length < 6) {
      setMedals(prev => prev + 1);
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
    const allStepsCompleted = completedSteps.size > 0 && completedSteps.size === guide.length;
    const handleToggleComplete = (index: number) => {
      setCompletedSteps(prev => {
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
                key={index}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all bg-gray-50 border-gray-200 ${completedSteps.has(index) ? 'bg-green-100 border-green-400' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 relative">
                    <span className="text-3xl">{step.emoji}</span>
                    {step.step.toLowerCase().includes('fio dental') ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: fioDentalVideo, title: 'Como usar o Fio Dental?' }); }}
                        className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5">
                        <HelpCircle size={16} />
                      </button>
                    ) : step.step.toLowerCase().includes('escovar os dentinhos') ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: escovacaoVideo, title: 'Como Escovar os Dentinhos?' }); }}
                        className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5">
                        <HelpCircle size={16} />
                      </button>
                    ) : step.step.toLowerCase().includes('língua') || step.step.toLowerCase().includes('línguinha') ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: limparLinguaVideo, title: 'Como Limpar a Língua?' }); }}
                        className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5">
                        <HelpCircle size={16} />
                      </button>
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
      <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setCurrentScreen('home')}
            className="mb-4 p-2 bg-white rounded-full shadow-md"
          >
            <ArrowLeft className="text-blue-600" size={24} />
          </button>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-2">Missão Sorriso Brilhante</h2>
              <div className="text-6xl mb-2">🏆</div>
              <p className="text-gray-600">Checklist para fazer ao final do dia. Você foi muito bem, agora vamos ter uma boa noite do sono.</p>
            </div>

            {isComplete && (
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
            <button
              onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: fioDentalVideo, title: 'Como usar o Fio Dental?' }); }}
              className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5">
              <HelpCircle size={16} />
            </button>
          ) : task.key === 'brushThreeTimes' ? (
            <button
              onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: escovacaoVideo, title: 'Como Escovar os Dentinhos?' }); }}
              className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5">
              <HelpCircle size={16} />
            </button>
          ) : task.label.toLowerCase().includes('língua') ? ( // This is less ideal, but works for the checklist
            <button
              onClick={(e) => { e.stopPropagation(); setVideoModalContent({ src: limparLinguaVideo, title: 'Como Limpar a Língua?' }); }}
              className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-0.5">
              <HelpCircle size={16} />
            </button>
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
              <p className="text-blue-700 font-bold">Medalhas conquistadas: {medals}</p>
              <p className="text-blue-600">Progresso: {completedTasks}/6 tarefas</p>
            </div>
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

  const renderStoriesScreen = () => (
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
            {stories.map((story, index) => {
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
            })}
          </div>

          <div className="mt-6 text-center">
            <div className="text-6xl mb-2">📖</div>
            <p className="text-purple-700 font-bold">Mais histórias chegando em breve!</p>
          </div>
        </div>
      </div>
    </div>
  );

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
        return renderHomeScreen();
      })()}
    </>
  );
};

export default SorrisinhoFelizApp;