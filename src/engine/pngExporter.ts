import type { GradientState } from '../types';

export function exportGradientToPng(state: GradientState, width = 1920, height = 1080): void {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const sortedStops = [...state.stops].sort((a, b) => a.position - b.position);

  if (state.type === 'radial') {
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.max(width, height) / 2;
    const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    for (const stop of sortedStops) {
      radGrad.addColorStop(Math.min(1, Math.max(0, stop.position / 100)), stop.color);
    }
    ctx.fillStyle = radGrad;
  } else {
    // Linear gradient based on angle
    const angleRad = (state.angle * Math.PI) / 180;
    const x1 = width / 2 - (Math.cos(angleRad) * width) / 2;
    const y1 = height / 2 - (Math.sin(angleRad) * height) / 2;
    const x2 = width / 2 + (Math.cos(angleRad) * width) / 2;
    const y2 = height / 2 + (Math.sin(angleRad) * height) / 2;

    const linGrad = ctx.createLinearGradient(x1, y1, x2, y2);
    for (const stop of sortedStops) {
      linGrad.addColorStop(Math.min(1, Math.max(0, stop.position / 100)), stop.color);
    }
    ctx.fillStyle = linGrad;
  }

  ctx.fillRect(0, 0, width, height);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CSS-Studio-Pro-Gradient-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 'image/png');
}
