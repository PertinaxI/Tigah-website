import { useState, useEffect, useRef, useCallback } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  bg:"#080808", surface:"#0E0E10", surfaceHi:"#141418", border:"#1E1E24",
  gold:"#C8A84B", goldLight:"#E2C97E", goldDim:"#6B5520", goldGlow:"rgba(200,168,75,0.12)",
  text:"#F2EEE8", textMid:"#9A9A9E", textDim:"#4A4A52",
  red:"#FF5A5A", green:"#4AFF8C", kick:"#53FC18", twitch:"#9146FF",
  adminBg:"#050507", adminSurface:"#0A0A0D", adminBorder:"#1A1A22",
};

// ─── ADMIN CREDENTIALS (change these before deploying) ────────────────────────
const ADMIN_USER = "admin";
const ADMIN_PASS = "TiGah2025!";

// ─── DEFAULT TALENT DATA ──────────────────────────────────────────────────────
const DEFAULT_TALENT = [
  { id:1,  name:"VVS",            geo:"Canada / USA",         region:"North America",  platform:"Twitch + Kick", viewers:1103, url:"https://www.twitch.tv/torontovvs",   price:"$2,500/hr" },
  { id:2,  name:"Striker6x6",     geo:"Canada / USA / EU",    region:"North America",  platform:"Twitch",        viewers:1039, url:"https://www.twitch.tv/striker6x6",  price:"$1,450/stream" },
  { id:3,  name:"Cell",           geo:"Spain",                region:"Europe",         platform:"Kick",          viewers:2109, url:"https://kick.com/cell",              price:"$950/stream" },
  { id:4,  name:"ElPelotasssss",  geo:"Spain",                region:"Europe",         platform:"Twitch",        viewers:1224, url:"https://www.twitch.tv/elpelotasssss",price:"$1,150/stream" },
  { id:5,  name:"xTaiga0",        geo:"Germany",              region:"Europe",         platform:"Twitch",        viewers:749,  url:"https://www.twitch.tv/xtaiga0",     price:"$1,500/stream" },
  { id:6,  name:"Ragnarlebroc",   geo:"France",               region:"Europe",         platform:"Twitch",        viewers:790,  url:"https://www.twitch.tv/ragnarlebroc",price:"$800/stream" },
  { id:7,  name:"Lery",           geo:"Germany",              region:"Europe",         platform:"Twitch",        viewers:503,  url:"https://www.twitch.tv/lery",         price:"$1,200/stream" },
  { id:8,  name:"RealkongOG",     geo:"Germany",              region:"Europe",         platform:"Twitch",        viewers:505,  url:"https://www.twitch.tv/realkongog",  price:"$1,250/stream" },
  { id:9,  name:"Schnurrbert68",  geo:"Germany",              region:"Europe",         platform:"Twitch",        viewers:528,  url:"https://www.twitch.tv/schnurrbert68",price:"$1,250/stream" },
  { id:10, name:"Mogli_Aga",      geo:"Germany",              region:"Europe",         platform:"Twitch",        viewers:515,  url:"https://twitch.tv/mogli_aga",        price:"$600/stream" },
  { id:11, name:"AbuSuge",        geo:"Germany",              region:"Europe",         platform:"Twitch",        viewers:457,  url:"https://m.twitch.tv/abusuge",        price:"$600/stream" },
  { id:12, name:"Beatriz",        geo:"Portugal",             region:"Europe",         platform:"Twitch + Kick", viewers:416,  url:"https://www.twitch.tv/beatrizngr",  price:"$1,000/stream" },
  { id:13, name:"Luvonbos",       geo:"Germany / USA",        region:"Europe",         platform:"Twitch",        viewers:307,  url:"https://twitch.tv/luvonbos",         price:"$700/stream" },
  { id:14, name:"Donzi",          geo:"Switzerland / Germany",region:"Europe",         platform:"Twitch + Kick", viewers:203,  url:"https://www.twitch.tv/donzi",        price:"$1,850–$2,500" },
  { id:15, name:"westinformatique",geo:"France / Arabic",     region:"Europe",         platform:"Kick",          viewers:150,  url:"https://kick.com/westinformatique",  price:"$650/stream" },
  { id:16, name:"Stemig",         geo:"Germany / USA",        region:"Europe",         platform:"Twitch",        viewers:149,  url:"https://www.twitch.tv/stemigg",      price:"$700/stream" },
  { id:17, name:"Migz",           geo:"Portugal",             region:"Europe",         platform:"Twitch",        viewers:128,  url:"https://www.twitch.tv/migzpt",       price:"$1,250/stream" },
  { id:18, name:"RNGang",         geo:"Germany",              region:"Europe",         platform:"Twitch",        viewers:123,  url:"https://www.twitch.tv/rngangx",      price:"$500/stream" },
  { id:19, name:"PaciancaBet",    geo:"Italy",                region:"Europe",         platform:"Kick",          viewers:112,  url:"https://kick.com/paciancabet",       price:"$450/stream" },
  { id:20, name:"ValeK",          geo:"Portugal",             region:"Europe",         platform:"Twitch",        viewers:110,  url:"https://www.twitch.tv/valek",        price:"$950/stream" },
  { id:21, name:"Kazukutaa",      geo:"Portugal",             region:"Europe",         platform:"Twitch",        viewers:91,   url:"https://www.twitch.tv/kazukutaa",    price:"$1,000/stream" },
  { id:22, name:"Bennys2k",       geo:"Portugal",             region:"Europe",         platform:"Twitch",        viewers:82,   url:"https://www.twitch.tv/bennys2k_",    price:"$1,200/stream" },
  { id:23, name:"Tiagocouto7",    geo:"Portugal",             region:"Europe",         platform:"Twitch",        viewers:76,   url:"https://www.twitch.tv/tiagocouto7",  price:"$1,150/stream" },
  { id:24, name:"BetluckTV",      geo:"Portugal",             region:"Europe",         platform:"Twitch",        viewers:69,   url:"https://www.twitch.tv/betlucktv",    price:"$1,100/stream" },
  { id:25, name:"davhe",          geo:"Italy",                region:"Europe",         platform:"Kick",          viewers:68,   url:"https://kick.com/davhe",             price:"$400/stream" },
  { id:26, name:"MikeSonMikeDad", geo:"Portugal",             region:"Europe",         platform:"Twitch",        viewers:57,   url:"https://www.twitch.tv/mikesonmikedad",price:"$1,100/stream" },
  { id:27, name:"JonBossTV",      geo:"Portugal",             region:"Europe",         platform:"Twitch",        viewers:56,   url:"https://www.twitch.tv/jonbosstv",    price:"$1,250/stream" },
  { id:28, name:"WorldYT",        geo:"Portugal",             region:"Europe",         platform:"Twitch",        viewers:48,   url:"https://www.twitch.tv/world_yt",     price:"$975/stream" },
  { id:29, name:"WieiraTV",       geo:"Portugal",             region:"Europe",         platform:"Twitch",        viewers:41,   url:"https://www.twitch.tv/wieiratv",     price:"$900/stream" },
  { id:30, name:"Shikai",         geo:"Portugal",             region:"Europe",         platform:"Twitch",        viewers:35,   url:"https://twitch.tv/shikai",           price:"$1,000/stream" },
  { id:31, name:"MrNikki",        geo:"Portugal",             region:"Europe",         platform:"Twitch",        viewers:13,   url:"https://www.twitch.tv/mrnikkihdtv",  price:"$1,100/stream" },
  { id:32, name:"Kani795",        geo:"Germany",              region:"Europe",         platform:"Twitch",        viewers:92,   url:"https://m.twitch.tv/kani795",        price:"$450/stream" },
  { id:33, name:"Sweezy",         geo:"Czech Republic",       region:"Eastern Europe", platform:"Kick",          viewers:661,  url:"https://kick.com/sweezy",            price:"$3,600/hr" },
  { id:34, name:"Mireoriginal",   geo:"Serbia",               region:"Eastern Europe", platform:"Kick",          viewers:444,  url:"https://kick.com/mireoriginal",      price:"$400/stream" },
  { id:35, name:"SokoGambles",    geo:"Lithuania / UK / NO",  region:"Eastern Europe", platform:"Kick",          viewers:289,  url:"https://kick.com/sokogambles",       price:"$1,400/stream" },
  { id:36, name:"Cupava",         geo:"Serbia / AU",          region:"Eastern Europe", platform:"Kick",          viewers:147,  url:"https://kick.com/cupava",            price:"$1,050/stream" },
  { id:37, name:"lev1x__",        geo:"Hungary",              region:"Eastern Europe", platform:"Twitch",        viewers:142,  url:"https://www.twitch.tv/lev1x__",     price:"$300–$400" },
  { id:38, name:"Gabostream",     geo:"Hungary",              region:"Eastern Europe", platform:"Twitch",        viewers:131,  url:"https://www.twitch.tv/gabostream",   price:"$240/stream" },
  { id:39, name:"Vanimy",         geo:"Serbia / Balkans",     region:"Eastern Europe", platform:"Kick",          viewers:128,  url:"https://kick.com/vanimy",            price:"$350/stream" },
  { id:40, name:"Al1veHunter",    geo:"Hungary",              region:"Eastern Europe", platform:"Twitch",        viewers:119,  url:"https://www.twitch.tv/al1vehunter",  price:"$250–$300" },
  { id:41, name:"Bibicasino",     geo:"Serbia / Bosnia / HR", region:"Eastern Europe", platform:"Kick",          viewers:92,   url:"https://kick.com/bibicasino",        price:"$250–$350" },
];

