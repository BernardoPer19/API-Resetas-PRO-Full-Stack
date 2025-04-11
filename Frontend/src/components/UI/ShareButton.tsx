import React from "react";

interface ShareButtonProps {
  showOptions: boolean;
  shareText: string;
  shareUrl: string;
  handleCopy: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  showOptions,
  shareText,
  shareUrl,
  handleCopy,
}) => {
  return (
    <div>
      {showOptions && (
        <div className="absolute mt-2 left-0 bg-white shadow-md rounded-lg p-3 z-10 w-52 space-y-2">
          <a
            href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-700 hover:text-yellow-500 transition"
          >
            WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-700 hover:text-yellow-500 transition"
          >
            Facebook
          </a>
          <a
            href={`mailto:?subject=Receta Deliciosa&body=${shareText}%20${shareUrl}`}
            className="block text-gray-700 hover:text-yellow-500 transition"
          >
            Email
          </a>
          <button
            onClick={handleCopy}
            className="block text-left text-gray-700 hover:text-yellow-500 transition w-full"
          >
            Copiar enlace
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
