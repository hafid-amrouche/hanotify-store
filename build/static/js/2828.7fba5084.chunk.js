"use strict";(self.webpackChunkhanotify_store=self.webpackChunkhanotify_store||[]).push([[2828],{8381:(e,t,i)=>{i.d(t,{A:()=>u});var s=i(5043),r=i(8130),n=i(1186),o=i(3216);const l=()=>{const e=(0,o.Zp)();return()=>{const t=window.location.pathname.split("/").slice(0,-1).join("/");e(t)}};var a=i(4975),c=i(8385),d=(i(4014),i(5084),i(3550)),h=i(579);function p(e,t){if(t){const i=t.offsetLeft,s=t.offsetWidth,r=i-e.offsetWidth/2+s/2;e.scrollTo({left:r,behavior:"smooth"})}}p();const m=(0,s.forwardRef)(((e,t)=>{let{fullscreen:i}=e;const{currentImage:p,setCurrentImage:m,productData:u}=(0,r.useProductContext)(),{screenWidth:x}=(0,n.o)(),{galleryImages:g}=u,f=g.map(((e,t)=>({url:e,id:t}))),j=e=>{t.current.swiper.slideTo(e)},v=l(),w=(0,o.Zp)(),y=()=>{i?v():w("gallery")};(0,s.useEffect)((()=>{i?(document.getElementById("image-slider__container").classList.remove("p-sticky-md"),document.documentElement.style.overflow="hidden"):(document.getElementById("image-slider__container").classList.add("p-sticky-md"),document.documentElement.style.removeProperty("overflow"))}),[i]);const{language:b}=(0,n.o)(),N="ar"===b;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{style:{height:"100%",width:"100%",position:"absolute",top:0,left:0},children:(0,h.jsx)(a.RC,{className:"mySwiper",onClick:()=>!i&&y(),onSlideChange:e=>{m(f.find((t=>t.id===e.activeIndex)))},ref:t,initialSlide:p.id,modules:[c.GP,c.dK],pagination:{clickable:!0},style:{height:"100%",width:"100%",maxWidth:"100%",maxHeight:"100%",position:"absolute",top:0,left:0,"--swiper-pagination-color":"var(--primaryColor)"},zoom:!0,grabCursor:!0,children:f.map(((e,t)=>(0,h.jsx)(a.qr,{className:"".concat(i?"full-screen-image":""," flex-shrink-0"),children:(0,h.jsx)("div",{className:"swiper-zoom-container",children:(0,h.jsx)(d.A,{loading:"lazy",className:" ".concat(x>=768&&!i&&"border"),style:{display:"block",height:"100%",width:"100%",objectFit:i?"contain":"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center",flexShrink:0,position:"absolute",top:0,left:0},src:e.url,diam:200})})},t)))})}),(0,h.jsx)("button",{style:{top:"calc( 50% - 15px )"},className:N?" next":"prev",onClick:()=>{const e=f.findIndex((e=>e.id===p.id)),t=e>=1?e-1:0;m(f[t]),j(t)},children:"\u276e"}),(0,h.jsx)("button",{style:{top:"calc( 50% - 15px )"},className:N?" prev":"next",onClick:()=>{const e=f.findIndex((e=>e.id===p.id)),t=e<=f.length-2?e+1:e;m(f[t]),j(t)},children:"\u276f"}),(0,h.jsx)("i",{className:(i?"fa-solid fa-compress":"fa-solid fa-expand")+" fullscreen-btn",onClick:y})]})})),u=(0,s.memo)((e=>{let{fullscreen:t=!1}=e;const{swiperRef:i}=(0,r.useProductContext)(),{screenWidth:o}=(0,n.o)(),l=(0,s.useRef)(),[a,c]=(0,s.useState)({width:0,height:0}),d=t?window.innerWidth/window.innerHeight:1;(0,s.useEffect)((()=>{(()=>{const e=l.current,i=e.offsetWidth,s=e.offsetHeight-(window.innerWidth>=768&&!t?4:0);c(i/s>d?{width:s*d,height:s}:{width:i,height:i/d})})()}),[o]);const u=t?window.innerHeight:o<768?Math.min(document.documentElement.clientWidth,window.innerHeight):window.innerHeight;return p(document.querySelector(".swiper-pagination"),document.querySelector(".swiper-pagination-bullet.swiper-pagination-bullet-active")),(0,h.jsx)("div",{style:{height:"100%",width:"100%",position:t?"absolute":void 0,top:0,left:0,zIndex:t&&2},children:(0,h.jsx)("div",{ref:l,style:{position:"relative",background:t?"#000000":void 0,display:"flex",alignItems:"center",justifyContent:"center",height:u,width:"100%"},children:(0,h.jsxs)("div",{style:{...a,aspectRatio:d,position:"absolute",top:window.innerWidth>=768&&!t?4:0},children:[(0,h.jsx)("style",{children:"\n              .swiper{\n                display: flex !important;\n                justify-content: center\n              }\n              .swiper-pagination{\n                width: unset !important;\n                overflow-x: hidden;\n                flex-wrap: nowrap;\n                display: flex;\n                left: unset !important;\n                max-width: 90%\n              }\n              .swiper-pagination-bullet{\n                flex-shrink: 0\n              }\n            "}),(0,h.jsx)(m,{fullscreen:t,ref:i})]})})})}))},2327:(e,t,i)=>{i.d(t,{A:()=>r});i(5043);var s=i(579);const r=e=>{let{fill:t,aspectRatio:i=1}=e;return(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"#00000000",style:{width:"100%",aspectRatio:i},viewBox:"0 0 24 24",children:(0,s.jsx)("path",{d:"M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z",stroke:t,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2"})})}},419:(e,t,i)=>{i.r(t),i.d(t,{default:()=>j});var s=i(5043),r=i(8381),n=i(7922),o=i(2298),l=i(8130),a=i(149),c=i(579);const d=(0,s.memo)((()=>{const{productData:e}=(0,l.useProductContext)();return(0,c.jsxs)("div",{children:[(0,c.jsxs)("h2",{style:{lineHeight:1.4},children:[e.title,e.discount&&(0,c.jsx)("span",{style:{backgroundColor:"var(--primaryColor)",color:"var(--backgroundColor)",padding:"0 6px",margin:"0 8px",fontSize:14,whiteSpace:"nowrap",borderRadius:"var(--border-radius-2)"},children:e.discount})]}),e.miniDescription&&(0,c.jsx)("p",{style:{lineHeight:1.4,marginTop:8},children:e.miniDescription}),(0,c.jsxs)("div",{className:"d-flex align-items-center gap-3",children:[e.price?(0,c.jsxs)("h2",{className:"number",style:{color:"var(--primaryColor)"},children:[e.price," ",(0,a.cv)("DA")]}):"",e.originalPrice?(0,c.jsxs)("h3",{className:"old-price",children:[e.originalPrice," ",(0,a.cv)("DA")]}):"",!e.price&&!e.originalPrice&&(0,c.jsx)("h3",{style:{color:"red"},children:(0,a.cv)("No price available !")})]})]})}));var h=i(1494),p=i(6367),m=i(760),u=i(3216),x=i(4555),g=i(1186);const f=()=>{const{productData:e,setProductData:t}=(0,l.useProductContext)();return(0,c.jsx)(n.A,{productData:e,setProductData:t})},j=()=>{const{productData:e}=(0,l.useProductContext)();(0,m.A)();const{id:t}=(0,u.g)();(0,x.A)(t);const{device:i}=(0,g.o)(),s="mobile"===i;return(0,c.jsxs)("div",{className:"d-md-flex px-md-4 gap-md-3 flex-wrap",style:{minHeight:"100Vh",maxWidth:1340,width:"100%",margin:"auto"},children:[(0,c.jsxs)("div",{className:"col-12 col-md-6 px-md-4",children:[(0,c.jsx)(c.Fragment,{children:e.galleryImages.length>0&&(0,c.jsxs)("div",{style:{overflow:"hidden",height:"100%"},className:"p-sticky-md d-flex flex-column",id:"image-slider__container",children:[(0,c.jsx)(r.A,{}),s&&(0,c.jsx)("hr",{className:"border-color-primary-fiding"})]})}),(0,c.jsx)(c.Fragment,{children:0===e.galleryImages.length&&(0,c.jsx)("div",{className:"d-flex align-items-center justify-content-center",style:{aspectRatio:1,maxWidth:"100%",margin:"auto"},children:(0,c.jsx)("h3",{style:{color:"grey"},children:(0,a.cv)("No image was provider")})})})]}),(0,c.jsxs)("div",{className:"col-12 col-md-6 px-2 px-lg-4 d-flex flex-column gap-1 p-1 mt-1 px-md-4",children:[(0,c.jsx)(d,{}),e.pricesAndImagesList.length>0&&(0,c.jsx)(f,{}),(0,c.jsx)("div",{className:"mt-3",children:(0,c.jsx)(o.A,{productData:e})}),e.richText&&(0,c.jsx)(p.A,{className:"p-1 my-4 sun-editor-editable",dangerouslySetInnerHTML:{__html:e.richText}})]}),(0,c.jsxs)(p.A,{className:"flex-1",children:[(0,c.jsx)("hr",{className:"my-3 border"}),(0,c.jsx)(h.A,{})]})]})}},1494:(e,t,i)=>{i.d(t,{A:()=>m});var s=i(5043),r=i(8130),n=i(149),o=i(5475),l=i(3550),a=i(2327),c=i(579);const d=e=>{let{product:t}=e;const i=t.slug?o.N_:"div";return(0,c.jsxs)(i,{style:{border:"1px solid var(--border-color)",display:"flex",flexDirection:"column",borderRadius:"var(--border-radius-1)",width:152,overflow:"hidden"},to:"/products/".concat(t.slug,"/").concat(t.product_id),children:[null!==t.image&&(0,c.jsx)(l.A,{style:{width:"100%",aspectRatio:1,objectFit:"cover"},src:t.image}),null===t.image&&(0,c.jsx)(a.A,{aspectRatio:1,fill:"var(--primaryColor)"}),(0,c.jsxs)("div",{className:"px-1",children:[(0,c.jsx)("h4",{className:"cut-text",children:t.title}),(0,c.jsxs)("div",{className:"d-flex gap-2",children:[(0,c.jsxs)("h5",{className:"color-primary",children:[t.price||0," ",(0,n.cv)("DA")]}),t.originalPrice&&(0,c.jsxs)("h5",{className:"old-price",children:[t.originalPrice," ",(0,n.cv)("DA")]})]})]})]})};var h=i(1634),p=i(4113);const m=()=>{const[e,t]=(0,s.useState)(null),{productData:i}=(0,r.useProductContext)(),[n,o]=(0,s.useState)(!0);return(0,s.useEffect)((()=>{(async()=>{try{const e=await fetch(h.y+"/product/get-related-products?product_id="+i.productId,{});if(!e.ok)return console.log("Error: ".concat(e.status," ").concat(e.statusText)),void o(!1);t(await e.json()),o(!1)}catch(e){console.log(e),o(!1)}})()}),[]),(0,c.jsxs)("div",{className:"d-flex flex-wrap gap-2 p-2 justify-content-center col-12",children:[!n&&e&&e.map((e=>(0,c.jsx)(d,{product:e},e.index))),n&&(0,c.jsx)(p.A,{diam:160,color:"var(--primaryColor)"})]})}},5084:()=>{}}]);
//# sourceMappingURL=2828.7fba5084.chunk.js.map