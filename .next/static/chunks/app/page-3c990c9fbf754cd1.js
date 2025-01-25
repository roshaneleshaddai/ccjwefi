(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8974],{3550:(e,s,t)=>{Promise.resolve().then(t.bind(t,6482))},6482:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>u});var a=t(5155),l=t(2615),n=t(2115),r=t(6046),i=t(2110);function u(){let{data:e,status:s}=(0,l.useSession)(),[t,u]=(0,n.useState)("signin"),[o,c]=(0,n.useState)(""),[d,m]=(0,n.useState)(""),[g,x]=(0,n.useState)(""),[b,p]=(0,n.useState)(""),[h,f]=(0,n.useState)(""),[j,y]=(0,n.useState)(""),[N,v]=(0,n.useState)(""),[w,S]=(0,n.useState)("job_seeker"),[k,C]=(0,n.useState)(""),[P,_]=(0,n.useState)({}),q=(0,r.useRouter)(),R=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),O=e=>e.length>=6,E=e=>/^\d{10}$/.test(e),I=async e=>{e.preventDefault();let s={};if(R(o)||(s.email="Invalid email format."),O(d)||(s.password="Password must be at least 6 characters."),Object.keys(s).length>0){_(s);return}let t=await (0,l.signIn)("credentials",{redirect:!1,email:o,password:d});if(null==t?void 0:t.error)x(t.error),i.oR.error(t.error);else{var a;let e=await fetch("/api/auth/session").then(e=>e.json()),s=null==e?void 0:null===(a=e.user)||void 0===a?void 0:a.role;"job_seeker"===s?q.push("/dashboard"):"employer"===s&&q.push("/employer")}},D=async e=>{e.preventDefault();let s={};if(b||(s.name="Name is required."),R(o)||(s.email="Invalid email format."),O(d)||(s.password="Password must be at least 6 characters."),N&&!E(N)&&(s.phone="Phone number must be 10 digits."),Object.keys(s).length>0){_(s);return}let t=await fetch("/api/auth/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:b,email:o,password:d,role:w,contact:k,dob:j,username:h})});if(t.ok)u("signin"),i.oR.success("Sign-up successful! You can now sign in.");else{let e=await t.json();i.oR.error(e.message||"Sign-up failed. Try again.")}};return e?(0,a.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-100",children:[(0,a.jsxs)("p",{children:["Signed in as ",e.user.email]}),(0,a.jsx)("button",{onClick:()=>(0,l.signOut)(),className:"mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600",children:"Sign out"})]}):(0,a.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4",children:[(0,a.jsx)("h1",{className:"text-2xl font-bold mb-6",children:"signin"===t?"Sign In":"Sign Up"}),g&&(0,a.jsx)("p",{className:"text-red-500 mb-4",children:g}),(0,a.jsxs)("div",{className:"flex mb-6 bg-gray-200 rounded-full p-1",children:[(0,a.jsx)("button",{onClick:()=>u("signin"),className:"px-6 py-2 rounded-full transition-colors ".concat("signin"===t?"bg-blue-500 text-white":"bg-transparent text-gray-700"),children:"Sign In"}),(0,a.jsx)("button",{onClick:()=>u("signup"),className:"px-6 py-2 rounded-full transition-colors ".concat("signup"===t?"bg-blue-500 text-white":"bg-transparent text-gray-700"),children:"Sign Up"})]}),(0,a.jsx)(i.N9,{}),"signin"===t?(0,a.jsxs)("form",{onSubmit:I,className:"w-full max-w-md bg-white p-8 rounded-lg shadow-md",children:[(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Email"}),(0,a.jsx)("input",{type:"email",value:o,onChange:e=>c(e.target.value),className:"w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0}),P.email&&(0,a.jsx)("p",{className:"text-red-500 text-sm mt-1",children:P.email})]}),(0,a.jsxs)("div",{className:"mb-6",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Password"}),(0,a.jsx)("input",{type:"password",value:d,onChange:e=>m(e.target.value),className:"w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0}),P.password&&(0,a.jsx)("p",{className:"text-red-500 text-sm mt-1",children:P.password})]}),(0,a.jsx)("button",{type:"submit",className:"w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors",children:"Sign In"})]}):(0,a.jsxs)("form",{onSubmit:D,className:"w-full max-w-md bg-white p-8 rounded-lg shadow-md",children:[(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Full Name"}),(0,a.jsx)("input",{type:"text",value:b,onChange:e=>p(e.target.value),className:"w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0}),P.name&&(0,a.jsx)("p",{className:"text-red-500 text-sm mt-1",children:P.name})]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Email"}),(0,a.jsx)("input",{type:"email",value:o,onChange:e=>c(e.target.value),className:"w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0}),P.email&&(0,a.jsx)("p",{className:"text-red-500 text-sm mt-1",children:P.email})]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Password"}),(0,a.jsx)("input",{type:"password",value:d,onChange:e=>m(e.target.value),className:"w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0}),P.password&&(0,a.jsx)("p",{className:"text-red-500 text-sm mt-1",children:P.password})]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Role"}),(0,a.jsxs)("select",{value:w,onChange:e=>S(e.target.value),className:"w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0,children:[(0,a.jsx)("option",{value:"job_seeker",children:"Job Seeker"}),(0,a.jsx)("option",{value:"employer",children:"Employer"})]})]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Contact"}),(0,a.jsx)("input",{type:"text",value:k,onChange:e=>C(e.target.value),className:"w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Date of Birth"}),(0,a.jsx)("input",{type:"date",value:j,onChange:e=>y(e.target.value),className:"w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",required:!0})]}),(0,a.jsx)("button",{type:"submit",className:"w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors",children:"Sign Up"})]})]})}t(5716)},6046:(e,s,t)=>{"use strict";var a=t(6658);t.o(a,"useParams")&&t.d(s,{useParams:function(){return a.useParams}}),t.o(a,"useRouter")&&t.d(s,{useRouter:function(){return a.useRouter}}),t.o(a,"useSearchParams")&&t.d(s,{useSearchParams:function(){return a.useSearchParams}})},5716:()=>{}},e=>{var s=s=>e(e.s=s);e.O(0,[4797,2615,2110,8441,1517,7358],()=>s(3550)),_N_E=e.O()}]);