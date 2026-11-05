/* Asiphileni Gold Mine — shared site script */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

/* Hero slider (home only) */
(function(){
  const slides=$$('.hero:not(.page-hero) .slide'),dots=$$('#dots button');
  if(slides.length<2)return;
  let cur=0,timer;
  function go(i){slides[cur].classList.remove('on');dots[cur]&&dots[cur].classList.remove('on');cur=i;slides[cur].classList.add('on');dots[cur]&&dots[cur].classList.add('on');clearInterval(timer);timer=setInterval(()=>go((cur+1)%slides.length),7000)}
  dots.forEach((d,i)=>d.onclick=()=>go(i));go(0);
})();

/* Why tabs (home only) */
(function(){
  const t=$('#whyText'),im=$('#whyImg');if(!t||!im)return;
  const why=[
    {img:'nugget',h:'Rich, Gold-Bearing Ground',p:'Asiphileni works the gold-bearing greenstone geology that has made Zimbabwe one of Africa’s great gold regions.',lead:'Careful exploration and resource modelling let us mine that ground efficiently and for the long term.'},
    {img:'surveyor',h:'Safety & Operational Excellence',p:'Every shift at Asiphileni starts and ends with safety. Our teams are trained, equipped and empowered to stop work whenever conditions are not right.',lead:'Disciplined processes, modern equipment and continuous improvement keep our people safe and our operation productive.'},
    {img:'engineer',h:'Skilled, Local People',p:'Our engineers, geologists, operators and artisans are the heart of the mine, and most of them come from the communities around us.',lead:'We invest in training and career growth, because a mine is only as strong as the people who run it.'}
  ];
  const src=n=>(window.IMG&&IMG[n])||('img/'+n+'.jpg');
  function setWhy(i){
    $$('.step').forEach((s,j)=>s.classList.toggle('on',i===j));
    const d=why[i];t.classList.remove('fade');void t.offsetWidth;t.classList.add('fade');
    t.innerHTML=`<p class="eyebrow">0${i+1} / 03</p><h3>${d.h}</h3><p>${d.p}</p><p class="lead">${d.lead}</p><a class="btn btn-gold" href="about.html" style="margin-top:12px">More About Us</a>`;
    im.style.opacity=0;setTimeout(()=>{im.src=src(d.img);im.onload=()=>im.style.opacity=1},250);
  }
  $$('.step').forEach(s=>s.onclick=()=>setWhy(+s.dataset.i));
  setWhy(1);why.forEach(d=>{const x=new Image();x.src=src(d.img)});
})();

/* Hover highlight groups */
function hoverGroup(sel){const items=$$(sel);items.forEach(it=>it.addEventListener('mouseenter',()=>{items.forEach(x=>x.classList.remove('on'));it.classList.add('on')}))}
hoverGroup('.svc');hoverGroup('.op');
$$('.svc[data-href]').forEach(s=>s.onclick=()=>location.href=s.dataset.href);

/* Reveal on scroll */
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach((el,i)=>{el.style.transitionDelay=(i%4)*90+'ms';rv.observe(el)});

/* Counters */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,end=+el.dataset.count,suf=el.dataset.suffix||'';io.unobserve(el);if(end===0){el.textContent='00';return}let n=0;const step=Math.max(1,Math.ceil(end/60));const tick=()=>{n=Math.min(end,n+step);el.textContent=n+suf;if(n<end)requestAnimationFrame(tick)};tick()}),{threshold:.6});
$$('[data-count]').forEach(el=>io.observe(el));

/* Site layout tooltips */
(function(){
  const tip=$('#tip'),map=$('#sitemap');if(!tip||!map)return;
  $$('.pin').forEach(p=>{
    p.addEventListener('mouseenter',()=>{tip.textContent=p.dataset.tip;tip.style.opacity=1});
    p.addEventListener('mousemove',e=>{const r=map.getBoundingClientRect();tip.style.left=(e.clientX-r.left+14)+'px';tip.style.top=(e.clientY-r.top+14)+'px'});
    p.addEventListener('mouseleave',()=>tip.style.opacity=0);
  });
})();

/* Enquiry modal */
const modal=$('#modal');
document.addEventListener('click',e=>{
  if(e.target.closest('[data-open-modal]')){e.preventDefault();$('#formView').style.display='';$('#okView').style.display='none';modal.classList.add('open')}
  if(e.target.closest('[data-close]')||e.target===modal)modal.classList.remove('open');
});
$('#enqForm')&&$('#enqForm').addEventListener('submit',e=>{e.preventDefault();e.target.reset();$('#formView').style.display='none';$('#okView').style.display=''});

/* Newsletter + contact form (demo) */
$('#subForm')&&$('#subForm').addEventListener('submit',e=>{e.preventDefault();e.target.reset();$('#subMsg').textContent='Thanks! (Demo: connect this to your mailing list.)'});
$('#contactForm')&&$('#contactForm').addEventListener('submit',e=>{e.preventDefault();e.target.reset();$('#formOk').style.display='block'});

/* Mobile menu */
$('.burger')&&($('.burger').onclick=()=>$('nav.main').classList.toggle('open'));

/* Gallery lightbox */
(function(){
  const figs=$$('.gallery figure');if(!figs.length)return;
  const lb=document.createElement('div');lb.className='lightbox';lb.innerHTML='<button aria-label="Close">×</button><img alt="">';document.body.appendChild(lb);
  figs.forEach(f=>f.onclick=()=>{lb.querySelector('img').src=f.querySelector('img').src;lb.classList.add('open')});
  lb.onclick=()=>lb.classList.remove('open');
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){lb.classList.remove('open');modal&&modal.classList.remove('open')}});
})();
