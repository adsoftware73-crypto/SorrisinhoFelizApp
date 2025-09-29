import { ArrowLeft, HelpCircle } from 'lucide-react';
import { parentsInfo } from '../data';

import fioDentalVideo from '../assets/video/fiodental.mp4';
import carieImg1 from '../assets/carie/carie1.jpg';
import carieImg2 from '../assets/carie/carie2.jpg';
import carieImg3 from '../assets/carie/carie3.jpg';
import carieImg4 from '../assets/carie/carie4.jpg';

interface ParentsScreenProps {
  onNavigate: (screen: string) => void;
  setVideoModalContent: (content: { src: string; title: string } | null) => void;
}

export const ParentsScreen = ({ onNavigate, setVideoModalContent }: ParentsScreenProps) => (
  <div className="min-h-screen bg-gradient-to-b from-blue-100 to-gray-100 p-4">
    <div className="max-w-md mx-auto">
      <button
        onClick={() => onNavigate('inicio')}
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