const DEFAULT_CONTENT = {
  heroTitle: "Premium iGaming Partnerships Built to Scale.",
  heroSubtitle: "TiGah connects online casinos with curated streamers, influencers, sports ambassadors, and affiliate networks — end-to-end, across Europe and beyond.",
  aboutTitle: "The iGaming Partnerships Hub built for operators who demand results.",
  aboutBody1: "TiGah was built to solve a specific problem: online casinos were managing dozens of individual creator relationships — each with different commercial terms, unclear compliance status, and no structured reporting.",
  aboutBody2: "We serve as the single professional partner that bridges operators and talent — handling sourcing, commercial structuring, contract management, and campaign execution under one roof.",
  operatorsTitle: "Stop piecing together your creator strategy.",
  operatorsSubtitle: "TiGah sources, structures, and executes creator partnerships for online casinos — so your team focuses on strategy, not vendor chaos.",
  talentTitle: "Your audience. Premium deals. Professional backing.",
  talentSubtitle: "TiGah represents creators serious about long-term casino partnerships. We negotiate on your behalf — protecting your rates, your audience, and your brand.",
  contactEmail: "operators@tigah.io",
  talentEmail: "talent@tigah.io",
  contactTelegram: "@TiGahOperators",
  talentTelegram: "@TiGahTalent",
  calendlyUrl: "",
  footerTagline: "Premium iGaming talent & commercial partnerships. Europe · LATAM · North America.",
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
function injectGlobals() {
  if (document.getElementById("tg-g4")) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Mono:wght@300;400;500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
  const s = document.createElement("style");
  s.id = "tg-g4";
  s.textContent = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}body{background:${T.bg};color:${T.text}}
    ::selection{background:${T.goldDim};color:${T.text}}
    input,textarea,select{font-family:inherit}
    input::placeholder,textarea::placeholder{color:${T.textDim}}
    ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:${T.bg}}::-webkit-scrollbar-thumb{background:${T.border}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes shimmer{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 ${T.goldGlow}}50%{box-shadow:0 0 0 8px transparent}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
    @keyframes lockBounce{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
    .hw{display:inline-block;animation:fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both}
    .nav-link::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:1px;background:${T.gold};transform:scaleX(0);transform-origin:left;transition:transform 0.3s}
    .nav-link:hover::after{transform:scaleX(1)}
    .ch{transition:border-color 0.25s,transform 0.25s,box-shadow 0.25s}.ch:hover{border-color:${T.goldDim}!important;transform:translateY(-3px);box-shadow:0 20px 60px rgba(0,0,0,.4),0 0 40px ${T.goldGlow}}
    .bm{transition:all 0.2s cubic-bezier(0.34,1.56,0.64,1)}.bm:hover{transform:scale(1.04)}.bm:active{transform:scale(0.97)}
    .rh:hover{background:${T.surfaceHi}!important}
    .admin-row:hover{background:rgba(200,168,75,0.04)!important}

    /* Rate mask */
    .rm{position:relative;cursor:pointer;user-select:none;display:inline-flex;align-items:center}
    .rm-blur{filter:blur(6px);font-family:'DM Mono',monospace;font-size:11px;color:${T.gold};letter-spacing:.14em;pointer-events:none;transition:filter .2s}
    .rm:hover .rm-blur{filter:blur(8px)}
    .rm-ov{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:5px}
    .rm-lock{font-size:11px;animation:lockBounce 2.5s infinite}
    .rm-lbl{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:${T.gold}}
    .rm-tip{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);background:${T.surface};border:1px solid ${T.gold};padding:6px 12px;white-space:nowrap;font-family:'DM Mono',monospace;font-size:9px;color:${T.gold};opacity:0;pointer-events:none;transition:opacity .2s;z-index:20}
    .rm:hover .rm-tip{opacity:1}

    /* Admin */
    .admin-input{background:${T.adminSurface};border:1px solid ${T.adminBorder};color:${T.text};padding:10px 14px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;outline:none;width:100%;transition:border-color .2s}
    .admin-input:focus{border-color:${T.gold}}
    .admin-tab{padding:10px 20px;cursor:pointer;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;border:none;background:transparent;transition:all .2s}
    .admin-tab.active{color:${T.gold};border-bottom:2px solid ${T.gold}}
    .admin-tab:not(.active){color:${T.textDim};border-bottom:2px solid transparent}

    @media(max-width:768px){
      .hm{display:none!important}.sm{display:flex!important}
      .g2{grid-template-columns:1fr!important}.g3{grid-template-columns:1fr!important}
      .g4{grid-template-columns:1fr 1fr!important}.sg{grid-template-columns:1fr 1fr!important}
    }
  `;
  document.head.appendChild(s);
}

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useReveal(threshold=0.12) {
  const ref=useRef(null);const[v,setV]=useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);obs.disconnect();}},{threshold});
    obs.observe(el);return()=>obs.disconnect();
  },[threshold]);
  return[ref,v];
}
function Reveal({children,delay=0,y=28}){
  const[ref,v]=useReveal();
  return<div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0)":`translateY(${y}px)`,transition:`opacity .65s ease ${delay}s,transform .65s cubic-bezier(.22,1,.36,1) ${delay}s`}}>{children}</div>;
}
function Counter({target,suffix="",duration=1800}){
  const[val,setVal]=useState(0);const[ref,v]=useReveal(.5);
  useEffect(()=>{
    if(!v)return;let s=null;
    const step=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/duration,1);setVal(Math.floor((1-Math.pow(1-p,3))*target));if(p<1)requestAnimationFrame(step);};
    requestAnimationFrame(step);
  },[v,target,duration]);
  return<span ref={ref}>{val}{suffix}</span>;
}
function NoiseLayer(){
  const ref=useRef(null);
  useEffect(()=>{
    const c=ref.current;if(!c)return;const ctx=c.getContext("2d");
    c.width=c.offsetWidth;c.height=c.offsetHeight;
    const img=ctx.createImageData(c.width,c.height);
    for(let i=0;i<img.data.length;i+=4){const v=Math.random()*255;img.data[i]=img.data[i+1]=img.data[i+2]=v;img.data[i+3]=16;}
    ctx.putImageData(img,0,0);
  },[]);
  return<canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",mixBlendMode:"overlay"}}/>;
}

// ─── ATOMS ────────────────────────────────────────────────────────────────────
function Badge({children,style={}}){return<span style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:T.gold,border:`1px solid ${T.goldDim}`,padding:"5px 14px",display:"inline-block",...style}}>{children}</span>;}
function Divider({style={}}){return<div style={{height:1,background:`linear-gradient(90deg,transparent,${T.gold}50,transparent)`,...style}}/>;}
function PlatBadge({platform}){
  const c=platform.includes("+")? T.goldLight:platform==="Kick"?T.kick:T.twitch;
  return<span style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.1em",color:c,border:`1px solid ${c}30`,padding:"3px 9px",textTransform:"uppercase"}}>{platform}</span>;
}
function Btn({children,variant="gold",onClick,type="button",style={},full}){
  const base={fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:"0.14em",textTransform:"uppercase",cursor:"pointer",border:"none",padding:"14px 28px",display:"inline-flex",alignItems:"center",gap:8,whiteSpace:"nowrap",width:full?"100%":undefined,justifyContent:full?"center":undefined};
  const v={gold:{background:T.gold,color:"#080808"},outline:{background:"transparent",color:T.gold,border:`1px solid ${T.gold}`},ghost:{background:"transparent",color:T.textMid,border:`1px solid ${T.border}`},red:{background:"transparent",color:T.red,border:`1px solid ${T.red}`},green:{background:T.green,color:"#080808"}};
  return<button type={type} onClick={onClick} className="bm" style={{...base,...v[variant],...style}}>{children}</button>;
}

// ─── RATE MASK ────────────────────────────────────────────────────────────────
function RateMask({name,onRequest}){
  return(
    <div className="rm" onClick={()=>onRequest(name)}>
      <span className="rm-blur">$X,XXX/str</span>
      <div className="rm-ov"><span className="rm-lock">🔒</span><span className="rm-lbl">Request Rate</span></div>
      <div className="rm-tip">Click to enquire →</div>
    </div>
  );
}

// ─── RATE REQUEST MODAL ───────────────────────────────────────────────────────
function RateModal({name,onClose,content}){
  const[form,setForm]=useState({company:"",email:"",geo:"",model:"",notes:""});
  const[done,setDone]=useState(false);
  const up=(k,v)=>setForm(p=>({...p,[k]:v}));
  const FS={width:"100%",background:T.bg,border:`1px solid ${T.border}`,color:T.text,padding:"12px 14px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,outline:"none",boxSizing:"border-box",transition:"border-color .2s"};
  useEffect(()=>{const fn=e=>{if(e.key==="Escape")onClose();};window.addEventListener("keydown",fn);return()=>window.removeEventListener("keydown",fn);},[onClose]);
  return(
    <div style={{position:"fixed",inset:0,zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(5,5,7,0.92)",backdropFilter:"blur(10px)"}}/>
      <div style={{position:"relative",background:T.surface,border:`1px solid ${T.border}`,padding:"48px 44px",maxWidth:520,width:"100%",animation:"fadeUp .3s ease both",maxHeight:"90vh",overflowY:"auto"}}>
        <button onClick={onClose} style={{position:"absolute",top:20,right:24,background:"none",border:"none",color:T.textMid,fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
        {done?(
          <div style={{textAlign:"center",padding:"32px 0"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:56,color:T.gold,marginBottom:20}}>◈</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,color:T.text,marginBottom:12}}>Request Received</div>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.textMid,lineHeight:1.7}}>We'll send full rate details for <strong style={{color:T.gold}}>{name}</strong> within 48 hours.</p>
            <div style={{marginTop:28}}><Btn variant="gold" onClick={onClose} full>Close</Btn></div>
          </div>
        ):(
          <>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.gold,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:10}}>Rate Enquiry</div>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,color:T.text,marginBottom:6}}>Enquire about <em style={{color:T.gold,fontStyle:"italic"}}>{name}</em></h3>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.textMid,lineHeight:1.7,marginBottom:28}}>Rate indications are shared with verified operators. Fill in your details — we'll respond within 48 hours.</p>
            <div style={{display:"grid",gap:16}}>
              {[{l:"Company / Brand",k:"company",ph:"Your operator name"},{l:"Work Email",k:"email",ph:"you@casino.com"},{l:"Target Geography",k:"geo",ph:"e.g. Spain, Germany, Brazil"},{l:"Preferred Deal Model",k:"model",ph:"CPA / RevShare / Hybrid / Flat Fee"}].map(f=>(
                <div key={f.k}><label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.12em",textTransform:"uppercase",display:"block",marginBottom:6}}>{f.l}</label>
                <input value={form[f.k]} onChange={e=>up(f.k,e.target.value)} placeholder={f.ph} style={FS} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.border}/></div>
              ))}
              <div><label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.12em",textTransform:"uppercase",display:"block",marginBottom:6}}>Additional Notes</label>
              <textarea value={form.notes} onChange={e=>up("notes",e.target.value)} rows={3} placeholder="Campaign brief, timeline, context..." style={{...FS,resize:"vertical"}} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.border}/></div>
              <input name="website" type="text" style={{display:"none"}} tabIndex={-1}/>
              <Btn variant="gold" onClick={()=>setDone(true)} full>Request Rate for {name} →</Btn>
              <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.textDim,textAlign:"center",lineHeight:1.6}}>No commitment required. Shared confidentially.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({page,setPage}){
  const[scrolled,setScrolled]=useState(false);const[mopen,setMopen]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>40);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  const links=[["For Operators","operators"],["For Talent","talent"],["Services","services"],["Roster","roster"],["About","about"]];
  const go=k=>{setPage(k);setMopen(false);};
  return(
    <>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:scrolled?`${T.bg}F2`:"transparent",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:scrolled?`1px solid ${T.border}`:"1px solid transparent",transition:"all .4s"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between",height:68}}>
          <div onClick={()=>go("home")} style={{cursor:"pointer",display:"flex",alignItems:"baseline",gap:10}}>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:600,color:T.text,letterSpacing:"0.04em"}}>TiGah</span>
            <span className="hm" style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:T.gold,letterSpacing:"0.22em"}}>THE IGAMING HUB</span>
          </div>
          <div className="hm" style={{display:"flex",gap:36,alignItems:"center"}}>
            {links.map(([label,key])=>(
              <span key={key} onClick={()=>go(key)} className="nav-link" style={{position:"relative",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:page===key?T.gold:T.textMid,cursor:"pointer",transition:"color .2s"}}>{label}</span>
            ))}
            <Btn variant="gold" onClick={()=>go("contact")} style={{padding:"11px 22px",fontSize:10}}>Book a Call</Btn>
          </div>
          <button onClick={()=>setMopen(!mopen)} className="sm" style={{display:"none",background:"none",border:"none",cursor:"pointer",padding:8,flexDirection:"column",gap:5}}>
            {[0,1,2].map(i=><div key={i} style={{width:22,height:1.5,background:T.gold,transition:"all .3s",transform:mopen&&i===0?"rotate(45deg) translate(5px,5px)":mopen&&i===2?"rotate(-45deg) translate(5px,-5px)":"none",opacity:mopen&&i===1?0:1}}/>)}
          </button>
        </div>
      </nav>
      <div style={{position:"fixed",top:68,left:0,right:0,zIndex:999,background:`${T.bg}F8`,backdropFilter:"blur(20px)",borderBottom:`1px solid ${T.border}`,transform:mopen?"translateY(0)":"translateY(-110%)",transition:"transform .35s cubic-bezier(.22,1,.36,1)",padding:"24px 28px 32px"}}>
        {links.map(([label,key])=><div key={key} onClick={()=>go(key)} style={{fontFamily:"'DM Mono',monospace",fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",color:T.textMid,padding:"16px 0",borderBottom:`1px solid ${T.border}`,cursor:"pointer"}}>{label}</div>)}
        <div style={{marginTop:24}}><Btn variant="gold" onClick={()=>go("contact")} full>Book a Call</Btn></div>
      </div>
    </>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({setPage,content}){
  const go=k=>setPage(k);
  return(
    <footer style={{background:T.surface,borderTop:`1px solid ${T.border}`}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"72px 28px 40px"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:48,marginBottom:56}} className="g4">
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:500,color:T.text,marginBottom:8}}>TiGah</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:T.gold,letterSpacing:"0.22em",marginBottom:20}}>THE IGAMING HUB</div>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.textMid,lineHeight:1.8,maxWidth:260}}>{content.footerTagline}</p>
          </div>
          {[
            {title:"Platform",items:[["For Operators","operators"],["For Talent","talent"],["Services","services"],["Talent Roster","roster"]]},
            {title:"Company",items:[["About","about"],["Case Studies","cases"],["Contact","contact"]]},
            {title:"Legal",items:[["Disclaimer","legal"],["Privacy Policy","legal"]]},
          ].map(col=>(
            <div key={col.title}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.gold,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:20}}>{col.title}</div>
              {col.items.map(([label,key])=><div key={label} onClick={()=>go(key)} style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.textMid,marginBottom:12,cursor:"pointer",transition:"color .2s"}} onMouseEnter={e=>e.target.style.color=T.gold} onMouseLeave={e=>e.target.style.color=T.textMid}>{label}</div>)}
            </div>
          ))}
        </div>
        <Divider/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:28,flexWrap:"wrap",gap:12}}>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textDim}}>© 2025 TiGah. All rights reserved.</span>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textDim}}>Not gambling advice. Not legal counsel.</span>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN PANEL
// ═══════════════════════════════════════════════════════════════════════════════
function AdminLogin({onLogin}){
  const[u,setU]=useState("");const[p,setP]=useState("");const[err,setErr]=useState("");
  const handle=()=>{if(u===ADMIN_USER&&p===ADMIN_PASS){onLogin();}else{setErr("Invalid credentials.");setP("");}};
  const FS={width:"100%",background:T.adminSurface,border:`1px solid ${T.adminBorder}`,color:T.text,padding:"14px 16px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,outline:"none",transition:"border-color .2s"};
  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:T.adminBg,padding:24,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 60% 60% at 50% 50%,${T.goldDim}14,transparent)`,pointerEvents:"none"}}/>
      <div style={{width:"100%",maxWidth:420,position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:40,fontWeight:600,color:T.text,letterSpacing:"0.04em",marginBottom:6}}>TiGah</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:T.gold,letterSpacing:"0.22em"}}>ADMIN PANEL</div>
        </div>
        <div style={{background:T.adminSurface,border:`1px solid ${T.adminBorder}`,padding:"40px 36px"}}>
          <div style={{display:"grid",gap:16,marginBottom:24}}>
            <div><label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.12em",textTransform:"uppercase",display:"block",marginBottom:8}}>Username</label>
            <input value={u} onChange={e=>setU(e.target.value)} placeholder="admin" style={FS} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.adminBorder} onKeyDown={e=>e.key==="Enter"&&handle()}/></div>
            <div><label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.12em",textTransform:"uppercase",display:"block",marginBottom:8}}>Password</label>
            <input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="••••••••" style={FS} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.adminBorder} onKeyDown={e=>e.key==="Enter"&&handle()}/></div>
          </div>
          {err&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.red,marginBottom:16,textAlign:"center"}}>{err}</div>}
          <Btn variant="gold" onClick={handle} full>Sign In →</Btn>
        </div>
        <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.textDim,textAlign:"center",marginTop:20}}>Access restricted to TiGah administrators.</p>
      </div>
    </div>
  );
}

