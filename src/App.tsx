import { useState } from "react";

const SHIRTS = [
  { id: "blanco",     name: "Blanco",     hex: "#F0EDE8" },
  { id: "negro-s",    name: "Negro",      hex: "#1C1C1C" },
  { id: "azul-medio", name: "Azul medio", hex: "#6A9BB5" },
  { id: "gris-claro", name: "Gris claro", hex: "#B0AAA4" },
];
const PANTS = [
  { id: "cafe",      name: "Café",      hex: "#8B6347" },
  { id: "negro-p",   name: "Negro",     hex: "#2A2A2A" },
  { id: "azul-jean", name: "Azul jean", hex: "#3D5A7A" },
];

function getCompatibility(s, p) {
  const c = {
    "blanco-cafe":{score:5,note:"Clásico mediterráneo"},
    "blanco-negro-p":{score:5,note:"El más clásico de todos"},
    "blanco-azul-jean":{score:5,note:"Atemporal, nunca falla"},
    "negro-s-cafe":{score:3,note:"Contraste moderado"},
    "negro-s-negro-p":{score:4,note:"Todo negro — elegante con texturas"},
    "negro-s-azul-jean":{score:5,note:"Favorita del minimalismo"},
    "azul-medio-cafe":{score:5,note:"Tonos tierra + azul = muy natural"},
    "azul-medio-negro-p":{score:4,note:"Contraste limpio y moderno"},
    "azul-medio-azul-jean":{score:3,note:"Ok si los tonos difieren bien"},
    "gris-claro-cafe":{score:5,note:"Paleta neutra perfecta"},
    "gris-claro-negro-p":{score:5,note:"Sofisticado y sin esfuerzo"},
    "gris-claro-azul-jean":{score:4,note:"Casual y fresco para el calor"},
  };
  return c[`${s.id}-${p.id}`] || {score:3,note:""};
}

// ── BACKGROUNDS ──────────────────────────────────────────────────────────────
const BACKGROUNDS = [
  { id: "city-night", label: "Ciudad noche", emoji: "🌃" },
  { id: "park",       label: "Parque",       emoji: "🌳" },
  { id: "city-day",   label: "Ciudad día",   emoji: "🌆" },
  { id: "beach",      label: "Playa",        emoji: "☀️" },
];

function BgCityNight() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax slice" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
      <defs>
        <linearGradient id="skyN" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020818"/>
          <stop offset="60%" stopColor="#0A1628"/>
          <stop offset="100%" stopColor="#0D1F3C"/>
        </linearGradient>
        <radialGradient id="moon" cx="75%" cy="15%" r="8%">
          <stop offset="0%" stopColor="#FFFDE0"/>
          <stop offset="60%" stopColor="#FFF4A0" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#FFF4A0" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="groundN" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1020"/>
          <stop offset="100%" stopColor="#050A14"/>
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width="400" height="500" fill="url(#skyN)"/>
      {/* Moon glow */}
      <circle cx="300" cy="72" r="32" fill="url(#moon)"/>
      <circle cx="300" cy="72" r="14" fill="#FFFDE8"/>
      {/* Stars */}
      {[[20,30],[60,18],[110,40],[150,22],[200,12],[240,35],[280,20],[340,45],[370,15],[50,55],[130,60],[180,50],[260,55],[320,30],[380,50],[80,80],[220,70],[350,75]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i%3===0?1.2:0.8} fill="white" opacity={0.6+Math.sin(i)*0.4}/>
      ))}
      {/* Buildings back row */}
      {[
        [0,180,45,220],[50,160,30,220],[85,150,40,220],[130,170,35,220],[170,140,50,220],
        [225,155,40,220],[270,145,35,220],[310,165,45,220],[360,155,40,220],
      ].map(([x,h,w,bot],i)=>(
        <g key={i}>
          <rect x={x} y={h} width={w} height={bot-h} fill={`hsl(220,30%,${8+i%3*2}%)`}/>
          {/* Windows */}
          {Array.from({length:Math.floor((bot-h-10)/14)}).map((_,row)=>
            Array.from({length:Math.floor(w/10)}).map((_,col)=>(
              <rect key={`${row}-${col}`} x={x+col*10+3} y={h+row*14+4} width={4} height={6}
                fill={Math.random()>0.4?"#FFC85A":"#1A2540"} opacity={0.9}/>
            ))
          )}
        </g>
      ))}
      {/* Buildings front row */}
      {[
        [0,240,55,320],[60,220,35,320],[100,200,50,320],[155,230,40,320],
        [200,210,55,320],[260,225,45,320],[310,205,50,320],[365,235,35,320],
      ].map(([x,h,w,bot],i)=>(
        <g key={i}>
          <rect x={x} y={h} width={w} height={bot-h} fill={`hsl(220,35%,${5+i%4*2}%)`}/>
          {Array.from({length:Math.floor((bot-h-8)/16)}).map((_,row)=>
            Array.from({length:Math.floor(w/12)}).map((_,col)=>(
              <rect key={`${row}-${col}`} x={x+col*12+3} y={h+row*16+5} width={5} height={7}
                fill={Math.random()>0.5?"#FFD580":Math.random()>0.5?"#88BBFF":"#0A1530"} opacity={0.85}/>
            ))
          )}
          {/* Roof details */}
          <rect x={x+w/2-3} y={h-8} width={6} height={8} fill="#FF4444" opacity={0.8}/>
          <circle cx={x+w/2} cy={h-8} r={2} fill="#FF4444" opacity={0.9}/>
        </g>
      ))}
      {/* Street */}
      <rect x="0" y="318" width="400" height="182" fill="url(#groundN)"/>
      {/* Sidewalk */}
      <rect x="0" y="318" width="400" height="12" fill="#1A2235"/>
      {/* Street lights */}
      {[40,160,280,380].map((x,i)=>(
        <g key={i}>
          <rect x={x-1.5} y={255} width={3} height={65} fill="#2A3550"/>
          <ellipse cx={x} cy={252} rx={12} ry={4} fill="#2A3550"/>
          <ellipse cx={x} cy={252} rx={8} ry={3} fill="#FFF0A0" opacity={0.9}/>
          {/* Light cone */}
          <path d={`M${x-8},252 L${x-22},318 L${x+22},318 L${x+8},252 Z`} fill="#FFF0A0" opacity={0.06}/>
        </g>
      ))}
      {/* Ground reflection */}
      <rect x="0" y="318" width="400" height="182" fill="#030810" opacity={0.6}/>
    </svg>
  );
}

