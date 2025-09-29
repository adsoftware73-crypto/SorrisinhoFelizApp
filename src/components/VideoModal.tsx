interface VideoModalProps {
  content: { src: string; title: string } | null;
  onClose: () => void;
}

export const VideoModal = ({ content, onClose }: VideoModalProps) => {
  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white p-4 rounded-2xl shadow-xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-blue-700 mb-2 text-center">{content.title}</h3>
        <video src={content.src} controls autoPlay className="w-full rounded-md mb-4"></video>
        <button
          onClick={onClose}
          className="w-full bg-red-500 text-white p-3 rounded-xl font-bold"
        >
          Fechar Vídeo
        </button>
      </div>
    </div>
  );
};