function AdminPanel({talent,content,onTalentChange,onContentChange,onLogout,setPage}){
  const[tab,setTab]=useState("talent");
  const[saving,setSaving]=useState(false);
  const[saved,setSaved]=useState(false);

  const showSaved=()=>{setSaved(true);setTimeout(()=>setSaved(false),2000);};

  return(
    <div style={{minHeight:"100vh",background:T.adminBg,color:T.text}}>
      {/* Admin Top Bar */}
      <div style={{background:T.adminSurface,borderBottom:`1px solid ${T.adminBorder}`,padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between",height:60,position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:20}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:600,color:T.text,cursor:"pointer"}} onClick={()=>setPage("home")}>TiGah</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:T.gold,letterSpacing:"0.2em"}}>ADMIN</div>
          <div style={{width:1,height:20,background:T.adminBorder}}/>
          {saved&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.green,animation:"fadeIn .3s ease"}}>✓ Saved</div>}
        </div>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <button onClick={()=>setPage("home")} style={{background:"none",border:`1px solid ${T.adminBorder}`,color:T.textMid,padding:"8px 16px",fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.12em",textTransform:"uppercase",cursor:"pointer"}}>← View Site</button>
          <button onClick={onLogout} style={{background:"none",border:`1px solid ${T.red}30`,color:T.red,padding:"8px 16px",fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.12em",textTransform:"uppercase",cursor:"pointer"}}>Logout</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{background:T.adminSurface,borderBottom:`1px solid ${T.adminBorder}`,padding:"0 28px",display:"flex",gap:0}}>
        {[["talent","🎯 Talent Roster"],["content","✏️ Page Content"],["contact","📬 Contact Info"]].map(([key,label])=>(
          <button key={key} onClick={()=>setTab(key)} className={`admin-tab ${tab===key?"active":""}`}>{label}</button>
        ))}
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"36px 28px"}}>

        {/* ── TAB: TALENT ── */}
        {tab==="talent"&&<TalentAdmin talent={talent} onChange={onTalentChange} onSaved={showSaved}/>}

        {/* ── TAB: CONTENT ── */}
        {tab==="content"&&<ContentAdmin content={content} onChange={onContentChange} onSaved={showSaved}/>}

        {/* ── TAB: CONTACT ── */}
        {tab==="contact"&&<ContactAdmin content={content} onChange={onContentChange} onSaved={showSaved}/>}

      </div>
    </div>
  );
}

// ── TALENT ADMIN ──────────────────────────────────────────────────────────────
function TalentAdmin({talent,onChange,onSaved}){
  const[editing,setEditing]=useState(null); // null | id | "new"
  const[search,setSearch]=useState("");
  const[confirm,setConfirm]=useState(null);
  const BLANK={name:"",geo:"",region:"Europe",platform:"Twitch",viewers:"",url:"",price:""};
  const[form,setForm]=useState(BLANK);
  const up=(k,v)=>setForm(p=>({...p,[k]:v}));

  const filtered=talent.filter(t=>!search||t.name.toLowerCase().includes(search.toLowerCase())||t.geo.toLowerCase().includes(search.toLowerCase()));

  const startEdit=t=>{setForm({...t,viewers:String(t.viewers)});setEditing(t.id);};
  const startNew=()=>{setForm(BLANK);setEditing("new");};
  const cancel=()=>{setEditing(null);setForm(BLANK);};

  const save=()=>{
    const entry={...form,viewers:parseInt(form.viewers)||0};
    if(editing==="new"){
      const newId=Math.max(0,...talent.map(t=>t.id))+1;
      onChange([...talent,{...entry,id:newId}]);
    }else{
      onChange(talent.map(t=>t.id===editing?{...entry,id:editing}:t));
    }
    cancel();onSaved();
  };

  const del=id=>{onChange(talent.filter(t=>t.id!==id));setConfirm(null);onSaved();};

  const REGIONS=["Europe","Eastern Europe","North America","LATAM","Asia"];
  const PLATFORMS=["Twitch","Kick","Twitch + Kick","YouTube","Instagram","TikTok"];

  const FStyle={background:"#050507",border:`1px solid ${T.adminBorder}`,color:T.text,padding:"10px 12px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,outline:"none",width:"100%",transition:"border-color .2s"};

  return(
    <div>
      {/* Confirm delete modal */}
      {confirm&&(
        <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(5,5,7,.9)"}}>
          <div style={{background:T.adminSurface,border:`1px solid ${T.adminBorder}`,padding:"40px",maxWidth:400,width:"100%",textAlign:"center"}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,color:T.text,marginBottom:12}}>Delete {confirm.name}?</div>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.textMid,marginBottom:28}}>This action cannot be undone.</p>
            <div style={{display:"flex",gap:12,justifyContent:"center"}}>
              <button onClick={()=>setConfirm(null)} style={{background:"none",border:`1px solid ${T.adminBorder}`,color:T.textMid,padding:"12px 24px",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.1em"}}>Cancel</button>
              <button onClick={()=>del(confirm.id)} style={{background:T.red,border:"none",color:"#fff",padding:"12px 24px",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.1em"}}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,color:T.text,marginBottom:4}}>Talent Roster</h2>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textMid}}>{talent.length} talents total</div>
        </div>
        <Btn variant="gold" onClick={startNew}>+ Add Talent</Btn>
      </div>

      {/* Add / Edit Form */}
      {editing&&(
        <div style={{background:T.adminSurface,border:`1px solid ${T.gold}40`,padding:"28px 24px",marginBottom:28,animation:"slideIn .25s ease"}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.gold,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:16}}>
            {editing==="new"?"New Talent":"Edit: "+form.name}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:14}} className="g3">
            {[{l:"Name",k:"name",ph:"Streamer name"},{l:"Geography",k:"geo",ph:"e.g. Germany, Spain"},{l:"Channel URL",k:"url",ph:"https://twitch.tv/..."}].map(f=>(
              <div key={f.k}><label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:6}}>{f.l}</label>
              <input value={form[f.k]} onChange={e=>up(f.k,e.target.value)} placeholder={f.ph} style={FStyle} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.adminBorder}/></div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}} className="g4">
            <div><label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:6}}>Region</label>
            <select value={form.region} onChange={e=>up("region",e.target.value)} style={{...FStyle}} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.adminBorder}>
              {REGIONS.map(r=><option key={r} value={r}>{r}</option>)}
            </select></div>
            <div><label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:6}}>Platform</label>
            <select value={form.platform} onChange={e=>up("platform",e.target.value)} style={{...FStyle}} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.adminBorder}>
              {PLATFORMS.map(p=><option key={p} value={p}>{p}</option>)}
            </select></div>
            <div><label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:6}}>Avg Viewers</label>
            <input value={form.viewers} onChange={e=>up("viewers",e.target.value)} placeholder="e.g. 1200" type="number" style={FStyle} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.adminBorder}/></div>
            <div><label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:6}}>Rate (internal)</label>
            <input value={form.price} onChange={e=>up("price",e.target.value)} placeholder="e.g. $1,500/stream" style={FStyle} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.adminBorder}/></div>
          </div>
          <div style={{background:`${T.goldDim}15`,border:`1px solid ${T.goldDim}`,padding:"10px 14px",marginBottom:20,display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:13}}>🔒</span>
            <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.textMid}}>Rate field is <strong style={{color:T.gold}}>internal only</strong> — shown masked to visitors, revealed only after enquiry form.</span>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={cancel} style={{background:"none",border:`1px solid ${T.adminBorder}`,color:T.textMid,padding:"11px 20px",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.1em"}}>Cancel</button>
            <button onClick={save} style={{background:T.gold,border:"none",color:"#080808",padding:"11px 28px",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.1em"}}>
              {editing==="new"?"Add Talent →":"Save Changes →"}
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or market..." style={{background:T.adminSurface,border:`1px solid ${T.adminBorder}`,color:T.text,padding:"11px 16px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,outline:"none",width:"100%",maxWidth:360,marginBottom:16,transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.adminBorder}/>

      {/* Talent Table */}
      <div style={{border:`1px solid ${T.adminBorder}`,overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:T.adminSurface,borderBottom:`1px solid ${T.adminBorder}`}}>
              {["Talent","Region","Platform","Avg Viewers","Rate (internal)","Actions"].map(h=>(
                <th key={h} style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.13em",textTransform:"uppercase",padding:"12px 16px",textAlign:"left",fontWeight:400,whiteSpace:"nowrap"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t,i)=>(
              <tr key={t.id} className="admin-row" style={{borderBottom:i<filtered.length-1?`1px solid ${T.adminBorder}`:"none",background:"transparent",transition:"background .15s"}}>
                <td style={{padding:"13px 16px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:30,height:30,background:`${T.goldDim}40`,border:`1px solid ${T.goldDim}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:T.gold}}>{t.name[0]}</span>
                    </div>
                    <div>
                      <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text,fontWeight:600}}>{t.name}</div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textDim}}>{t.geo}</div>
                    </div>
                  </div>
                </td>
                <td style={{padding:"13px 16px",fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textDim,whiteSpace:"nowrap"}}>{t.region}</td>
                <td style={{padding:"13px 16px"}}><PlatBadge platform={t.platform}/></td>
                <td style={{padding:"13px 16px",fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:t.viewers>=1000?T.gold:T.text}}>{t.viewers.toLocaleString()}</td>
                <td style={{padding:"13px 16px"}}>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.gold,background:`${T.goldDim}20`,padding:"3px 10px",border:`1px solid ${T.goldDim}`}}>{t.price||"—"}</span>
                </td>
                <td style={{padding:"13px 16px"}}>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>startEdit(t)} style={{background:"none",border:`1px solid ${T.adminBorder}`,color:T.textMid,padding:"7px 12px",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.1em",transition:"all .2s"}} onMouseEnter={e=>{e.target.style.borderColor=T.gold;e.target.style.color=T.gold;}} onMouseLeave={e=>{e.target.style.borderColor=T.adminBorder;e.target.style.color=T.textMid;}}>Edit</button>
                    <button onClick={()=>setConfirm(t)} style={{background:"none",border:`1px solid ${T.red}30`,color:T.red,padding:"7px 12px",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.1em",transition:"all .2s"}} onMouseEnter={e=>e.target.style.borderColor=T.red} onMouseLeave={e=>e.target.style.borderColor=`${T.red}30`}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length===0&&<div style={{padding:"48px",textAlign:"center",border:`1px solid ${T.adminBorder}`,borderTop:"none",color:T.textDim,fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14}}>No results</div>}
    </div>
  );
}

// ── CONTENT ADMIN ─────────────────────────────────────────────────────────────
function ContentAdmin({content,onChange,onSaved}){
  const[local,setLocal]=useState({...content});
  const up=(k,v)=>setLocal(p=>({...p,[k]:v}));
  const save=()=>{onChange(local);onSaved();};

  const sections=[
    {title:"🏠 Homepage Hero",fields:[{l:"Hero Headline",k:"heroTitle",multi:false,ph:"Premium iGaming Partnerships Built to Scale."},{l:"Hero Subtitle",k:"heroSubtitle",multi:true,ph:"Supporting copy below headline..."}]},
    {title:"🎰 For Operators",fields:[{l:"Page Headline",k:"operatorsTitle",multi:false,ph:"Stop piecing together your creator strategy."},{l:"Subtitle",k:"operatorsSubtitle",multi:true,ph:"Supporting copy..."}]},
    {title:"🎥 For Talent",fields:[{l:"Page Headline",k:"talentTitle",multi:false,ph:"Your audience. Premium deals."},{l:"Subtitle",k:"talentSubtitle",multi:true,ph:"Supporting copy..."}]},
    {title:"🏢 About",fields:[{l:"About Headline",k:"aboutTitle",multi:false,ph:"The iGaming Partnerships Hub..."},{l:"About Paragraph 1",k:"aboutBody1",multi:true,ph:""},{l:"About Paragraph 2",k:"aboutBody2",multi:true,ph:""}]},
    {title:"🔗 Footer",fields:[{l:"Footer Tagline",k:"footerTagline",multi:false,ph:"Premium iGaming talent & commercial partnerships..."}]},
  ];

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
        <div><h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,color:T.text,marginBottom:4}}>Page Content</h2>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textMid}}>Edit all visible text on the website</div></div>
        <button onClick={save} style={{background:T.gold,border:"none",color:"#080808",padding:"13px 28px",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase"}}>Save All Changes →</button>
      </div>
      <div style={{display:"grid",gap:28}}>
        {sections.map(sec=>(
          <div key={sec.title} style={{background:T.adminSurface,border:`1px solid ${T.adminBorder}`,padding:"28px 24px"}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.gold,letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:20}}>{sec.title}</div>
            <div style={{display:"grid",gap:16}}>
              {sec.fields.map(f=>(
                <div key={f.k}>
                  <label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:7}}>{f.l}</label>
                  {f.multi
                    ?<textarea value={local[f.k]} onChange={e=>up(f.k,e.target.value)} placeholder={f.ph} rows={3} style={{width:"100%",background:"#050507",border:`1px solid ${T.adminBorder}`,color:T.text,padding:"11px 13px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,outline:"none",resize:"vertical",transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.adminBorder}/>
                    :<input value={local[f.k]} onChange={e=>up(f.k,e.target.value)} placeholder={f.ph} style={{width:"100%",background:"#050507",border:`1px solid ${T.adminBorder}`,color:T.text,padding:"11px 13px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,outline:"none",transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.adminBorder}/>
                  }
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:20,textAlign:"right"}}><button onClick={save} style={{background:T.gold,border:"none",color:"#080808",padding:"13px 36px",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase"}}>Save All Changes →</button></div>
    </div>
  );
}

// ── CONTACT ADMIN ─────────────────────────────────────────────────────────────
function ContactAdmin({content,onChange,onSaved}){
  const[local,setLocal]=useState({...content});
  const up=(k,v)=>setLocal(p=>({...p,[k]:v}));
  const save=()=>{onChange(local);onSaved();};
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
        <div><h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,color:T.text,marginBottom:4}}>Contact Info</h2>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textMid}}>Emails, Telegram handles, and Calendly link</div></div>
        <button onClick={save} style={{background:T.gold,border:"none",color:"#080808",padding:"13px 28px",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase"}}>Save Changes →</button>
      </div>
      <div style={{display:"grid",gap:24}}>
        {[
          {title:"📨 Operator Contact",fields:[{l:"Operator Email",k:"contactEmail",ph:"operators@tigah.io"},{l:"Operator Telegram",k:"contactTelegram",ph:"@TiGahOperators"}]},
          {title:"🎥 Talent Contact",fields:[{l:"Talent Email",k:"talentEmail",ph:"talent@tigah.io"},{l:"Talent Telegram",k:"talentTelegram",ph:"@TiGahTalent"}]},
          {title:"📅 Calendly Integration",fields:[{l:"Calendly URL (full URL)",k:"calendlyUrl",ph:"https://calendly.com/tigah/intro"}]},
        ].map(sec=>(
          <div key={sec.title} style={{background:T.adminSurface,border:`1px solid ${T.adminBorder}`,padding:"28px 24px"}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.gold,letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:20}}>{sec.title}</div>
            <div style={{display:"grid",gap:14}}>
              {sec.fields.map(f=>(
                <div key={f.k}>
                  <label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:7}}>{f.l}</label>
                  <input value={local[f.k]||""} onChange={e=>up(f.k,e.target.value)} placeholder={f.ph} style={{width:"100%",background:"#050507",border:`1px solid ${T.adminBorder}`,color:T.text,padding:"11px 13px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,outline:"none",transition:"border-color .2s"}} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.adminBorder}/>
                </div>
              ))}
            </div>
            {sec.title.includes("Calendly")&&local.calendlyUrl&&(
              <div style={{marginTop:16,background:`${T.green}10`,border:`1px solid ${T.green}30`,padding:"10px 14px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.green}}>
                ✓ Calendly URL set — the embed will show live on the Contact page.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC PAGES
// ═══════════════════════════════════════════════════════════════════════════════
function HomePage({setPage,talent,content}){
  const[mouse,setMouse]=useState({x:50,y:50});
  const[modalName,setModalName]=useState(null);
  useEffect(()=>{const fn=e=>setMouse({x:(e.clientX/window.innerWidth)*100,y:(e.clientY/window.innerHeight)*100});window.addEventListener("mousemove",fn);return()=>window.removeEventListener("mousemove",fn);},[]);
  const topTalent=talent.filter(t=>t.viewers>=500).slice(0,6);
  const words=content.heroTitle.split(" ");
  return(
    <div>
      {modalName&&<RateModal name={modalName} onClose={()=>setModalName(null)} content={content}/>}
      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"120px 28px 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 70% 60% at ${mouse.x}% ${mouse.y}%,${T.goldDim}22,transparent 70%)`,transition:"background .9s ease",pointerEvents:"none"}}/>
        <NoiseLayer/>
        <div style={{position:"absolute",top:"-5%",left:"-2%",fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(160px,25vw,320px)",color:`${T.gold}05`,fontWeight:600,lineHeight:1,pointerEvents:"none",userSelect:"none"}}>T</div>
        <div style={{position:"absolute",bottom:"-8%",right:"-2%",fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(160px,25vw,320px)",color:`${T.gold}05`,fontWeight:600,lineHeight:1,pointerEvents:"none",userSelect:"none"}}>G</div>
        <div style={{position:"relative",zIndex:1,maxWidth:860}}>
          <div style={{animation:"fadeIn .6s ease both"}}><Badge>Est. MMXXV · iGaming Talent & Commercial Partnerships</Badge></div>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(44px,8vw,92px)",fontWeight:300,color:T.text,lineHeight:1.02,margin:"36px 0 28px",letterSpacing:"-0.02em"}}>
            {words.map((w,i)=>{
              const isIGaming=w==="iGaming";
              return<span key={i} className="hw" style={{animationDelay:`${0.1+i*0.08}s`,fontStyle:isIGaming?"italic":"normal",color:isIGaming?T.gold:T.text}}>{w}{" "}</span>;
            })}
          </h1>
          <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:17,color:T.textMid,lineHeight:1.75,maxWidth:580,margin:"0 auto 48px",animation:"fadeUp .9s .5s both"}}>{content.heroSubtitle}</p>
          <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",animation:"fadeUp .9s .65s both"}}>
            <Btn variant="gold" onClick={()=>setPage("operators")} style={{fontSize:12}}>Book a Call — Operators ↗</Btn>
            <Btn variant="outline" onClick={()=>setPage("talent")} style={{fontSize:12}}>Join as Talent</Btn>
          </div>
          <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:48,flexWrap:"wrap",animation:"fadeUp .9s .82s both"}}>
            {talent.filter(t=>t.viewers>=700).slice(0,4).map((t,i)=>(
              <div key={i} style={{background:`${T.surface}CC`,border:`1px solid ${T.border}`,padding:"10px 16px",display:"flex",alignItems:"center",gap:10,backdropFilter:"blur(8px)"}}>
                <div style={{width:28,height:28,background:`${T.goldDim}60`,border:`1px solid ${T.goldDim}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:T.gold}}>{t.name[0]}</span>
                </div>
                <div style={{textAlign:"left"}}>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.text,fontWeight:500}}>{t.name}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.gold}}>{t.viewers.toLocaleString()} avg</div>
                </div>
              </div>
            ))}
            <div style={{background:`${T.surface}80`,border:`1px solid ${T.border}`,padding:"10px 20px",display:"flex",alignItems:"center",backdropFilter:"blur(8px)"}}>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid}}>+{Math.max(0,talent.length-4)} more →</span>
            </div>
          </div>
        </div>
        <div style={{position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,animation:"fadeIn 1s 1.2s both"}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:T.textDim,letterSpacing:"0.22em"}}>SCROLL</div>
          <div style={{width:1,height:44,background:`linear-gradient(${T.gold},transparent)`,animation:"shimmer 2s infinite"}}/>
        </div>
      </section>

      {/* STATS */}
      <section style={{borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`,background:T.surface}}>
        <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)"}} className="sg">
          {[{n:talent.length,s:"+",l:"Active Talents"},{n:3,s:"",l:"Regions"},{n:8,s:"+",l:"Markets"},{n:100,s:"%",l:"Managed End-to-End"}].map((st,i)=>(
            <Reveal key={i} delay={i*.1}>
              <div style={{padding:"52px 32px",borderRight:i<3?`1px solid ${T.border}`:"none",textAlign:"center"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(44px,5vw,64px)",fontWeight:500,color:T.gold,lineHeight:1}}><Counter target={st.n} suffix={st.s}/></div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textMid,letterSpacing:"0.15em",textTransform:"uppercase",marginTop:10}}>{st.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT WE DO */}
      <section style={{padding:"120px 28px",maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:80,alignItems:"start"}} className="g2">
          <Reveal>
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.gold,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:24}}>§ 01 — What We Do</div>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(32px,4vw,48px)",fontWeight:300,color:T.text,lineHeight:1.1,marginBottom:24}}>Four pillars. One partner.</h2>
              <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.textMid,lineHeight:1.9,marginBottom:32}}>We operate where talent management, commercial negotiation, compliance, and execution converge.</p>
              <Btn variant="outline" onClick={()=>setPage("services")}>Explore Services →</Btn>
            </div>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:T.border}} className="g2">
            {[{icon:"◈",t:"Talent",d:"Curated streamers, influencers, athletes & affiliates across 8+ markets."},{icon:"◉",t:"Commercial",d:"CPA, RevShare, Hybrid — deal structures built for operator ROI."},{icon:"◐",t:"Compliance",d:"KYC-aware onboarding and regulatory-conscious contract frameworks."},{icon:"◑",t:"Execution",d:"Brief to broadcast — fully managed campaign delivery & reporting."}].map((item,i)=>(
              <Reveal key={i} delay={i*.1}>
                <div className="ch" style={{background:T.bg,padding:"40px 32px",border:"1px solid transparent"}}>
                  <div style={{fontSize:22,color:T.gold,marginBottom:20}}>{item.icon}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:T.text,marginBottom:12}}>{item.t}</div>
                  <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.textMid,lineHeight:1.7}}>{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider/>

      {/* FEATURED TALENT with masked rates */}
      <section style={{padding:"120px 28px"}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <Reveal>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:48,flexWrap:"wrap",gap:24}}>
              <div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.gold,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:16}}>§ 02 — Featured Talent</div>
                <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(32px,4vw,48px)",fontWeight:300,color:T.text}}>Top performers on our active roster</h2>
              </div>
              <Btn variant="outline" onClick={()=>setPage("roster")}>View All {talent.length} Talents →</Btn>
            </div>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:T.border}} className="g3">
            {topTalent.map((t,i)=>(
              <Reveal key={i} delay={(i%6)*.06}>
                <div className="ch" style={{background:T.bg,padding:"32px 28px",border:"1px solid transparent"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
                    <div style={{width:44,height:44,background:`${T.goldDim}40`,border:`1px solid ${T.goldDim}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:T.gold}}>{t.name[0]}</span>
                    </div>
                    <PlatBadge platform={t.platform}/>
                  </div>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,color:T.text,fontWeight:600,marginBottom:4}}>{t.name}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textMid,marginBottom:20}}>{t.geo}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",paddingTop:16,borderTop:`1px solid ${T.border}`}}>
                    <div>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:T.textDim,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>Avg Viewers</div>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,color:t.viewers>=1000?T.gold:T.text}}>{t.viewers.toLocaleString()}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:T.textDim,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>Rate</div>
                      <RateMask name={t.name} onRequest={setModalName}/>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding:"120px 28px",background:T.surface,borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <Reveal><div style={{textAlign:"center",marginBottom:80}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.gold,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:16}}>§ 03 — Process</div>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(32px,5vw,52px)",fontWeight:300,color:T.text}}>From brief to campaign live in 2–4 weeks</h2>
          </div></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",position:"relative"}} className="g4">
            <div style={{position:"absolute",top:"22%",left:"12.5%",right:"12.5%",height:1,background:`linear-gradient(90deg,${T.gold}30,${T.gold}60,${T.gold}30)`}} className="hm"/>
            {[{n:"01",t:"Brief",d:"Share your geo, deal model, and campaign timeline."},{n:"02",t:"Match",d:"We present vetted talent aligned to your brief."},{n:"03",t:"Structure",d:"Commercials negotiated. Contracts drafted. Compliance reviewed."},{n:"04",t:"Execute",d:"Campaign live. Performance tracked. Reports delivered."}].map((s,i)=>(
              <Reveal key={i} delay={i*.15}>
                <div style={{textAlign:"center",padding:"0 24px"}}>
                  <div style={{width:48,height:48,borderRadius:"50%",border:`1px solid ${T.gold}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 32px",background:T.surface,animation:"pulse 3s infinite",animationDelay:`${i*.5}s`}}>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.gold}}>{s.n}</span>
                  </div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:T.text,marginBottom:12}}>{s.t}</div>
                  <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.textMid,lineHeight:1.7}}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={.4}><div style={{textAlign:"center",marginTop:64}}><Btn variant="gold" onClick={()=>setPage("operators")}>Start with a Brief →</Btn></div></Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"100px 28px",position:"relative",overflow:"hidden",borderTop:`1px solid ${T.border}`}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 70% 100% at 50% 50%,${T.goldDim}18,transparent)`,pointerEvents:"none"}}/>
        <NoiseLayer/>
        <Reveal><div style={{maxWidth:700,margin:"0 auto",textAlign:"center",position:"relative",zIndex:1}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(36px,5vw,60px)",fontWeight:300,color:T.text,lineHeight:1.1,marginBottom:24}}>Ready to scale your iGaming channel strategy?</h2>
          <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,color:T.textMid,marginBottom:44}}>One conversation. Commercial proposal within 48 hours.</p>
          <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
            <Btn variant="gold" onClick={()=>setPage("contact")}>Book an Intro Call ↗</Btn>
            <Btn variant="ghost" onClick={()=>setPage("roster")}>Explore the Roster</Btn>
          </div>
        </div></Reveal>
      </section>
    </div>
  );
}

// Remaining public pages (Roster, Operators, Talent, Services, Contact, About, Cases, Legal)
function RosterPage({setPage,talent}){
  const[region,setRegion]=useState("All");const[plat,setPlat]=useState("All");const[search,setSearch]=useState("");const[view,setView]=useState("grid");const[modal,setModal]=useState(null);
  const regions=["All",...[...new Set(talent.map(t=>t.region))]];
  const plats=["All","Twitch","Kick","Twitch + Kick"];
  const filtered=talent.filter(t=>{
    const mr=region==="All"||t.region===region;
    const mp=plat==="All"||(plat==="Twitch + Kick"?t.platform==="Twitch + Kick":t.platform.includes(plat)&&t.platform!=="Twitch + Kick");
    const ms=!search||t.name.toLowerCase().includes(search.toLowerCase())||t.geo.toLowerCase().includes(search.toLowerCase());
    return mr&&mp&&ms;
  });
  const FB={background:T.surface,border:`1px solid ${T.border}`,color:T.text,padding:"11px 16px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,outline:"none",transition:"border-color .2s"};
  const FilterBtn=({active,onClick,children})=><button onClick={onClick} style={{background:active?T.gold:"transparent",color:active?"#080808":T.textMid,border:"none",padding:"11px 18px",fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.1em",cursor:"pointer",textTransform:"uppercase",transition:"all .2s"}}>{children}</button>;
  return(
    <>
      {modal&&<RateModal name={modal} onClose={()=>setModal(null)}/>}
      <div style={{paddingTop:68}}>
        <section style={{padding:"80px 28px 40px"}}>
          <div style={{maxWidth:1280,margin:"0 auto"}}>
            <Reveal>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:48,flexWrap:"wrap",gap:24}}>
                <div><Badge>Talent Roster</Badge>
                <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(36px,5vw,64px)",fontWeight:300,color:T.text,lineHeight:1.05,marginTop:24}}>Active Streaming Talent<br/><em style={{color:T.gold}}>Available for Partnerships</em></h1></div>
                <div style={{textAlign:"right"}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:64,color:T.gold,lineHeight:1}}>{talent.length}</div><div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textMid}}>Active talents</div><div style={{marginTop:16}}><Btn variant="gold" onClick={()=>setPage("contact")} style={{fontSize:10}}>Enquire →</Btn></div></div>
              </div>
            </Reveal>
            <Reveal delay={.1}>
              <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap",marginBottom:16}}>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or market..." style={FB} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.border}/>
                <div style={{display:"flex",border:`1px solid ${T.border}`}}>{regions.map(r=><FilterBtn key={r} active={region===r} onClick={()=>setRegion(r)}>{r}</FilterBtn>)}</div>
                <div style={{display:"flex",border:`1px solid ${T.border}`}}>{plats.map(p=><FilterBtn key={p} active={plat===p} onClick={()=>setPlat(p)}>{p}</FilterBtn>)}</div>
                <div style={{marginLeft:"auto",display:"flex",border:`1px solid ${T.border}`}}>{[["⊞","grid"],["≡","table"]].map(([icon,v])=><button key={v} onClick={()=>setView(v)} style={{background:view===v?T.surfaceHi:"transparent",color:view===v?T.gold:T.textMid,border:"none",padding:"11px 16px",cursor:"pointer",fontSize:16}}>{icon}</button>)}</div>
              </div>
              <div style={{background:`${T.goldDim}15`,border:`1px solid ${T.goldDim}`,padding:"11px 18px",marginBottom:24,display:"flex",alignItems:"center",gap:10}}>
                <span>🔒</span><span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.textMid}}>Rates shown to verified operators only. <span style={{color:T.gold,cursor:"pointer"}} onClick={()=>setPage("operators")}>Click any 🔒 to request full details →</span></span>
              </div>
            </Reveal>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textMid,marginBottom:18}}>{filtered.length} talent{filtered.length!==1?"s":""} {search||region!=="All"||plat!=="All"?"matching filters":"total"}</div>
            {view==="grid"&&<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:T.border}} className="g3">
              {filtered.map((t,i)=>(
                <Reveal key={t.id} delay={(i%6)*.05}>
                  <div className="ch" style={{background:T.bg,padding:"32px 28px",border:"1px solid transparent"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
                      <div style={{width:44,height:44,background:`${T.goldDim}40`,border:`1px solid ${T.goldDim}`,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:T.gold}}>{t.name[0]}</span></div>
                      <PlatBadge platform={t.platform}/>
                    </div>
                    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,color:T.text,fontWeight:600,marginBottom:4}}>{t.name}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:T.textMid,marginBottom:4}}>{t.geo}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textDim,marginBottom:20}}>{t.region}</div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",paddingTop:16,borderTop:`1px solid ${T.border}`}}>
                      <div><div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:T.textDim,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4}}>Avg Viewers</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,color:t.viewers>=1000?T.gold:T.text}}>{t.viewers.toLocaleString()}</div></div>
                      <div style={{textAlign:"right"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:T.textDim,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>Rate</div><RateMask name={t.name} onRequest={n=>setModal(n)}/></div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>}
            {view==="table"&&<div style={{border:`1px solid ${T.border}`,overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{background:T.surfaceHi,borderBottom:`1px solid ${T.border}`}}>{["Talent","Region","Geo","Platform","Avg Viewers","Rate"].map(h=><th key={h} style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.13em",textTransform:"uppercase",padding:"14px 20px",textAlign:"left",fontWeight:400,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
                <tbody>{filtered.map((t,i)=>(
                  <tr key={t.id} className="rh" style={{borderBottom:i<filtered.length-1?`1px solid ${T.border}`:"none",background:"transparent",transition:"background .15s"}}>
                    <td style={{padding:"15px 20px"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:32,height:32,background:`${T.goldDim}40`,border:`1px solid ${T.goldDim}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:T.gold}}>{t.name[0]}</span></div><span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.text,fontWeight:500}}>{t.name}</span></div></td>
                    <td style={{padding:"15px 20px",fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textDim,whiteSpace:"nowrap"}}>{t.region}</td>
                    <td style={{padding:"15px 20px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.textMid}}>{t.geo}</td>
                    <td style={{padding:"15px 20px"}}><PlatBadge platform={t.platform}/></td>
                    <td style={{padding:"15px 20px",fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:t.viewers>=1000?T.gold:T.text}}>{t.viewers.toLocaleString()}</td>
                    <td style={{padding:"15px 20px"}}><RateMask name={t.name} onRequest={n=>setModal(n)}/></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>}
            {filtered.length===0&&<div style={{padding:"80px",textAlign:"center",border:`1px solid ${T.border}`,color:T.textDim,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>No results — try adjusting filters.</div>}
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:11,color:T.textDim,marginTop:20}}>* Rate indications shared with verified operators only. All terms negotiated case-by-case.</p>
          </div>
        </section>
      </div>
    </>
  );
}

function GenericPage({title,subtitle,children,badge}){
  return(
    <div style={{paddingTop:68}}>
      <section style={{padding:"96px 28px 72px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 60% 60% at 10% 60%,${T.goldDim}12,transparent)`,pointerEvents:"none"}}/>
        <div style={{maxWidth:1280,margin:"0 auto",position:"relative",zIndex:1}}>
          <Reveal><Badge>{badge}</Badge></Reveal>
          <Reveal delay={.1}><h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(38px,6vw,72px)",fontWeight:300,color:T.text,lineHeight:1.05,margin:"28px 0 20px",maxWidth:700}}>{title}</h1></Reveal>
          {subtitle&&<Reveal delay={.2}><p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:16,color:T.textMid,lineHeight:1.8,maxWidth:560,marginBottom:32}}>{subtitle}</p></Reveal>}
        </div>
      </section>
      {children}
    </div>
  );
}

function OperatorsPage({setPage,content}){
  const[step,setStep]=useState(1);const[form,setForm]=useState({geo:"",budget:"",model:"",vertical:"",timeline:"",company:"",email:"",notes:""});const[done,setDone]=useState(false);
  const up=(k,v)=>setForm(p=>({...p,[k]:v}));
  const FS={width:"100%",background:T.bg,border:`1px solid ${T.border}`,color:T.text,padding:"13px 15px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,outline:"none",boxSizing:"border-box",transition:"border-color .2s"};
  return(
    <GenericPage badge="For Casino Operators & Brands" title={content.operatorsTitle} subtitle={content.operatorsSubtitle}>
      <section style={{padding:"24px 28px 100px"}}>
        <div style={{maxWidth:740,margin:"0 auto"}}>
          <div style={{marginBottom:24}}><Btn variant="gold" onClick={()=>document.getElementById("opf")?.scrollIntoView({behavior:"smooth"})}>Get a Tailored Proposal →</Btn></div>
          <div id="opf" style={{background:T.surface,border:`1px solid ${T.border}`,padding:"44px 40px",marginTop:60}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.gold,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:12}}>Operator Intake Form</div>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,color:T.text,marginBottom:8}}>Book an Intro Call</h2>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.textMid,marginBottom:36}}>We'll prepare a tailored proposal within 48 hours.</p>
            {done?<div style={{textAlign:"center",padding:"48px 0"}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:56,color:T.gold,marginBottom:20}}>◈</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,color:T.text,marginBottom:12}}>Received.</div><p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,color:T.textMid}}>We'll follow up within 48 hours.</p></div>:(
              <>
                <div style={{display:"flex",borderBottom:`1px solid ${T.border}`,marginBottom:32}}>
                  {["Campaign Brief","Contact","Review"].map((s,i)=><div key={i} style={{flex:1,padding:"12px 0",textAlign:"center",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",color:step>i+1?T.gold:step===i+1?T.text:T.textDim,borderBottom:step===i+1?`2px solid ${T.gold}`:"2px solid transparent",transition:"all .25s"}}>{String(i+1).padStart(2,"0")} {s}</div>)}
                </div>
                {step===1&&<div style={{display:"grid",gap:16}}>
                  {[{l:"Target Geography",k:"geo",ph:"e.g. Spain, Germany, Brazil"},{l:"Monthly Budget",k:"budget",ph:"e.g. $5,000–$20,000/month"},{l:"Deal Model",k:"model",ph:"CPA / RevShare / Hybrid / Flat Fee"},{l:"Talent Verticals",k:"vertical",ph:"Streamers / Influencers / Sports / Affiliates"},{l:"Launch Timeline",k:"timeline",ph:"e.g. 4 weeks from agreement"}].map(f=>(
                    <div key={f.k}><label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:6}}>{f.l}</label>
                    <input value={form[f.k]} onChange={e=>up(f.k,e.target.value)} placeholder={f.ph} style={FS} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.border}/></div>
                  ))}
                  <Btn variant="gold" onClick={()=>setStep(2)} full>Next →</Btn>
                </div>}
                {step===2&&<div style={{display:"grid",gap:16}}>
                  {[{l:"Company",k:"company",ph:"Operator name"},{l:"Work Email",k:"email",ph:"you@casino.com"}].map(f=>(
                    <div key={f.k}><label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:6}}>{f.l}</label>
                    <input value={form[f.k]} onChange={e=>up(f.k,e.target.value)} placeholder={f.ph} style={FS} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.border}/></div>
                  ))}
                  <div><label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:6}}>Notes</label>
                  <textarea value={form.notes} onChange={e=>up("notes",e.target.value)} rows={3} placeholder="Anything else..." style={{...FS,resize:"vertical"}} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.border}/></div>
                  <div style={{display:"flex",gap:10}}><Btn variant="ghost" onClick={()=>setStep(1)}>← Back</Btn><Btn variant="gold" onClick={()=>setStep(3)} style={{flex:1,justifyContent:"center"}}>Review →</Btn></div>
                </div>}
                {step===3&&<div>
                  <div style={{border:`1px solid ${T.border}`,padding:"28px"}}>
                    {Object.entries(form).filter(([,v])=>v).map(([k,v])=>(
                      <div key={k} style={{display:"flex",justifyContent:"space-between",borderBottom:`1px solid ${T.border}`,padding:"10px 0",gap:16}}>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,textTransform:"uppercase",letterSpacing:"0.1em",flexShrink:0}}>{k}</span>
                        <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.text,textAlign:"right"}}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:10,marginTop:20}}><Btn variant="ghost" onClick={()=>setStep(2)}>← Back</Btn><Btn variant="gold" onClick={()=>setDone(true)} style={{flex:1,justifyContent:"center"}}>Submit Brief ↗</Btn></div>
                </div>}
              </>
            )}
          </div>
        </div>
      </section>
    </GenericPage>
  );
}

