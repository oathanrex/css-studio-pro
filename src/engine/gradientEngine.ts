import type { GradientState } from '../types';

export function buildGradientCss(state: GradientState): string {
  const sortedStops = [...state.stops].sort((a, b) => a.position - b.position);
  const stopsStr = sortedStops.map((s) => `${s.color} ${s.position}%`).join(', ');

  switch (state.type) {
    case 'linear':
      return `linear-gradient(${state.angle}deg, ${stopsStr})`;
    case 'radial':
      return `radial-gradient(${state.radialShape} at ${state.radialPosition}, ${stopsStr})`;
    case 'conic':
      return `conic-gradient(from ${state.angle}deg at 50% 50%, ${stopsStr})`;
    case 'repeating-linear':
      return `repeating-linear-gradient(${state.angle}deg, ${stopsStr})`;
    case 'mesh': {
      const c1 = state.stops[0]?.color || '#4f46e5';
      const c2 = state.stops[1]?.color || '#06b6d4';
      const c3 = state.stops[2]?.color || '#f43f5e';
      return `radial-gradient(at 0% 0%, ${c1} 0px, transparent 50%), radial-gradient(at 100% 0%, ${c2} 0px, transparent 50%), radial-gradient(at 100% 100%, ${c3} 0px, transparent 50%)`;
    }
    default:
      return `linear-gradient(${state.angle}deg, ${stopsStr})`;
  }
}

export function buildTailwindCss(state: GradientState): string {
  if (state.type === 'linear') {
    let dir = 'to-r';
    if (state.angle >= 315 || state.angle < 45) dir = 'to-t';
    else if (state.angle >= 45 && state.angle < 135) dir = 'to-r';
    else if (state.angle >= 135 && state.angle < 225) dir = 'to-b';
    else if (state.angle >= 225 && state.angle < 315) dir = 'to-l';

    const s1 = state.stops[0]?.color || '#4f46e5';
    const s2 = state.stops[state.stops.length - 1]?.color || '#06b6d4';
    return `bg-gradient-${dir} from-[${s1}] to-[${s2}]`;
  }
  return `bg-[${buildGradientCss(state)}]`;
}

export function buildSvgGradient(state: GradientState): string {
  const sortedStops = [...state.stops].sort((a, b) => a.position - b.position);
  const stopsXml = sortedStops
    .map((s) => `    <stop offset="${s.position}%" stop-color="${s.color}" />`)
    .join('\n');

  return `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cssg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
${stopsXml}
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#cssg-grad)" />
</svg>`;
}

export function generateRandomGradient(): GradientState {
  const vibrantColors = [
    '#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0',
    '#ff0844', '#ffb199', '#2af598', '#009efd', '#0ba360',
    '#3cba92', '#6a11cb', '#2575fc', '#ff416c', '#ff4b2b',
    '#11998e', '#38ef7d', '#f6d365', '#fda085', '#845ec2'
  ];

  const pick1 = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
  let pick2 = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
  while (pick2 === pick1) {
    pick2 = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
  }

  const randomAngle = [0, 45, 90, 135, 180, 225, 270][Math.floor(Math.random() * 7)];

  return {
    type: 'linear',
    angle: randomAngle,
    radialShape: 'circle',
    radialPosition: 'center',
    stops: [
      { id: '1', color: pick1, position: 0 },
      { id: '2', color: pick2, position: 100 },
    ],
  };
}
