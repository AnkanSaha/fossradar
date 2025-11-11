"use client";

import { Share2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faLinkedin, faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [supportsNativeShare] = useState(() =>
    typeof navigator !== 'undefined' && 'share' in navigator
  );

  // Format share text with description
  const twitterText = `${title}\n\n${description}\n\n${url}`;
  const whatsappText = `*${title}*\n\n${description}\n\n${url}`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(whatsappText)}`,
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: title,
        text: description,
        url: url,
      });
    } catch (err) {
      // User cancelled or error occurred
      console.log("Native share cancelled or failed:", err);
    }
  };

  const handleCopyLink = async () => {
    try {
      // Copy formatted text with description and URL
      const textToCopy = `${title}\n\n${description}\n\n${url}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
        <Share2 className="h-4 w-4" />
        Share:
      </span>
      {supportsNativeShare && (
        <button
          onClick={handleNativeShare}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-blue-600 hover:bg-blue-700 transition-colors text-xs font-medium text-white"
          aria-label="Share via system"
        >
          Share
        </button>
      )}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        aria-label="Share on X (Twitter)"
      >
        <FontAwesomeIcon icon={faXTwitter} className="h-4 w-4" />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        aria-label="Share on LinkedIn"
      >
        <FontAwesomeIcon icon={faLinkedin} className="h-4 w-4" />
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        aria-label="Share on Facebook"
      >
        <FontAwesomeIcon icon={faFacebook} className="h-4 w-4" />
      </a>
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        aria-label="Share on WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
      </a>
      <button
        onClick={handleCopyLink}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xs font-medium text-gray-700 dark:text-gray-300"
        aria-label="Copy link"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
