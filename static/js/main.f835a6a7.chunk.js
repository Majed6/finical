(this.webpackJsonpundefined=this.webpackJsonpundefined||[]).push([[0],{67:function(e,t,a){},78:function(e,t,a){"use strict";a.r(t);var n=a(6),i=a(0),c=a.n(i),r=a(10),l=a.n(r),o=(a(67),a(44)),s=a(117),j=a(123),d=a(127),b=a(126),u=a(120),g=a(124),h=a(125),O=a(122),m=a(132),x=a(131),p=a(53),f=a.n(p),v=a(134),y=a(129),k=a(128),C=a(130),F=Object(s.a)((function(e){return{table:{minWidth:650},fab:{position:"absolute",bottom:e.spacing(2),right:e.spacing(2)}}}));function _(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=12*e;if(--t>=0){var c=.025*a;return _(e,t,i+a-c,n+c)}return{balance:a,paidZakatOverYears:n}}function B(e,t,a){var n=_(t,a);return{goal:e,monthly_budget:t,in_years:a,zakat:n.paidZakatOverYears,total_budget:n.balance}}function S(){var e=F(),t=Object(i.useState)(!1),a=Object(o.a)(t,2),c=a[0],r=a[1],l=function(){r(!1)},s=Object(i.useState)([]),p=Object(o.a)(s,2),_=p[0],S=p[1];return Object(n.jsxs)(i.Fragment,{children:[Object(n.jsx)(u.a,{component:O.a,children:Object(n.jsxs)(j.a,{className:e.table,"aria-label":"goals table",children:[Object(n.jsx)(g.a,{children:Object(n.jsxs)(h.a,{children:[Object(n.jsx)(b.a,{children:"Goal"}),Object(n.jsx)(b.a,{align:"right",children:"Monthly Budget"}),Object(n.jsx)(b.a,{align:"right",children:"Achieve in Years"}),Object(n.jsx)(b.a,{align:"right",children:"Zakat"}),Object(n.jsx)(b.a,{align:"right",children:"Total Budget"})]})}),Object(n.jsx)(d.a,{children:_.map((function(e,t){return Object(n.jsxs)(h.a,{children:[Object(n.jsx)(b.a,{component:"th",scope:"row",children:e.goal}),Object(n.jsx)(b.a,{align:"right",children:Object(n.jsx)(m.a,{type:"number",placeholder:"Monthly Budget",onChange:function(e){var a=t;S(_.map((function(t,n){return n!==a?t:B(t.goal,e.target.value||t.monthly_budget,t.in_years)})))}})}),Object(n.jsx)(b.a,{align:"right",children:Object(n.jsx)(m.a,{type:"number",placeholder:"Achieve in years",onChange:function(e){var a=t;S(_.map((function(t,n){return n!==a?t:B(t.goal,t.monthly_budget,e.target.value||t.in_years)})))}})}),Object(n.jsx)(b.a,{align:"right",children:e.zakat.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}),Object(n.jsx)(b.a,{align:"right",children:e.total_budget.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})})]},e.goal)}))})]})}),Object(n.jsxs)(v.a,{open:c,onClose:l,"aria-labelledby":"add-goal",children:[Object(n.jsx)(k.a,{children:Object(n.jsx)(m.a,{autoFocus:!0,id:"goal",label:"Goal",type:"text",fullWidth:!0})}),Object(n.jsxs)(y.a,{children:[Object(n.jsx)(C.a,{onClick:l,color:"primary",children:"Cancel"}),Object(n.jsx)(C.a,{onClick:function(){var e=B(document.getElementById("goal").value,0,0);_.push(e),l()},color:"primary",children:"Add"})]})]}),Object(n.jsx)(x.a,{color:"primary","aria-label":"add",className:e.fab,onClick:function(){r(!0)},children:Object(n.jsx)(f.a,{})})]})}var D=function(){return Object(n.jsx)("div",{className:"App",children:Object(n.jsx)(S,{})})},A=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,136)).then((function(t){var a=t.getCLS,n=t.getFID,i=t.getFCP,c=t.getLCP,r=t.getTTFB;a(e),n(e),i(e),c(e),r(e)}))};l.a.render(Object(n.jsx)(c.a.StrictMode,{children:Object(n.jsx)(D,{})}),document.getElementById("root")),A()}},[[78,1,2]]]);
//# sourceMappingURL=main.f835a6a7.chunk.js.map