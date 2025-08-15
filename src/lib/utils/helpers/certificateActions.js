
export const handleCopyLink = async (setCopySuccess) => {
  if (typeof window !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  } else {
    console.error("Clipboard API not available");
  }
};

export const handleShare = (platform, shareText) => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(shareText);

  let shareUrl = "";

  switch (platform) {
    case "whatsapp":
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
      break;
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    default:
      return;
  }

  window.open(shareUrl, "_blank", "noopener,noreferrer");
};
