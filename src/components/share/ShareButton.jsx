import { useState } from 'react';
import { Share2, X, Check } from 'lucide-react';
import {
  shareOnTwitter,
  shareOnFacebook,
  shareOnWhatsApp,
  shareOnLinkedIn,
  shareNative,
  copyToClipboard,
} from '../../services/shareService';

function ShareButton({ 
  title = 'Mira mi progreso en QuickFit', 
  text = '', 
  url,
  progressData = null,
  variant = 'button' // 'button' o 'icon'
}) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleNativeShare = async () => {
    const shared = await shareNative({
      title,
      text,
      url: url || window.location.href,
    });

    if (!shared) {
      setShowModal(true);
    }
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(url || window.location.href);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOptions = [
    {
      name: 'Twitter',
      icon: '𝕏',
      color: 'from-black to-gray-800',
      action: () => shareOnTwitter(text, url),
    },
    {
      name: 'Facebook',
      icon: 'f',
      color: 'from-blue-600 to-blue-700',
      action: () => shareOnFacebook(url),
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      color: 'from-green-500 to-green-600',
      action: () => shareOnWhatsApp(text, url),
    },
    {
      name: 'LinkedIn',
      icon: 'in',
      color: 'from-blue-700 to-blue-800',
      action: () => shareOnLinkedIn(url),
    },
  ];

  return (
    <>
      {variant === 'button' ? (
        <button
          onClick={handleNativeShare}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg flex items-center gap-2"
        >
          <Share2 className="w-5 h-5" />
          <span>Compartir</span>
        </button>
      ) : (
        <button
          onClick={handleNativeShare}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          title="Compartir"
        >
          <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Compartir
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => {
                    option.action();
                    setShowModal(false);
                  }}
                  className={`bg-gradient-to-r ${option.color} text-white p-4 rounded-xl font-semibold hover:opacity-90 transition flex flex-col items-center gap-2`}
                >
                  <span className="text-3xl">{option.icon}</span>
                  <span className="text-sm">{option.name}</span>
                </button>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                O copia el enlace
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={url || window.location.href}
                  readOnly
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    copied
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50'
                  }`}
                >
                  {copied ? <Check className="w-5 h-5" /> : 'Copiar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShareButton;