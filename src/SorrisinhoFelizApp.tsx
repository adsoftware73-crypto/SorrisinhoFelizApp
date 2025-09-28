import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Check, Award, Users, Book, Info, Github } from 'lucide-react';
import { mascotPhrases, symptoms, generalBrushingSteps } from './data';
import type { SymptomKey } from './data';
import { version } from '../package.json';

const SorrisinhoFelizApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [checklist, setChecklist] = useState({
    morning: false,
    lunch: false,
    night: false,
    floss: false,
    tongue: false
  });
  const [medals, setMedals] = useState(0);
  const [brushingTimer, setBrushingTimer] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
  let interval: number;
  if (isPlaying && brushingTimer > 0) {
      interval = setInterval(() => {
        setBrushingTimer(prev => prev - 1);
      }, 1000);
    } else if (brushingTimer === 0) {
      setIsPlaying(false);
      setBrushingTimer(120);
    }
    return () => clearInterval(interval);
  }, [isPlaying, brushingTimer]);

// Defina o tipo com base nas chaves do seu estado do checklist
type ChecklistItem = keyof typeof checklist;

const toggleChecklistItem = (item: ChecklistItem) => {
  const newChecklist = { ...checklist, [item]: !checklist[item] };
  setChecklist(newChecklist);
    
    const completed = Object.values(newChecklist).filter(Boolean).length;
    if (completed === 5 && Object.values(checklist).filter(Boolean).length < 5) {
      setMedals(prev => prev + 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            onClick={() => setCurrentScreen('tips')}
            className="w-full p-4 bg-gradient-to-r from-purple-200 to-pink-200 border-2 border-purple-300 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <div className="flex items-center space-x-4">
              <span className="text-4xl">⭐</span>
              <span className="text-xl font-bold text-gray-700">Dicas para Sorrir Sempre</span>
            </div>
          </button>

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
            onClick={() => setCurrentScreen('parents')}
            className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center space-x-2"
          >
            <Users size={16} />
            <span>Pais</span>
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
    const title = `Escovação para ${symptoms[symptomKey].title}`;
    return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-pink-100 p-4"> // Idealmente, as cores seriam dinâmicas
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
                key={index}
                className={`p-4 rounded-2xl border-2 ${
                  currentStep === index ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-50 border-gray-200'
                } ${currentStep > index ? 'bg-green-100 border-green-400' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">{step.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-700 mb-1">{step.step}</h3>
                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                    {step.detail && (
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <p className="text-xs text-blue-700 font-medium">{step.detail}</p>
                      </div>
                    )}
                  </div>
                  {currentStep > index && <Check className="text-green-500" size={24} />}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex space-x-2">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className="flex-1 bg-gray-300 text-gray-700 p-3 rounded-xl font-bold"
              disabled={currentStep === 0}
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(guide.length - 1, currentStep + 1))}
              className="flex-1 bg-red-500 text-white p-3 rounded-xl font-bold"
              disabled={currentStep === guide.length - 1}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  }

  const renderBrushingScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => setCurrentScreen('tips')}
          className="mb-4 p-2 bg-white rounded-full shadow-md"
        >
          <ArrowLeft className="text-blue-600" size={24} />
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            Escovação Geral! 🦷✨
          </h2>

          <div className="bg-blue-100 p-4 rounded-2xl mb-6 text-center">
            <div className="text-4xl mb-2">⏰</div>
            <div className="text-2xl font-bold text-blue-700">{formatTime(brushingTimer)}</div>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="mt-2 bg-blue-500 text-white p-2 rounded-full"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>

          <div className="space-y-4">
            {generalBrushingSteps.map((step, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl border-2 ${
                  currentStep === index ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-50 border-gray-200'
                } ${currentStep > index ? 'bg-green-100 border-green-400' : ''}`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{step.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-700">{step.step}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  {currentStep > index && <Check className="text-green-500" size={24} />}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex space-x-2">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className="flex-1 bg-gray-300 text-gray-700 p-3 rounded-xl font-bold"
              disabled={currentStep === 0}
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(generalBrushingSteps.length - 1, currentStep + 1))}
              className="flex-1 bg-blue-500 text-white p-3 rounded-xl font-bold"
              disabled={currentStep === generalBrushingSteps.length - 1}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChecklistScreen = () => {
    const completedTasks = Object.values(checklist).filter(Boolean).length;
    const isComplete = completedTasks === 5;
// ▼▼▼ ADICIONE ESTE BLOCO DE CÓDIGO NOVO AQUI ▼▼▼
// 1. Definimos a "etiqueta" para cada tarefa
interface ChecklistTask {
  key: ChecklistItem; // Usando o tipo que já tínhamos
  label: string;
  emoji: string;
}

// 2. Criamos a nossa lista "etiquetada" de tarefas
const tasks: ChecklistTask[] = [
  { key: 'morning', label: 'Escovei de manhã', emoji: '🌅' },
  { key: 'lunch', label: 'Escovei depois do almoço', emoji: '🍽️' },
  { key: 'night', label: 'Escovei antes de dormir', emoji: '🌙' },
  { key: 'floss', label: 'Usei fio dental', emoji: '🧵' },
  { key: 'tongue', label: 'Escovei a língua', emoji: '👅' }
];
// ▲▲▲ FIM DO BLOCO NOVO ▲▲▲
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
              <p className="text-gray-600">Complete todas as tarefas do dia!</p>
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
  {tasks.map((task) => ( // <-- A única mudança real é aqui!
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
        <span className="text-3xl">{task.emoji}</span>
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
              <p className="text-blue-600">Progresso: {completedTasks}/5 tarefas</p>
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
              <p>Nome do Autor 1</p>
              <p>Nome do Autor 2</p>
              <p>Nome do Autor 3</p>
              {/* Adicione mais autores conforme necessário */}
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

  const renderTipsScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => setCurrentScreen('home')}
          className="mb-4 p-2 bg-white rounded-full shadow-md"
        >
          <ArrowLeft className="text-blue-600" size={24} />
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
            Dicas para Sorrir Sempre! ⭐
          </h2>

          <div className="space-y-4">
            {[
              { emoji: '🦷', title: 'Escove 3 vezes ao dia', desc: 'Manhã, depois do almoço e antes de dormir!' },
              { emoji: '🧵', title: 'Use fio dental', desc: 'Limpe entre os dentinhos com ajuda de um adulto!' },
              { emoji: '🍎', title: 'Coma frutas', desc: 'Frutas fazem bem para os dentes e são gostosas!' },
              { emoji: '🚫🍭', title: 'Menos doces', desc: 'Doces podem fazer mal para os dentes!' },
              { emoji: '💧', title: 'Beba água', desc: 'Água ajuda a limpar a boca!' },
              { emoji: '😴', title: 'Durma bem', desc: 'O sono ajuda o corpo a se cuidar!' }
            ].map((tip, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-2xl border border-blue-200">
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">{tip.emoji}</span>
                  <div>
                    <h3 className="font-bold text-gray-700 mb-1">{tip.title}</h3>
                    <p className="text-gray-600 text-sm">{tip.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <div className="text-6xl mb-4">🌟</div>
            <p className="text-blue-700 font-bold">Lembre-se: Um sorriso brilhante é um sorriso saudável!</p>
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

          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-2xl border border-red-200">
              <h3 className="font-bold text-red-700 mb-2">🦷 Gengivite</h3>
              <p className="text-sm text-gray-700 mb-2">Inflamação das gengivas causada por acúmulo de placa bacteriana.</p>
              <p className="text-xs text-red-600 font-medium">Consulte o dentista se: gengiva sangra frequentemente ou há inchaço persistente.</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
              <h3 className="font-bold text-blue-700 mb-2">💨 Halitose</h3>
              <p className="text-sm text-gray-700 mb-2">Mau hálito pode indicar problemas de higiene ou outras condições.</p>
              <p className="text-xs text-blue-600 font-medium">Consulte o dentista se: persiste mesmo com boa higiene.</p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-200">
              <h3 className="font-bold text-yellow-700 mb-2">🍬 Cárie</h3>
              <p className="text-sm text-gray-700 mb-2">Destruição do tecido dentário por bactérias e açúcar.</p>
              <p className="text-xs text-yellow-600 font-medium">Consulte o dentista se: há manchas escuras ou dor nos dentes.</p>
            </div>
          </div>

          <div className="mt-6 bg-green-50 p-4 rounded-2xl border border-green-200">
            <h3 className="font-bold text-green-700 mb-2">📅 Recomendações Gerais</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Primeira consulta aos 6 meses ou com o primeiro dente</li>
              <li>• Consultas de rotina a cada 6 meses</li>
              <li>• Supervisionar escovação até os 8-10 anos</li>
              <li>• Usar pasta com flúor (quantidade adequada à idade)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

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
          <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
            Histórias do Dentinho 📚
          </h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border border-blue-200">
              <div className="text-4xl text-center mb-2">🦷⚔️🦠</div>
              <h3 className="font-bold text-blue-700 mb-2">O Dentinho Corajoso vs. Placa Bacteriana</h3>
              <p className="text-sm text-gray-700">
                Era uma vez um dentinho muito corajoso que vivia na boca da Maria. Um dia, 
                o vilão Placa Bacteriana apareceu para causar problemas! Mas o dentinho não estava sozinho...
              </p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm">
                Ler História Completa
              </button>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-yellow-50 p-4 rounded-2xl border border-green-200">
              <div className="text-4xl text-center mb-2">🦷🎭✨</div>
              <h3 className="font-bold text-green-700 mb-2">A Festa dos Dentes Limpos</h3>
              <p className="text-sm text-gray-700">
                Todos os dentes da boca do João estavam se preparando para a grande festa! 
                Mas só poderiam participar os dentes bem limpinhos e brilhantes...
              </p>
              <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm">
                Ler História Completa
              </button>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-red-50 p-4 rounded-2xl border border-pink-200">
              <div className="text-4xl text-center mb-2">🦷👑💎</div>
              <h3 className="font-bold text-pink-700 mb-2">A Princesa Escova e o Príncipe Fio Dental</h3>
              <p className="text-sm text-gray-700">
                No reino da Boca Saudável, viviam a Princesa Escova e o Príncipe Fio Dental. 
                Juntos, eles protegiam todos os habitantes dos ataques do Rei Açúcar...
              </p>
              <button className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-full text-sm">
                Ler História Completa
              </button>
            </div>
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
  if (currentScreen === 'home') return renderHomeScreen();
if (currentScreen.startsWith('symptom-')) {
  // Usamos "as SymptomKey" para garantir o tipo correto
  const symptomKey = currentScreen.replace('symptom-', '') as SymptomKey;
  return renderSymptomScreen(symptomKey);
}
if (currentScreen.startsWith('brushing-')) {
  const symptomKey = currentScreen.replace('brushing-', '') as SymptomKey;
  return renderBrushingGuideScreen(symptomKey);
}

  if (currentScreen === 'brushing') return renderBrushingScreen();
  if (currentScreen === 'checklist') return renderChecklistScreen();
  if (currentScreen === 'tips') return renderTipsScreen();
  if (currentScreen === 'parents') return renderParentsScreen();
  if (currentScreen === 'stories') return renderStoriesScreen();
  if (currentScreen === 'about') return renderAboutScreen();

  return renderHomeScreen();
};

export default SorrisinhoFelizApp;