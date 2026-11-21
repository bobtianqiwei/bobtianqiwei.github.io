// patch-winxp-extras.js developed by Bob Tianqi Wei
// Keep the vendored desktop intact; expose its existing React app dispatcher.
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../swe/winxp/static/js/main.df788235.js');
let source = fs.readFileSync(file, 'utf8');
const patches = [
  ['nextZIndex:e.nextZIndex+Gr.length,focusing:zt};case Bt:', 'nextZIndex:e.nextZIndex+Gr.length,focusing:zt,powerState:Gt,selecting:null,icons:e.icons.map(icon=>({...icon,isFocus:false}))};case Bt:'],
  ['src:ii,alt:"",style:{marginLeft:"5px",height:"18px"}', 'src:"/swe/winxp/static/media/all-programs.png",alt:"",style:{marginLeft:"5px",width:"18px",height:"18px",flexShrink:0}'],
  ['static/media/all-programs.bcaf5973986a068c6a92.ico', 'static/media/all-programs.png'],
  ['icon:_n,children:"All Programs"', 'icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mNgAAIAAAUAAen63NgAAAAASUVORK5CYII=",children:"All Programs"'],
  ['img:Xr,text:"Restart"', 'img:"/swe/winxp/static/media/xp/Restart.png",text:"Restart"'],
  ['(0,Wt.jsx)($r,{img:Hr,text:"Stand By"})', '(0,Wt.jsx)(Zr,{img:"/swe/winxp/static/media/xp/standby.png",text:"Stand By",onClick:r})'],
  ['switch(t.type){case Bt:', 'switch(t.type){case "XP_UPDATE_APP":return {...e,apps:e.apps.map(app=>app.id===t.payload.id?{...app,header:{...app.header,title:t.payload.title}}:app)};case "XP_RESET":return {...e,apps:Gr.map((app,index)=>({...app,id:e.nextAppID+index,zIndex:e.nextZIndex+index})),nextAppID:e.nextAppID+Gr.length,nextZIndex:e.nextZIndex+Gr.length,focusing:zt,powerState:Gt,selecting:null,icons:e.icons.map(icon=>({...icon,isFocus:false}))};case Bt:'],
  ['[r]);return(0,Wt.jsxs)(Yi,', '[r]);window.xpDesktop={React:e,apps:Jr,dispatch:r,add:Bt,cancelPower:Qt,state:n};return(0,Wt.jsxs)(Yi,'],
  ['onClickMenuItem:function(e){r("Internet"', 'onClickMenuItem:function(e){if(window.xpExtras&&window.xpExtras.menu(e))return;r("Internet"'],
  ['onDoubleClick:function(e){var t=Object.values(Jr)', 'onDoubleClick:function(e){if(e===Jr["My Computer"].component&&window.xpExtras){window.xpExtras.menu("My Computer");return;}var t=Object.values(Jr)'],
  ['onClickButton:function(e){r({type:Qt}),r({type:Bt,payload:Jr.Error})}', 'onClickButton:function(e){r({type:Qt});if(window.xpExtras)window.xpExtras.power(e)}'],
  ['children:"Log Off Windows"', 'children:t===Jt?"Turn off computer":"Log Off Windows"'],
  ['data:ui,onClick:r', 'data:window.xpExtras?window.xpExtras.recentItems(ui):ui,onClick:r'],
  ['e.appendChild(document.querySelector("#webamp"))', 'e.appendChild(document.querySelector("#webamp"));window.xpWebamp=a.current;if(window.xpExtras)window.xpExtras.playerReady(a.current)'],
  ['a.current.dispose(),a.current=null', 'window.xpWebamp=null,a.current.dispose(),a.current=null']
];
for (const [before, after] of patches) {
  if (source.includes(after)) continue;
  if (source.split(before).length !== 2) throw new Error('Desktop patch anchor changed: ' + before);
  source = source.replace(before, after);
}
fs.writeFileSync(file, source);
