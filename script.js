const works = {
  primordial: {title:'Primordial Reflection',type:'Immersive theatre experiment',date:'July 2024',place:'Trinity Laban, Laban Building',role:'Immersive theatre experiment',video:'JTXU-ozrgb4',description:'Performance documentation of an immersive theatre experiment presented at Trinity Laban.'},
  beauty: {title:'Am I beauty?',type:'Contemporary dance solo',date:'September 2021',place:'Nanchang, China',role:'Choreography & performance',video:'E1T3ArEeDKA',description:'A contemporary dance solo choreographed and performed by Ziyi Liu.'},
  comfort: {title:'Comfort',type:'Contemporary dance trio',date:'September 2022',place:'Nanchang, China',role:'Choreography',video:'l6XSOm8L4QE',description:'A contemporary dance trio choreographed by Ziyi Liu.'},
  hidden: {title:'Love cannot be hidden',type:'Contemporary dance solo',date:'July 2025',place:'Nanchang, China',role:'Choreography',description:'A contemporary dance solo choreographed by Ziyi Liu.'},
  resplendent: {title:'Resplendent',type:'Contemporary dance solo',date:'October 2024',place:'Nanchang, China',role:'Choreography',description:'A contemporary dance solo choreographed by Ziyi Liu.'},
  singer: {title:'Singer',type:'Dance film',date:'June 2024',place:'Royal Central School of Speech and Drama',role:'Choreography & performance',description:'A dance film featuring choreography and performance by Ziyi Liu.'},
  love: {title:'Love',type:'Semi-immersive theatre',date:'March 2024',place:'Trinity Laban, Bonnie Bird Theatre',role:'Choreography',description:'A semi-immersive theatre work presented at Trinity Laban’s Bonnie Bird Theatre.'}
};
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const navDialog = document.querySelector('#site-menu');
const hero = document.querySelector('.reference-hero');
const dialog = document.querySelector('#work-dialog');
const dialogContent = document.querySelector('#dialog-content');
function updateHeader(){header.classList.toggle('scrolled', !hero || window.scrollY >= hero.offsetHeight - 90);}
updateHeader();
window.addEventListener('scroll',updateHeader,{passive:true});
window.addEventListener('resize',updateHeader);
menuButton.addEventListener('click',()=>{navDialog.showModal();menuButton.setAttribute('aria-expanded','true');document.body.classList.add('locked');});
document.querySelector('.nav-close').addEventListener('click',()=>navDialog.close());
navDialog.addEventListener('close',()=>{menuButton.setAttribute('aria-expanded','false');document.body.classList.remove('locked');});
navDialog.addEventListener('click',event=>{if(event.target===navDialog){const rect=navDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right)navDialog.close();}});
const currentPage=location.pathname.split('/').pop()||'index.html';
navDialog.querySelectorAll('a').forEach(link=>{if(link.getAttribute('href').split('#')[0]===currentPage&&!link.hash)link.setAttribute('aria-current','page');link.addEventListener('click',()=>navDialog.close());});
navDialog.querySelectorAll('.nav-group-heading button').forEach(button=>button.addEventListener('click',()=>{
  const panel=document.getElementById(button.getAttribute('aria-controls'));
  const opening=panel.hidden;panel.hidden=!opening;button.setAttribute('aria-expanded',String(opening));button.textContent=opening?'−':'+';
}));
let lastWorkButton;
document.querySelectorAll('[data-work]').forEach(button=>button.addEventListener('click',()=>{
  const work=works[button.dataset.work]; if(!work)return;
  lastWorkButton=button;
  const media=work.video?`<div class="dialog-media"><iframe src="https://www.youtube-nocookie.com/embed/${work.video}?rel=0" title="${work.title} — performance documentation" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`:'';
  const watch=work.video?`<a class="text-link" href="https://www.youtube.com/watch?v=${work.video}" target="_blank" rel="noopener">Watch on YouTube</a>`:'';
  dialogContent.innerHTML=`${media}<div class="dialog-copy ${work.video?'':'dialog-text-only'}"><p class="eyebrow">${work.type}</p><h2 id="dialog-title">${work.title}</h2><div class="dialog-meta"><span>${work.date}</span><span>${work.role}</span></div><p>${work.description}</p><p class="dialog-note">${work.place}</p><div class="dialog-actions">${watch}<a class="text-link" href="mailto:LizLiuuuu@outlook.com?subject=${encodeURIComponent('Enquiry: '+work.title)}">Enquire about this work</a></div></div>`;
  dialog.showModal(); document.body.classList.add('locked');
}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{dialogContent.innerHTML='';document.body.classList.remove('locked');lastWorkButton?.focus();});
document.querySelector('#year').textContent=new Date().getFullYear();

function openDeepLink(){
  const key=decodeURIComponent(location.hash.slice(1));
  if(!key)return;
  if(works[key]){const button=document.querySelector('[data-work="'+key+'"]');if(button&&!dialog.open)button.click();}
  const target=document.getElementById(key);
  if(target instanceof HTMLDetailsElement){target.open=true;target.scrollIntoView({block:'start'});}
}
window.addEventListener('hashchange',openDeepLink);
openDeepLink();