function TalentPage({content}){
  const[step,setStep]=useState(1);const[form,setForm]=useState({handle:"",platforms:"",geo:"",views:"",languages:"",past:"",email:"",notes:""});const[done,setDone]=useState(false);
  const up=(k,v)=>setForm(p=>({...p,[k]:v}));
  const FS={width:"100%",background:T.bg,border:`1px solid ${T.border}`,color:T.text,padding:"13px 15px",fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,outline:"none",boxSizing:"border-box",transition:"border-color .2s"};
  return(
    <GenericPage badge="For Creators & Athletes" title={content.talentTitle} subtitle={content.talentSubtitle}>
      <section style={{padding:"24px 28px 100px"}}>
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <div style={{background:T.surface,border:`1px solid ${T.border}`,padding:"44px 40px"}}>
            {done?<div style={{textAlign:"center",padding:"40px 0"}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:56,color:T.gold,marginBottom:16}}>◈</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,color:T.text,marginBottom:12}}>Application Received</div><p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.textMid}}>We review all applications within 5 business days.</p></div>:(
              <>
                <div style={{display:"flex",gap:8,marginBottom:28}}>{[1,2].map(n=><div key={n} style={{flex:1,height:2,background:step>=n?T.gold:T.border,transition:"background .3s"}}/>)}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.gold,letterSpacing:"0.15em",marginBottom:8}}>STEP {step} OF 2</div>
                <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,color:T.text,marginBottom:24}}>{step===1?"Your Channel":"Contact & Background"}</h3>
                {step===1&&<div style={{display:"grid",gap:16}}>
                  {[{l:"Handle / Name",k:"handle",ph:"@yourhandle"},{l:"Platforms",k:"platforms",ph:"Twitch, Kick, Instagram..."},{l:"Audience Geography",k:"geo",ph:"e.g. Germany, Spain"},{l:"Avg Viewers / Reach",k:"views",ph:"Avg CCU or impressions"},{l:"Languages",k:"languages",ph:"e.g. German, English"}].map(f=>(
                    <div key={f.k}><label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:6}}>{f.l}</label>
                    <input value={form[f.k]} onChange={e=>up(f.k,e.target.value)} placeholder={f.ph} style={FS} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.border}/></div>
                  ))}
                  <Btn variant="gold" onClick={()=>setStep(2)} full>Next →</Btn>
                </div>}
                {step===2&&<div style={{display:"grid",gap:16}}>
                  {[{l:"Email",k:"email",ph:"you@email.com",area:false},{l:"Past Brand Collabs",k:"past",ph:"Previous casino deals?",area:false},{l:"Notes",k:"notes",ph:"Anything else...",area:true}].map(f=>(
                    <div key={f.k}><label style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textMid,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:6}}>{f.l}</label>
                    {f.area?<textarea value={form[f.k]} onChange={e=>up(f.k,e.target.value)} rows={3} placeholder={f.ph} style={{...FS,resize:"vertical"}} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.border}/>:<input value={form[f.k]} onChange={e=>up(f.k,e.target.value)} placeholder={f.ph} style={FS} onFocus={e=>e.target.style.borderColor=T.gold} onBlur={e=>e.target.style.borderColor=T.border}/>}</div>
                  ))}
                  <div style={{display:"flex",gap:10}}><Btn variant="ghost" onClick={()=>setStep(1)}>← Back</Btn><Btn variant="gold" onClick={()=>setDone(true)} style={{flex:1,justifyContent:"center"}}>Submit ↗</Btn></div>
                </div>}
              </>
            )}
          </div>
        </div>
      </section>
    </GenericPage>
  );
}

