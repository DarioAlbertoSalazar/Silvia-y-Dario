/* ====== Edita aquí los nombres ====== */
const BODA = {
  novia: "Silvia",
  novio: "Dario",
  fecha: "2027-09-25T17:30:00-06:00" // hora del centro de México
};

document.documentElement.classList.add("js");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Nombres e iniciales
document.querySelectorAll('[data-k="novia"]').forEach(e=>e.textContent=BODA.novia);
document.querySelectorAll('[data-k="novio"]').forEach(e=>e.textContent=BODA.novio);
document.querySelector('[data-k="ini1"]').textContent=BODA.novia[0];
document.querySelector('[data-k="ini2"]').textContent=BODA.novio[0];

// Marquee
const mq=document.getElementById("marquee");
const unit=`<span>${BODA.novia} &amp; ${BODA.novio}</span><span>25 de septiembre de 2027</span><span>Parroquia San José del Barrial</span><span>Chalet Barrial</span>`;
mq.innerHTML=unit.repeat(4);

// Countdown
const target=new Date(BODA.fecha).getTime();
const els={d:document.getElementById("cd-d"),h:document.getElementById("cd-h"),m:document.getElementById("cd-m"),s:document.getElementById("cd-s")};
const prev={};
function setVal(k,v){
  if(prev[k]===v) return; prev[k]=v;
  const el=els[k]; el.textContent=v;
  if(!reduce){el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick");}
}
function tick(){
  let diff=target-Date.now();
  if(diff<=0){
    document.getElementById("countdown").innerHTML='<p class="cd-done" style="grid-column:1/-1">¡Hoy es el gran día!</p>';
    return clearInterval(timer);
  }
  const d=Math.floor(diff/864e5); diff%=864e5;
  const h=Math.floor(diff/36e5); diff%=36e5;
  const m=Math.floor(diff/6e4);
  const s=Math.floor((diff%6e4)/1e3);
  setVal("d",String(d)); setVal("h",String(h).padStart(2,"0"));
  setVal("m",String(m).padStart(2,"0")); setVal("s",String(s).padStart(2,"0"));
}
const timer=setInterval(tick,1000); tick();

// Reveal en ambos sentidos: entra al bajar y al subir, se oculta al salir
const io=new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    const el=en.target;
    if(en.isIntersecting){ el.classList.add("in"); el.classList.remove("above"); }
    else{
      el.classList.remove("in");
      el.classList.toggle("above", en.boundingClientRect.top<0);
    }
  });
},{threshold:.15, rootMargin:"0px 0px -6% 0px"});
document.querySelectorAll(".rv").forEach(el=>io.observe(el));

// Frase palabra por palabra
const verse=document.getElementById("verse");
const sign=verse.querySelector(".verse-sign");
const words=verse.firstChild.textContent.trim().split(/\s+/);
verse.firstChild.remove();
words.forEach((w,i)=>{const s=document.createElement("span"); s.className="w"; s.textContent=w+(i<words.length-1?" ":""); verse.insertBefore(s,sign);});
const wordEls=[...verse.querySelectorAll(".w")];

// Efectos ligados al scroll
const bar=document.getElementById("bar"), rail=document.getElementById("rail"),
      tl=document.getElementById("timeline"), dressBig=document.getElementById("dressBig");
let lastY=scrollY, mqX=0, mqVel=-0.5, ticking=false;
function onScroll(){
  const y=scrollY, vh=innerHeight;
  const max=document.documentElement.scrollHeight-vh;
  bar.style.transform=`scaleX(${max>0?y/max:0})`;

  // Velocidad del marquee sigue la dirección del scroll
  const dy=y-lastY; lastY=y;
  mqVel=Math.max(-8,Math.min(8,mqVel-dy*0.08));

  // Frase
  const r=verse.getBoundingClientRect();
  const p=Math.min(1,Math.max(0,(vh*0.85-r.top)/(r.height+vh*0.45)));
  const n=Math.round(p*wordEls.length);
  wordEls.forEach((w,i)=>w.classList.toggle("on",i<n || reduce));

  // Línea de tiempo
  const t=tl.getBoundingClientRect();
  const tp=Math.min(1,Math.max(0,(vh*0.6-t.top)/t.height));
  rail.style.transform=`scaleY(${tp})`;

  // Parallax de la palabra "Formal"
  if(!reduce && dressBig){
    const d=dressBig.getBoundingClientRect();
    const off=(d.top+d.height/2-vh/2)*-0.18;
    dressBig.style.transform=`translateX(${off}px)`;
  }
  ticking=false;
}
addEventListener("scroll",()=>{ if(!ticking){ticking=true; requestAnimationFrame(onScroll);} },{passive:true});
addEventListener("resize",onScroll); onScroll();

// Bucle del marquee
(function loop(){
  if(!reduce){
    const base=mqVel>0?0.5:-0.5;
    mqVel+= (base-mqVel)*0.04;
    mqX+=mqVel;
    const half=mq.scrollWidth/2;
    if(mqX<=-half) mqX+=half;
    if(mqX>0) mqX-=half;
    mq.style.transform=`translateX(${mqX}px)`;
  }
  requestAnimationFrame(loop);
})();

// Pétalos dorados flotantes en el hero
(function petals(){
  const c=document.getElementById("petals"); if(reduce||!c.getContext) return;
  const ctx=c.getContext("2d"); let W,H,dpr, items=[];
  const gold=()=>getComputedStyle(document.documentElement).getPropertyValue("--gold").trim()||"#9C7F45";
  let color=gold();
  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change",()=>color=gold());
  new MutationObserver(()=>color=gold()).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});
  function size(){
    dpr=Math.min(2,devicePixelRatio||1);
    W=c.clientWidth; H=c.clientHeight; c.width=W*dpr; c.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    const count=Math.round(Math.min(46,W/22));
    items=Array.from({length:count},()=>mk(true));
  }
  function mk(any){return{x:Math.random()*W,y:any?Math.random()*H:-20,r:2+Math.random()*5,vy:.2+Math.random()*.5,vx:(Math.random()-.5)*.3,a:Math.random()*Math.PI*2,va:(Math.random()-.5)*.02,o:.15+Math.random()*.45,ph:Math.random()*6}}
  let visible=true;
  new IntersectionObserver(e=>visible=e[0].isIntersecting).observe(c);
  function draw(ts){
    if(visible){
      ctx.clearRect(0,0,W,H); ctx.fillStyle=color;
      const sy=scrollY*0.15;
      items.forEach(p=>{
        p.y+=p.vy; p.x+=p.vx+Math.sin(ts/1600+p.ph)*.25; p.a+=p.va;
        if(p.y>H+20){Object.assign(p,mk(false));}
        ctx.save(); ctx.globalAlpha=p.o; ctx.translate(p.x,p.y-sy*(p.r/7)); ctx.rotate(p.a);
        ctx.beginPath(); ctx.ellipse(0,0,p.r,p.r*.45,0,0,Math.PI*2); ctx.fill(); ctx.restore();
      });
    }
    requestAnimationFrame(draw);
  }
  size(); addEventListener("resize",size); requestAnimationFrame(draw);
})();
