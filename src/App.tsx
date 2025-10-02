import { useState, useEffect } from 'react';
import { symptoms } from './data';
import type { SymptomKey } from './data';

import { HomeScreen } from './components/HomeScreen.tsx';
import { SymptomScreen } from './components/SymptomScreen.tsx';
import { BrushingGuideScreen } from './components/BrushingGuideScreen.tsx';
import { ChecklistScreen } from './components/ChecklistScreen.tsx';
import { AboutScreen } from './components/AboutScreen.tsx';
import { StoriesScreen } from './components/StoriesScreen.tsx';
import { ParentsScreen } from './components/ParentsScreen.tsx';
import { MedalHallScreen } from './components/MedalHallScreen.tsx';
import { VideoModal } from './components/VideoModal.tsx';

export type Medals = Record<SymptomKey | 'checklist', string[]>;

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const initialMedals: Medals = {
  gengivite: [],
  halitose: [],
  carie: [],
  checklist: [],
};

type ChecklistState = Record<"brushThreeTimes" | "floss" | "fruits" | "vegetables" | "fewSweets" | "water", boolean>;
type ChecklistItem = keyof ChecklistState;

const App = () => {
  const getScreenFromPath = () => {
    const path = window.location.pathname.slice(1);
    // Lista de telas válidas para evitar rotas arbitrárias
    const validScreens = ['inicio', 'pais', 'missao', 'historias', 'sobre', 'trofeus', ...Object.keys(symptoms).map(k => `sintoma-${k}`), ...Object.keys(symptoms).map(k => `escovacao-${k}`)];
    if (validScreens.includes(path)) {
      return path;
    }
    // Se o caminho for vazio ou inválido, retorna para a home
    return 'inicio';
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

  const [brushingSteps, setBrushingSteps] = useState(() => {
    const today = getTodayDateString();
    const savedData = localStorage.getItem('sorrisinhoFeliz_brushingData');
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.date === today) {
        // O Set precisa ser reconstruído a partir do array salvo
        return new Map<SymptomKey, Set<number>>(Object.entries(data.steps).map(([key, value]) => [key as SymptomKey, new Set(value as number[])]));
      }
    }
    return new Map<SymptomKey, Set<number>>();
  });

  const [medalAwardedToday, setMedalAwardedToday] = useState(false);
  const [medals, setMedals] = useState<Medals>(() => {
    const savedMedals = localStorage.getItem('sorrisinhoFeliz_medalsByCategory');
    return savedMedals ? { ...initialMedals, ...JSON.parse(savedMedals) } : initialMedals;
  });

  // State for BrushingGuideScreen
  const [brushingTimer, setBrushingTimer] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);

  const [videoModalContent, setVideoModalContent] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    const today = getTodayDateString();
    const dataToSave = JSON.stringify({ date: today, checklist });
    localStorage.setItem('sorrisinhoFeliz_dailyData', dataToSave);
  }, [checklist]);

  useEffect(() => {
    const today = getTodayDateString();
    const dataToSave = JSON.stringify({ date: today, steps: Object.fromEntries(Array.from(brushingSteps.entries()).map(([key, value]) => [key, [...value]])) });
    localStorage.setItem('sorrisinhoFeliz_brushingData', dataToSave);
  }, [brushingSteps]);

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
    const path = currentScreen === 'inicio' ? '/' : `/${currentScreen}`;
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

  const navigate = (screen: string) => setCurrentScreen(screen);

  useEffect(() => {
    if (currentScreen.startsWith('escovacao-')) {
      setBrushingTimer(120);
      setIsPlaying(false);
    }
  }, [currentScreen]);

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

  // Screen routing
  return (
    <>
      <VideoModal content={videoModalContent} onClose={() => setVideoModalContent(null)} />
      {(() => {
        if (currentScreen === 'inicio') return <HomeScreen onNavigate={navigate} />;
        if (currentScreen.startsWith('sintoma-')) {
          const symptomKey = currentScreen.replace('sintoma-', '') as SymptomKey;
          return <SymptomScreen symptomKey={symptomKey} onNavigate={navigate} />;
        }
        if (currentScreen.startsWith('escovacao-')) {
          const symptomKey = currentScreen.replace('escovacao-', '') as SymptomKey;
          return <BrushingGuideScreen
            symptomKey={symptomKey}            
            onNavigate={navigate}
            medals={medals}
            setMedals={setMedals}
            brushingTimer={brushingTimer}
            setBrushingTimer={setBrushingTimer}            
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            completedSteps={brushingSteps}
            setCompletedSteps={setBrushingSteps}
            setVideoModalContent={setVideoModalContent}
          />;
        }
        if (currentScreen === 'missao') return <ChecklistScreen
          onNavigate={navigate}
          checklist={checklist}
          toggleChecklistItem={toggleChecklistItem}
          medals={medals}
          medalAwardedToday={medalAwardedToday}
          setVideoModalContent={setVideoModalContent}
        />;
        if (currentScreen === 'sobre') return <AboutScreen onNavigate={navigate} onResetData={handleResetData} />;
        if (currentScreen === 'historias') return <StoriesScreen onNavigate={navigate} medals={medals} />;
        if (currentScreen === 'pais') return <ParentsScreen onNavigate={navigate} setVideoModalContent={setVideoModalContent} />;
        if (currentScreen === 'trofeus') return <MedalHallScreen onNavigate={navigate} medals={medals} />;
        return <HomeScreen onNavigate={navigate} />;
      })()}
    </>
  );
};

export default App;