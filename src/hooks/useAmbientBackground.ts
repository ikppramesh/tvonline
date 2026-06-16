import { useState, useEffect } from 'react';

function extractDominantColor(imgUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 10;
      canvas.height = 10;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve('#1a1d27');
        return;
      }
      ctx.drawImage(img, 0, 0, 10, 10);
      const data = ctx.getImageData(0, 0, 10, 10).data;
      let r = 0, g = 0, b = 0;
      const total = 100;
      for (let i = 0; i < total * 4; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }
      resolve(`rgb(${Math.floor(r / total)},${Math.floor(g / total)},${Math.floor(b / total)})`);
    };
    img.onerror = () => resolve('#1a1d27');
    img.src = imgUrl;
  });
}

export function useAmbientBackground(thumbnailUrl?: string) {
  const [color, setColor] = useState('#1a1d27');

  useEffect(() => {
    if (!thumbnailUrl) return;
    extractDominantColor(thumbnailUrl).then(setColor);
  }, [thumbnailUrl]);

  return color;
}
