// L2 加速龍舟競渡 sprite —— 橫向龍舟（龍頭朝右 = 前進方向）。
// 你的船（berry 紅）與對手船（藍灰）同造型換色，一眼分敵我。

const boat = (hull, hullDeep, accent) => `<svg xmlns="http://www.w3.org/2000/svg" width="130" height="90" viewBox="0 0 130 90">
<ellipse cx="62" cy="74" rx="46" ry="7" fill="#000" opacity="0.12"/>
<path d="M12 50 C12 44 24 42 42 42 L100 42 C110 42 114 46 110 56 C105 68 88 72 62 72 C34 72 16 64 12 50 Z" fill="${hull}" stroke="${hullDeep}" stroke-width="3" stroke-linejoin="round"/>
<path d="M42 42 L100 42 C110 42 114 46 110 56 L42 56 Z" fill="${hullDeep}" opacity="0.4"/>
<path d="M100 42 C113 38 122 30 118 19 C114 10 103 11 101 22 C100 28 100 35 100 42 Z" fill="${hull}" stroke="${hullDeep}" stroke-width="3" stroke-linejoin="round"/>
<circle cx="110" cy="22" r="3.5" fill="#3D2C29"/>
<path d="M101 24 C107 24 111 22 113 18" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>
<rect x="30" y="34" width="6" height="14" rx="3" fill="${accent}"/>
<rect x="54" y="34" width="6" height="14" rx="3" fill="${accent}"/>
<rect x="78" y="34" width="6" height="14" rx="3" fill="${accent}"/>
</svg>`;

export const BOAT_SVG = boat('#E5544A', '#B83A33', '#FFB347');        // 你：berry 紅 + 金槳
export const BOAT_RIVAL_SVG = boat('#7C93B5', '#566B8C', '#B8C6DA'); // 對手：藍灰
