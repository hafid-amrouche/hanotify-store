"use strict";(self.webpackChunkhanotify_store=self.webpackChunkhanotify_store||[]).push([[3921],{4397:(e,t,i)=>{i.d(t,{A:()=>d});i(5043);var o=i(149),r=i(1186),s=i(5475),c=(i(6367),i(3550)),l=i(2327),n=i(579);const d=e=>{let{product:t,sectionDesign:i}=e;const{theme:d,device:a}=(0,r.o)(),p="mobile"===a,u=i.products,{bordersRounded:h,borderColor:v,backgroundColor:j,borderWidth:f,product:{image:{aspectRatio:g,objectFit:y},title:{size:x,color:b},price:{size:m,color:w}}}=u,C="#00000000"===j[d]?i.backgroundColor[d]:j[d],k=v[d],z=b[d],A=w[d],S=p?4:8,_=t.slug?s.N_:"div";return(0,n.jsx)(_,{to:"/products/".concat(t.slug,"/").concat(t.product_id),children:(0,n.jsx)("div",{style:{overflow:"hidden",borderRadius:h?S:void 0,border:"".concat(f,"px solid ").concat(k)},children:(0,n.jsxs)("div",{style:{backgroundColor:C},children:[null!==t.image&&(0,n.jsx)(c.A,{style:{width:"100%",aspectRatio:g,objectFit:y},src:t.image}),null===t.image&&(0,n.jsx)(l.A,{aspectRatio:g,fill:"var(--primaryColor)"}),(0,n.jsxs)("div",{className:"px-1",children:[(0,n.jsx)("h4",{className:"cut-text",style:{fontSize:x,color:z},children:t.title}),t.price?(0,n.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,n.jsxs)("h4",{style:{color:A,fontSize:m},children:[t.price," ",(0,o.cv)("DA")," "]}),t.original_price&&(0,n.jsxs)("h4",{style:{fontSize:m,color:"var(---greyColor)",textDecoration:"line-through",fontSize:m},children:[t.original_price," ",(0,o.cv)("DA")," "]})]}):(0,n.jsxs)("h4",{style:{color:"red",fontSize:m},children:[t.price," ",(0,o.cv)("No price")," "]})]})]})})})}},7593:(e,t,i)=>{i.r(t),i.d(t,{default:()=>d});i(5043);var o=i(4975),r=i(8385),s=(i(4014),i(4397)),c=i(1186),l=i(5507),n=i(579);const d=e=>{var t,i;let{section:d}=e;const{device:a}=(0,c.o)(),p="products-container"===d.type||"category"===d.type,u="swiper"===d.type,h=p?d.design[a]:u?d.design:{},[v,j]=p?[h.products.justifyContent,h.products.product.width]:[h.justifyContent,h.image.width],f={pagination:{clickable:!0},grabCursor:!0,className:"mySwiper2",centerInsufficientSlides:"center"===v||"space-evenly"===v,effect:"creative",creativeEffect:{prev:{translate:["-100%",0,-500]},next:{translate:["100%",0,-500]}},style:{width:j,overflow:"unset"},modules:[r.$j],slidesPerView:1,spaceBetween:0};return(0,n.jsx)("div",{style:{overflowX:"clip"},children:(0,n.jsxs)(o.RC,{...f,children:[p&&(null===(t=d.products)||void 0===t?void 0:t.map((e=>(0,n.jsx)(o.qr,{style:{width:"100%"},children:(0,n.jsx)(s.A,{sectionDesign:h,product:e})},e.product_id)))),u&&(null===(i=d.imageObjects)||void 0===i?void 0:i.map((e=>(0,n.jsx)(o.qr,{style:{width:"100%"},children:(0,n.jsx)(l.A,{sectionDesign:h,imageObject:e})},e.url))))]})})}}}]);
//# sourceMappingURL=3921.610101a8.chunk.js.map