// Theme toggle
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
if(savedTheme === 'light'){ root.classList.add('light'); themeBtn.textContent = '🌙'; } else { themeBtn.textContent = '☀️'; }
themeBtn.addEventListener('click', ()=>{
  root.classList.toggle('light');
  const isLight = root.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeBtn.textContent = isLight ? '🌙' : '☀️';
});

// i18n
const dict = {
  ru:{
    title:"Классическая 2048 в современном стиле",
    subtitle:"Свайпай плитки, соединяй числа и достигай легендарной 2048. Без рекламы. Бесплатно. Оффлайн.",
    btn_download:"Скачать APK",
    btn_gp:"Google Play",
    btn_apkp:"APKPure",
    features_title:"Особенности",
    f_design:"Современный дизайн: светлая/тёмная тема",
    f_perf:"Плавные анимации и отзывчивое управление",
    f_offline:"Работает офлайн (PWA + Service Worker)",
    f_free:"Без рекламы и абсолютно бесплатно",
    shots_title:"Скриншоты",
    how_title:"Как играть",
    how_1:"Свайпай вверх/вниз/влево/вправо.",
    how_2:"Соединяй одинаковые числа, чтобы получить новые.",
    how_3:"Достигни плитки 2048 — и ставь рекорды!",
    links_terms:"Условия",
    links_privacy:"Конфиденциальность",
    modal_title:"Скоро будет доступно!",
    modal_note:"Мы уже работаем над публикацией 🧡",
    close:"Понятно"
  },
  en:{
    title:"Classic 2048 — modern look",
    subtitle:"Swipe tiles, merge numbers and reach the legendary 2048. No ads. Free. Offline.",
    btn_download:"Download APK",
    btn_gp:"Google Play",
    btn_apkp:"APKPure",
    features_title:"Features",
    f_design:"Modern design: light & dark themes",
    f_perf:"Smooth animations & responsive controls",
    f_offline:"Works offline (PWA + Service Worker)",
    f_free:"No ads, totally free",
    shots_title:"Screenshots",
    how_title:"How to play",
    how_1:"Swipe up/down/left/right.",
    how_2:"Merge equal numbers to get new tiles.",
    how_3:"Reach 2048 and set new records!",
    links_terms:"Terms",
    links_privacy:"Privacy",
    modal_title:"Coming soon!",
    modal_note:"We are working on the release 🧡",
    close:"Got it"
  }
};
let currentLang = localStorage.getItem('lang') || 'ru';
function applyLang(l){
  currentLang = l; localStorage.setItem('lang', l);
  document.querySelectorAll('[data-t]').forEach(el=>{
    const key = el.getAttribute('data-t');
    if(dict[l][key]) el.textContent = dict[l][key];
  });
}
applyLang(currentLang);
document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>applyLang(btn.dataset.lang)));

// Modal
const modal = document.getElementById('soonModal');
document.querySelectorAll('[data-open-modal]').forEach(btn=>btn.addEventListener('click', ()=>{
  if(typeof modal.showModal === 'function'){ modal.showModal(); } else { modal.style.display='block'; }
}));
document.querySelectorAll('[data-close-modal]').forEach(btn=>btn.addEventListener('click', ()=>{
  if(typeof modal.close === 'function'){ modal.close(); } else { modal.style.display='none'; }
}));
modal?.addEventListener('click', (e)=>{ if(e.target === modal){ modal.close?.(); modal.style.display='none'; } });

// Click counter (CountAPI). Replace namespace/key to yours if needed.
const stat = document.getElementById('clicksStat');
const apkBtn = document.getElementById('btnApk');
async function updateCounter(){
  try{
    const ns = '2048pro.site'; const key='apk';
    const r = await fetch(`https://api.countapi.xyz/get/${ns}/${key}`);
    const j = await r.json(); stat.textContent = j.value ?? 0;
  }catch{}
}
updateCounter();
apkBtn?.addEventListener('click', async ()=>{
  try{
    const ns='2048pro.site'; const key='apk';
    await fetch(`https://api.countapi.xyz/hit/${ns}/${key}`);
    updateCounter();
  }catch{}
});

// PWA SW register
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('/sw.js').catch(()=>{});
  });
}
