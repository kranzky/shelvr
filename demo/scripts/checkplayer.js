/*	CheckPlayer 1.0 <http://checkplayer.flensed.com/>
	Copyright (c) 2008 Kyle Simpson, Getify Solutions, Inc.
	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>

	====================================================================================================
	Portions of this code were extracted and/or derived from:

	SWFObject v2.1 & 2.2a8 <http://code.google.com/p/swfobject/>
	Copyright (c) 2007-2008 Geoff Stearns, Michael Williams, and Bobby van der Sluis
	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
(function(R){var E=R,V=R.document,N="undefined",G=true,X=false,W="",H="object",O="function",T="string",M="div",D="onunload",J="none",U=null,P=null,I=null,L=null,K="flensed.js",F="checkplayer.js",B="swfobject.js",C=R.setTimeout,A=R.clearTimeout,S=R.setInterval,Q=R.clearInterval;if(typeof R.flensed===N){R.flensed={}}if(typeof R.flensed.checkplayer!==N){return}P=R.flensed;C(function(){var Y=X,i=V.getElementsByTagName("script"),d=i.length;try{P.base_path.toLowerCase();Y=G}catch(b){P.base_path=""}function g(o,n,p){for(var m=0;m<d;m++){if(typeof i[m].src!==N){if(i[m].src.indexOf(o)>=0){break}}}var l=V.createElement("script");l.setAttribute("src",P.base_path+o);if(typeof n!==N){l.setAttribute("type",n)}if(typeof p!==N){l.setAttribute("language",p)}V.getElementsByTagName("head")[0].appendChild(l)}if((typeof i!==N)&&(i!==null)){if(!Y){var j=0;for(var c=0;c<d;c++){if(typeof i[c].src!==N){if(((j=i[c].src.indexOf(K))>=0)||((j=i[c].src.indexOf(F))>=0)){P.base_path=i[c].src.substr(0,j);break}}}}}try{R.swfobject.getObjectById("a")}catch(h){g(B,"text/javascript")}try{P.ua.pv.join(".")}catch(f){g(K,"text/javascript")}function Z(){A(a);try{E.detachEvent(D,arguments.callee)}catch(k){}}try{E.attachEvent(D,Z)}catch(e){}var a=C(function(){Z();try{R.swfobject.getObjectById("a");P.ua.pv.join(".")}catch(k){throw new R.Error("CheckPlayer dependencies failed to load.")}},20000)},0);P.checkplayer=function(x,Ai,o,Ab){if(typeof I._ins!==N){return I._ins}var a="6.0.65",z=[],i=null,f=X,g=null,Ak=null,s=W,d=X,l=null,b=[],r={},Aa=[],e=null,Ag=null,Af=null,m=null,h=X,Ah=null,k=X,t=X,p=X,Ae=null;var Z=function(){if((typeof x!==N)&&(x!==null)&&(x!==X)){Ag=x+W}else{Ag="0.0.0"}if(typeof Ai===O){Af=Ai}if(typeof o!==N){h=!(!o)}if(typeof Ab===O){m=Ab}function Am(){A(g);try{E.detachEvent(D,Am)}catch(Ap){}}try{E.attachEvent(D,Am)}catch(An){}(function Ao(){try{P.bindEvent(E,D,y)}catch(Ap){g=C(arguments.callee,25);return}Am();Ah=P.ua.pv.join(".");g=C(Ad,1)})()}();function Ad(){try{e=V.getElementsByTagName("body")[0]}catch(An){}if((typeof e===N)||(e===null)){g=C(Ad,25);return}try{R.swfobject.getObjectById("a");L=R.swfobject}catch(Am){g=C(Ad,25);return}t=L.hasFlashPlayerVersion(a);k=L.hasFlashPlayerVersion(Ag);Aj();d=G;if(typeof Af===O){Af(j)}if(k){u()}else{if(h){v()}}}function y(){if(typeof E.detachEvent!==N){E.detachEvent(D,y)}I._ins=null;if((typeof l!==N)&&(l!==null)){try{l.updateSWFCallback=null;Ac=null}catch(Ap){}l=null}try{for(var Ao in j){if(j[Ao]!==Object.prototype[Ao]){try{j[Ao]=null}catch(An){}}}}catch(Am){}j=null;e=null;Y();Aa=null;Af=null;m=null;try{for(var As in I){if(I[As]!==Object.prototype[As]){try{I[As]=null}catch(Ar){}}}}catch(Aq){}I=null;P.checkplayer=null;P=null;R=null}function Al(An,Ao,Am){Aa[Aa.length]={func:An,funcName:Ao,args:Am}}function u(){if(!d){i=C(u,25);return}var Ao=0;try{Ao=Aa.length}catch(Ap){}for(var An=0;An<Ao;An++){try{Aa[An].func.apply(j,Aa[An].args);Aa[An]=X}catch(Am){k=X;Aj();if(typeof Af===O){Af(j)}else{throw new R.Error("checkplayer::"+Aa[An].funcName+"() call failed.")}}}Aa=null}function Y(){A(g);g=null;A(i);i=null;for(var An in r){if(r[An]!==Object.prototype[An]){Q(r[An]);r[An]=X}}for(var Am in z){if(z[Am]!==Object.prototype[Am]){A(z[Am]);z[Am]=X}}}function Aj(){try{j.playerVersionDetected=Ah;j.checkPassed=k;j.updateable=t;j.updateStatus=p;j.updateControlsContainer=Ae}catch(Am){}}function n(As,An){var Ap=An?"visible":"hidden";var Ar=P.getObjectById(As);try{if(Ar!==null&&(typeof Ar.style!==N)&&(Ar.style!==null)){Ar.style.visibility=Ap}else{try{P.createCSS("#"+As,"visibility:"+Ap)}catch(Aq){}}}catch(Ao){try{P.createCSS("#"+As,"visibility:"+Ap)}catch(Am){}}}function v(){var Ar=e;if((typeof Ar===N)||(Ar===null)){z[z.length]=C(v,25);return}try{L.getObjectById("a")}catch(Aq){z[z.length]=C(v,25);return}if(!f){f=G;Y();if(t){s="CheckPlayerUpdate";Ak=s+"SWF";P.createCSS("#"+s,"width:221px;height:145px;position:absolute;left:5px;top:5px;border:none;background-color:#000000;display:block;");P.createCSS("#"+Ak,"display:inline;position:absolute;left:1px;top:1px;");Ae=V.createElement(M);Ae.id=s;Ar.appendChild(Ae);n(Ae.id,X);Aj();var At=null;try{At=E.top.location.toString()}catch(Am){At=E.location.toString()}var Ao={swfId:Ak,MMredirectURL:At.replace(/&/g,"%26"),MMplayerType:(P.ua.ie&&P.ua.win?"ActiveX":"PlugIn"),MMdoctitle:V.title.slice(0,47)+" - Flash Player Installation"};var As={allowScriptAccess:"always"};var Ap={id:Ak,name:Ak};try{q(P.base_path+"updateplayer.swf",{appendToId:s},"219","143",Ao,As,Ap,{swfTimeout:3000,swfCB:c},G)}catch(An){w();return}}else{w()}}}function w(Am){if(typeof Am===N){Am="Flash Player not detected or not updateable."}p=I.UPDATE_FAILED;Aj();if(typeof m===O){m(j)}else{throw new R.Error("checkplayer::UpdatePlayer(): "+Am)}}function c(Am){if(Am.status===I.SWF_LOADED){A(r["continueUpdate_"+Ak]);r["continueUpdate_"+Ak]=X;l=Am.srcElem;l.updateSWFCallback=Ac;p=I.UPDATE_INIT;Aj();if(typeof m===O){m(j)}n(Ae.id,G)}else{if(Am.status===I.SWF_FAILED||Am.status===I.SWF_TIMEOUT){w()}}}function Ac(An){try{if(An===0){p=I.UPDATE_SUCCESSFUL;Ae.style.display=J;try{E.open(W,"_self",W);E.close();R.self.opener=E;R.self.close()}catch(Ao){}}else{if(An===1){p=I.UPDATE_CANCELED;Ae.style.display=J}else{if(An===2){Ae.style.display=J;w("The Flash Player update failed.");return}else{if(An===3){Ae.style.display=J;w("The Flash Player update timed out.");return}}}}}catch(Am){}Aj();if(typeof m===O){m(j)}}function q(AF,As,Au,An,Ap,Ar,Aw,AD,AB){if(As!==null&&(typeof As===T||typeof As.replaceId===T)){n(((typeof As===T)?As:As.replaceId),X)}if(!d){Al(q,"DoSWF",arguments);return}if(k||AB){Au+=W;An+=W;var Az=(typeof Aw===H)?Aw:{};Az.data=AF;Az.width=Au;Az.height=An;var Ay=(typeof Ar===H)?Ar:{};if(typeof Ap===H){for(var AC in Ap){if(Ap[AC]!==Object.prototype[AC]){if(typeof Ay.flashvars!==N){Ay.flashvars+="&"+AC+"="+Ap[AC]}else{Ay.flashvars=AC+"="+Ap[AC]}}}}var AE=null;if(typeof Aw.id!==N){AE=Aw.id}else{if(As!==null&&(typeof As===T||typeof As.replaceId===T)){AE=((typeof As===T)?As:As.replaceId)}else{AE="swf_"+b.length}}var AG=null;if(As===null||As===X||typeof As.appendToId===T){var Ao=null;if(As!==null&&As!==X&&typeof As.appendToId===T){Ao=P.getObjectById(As.appendToId)}else{Ao=e}var At=V.createElement(M);AG=(At.id=AE);Ao.appendChild(At)}else{AG=((typeof As.replaceId===T)?As.replaceId:As)}var Ax=function(){},AA=0,Am=W,Av=null;if(typeof AD!==N&&AD!==null){if(typeof AD===H){if(typeof AD.swfCB!==N&&AD.swfCB!==null){Ax=AD.swfCB}if(typeof AD.swfTimeout!==N&&(R.parseInt(AD.swfTimeout,10)>0)){AA=AD.swfTimeout}if(typeof AD.swfEICheck!==N&&AD.swfEICheck!==null&&AD.swfEICheck!==W){Am=AD.swfEICheck}}else{if(typeof AD===O){Ax=AD}}}try{Av=L.createSWF(Az,Ay,AG)}catch(Aq){}if(Av!==null){b[b.length]=AE;if(typeof Ax===O){Ax({status:I.SWF_INIT,srcId:AE,srcElem:Av});r[AE]=S(function(){var AI=P.getObjectById(AE);if((typeof AI!==N)&&(AI!==null)&&(AI.nodeName==="OBJECT"||AI.nodeName==="EMBED")){var AH=0;try{AH=AI.PercentLoaded()}catch(AJ){}if(AH>0){if(AA>0){A(r["DoSWFtimeout_"+AE]);r["DoSWFtimeout_"+AE]=X}if(AH<100){C(function(){Ax({status:I.SWF_LOADING,srcId:AE,srcElem:AI})},1)}else{Q(r[AE]);r[AE]=X;C(function(){Ax({status:I.SWF_LOADED,srcId:AE,srcElem:AI})},1);if(Am!==W){var AK=X;r[AE]=S(function(){if(!AK&&typeof AI[Am]===O){AK=G;try{AI[Am]();Q(r[AE]);r[AE]=X;Ax({status:I.SWF_EI_READY,srcId:AE,srcElem:AI})}catch(AL){}AK=X}},25)}}}}},50);if(AA>0){r["DoSWFtimeout_"+AE]=C(function(){var AI=P.getObjectById(AE);if((typeof AI!==N)&&(AI!==null)&&(AI.nodeName==="OBJECT"||AI.nodeName==="EMBED")){var AH=0;try{AH=AI.PercentLoaded()}catch(AJ){}if(AH<=0){Q(r[AE]);r[AE]=X;if(P.ua.ie&&P.ua.win&&AI.readyState!==4){AI.id="removeSWF_"+AI.id;AI.style.display=J;r[AI.id]=S(function(){if(AI.readyState===4){Q(r[AI.id]);r[AI.id]=X;L.removeSWF(AI.id)}},500)}else{L.removeSWF(AI.id)}r[AE]=X;r["DoSWFtimeout_"+AE]=X;Ax({status:I.SWF_TIMEOUT,srcId:AE,srcElem:AI})}}},AA)}}}else{if(typeof Ax===O){Ax({status:I.SWF_FAILED,srcId:AE,srcElem:null})}else{throw new R.Error("checkplayer::DoSWF(): SWF could not be loaded.")}}}else{if(typeof Ax===O){Ax({status:I.SWF_FAILED,srcId:AE,srcElem:null})}else{throw new R.Error("checkplayer::DoSWF(): Minimum Flash Version not detected.")}}}var j={playerVersionDetected:Ah,versionChecked:Ag,checkPassed:k,UpdatePlayer:v,DoSWF:function(Ar,As,Ap,Aq,An,Am,Ao,At){q(Ar,As,Ap,Aq,An,Am,Ao,At,X)},updateable:t,updateStatus:p,updateControlsContainer:Ae};I._ins=j;return j};I=P.checkplayer;I.UPDATE_INIT=1;I.UPDATE_SUCCESSFUL=2;I.UPDATE_CANCELED=3;I.UPDATE_FAILED=4;I.SWF_INIT=5;I.SWF_LOADING=6;I.SWF_LOADED=7;I.SWF_FAILED=8;I.SWF_TIMEOUT=9;I.SWF_EI_READY=10;I.module_ready=function(){}})(window);