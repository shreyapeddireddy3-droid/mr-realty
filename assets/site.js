/* MR Realty — site behaviour (no frameworks) */
(function(){
  'use strict';
  var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
  var WA='918008464169';
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var yr=$('#yr'); if(yr) yr.textContent=String(new Date().getFullYear());

  /* mobile menu */
  var menu=$('.menu'), nav=$('#site-nav');
  function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');}
  menu.addEventListener('click',function(){var o=!nav.classList.contains('open');nav.classList.toggle('open',o);menu.setAttribute('aria-expanded',String(o));menu.setAttribute('aria-label',o?'Close menu':'Open menu');});
  $$('a',nav).forEach(function(a){a.addEventListener('click',closeMenu)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu();});

  function go(id){var el=document.getElementById(id);if(el)el.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});}
  function setSelect(sel,val){var s=$(sel);if(!s)return;[].some.call(s.options,function(o){if(o.text===val||o.value===val){s.value=o.value||o.text;return true}});}

  /* hero search → enquiry form */
  $('#find-form').addEventListener('submit',function(e){
    e.preventDefault();
    setSelect('#f-type',$('#find-type').value);
    setSelect('#f-budget',$('#find-budget').value);
    $('#f-loc').value=$('#find-area').value;
    resetOut('Your brief is ready below. Add your name, then prepare your WhatsApp message.');
    go('contact'); setTimeout(function(){$('#f-name').focus({preventScroll:true})},reduce?0:700);
  });

  /* area cards */
  var areaStatus=$('#area-status');
  $$('[data-area]').forEach(function(b){
    b.setAttribute('aria-pressed','false');
    b.addEventListener('click',function(){
      var v=b.getAttribute('data-area');
      setSelect('#find-area',v); $('#f-loc').value=v;
      $$('[data-area]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});
      areaStatus.textContent=v+' added to your brief. You can change the area at any time.';
    });
  });

  /* "Find my flat" style buttons */
  $$('[data-pick]').forEach(function(b){b.addEventListener('click',function(){setSelect('#f-type',b.getAttribute('data-pick'));setSelect('#find-type',b.getAttribute('data-pick'));resetOut();go('contact');});});

  /* tower: elevation drawing + active floor */
  var FL=[['G','Lobby'],['1','Residential flats'],['2','Villas'],['3','Commercial'],['4','Office spaces'],['5','Open plots']];
  var floors=$$('.floor'), groups=[];
  (function buildElevation(){
    var host=$('#elev'); if(!host) return;
    var NS='http://www.w3.org/2000/svg';
    function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
    function arch(g,x,y,w,h,cls){var r=w/2;el('path',{d:'M'+x+' '+(y+h)+' V'+(y+r)+' A'+r+' '+r+' 0 0 1 '+(x+w)+' '+(y+r)+' V'+(y+h)+' Z','class':cls||'win'},g);}
    var W=560,H=660,X0=150,TW=170,FH=74,GY=600;
    var svg=el('svg',{viewBox:'0 0 '+W+' '+H,role:'group','aria-label':'MR Realty tower floors'});
    var defs=el('defs',{},svg);
    var lg=el('linearGradient',{id:'elevGold',x1:0,y1:0,x2:0,y2:1},defs);el('stop',{offset:0,'stop-color':'#f3d68a'},lg);el('stop',{offset:1,'stop-color':'#b88a2c'},lg);
    var f=el('filter',{id:'elevGlow',x:'-20%',y:'-20%',width:'140%',height:'140%'},defs);el('feGaussianBlur',{stdDeviation:6,result:'b'},f);var m=el('feMerge',{},f);el('feMergeNode',{'in':'b'},m);el('feMergeNode',{'in':'SourceGraphic'},m);
    el('line',{x1:30,y1:GY,x2:W-30,y2:GY,'class':'ground'},svg);
    for(var t=40;t<W-30;t+=14)el('line',{x1:t,y1:GY+2,x2:t-8,y2:GY+10,'class':'hatch'},svg);
    var g0=el('g',{'class':'ef','data-i':0,tabindex:0,role:'button','aria-label':'Ground floor, Lobby'},svg);
    el('rect',{x:X0-22,y:GY-FH,width:TW+44,height:FH,'class':'body'},g0);
    el('path',{d:'M'+(X0+TW/2-20)+' '+GY+' V'+(GY-44)+' A20 20 0 0 1 '+(X0+TW/2+20)+' '+(GY-44)+' V'+GY,'class':'win'},g0);
    [X0-8,X0+24,X0+TW-46,X0+TW-14].forEach(function(x){arch(g0,x,GY-58,22,38)});
    groups.push(g0);
    for(var i=1;i<=5;i++){
      var y=GY-FH*(i+1), g=el('g',{'class':'ef','data-i':i,tabindex:0,role:'button','aria-label':'Floor '+i+', '+FL[i][1]},svg);
      el('rect',{x:X0,y:y,width:TW,height:FH,'class':'body'},g);
      el('line',{x1:X0-10,y1:y+FH,x2:X0+TW+10,y2:y+FH,'class':'slab'},g);
      for(var k=0;k<4;k++)arch(g,X0+16+k*38,y+16,24,44);
      el('line',{x1:X0-10,y1:y+FH-8,x2:X0+TW+10,y2:y+FH-8,'class':'rail'},g);
      groups.push(g);
    }
    var top=GY-FH*6,cr=TW/2-20;
    el('line',{x1:X0-10,y1:top,x2:X0+TW+10,y2:top,'class':'slab'},svg);
    el('path',{d:'M'+(X0+20)+' '+top+' V'+(top-30)+' A'+cr+' '+cr+' 0 0 1 '+(X0+TW-20)+' '+(top-30)+' V'+top,'class':'crown'},svg);
    el('line',{x1:X0+TW/2,y1:top-30-cr,x2:X0+TW/2,y2:top-30-cr-46,'class':'crown'},svg);
    el('circle',{cx:X0+TW/2,cy:top-30-cr-50,r:4,'class':'crown-dot'},svg);
    groups.forEach(function(g,i){
      var cy=GY-FH*i-FH/2,lx=X0+TW+(i===0?22:0);
      el('line',{x1:lx+12,y1:cy,x2:388,y2:cy,'class':'lead'},g);
      el('circle',{cx:400,cy:cy,r:13,'class':'num-bg'},g);
      var n=el('text',{x:400,y:cy+4.5,'class':'num','text-anchor':'middle'},g);n.textContent=FL[i][0];
      var tx=el('text',{x:422,y:cy+5,'class':'name'},g);tx.textContent=FL[i][1];
      function jump(){var fl=floors[i];if(fl)fl.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});}
      g.addEventListener('click',jump);
      g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();jump();}});
    });
    var cap=el('text',{x:30,y:H-14,'class':'cap'},svg);cap.textContent='MR REALTY TOWER · FRONT ELEVATION · ILLUSTRATIVE';
    host.appendChild(svg);
  })();
  var navLinks=$$('.tw-nav a');
  function setFloor(i){floors.forEach(function(f,k){f.classList.toggle('on',k===i)});groups.forEach(function(g,k){g.classList.toggle('on',k===i)});var fid=floors[i]?'#'+floors[i].id:'';navLinks.forEach(function(a){var on=a.getAttribute('href')===fid;a.classList.toggle('on',on);if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});}
  setFloor(0);
  /* tower floors: show only the chosen property type */
  function showFloor(i,scroll){
    if(i<0||!floors[i]) return;
    floors.forEach(function(f,k){f.hidden=k!==i;});
    setFloor(i);
    if(scroll){var t=floors[i];var r=t.getBoundingClientRect();if(r.top<70||r.top>window.innerHeight*0.6)t.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});}
  }
  navLinks.forEach(function(a){a.addEventListener('click',function(e){
    var id=a.getAttribute('href').slice(1);e.preventDefault();
    showFloor(floors.findIndex(function(f){return f.id===id}),window.innerWidth<=900);
    if(history.replaceState)history.replaceState(null,'','#'+id);
  });});
  function fromHash(){var id=location.hash.slice(1);var i=floors.findIndex(function(f){return f.id===id});if(i>=0)showFloor(i,false);}
  showFloor(0,false); fromHash(); window.addEventListener('hashchange',fromHash);


  /* walkthrough */
  var photos=$('#walk-photos'), room=$('#walk-room'), steps=$$('.step');
  if(photos&&'IntersectionObserver' in window){
    var wio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){photos.dataset.step=e.target.dataset.i;room.textContent=e.target.dataset.room;}});},{rootMargin:'-45% 0px -45% 0px'});
    steps.forEach(function(s){wio.observe(s)});
  }

  /* enquiry → WhatsApp */
  var out=$('#out'), wa=$('#wa-link'), form=$('#enquiry');
  function resetOut(msg){wa.hidden=true;out.textContent=msg||'Your message will appear here for review. Opening WhatsApp does not send it automatically.';}
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var name=$('#f-name');
    if(!name.value.trim()){name.setCustomValidity('Please add your name.');name.reportValidity();return;}
    name.setCustomValidity('');
    var lines=['Hi Mahesh, I’m '+name.value.trim()+'.',
      'I’m interested in: '+$('#f-type').value,
      'Budget: '+$('#f-budget').value];
    if($('#f-loc').value.trim())lines.push('Preferred location: '+$('#f-loc').value.trim());
    lines.push('Goal: '+$('#f-goal').value,'Timeline: '+$('#f-time').value);
    if($('#f-msg').value.trim())lines.push('',$('#f-msg').value.trim());
    var text=lines.join('\n');
    out.textContent=text;
    wa.href='https://wa.me/'+WA+'?text='+encodeURIComponent(text);
    wa.hidden=false; wa.focus();
  });
  form.addEventListener('input',function(e){if(e.target.id==='f-name')e.target.setCustomValidity('');if(!wa.hidden)resetOut('Your details changed. Prepare your message again to review the update.');});

  /* dialogs */
  function openDlg(id){var d=document.getElementById(id);if(d&&!d.open){if(d.showModal)d.showModal();else d.setAttribute('open','');}}
  $$('[data-open]').forEach(function(b){b.addEventListener('click',function(){openDlg(b.getAttribute('data-open'))})});
  $$('dialog [data-close]').forEach(function(b){b.addEventListener('click',function(){b.closest('dialog').close()})});
  $$('dialog').forEach(function(d){d.addEventListener('click',function(e){if(e.target===d)d.close();});});

  /* voice assistant (ElevenLabs) — loads only when the visitor asks */
  var AGENT='agent_4001m5wvnnn8eha9jrx6s32vhtdp';
  var SRC='https://unpkg.com/@elevenlabs/convai-widget-embed@0.22.2/dist/index.js';
  var vstat=$('#voice-status'), vgo=$('#voice-go'), loaded=false, loading=false;
  $$('[data-voice]').forEach(function(b){b.addEventListener('click',function(){
    openDlg('voice');
  });});
  var readyCbs=[];
  function whenReady(cb){if(loaded)cb();else{readyCbs.push(cb);if(!loading)vgo.click();}}
  vgo.addEventListener('click',function(){
    if(loaded){$('#voice').close();return;}
    if(loading) return; loading=true; vgo.disabled=true; vstat.textContent='Loading the assistant…';
    var s=document.createElement('script'); s.src=SRC; s.async=true;
    var timer=setTimeout(fail,15000);
    s.onload=function(){
      (window.customElements?customElements.whenDefined('elevenlabs-convai'):Promise.resolve()).then(function(){
        clearTimeout(timer);
        var w=document.createElement('elevenlabs-convai');
        w.setAttribute('agent-id',AGENT); w.setAttribute('variant','full'); w.setAttribute('dismissible','true');
        w.setAttribute('action-text','Ask MR Realty’s AI assistant'); w.setAttribute('start-call-text','Start voice conversation');
        $('#voice-host').appendChild(w); loaded=true; loading=false;
        document.documentElement.classList.add('voice-live');
        vgo.innerHTML='Go to the assistant';
        $('#voice').close();
        var q=readyCbs.splice(0);q.forEach(function(f){f()});
      });
    };
    s.onerror=fail;
    function fail(){clearTimeout(timer);loading=false;vgo.disabled=false;s.remove();vstat.textContent='The assistant could not load. Try again, or call Mahesh on +91 80084 64169.';}
    document.head.appendChild(s);
  });

  /* quick questions: open the assistant in text mode and send the chosen question */
  function sendQuestion(text){
    var tries=0;
    (function step(){
      var w=$('elevenlabs-convai'), r=w&&w.shadowRoot; tries++;
      if(!r){if(tries<200)setTimeout(step,300);return;}
      var btns=[].slice.call(r.querySelectorAll('button'));
      function lab(b){return (b.getAttribute('aria-label')||b.textContent||'').trim();}
      var ta=r.querySelector('textarea');
      if(!ta){
        var m=btns.filter(function(b){return lab(b)==='Message';})[0];
        if(m&&!m.dataset.mrClicked){m.dataset.mrClicked='1';m.click();}
        if(tries<200)setTimeout(step,300); /* waits while the visitor accepts the notice */
        return;
      }
      var setter=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(ta),'value').set;
      setter.call(ta,text); ta.dispatchEvent(new Event('input',{bubbles:true}));
      setTimeout(function(){
        var send=[].slice.call(r.querySelectorAll('button')).filter(function(b){return lab(b)==='Send';})[0];
        if(send)send.click(); else ta.focus();
      },250);
    })();
  }
  $$('.qchip').forEach(function(c){c.addEventListener('click',function(){
    var q=c.getAttribute('data-q');
    if(loaded){$('#voice').close();sendQuestion(q);}
    else{vstat.textContent='Opening the assistant…';whenReady(function(){sendQuestion(q);});}
  });});

  /* guided chat: the visitor only taps answers */
  (function(){
    var panel=$('#chat'); if(!panel) return;
    var log=$('#chat-log'), opts=$('#chat-opts'), openBtn=$('#chat-open');
    function optsOf(sel){return [].slice.call($(sel).options).map(function(o){return o.text}).filter(Boolean);}
    var areas=optsOf('#find-area').map(function(t){return t==='Help me choose an area'?'Not sure yet, help me choose':t});
    var Q=[
      {k:'type',label:'Looking for',ask:'Hi! I’m the MR Realty assistant. What kind of property are you looking for?',opts:optsOf('#find-type')},
      {k:'area',label:'Area',ask:'Great choice. Which part of Hyderabad do you prefer?',opts:areas},
      {k:'budget',label:'Budget',ask:'What budget range are you comfortable with?',opts:optsOf('#find-budget')},
      {k:'goal',label:'Purpose',ask:'Is this for buying, renting or still researching?',opts:optsOf('#f-goal')},
      {k:'time',label:'Timeline',ask:'When are you planning to move ahead?',opts:optsOf('#f-time')},
      {k:'visit',label:'Site visit',ask:'Would you like Mahesh to arrange a site visit?',opts:['Yes, arrange a site visit','Not yet, share options first','Just a call for now']}
    ];
    var A={}, step=0, started=false;
    function scroll(){log.scrollTop=log.scrollHeight;}
    function bubble(cls,html){var d=document.createElement('div');d.className='msg '+cls;d.innerHTML=html;log.appendChild(d);scroll();return d;}
    function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]});}
    function setOpts(list){opts.innerHTML='';list.forEach(function(o){opts.appendChild(o)});var f=opts.querySelector('button,a');if(f&&panel.contains(document.activeElement))f.focus({preventScroll:true});}
    function btn(text,cls,fn){var b=document.createElement('button');b.type='button';b.className='opt'+(cls?' '+cls:'');b.textContent=text;b.addEventListener('click',fn);return b;}
    function ask(){
      $('#chat-back').disabled=step===0;
      if(step>=Q.length){return finish();}
      var q=Q[step]; opts.innerHTML='';
      var t=bubble('bot typing','•••');
      setTimeout(function(){t.classList.remove('typing');t.textContent=q.ask;scroll();
        setOpts(q.opts.map(function(o){return btn(o,'',function(){A[q.k]=o;bubble('me',esc(o));step++;ask();})}));
      },reduce?0:450);
    }
    function message(){
      var l=['Hi Mahesh, I found you on the MR Realty website.'];
      Q.forEach(function(q){if(A[q.k])l.push(q.label+': '+A[q.k]);});
      return l.join('\n');
    }
    function finish(){
      $('#chat-back').disabled=false;
      var rows=Q.map(function(q){return '<dt>'+q.label+'</dt><dd>'+esc(A[q.k]||'—')+'</dd>'}).join('');
      var t=bubble('bot typing','•••');
      setTimeout(function(){
        t.classList.remove('typing');t.textContent='Thank you! Here’s your brief. Send it to Mahesh on WhatsApp and he’ll reply with matching options.';
        bubble('sum','<b>Your property brief</b><dl>'+rows+'</dl>');
        /* also prefill the enquiry form */
        setSelect('#f-type',A.type);setSelect('#f-budget',A.budget);setSelect('#f-goal',A.goal);setSelect('#f-time',A.time);
        if(A.area&&A.area.indexOf('Not sure')!==0)$('#f-loc').value=A.area;
        var wa=document.createElement('a');wa.className='opt primary';wa.target='_blank';wa.rel='noopener';
        wa.href='https://wa.me/'+WA+'?text='+encodeURIComponent(message());wa.textContent='Send to Mahesh on WhatsApp ↗';
        setOpts([wa,
          btn('Call Mahesh','dark',function(){location.href='tel:+918008464169'}),
          btn('Change my answers','',restart)]);
      },reduce?0:450);
    }
    function restart(){A={};step=0;log.innerHTML='';ask();}
    function back(){
      if(step===0)return;
      step=Math.min(step,Q.length)-1; delete A[Q[step].k];
      /* rebuild the log from answers so far */
      log.innerHTML='';
      for(var i=0;i<step;i++){bubble('bot',esc(Q[i].ask));bubble('me',esc(A[Q[i].k]));}
      ask();
    }
    function open(){panel.hidden=false;document.documentElement.classList.add('chat-open');openBtn.setAttribute('aria-expanded','true');if(!started){started=true;ask();}setTimeout(function(){var f=opts.querySelector('button,a')||$('#chat-close');f.focus({preventScroll:true});},500);}
    function close(){panel.hidden=true;document.documentElement.classList.remove('chat-open');openBtn.setAttribute('aria-expanded','false');openBtn.focus({preventScroll:true});}
    openBtn.addEventListener('click',open);
    $('#chat-close').addEventListener('click',close);
    $('#chat-restart').addEventListener('click',restart);
    $('#chat-back').addEventListener('click',back);
    panel.querySelector('[data-voice]').addEventListener('click',close);
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden)close();});
    $$('[data-chat]').forEach(function(b){b.addEventListener('click',open)});
  })();
})();
