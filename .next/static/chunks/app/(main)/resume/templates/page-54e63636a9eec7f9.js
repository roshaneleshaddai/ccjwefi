(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2043],{3968:(e,a,s)=>{Promise.resolve().then(s.bind(s,5451))},5451:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>l});var t=s(5155),i=s(2115),r=s(6046);function l(){let[e,a]=(0,i.useState)(!1),s=(0,r.useRouter)(),l=async e=>{a(!0);try{var t,i,r;let a=await fetch("/api/auth/session").then(e=>e.json());console.log(null==a?void 0:null===(t=a.user)||void 0===t?void 0:t.id);let l=await fetch("/api/user/checkFields",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:null==a?void 0:null===(i=a.user)||void 0===i?void 0:i.id})}),o=await l.json();l.ok?(console.log("fields exist"),s.push("/resume/templates/".concat(e,"?id=").concat(null==a?void 0:null===(r=a.user)||void 0===r?void 0:r.id))):alert(o.error||"User details incomplete. Please update your profile.")}catch(e){console.error(e),alert("An error occurred while checking fields.")}finally{a(!1)}};return(0,t.jsx)("div",{className:"min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 py-12",children:(0,t.jsxs)("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",children:[(0,t.jsx)("h1",{className:"text-4xl font-bold text-center text-indigo-900 mb-8",children:"Choose Your Resume Template"}),(0,t.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",children:[{id:"template1",image:"https://www.visualcv.com/static/e7599b84ef3cc2e749bbc489497fb9e5/46a2d/Blank_professional_resume_template_-_Arya.png",name:"Creative"},{id:"template2",image:"https://www.visualcv.com/static/e7599b84ef3cc2e749bbc489497fb9e5/46a2d/Blank_professional_resume_template_-_Arya.png",name:"IT"},{id:"template3",image:"https://www.visualcv.com/static/e7599b84ef3cc2e749bbc489497fb9e5/46a2d/Blank_professional_resume_template_-_Arya.png",name:"Marketing"},{id:"template4",image:"https://www.visualcv.com/static/e7599b84ef3cc2e749bbc489497fb9e5/46a2d/Blank_professional_resume_template_-_Arya.png",name:"Business"},{id:"template5",image:"https://www.visualcv.com/static/e7599b84ef3cc2e749bbc489497fb9e5/46a2d/Blank_professional_resume_template_-_Arya.png",name:"Intern"},{id:"template6",image:"https://www.visualcv.com/static/e7599b84ef3cc2e749bbc489497fb9e5/46a2d/Blank_professional_resume_template_-_Arya.png",name:"Master"}].map(e=>(0,t.jsxs)("div",{onClick:()=>l(e.id),className:"group cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("img",{src:e.image,alt:"Template ".concat(e.id),className:"w-full h-64 object-cover"}),(0,t.jsx)("div",{className:"absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"})]}),(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-semibold text-indigo-900 mb-2",children:e.name}),(0,t.jsxs)("p",{className:"text-gray-600",children:["A professional and modern resume template for ",e.name.toLowerCase()," professionals."]}),(0,t.jsx)("button",{className:"mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300",children:"Use This Template"})]})]},e.id))}),e&&(0,t.jsx)("div",{className:"mt-8 text-center",children:(0,t.jsx)("p",{className:"text-indigo-600",children:"Loading..."})})]})})}},6046:(e,a,s)=>{"use strict";var t=s(6658);s.o(t,"useParams")&&s.d(a,{useParams:function(){return t.useParams}}),s.o(t,"useRouter")&&s.d(a,{useRouter:function(){return t.useRouter}}),s.o(t,"useSearchParams")&&s.d(a,{useSearchParams:function(){return t.useSearchParams}})}},e=>{var a=a=>e(e.s=a);e.O(0,[8441,1517,7358],()=>a(3968)),_N_E=e.O()}]);