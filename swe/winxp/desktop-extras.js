// desktop-extras.js developed by Bob Tianqi Wei
(function () {
  'use strict';
  const base = '/swe/winxp/';
  const projects = [
    ['Anything', 'anything', 'Engineering'], ['Terminal Zen', 'terminal-zen', 'Engineering'],
    ['PartSelect Chat Agent', 'partselect-chat-agent', 'Engineering'], ['Kindred', 'kindred', 'Engineering'],
    ['EKPHRASIS', 'ekphrasis', 'Research'], ['MorphingSkin', 'morphingskin', 'Research'],
    ['ArtiFactor', 'artifactor', 'Design'], ['Illuminatio', 'illuminatio', 'Design'],
    ['Sympathetic Orchestra', 'sympathetic-orchestra', 'Art & Music'], ['HUI', 'hui', 'Art & Music'],
    ['Digital Paradise', 'digital-paradise', 'Art & Music']
  ].map(([name, slug, category]) => ({name, category, kind:'project', url:'/works/' + slug + '/'}));
  const documents = [
    ['Engineering Resume', '/website_files/eng_resume_bobtianqiwei.pdf'],
    ['Curriculum Vitae', '/website_files/bobtianqiwei_cv.pdf'],
    ['EKPHRASIS', '/website_files/PDF/ekphrasis/chiea25-326.pdf'],
    ['Sympathetic Orchestra', '/website_files/PDF/other_papers/SympatheticOrchestra_CHI2026.pdf']
  ].map(([name,url]) => ({name, url, kind:'document'}));
  const pictures = [
    ['Bliss', base + 'static/media/wallpapers/bliss.jpg'],
    ['Bob Tianqi Wei', base + 'static/media/bob-hillside-square.jpg'],
    ['EKPHRASIS', '/images/teaser.png']
  ].map(([name,url]) => ({name,url,kind:'picture'}));
  const music = (window.siteAudioLibrary || []).map(t => ({name:t.title, url:t.url, kind:'music'}));
  const files = projects.concat(documents,pictures,music);
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } };
  const save = (key,value) => { try { localStorage.setItem(key,JSON.stringify(value)); } catch {} };
  const settings = read('xp-settings', {classic:false, sounds:true, saver:'none', delay:300});
  if(!settings.saverDelayVersion){settings.delay=300;settings.saverDelayVersion=1;save('xp-settings',settings);}
  const icons = {};
  let lastActivity = Date.now();
  let audioContext;
  const soundFiles={startup:'startup.mp3',shutdown:'shutdown.mp3',logon:'logon.mp3',logoff:'logoff.mp3',default:'default.mp3'};
  const soundBuffers=new Map();
  async function sound(name,delay=0,preview=false){
    if(!preview&&!settings.sounds)return;
    try{
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      await audioContext.resume();
      if(!soundBuffers.has(name))soundBuffers.set(name,fetch(base+'static/media/xp/'+soundFiles[name]).then(r=>{if(!r.ok)throw new Error('Sound unavailable');return r.arrayBuffer();}).then(data=>audioContext.decodeAudioData(data)));
      const source=audioContext.createBufferSource(),gain=audioContext.createGain();source.buffer=await soundBuffers.get(name);gain.gain.value=.65;source.connect(gain).connect(audioContext.destination);
      await new Promise(resolve=>{source.onended=resolve;source.start(audioContext.currentTime+delay);});
    }catch(error){console.warn('XP sound could not play:',error);}
  }
  function el(tag, cls, text) { const node=document.createElement(tag); if(cls) node.className=cls; if(text) node.textContent=text; return node; }
  function button(text, action, cls) { const b=el('button',cls || 'xp-button',text); b.type='button'; b.onclick=action; return b; }
  function tone(notes=[523,659,784],system=true) {
    if(system&&!settings.sounds) return;
    try { audioContext ||= new (window.AudioContext || window.webkitAudioContext)(); audioContext.resume();
      notes.forEach((frequency,i) => { const o=audioContext.createOscillator(),g=audioContext.createGain(),t=audioContext.currentTime+i*.12; o.type='sine';o.frequency.value=frequency; g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.08,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.35);o.connect(g).connect(audioContext.destination);o.start(t);o.stop(t+.4); });
    } catch {}
  }
  function remember(file) { const recent=read('xp-recent',[]).filter(f=>f.url!==file.url);recent.unshift(file);save('xp-recent',recent.slice(0,15)); }
  const trackedFrames=new WeakSet();
  function trackBrowser(){document.querySelectorAll('.ie__content iframe').forEach(frame=>{if(trackedFrames.has(frame))return;trackedFrames.add(frame);const record=()=>{if(frame.hasAttribute("srcdoc"))return;try{const url=frame.contentWindow.location;if(url.origin===location.origin)remember({name:frame.contentDocument.title||url.pathname,url:url.pathname,kind:'project'});}catch{}};frame.addEventListener('load',record);record();});}
  function windowXP(title, width=720, height=500,options={}) {
    const body=el('div','xp-extra-body');
    nativeWindow(title,width,height,body,null,null,options);
    return body;
  }
  function nativeWindow(title,width,height,body,template,ready,options={}) {
    const api=window.xpDesktop, React=api.React;
    const appId=api.state.nextAppID;
    const setTitle=title=>api.dispatch({type:'XP_UPDATE_APP',payload:{id:appId,title}});
    const original=api.apps[template || 'My Computer'];
    width=Math.min(width,innerWidth-8);height=Math.min(height,innerHeight-38);
    const occupied=Array.from(document.querySelectorAll('#root .app__header'),h=>h.parentElement.getBoundingClientRect()).filter(r=>r.width&&r.height);
    let offset={x:Math.max(4,(innerWidth-width)/2),y:Math.max(4,(innerHeight-height)/2-15)};
    if(occupied.length){
      const last=occupied.at(-1),candidates=[];
      for(let y=8;y+height<innerHeight-30;y+=32)for(let x=8;x+width<innerWidth;x+=32)candidates.push({x,y});
      const free=candidates.find(p=>occupied.every(r=>p.x+width<r.left||p.x>r.right||p.y+height<r.top||p.y>r.bottom));
      offset=free||{x:last.left+28,y:last.top+28};
      if(offset.x+width>innerWidth-4)offset.x=8+(occupied.length%4)*24;
      if(offset.y+height>innerHeight-34)offset.y=8+(occupied.length%4)*24;
      offset.x=Math.min(offset.x,innerWidth-width-4);offset.y=Math.min(offset.y,innerHeight-height-34);
    }
    let mounted=false,close;
    if(body)body.close=()=>close?.();
    const component=props=>{close=props.onClose;return React.createElement('div',{
      className:'xp-native-host',
      ref:node=>{
        if(!node || mounted)return;
        mounted=true;
        if(body)node.append(body);
        if(options.dialog){
          const frame=node.closest('.app__content').parentElement;frame.classList.add('xp-native-dialog');
          frame.querySelector('.app__header__icon').hidden=true;
          if(options.help){const controls=frame.querySelector('.header__button--close').parentElement;const help=button('?',()=>execute('help'),'header__button xp-header-help');help.setAttribute('aria-label','Help');controls.prepend(help);}
        }
        if(ready)ready(node,props,setTitle);
      }
    },template?React.createElement(original.component,props):null);};
    api.dispatch({type:api.add,payload:{
      ...original,component,header:{icon:original.header.icon,title,
        ...(height<320||options.dialog?{buttons:['close']}: {})},
      defaultSize:{width,height},defaultOffset:options.offset||offset,
      resizable:height>=320&&!options.dialog,minimized:false,maximized:false,multiInstance:true
    }});
  }
  function openFile(file) {
    if(!file)return;
    remember(file);
    if(file.kind==='music') {
      pendingTrack=file;
      const api=window.xpDesktop;
      api.dispatch({type:api.add,payload:api.apps.Winamp});
      if(window.xpWebamp)playerReady(window.xpWebamp);
      return;
    }
    if(file.kind==='picture') {
      const body=windowXP(file.name+' - Windows Picture and Fax Viewer');const img=el('img','xp-photo');img.src=file.url;img.alt=file.name;let scale=1,rotation=0;
      const stage=el('div','xp-photo-stage');stage.append(img);
      const bar=el('nav','xp-photo-toolbar');
      function transform(){img.style.transform=`scale(${scale}) rotate(${rotation}deg)`;}
      function adjacent(step){const index=pictures.findIndex(p=>p.url===img.getAttribute('src'));const next=pictures[(index+step+pictures.length)%pictures.length];img.src=next.url;img.alt=next.name;scale=1;rotation=0;transform();remember(next);}
      bar.append(button('Previous',()=>adjacent(-1)),button('Next',()=>adjacent(1)),button('−',()=>{scale=Math.max(.25,scale-.25);transform();}),button('+',()=>{scale+=.25;transform();}),button('Best fit',()=>{scale=1;transform();}),button('Rotate',()=>{rotation+=90;transform();}),button('Print',()=>{const w=window.open(img.src);if(w)w.onload=()=>w.print();}));body.append(stage,bar);return;
    }
    nativeWindow(file.name+' - Microsoft Internet Explorer',900,640,null,'Internet Explorer',node=>{
      const frame=node.querySelector('.ie__content iframe');
      frame.src=file.url;
      frame.title=file.name;
    });
  }
  let pendingTrack;
  function playerReady(player){
    if(!pendingTrack)return;
    const file=pendingTrack;pendingTrack=null;
    player.setTracksToPlay([{url:file.url,metaData:{title:file.name,artist:'Bob Tianqi Wei'}}]);
  }
  function list(body, items) {
    const grid=el('div','xp-file-list');
    for(const file of items) {
      const item=button('',()=>{
        grid.querySelectorAll('.selected').forEach(n=>n.classList.remove('selected'));
        item.classList.add('selected');
      },'xp-file');
      const icon=el('img','xp-file-icon');icon.src=icons[file.kind]||icons.folder||window.xpDesktop.apps['My Computer'].header.icon;icon.alt='';
      const open=()=>file.open?file.open():openFile(file);
      item.ondblclick=open;
      item.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();open();}};
      item.append(icon,el('span','',file.name));grid.append(item);
    }
    if(!items.length)grid.append(el('p','','No items to display.'));body.append(grid);return grid;
  }
  function explorer(folder='My Computer') {
    nativeWindow(folder,760,540,null,'My Computer',(root,props,setTitle)=>setupExplorer(root,folder,setTitle));
  }
  function setupExplorer(root,folder,setTitle) {
    const main=root.querySelector('.com__content__right');
    const sidebar=root.querySelector('.com__content__left');
    const address=root.querySelector('.com__address_bar__content__text');
    const home=Array.from(main.children,n=>n.cloneNode(true));
    const originalSidebar=Array.from(sidebar.children);
    icons.folder=root.querySelector('img[alt="folder"]').src;
    icons.document=sidebar.querySelector('img[alt="document"]').src;
    icons.project=window.xpDesktop.apps['Internet Explorer'].header.icon;
    icons.music=window.xpDesktop.apps.Winamp.header.icon;
    icons.picture=base+'static/media/xp/pictures.png';
    icons.display=base+'static/media/xp/display.png';icons.sound=base+'static/media/xp/volume.png';
    icons.windows=root.querySelector('.com__windows-logo').src;
    const groups=['Engineering','Research','Design','Art & Music'];
    const history=[];let index=-1;
    const tools=Array.from(root.querySelector('.com__function_bar').children).filter(n=>n.className.includes('__button'));
    const status=el('div','xp-explorer-status');root.querySelector('.com__content').after(status);
    function activate(item,action){
      item.tabIndex=0;item.setAttribute('role','button');
      item.onclick=()=>{main.querySelectorAll('.selected').forEach(n=>n.classList.remove('selected'));item.classList.add('selected');};
      item.ondblclick=action;item.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();action();}};
    }
    function show(name,push=true){
      if(push){history.splice(index+1);history.push(name);index++;}
      sidebar.classList.remove('xp-search-pane','xp-control-sidebar');main.classList.remove('xp-control-panel');sidebar.replaceChildren(...originalSidebar);setTitle(name);
      address.textContent=name;main.replaceChildren();main.style.backgroundImage='';
      let items=name==='My Documents'?documents:name==='My Pictures'?pictures:name==='My Music'?music:name==='My Recent Documents'?read('xp-recent',[]):projects.filter(p=>p.category===name);
      if(name==='Control Panel')items=[{name:'Display',kind:'display',open:displayProperties},{name:'Sounds and Audio Devices',kind:'sound',open:soundProperties}];
      if(name==='Control Panel'){
        renderControlPanel(main,sidebar,status);
      }else if(name==='My Computer'){
        main.append(...home.map(n=>n.cloneNode(true)));
        const cards=main.querySelectorAll('.com__content__right__card');
        const drives=cards[1].querySelector('.com__content__right__card__content');
        const disk=drives.firstElementChild.cloneNode(true);drives.replaceChildren();
        groups.forEach((group,i)=>{const item=disk.cloneNode(true);item.querySelector('.com__content__right__card__text').textContent=group+' ('+String.fromCharCode(67+i)+':)';activate(item,()=>show(group));drives.append(item);});
        cards[0].querySelectorAll('.com__content__right__card__item').forEach(item=>activate(item,()=>show('My Documents')));
        const cd=cards[2].querySelector('.com__content__right__card__item');cd.querySelector('.com__content__right__card__text').textContent='CD Drive (G:)';activate(cd,()=>show('My Music'));
        status.textContent='7 objects';
      }else{
        const heading=el('div','com__content__right__card__header',name);
        main.append(heading);list(main,items);status.textContent=items.length+' objects';
        if(groups.includes(name))address.textContent=String.fromCharCode(67+groups.indexOf(name))+':\\'+name;
      }
      tools[0].className='com__function_bar__button'+(index===0?'--disable':'');
      tools[1].className='com__function_bar__button'+(index===history.length-1?'--disable':'');
    }
    sidebar.querySelectorAll('.com__content__left__card__row').forEach(row=>{
      const name=row.textContent.trim();
      const actions={'View system information':()=>execute('winver'),'Change a setting':controlPanel,'Control Panel':controlPanel,'My Documents':()=>show('My Documents'),'Shared Documents':()=>show('My Documents')};
      if(actions[name]){row.onclick=actions[name];row.tabIndex=0;row.onkeydown=e=>{if(e.key==='Enter')actions[name]();};}
    });
    tools[0].onclick=()=>{if(index>0)show(history[--index],false);};
    tools[1].onclick=()=>{if(index<history.length-1)show(history[++index],false);};
    tools[2].onclick=()=>show('My Computer');tools[3].onclick=()=>{setTitle('Search Results');searchInExplorer(root,main,sidebar,status);};
    tools[4].onclick=()=>sidebar.hidden=!sidebar.hidden;
    tools[5].onclick=()=>main.classList.toggle('xp-details-view');
    root.querySelector('.com__address_bar__go').onclick=()=>show(address.textContent);
    show(folder);
    if(folder==='Search Results')searchInExplorer(root,main,sidebar,status);
  }
  function search() {
    explorer('Search Results');
  }
  function searchInExplorer(root,results,side,status){
    side.hidden=false;side.classList.add('xp-search-pane');side.replaceChildren();
    root.querySelector('.com__address_bar__content__text').textContent='Search Results';
    const title=el('div','xp-search-title','Search Companion'),close=button('×',()=>root.querySelector('.com__function_bar').children[2].click(),'xp-search-close');
    title.append(close);side.append(title);
    const bubble=el('div','xp-search-bubble'),rover=el('img','xp-rover');
    rover.src=base+'static/media/rover.gif';rover.alt='Rover';
    side.append(bubble,rover);
    const arrow=root.querySelector('.com__address_bar__go__img').src;
    const searchIcon=Array.from(root.querySelectorAll('.com__function_bar__button')).find(n=>n.textContent.trim()==='Search')?.querySelector('img').src;
    function resultHeader(){results.replaceChildren();const header=el('div','xp-result-header');header.append(el('span','','Name'),el('span','','In Folder'));results.append(header);}
    function formFor(kind){
      bubble.replaceChildren(el('p','xp-search-prompt',kind==='all'?'Search by any or all of the criteria below.':'Search for '+kind+'.'));
      const form=el('form'),input=el('input'),label=el('label','',kind==='all'?'All or part of the file name:':'All or part of the document name:');
      input.setAttribute('aria-label','Search projects');label.append(input);
      const scope=el('select');['My Computer','Engineering','Research','Design','Art & Music'].forEach(n=>scope.append(el('option','',n)));
      const look=el('label','','Look in:');look.append(scope);
      const controls=el('div','xp-search-actions'),back=button('Back',home),submit=button('Search',()=>{});submit.type='submit';controls.append(back,submit);form.append(label,look,controls);
      form.onsubmit=e=>{e.preventDefault();resultHeader();results.style.backgroundImage='';const q=input.value.trim().toLowerCase();
        const matches=files.filter(f=>(f.name+' '+(f.category||'')).toLowerCase().includes(q)&&(scope.selectedIndex===0||f.category===scope.value)&&(kind==='all'||kind==='documents'&&f.kind==='document'||kind==='pictures, music, or video'&&['music','picture'].includes(f.kind)));
        list(results,matches);status.textContent=matches.length+' files found';};
      bubble.append(form);input.focus();
    }
    function home(){
      bubble.replaceChildren(el('p','xp-search-prompt','What do you want to search for?'));
      [['Pictures, music, or video','pictures, music, or video'],['Documents (word processing, spreadsheet, etc.)','documents'],['All files and folders','all']].forEach(([label,kind])=>{
        const link=button('',()=>formFor(kind),'xp-search-link'),img=el('img');img.src=arrow;img.alt='';link.append(img,el('span','',label));bubble.append(link);
      });
      bubble.append(button('Computers or people',()=>formFor('all'),'xp-search-link'),button('Information in Help and Support Center',()=>execute('help'),'xp-search-link'),el('p','','You may also want to…'),button('Change preferences',()=>{rover.hidden=!rover.hidden;},'xp-search-link'),button('Turn off animated character',()=>{rover.hidden=!rover.hidden;},'xp-search-link'));
    }
    resultHeader();status.textContent='';results.append(el('p','xp-search-intro','To start your search, follow the instructions in the left pane.'));
    if(searchIcon){results.style.backgroundImage='linear-gradient(#fffffff0,#fffffff0),url("'+searchIcon+'")';results.style.backgroundRepeat='no-repeat';results.style.backgroundPosition='right bottom';results.style.backgroundSize='150px';}
    home();
  }
  function run(command) {
    if(command){ execute(command);return; }
    const body=windowXP('Run',347,186,{dialog:true,help:true});body.classList.add('xp-run');
    const intro=el('div','xp-run-description'),icon=el('img');icon.src=base+'static/media/xp/run.png';icon.alt='';
    intro.append(icon,el('span','','Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.'));
    const form=el('form'),input=el('input'),label=el('label','','Open:'),combo=el('span','xp-run-combo');input.setAttribute('aria-label','Open');
    const history=el('div','xp-run-history');history.hidden=true;
    const arrow=button('▼',()=>{history.hidden=!history.hidden;},'xp-combo-arrow');arrow.setAttribute('aria-label','Previous commands');
    read('xp-run-history',[]).forEach(command=>history.append(button(command,()=>{input.value=command;ok.disabled=false;history.hidden=true;input.focus();},'xp-command')));
    combo.append(input,arrow,history);label.append(combo);
    const buttons=el('div','xp-dialog-buttons'),ok=button('OK',()=>{});ok.type='submit';ok.disabled=true;input.oninput=()=>ok.disabled=!input.value.trim();
    const picker=el('input');picker.type='file';picker.hidden=true;picker.accept='.txt,.pdf,.png,.jpg,.mp3,.wav';
    picker.onchange=()=>{const f=picker.files[0];if(!f)return;const url=URL.createObjectURL(f);openFile({name:f.name,url,kind:f.type.startsWith('image/')?'picture':f.type.startsWith('audio/')?'music':'document'});body.close();};
    buttons.append(ok,button('Cancel',body.close),button('Browse...',()=>picker.click()));form.append(label,buttons,picker);
    form.onsubmit=e=>{e.preventDefault();if(!input.value.trim())return;save('xp-run-history',[input.value,...read('xp-run-history',[]).filter(v=>v!==input.value)].slice(0,12));body.close();execute(input.value);};body.append(intro,form);requestAnimationFrame(()=>input.focus({preventScroll:true}));
  }
  function windowsBanner(){
    const banner=el('div','xp-about-banner'),mark=el('div','xp-wordmark');
    const logo=icons.windows||document.querySelector('.ie__windows-logo')?.src;
    if(logo){const img=el('img');img.src=logo;img.alt='';banner.append(img);}
    mark.innerHTML='<small>Microsoft®</small>Windows<sup>xp</sup><em>Professional</em>';banner.append(mark);return banner;
  }
  function execute(value) {
    const command=value.trim().toLowerCase();
    if(command==='help'){const b=windowXP('Help and Support',420,280);b.append(el('p','','Double-click a drive or file to open it. Use Back, Forward and Up to browse. Search looks through portfolio projects, documents, pictures and music.'),el('p','','Run commands: winver, cmd, piano, secret, control, explorer.'),button('OK',b.close));}
    else if(command==='winver'){const b=windowXP('About Windows',420,330,{dialog:true}),copy=el('div','xp-about-copy');copy.innerHTML='Microsoft Windows<br>Version 5.1 (Build 2600.xpsp_sp3: Service Pack 3)<br>Copyright © 1981–2008 Microsoft Corporation<br><br>This portfolio is registered to:<br>&nbsp;&nbsp;&nbsp;Bob Tianqi Wei<hr>Windows XP portfolio simulation';const actions=el('div','xp-dialog-buttons');actions.append(button('OK',b.close));b.append(windowsBanner(),copy,actions);}
    else if(command==='cmd'){const b=windowXP('C:\\WINDOWS\\system32\\cmd.exe',650,380);b.classList.add('xp-cmd');const out=el('pre','','Microsoft Windows XP [Version 5.1.2600]\nType help for available commands.\n');const f=el('form'),i=el('input');i.setAttribute('aria-label','Command');f.append(el('span','','C:\\Portfolio> '),i);f.onsubmit=e=>{e.preventDefault();const c=i.value.trim();out.textContent+='\nC:\\Portfolio> '+c+'\n';i.value='';if(c==='help')out.textContent+='dir, cls, whoami, winver, piano, secret, exit';else if(c==='dir')out.textContent+=files.map(f=>f.name).join('\n');else if(c==='whoami')out.textContent+='Bob Tianqi Wei';else if(c==='cls')out.textContent='';else if(c==='exit')b.close();else if(['piano','secret','winver'].includes(c))execute(c);else out.textContent+='Command not found.';};b.append(out,f);i.focus();}
    else if(command==='piano'){const b=windowXP('Piano',530,280);b.append(el('p','','Click a key to play.'));const keys=el('div','xp-piano');[261.63,293.66,329.63,349.23,392,440,493.88,523.25].forEach((f,i)=>keys.append(button('CDEFGABC'[i],()=>tone([f],false))));b.append(keys);}
    else if(command==='secret'){const b=windowXP('A little secret',410,230);b.append(el('h2','','You found the secret!'),el('p','','Somewhere between code, music, and design, there is always room to play.'),button('Play Goldberg Variation 13',()=>openFile(music[music.length-1])));}
    else if(command==='control')controlPanel();else if(command==='explorer')explorer();else {const b=windowXP('Run',390,180);b.append(el('p','',`Windows cannot find '${value}'. Try winver, cmd, piano, secret, control, or explorer.`),button('OK',b.close));}
  }
  function applySettings(){document.documentElement.classList.toggle('xp-classic',settings.classic);save('xp-settings',settings);}
  function controlPanel(){explorer('Control Panel');}
  let messengerBody,messengerContacts;
  function messenger(){
    if(!messengerContacts?.isConnected){
      const contacts=windowXP('MSN Messenger',344,650,{offset:{x:Math.max(4,innerWidth-364),y:32}});messengerContacts=contacts;contacts.classList.add('xp-messenger','msn-contacts');
      const menu=el('div','xp-messenger-menu');['File','Contacts','Actions','Tools','Help'].forEach(label=>menu.append(button(label,()=>messenger(),'xp-chat-menu-button')));
      const profile=el('div','msn-profile'),portrait=el('img');portrait.src=base+'static/media/bob-hillside-square.jpg';portrait.alt='Bob Tianqi Wei';
      const status=el('select');status.setAttribute('aria-label','My status');['Online','Away','Busy','Appear Offline'].forEach(text=>status.append(el('option','',text)));
      profile.append(el('div','msn-wordmark','Messenger'),portrait,el('strong','','Bob Tianqi Wei'),status,el('p','','<Type a personal message>'));
      const list=el('div','msn-contact-list'),contact=button("Bob’s Cat (Online)",()=>messenger(),'msn-contact');contact.ondblclick=()=>messenger();
      const contactAvatar=el('img');contactAvatar.src='/images/projects/bobscat.jpg';contactAvatar.alt='';contact.prepend(contactAvatar);
      list.append(el('div','msn-contact-notice',"Your contact is Bob’s Cat, Bob’s portfolio assistant."),button('Add a Contact',()=>messenger(),'msn-add-contact'),el('h3','','Online (1)'),contact,el('h3','','Offline (0)'));
      contacts.append(menu,profile,list,el('div','msn-brand-footer','Messenger'));
    }
    if(messengerBody?.isConnected){messengerBody.closest('.app__content').parentElement.dispatchEvent(new MouseEvent('mousedown',{bubbles:true}));return;}
    const chat=windowXP("Bob's Cat - Conversation",520,490,{offset:{x:Math.min(24,Math.max(4,innerWidth-528)),y:64}});messengerBody=chat;chat.classList.add('xp-messenger','xp-messenger-conversation','msn-conversation');
    const bar=el('div','xp-messenger-menu'),layout=el('div','xp-conversation-layout'),main=el('div','xp-conversation-main'),side=el('aside','xp-conversation-side');
    const notice=el('div','xp-conversation-status',"Connecting to Bob's Cat..."),messages=el('div','xp-chat-messages'),input=el('textarea','xp-chat-input'),form=el('form','xp-chat-composer'),format=el('div','xp-chat-format');
    messages.setAttribute('role','log');messages.setAttribute('aria-live','polite');input.setAttribute('aria-label','Message');
    // Use the live Cat page so its provider, prompt, and fallback rules remain the single source.
    const engine=el('iframe');engine.hidden=true;engine.title="Bob's Cat reply engine";engine.src='/works/bobscat/?embed=1&messenger=1&contextPath=/swe/classic/';
    let api,blocked=false,last='',animateIndex=-1,revealCount=0,nextCharacterAt=0,typing=false;
    const send=button('Send',submit,'xp-chat-send');send.disabled=true;
    const inputArea=el('div','xp-chat-input-area'),suggestions=el('div','xp-chat-suggestions');
    ['Who is Bob?','Music','AI and design'].forEach(prompt=>{const suggestion=button(prompt,()=>{input.value=prompt;submit();},'xp-chat-suggestion');suggestion.disabled=true;suggestions.append(suggestion);});
    function submit(){if(!api||api.busy()||typing||blocked||!input.value.trim())return;const text=input.value;input.value='';animateIndex=api.messages().length+1;revealCount=0;nextCharacterAt=0;api.send(text);refresh();}
    async function clearConversation(){if(!api||api.busy())return;animateIndex=-1;typing=false;await api.clear();refresh();input.focus();}
    function refresh(){
      suggestions.hidden=input.value.length>0;
      if(!api)return;const records=api.messages();typing=false;
      const reply=records[animateIndex];
      if(reply&&reply.role==='assistant'&&!reply.pending){
        const chars=Array.from(reply.text),now=performance.now();
        if(!nextCharacterAt)nextCharacterAt=now;
        while(revealCount<chars.length&&now>=nextCharacterAt){const char=chars[revealCount++];nextCharacterAt+=/[，。！？.!?,:\n]/.test(char)?22:12;}
        typing=revealCount<chars.length;
        reply.text=chars.slice(0,revealCount).join('');
        if(!typing)nextCharacterAt=0;
      }
      const serialized=JSON.stringify(records);
      if(serialized!==last){last=serialized;messages.replaceChildren();records.forEach(record=>{const item=el('div','xp-chat-message');item.append(el('div','xp-chat-sender',record.role==='assistant'?"Bob's Cat says:":'You say:'),el('div','xp-chat-text',record.pending?"Bob's Cat is typing a message...":record.text));messages.append(item);});messages.scrollTop=messages.scrollHeight;}
      send.disabled=blocked||api.busy()||typing||!input.value.trim();input.disabled=blocked;
      suggestions.querySelectorAll('button').forEach(button=>button.disabled=blocked||api.busy()||typing);
      notice.textContent=blocked?"Bob's Cat is blocked.":api.busy()||typing?"Bob's Cat is typing a message...":"All replies are from Bob's Cat.";
    }
    function options(){const panel=windowXP("Bob's Cat Settings",480,450);const frame=el('iframe','xp-messenger-frame');frame.src='/works/bobscat/?embed=1';frame.title="Bob's Cat settings";frame.onload=()=>frame.contentWindow.postMessage({type:'bob-cat-open-settings'},location.origin);panel.append(frame);}
    function menu(label,items){const wrap=el('div','xp-chat-menu-wrap'),popup=el('div','xp-chat-menu-popup');popup.hidden=true;const trigger=button(label,()=>{const open=popup.hidden;bar.querySelectorAll('.xp-chat-menu-popup').forEach(p=>p.hidden=true);popup.hidden=!open;},'xp-chat-menu-button');items.forEach(([text,action])=>popup.append(button(text,()=>{popup.hidden=true;action();},'xp-chat-menu-button')));wrap.append(trigger,popup);return wrap;}
    bar.append(menu('File',[['Close',()=>chat.close()]]),menu('Edit',[['Select All',()=>{input.focus();input.select();}],['Clear Conversation',clearConversation]]),menu('View',[['Sidebar',()=>side.hidden=!side.hidden]]),menu('Actions',[['Options...',options]]),menu('Help',[['About MSN Messenger',()=>notice.textContent="MSN Messenger-style interface. Replies by Bob's Cat."]]));
    const unavailable=()=>notice.textContent='This AI contact supports text conversations only.';
    const toolbar=el('div','msn-toolbar');['Invite','Send Files','Video','Voice','Activities','Games'].forEach((label,i)=>{const tool=button('',unavailable,'msn-toolbar-item'),icon=el('span','msn-toolbar-icon');icon.style.backgroundImage='url('+base+'static/media/msn/toolbar/'+['invite','send','video','voice','activities','games'][i]+'.png)';tool.append(icon,el('span','',label));toolbar.append(tool);});toolbar.append(el('span','msn-toolbar-logo'));
    ['contact','self'].forEach(kind=>{const card=el('div','msn-avatar-card'),avatar=el('div','msn-avatar msn-avatar-'+kind);avatar.setAttribute('role','img');avatar.setAttribute('aria-label',kind==='contact'?"Bob's Cat":'Bob Tianqi Wei');card.append(avatar,el('span','msn-avatar-arrow','▾'));side.append(card);});
    [['Font',25,24,()=>input.classList.toggle('xp-chat-serif')],['Emoticons',51,38,()=>{input.value+=' :-)';input.focus();refresh();}],['Voice Clip',96,70,unavailable],['Winks',169,34,unavailable],['Send a Picture',208,34,unavailable],['Send a Gift',249,34,unavailable],['Clear chat history',292,30,clearConversation]].forEach(([label,x,width,action])=>{const tool=button('',action,'xp-chat-tool msn-format-tool');tool.title=label;tool.setAttribute('aria-label',label);tool.style.width=width+'px';const img=el('img');img.src=base+'static/media/msn/simple/'+({25:'letter',51:'happy',96:'voice-clip',169:'wink',208:'mountain',249:'gift',292:'nudge'}[x])+'.png';img.alt='';tool.append(img);if(label==='Voice Clip')tool.append(document.createTextNode('Voice Clip'));format.append(tool);});
    input.oninput=refresh;input.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();submit();}};form.onsubmit=e=>{e.preventDefault();submit();};inputArea.append(input,suggestions);form.append(inputArea,send);
    main.append(el('div','xp-messenger-recipient',"To:  Bob's Cat <bobscat>"),el('div','xp-chat-warning','Never give out your password or credit card number in an instant message conversation.'),messages,format,form);layout.append(main,side);chat.append(bar,toolbar,layout,notice,engine);
    engine.onload=()=>{api=engine.contentWindow.bobCatMessenger;if(!api){notice.textContent='Unable to load the reply engine. Please reopen Messenger.';return;}refresh();};
    const timer=setInterval(()=>{if(!chat.isConnected){clearInterval(timer);return;}refresh();},16);
  }
  function renderControlPanel(main,side,status){
    const asset=name=>base+'static/media/xp/'+name+'.png';
    const display=tab=>()=>displayProperties(tab);
    const categories=[
      ['Appearance and Themes','Appearance',[['Change the computer’s theme',display('Themes')],['Change the desktop background',display('Desktop')],['Choose a screen saver',display('Screen Saver')],['Change the screen resolution',display('Settings')]]],
      ['Network and Internet Connections','NetworkConnections',[['View connection information',()=>info('Network Connections',navigator.onLine?'The browser is online. Network connections are managed by your operating system.':'The browser is offline.')]]],
      ['Add or Remove Programs','Programs',[['Open Paint',()=>launch('Paint')],['Open Notepad',()=>launch('Notepad')],['Open Minesweeper',()=>launch('Minesweeper')]]],
      ['Sounds, Speech, and Audio Devices','AudioDevices',[['Change the sound scheme',soundProperties],['Adjust system sounds',soundProperties]]],
      ['Performance and Maintenance','Performance',[['View information about your computer',()=>execute('winver')],['Adjust power settings',powerOptions]]],
      ['Printers and Other Hardware','PrintersandHardware',[['View pictures to print',()=>explorer('My Pictures')],['Open the piano keyboard',()=>execute('piano')]]],
      ['User Accounts','UserAccounts',[['View your account',()=>info('User Accounts','Bob Tianqi Wei\nPortfolio visitor\n\nThis desktop stores preferences in this browser. It does not manage your operating system’s user accounts.')]]],
      ['Date, Time, Language, and Regional Options','DateandRegion',[['View the date and time',()=>info('Date and Time',new Date().toLocaleString('en-US',{dateStyle:'full',timeStyle:'long'}))]]],
      ['Accessibility Options','Accessibility',[['Use the Windows Classic appearance',display('Appearance')],['Adjust system sounds',soundProperties]]]
    ];
    function launch(name){const api=window.xpDesktop;api.dispatch({type:api.add,payload:api.apps[name]});}
    function info(title,text){const body=windowXP(title,390,240,{dialog:true});body.append(el('p','xp-control-info',text),button('OK',body.close));}
    function link(label,action,icon){const item=button('',action,'xp-control-link');if(icon){const img=el('img');img.src=asset(icon);img.alt='';item.append(img);}item.append(el('span','',label));return item;}
    function card(title,entries){const card=el('section','xp-control-card');card.append(el('h3','',title));const contents=el('div');entries.forEach(entry=>contents.append(link(...entry)));card.append(contents);side.append(card);}
    let classic=false;
    function render(category){
      main.classList.add('xp-control-panel');side.classList.add('xp-control-sidebar');main.replaceChildren();side.replaceChildren();
      card('Control Panel',[[category?'Control Panel Home':classic?'Switch to Category View':'Switch to Classic View',()=>{if(!category)classic=!classic;render();},'ControlPanel']]);
      card('See Also',[[ 'Help and Support',()=>execute('help')],['Other Control Panel Options',()=>{classic=true;render();}]]);
      main.classList.toggle('xp-control-classic',classic&&!category);
      main.append(el('h1','',category?category[0]:classic?'Control Panel':'Pick a category'));
      const grid=el('div',category?'xp-control-tasks':'xp-control-categories');
      if(category){
        main.append(el('h2','','Pick a task...'));category[2].forEach(([label,action])=>grid.append(link(label,action)));
        grid.append(link('Back to Control Panel',()=>render(),'ControlPanel'));
      }else if(classic){
        [['Display','Appearance',displayProperties],['Sounds and Audio Devices','AudioDevices',soundProperties],['Power Options','Performance',powerOptions],['System','ControlPanel',()=>execute('winver')]].forEach(([label,icon,action])=>grid.append(link(label,action,icon)));
      }else categories.forEach(category=>grid.append(link(category[0],()=>render(category),category[1])));
      main.append(grid);status.textContent=category?category[0]:'Control Panel';
    }
    render();
  }
  function displayProperties(initialTab='Themes') {
    const body=windowXP('Display Properties',404,455,{dialog:true,help:true});
    body.classList.add('xp-property-sheet');
    const tabs=el('nav','xp-tabs'),panel=el('div','xp-settings-panel'),actions=el('div','xp-dialog-buttons');
    tabs.setAttribute('role','tablist');
    const draft={...settings},wallpapers=window.xpWallpaper;
    let wallpaper=wallpapers.current();
    let position=read('xp-wallpaper-position','Stretch'),color=read('xp-wallpaper-color','#004e98');
    const apply=button('Apply',commit);apply.disabled=true;
    function changed(){apply.disabled=false;}
    function commit(){Object.assign(settings,draft);applySettings();save('xp-wallpaper-position',position);save('xp-wallpaper-color',color);wallpapers.apply(wallpaper);apply.disabled=true;}
    function choose(label,values,current,onchange){
      const field=el('label','',label),select=el('select');
      values.forEach(value=>select.append(el('option','',value)));select.value=current;
      select.onchange=()=>{onchange(select.value);changed();};field.append(select);panel.append(field);return select;
    }
    function monitor(){
      const monitor=el('div','xp-monitor'),screen=el('div','xp-monitor-screen');
      monitor.append(screen);panel.append(monitor);return screen;
    }
    function tab(name){
      tabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',String(b.textContent===name)));
      panel.replaceChildren();
      if(name==='Desktop'){
        const screen=monitor(),current=wallpapers.options.find(w=>w.id===wallpaper);
        screen.style.backgroundImage='url("'+current.url+'")';
        const layout=el('div','xp-desktop-controls'),label=el('label','','Background:'),select=el('select','xp-wallpaper-list');select.size=6;
        wallpapers.options.forEach(w=>{const o=el('option','',w.label);o.value=w.id;select.append(o);});
        select.value=wallpaper;
        select.onchange=()=>{wallpaper=select.value;screen.style.backgroundImage='url("'+wallpapers.options.find(w=>w.id===wallpaper).url+'")';changed();};
        label.append(select);
        const controls=el('div','xp-desktop-options'),picker=el('input');picker.type='file';picker.accept='image/*';picker.hidden=true;
        picker.onchange=()=>{const file=picker.files[0];if(!file)return;if(file.size>2500000){const b=windowXP('Display Properties',330,150,{dialog:true});b.append(el('p','','Please choose an image smaller than 2.5 MB.'),button('OK',b.close));return;}const reader=new FileReader();reader.onload=()=>{wallpapers.addCustom(reader.result);wallpaper='custom';changed();tab('Desktop');};reader.readAsDataURL(file);};
        const positions=el('select');['Center','Tile','Stretch'].forEach(p=>positions.append(el('option','',p)));positions.value=position;
        positions.onchange=()=>{position=positions.value;changed();};
        const positionLabel=el('label','','Position:');positionLabel.append(positions);
        const colorLabel=el('label','','Color:'),colorInput=el('input');colorInput.type='color';colorInput.value=color;colorInput.oninput=()=>{color=colorInput.value;changed();};colorLabel.append(colorInput);
        controls.append(button('Browse...',()=>picker.click()),positionLabel,colorLabel,picker);layout.append(label,controls);panel.append(layout,button('Customize Desktop...',()=>explorer('My Computer')));
      }else if(name==='Screen Saver'){
        monitor().textContent=draft.saver==='none'?'':draft.saver;
        const field=el('fieldset'),legend=el('legend','','Screen saver'),row=el('div','xp-saver-controls'),select=el('select');
        ['none','Windows XP','Starfield'].forEach(n=>{const o=el('option','',n==='none'?'(None)':n);o.value=n;select.append(o);});select.value=draft.saver;
        select.onchange=()=>{draft.saver=select.value;changed();};
        row.append(select,button('Settings',()=>{const message=windowXP('Screen Saver',330,150,{dialog:true});message.append(el('p','','This screen saver has no options that you can set.'),button('OK',message.close));}),button('Preview',()=>screensaver(true,draft.saver)));
        const wait=el('label','xp-saver-wait','Wait:'),input=el('input');input.type='number';input.min=1;input.max=60;input.value=Math.max(1,Math.round(draft.delay/60));
        input.onchange=()=>{draft.delay=Math.max(1,Math.min(60,Number(input.value)||1))*60;changed();};
        wait.append(input,document.createTextNode('minutes'));field.append(legend,row,wait);panel.append(field);
        const powerBox=el('fieldset','xp-monitor-power'),powerTitle=el('legend','','Monitor power'),star=el('div','xp-energy-star');
        powerBox.append(powerTitle,star,el('p','','To adjust monitor power settings and save energy, click Power.'),button('Power...',powerOptions));panel.append(powerBox);
      }else if(name==='Settings'){
        const screen=monitor();screen.textContent='1';screen.style.cssText='background:#004e98;font:bold 56px Arial';
        panel.append(el('p','','Display:'),el('p','','Default Monitor on Browser Display Adapter'));
        const group=el('fieldset'),legend=el('legend','','Screen resolution');group.append(legend,el('p','',innerWidth+' by '+innerHeight+' pixels'),el('p','','Resize the browser window to change the screen resolution.'));panel.append(group);
      }else{
        const preview=el('div','xp-appearance-preview'),win=el('div','xp-preview-window'+(draft.classic?' xp-preview-classic':''));
        const source=Array.from(document.querySelectorAll('.app__header')).at(-1).parentElement;
        win.className+=' '+source.className;
        const header=source.querySelector('.app__header').cloneNode(true),background=source.querySelector('.header__bg').cloneNode(true);
        header.querySelector('.app__header__title').textContent='Active Window';header.querySelector('.app__header__icon').remove();
        win.append(background,header,el('div','xp-preview-text','Window Text'));preview.append(win);
        if(name==='Themes'){
          panel.append(el('p','','A theme is a background plus a set of sounds, icons, and other elements to help you personalize your computer with one click.'),el('label','','Theme:'));
          const row=el('div','xp-theme-controls'),select=el('select'),themes=read('xp-saved-themes',{});
          ['Windows XP','Windows Classic',...Object.keys(themes)].forEach(n=>select.append(el('option','',n)));select.value=draft.classic?'Windows Classic':'Windows XP';
          const remove=button('Delete',()=>{delete themes[select.value];save('xp-saved-themes',themes);tab('Themes');});remove.disabled=true;
          select.onchange=()=>{if(themes[select.value]){Object.assign(draft,themes[select.value]);wallpaper=themes[select.value].wallpaper;}else draft.classic=select.value==='Windows Classic';remove.disabled=!themes[select.value];win.classList.toggle('xp-preview-classic',draft.classic);changed();};
          const saveAs=button('Save As...',()=>{const dialog=windowXP('Save Theme',330,150,{dialog:true}),input=el('input');input.setAttribute('aria-label','Theme name');const actions=el('div','xp-dialog-buttons');actions.append(button('Save',()=>{const name=input.value.trim();if(!name||['Windows XP','Windows Classic'].includes(name))return;themes[name]={...draft,wallpaper};save('xp-saved-themes',themes);dialog.close();tab('Themes');}),button('Cancel',dialog.close));dialog.append(el('p','','Theme name:'),input,actions);});
          row.append(select,saveAs,remove);panel.append(row,el('label','','Sample:'));preview.classList.add('xp-theme-preview');preview.style.backgroundImage='url("'+wallpapers.options.find(w=>w.id===wallpaper).url+'")';panel.append(preview);
        }else{
          panel.append(preview);
          choose('Windows and buttons:',['Windows XP style','Windows Classic style'],draft.classic?'Windows Classic style':'Windows XP style',value=>{draft.classic=value==='Windows Classic style';win.classList.toggle('xp-preview-classic',draft.classic);});
        }
      }
    }
    ['Themes','Desktop','Screen Saver','Appearance','Settings'].forEach(name=>{const b=button(name,()=>tab(name),'');b.className='';b.setAttribute('role','tab');tabs.append(b);});
    actions.append(button('OK',()=>{commit();body.close();}),button('Cancel',body.close),apply);
    body.append(tabs,panel,actions);tab(typeof initialTab==='string'?initialTab:'Themes');
  }
  function soundProperties(){
    const body=windowXP('Sounds and Audio Devices Properties',404,455,{dialog:true,help:true});body.classList.add('xp-property-sheet');
    const tabs=el('nav','xp-tabs'),tab=el('button','','Sounds');tab.setAttribute('aria-selected','true');tabs.append(tab);
    const panel=el('div','xp-settings-panel'),label=el('label','','Sound scheme:'),select=el('select');
    ['Windows Default','No Sounds'].forEach(n=>select.append(el('option','',n)));select.selectedIndex=settings.sounds?0:1;label.append(select);
    const events=el('select','xp-sound-events');events.size=6;events.setAttribute('aria-label','Program events');
    [['Default Beep','default'],['Exit Windows','shutdown'],['Start Windows','startup'],['Windows Logoff','logoff'],['Windows Logon','logon']].forEach(([name,value])=>{const option=el('option','',name);option.value=value;events.append(option);});events.value='startup';
    panel.append(label,el('p','','Program events:'),events,button('Play',()=>sound(events.value,0,true)));
    const actions=el('div','xp-dialog-buttons'),commit=()=>{settings.sounds=select.selectedIndex===0;applySettings();};
    actions.append(button('OK',()=>{commit();body.close();}),button('Cancel',body.close),button('Apply',commit));body.append(tabs,panel,actions);
  }
  function powerOptions(){
    const body=windowXP('Power Options Properties',370,245,{dialog:true,help:true}),label=el('label','','Turn off monitor:'),select=el('select');
    [['Never',0],['After 5 minutes',300],['After 10 minutes',600],['After 20 minutes',1200]].forEach(([name,value])=>{const o=el('option','',name);o.value=value;select.append(o);});select.value=settings.monitorDelay||0;label.append(select);
    const panel=el('div','xp-settings-panel');panel.append(el('p','','Choose when this desktop enters standby after no mouse or keyboard activity.'),label);
    const actions=el('div','xp-dialog-buttons');actions.append(button('OK',()=>{settings.monitorDelay=Number(select.value);applySettings();body.close();}),button('Cancel',body.close));body.append(panel,actions);
  }
  function screensaver(preview=false,mode=settings.saver){
    if(document.querySelector('.xp-power-layer,.xp-screensaver')||mode==='none')return;
    const saver=el('div','xp-screensaver');saver.tabIndex=0;let animation;
    if(mode==='Starfield'){
      const canvas=el('canvas');canvas.width=innerWidth;canvas.height=innerHeight;saver.append(canvas);
      const ctx=canvas.getContext('2d'),stars=Array.from({length:180},()=>({x:(Math.random()-.5)*innerWidth,y:(Math.random()-.5)*innerHeight,z:Math.random()*innerWidth}));
      function draw(){ctx.fillStyle='#000';ctx.fillRect(0,0,canvas.width,canvas.height);
        for(const star of stars){star.z-=5;if(star.z<=1)star.z=innerWidth;const k=innerWidth/star.z,x=star.x*k+innerWidth/2,y=star.y*k+innerHeight/2;ctx.fillStyle='#fff';ctx.fillRect(x,y,Math.min(3,k),Math.min(3,k));}
        animation=requestAnimationFrame(draw);
      }draw();
    }else{const logo=el('div','xp-floating-logo'),img=el('img');img.src=base+'static/media/xp/logo.png';img.alt='Microsoft Windows XP';img.style.width='180px';logo.append(img);saver.append(logo);}
    const close=()=>{cancelAnimationFrame(animation);saver.remove();lastActivity=Date.now();};
    saver.onpointerdown=close;saver.onkeydown=close;
    setTimeout(()=>{saver.onpointermove=close;},400);
    document.body.append(saver);saver.focus();
  }
  // Adapted from win32.run's MIT-licensed shutdown, welcome and startup components.
  function sessionScreen(layer,message){
    layer.className='xp-power-layer xp-session';
    const content=el('div','xp-session-content'),logo=el('img','xp-session-logo');
    logo.src=base+'static/media/xp/logo.png';logo.alt='Microsoft Windows XP';
    content.append(logo,el('p','',message));layer.replaceChildren(content);
  }
  async function power(mode){
    if(document.querySelector('.xp-power-layer'))return;
    document.querySelectorAll('audio,video').forEach(a=>a.pause());
    const player=window.xpWebamp;
    if(mode==='off'||mode==='restart'||mode==='logoff'){
      pendingTrack=null;
      player?.stop();
      // Unload embedded pages, including cross-origin media the desktop cannot pause.
      document.querySelectorAll('#root iframe').forEach(frame=>{frame.srcdoc='';});
    }else if(player?.getMediaStatus()==='PLAYING'){
      player.pause();
    }
    const layer=el('div','xp-power-layer');layer.dataset.reset=String(mode!=='login'&&mode!=='standby');document.body.append(layer);
    sessionScreen(layer,mode==='off'||mode==='restart'?'Windows is shutting down...':'Saving your settings...');
    if(mode==='standby'){layer.append(button('Resume Windows',()=>layer.remove()));return;}
    if(mode==='off'){await deskScene(layer,sound('shutdown'));return;}
    await Promise.all([sound(mode==='off'||mode==='restart'?'shutdown':'logoff'),new Promise(resolve=>setTimeout(resolve,1800))]);
    if(mode==='restart')boot(layer);
    else{
      layer.className='xp-power-layer xp-session xp-login';
      const logo=el('img','xp-login-logo');logo.src=base+'static/media/xp/logo.png';logo.alt='Microsoft Windows XP';
      const prompt=el('div','xp-login-prompt');prompt.append(logo,el('p','','To begin, click your user name'));
      const user=button('',()=>boot(layer,true),'xp-user-button'),avatar=el('img');avatar.src=base+'static/media/bob-hillside-square.jpg';avatar.alt='';
      user.append(avatar,el('span','','Bob Tianqi Wei'));layer.replaceChildren(prompt,user);
    }
  }
  function clearPoweredOffEntry(target){
    const url=new URL(target.location.href);
    if(url.searchParams.get('power')!=='off')return;
    url.searchParams.delete('power');
    target.history.replaceState(target.history.state,'',url);
  }
  async function deskScene(layer,shutdown,initiallyOff=false){
    const scene=el('div','xp-desk-scene'),computer=el('div','xp-vaio'),photo=el('img','xp-vaio-photo'),screen=el('div','xp-vaio-screen');
    scene.style.visibility='hidden';
    photo.src=base+'static/media/vaio-pcv-w.png';photo.alt='Sony VAIO PCV-W';
    const on=button('',async()=>{
      if(initiallyOff){
        clearPoweredOffEntry(window);
        try{if(window.parent!==window)clearPoweredOffEntry(window.parent);}catch{}
      }
      on.disabled=true;scene.classList.add('xp-desk-busy');
      const startup=el('div','xp-power-layer xp-boot xp-screen-startup');bootContents(startup);screen.append(startup);
      startup.style.width=innerWidth+'px';startup.style.height=innerHeight+'px';
      startup.style.transform=`scale(${screen.clientWidth/innerWidth},${screen.clientHeight/innerHeight})`;
      await camera(true,450);
      boot(layer);
    },'xp-vaio-power');on.setAttribute('aria-label','Power on');on.title='Power on';
    computer.append(photo,screen,on);
    const hardware=el('div','xp-desk-hardware');
    for(const side of ['left','right']){
      const crop=el('div','xp-speaker-crop xp-speaker-crop-'+side),speaker=el('img');
      speaker.src=base+'static/media/soundsticks-transparent.png';speaker.alt=side==='left'?'Left SoundSticks speaker and subwoofer':'Right SoundSticks speaker';
      crop.append(speaker);hardware.append(crop);
    }
    hardware.append(computer);
    const shade=button('',()=>putDown(),'xp-photo-shade');shade.setAttribute('aria-label','Put photo down');shade.hidden=true;
    let lifted=null;const prints=[],labels=['Bob as a child','Bob and Mom at Jilin City No. 1 High School campus',"Bob’s mom"];
    const gallery=el('div','xp-photo-gallery'),caption=el('p');gallery.hidden=true;
    function putDown(){if(!lifted)return;lifted.classList.remove('is-lifted');lifted.setAttribute('aria-pressed','false');lifted=null;shade.hidden=true;gallery.hidden=true;}
    function pickUp(print){putDown();lifted=print;print.classList.add('is-lifted');print.setAttribute('aria-pressed','true');shade.hidden=false;gallery.hidden=false;caption.textContent=labels[prints.indexOf(print)];}
    gallery.append(caption);
    [['childhood.jpg','Childhood'],['childhood-with-mom.jpg','With Mom'],['mom.jpg','Mom']].forEach(([src,label],i)=>{
      const print=button('',()=>{if(lifted===print)putDown();else pickUp(print);},'xp-desk-photo xp-desk-photo-'+i);
      print.setAttribute('aria-label',label+' photo');print.setAttribute('aria-pressed','false');
      const img=el('img');img.src=base+'static/media/'+src;img.alt=label;print.append(img);scene.append(print);prints.push(print);
    });
    scene.onkeydown=e=>{if(e.key==='Escape')putDown();};
    scene.append(hardware,el('p','xp-power-hint','Press the power button to turn on the computer.'),shade,gallery);
    if(!initiallyOff)await Promise.all(Array.from(scene.querySelectorAll('img'),img=>img.decode().catch(()=>{})));
    layer.className='xp-power-layer xp-off';layer.replaceChildren(scene);
    if(initiallyOff){scene.style.visibility='visible';return;}
    const closing=el('div','xp-screen-startup');sessionScreen(closing,'Windows is shutting down...');closing.classList.add('xp-screen-startup');screen.append(closing);
    closing.style.width=innerWidth+'px';closing.style.height=innerHeight+'px';closing.style.transform=`scale(${screen.clientWidth/innerWidth},${screen.clientHeight/innerHeight})`;
    async function camera(inward,delay=0){
      const rect=screen.getBoundingClientRect(),sx=innerWidth/rect.width,sy=innerHeight/rect.height;
      const zoom=`translate(${-rect.left*sx}px,${-rect.top*sy}px) scale(${sx},${sy})`;
      const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
      scene.style.visibility='visible';
      screen.animate([{clipPath:inward?'polygon(0 0,100% 0,98.42% 100%,1.58% 100%)':'inset(0)'},{clipPath:inward?'inset(0)':'polygon(0 0,100% 0,98.42% 100%,1.58% 100%)'}],{duration:reduced?0:1800,delay:reduced?0:delay,fill:'both'});
      await scene.animate([{transform:inward?'none':zoom},{transform:inward?zoom:'none'}],{duration:reduced?0:1800,delay:reduced?0:delay,easing:'cubic-bezier(.65,0,.25,1)',fill:'both'}).finished;
    }
    scene.classList.add('xp-desk-busy');await Promise.all([camera(false),shutdown]);closing.remove();scene.classList.remove('xp-desk-busy');
  }
  function bootContents(target){
    const logo=el('img','xp-boot-logo'),ms=el('img','xp-boot-microsoft'),loader=el('div','xp-loading');
    logo.src=base+'static/media/xp/boot-logo.jpg';logo.alt='Microsoft Windows XP';
    ms.src=base+'static/media/xp/microsoft.jpg';ms.alt='Microsoft';loader.append(el('i'),el('i'),el('i'));
    target.replaceChildren(logo,loader,el('p','','Copyright © Microsoft Corporation'),ms);
  }
  async function boot(layer,login=false){
    if(layer.dataset.booting==='true')return;
    layer.dataset.booting='true';
    let reloading=false;
    let recoveryTimeout;
    try{
      layer.className='xp-power-layer xp-boot';
      bootContents(layer);
      const startupSound=sound(login?'logon':'startup',login?0:2.4);
      if(!login)await new Promise(resolve=>setTimeout(resolve,2400));
      sessionScreen(layer,'welcome');layer.classList.add('xp-welcome');
      await new Promise(resolve=>setTimeout(resolve,650));
      const desktop=window.xpDesktop;
      if(layer.dataset.reset==='true'){
        // Reset in place so the startup sound can finish after Welcome.
        try{
          const nextAppID=desktop?.state.nextAppID;
          desktop?.dispatch({type:'XP_RESET'});
          // Allow a deferred desktop render to commit before deciding to reload.
          for(let elapsed=0;elapsed<=500;elapsed+=50){
            if(window.xpDesktop?.state.nextAppID>nextAppID && document.querySelector('#root .footer__time') && document.querySelector('#root .ie__content__inner iframe:not([srcdoc])'))return;
            if(elapsed<500)await new Promise(resolve=>setTimeout(resolve,50));
          }
        }catch(error){console.warn('XP desktop reset failed:',error);}
        console.warn('XP desktop did not recover; reloading after the startup sound.');
        await Promise.race([startupSound,new Promise(resolve=>{recoveryTimeout=setTimeout(resolve,6000);})]);
        window.location.reload();
        reloading=true;
      }else if(desktop)desktop.dispatch({type:desktop.cancelPower});
    }finally{
      clearTimeout(recoveryTimeout);
      // Keep Welcome visible until navigation replaces the document.
      if(!reloading){
        document.querySelectorAll('body > .xp-power-layer').forEach(overlay=>overlay.remove());
        layer.remove();
      }
      lastActivity=Date.now();
    }
  }
  window.xpExtras={
    menu(name){
      document.querySelectorAll('.menu__item img').forEach(img=>{icons[img.alt]=img.src;});
      if(name==='Windows Messenger'){messenger();return true;}
      const actions={'My Computer':()=>explorer(),'My Documents':()=>explorer('My Documents'),'My Pictures':()=>explorer('My Pictures'),'My Music':()=>explorer('My Music'),'My Recent Documents':()=>explorer('My Recent Documents'),'Search':search,'Run...':()=>run(),'Control Panel':controlPanel,'Command Prompt':()=>execute('cmd'),'Windows Media Player':()=>explorer('My Music')};
      const recent=read('xp-recent',[]).find(f=>f.name===name);
      if(actions[name]){actions[name]();return true;}
      if(recent){openFile(recent);return true;}
      return false;
    },
    recentItems(fallback){const recent=read('xp-recent',[]);return recent.length?recent.map(f=>({type:'item',text:f.name,icon:icons[f.kind]||window.xpDesktop.apps['Internet Explorer'].header.icon})):fallback;},
    power(name){power({'Turn Off':'off',Restart:'restart','Log Off':'logoff','Switch User':'login'}[name]||'standby');},
    playerReady
  };
  new MutationObserver(trackBrowser).observe(document.getElementById('root'),{childList:true,subtree:true});
  ['pointerdown','keydown','pointermove'].forEach(event=>document.addEventListener(event,()=>lastActivity=Date.now()));
  setInterval(()=>{const idle=Date.now()-lastActivity;if(settings.monitorDelay&&idle>settings.monitorDelay*1000&&!document.querySelector('.xp-power-layer')){power('standby');lastActivity=Date.now();}else if(idle>settings.delay*1000)screensaver();},1000);
  applySettings();
  if(new URLSearchParams(location.search).get('power')==='off'){
    const layer=el('div','xp-power-layer xp-off');
    document.body.append(layer);
    void deskScene(layer,null,true);
  }
}());