function BgPark() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax slice" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
      <defs>
        <linearGradient id="skyP" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#87CEEB"/>
          <stop offset="55%" stopColor="#B0DFF5"/>
          <stop offset="100%" stopColor="#D4EFFA"/>
        </linearGradient>
        <radialGradient id="sun" cx="20%" cy="18%" r="10%">
          <stop offset="0%" stopColor="#FFF7C0"/>
          <stop offset="50%" stopColor="#FFE066" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#FFE066" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="grassP" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4CAF6A"/>
          <stop offset="100%" stopColor="#2E7D45"/>
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width="400" height="500" fill="url(#skyP)"/>
      {/* Sun */}
      <circle cx="78" cy="72" r="38" fill="url(#sun)"/>
      <circle cx="78" cy="72" r="22" fill="#FFE566"/>
      {/* Clouds */}
      {[[60,90,50],[150,70,40],[260,95,55],[340,75,38]].map(([cx,cy,r],i)=>(
        <g key={i} opacity={0.92}>
          <ellipse cx={cx} cy={cy} rx={r} ry={r*0.55} fill="white"/>
          <ellipse cx={cx-r*0.35} cy={cy+4} rx={r*0.6} ry={r*0.42} fill="white"/>
          <ellipse cx={cx+r*0.35} cy={cy+4} rx={r*0.55} ry={r*0.38} fill="white"/>
        </g>
      ))}
      {/* Far hills */}
      <ellipse cx="100" cy="310" rx="180" ry="80" fill="#66BB6A" opacity={0.5}/>
      <ellipse cx="320" cy="320" rx="160" ry="70" fill="#81C784" opacity={0.4}/>
      {/* Path */}
      <path d="M160,500 Q180,380 195,330 Q210,300 200,270 L220,270 Q230,300 215,330 Q200,380 240,500 Z" fill="#C8B08A" opacity={0.7}/>
      {/* Grass */}
      <rect x="0" y="310" width="400" height="190" fill="url(#grassP)"/>
      {/* Grass texture */}
      {Array.from({length:30}).map((_,i)=>(
        <line key={i} x1={i*14+Math.sin(i)*5} y1="310" x2={i*14+Math.sin(i)*5+3} y2="298" stroke="#3A9E52" strokeWidth="1.5" opacity={0.5}/>
      ))}
      {/* Trees */}
      {[[30,200,22,90],[80,185,18,80],[330,195,20,88],[370,180,18,82]].map(([x,ty,tw,th],i)=>(
        <g key={i}>
          <rect x={x-3} y={ty+th*0.6} width={6} height={th*0.45} fill="#6D4C2A"/>
          <ellipse cx={x} cy={ty+th*0.35} rx={tw} ry={th*0.5} fill={i%2===0?"#2E7D45":"#388E3C"}/>
          <ellipse cx={x-5} cy={ty+th*0.45} rx={tw*0.7} ry={th*0.4} fill={i%2===0?"#388E3C":"#43A047"}/>
          <ellipse cx={x+6} cy={ty+th*0.5} rx={tw*0.65} ry={th*0.35} fill="#2E7D45"/>
        </g>
      ))}
      {/* Bench */}
      <rect x="260" y="305" width="50" height="5" rx="2" fill="#8D6E63"/>
      <rect x="265" y="290" width="40" height="4" rx="1" fill="#8D6E63"/>
      <rect x="263" y="292" width="4" height="18" rx="1" fill="#795548"/>
      <rect x="303" y="292" width="4" height="18" rx="1" fill="#795548"/>
      {/* Flowers */}
      {[[100,305],[120,308],[140,303],[200,307],[350,304],[380,308]].map(([fx,fy],i)=>(
        <g key={i}>
          <circle cx={fx} cy={fy} r={3} fill={["#FF6B6B","#FFD93D","#FF8C69","#F06292"][i%4]}/>
          <line x1={fx} y1={fy} x2={fx} y2={fy+8} stroke="#4CAF50" strokeWidth={1.2}/>
        </g>
      ))}
    </svg>
  );
}