function ContactPage({setPage,content}){
  return(
    <GenericPage badge="Get in Touch" title="One conversation. Clear next steps.">
      <section style={{padding:"0 28px 100px"}}>
        <div style={{maxWidth:960,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:T.border}} className="g2">
          <Reveal><div style={{background:T.surface,padding:"52px 44px"}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.gold,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:20}}>For Operators</div>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,color:T.text,marginBottom:16}}>Casino & Brand Partnerships</h3>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.textMid,lineHeight:1.8,marginBottom:32}}>Discuss talent sourcing, deal structuring, campaign management, or affiliate partnerships.</p>
            {[{l:"Email",v:content.contactEmail},{l:"Telegram",v:content.contactTelegram}].map(c=>(
              <div key={c.l} style={{marginBottom:20}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textDim,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>{c.l}</div><div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,color:T.gold}}>{c.v}</div></div>
            ))}
            <div style={{marginTop:28}}><Btn variant="gold" onClick={()=>setPage("operators")} full>Submit a Brief →</Btn></div>
          </div></Reveal>
          <Reveal delay={.15}><div style={{background:T.surface,padding:"52px 44px"}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.gold,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:20}}>Schedule a Call</div>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,color:T.text,marginBottom:16}}>Book a 30-min Intro</h3>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.textMid,lineHeight:1.8,marginBottom:28}}>Select a time that works. We'll come prepared with a tailored agenda.</p>
            {content.calendlyUrl?(
              <iframe src={content.calendlyUrl} width="100%" height="500" frameBorder="0" style={{border:"none",display:"block"}} title="Book a call"/>
            ):(
              <div style={{background:T.bg,border:`1px dashed ${T.border}`,height:180,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:T.textDim}}>Calendar Integration</div>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:12,color:T.textDim,textAlign:"center",maxWidth:220,lineHeight:1.6}}>Add your Calendly URL in Admin → Contact Info to activate this embed.</div>
              </div>
            )}
            <div style={{marginTop:20,borderTop:`1px solid ${T.border}`,paddingTop:20}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.textDim,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>Talent Email</div>
              <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.gold}}>{content.talentEmail}</div>
            </div>
          </div></Reveal>
        </div>
      </section>
    </GenericPage>
  );
}

