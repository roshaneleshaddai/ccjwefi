(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[949],{3628:(e,s,t)=>{Promise.resolve().then(t.bind(t,9812))},9812:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>d});var a=t(5155),l=t(8173),n=t.n(l),r=t(2115),c=t(6046),o=t(2615),i=t(1536);function d(){var e,s;let[t,l]=(0,r.useState)(!1),[d,x]=(0,r.useState)(null),m=(0,r.useRef)(null);(0,c.useRouter)(),(0,r.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/auth/session"),s=await e.json();x(s)}catch(e){console.error("Failed to fetch session:",e)}})()},[]);let u=async()=>{await (0,o.signOut)({callbackUrl:"/"})};return(0,r.useEffect)(()=>{let e=e=>{m.current&&!m.current.contains(e.target)&&l(!1)};return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}},[]),(0,a.jsx)("header",{className:"bg-white shadow-md fixed w-full top-0 z-50",children:(0,a.jsxs)("div",{className:"container mx-auto flex items-center justify-between p-4",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,a.jsx)("img",{src:"/images/logo.png",alt:"Logo",className:"h-10 w-10"}),(0,a.jsx)("span",{className:"text-xl font-bold text-[#04bab1]",children:"Job Seeker"})]}),(0,a.jsxs)("nav",{className:"flex items-center space-x-6 relative",children:[(0,a.jsxs)(n(),{href:"/employer",className:"flex items-center space-x-2 text-gray-700 hover:text-[#04bab1] transition-colors",children:[(0,a.jsx)(i.rQ8,{className:"text-lg"}),(0,a.jsx)("span",{children:"Home"})]}),(0,a.jsxs)(n(),{href:"/employer/applications",className:"flex items-center space-x-2 text-gray-700 hover:text-[#04bab1] transition-colors",children:[(0,a.jsx)(i.t69,{className:"text-lg"}),(0,a.jsx)("span",{children:"Applications"})]}),(0,a.jsxs)("button",{onClick:()=>{l(e=>!e)},className:"flex items-center space-x-2 text-gray-700 hover:text-[#04bab1] transition-colors focus:outline-none",children:[(0,a.jsx)(i.x$1,{className:"text-lg"}),(0,a.jsx)("span",{children:"Profile"})]}),t&&(0,a.jsxs)("div",{ref:m,className:"absolute right-0 mt-80 bg-white rounded-md shadow-lg z-10 p-4",children:[(0,a.jsx)("h3",{className:"text-lg font-bold text-gray-800",children:"Employer Profile"}),(0,a.jsxs)("p",{className:"text-gray-700 mt-2",children:[(0,a.jsx)("span",{className:"font-semibold",children:"Name:"})," ",(null==d?void 0:null===(e=d.user)||void 0===e?void 0:e.name)||"N/A"]}),(0,a.jsxs)("p",{className:"text-gray-700",children:[(0,a.jsx)("span",{className:"font-semibold",children:"Email:"})," ",(null==d?void 0:null===(s=d.user)||void 0===s?void 0:s.email)||"N/A"]}),(0,a.jsx)("button",{className:"mt-2 block w-full bg-[#04bab1] text-white py-2 rounded-md text-center font-semibold hover:bg-red-600",onClick:u,children:"Logout"})]})]})]})})}}},e=>{var s=s=>e(e.s=s);e.O(0,[6711,2615,3794,8441,1517,7358],()=>s(3628)),_N_E=e.O()}]);