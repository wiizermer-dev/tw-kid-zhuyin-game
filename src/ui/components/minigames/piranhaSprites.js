// L5 食人魚救屈原 sprite。炮船複用龍舟造型，粽子炮複用 Zongzi（從共用檔 import）。

// 食人魚（Q 版兇魚，朝右；繪製時依游向 rotate）
export const PIRANHA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="0 0 100 70">
<path d="M14 35 C14 22 30 14 50 14 C66 14 80 22 86 35 C80 48 66 56 50 56 C30 56 14 48 14 35 Z" fill="#6B8E3A" stroke="#4A6526" stroke-width="3" stroke-linejoin="round"/>
<path d="M14 35 C6 26 4 22 2 18 C10 20 16 26 20 32 Z" fill="#4A6526"/>
<path d="M14 35 C6 44 4 48 2 52 C10 50 16 44 20 38 Z" fill="#4A6526"/>
<path d="M50 14 C54 8 58 6 62 6 C60 12 56 16 54 18 Z" fill="#4A6526"/>
<circle cx="70" cy="30" r="6" fill="#fff"/><circle cx="72" cy="30" r="3" fill="#3D2C29"/>
<path d="M58 44 L64 40 L66 46 L72 42 L74 48 L80 44" fill="none" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/>
</svg>`;

// 掙扎中的屈原（水中露出上半身 + 雙手，Q 版；體力環另畫於 canvas）
export const QUYUAN_STRUGGLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
<ellipse cx="50" cy="78" rx="34" ry="10" fill="#2E6E86" opacity="0.5"/>
<path d="M30 72 C30 56 38 46 50 46 C62 46 70 56 70 72 Z" fill="#F3EAD8" stroke="#C9BCA0" stroke-width="2.5"/>
<path d="M30 72 C30 60 34 52 40 48 L40 72 Z M70 72 C70 60 66 52 60 48 L60 72 Z" fill="#5BA86B" opacity="0.5"/>
<circle cx="50" cy="34" r="15" fill="#FBE3C6" stroke="#E0B88C" stroke-width="2.5"/>
<path d="M35 30 C34 18 44 12 50 12 C56 12 66 18 65 30 C60 24 54 22 50 22 C46 22 40 24 35 30 Z" fill="#3D2C29"/>
<path d="M50 12 C54 10 58 12 58 16 C56 14 52 14 50 16 Z" fill="#5BA86B"/>
<circle cx="44" cy="34" r="2" fill="#3D2C29"/><circle cx="56" cy="34" r="2" fill="#3D2C29"/>
<path d="M44 42 C47 45 53 45 56 42" fill="none" stroke="#C97B3A" stroke-width="2" stroke-linecap="round"/>
<path d="M30 60 C20 54 14 46 16 40 C22 42 28 50 34 56 Z" fill="#FBE3C6" stroke="#E0B88C" stroke-width="2.5"/>
<path d="M70 60 C80 54 86 46 84 40 C78 42 72 50 66 56 Z" fill="#FBE3C6" stroke="#E0B88C" stroke-width="2.5"/>
</svg>`;

// 龍舟粽子炮船（俯視，可朝任意方向；繪製時 rotate 對準移動方向）
export const CANNON_BOAT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="120" viewBox="0 0 80 120">
<ellipse cx="40" cy="62" rx="22" ry="48" fill="#E5544A" stroke="#B83A33" stroke-width="3"/>
<ellipse cx="40" cy="62" rx="13" ry="38" fill="#C9433C"/>
<path d="M40 14 C30 8 28 -2 34 -6 C40 0 40 8 40 14 Z M40 14 C50 8 52 -2 46 -6 C40 0 40 8 40 14 Z" fill="#FFB347"/>
<circle cx="40" cy="20" r="6" fill="#FFC93C" stroke="#B83A33" stroke-width="2"/>
<rect x="34" y="40" width="12" height="44" rx="6" fill="#9A5E2A"/>
</svg>`;