function AboutPage({setPage,content}){
  return(
    <GenericPage badge="About TiGah" title={content.aboutTitle}>
      <section style={{padding:"0 28px 100px"}}>
        <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"start"}} className="g2">
          <Reveal>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,color:T.textMid,lineHeight:1.9,marginBottom:24}}>{content.aboutBody1}</p>
            <p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,color:T.textMid,lineHeight:1.9,marginBottom:32}}>{content.aboutBody2}</p>
            <Btn variant="gold" onClick={()=>setPage("contact")}>Start a Conversation →</Btn>
          </Reveal>
          <Reveal delay={.15}><div style={{display:"grid",gap:1,background:T.border}}>
            {[{l:"Market Focus",v:"Europe (West + East) · LATAM · North America"},{l:"Talent Verticals",v:"Streamers · Influencers · Sports · Affiliates"},{l:"Deal Structures",v:"CPA · RevShare · Hybrid · Flat-Fee"},{l:"Compliance",v:"KYC-aware onboarding · Regulatory-conscious contracts"},{l:"Model",v:"End-to-end — sourcing through delivery"},{l:"Reporting",v:"Structured performance tracking for every engagement"}].map((item,i)=>(
              <div key={i} className="ch" style={{background:T.surface,padding:"24px 28px",border:"1px solid transparent"}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.gold,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:6}}>{item.l}</div><div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.text}}>{item.v}</div></div>
            ))}
          </div></Reveal>
        </div>
      </section>
    </GenericPage>
  );
}