function BgCityDay() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax slice" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
      <defs>
        <linearGradient id="skyD" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4FC3F7"/>
          <stop offset="70%" stopColor="#81D4FA"/>
          <stop offset="100%" stopColor="#B3E5FC"/>
        </linearGradient>
        <linearGradient id="roadD" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#78909C"/>
          <stop offset="100%" stopColor="#546E7A"/>
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#skyD)"/>
      {/* Sun */}
      <circle cx="340" cy="55" r="30" fill="#FFF176" opacity={0.9}/>
      <circle cx="340" cy="55" r="22" fill="#FFEE58"/>
      {/* Clouds */}
      {[[80,60,44],[190,45,36],[290,65,42]].map(([cx,cy,r],i)=>(
        <g key={i} opacity={0.88}>
          <ellipse cx={cx} cy={cy} rx={r} ry={r*0.52} fill="white"/>
          <ellipse cx={cx-r*0.3} cy={cy+3} rx={r*0.65} ry={r*0.4} fill="white"/>
          <ellipse cx={cx+r*0.3} cy={cy+3} rx={r*0.55} ry={r*0.36} fill="white"/>
        </g>
      ))}
      {/* Buildings back */}
      {[[0,150,45,280],[50,130,38,280],[92,145,42,280],[138,120,48,280],[192,135,38,280],
        [235,125,44,280],[284,140,40,280],[330,130,42,280],[376,148,24,280]].map(([x,h,w,bot],i)=>(
        <g key={i}>
          <rect x={x} y={h} width={w} height={bot-h} fill={`hsl(${200+i*8},20%,${45+i%4*5}%)`}/>
          {Array.from({length:Math.floor((bot-h)/20)}).map((_,row)=>
            Array.from({length:Math.floor(w/11)}).map((_,col)=>(
              <rect key={`${row}-${col}`} x={x+col*11+3} y={h+row*20+5} width={5} height={8}
                fill={row%3===0&&col%2===0?"#B3E5FC":"rgba(255,255,255,0.15)"}/>
            ))
          )}
        </g>
      ))}
      {/* Buildings front */}
      {[[0,210,52,320],[56,195,44,320],[105,180,50,320],[160,200,48,320],
        [213,188,52,320],[270,198,46,320],[321,185,50,320],[376,205,24,320]].map(([x,h,w,bot],i)=>(
        <g key={i}>
          <rect x={x} y={h} width={w} height={bot-h} fill={`hsl(${210+i*6},18%,${52+i%3*4}%)`}/>
          {Array.from({length:Math.floor((bot-h)/22)}).map((_,row)=>
            Array.from({length:Math.floor(w/13)}).map((_,col)=>(
              <rect key={`${row}-${col}`} x={x+col*13+3} y={h+row*22+5} width={6} height={9}
                fill={col%3===0?"rgba(255,255,255,0.35)":"rgba(255,255,255,0.1)"}/>
            ))
          )}
        </g>
      ))}
      {/* Sidewalk */}
      <rect x="0" y="318" width="400" height="14" fill="#90A4AE"/>
      {/* Road */}
      <rect x="0" y="332" width="400" height="168" fill="url(#roadD)"/>
      {/* Road markings */}
      {[60,120,180,240,300,360].map((x,i)=>(
        <rect key={i} x={x} y="400" width="40" height="6" rx="2" fill="white" opacity={0.4}/>
      ))}
      {/* Street trees */}
      {[50,200,350].map((x,i)=>(
        <g key={i}>
          <rect x={x-3} y={275} width={6} height={44} fill="#5D4037"/>
          <circle cx={x} cy={262} r={22} fill="#388E3C"/>
          <circle cx={x-8} cy={270} r={16} fill="#43A047"/>
        </g>
      ))}
    </svg>
  );
}

