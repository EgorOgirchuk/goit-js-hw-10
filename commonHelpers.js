import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as m,i as h}from"./assets/vendor-77e16229.js";/* empty css                      */let n=null,i=null;const y={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){if(document.querySelector("[data-start]").disabled=!1,i=new Date,console.log(e[0]),n=new Date(e[0]),console.log(n),n.getTime()<i.getTime()){h.error({title:"Hey",message:"Please choose a date in the future",position:"topRight"}),document.querySelector("[data-start]").disabled=!0;return}}};function f(e){const r=Math.floor(e/864e5),d=Math.floor(e%864e5/36e5),u=Math.floor(e%864e5%36e5/6e4),l=Math.floor(e%864e5%36e5%6e4/1e3);return{days:r,hours:d,minutes:u,seconds:l}}m("#datetime-picker",y);const g=document.querySelector("[data-start]");g.addEventListener("click",()=>{let e=setInterval(()=>{const t=n.getTime()-new Date().getTime();if(console.log(t),t<=0){clearInterval(e);return}const{days:a,hours:s,minutes:c,seconds:r}=f(t);document.querySelector("[data-days]").innerHTML=o(a),document.querySelector("[data-hours]").innerHTML=o(s),document.querySelector("[data-minutes]").innerHTML=o(c),document.querySelector("[data-seconds]").innerHTML=o(r)},1e3);document.querySelector("[data-start]").disabled=!0});function o(e){for(e=e.toString();e.length<2;)e="0"+e;return e}
//# sourceMappingURL=commonHelpers.js.map