function ServicesPage({setPage}){
  const[open,setOpen]=useState(null);
  const SVCS=[{icon:"◈",t:"Talent Representation",d:"End-to-end management of streamers, influencers, and sports ambassadors across Twitch, Kick, YouTube, Instagram, and TikTok."},{icon:"◉",t:"Commercial Deal Structuring",d:"CPA, RevShare, Hybrid — every structure benchmarked against live market rates with operator ROI at the centre."},{icon:"◎",t:"Affiliate Partnerships",d:"Curated affiliate networks with proven player acquisition in Europe and LATAM, onboarded, tracked, and managed."},{icon:"◐",t:"Campaign Production & Delivery",d:"Brief to broadcast: content guidelines, compliance review, performance tracking, and post-campaign reports."},{icon:"◑",t:"Contracting & Compliance",d:"KYC-aware onboarding flows and regulatory-conscious contracts, coordinated with qualified legal counsel."}];
  const FAQS=[{q:"What markets do you operate in?",a:"Primary focus on Europe (Western + Eastern) and LATAM, with North American talent available for select operators."},{q:"How are commercial deals structured?",a:"We work across CPA, Revenue Share, Hybrid, and flat-fee per stream/post, benchmarked against live market rates."},{q:"What does your talent vetting look like?",a:"We assess audience quality, geo alignment, past brand performance, compliance history, and viewership consistency."},{q:"How long does onboarding take?",a:"From initial operator brief to first content delivery: typically 2–4 weeks depending on deal complexity."},{q:"Do you manage contracts?",a:"We facilitate preparation and review with qualified legal partners. All onboarding includes KYC checkpoints."},{q:"Is exclusivity required?",a:"Not by default. Exclusivity is discussed and priced separately where an operator requires it."}];
  return(
    <GenericPage badge="Services" title="End-to-end. No handoffs. No gaps." subtitle="We don't hand you a list of emails and call it sourcing. Every engagement is managed from brief through delivery.">
      <section style={{padding:"0 28px 80px"}}>
        <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gap:1,background:T.border}}>
          {SVCS.map((s,i)=>(
            <Reveal key={i} delay={i*.06}>
              <div style={{background:T.bg,padding:"48px 56px",display:"grid",gridTemplateColumns:"72px 1fr",gap:40,alignItems:"start"}}>
                <div><div style={{fontSize:26,color:T.gold,marginBottom:12}}>{s.icon}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:40,color:`${T.gold}20`}}>{String(i+1).padStart(2,"0")}</div></div>
                <div><h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(20px,2.5vw,30px)",color:T.text,marginBottom:14,fontWeight:400}}>{s.t}</h3><p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.textMid,lineHeight:1.9,maxWidth:640}}>{s.d}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section style={{padding:"72px 28px 100px",background:T.surface,borderTop:`1px solid ${T.border}`}}>
        <div style={{maxWidth:780,margin:"0 auto"}}>
          <Reveal><div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.gold,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:12}}>FAQ</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(28px,4vw,48px)",fontWeight:300,color:T.text,marginBottom:48}}>Common Questions</h2></Reveal>
          {FAQS.map((f,i)=>(
            <div key={i} style={{borderBottom:`1px solid ${T.border}`}}>
              <div onClick={()=>setOpen(open===i?null:i)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 0",cursor:"pointer"}}>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:15,color:T.text,fontWeight:500,paddingRight:24}}>{f.q}</span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:20,color:T.gold,transform:open===i?"rotate(45deg)":"none",transition:"transform .25s",flexShrink:0}}>+</span>
              </div>
              <div style={{maxHeight:open===i?"250px":"0",overflow:"hidden",transition:"max-height .4s cubic-bezier(.4,0,.2,1)"}}><p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.textMid,lineHeight:1.85,paddingBottom:20}}>{f.a}</p></div>
            </div>
          ))}
        </div>
      </section>
    </GenericPage>
  );
}

