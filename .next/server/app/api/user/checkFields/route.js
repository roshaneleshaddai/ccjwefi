(()=>{var e={};e.id=781,e.ids=[781],e.modules={56037:e=>{"use strict";e.exports=require("mongoose")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},93416:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>m,routeModule:()=>d,serverHooks:()=>y,workAsyncStorage:()=>c,workUnitAsyncStorage:()=>g});var n={};r.r(n),r.d(n,{POST:()=>l});var s=r(42706),o=r(28203),i=r(45994),a=r(39187),p=r(81755),u=r(70925);async function l(e){try{await (0,p.$)(),console.log("db connected");let t=await e.json();console.log(t);let{userId:r}=t;if(console.log(r),!r)return a.NextResponse.json({error:"User ID is required"},{status:400});let n=await u.A.findById(r);if(!n)return a.NextResponse.json({error:"User not found"},{status:404});let{education:s,skills:o,workExperience:i,certifications:l}=n;if(!s.length||!o.length||!i.length)return a.NextResponse.json({error:"Incomplete profile. Please fill all required fields by editing your profile in profile page."},{status:400});return console.log(n),a.NextResponse.json({data:n})}catch(e){return console.error("Error checking user fields:",e),a.NextResponse.json({error:"Internal server error"},{status:500})}}let d=new s.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/api/user/checkFields/route",pathname:"/api/user/checkFields",filename:"route",bundlePath:"app/api/user/checkFields/route"},resolvedPagePath:"D:\\job seeker\\job_seeker\\app\\api\\user\\checkFields\\route.js",nextConfigOutput:"",userland:n}),{workAsyncStorage:c,workUnitAsyncStorage:g,serverHooks:y}=d;function m(){return(0,i.patchFetch)({workAsyncStorage:c,workUnitAsyncStorage:g})}},96487:()=>{},78335:()=>{},70925:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var n=r(56037),s=r.n(n);let o=new(s()).Schema({userId:{type:String,required:!0},name:{type:String,required:!0},email:{type:String,required:!0,unique:!0},password:{type:String,required:!0},role:{type:String,enum:["job_seeker","employer"],required:!0},contact:{type:String},location:{type:String},skills:[{type:String}],education:[{institution:{type:String},degree:{type:String},fieldOfStudy:{type:String},year:{type:String}}],workExperience:[{company:{type:String},position:{type:String},startDate:{type:Date},endDate:{type:Date},description:{type:String}}],certifications:[{type:String}],portfolioLinks:{github:{type:String},linkedin:{type:String},website:{type:String}},profile_photo:{type:String},createdAt:{type:Date,default:Date.now},updatedAt:{type:Date,default:Date.now}}),i=s().models.User||s().model("User",o)},81755:(e,t,r)=>{"use strict";r.d(t,{$:()=>i});var n=r(56037),s=r.n(n);let o=global.mongoose;async function i(){return o.conn||(o.promise||(o.promise=s().connect("mongodb+srv://roshan:roshan16@cluster0.hml76.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{bufferCommands:!1}).then(e=>e)),o.conn=await o.promise),o.conn}o||(o=global.mongoose={conn:null,promise:null})}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[638,452],()=>r(93416));module.exports=n})();