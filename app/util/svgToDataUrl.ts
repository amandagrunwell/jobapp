// utils/svgToDataUrl.ts
export const getLogoDataUrl = (): string => {
  const svgString = `
    <svg width="160" height="40" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="40" height="40" rx="8" fill="#4f46e5"/>
      <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial" font-weight="bold" font-size="18">A</text>
      <text x="50" y="25" fill="#1f2937" font-family="Arial" font-weight="600" font-size="16">ApexFocusGroup</text>
    </svg>
  `;

  // Clean up the SVG string
  const cleanSvgString = svgString.replace(/\s+/g, " ").trim();
  const base64 = btoa(unescape(encodeURIComponent(cleanSvgString)));
  return `data:image/svg+xml;base64,${base64}`;
};