function CasesPage(){
  const CASES=[{tag:"Streaming",t:"Kick Streamer Rollout — Western Europe",obj:"Activate 6 mid-tier Kick streamers across Spain, Germany, and Portugal under a single CPA deal.",del:"Deal structuring, talent briefing, compliance review, performance dashboard.",tl:"3 weeks from brief to live",kpi:"Player acquisition, viewer retention, CPA by talent"},{tag:"Sports Ambassador",t:"Football Athlete — LATAM",obj:"Leverage a professional footballer's social audience for casino brand awareness in Brazil and Argentina.",del:"Ambassador agreement, content calendar, Instagram + TikTok, FTC disclosures.",tl:"6-week campaign",kpi:"Reach, link-in-bio conversion, brand uplift"},{tag:"Affiliate",t:"Affiliate Ramp — Eastern Europe",obj:"Build a sustainable affiliate distribution network across Czech Republic, Serbia, and Hungary.",del:"Partner identification, onboarding docs, RevShare negotiation, monthly reporting.",tl:"Ongoing engagement",kpi:"Monthly active players, retention, RevShare vs. projections"},{tag:"Multi-Channel",t:"Cross-Platform Influencer Campaign",obj:"Simultaneous Twitch + Instagram + TikTok activation for a new market launch.",del:"Unified brief, platform-specific guidelines, compliance checks, consolidated reporting.",tl:"4-week sprint",kpi:"Combined reach, UTM-tracked signups, CPA by channel"}];
  return(
    <GenericPage badge="Case Studies & Playbooks" title="Execution blueprints from live campaigns" subtitle="Structured playbooks for common iGaming partnership scenarios.">
      <section style={{padding:"0 28px 100px"}}>
        <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:1,background:T.border}} className="g2">
          {CASES.map((c,i)=>(
            <Reveal key={i} delay={i*.1}>
              <div className="ch" style={{background:T.bg,padding:"44px",border:"1px solid transparent"}}><Badge style={{marginBottom:16}}>{c.tag}</Badge>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(18px,2vw,26px)",color:T.text,margin:"14px 0 18px",fontWeight:400}}>{c.t}</h3>
              {[{l:"Objective",v:c.obj},{l:"Deliverables",v:c.del},{l:"Timeline",v:c.tl},{l:"Measurement",v:c.kpi}].map(row=>(
                <div key={row.l} style={{display:"grid",gridTemplateColumns:"90px 1fr",gap:10,marginBottom:12}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:T.gold,letterSpacing:"0.1em",textTransform:"uppercase",paddingTop:2}}>{row.l}</span><span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:13,color:T.textMid,lineHeight:1.6}}>{row.v}</span></div>
              ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </GenericPage>
  );
}

function LegalPage(){
  return(
    <div style={{paddingTop:68}}>
      <section style={{padding:"96px 28px",maxWidth:820,margin:"0 auto"}}>
        <Reveal><Badge>Legal</Badge><h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(32px,5vw,52px)",fontWeight:300,color:T.text,margin:"28px 0 48px"}}>Disclaimer & Privacy</h1></Reveal>
        {[{t:"General Disclaimer",b:"The information on this website is for general informational purposes only. TiGah does not guarantee any specific commercial results, player acquisition figures, or campaign outcomes."},{t:"No Legal or Financial Advice",b:"Nothing on this site constitutes legal, financial, or regulatory advice. Operators and talent should seek independent legal advice appropriate to their jurisdiction."},{t:"iGaming & Regulatory Notice",b:"TiGah does not operate any gambling platform and holds no gambling license. All operators are responsible for maintaining their own regulatory compliance."},{t:"Privacy Policy",b:"Information submitted via our forms is used solely to assess partnership fit. We do not sell or share personal data. Contact privacy@tigah.io for data deletion requests."}].map((s,i)=>(
          <Reveal key={i} delay={i*.08}>
            <div style={{marginBottom:44}}><h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,color:T.gold,marginBottom:14}}>{s.t}</h3><p style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,color:T.textMid,lineHeight:1.95}}>{s.b}</p>{i<3&&<Divider style={{marginTop:36}}/>}</div>
          </Reveal>
        ))}
      </section>
    </div>
  );
}

// ─── PAGE TRANSITION ──────────────────────────────────────────────────────────
function PageTransition({children,pgKey}){
  const[display,setDisplay]=useState(children);const[fade,setFade]=useState(true);
  useEffect(()=>{setFade(false);const t=setTimeout(()=>{setDisplay(children);setFade(true);},180);return()=>clearTimeout(t);},[pgKey]);
  return<div style={{opacity:fade?1:0,transform:fade?"translateY(0)":"translateY(8px)",transition:"opacity .22s ease,transform .28s ease"}}>{display}</div>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App(){
  const[page,setPage]=useState("home");
  const[adminMode,setAdminMode]=useState(false);
  const[adminLoggedIn,setAdminLoggedIn]=useState(false);
  const[talent,setTalent]=useState(DEFAULT_TALENT);
  const[content,setContent]=useState(DEFAULT_CONTENT);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{injectGlobals();},[]);

  // Load from persistent storage
  useEffect(()=>{
    (async()=>{
      try{
        const td=await window.storage.get("tigah-talent");
        if(td) setTalent(JSON.parse(td.value));
        const cd=await window.storage.get("tigah-content");
        if(cd) setContent(JSON.parse(cd.value));
      }catch(e){}
      setLoading(false);
    })();
  },[]);

  const saveTalent=async(newTalent)=>{
    setTalent(newTalent);
    try{await window.storage.set("tigah-talent",JSON.stringify(newTalent));}catch(e){}
  };
  const saveContent=async(newContent)=>{
    setContent(newContent);
    try{await window.storage.set("tigah-content",JSON.stringify(newContent));}catch(e){}
  };

  useEffect(()=>{if(!adminMode)window.scrollTo({top:0,behavior:"instant"});},[page]);

  // Secret admin access: go to page "admin" 
  useEffect(()=>{
    if(page==="admin"){setAdminMode(true);setPage("home");}
  },[page]);

  if(loading) return<div style={{minHeight:"100vh",background:T.bg,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,color:T.gold,animation:"shimmer 1.5s infinite"}}>TiGah</div></div>;

  if(adminMode){
    if(!adminLoggedIn) return<AdminLogin onLogin={()=>setAdminLoggedIn(true)}/>;
    return<AdminPanel talent={talent} content={content} onTalentChange={saveTalent} onContentChange={saveContent} onLogout={()=>{setAdminLoggedIn(false);setAdminMode(false);}} setPage={p=>{setAdminMode(false);setPage(p);}}/>;
  }

  const PAGES={
    home:      <HomePage setPage={setPage} talent={talent} content={content}/>,
    operators: <OperatorsPage setPage={setPage} content={content}/>,
    talent:    <TalentPage content={content}/>,
    services:  <ServicesPage setPage={setPage}/>,
    roster:    <RosterPage setPage={setPage} talent={talent}/>,
    cases:     <CasesPage/>,
    about:     <AboutPage setPage={setPage} content={content}/>,
    contact:   <ContactPage setPage={setPage} content={content}/>,
    legal:     <LegalPage/>,
  };

  return(
    <div style={{background:T.bg,color:T.text,minHeight:"100vh",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <Nav page={page} setPage={setPage}/>
      <PageTransition pgKey={page}>{PAGES[page]||PAGES.home}</PageTransition>
      <Footer setPage={setPage} content={content}/>
      {/* Hidden admin trigger */}
      <div onClick={()=>{setAdminMode(true);}} style={{position:"fixed",bottom:0,right:0,width:40,height:40,cursor:"default",zIndex:9999,opacity:0}}/>
    </div>
  );
}
