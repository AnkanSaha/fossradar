"use client";

import { Share2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faLinkedin, faFacebook, faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [showNativeShare, setShowNativeShare] = useState(false);

  // Create share text with description
  const shareText = `${title}\n\n${description}\n\n`;
  const twitterText = `${title}\n\n${description}`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + url)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: url,
        });
      } catch (err) {
        // User cancelled or error occurred
        console.log("Share cancelled or failed:", err);
      }
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
        <Share2 className="h-4 w-4" />
        Share:
      </span>

      {/* Twitter/X */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        aria-label="Share on X (Twitter)"
        title="Share on X"
      >
        <FontAwesomeIcon icon={faXTwitter} className="h-4 w-4" />
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <FontAwesomeIcon icon={faLinkedin} className="h-4 w-4" />
      </a>

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <FontAwesomeIcon icon={faFacebook} className="h-4 w-4" />
      </a>

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
      </a>

      {/* Instagram - Uses native share on mobile or copies text */}
      <button
        onClick={handleNativeShare}
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        aria-label="Share to Instagram"
        title="Share (includes Instagram on mobile)"
      >
        <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xs font-medium text-gray-700 dark:text-gray-300 min-h-[44px]"
        aria-label="Copy link with description"
        title="Copy link with description"
      >
        {copied ? "✓ Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
