import{S as h,i as y,n as b,E as c,G as g,H as w,I as E,J as k,e as A,j as u,w as N,K as q,c as I,d as m,l as f,x as K,b as p,L as T,f as _,y as C,M as D,N as L,O as S,q as $,o as v,B as j}from"../chunks/index-491e0afe.js";import{c as B,s as G,a as H}from"../chunks/app-b36d9115.js";import"../chunks/index-3e2eb5a0.js";const J=o=>{if(!o)return!1;const{tagName:t}=o;return t==="INPUT"||t==="TEXTAREA"||o.contentEditable==="true"};function M(o){let t,r;return{c,l:c,m(a,n){t||(r=g(window,"keydown",o[1]),t=!0)},p:c,i:c,o:c,d(a){t=!1,r()}}}function O(o,t,r){let a,n=c,l=()=>(n(),n=w(i,e=>r(2,a=e)),i);o.$$.on_destroy.push(()=>n());let{devmode:i}=t;l();const s=e=>{J(e.target)||e.key==="`"&&E(i,a=!a,a)};return o.$$set=e=>{"devmode"in e&&l(r(0,i=e.devmode))},[i,s]}class P extends h{constructor(t){super();y(this,t,O,M,b,{devmode:0})}}function R(o){let t,r,a,n,l;const i=o[2].default,s=k(i,o,o[1],null);return n=new P({props:{devmode:o[0]}}),{c(){t=A("link"),r=u(),s&&s.c(),a=u(),N(n.$$.fragment),this.h()},l(e){const d=q('[data-svelte="svelte-mbtc4y"]',document.head);t=I(d,"LINK",{rel:!0,href:!0}),d.forEach(m),r=f(e),s&&s.l(e),a=f(e),K(n.$$.fragment,e),this.h()},h(){document.title="spiderspace: blocks",p(t,"rel","icon"),p(t,"href","/favicon.png")},m(e,d){T(document.head,t),_(e,r,d),s&&s.m(e,d),_(e,a,d),C(n,e,d),l=!0},p(e,[d]){s&&s.p&&(!l||d&2)&&D(s,i,e,e[1],l?S(i,e[1],d,null):L(e[1]),null)},i(e){l||($(s,e),$(n.$$.fragment,e),l=!0)},o(e){v(s,e),v(n.$$.fragment,e),l=!1},d(e){m(t),e&&m(r),s&&s.d(e),e&&m(a),j(n,e)}}}function U(o,t,r){let{$$slots:a={},$$scope:n}=t;const l=B();G(l);const i=H(!1);return o.$$set=s=>{"$$scope"in s&&r(1,n=s.$$scope)},[i,n,a]}class F extends h{constructor(t){super();y(this,t,U,R,b,{})}}export{F as default};
