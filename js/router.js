/* ===== Router ===== */
const NAV=[['dash','Dashboard'],['road','Learning Roadmap'],['learn','Learn'],['lab','Chart Lab'],['market','Market Lab'],['practice','Practice Room'],['weak','Weak Areas'],['backtest','Backtest Lab'],['report','Progress Report'],['achv','Achievements'],['account','Akun'],['settings','Settings']],R={dash,road,learn,lab,practice,weak,settings,backtest,report,achv,account,market};
function route(){const[,p,a]=location.hash.split('/');let k=R[p]?p:'dash';if(CC.REQUIRE_LOGIN&&cloudOn()&&!cu&&k!='account')k='account';tip.style.display='none';clearInterval(window.mlT);{const nv=NAV.find(z=>z[0]==k);document.title=(nv?nv[1]+' | ':'')+'CandleCraft Academy'}if(k!='practice')ps=null;
document.getElementById('nav').innerHTML='<h2>CandleCraft Academy</h2><small>XP '+xpT()+(cloudOn()?' | '+(cu?cst:'tamu'):'')+'</small>'+NAV.map(([h,t])=>'<a href="#/'+h+'" class="'+(h==k?'on':'')+'"'+(h==k?' aria-current="page"':'')+'>'+t+'</a>').join('');
try{R[k](a)}catch(e){M.innerHTML='<h1>Terjadi kesalahan</h1><p>Halaman tidak dapat ditampilkan. Kembali ke dashboard.</p><a class="btn pri" href="#/dash">Dashboard</a>'}
if(innerWidth<=800)document.body.classList.add('hide');M.scrollTop=0;M.classList.remove('pg');void M.offsetWidth;M.classList.add('pg')}
document.getElementById('mb').onclick=()=>document.body.classList.toggle('hide');
document.body.classList.toggle('noanim',!S.prefs.anim);document.body.classList.toggle('light',S.prefs.theme=='light');
if(innerWidth>800)document.body.classList.remove('hide');
addEventListener('hashchange',route);cloudInit();
route();