function BgBeach() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMax slice" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
      <defs>
        <linearGradient id="skyB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A6FA8"/>
          <stop offset="50%" stopColor="#2196F3"/>
          <stop offset="100%" stopColor="#64B5F6"/>
        </linearGradient>
        <linearGradient id="seaB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0288D1"/>
          <stop offset="100%" stopColor="#01579B"/>
        </linearGradient>
        <linearGradient id="sandB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5DEB3"/>
          <stop offset="100%" stopColor="#DEB887"/>
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width="400" height="500" fill="url(#skyB)"/>
      {/* Sun */}
      <circle cx="320" cy="60" r="40" fill="#FFF8DC" opacity={0.3}/>
      <circle cx="320" cy="60" r="28" fill="#FFD700" opacity={0.85}/>
      <circle cx="320" cy="60" r="20" fill="#FFE44D"/>
      {/* Clouds */}
      {[[50,55,38],[160,40,30],[240,62,34]].map(([cx,cy,r],i)=>(
        <g key={i} opacity={0.75}>
          <ellipse cx={cx} cy={cy} rx={r} ry={r*0.45} fill="white"/>
          <ellipse cx={cx-r*0.3} cy={cy+3} rx={r*0.6} ry={r*0.35} fill="white"/>
          <ellipse cx={cx+r*0.3} cy={cy+3} rx={r*0.55} ry={r*0.32} fill="white"/>
        </g>
      ))}
      {/* Sea */}
      <rect x="0" y="240" width="400" height="110" fill="url(#seaB)"/>
      {/* Waves */}
      {[250,270,285,300].map((y,i)=>(
        <path key={i} d={`M0,${y} Q50,${y-6} 100,${y} Q150,${y+6} 200,${y} Q250,${y-6} 300,${y} Q350,${y+6} 400,${y}`}
          stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none"/>
      ))}
      {/* Sea foam */}
      <path d="M0,348 Q40,342 80,348 Q120,354 160,348 Q200,342 240,348 Q280,354 320,348 Q360,342 400,348 L400,360 L0,360 Z"
        fill="rgba(255,255,255,0.18)"/>
      {/* Sand */}
      <rect x="0" y="348" width="400" height="152" fill="url(#sandB)"/>
      {/* Sand texture */}
      {Array.from({length:40}).map((_,i)=>(
        <circle key={i} cx={i*12+Math.sin(i*3)*8} cy={360+Math.cos(i*2)*15} r={0.8} fill="#C4A882" opacity={0.5}/>
      ))}
      {/* Palm tree left */}
      <path d="M60,360 Q58,300 62,240 Q64,220 60,200" stroke="#5D4037" strokeWidth={7} fill="none" strokeLinecap="round"/>
      <ellipse cx="44" cy="198" rx="32" ry="14" fill="#388E3C" transform="rotate(-20,44,198)"/>
      <ellipse cx="78" cy="200" rx="30" ry="13" fill="#43A047" transform="rotate(15,78,200)"/>
      <ellipse cx="60" cy="192" rx="28" ry="12" fill="#2E7D45" transform="rotate(-5,60,192)"/>
      {/* Coconuts */}
      <circle cx="62" cy="208" r={4} fill="#5D4037"/>
      <circle cx="68" cy="212" r={3.5} fill="#6D4C41"/>
      {/* Palm tree right */}
      <path d="M360,370 Q362,310 358,248 Q356,228 360,208" stroke="#5D4037" strokeWidth={6} fill="none" strokeLinecap="round"/>
      <ellipse cx="342" cy="206" rx="30" ry="13" fill="#388E3C" transform="rotate(-15,342,206)"/>
      <ellipse cx="376" cy="208" rx="28" ry="12" fill="#43A047" transform="rotate(20,376,208)"/>
      <ellipse cx="360" cy="200" rx="26" ry="11" fill="#2E7D45" transform="rotate(-8,360,200)"/>
      {/* Umbrella */}
      <line x1="200" y1="350" x2="200" y2="300" stroke="#8D6E63" strokeWidth={3}/>
      <path d="M160,302 Q200,275 240,302 Z" fill="#FF7043"/>
      <path d="M160,302 Q180,288 200,302 Z" fill="#FF5722"/>
      <path d="M200,302 Q220,288 240,302 Z" fill="#FF7043"/>
      {/* Horizon glow */}
      <rect x="0" y="235" width="400" height="10" fill="rgba(255,255,255,0.12)"/>
    </svg>
  );
}

function Background({ id }) {
  if (id === "city-night") return <BgCityNight/>;
  if (id === "park")       return <BgPark/>;
  if (id === "city-day")   return <BgCityDay/>;
  if (id === "beach")      return <BgBeach/>;
  return null;
}

