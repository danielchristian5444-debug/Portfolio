/* Applies the saved light/dark theme and adds a toggle on standalone project pages */
(function(){var r=document.documentElement,t;try{t=localStorage.theme}catch(e){}r.dataset.theme=t||'dark';
addEventListener('message',function(e){if(e.data&&e.data.theme)r.dataset.theme=e.data.theme});
if(top!==self)return;
addEventListener('DOMContentLoaded',function(){var h=document.querySelector('.top'),b=document.createElement('button');if(!h)return;
b.className='tg';b.type='button';b.setAttribute('aria-label','Switch between light and dark mode');
b.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg>';
b.onclick=function(){var n=r.dataset.theme=='dark'?'light':'dark';r.dataset.theme=n;try{localStorage.theme=n}catch(e){}};h.appendChild(b)})})();
