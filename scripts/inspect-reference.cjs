const { chromium } = require('playwright');
const fs = require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.goto('https://marcimetzger.com/',{waitUntil:'domcontentloaded',timeout:60000});
 await page.waitForTimeout(8000); for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=700){await page.evaluate(y=>scrollTo(0,y),y); await page.waitForTimeout(200);}
 await page.waitForTimeout(2000);
 await page.screenshot({path:'research/reference-desktop.png',fullPage:true});
 fs.writeFileSync('research/rendered.html',await page.content());
 const inventory=await page.evaluate(()=>({text:document.body.innerText,images:[...document.images].map(i=>({src:i.currentSrc,alt:i.alt})),links:[...document.querySelectorAll('a')].map(a=>({text:a.innerText,label:a.getAttribute('aria-label'),href:a.href})),frames:[...document.querySelectorAll('iframe')].map(i=>i.src),forms:[...document.querySelectorAll('form')].map(f=>({html:f.outerHTML})),selects:[...document.querySelectorAll('select')].map(s=>({name:s.name,html:s.outerHTML}))}));
 fs.writeFileSync('research/inventory.json',JSON.stringify({...inventory,errors},null,2));
 await page.setViewportSize({width:390,height:844}); await page.goto('https://marcimetzger.com/',{waitUntil:'domcontentloaded'});
 await page.waitForTimeout(8000); for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=700){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(150);}
 await page.screenshot({path:'research/reference-mobile.png',fullPage:true});
 console.log(JSON.stringify({...inventory,forms:inventory.forms.map(f=>f.html.slice(0,500)),images:inventory.images.filter(i=>!i.src.startsWith('data:')),errors},null,2));
 await browser.close();
})();