// ── SVG MODEL ────────────────────────────────────────────────────────────────
function Model({ shirtHex, pantHex }) {
  const SKIN = "#C49060";
  const HAIR = "#1A1208";
  const SHOE = "#F2F0EB";

  const pantsPath = "M514.294739,465.766937 C513.274414,457.190430 512.254089,448.613953 511.233734,440.037445 C510.563293,439.926025 509.892822,439.814636 509.222382,439.703217 C506.835724,445.665192 504.085754,451.512238 502.153900,457.618103 C499.711578,465.337372 497.824829,473.240448 495.906189,481.114838 C494.293152,487.734833 490.734619,493.075684 485.283264,496.899719 C481.597382,499.485291 481.006287,501.643646 482.043945,506.325256 C483.282532,511.913574 482.475616,518.239380 481.348663,524.010193 C478.798126,537.070557 478.016724,549.827576 482.183655,562.795898 C483.602142,567.210449 483.249573,572.351746 482.955536,577.114624 C482.663452,581.846313 484.421204,585.291138 487.418091,588.619324 C488.280701,589.577271 488.144196,591.434875 488.465759,592.880005 C487.059143,592.983398 485.513733,593.511169 484.273560,593.105591 C481.309875,592.136353 478.548096,590.557617 475.594513,589.547241 C473.011230,588.663635 470.263031,587.663086 467.614319,587.732361 C464.768524,587.806824 461.953735,589.068176 458.799164,589.962891 C458.472900,590.114197 458.525024,590.185059 458.525024,590.185059 C457.979187,587.353699 457.455139,584.517761 456.873566,581.693787 C456.707855,580.889038 456.607391,579.674072 456.083496,579.400330 C449.387207,575.901794 452.159973,570.483765 453.405182,565.608704 C454.148407,562.698914 454.059570,560.216980 453.471375,557.219849 C452.482666,552.182190 452.963379,546.866943 452.681030,541.676331 C452.468994,537.777405 451.771088,533.892456 451.746918,529.998413 C451.700287,522.481262 451.286865,514.864014 452.336914,507.474579 C453.182922,501.520782 455.354279,495.547241 458.002106,490.099915 C463.918030,477.929077 468.470734,465.515564 469.035492,451.830902 C469.486084,440.912872 469.847321,429.968536 470.961700,419.109100 C471.619537,412.698761 473.666321,406.430908 475.246521,399.439941 C477.665436,397.194061 479.926331,395.607269 482.533630,394.019379 C485.609039,392.065582 488.338104,390.112885 491.455109,388.094604 C504.422424,384.353577 517.017578,381.981689 529.717102,387.545166 C530.013611,387.675110 530.362854,387.768219 530.681335,387.752563 C538.840332,387.351593 546.386597,389.139496 553.406494,394.104187 C555.133667,395.231934 556.541260,396.235168 557.948914,397.238403 C558.206909,399.749817 558.418274,402.267059 558.730530,404.771698 C560.558533,419.434204 557.077576,433.622742 554.300537,447.755005 C552.109436,458.905182 548.268555,469.727722 545.294800,480.732117 C544.942566,482.035614 544.877197,484.169128 545.644043,484.887207 C548.389893,487.458527 547.050537,489.770508 546.284302,492.602783 C545.061768,497.122406 543.240173,501.298920 545.663696,506.686279 C547.479675,510.723206 546.216248,516.430237 545.477844,521.264404 C544.377075,528.470825 542.458984,535.549072 541.034912,542.710938 C540.397461,545.916687 540.115295,549.193054 540.616638,551.990540 C541.776123,555.609680 542.824158,559.269287 544.121582,562.838318 C546.024780,568.073669 548.138611,573.232117 550.086548,578.451782 C550.503906,579.570251 550.596069,580.810181 550.838135,581.994141 C549.642761,582.140137 548.253540,582.756470 547.282837,582.356750 C540.218933,579.447937 533.348022,578.513123 526.080750,582.099487 C523.984741,583.133850 520.946106,582.258179 517.992065,582.258179 C514.543457,577.815247 514.078003,572.814880 516.837036,567.335327 C517.466858,566.084534 517.195801,564.302673 517.102905,562.779602 C516.793274,557.707703 516.445862,552.635925 515.982971,547.576050 C515.373352,540.913086 514.841492,534.233276 513.915710,527.611084 C512.360474,516.486206 512.759521,505.521667 515.479858,494.067200 C514.914185,484.229980 514.604492,474.998474 514.294739,465.766937 z";
  const shirtPath1 = "M553.086975,393.979645 C546.386597,389.139496 538.840332,387.351593 530.681335,387.752563 C530.362854,387.768219 530.013611,387.675110 529.717102,387.545166 C517.017578,381.981689 504.422424,384.353577 491.158508,387.919556 C489.308105,386.679810 487.909119,385.707275 487.018494,384.390839 C483.878235,379.749207 480.912262,374.989624 478.006653,369.851227 C478.249146,367.190643 478.365204,364.953583 478.398376,362.444916 C477.853638,361.795685 477.391754,361.418091 476.961853,361.023560 C476.993805,361.006653 476.967377,361.073975 477.093323,360.728699 C475.751404,358.603882 474.283539,356.824280 472.875732,355.043060 C472.935791,355.041443 472.915253,355.159821 472.929993,354.821716 C472.605164,354.326141 472.265594,354.168671 471.960083,354.009918 C471.994110,354.008606 471.975006,354.073975 472.090973,353.682373 C470.771973,349.855927 469.337036,346.421021 467.947144,342.994873 C467.992218,343.003632 467.972076,343.093231 467.948975,342.749420 C467.595734,341.809998 467.265564,341.214355 466.660522,340.391357 C465.862122,338.453339 465.314880,336.749573 464.819031,335.030975 C462.107971,325.634460 462.281403,326.174377 455.017395,331.778107 C450.103027,326.196930 443.947388,323.510834 437.163544,322.003784 C436.153229,314.363495 442.046173,309.037628 444.101013,301.786133 C444.641541,300.819550 444.846436,300.379303 445.051331,299.939026 C445.051331,299.939026 445.075073,300.022919 445.354309,299.905029 C448.085388,294.666199 450.537262,289.545258 452.989136,284.424316 C452.989105,284.424316 453.011871,284.506805 453.197449,284.362915 C453.536743,283.712494 453.690430,283.205994 453.844116,282.699493 C455.908112,278.370056 458.822815,275.390015 463.702728,273.744537 C469.105072,271.922821 474.067688,268.797180 479.838806,266.089661 C487.935699,265.938110 494.019501,269.733276 500.506561,272.774750 C503.842499,274.338837 508.167328,273.793671 512.045288,274.201630 C515.749329,276.131836 519.453308,278.062012 523.710510,280.342529 C530.802002,284.411896 536.041687,289.264526 538.377686,296.704346 C538.470764,297.000610 539.195312,297.098602 539.625610,297.289001 C540.419250,302.579163 541.212830,307.869324 541.715637,313.711182 C541.309814,317.655914 541.194885,321.048950 540.780518,324.650269 C540.442810,325.250275 540.404541,325.641907 540.366211,326.033569 C540.617859,325.997131 540.869507,325.960693 541.083801,325.941223 C541.046448,325.958160 541.127747,325.968903 540.705994,326.267487 C540.527771,329.238373 540.771362,331.910645 541.057556,334.606903 C541.100220,334.630859 541.086426,334.636993 541.086426,334.636993 C540.589844,336.021820 540.390686,337.631683 539.543640,338.751343 C536.406128,342.898346 540.146423,345.530212 542.183105,347.332428 C547.019409,351.611755 548.390686,356.965210 549.033325,363.533081 C548.358765,371.045258 545.925293,377.845306 549.685547,384.623138 C551.275452,387.488922 551.979980,390.845917 553.086975,393.979645 z";
  const shirtPath2 = "M475.687195,392.031860 C477.915955,392.359528 479.837616,392.878723 481.973267,393.709229 C479.926331,395.607269 477.665436,397.194061 475.330627,399.056366 C470.585907,396.880585 475.630920,394.597961 475.687195,392.031860 z";
  const skinPath1 = "M512.000977,273.757904 C508.167328,273.793671 503.842499,274.338837 500.506561,272.774750 C494.019501,269.733276 487.935699,265.938110 480.207825,265.914124 C481.786316,264.240997 484.297089,262.917572 485.268372,260.865509 C486.518524,258.224213 486.534454,254.998779 487.537537,251.602112 C490.579346,249.331604 494.233551,240.136810 493.193024,237.762741 C491.586487,234.097229 492.337708,231.719238 496.216858,229.990158 C500.146851,228.238434 505.112488,227.143219 505.486420,221.525650 C505.731079,217.850372 508.129333,216.413513 511.058777,215.615631 C513.892700,214.843719 516.847900,214.517303 519.749878,213.995224 C520.911926,216.823883 522.236572,219.598526 523.198303,222.493729 C524.668335,226.919037 525.887939,231.427521 527.213867,235.900681 C527.666138,235.763535 528.118469,235.626373 528.570740,235.489227 C528.688660,235.598938 528.806519,235.708664 528.924438,235.818390 C528.632935,235.798630 528.096191,235.720139 528.084839,235.767502 C527.039001,240.133774 525.280029,244.503189 525.242310,248.886795 C525.206482,253.056915 523.803894,254.846497 520.058899,255.490189 C519.101624,255.654724 518.153320,255.890945 517.215942,256.148865 C512.207642,257.526947 510.119568,260.739746 510.856110,265.937225 C511.204926,268.398743 511.588654,270.855347 512.000977,273.757904 z";
  const skinPath2 = "M436.886475,322.239716 C443.947388,323.510834 450.103027,326.196930 455.099304,332.152649 C454.617188,336.061249 450.436798,338.615021 453.532745,342.528473 C460.588379,351.447235 467.596405,360.404266 474.742798,369.249603 C475.322876,369.967590 476.812958,369.950378 477.880188,370.274780 C480.912262,374.989624 483.878235,379.749207 487.018494,384.390839 C487.909119,385.707275 489.308105,386.679810 490.770538,387.985107 C488.338104,390.112885 485.609039,392.065582 482.319641,393.708130 C479.837616,392.878723 477.915955,392.359528 475.994263,391.840332 C471.955780,384.484009 464.603516,380.628326 458.673157,375.245789 C449.828857,367.218506 441.319092,358.811188 432.916656,350.318573 C431.329498,348.714294 429.713501,345.677124 430.158905,343.782776 C431.854218,336.573425 434.388611,329.561401 436.886475,322.239716 z";
  const skinPath3 = "M553.406494,394.104187 C551.979980,390.845917 551.275452,387.488922 549.685547,384.623138 C545.925293,377.845306 548.358765,371.045258 549.087402,363.891968 C551.430176,369.513458 553.755249,375.438751 555.865356,381.439575 C557.100586,384.952240 558.185852,388.545319 558.942261,392.184570 C559.235229,393.594025 558.434509,395.230774 558.040466,397.001160 C556.541260,396.235168 555.133667,395.231934 553.406494,394.104187 z";
  const skinPath4 = "M483.132996,601.438843 C483.379486,600.984375 483.785492,600.864014 483.809143,600.935242 C485.000854,602.293640 486.168945,603.580750 487.197540,604.714172 C482.358978,604.714172 476.977539,604.714172 471.596100,604.714172 C471.549988,604.454773 471.503876,604.195374 471.457764,603.936035 C475.267334,603.255066 479.076935,602.574158 483.132996,601.438843 z";
  const hairPath = "M520.208008,213.807373 C516.847900,214.517303 513.892700,214.843719 511.058777,215.615631 C508.129333,216.413513 505.731079,217.850372 505.486420,221.525650 C505.112488,227.143219 500.146851,228.238434 496.216858,229.990158 C492.337708,231.719238 491.586487,234.097229 493.193024,237.762741 C494.233551,240.136810 490.579346,249.331604 487.656738,251.284454 C481.520721,243.706161 478.083649,235.047546 476.445740,225.589706 C475.060699,217.591995 483.779388,206.256287 491.456543,205.150284 C497.896851,204.222473 504.465668,204.214584 510.963776,203.642517 C512.831421,203.478104 514.651001,202.403290 516.492798,202.402710 C518.808777,202.401993 521.893982,202.314941 523.231262,203.666351 C524.657043,205.107285 524.977539,208.250076 524.700684,210.518051 C524.556580,211.698471 522.085876,212.594849 520.208008,213.807373 z";
  const shoePath1 = "M562.626099,591.279480 C565.322754,591.573364 567.626038,591.884399 569.937683,591.969177 C573.952576,592.116455 578.848145,595.506531 577.601807,597.684387 C576.332581,599.902222 572.960815,602.127319 570.436890,602.213318 C557.500671,602.653931 544.537598,602.575378 531.591431,602.308472 C526.829346,602.210327 522.075989,601.173706 517.341309,600.422607 C513.825073,599.864807 513.201355,597.658630 514.342224,594.572937 C515.341919,591.869080 516.243347,589.128845 517.762451,586.302185 C517.330994,588.929932 517.139648,591.626831 516.407654,594.167969 C515.474548,597.407532 516.429077,598.983154 519.764404,599.097900 C536.335205,599.667603 552.904419,600.347290 569.480225,600.616882 C571.339722,600.647156 573.237366,598.331177 575.117310,597.103210 C572.684509,595.838928 570.315491,594.423889 567.798645,593.357971 C565.781555,592.503601 563.585022,592.072876 561.468079,591.454102 C561.558350,591.379333 561.638245,591.267944 561.741455,591.238525 C561.897888,591.193970 562.070679,591.206482 562.626099,591.279480 z";
  const shoePath2 = "M484.788025,601.007812 C486.261139,600.832703 487.789276,600.849426 489.196716,600.445496 C492.965271,599.363892 493.835938,602.327209 493.668671,604.492310 C493.547760,606.057373 491.179871,607.448914 489.814087,608.917908 C492.248718,608.287781 495.572479,606.794312 495.638336,605.168762 C495.725830,603.009827 493.665131,599.364868 491.821686,598.840759 C488.732422,597.962585 485.085632,599.045349 480.313141,599.405640 C482.250519,600.403137 482.815002,600.693726 482.886505,601.893250 C479.076935,602.574158 475.267334,603.255066 471.457764,603.936035 C471.503876,604.195374 471.549988,604.454773 471.596100,604.714172 C476.977539,604.714172 482.358978,604.714172 487.197540,604.714172 C486.168945,603.580750 485.000854,602.293640 484.788025,601.007812 z";

  return (
    <svg viewBox="380 190 220 440" style={{ width:"100%", height:"100%", display:"block" }}>
      <path d={pantsPath}  fill={pantHex}/>
      <path d={shirtPath1} fill={shirtHex}/>
      <path d={shirtPath2} fill={shirtHex}/>
      <path d={skinPath1}  fill={SKIN}/>
      <path d={skinPath2}  fill={SKIN}/>
      <path d={skinPath3}  fill={SKIN}/>
      <path d={skinPath4}  fill={SKIN}/>
      <path d={hairPath}   fill={HAIR}/>
      <path d={shoePath1}  fill={SHOE}/>
      <path d={shoePath2}  fill={SHOE}/>
    </svg>
  );
}

