(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,t,n){e.exports=n(36)},36:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(13),u=n.n(o),c=n(2),l=function(e){var t=e.persons,n=e.deletePerson;return r.a.createElement(r.a.Fragment,null,t.map((function(e){return r.a.createElement("div",{key:e.id},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return n(e)}},"delete"))})))},i=function(e){var t=e.filter,n=e.filterPersons;return r.a.createElement("div",null,"filter shown with:",r.a.createElement("input",{value:t,onChange:n}))},m=function(e){var t=e.addPerson,n=e.newName,a=e.setNewName,o=e.newNumber,u=e.setNewNumber;return r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:n,onChange:function(e){return a(e.target.value)}})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:o,onChange:function(e){return u(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=n(3),f=n.n(d),s="/api/persons",b=function(){return f.a.get(s).then((function(e){return e.data}))},h=function(e){return f.a.post(s,e).then((function(e){return e.data}))},p=function(e){return f.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},v=function(e,t){return console.log("Person To Be Updated",t),f.a.put("".concat(s,"/").concat(e),t).then((function(e){return e.data}))},E=function(e){var t=e.message,n={color:e.error?"red":"green",background:"lightgrey",fontSize:20,fontStyle:"solid",borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return null===t?null:r.a.createElement("div",{style:n},t)},w=function(){var e=Object(a.useState)([]),t=Object(c.a)(e,2),n=t[0],o=t[1];Object(a.useEffect)((function(){b().then((function(e){o(e)}))}),[]);var u=Object(a.useState)(""),d=Object(c.a)(u,2),f=d[0],s=d[1],w=Object(a.useState)(""),g=Object(c.a)(w,2),O=g[0],j=g[1],N=Object(a.useState)(""),S=Object(c.a)(N,2),k=S[0],y=S[1],P=Object(a.useState)(!0),C=Object(c.a)(P,2),T=C[0],B=C[1],x=Object(a.useState)(null),D=Object(c.a)(x,2),I=D[0],J=D[1],L=Object(a.useState)(!1),z=Object(c.a)(L,2),A=z[0],F=z[1],R=T?n:n.filter((function(e){return-1!==e.name.toLowerCase().indexOf(k.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{message:I,error:A}),r.a.createElement(i,{filter:k,filterPersons:function(e){y(e.target.value),e.target.value?B(!1):B(!0)}}),r.a.createElement("h3",null,"add a new"),r.a.createElement(m,{addPerson:function(e){if(e.preventDefault(),f&&O){var t=n.find((function(e){return e.name===f}));if(t){if(t.number!==O?window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?")):alert("".concat(f," is already added to phonebook")))v(t.id,{name:f,number:O}).then((function(e){o(n.map((function(t){return t.id!==e.id?t:e}))),J("Number Changed ".concat(e.name," ")),setTimeout((function(){J(null)}),3e3)})).catch((function(e){J("Information of ".concat(f," has already been removed from server")),F(!0),o(n.filter((function(e){return e.id!==t.id}))),setTimeout((function(){J(null),F(!1)}),3e3)}))}else h({name:f,number:O}).then((function(e){o(n.concat(e)),J("Added ".concat(e.name," ")),setTimeout((function(){J(null)}),3e3)}));s(""),j("")}else alert("You need to complete the name and the number")},newName:f,setNewName:s,newNumber:O,setNewNumber:j}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(l,{persons:R,deletePerson:function(e){window.confirm("Delete ".concat(e.name))&&(p(e.id),o(n.filter((function(t){return t.id!==e.id}))))}}))};u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.5395964e.chunk.js.map