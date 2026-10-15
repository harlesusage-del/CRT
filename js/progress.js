/* ===== State ===== */
const KEY='candlecraft-v1';
let S,store=true;
const def=()=>({version:1,xpLog:[],completed:[],mastered:[],attempts:[],best:{},ach:[],weak:{},prefs:{anim:true}});
try{localStorage.setItem('_t','1');localStorage.removeItem('_t')}catch(e){store=false}
function load(){try{const d=JSON.parse(localStorage.getItem(KEY));if(d&&d.version===1&&Array.isArray(d.xpLog)&&Array.isArray(d.completed)&&d.weak&&d.best&&d.prefs)return d}catch(e){}return def()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){store=false}if(typeof cloudQueue=='function')cloudQueue()}
S=load();
const xpT=()=>S.xpLog.reduce((a,x)=>a+x[1],0);
function xp(id,n){if(S.xpLog.some(x=>x[0]===id))return 0;S.xpLog.push([id,n]);save();if(typeof toast=='function')toast('+'+n+' XP');return n}
function ach(k){if(!S.ach.includes(k)){S.ach.push(k);save()}}
const wk=v=>Object.entries(S.weak).filter(([k,w])=>!w.done&&(v==null||parseInt(MIN[k][1])==v));
/* ===== Level 0-2: versi umum (menimpa fungsi level-1 di atas) ===== */
function lvStatus(l){if(S.mastered.includes(l.id))return'M';if(!l.ready||(l.id>1&&!S.mastered.includes(l.id-1)))return'L';return LL(l.id).some(x=>S.completed.includes(x.id))||S.attempts.some(a=>a.lv==l.id)?'P':'A'}
function lockWhy(l){if(!l.ready)return'Materi level ini belum dibuat pada versi ini. Saat ini hanya Level 0 sampai 8 yang tersedia.';return'Level ini terkunci. Selesaikan '+LV[l.id-1].t+' terlebih dahulu.'}
function tryMaster(v){if(S.mastered.includes(v))return'';const ok=LL(v).every(l=>S.completed.includes(l.id))&&(S.best[v]||0)>=CFG.pass&&!wk(v).length&&(v!=8||btOk());if(!ok)return v==8&&LL(v).every(l=>S.completed.includes(l.id))&&(S.best[v]||0)>=CFG.pass&&!wk(v).length?'Asesmen Level 8 lulus, tetapi level ini baru dikuasai setelah Backtest Lab diselesaikan dengan minimal 5 dari 6 analisis sesuai model.':'';S.mastered.push(v);xp('lvl:'+v,50);ach('reader');if(v==7)ach('crt');if(v==3)ach('sd');if(v==5)ach('ls');if(v==8)ach('analyst');if(S.attempts.filter(a=>a.lv==v).length==1)ach('fm');save();return'Level '+v+' dikuasai. +50 XP.'+(v==8?' Seluruh kurikulum selesai. Ini tidak berarti Anda siap trading uang sungguhan.':' Level berikutnya terbuka.')}
