// 龍舟 arcade 的 canvas sprite —— SVG 字串（→ data URI → Image → drawImage）。
// 核心碰撞物全用 SVG 不用 emoji（Codex #9）：跨平台外觀/hitbox 穩定。
// 粽子造型與 Zongzi.svelte 同一份視覺語言（全 event 唯一粽子資產）。

// Q 版三角粽：粽葉 reed 綠包裹、米白尖角、綁繩（對齊 Zongzi.svelte）
export const ZONGZI_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
<path d="M50 12 C58 12 62 18 70 34 C78 50 86 64 86 74 C86 86 70 92 50 92 C30 92 14 86 14 74 C14 64 22 50 30 34 C38 18 42 12 50 12 Z" fill="#5BA86B" stroke="#3E8A52" stroke-width="3" stroke-linejoin="round"/>
<path d="M50 12 C42 12 38 18 30 34 C24 46 18 58 16 68 C30 70 42 64 48 50 C52 40 52 24 50 12 Z" fill="#3E8A52" opacity="0.55"/>
<path d="M34 80 C40 88 46 90 50 90 C54 90 60 88 66 80 C58 84 42 84 34 80 Z" fill="#F3E4C0" stroke="#C97B3A" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M22 56 C40 64 60 64 78 56" fill="none" stroke="#C97B3A" stroke-width="4.5" stroke-linecap="round"/>
<path d="M48 58 L44 50 M52 58 L56 50" fill="none" stroke="#C97B3A" stroke-width="3.5" stroke-linecap="round"/>
<ellipse cx="60" cy="30" rx="6" ry="9" fill="#fff" opacity="0.28" transform="rotate(20 60 30)"/>
</svg>`;

// 龍舟：江上龍舟剪影 + 龍頭（berry/cinnabar 紅，端午喜氣）
export const BOAT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
<ellipse cx="60" cy="80" rx="40" ry="7" fill="#000" opacity="0.12"/>
<path d="M14 56 C14 50 24 48 40 48 L96 48 C104 48 108 52 104 60 C100 70 86 74 60 74 C34 74 18 68 14 56 Z" fill="#E5544A" stroke="#B83A33" stroke-width="3" stroke-linejoin="round"/>
<path d="M40 48 L96 48 C104 48 108 52 104 60 L40 60 Z" fill="#B83A33" opacity="0.45"/>
<path d="M96 48 C108 44 116 36 112 26 C108 18 98 18 96 28 C95 33 96 40 96 48 Z" fill="#E5544A" stroke="#B83A33" stroke-width="3" stroke-linejoin="round"/>
<circle cx="104" cy="28" r="3.5" fill="#3D2C29"/>
<path d="M96 30 C102 30 106 28 108 24" fill="none" stroke="#FFB347" stroke-width="3" stroke-linecap="round"/>
<rect x="30" y="40" width="6" height="14" rx="3" fill="#FFB347"/>
<rect x="52" y="40" width="6" height="14" rx="3" fill="#FFB347"/>
<rect x="74" y="40" width="6" height="14" rx="3" fill="#FFB347"/>
</svg>`;

// 金粽子：金色粽葉版（限時驚喜，+3）—— 同造型換金色配色，與一般粽子一眼可分
export const GOLD_ZONGZI_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
<path d="M50 12 C58 12 62 18 70 34 C78 50 86 64 86 74 C86 86 70 92 50 92 C30 92 14 86 14 74 C14 64 22 50 30 34 C38 18 42 12 50 12 Z" fill="#FFC93C" stroke="#D69A18" stroke-width="3" stroke-linejoin="round"/>
<path d="M50 12 C42 12 38 18 30 34 C24 46 18 58 16 68 C30 70 42 64 48 50 C52 40 52 24 50 12 Z" fill="#E8A91E" opacity="0.6"/>
<path d="M34 80 C40 88 46 90 50 90 C54 90 60 88 66 80 C58 84 42 84 34 80 Z" fill="#FFF3D0" stroke="#D69A18" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M22 56 C40 64 60 64 78 56" fill="none" stroke="#B8801A" stroke-width="4.5" stroke-linecap="round"/>
<path d="M48 58 L44 50 M52 58 L56 50" fill="none" stroke="#B8801A" stroke-width="3.5" stroke-linecap="round"/>
<g stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.85">
<path d="M50 4 L50 12 M88 22 L82 28 M12 22 L18 28"/></g>
<ellipse cx="60" cy="30" rx="6" ry="9" fill="#fff" opacity="0.4" transform="rotate(20 60 30)"/>
</svg>`;

// 雄黃酒護盾：酒葫蘆（紅/橙，吃了短暫無敵）
export const SHIELD_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
<circle cx="50" cy="50" r="42" fill="#FFE2C0" opacity="0.45"/>
<path d="M44 22 C44 28 44 30 42 33 C34 40 30 52 32 64 C34 78 44 84 50 84 C56 84 66 78 68 64 C70 52 66 40 58 33 C56 30 56 28 56 22 Z" fill="#E5544A" stroke="#B83A33" stroke-width="3" stroke-linejoin="round"/>
<path d="M40 50 C46 54 54 54 60 50" fill="none" stroke="#B83A33" stroke-width="2.5" opacity="0.5"/>
<rect x="44" y="14" width="12" height="10" rx="2" fill="#C97B3A" stroke="#9A5E2A" stroke-width="2"/>
<path d="M46 60 C50 62 54 60 56 56" fill="none" stroke="#FFD79E" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="44" cy="44" rx="5" ry="8" fill="#fff" opacity="0.3"/>
</svg>`;

// 障礙：石頭（灰褐）
export const ROCK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
<path d="M22 64 C18 52 28 40 44 38 C58 36 72 42 78 54 C84 66 78 78 62 80 L36 80 C26 80 24 72 22 64 Z" fill="#9A8B82" stroke="#6E5F57" stroke-width="3" stroke-linejoin="round"/>
<path d="M40 50 C48 52 56 50 62 56" fill="none" stroke="#6E5F57" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
<ellipse cx="44" cy="48" rx="7" ry="5" fill="#fff" opacity="0.22"/>
</svg>`;

// 障礙：漩渦（江水深藍旋）
export const WHIRL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
<circle cx="50" cy="50" r="38" fill="#2E8FAC" stroke="#1C6E88" stroke-width="3"/>
<path d="M50 18 C72 22 78 44 64 58 C54 68 38 64 36 52 C35 44 42 40 48 44 C52 47 50 53 46 52" fill="none" stroke="#CFEFF8" stroke-width="5" stroke-linecap="round"/>
<path d="M50 82 C28 78 22 56 36 42" fill="none" stroke="#7FD0E6" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
</svg>`;
