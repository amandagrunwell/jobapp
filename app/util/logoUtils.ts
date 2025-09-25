// utils/logoUtils.ts
export const convertSvgToPng = async (svgString: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/png"));
      } else {
        reject(new Error("Could not get canvas context"));
      }
    };

    img.onerror = () => reject(new Error("Failed to load SVG"));
    img.src = url;
  });
};

export const getLogoDataUrl = async (): Promise<string> => {
  const svgString = `
    <svg width="160" height="40" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="40" height="40" rx="8" fill="#4f46e5"/>
      <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-weight="bold" font-size="18">A</text>
      <text x="50" y="25" fill="#1f2937" font-family="Arial, sans-serif" font-weight="600" font-size="16">ApexFocusGroup</text>
    </svg>
  `;

  return await convertSvgToPng(svgString);
};
