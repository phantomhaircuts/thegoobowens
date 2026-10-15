const reel=document.querySelector('#reel'),stage=document.querySelector('#stage'),leader=document.querySelector('#leader'),count=document.querySelector('#count'),pause=document.querySelector('#pause'),sound=document.querySelector('#sound');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let timer,remaining=3;
function finishIntro(){clearInterval(timer);leader.classList.add('done');if(!reduced)reel.play().catch(()=>{pause.innerHTML='PLAY <span>▶</span>';pause.setAttribute('aria-label','Play reel')});}
if(reduced){reel.pause();finishIntro()}else{timer=setInterval(()=>{remaining--;if(remaining>0)count.textContent=remaining;else finishIntro()},900)}
document.querySelector('#skip').addEventListener('click',finishIntro);
document.querySelector('#watch').addEventListener('click',()=>{stage.classList.add('cinema');reel.currentTime=0;reel.muted=false;reel.play().catch(()=>{});document.querySelector('#close').focus()});
function closeCinema(){stage.classList.remove('cinema');reel.muted=true;document.querySelector('#watch').focus()}
document.querySelector('#close').addEventListener('click',closeCinema);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&stage.classList.contains('cinema'))closeCinema()});
pause.addEventListener('click',()=>{if(reel.paused)reel.play().catch(()=>{});else reel.pause()});
function updatePlayback(){pause.innerHTML=reel.paused?'PLAY <span>▶</span>':'PAUSE <span>Ⅱ</span>';pause.setAttribute('aria-label',reel.paused?'Play reel':'Pause reel')}
reel.addEventListener('play',updatePlayback);reel.addEventListener('pause',updatePlayback);
sound.addEventListener('click',()=>{reel.muted=!reel.muted});reel.addEventListener('volumechange',()=>{sound.innerHTML=reel.muted?'SOUND OFF <span>⊘</span>':'SOUND ON <span>♫</span>';sound.setAttribute('aria-label',reel.muted?'Enable reel sound':'Mute reel sound')});reel.addEventListener('timeupdate',()=>{document.querySelector('#progress').style.width=(reel.currentTime/reel.duration*100||0)+'%'});document.querySelector('#year').textContent=new Date().getFullYear();