// ── Stars ─────────────────────────────────────────────────────────────────
function Stars({ score }) {
  return (
    <div style={{ display:"flex", gap:3 }}>
      {[1,2,3,4,5].map(i=>(
        <div key={i} style={{ width:5, height:5, borderRadius:"50%",
          background: i<=score ? "#F5A623" : "#2A2A2A", transition:"background .3s" }}/>
      ))}
    </div>
  );
}

// ── Outfit Card ───────────────────────────────────────────────────────────
function OutfitCard({ shirt, pant, isSelected, onClick }) {
  const c = getCompatibility(shirt, pant);
  return (
    <div onClick={onClick} style={{
      background: isSelected ? "rgba(245,166,35,.07)" : "#1A1A1A",
      border:`1.5px solid ${isSelected?"#F5A623":"#2A2A2A"}`,
      borderRadius:12, padding:"9px 9px 7px", cursor:"pointer", transition:"all .2s",
    }}>
      <div style={{ display:"flex", gap:3, marginBottom:7 }}>
        <div style={{ flex:1, height:22, borderRadius:"5px 5px 2px 2px", background:shirt.hex }}/>
        <div style={{ width:2, background:"#0F0F0F" }}/>
        <div style={{ flex:1, height:22, borderRadius:"2px 2px 5px 5px", background:pant.hex }}/>
      </div>
      <p style={{ fontSize:10, color:"#E8E2D9", fontWeight:500, marginBottom:2 }}>{shirt.name}</p>
      <p style={{ fontSize:9.5, color:"#6B6560", marginBottom:5 }}>{pant.name}</p>
      <Stars score={c.score}/>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────
export default function App() {
  const [selected, setSelected] = useState({ shirt:SHIRTS[0], pant:PANTS[2] });
  const [filter, setFilter]     = useState("all");
  const [bgId, setBgId]         = useState("city-night");

  const combinations = SHIRTS.flatMap(s => PANTS.map(p => ({ shirt:s, pant:p })));
  const filtered = filter==="all" ? combinations
    : combinations.filter(c => getCompatibility(c.shirt,c.pant).score >= 5);
  const compat = getCompatibility(selected.shirt, selected.pant);

  return (
    <div style={{ background:"#0F0F0F", minHeight:"100vh",
      fontFamily:"'DM Sans',system-ui,sans-serif", color:"#E8E2D9" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:#2A2A2A;border-radius:2px;}
      `}</style>

      {/* Header */}
      <div style={{ padding:"18px 20px 0" }}>
        <p style={{ fontSize:10, color:"#F5A623", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", marginBottom:2 }}>
          Tu armario cápsula
        </p>
        <h1 style={{ fontSize:18, fontWeight:600 }}>Combinaciones de outfits</h1>
      </div>

      <div style={{ display:"flex", minHeight:"calc(100vh - 62px)" }}>

        {/* ── LEFT: Model panel ── */}
        <div style={{
          width:"46%", minWidth:200,
          display:"flex", flexDirection:"column",
          padding:"10px 8px 16px",
          borderRight:"1px solid #1A1A1A",
          position:"sticky", top:0, alignSelf:"flex-start", height:"100vh",
        }}>

          {/* Outfit info */}
          <div style={{ background:"#1A1A1A", borderRadius:10, padding:"8px 12px",
            marginBottom:8, textAlign:"center" }}>
            <div style={{ display:"flex", justifyContent:"center", gap:5, marginBottom:4 }}>
              <div style={{ width:12, height:12, borderRadius:2, background:selected.shirt.hex }}/>
              <span style={{ fontSize:9, color:"#6B6560" }}>+</span>
              <div style={{ width:12, height:12, borderRadius:2, background:selected.pant.hex }}/>
            </div>
            <p style={{ fontSize:11, fontWeight:600, marginBottom:2 }}>
              {selected.shirt.name} + {selected.pant.name}
            </p>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:2 }}>
              <Stars score={compat.score}/>
            </div>
            {compat.note && <p style={{ fontSize:9, color:"#6B6560", fontStyle:"italic" }}>{compat.note}</p>}
          </div>

          {/* Model with background */}
          <div style={{
            flex:1, borderRadius:14, overflow:"hidden",
            position:"relative", minHeight:260,
            boxShadow:"0 4px 24px rgba(0,0,0,0.5)"
          }}>
            {/* Background scene */}
            <Background id={bgId}/>
            {/* Ground shadow under model */}
            <div style={{
              position:"absolute", bottom:0, left:0, right:0, height:"30%",
              background:"linear-gradient(to top, rgba(0,0,0,0.35), transparent)",
              pointerEvents:"none"
            }}/>
            {/* Model SVG */}
            <div style={{
              position:"absolute", inset:0,
              display:"flex", alignItems:"flex-end", justifyContent:"center",
              paddingBottom:8
            }}>
              <div style={{ width:"72%", maxWidth:160 }}>
                <Model shirtHex={selected.shirt.hex} pantHex={selected.pant.hex}/>
              </div>
            </div>
          </div>

          {/* Background selector */}
          <div style={{ marginTop:8 }}>
            <p style={{ fontSize:9, color:"#6B6560", textTransform:"uppercase",
              letterSpacing:".08em", marginBottom:6, textAlign:"center" }}>Escenario</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:5 }}>
              {BACKGROUNDS.map(bg=>(
                <button key={bg.id} onClick={()=>setBgId(bg.id)} style={{
                  padding:"6px 4px", borderRadius:8, fontSize:9, fontWeight:500,
                  border:`1.5px solid ${bgId===bg.id?"#F5A623":"#2A2A2A"}`,
                  background: bgId===bg.id?"rgba(245,166,35,.1)":"#111",
                  color: bgId===bg.id?"#F5A623":"#6B6560",
                  cursor:"pointer", fontFamily:"inherit", transition:"all .15s",
                  textAlign:"center", lineHeight:1.5
                }}>
                  <div style={{ fontSize:16, marginBottom:1 }}>{bg.emoji}</div>
                  <div style={{ fontSize:8 }}>{bg.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Combinations grid ── */}
        <div style={{ flex:1, padding:"12px 12px 40px", overflowY:"auto" }}>

          {/* Filters */}
          <div style={{ display:"flex", gap:6, marginBottom:12 }}>
            {[
              { id:"all", label:`Todas (${combinations.length})` },
              { id:"top", label:`⭐ Perfectas (${combinations.filter(c=>getCompatibility(c.shirt,c.pant).score>=5).length})` },
            ].map(f=>(
              <button key={f.id} onClick={()=>setFilter(f.id)} style={{
                padding:"5px 10px", borderRadius:99, fontSize:10.5, fontWeight:500,
                border:`1.5px solid ${filter===f.id?"#F5A623":"#2A2A2A"}`,
                background:filter===f.id?"rgba(245,166,35,.1)":"transparent",
                color:filter===f.id?"#F5A623":"#6B6560",
                cursor:"pointer", fontFamily:"inherit", transition:"all .15s"
              }}>{f.label}</button>
            ))}
          </div>

          {/* Cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:7 }}>
            {filtered.map(({ shirt, pant })=>(
              <OutfitCard
                key={`${shirt.id}-${pant.id}`}
                shirt={shirt} pant={pant}
                isSelected={selected.shirt.id===shirt.id && selected.pant.id===pant.id}
                onClick={()=>setSelected({ shirt, pant })}
              />
            ))}
          </div>

          {/* Legend */}
          <div style={{ marginTop:16, display:"flex", gap:14, flexWrap:"wrap" }}>
            {[{label:"Perfecta",s:5},{label:"Funciona con criterio",s:3}].map(({label,s})=>(
              <div key={label} style={{ display:"flex", alignItems:"center", gap:5 }}>
                <div style={{ display:"flex", gap:2 }}>
                  {[1,2,3,4,5].map(i=><div key={i} style={{ width:5,height:5,borderRadius:"50%",
                    background:i<=s?"#F5A623":"#2A2A2A" }}/>)}
                </div>
                <p style={{ fontSize:9.5, color:"#6B6560" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
