!function(p,Q){"use strict";var Z="ht",T=p[Z],I="position",o="absolute",M="px",v="left",b="top",r="innerHTML",B="className",z="width",w="height",e="0",l="display",q="none",h="visibility",K="user-select",C="margin",A="padding",P=null,i=T.Color,H=T.Default,O=H.getInternal(),n=p.setTimeout,d=p.setInterval,X=p.clearTimeout,S=p.clearInterval,F=p.parseInt,R=H.isLeftButton,_=H.isDragging,m=H.startDragging,N=H.getDistance,f=H.isTouchable,u=H.isTouchEvent,a=H.getPagePoint,k=H.isRightButton,J=i.widgetIconHighlight,D=i.widgetIconBorder,V=i.widgetIconGradient,Y=function(){return document},E=function(G,M){return G.querySelectorAll(M)},t=function(W){var V=Y().createElement(W);return"ul"===W&&($(V,I,"relative"),$(V,C,e),$(V,A,e),$(V,"list-style",q),$(V,"box-sizing","border-box"),$(V,"-moz-box-sizing","border-box"),$(V,l,"inline-block"),$(V,"vertical-align","text-bottom"),$(V,"border","1px solid "+H.contextMenuBorderColor),$(V,"box-shadow","0 0 16px 1px "+H.contextMenuShadowColor),$(V,"overflow","hidden"),H.contextMenuBorderRadius&&$(V,"border-radius",H.contextMenuBorderRadius+M)),V},s=function(H){var U=H.touches[0];return U?U:H.changedTouches[0]},L=function(){return t("div")},x=function(){return t("canvas")},$=function(z,O,M){z.style.setProperty(O,M,P)},g=function(O,K,u){H.def(T.widget[O],K,u)},c=function(h,H){h.appendChild(H)},W=function(P,m){P.removeChild(m)},U=O.addEventListener,y=O.removeEventListener;O.addMethod(H,{contextMenuCheckIcon:{width:16,height:16,comps:[{type:"border",rect:[1,1,14,14],width:1,color:D},{type:"shape",points:[13,3,7,12,4,8],borderWidth:2,borderColor:J}]},contextMenuRadioIcon:{width:16,height:16,comps:[{type:"circle",rect:[2,2,12,12],borderWidth:1,borderColor:D},{type:"circle",rect:[4,4,8,8],borderWidth:1,borderColor:J,gradient:H.imageGradient,gradientColor:V,background:J}]},contextMenuLabelFont:(f?"16":"13")+"px arial, sans-serif",contextMenuLabelColor:"#000",contextMenuBackground:"#fff",contextMenuDisabledLabelColor:"#888",contextMenuHoverBackground:"#648BFE",contextMenuHoverLabelColor:"#fff",contextMenuSeparatorWidth:1,contextMenuSeparatorColor:"#E5E5E5",contextMenuScrollerColor1:"#FDFDFD",contextMenuScrollerColor2:"#D3D3D3",contextMenuScrollerBorderColor:"#C3C3C3",contextMenuBorderColor:"#C3C3C3",contextMenuShadowColor:"rgba(128, 128, 128, 0.5)",contextMenuBorderRadius:5,contextMenuSubmenuMark:"▶"},!0);var G=function(p){var h=this,c=p._view;h.$11b=p,h.addListeners(),U(c,"contextmenu",function(T){T.preventDefault()});var E=h.$37b=h.$36b.bind(h);U(c,"mouseover",E),U(c,"mouseout",E)};H.def(G,Q,{ms_listener:1,getView:function(){return this.$11b._view},handle_touchstart:function(K){if(H.preventDefault(K),R(K)){for(var j=this,t=j.$11b,B=j.getView(),G=B.children,i=0;i<G.length;i++){var o=G[i],Q=o.$24b,N=o.$25b;if(Q&&Q.contains(K.target))return t.scrollUp(o),j.$28b=n(function(){j.$29b=d(function(){t.scrollUp(o)},100)},500),m(j,K),void 0;if(N&&N.contains(K.target))return t.scrollDown(o),j.$28b=n(function(){j.$29b=d(function(){t.scrollDown(o)},100)},500),m(j,K),void 0}j.$30b=a(K)}},handle_mousedown:function(Z){this.handle_touchstart(Z)},handle_touchend:function(X){if(R(X)){var i=this,p=i.$30b,k=u(X)?{x:s(X).pageX,y:s(X).pageY}:{x:X.pageX,y:X.pageY};if(!p||N(p,k)>1)return delete i.$30b,void 0;for(var E=i.getView(),D=i.$11b,r=X.target,z=P,f=P,S=D._items,Z=E.$26b,U=0;U<Z.length;U++)if(f=Z[U],f.contains(r)){z=f.getAttribute("data-id");break}if(z&&S){var y=D.$17b(S,function(O){return O._id===z});if(y){var Y=!1;y.disabled instanceof Function?Y=y.disabled.call(D,y):y.disabled===!0&&(Y=!0),Y||(y.items?u(X)&&i.$36b(f,!0):D.$1b(y,X))}}delete i.$30b}},$36b:function(x,j){if(!_()){var U,D=this,c=D.$11b,X=D.getView(),C=c.$20b||X.children[0],K=c.$19b,d=X.$26b,l=X.children,p=x.target,t=X.getBoundingClientRect(),w=H.getWindowInfo(),W=w.width,S=w.height,V=function(T){for(var N=0;N<l.length;N++){var U=l[N],u=new RegExp(T+"$"),K=U[B];if(K&&(u.test(K)||K.indexOf(T+" ")>=0))return U}},Y=function(D){for(var u=0;u<d.length;u++){var c=d[u],G=new RegExp(D+"$"),U=c[B];if(U&&(G.test(U)||U.indexOf(D+" ")>=0))return c}},O=function(C){var L=Y("menu-item"+C.$45b),w=L.getBoundingClientRect(),X=w.top-t.top,o=w.left-t.left;$(C,b,X+M),$(C,v,o+w.width+M);var s=C.getBoundingClientRect(),O=s.top,T=s.left,d=s.height,R=s.width,h=O+d+2,U=T+R+2;h>S&&$(C,b,X+S-h+M),U>W&&$(C,v,o-R+M)};if(j)U=x;else{if("mouseover"===x.type){for(var I=0;I<d.length;I++){var o=d[I];if(o.contains(p)){U=o;break}}if(!U&&K){var R=K.parentNode,s=V("submenu"+K.getAttribute("data-id"));(s&&s.contains(p)||R&&R.contains(p))&&(U=K)}}else if("mouseout"===x.type){for(var u=!1,Z=x.relatedTarget,I=0;I<l.length;I++){var N=l[I];if("hidden"!==N.style.visibility&&N.contains(Z)){u=!0;break}}if(u)return}!U&&C&&(U=Y("menu-item"+(C.$45b||"NaN")))}if(U!=K){if(K)for(var L=K;L;){if(L[B]=L[B].replace(" menu-item-hover",""),L[B].indexOf("disabled")<0){var P=c.getItemByProperty("_id",L.getAttribute("data-id"));null!=P.background?P.background instanceof Function?$(L,"background-color",P.background.call(c,P)):$(L,"background-color",P.background):$(L,"background-color",H.contextMenuBackground),$(L,"color",H.contextMenuLabelColor)}var f=V("submenu"+L.getAttribute("data-id"));f&&$(f,h,"hidden");var m=L.parentNode;L=Y("menu-item"+(m.$45b||"NaN"))}if(U){for(var k=U,J=[];k;){k[B]+=" menu-item-hover",k[B].indexOf("disabled")<0&&($(k,"background-color",H.contextMenuHoverBackground),$(k,"color",H.contextMenuHoverLabelColor));var a=V("submenu"+k.getAttribute("data-id"));a&&($(a,h,"visible"),J.push(a));var m=k.parentNode;k=Y("menu-item"+(m.$45b||"NaN"))}J.reverse(),J.forEach(function(I){O(I)})}}c.$19b=U,c.$20b=U?U.parentNode:X.children[0]}},handle_mouseup:function(s){this.handle_touchend(s)},handleWindowTouchEnd:function(){var G=this;G.$28b!=P&&(X(G.$28b),delete G.$28b),G.$29b!=P&&(S(G.$29b),delete G.$29b),delete G.$34b,delete G.$30b,delete G.$35b},handleWindowMouseUp:function(H){this.handleWindowTouchEnd(H)},handle_mousemove:function(b){this.handle_touchmove(b)},handle_touchmove:function(C){if(!_()&&R(C)){for(var $=this,O=$.getView().children,o=P,D=0;D<O.length;D++){var T=O[D];if(T.contains(C.target)){o=T;break}}var f=$.$30b,w=u(C)?{x:s(C).pageX,y:s(C).pageY}:{x:C.pageX,y:C.pageY};o&&f&&N(f,w)>2&&(m($,C),$.$34b=o,$.$35b=o.$18b)}},handleWindowTouchMove:function(S){S.preventDefault();var G=this,F=G.$11b,w=G.$34b,i=G.$35b,V=G.$30b;if(V&&w){var C=u(S)?{x:s(S).pageX,y:s(S).pageY}:{x:S.pageX,y:S.pageY},a=C.y-V.y;a>0?F.scrollUp(w,w.$18b-(i-a)):F.scrollDown(w,i-a-w.$18b)}},handleWindowMouseMove:function(e){this.handleWindowTouchMove(e)},$10b:function(W,I){W.preventDefault();for(var G=this,b=G.getView().children,Y=P,n=0;n<b.length;n++){var p=b[n];if(p.contains(W.target)){Y=p;break}}if(Y){var A=this.$11b,f=A.getRowHeight();Math.abs(I)>.05&&(I>0?A.scrollUp(Y,I*f):0>I&&A.scrollDown(Y,-I*f))}},handle_mousewheel:function(t){this.$10b(t,t.wheelDelta/40)},handle_DOMMouseScroll:function(Z){this.$10b(Z,-Z.detail)},$44b:function(I){this.getView().contains(I.target)||this.$11b.hide()},$41b:function(g){H.preventDefault(g)},$4b:function(Y,K){var d=this.$11b;if(K=K||d._items,K&&K.length&&Y.keyCode){var Z=[Y.keyCode];Y.shiftKey&&Z.push(16),Y.ctrlKey&&Z.push(17),Y.altKey&&Z.push(18),/mac/.test(p.navigator?p.navigator.userAgent.toLowerCase():"")?Y.metaKey&&Z.push(17):Y.metaKey&&Z.push(91),Z.sort();var S=Z.join(),P=d.$17b(K,function(R){if(R.key){var V=R.key.slice(0);return V.sort(),S===V.join()}});if(P){P.preventDefault!==!1&&Y.preventDefault();var O=!1;P.disabled instanceof Function?O=P.disabled.call(d,P):P.disabled===!0&&(O=!0),O||d.$1b(P,Y)}}},$39b:function(d){this.$32b=a(d)},$38b:function(d){if(H.preventDefault(d),!R(d)){var r=this;r._showContextMenu=k(d),r._showContextMenu||(r.$31b=a(d),r.$33b=n(function(){r._showContextMenu=!0,delete r.$33b},600))}},$40b:function(d){var B=this;B._showContextMenu&&(k(d)?B.$11b.show(d):B.$31b&&(B.$32b?N(B.$31b,B.$32b)<10&&B.$11b.show(d):B.$11b.show(d))),B.$33b!=P&&(X(B.$33b),delete B.$33b),delete B.$31b,delete B.$32b}}),T.widget.ContextMenu=function(k){var d=this,_=d._view=O.createView(null,d);_[B]="ht-widget-contextmenu",d.setItems(k),d.$13b=new G(d),$(_,"font",H.contextMenuLabelFont),$(_,I,o),$(_,"cursor","default"),$(_,"-webkit-"+K,q),$(_,"-moz-"+K,q),$(_,"-ms-"+K,q),$(_,K,q),$(_,"box-sizing","border-box"),$(_,"-moz-box-sizing","border-box"),H.baseZIndex!=P&&$(_,"z-index",F(H.baseZIndex)+2+""),d.$3b=function(m){d.$13b.$4b(m)}},g("ContextMenu",Q,{$16b:P,$5b:0,_items:P,$21b:P,_enableGlobalKey:!1,ms_v:1,enableGlobalKey:function(){var T=this,N=T._enableGlobalKey;N===!1&&(U(Y(),"keydown",T.$3b),T._enableGlobalKey=!0)},disableGlobalKey:function(){this._enableGlobalKey=!1,y(Y(),"keydown",this.$3b)},setItems:function(x){this._items=x},getItems:function(){return this._items},getVisibleFunc:function(){return this.$16b},setVisibleFunc:function(V){this.$16b=V},setLabelMaxWidth:function(h){this.$43b=h},$1b:function(P,t){var s=this;if("check"===P.type)P.selected=!P.selected;else if("radio"===P.type){var T=P.groupId;s.$17b(s._items,function(n){n.groupId===T&&(n.selected=!1)}),P.selected=!0}if(s.hide(),P.action)P.action.apply(P.scope||s,[P,t]);else if(P.href){var I=P.linkTarget||"_self";p.open(P.href,I)}},getItemById:function(P){return this.getItemByProperty("id",P)},setItemVisible:function(v,l){var C=this.getItemById(v);C&&(C.visible=l)},getItemByProperty:function(o,A,m){var v=this;if(m=m||v._items,!m||0===m.length)return P;var H=v.$17b(m,function(M){return M[o]===A});return H||P},scrollUp:function(p,v){var l=this;if(v=v==P?20:v,v=F(v),0!==v){var C=0;p.$18b>v&&(C=p.$18b-v),l.$42b(p,C),p.scrollTop=C,p.$18b=C}},scrollDown:function($,l){var s=this;if(l=l==P?20:l,l=F(l),0!==l){var B=$.$22b,v=$.$23b,W=B-v;v+$.$18b+l<B&&(W=$.$18b+l),s.$42b($,W),$.scrollTop=W,$.$18b=W}},$42b:function(A,n){n=n==P?A.$18b:n;var v=A.$24b,w=A.$25b;v&&($(v,"top",n+M),0==n?$(v,l,q):$(v,l,"block")),w&&($(w,"bottom",-n+M),n==A.$22b-A.$23b?$(w,l,q):$(w,l,"block"))},getRowHeight:function(){return this._view.querySelector(".menu-item").offsetHeight},$17b:function(L,x){for(var z=0;z<L.length;z++){var O=L[z];if(x(O))return O;if(O.items){var c=this.$17b(O.items,x);if(c)return c}}},$2b:function(_,D){for(var Q=this,J=0;J<_.length;J++){Q.$5b++;var O=_[J];if(O.visible!==!1)if(H.isFunction(O.visible)&&O.visible()===!1)this._clearItemId(O);else if(!Q.$16b||Q.$16b.call(Q,O)){var G=t("li"),n=Q.$5b+"";if($(G,"white-space","nowrap"),$(G,l,"block"),"separator"===O||O.separator===!0){var k=L();k[B]="separator",$(k,w,H.contextMenuSeparatorWidth+M),$(k,"background",H.contextMenuSeparatorColor),c(G,k)}else{O._id=n,G.setAttribute("data-id",n);var y=t("span"),a=t("span"),m=x(),Y=L();if($(y,l,"inline-block"),$(y,w,"1.2em"),$(a,l,"inline-block"),$(a,w,"1.2em"),$(a,"line-height","1.2em"),m[B]="prefix",$(m,l,"inline-block"),$(m,z,"1em"),$(m,w,"1em"),$(m,"vertical-align","middle"),$(m,C,"0 0.2em"),"check"===O.type&&O.selected?m[B]+=" check-prefix":"radio"===O.type&&O.selected&&(m[B]+=" radio-prefix"),c(G,m),O.icon){var K=x();K[B]="contextmenu-item-icon",$(K,l,"inline-block"),$(K,w,"1.2em"),$(K,z,"1.2em"),$(K,"margin-right","0.2em"),$(K,"float","left"),K.$50b=O.icon,K._item=O,c(y,K)}if(a[r]=O.label,c(y,a),c(G,y),Y[B]="suffix",$(Y,l,"inline-block"),$(Y,"margin-left","1em"),$(Y,"margin-right","0.4em"),$(Y,"text-align","right"),$(Y,"font-size","75%"),O.items&&(Y[r]=H.contextMenuSubmenuMark),O.suffix&&(Y[r]=O.suffix),c(G,Y),G[B]="menu-item menu-item"+n,null!=O.background?O.background instanceof Function?$(G,"background-color",O.background.call(Q,O)):$(G,"background-color",O.background):$(G,"background-color",H.contextMenuBackground),$(G,"color",H.contextMenuLabelColor),$(G,A,"3px 0"),O.disabled instanceof Function){var N=O.disabled.call(Q,O);N&&(G[B]+=" disabled",$(G,"color",H.contextMenuDisabledLabelColor))}else O.disabled&&(G[B]+=" disabled",$(G,"color",H.contextMenuDisabledLabelColor));if(O.items){Q.$21b||(Q.$21b=new T.List);var g=t("ul");g[B]="submenu"+n,g.$45b=n,$(g,h,"hidden"),$(g,I,o),c(Q._view,g),Q.$21b.add(g),Q.$2b(O.items,g)}}c(D,G)}else this._clearItemId(O);else this._clearItemId(O)}},rebuild:function(){var T=this,x=T._items,F=T._view;if(F&&(F[r]="",T.$21b=P,T.$5b=0,T.$19b=P,T.$20b=P,F.$26b=P,x&&0!==x.length)){var A=t("ul",T._r);c(F,A),T.$2b(x,A)}},addTo:function(T){if(T){var G=this,f=G.$13b;G.$12b=T,G.$9b=function($){f.$44b($)};var w=G.$6b=function(o){f.$38b(o)},m=G.$7b=function(Z){f.$39b(Z)},D=G.$8b=function(R){f.$40b(R)};H.mockTouch&&(U(T,"touchstart",w,!0),U(T,"touchmove",m),U(T,"touchend",D)),U(T,"mousedown",w,!0),U(T,"mousemove",m),U(T,"mouseup",D),G.$27b=function(c){f.$41b(c)},U(T,"contextmenu",G.$27b)}},showOnView:function(y,h,Z){y=y.getView?y.getView():y;var U=H.getWindowInfo(),w=y.getBoundingClientRect();this.show(w.left+U.left+h,w.top+U.top+Z)},show:function(d,J,i){var m=this,i=i==P?!0:!1,V=m._view;if(V){if(m.invalidate(),1===arguments.length){var Q=d;if(u(Q)){var _=s(Q);d=_.pageX,J=_.pageY}else d=Q.pageX,J=Q.pageY}var O=H.getWindowInfo(),D=O.width,Z=O.height,f=O.left,T=O.top,h={pageX:d,pageY:J,clientX:d-f,clientY:J-T,target:1,originEvent:Q},R=h.clientX,w=h.clientY,G=function(p){p.style.height=Z-6+M;var J=L(),l=L(),x=function(L){$(L,I,o),$(L,"text-align","center"),$(L,z,"100%"),$(L,"font-size",10+M),$(L,"padding","2px 0"),$(L,"border","0px solid "+H.contextMenuScrollerBorderColor),$(L,"background-color",H.contextMenuScrollerColor1),L.style.backgroundImage="-webkit-linear-gradient(top, "+H.contextMenuScrollerColor1+", "+H.contextMenuScrollerColor2+")",L.style.backgroundImage="linear-gradient(to bottom, "+H.contextMenuScrollerColor1+", "+H.contextMenuScrollerColor2+")"};J[B]="menu-arrow-item menu-arrow-item-top",l[B]="menu-arrow-item menu-arrow-item-bottom",x(J),$(J,"top",e),$(J,"left",e),$(J,"border-bottom-width",1+M),J[r]="▲",x(l),$(l,"bottom",e),$(l,"left",e),$(l,"border-top-width",1+M),l[r]="▼",p.$24b=J,p.$25b=l,p.$18b=p.scrollTop,p.$22b=p.scrollHeight,p.$23b=p.clientHeight,c(p,J),c(p,l),m.$42b(p)};m.beforeShow&&m.beforeShow(h);var p=m._items;if(p&&(Q&&Q.preventDefault(),p.length)){m.rebuild();var W=V.$26b=E(V,".menu-item");if(W.length){H.appendToScreen(V);var k=V.children[0];k.offsetHeight>Z&&G(k);var x=w+(i?1:0),q=R+(i?1:0),N=function(O){for(var c=0,j=0,X=0,I=m.$43b;X<O.children.length;X++){var A=O.children[X];if(A.getAttribute("data-id")){var g=A.children[1],V=A.children[2],n=g.children;if(I){var i=n[0];n.length>1&&(i=n[1]),i.offsetWidth>I&&(i[r]="<marquee scrollamount='3'>"+i[r]+"</marquee>",i.children[0].style.verticalAlign="text-bottom",$(i,z,I+M),$(i,l,"inline-block"))}var G=g.offsetWidth,L=V.offsetWidth;G>c&&(c=G),L>j&&(j=L)}}for(X=0;X<O.children.length;X++){var A=O.children[X];if(A.getAttribute("data-id")){var g=A.children[1],V=A.children[2],D=g.children[0],N=g.children[1];!N&&D.style.width&&$(D,z,c+M),$(g,z,c+M),$(V,z,j+M)}}};N(k);var j=w+3+V.offsetHeight,A=R+3+V.offsetWidth;j>Z?$(V,b,x-(j-Z)+T+M):$(V,b,x+T+M),A>D?$(V,v,q-(A-D)+f+M):$(V,v,q+f+M);var X=m.$21b;X&&X.each(function(V){N(V),V.offsetHeight>Z&&G(V)}),m.$9b&&(H.mockTouch&&U(Y(),"touchstart",m.$9b,!0),U(Y(),"mousedown",m.$9b,!0)),m.afterShow&&m.afterShow(h),m.$47b()}}}},isShowing:function(){return this._view?this._view.parentNode!=P:!1},getRelatedView:function(){return this.$12b},hide:function(){var b=this,t=b._view;t&&t.parentNode&&(W(t.parentNode,t),H.mockTouch&&y(Y(),"touchstart",b.$9b,!0),y(Y(),"mousedown",b.$9b,!0),b.afterHide&&b.afterHide())},dispose:function(){var d=this,F=d.$12b,t=d._view;t&&(this.hide(),d.disableGlobalKey(),F&&(H.mockTouch&&(y(F,"touchstart",d.$6b,!0),y(F,"touchmove",d.$7b),y(F,"touchend",d.$8b)),y(F,"mousedown",d.$6b,!0),y(F,"mousemove",d.$7b),y(F,"mouseup",d.$8b),y(F,"contextmenu",d.$27b)),d._view=d._items=d.$21b=d.$19b=d.$12b=d.beforeShow=d.afterShow=d.afterHide=d.$9b=d.$3b=d.$6b=d.$7b=d.$8b=d.$27b=P)},$46b:function(S,a,y,h,F){var e=O.initContext(S);O.translateAndScale(e,0,0,1),e.clearRect(0,0,y,h),H.drawStretchImage(e,H.getImage(a),"fill",0,0,y,h,F,this),e.restore()},$47b:function(){var Q,r,f,m=this,Y=m._view;if(m.isShowing()){var b=E(Y,".check-prefix");for(f=0;f<b.length;f++){var e=b[f];Q=e.clientWidth,r=e.clientHeight,e.$48b=Q,e.$49b=r,O.setCanvas(e,Q,r)}var x=E(Y,".radio-prefix");for(f=0;f<x.length;f++){var y=x[f];Q=y.clientWidth,r=y.clientHeight,y.$48b=Q,y.$49b=r,O.setCanvas(y,Q,r)}var z=E(Y,".contextmenu-item-icon");for(f=0;f<z.length;f++){var L=z[f];Q=L.clientWidth,r=L.clientHeight,L.$48b=Q,L.$49b=r,O.setCanvas(L,Q,r)}}},validateImpl:function(){var x,p,L,k=this,b=k._view;if(k.isShowing()){var i=E(b,".check-prefix");for(L=0;L<i.length;L++){var N=i[L];x=N.$48b,p=N.$49b,x&&p&&k.$46b(N,H.contextMenuCheckIcon,x,p)}var W=E(b,".radio-prefix");for(L=0;L<W.length;L++){var Q=W[L];x=Q.$48b,p=Q.$49b,x&&p&&k.$46b(Q,H.contextMenuRadioIcon,x,p)}var u=E(b,".contextmenu-item-icon");for(L=0;L<u.length;L++){var R=u[L];x=R.$48b,p=R.$49b,x&&p&&k.$46b(R,H.getImage(R.$50b),x,p,R._item)}}},_clearItemId:function(m){var M=this;delete m._id,m.items&&m.items.forEach(function(u){M._clearItemId(u)})}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);