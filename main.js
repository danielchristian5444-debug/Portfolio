/* Edit these lists to update the site */
const SKILLS=[['Python',5,'Most fluent'],['JavaScript',3,'Comfortable'],['HTML',4,'Comfortable'],['CSS',4,'Comfortable'],['OOP',3,'Basic'],['React',2,'Basic'],['SQL / PostgreSQL',2,'Basic'],['GitHub',2,'Basic'],['Supabase',2,'A bit']];
const PROJECTS=[
{n:'Weather App',m:'WA',u:'weather.html',d:'Search any city for live conditions and a 5-day outlook.',t:'JavaScript, CSS, Open-Meteo API'},
{n:'Nova Chatbot',m:'NV',u:'chatbot.html',d:'A virtual assistant that answers questions about me, with quick replies.',t:'JavaScript, CSS'},
{n:'School Management System',m:'SM',u:'school.html',d:'Register students, record scores and see class averages.',t:'JavaScript, CSS, local storage'},
{n:'Library Management System',m:'LM',u:'library.html',d:'Catalogue books, lend them to members and track returns.',t:'JavaScript, CSS, local storage'},
{n:'Task Tracker',m:'TT',u:'tasks.html',d:'Add, finish and filter daily tasks. Everything is saved in the browser.',t:'JavaScript, CSS, local storage'},
{n:'Grade Manager',m:'GM',u:'grades.html',d:'Enter subject scores and get an average and letter grade.',t:'JavaScript, CSS, local storage'}];
const $=id=>document.getElementById(id),root=document.documentElement;

/* loading screen: stays at least 2.4s, then fades */
const t0=performance.now(),hide=()=>{const b=$('boot');if(!b)return;b.classList.add('off');setTimeout(()=>b.remove(),600)};
addEventListener('load',()=>setTimeout(hide,Math.max(0,2400-(performance.now()-t0))));setTimeout(hide,5000);

/* light / dark toggle */
const sync=()=>{const w=$('fr').contentWindow;if(w)w.postMessage({theme:root.dataset.theme},'*')};
$('theme').onclick=()=>{const t=root.dataset.theme=='dark'?'light':'dark';root.dataset.theme=t;try{localStorage.theme=t}catch(e){}sync()};

/* skills */
$('skillList').innerHTML=SKILLS.map(([n,l,t])=>`<li><span>${n}</span><span class="dots" aria-hidden="true">${[1,2,3,4,5].map(k=>`<i class="${k<=l?'on':''}"></i>`).join('')}</span><em>${t}</em></li>`).join('');

/* live demo + live code workbench */
const SRC=window.SRC||{};let tm,cur=0,sx=0,moved=false;
const pid=p=>p.u.replace('.html','');
const fix=s=>s.replace('<a href="index.html#projects">Back to portfolio</a>','<span>Live demo</span>').replace(/\.\.\/\.\.\//g,'');
const run=()=>{$('fr').srcdoc=fix($('ed').value)};
function load(){const p=PROJECTS[cur];$('wbT').textContent=p.n;$('ed').value=SRC[pid(p)]||'';run()}
function tab(t){$('wb').dataset.tab=t;$('tDemo').setAttribute('aria-selected',t=='demo');$('tCode').setAttribute('aria-selected',t=='code')}
function openWb(t){if($('wb').hidden){$('wb').hidden=false;load()}tab(t);$('wb').scrollIntoView({behavior:'smooth',block:'start'})}
$('bDemo').onclick=()=>openWb('demo');$('bCode').onclick=()=>openWb('code');
$('tDemo').onclick=()=>tab('demo');$('tCode').onclick=()=>tab('code');
$('wbReset').onclick=load;$('wbClose').onclick=()=>{$('wb').hidden=true;$('fr').srcdoc=''};
$('wbCopy').onclick=async e=>{const b=e.currentTarget;try{await navigator.clipboard.writeText($('ed').value)}catch(x){$('ed').select();document.execCommand('copy')}b.textContent='Copied';setTimeout(()=>b.textContent='Copy code',1400)};
$('ed').oninput=()=>{clearTimeout(tm);tm=setTimeout(run,600)};
$('ed').onkeydown=e=>{if(e.key=='Tab'){e.preventDefault();const t=e.target,s=t.selectionStart;t.setRangeText('  ',s,t.selectionEnd,'end')}};
$('fr').onload=sync;

/* carousel */
const st=$('stage');
st.onpointerdown=e=>{sx=e.clientX;moved=false};st.onpointerup=e=>{if(Math.abs(e.clientX-sx)>40){moved=true;go(cur+(e.clientX<sx?1:-1))}};
PROJECTS.forEach((p,k)=>{const b=document.createElement('button');b.className='card';b.innerHTML=`<b>${p.m}</b><span>${p.n}</span>`;b.onclick=()=>{if(moved){moved=false;return}go(k)};st.append(b)});
function go(n){cur=(n+PROJECTS.length)%PROJECTS.length;const w=st.children[0].offsetWidth*1.12;
 [...st.children].forEach((c,k)=>{const o=k-cur,far=Math.abs(o)>1;c.style.transform=`translateX(calc(-50% + ${o*w}px)) scale(${o?.78:1})`;c.style.opacity=far?0:o?.5:1;c.style.pointerEvents=far?'none':'auto';c.setAttribute('aria-current',o===0)});
 const p=PROJECTS[cur];$('pName').textContent=p.n;$('pDesc').textContent=p.d;$('pTags').textContent=p.t;$('pLink').href=p.u;if(!$('wb').hidden)load()}
$('prev').onclick=()=>go(cur-1);$('next').onclick=()=>go(cur+1);addEventListener('resize',()=>go(cur));go(0);

/* contact form */
$('cf').onsubmit=async e=>{e.preventDefault();const f=$('cf'),s=$('formStatus'),d=Object.fromEntries(new FormData(f));s.textContent='Sending...';
 try{const r=await fetch('https://formsubmit.co/ajax/danielchristian5444@gmail.com',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)});if(!r.ok)throw 0;s.textContent='Message sent. I will reply by e-mail.';f.reset()}
 catch{s.textContent='Opening your e-mail app instead.';location.href='mailto:danielchristian5444@gmail.com?subject='+encodeURIComponent('Portfolio message from '+d.name)+'&body='+encodeURIComponent(d.message+'\n\n'+d.email)}};
