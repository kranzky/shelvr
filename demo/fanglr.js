Event.observe(window, 'load', init, false);

messages = [ "Welcome to fanglr, try a search!", 
             "The menus above are super nifty, but do nothing ><;",
			 "You can clear and hide the results pane you know ;)",
			 "fanglr should behave pretty well if you resize it.",
			 "Persistence and sign-on coming when cool meets mundane!",
			 "10 results is the max that will display, search wisely!",
			 "Known bug: If you empty a pane, it's boned!" ];
			 

function init(){

     //Event.observe('asin', 'keyup', search, false);
     Ajax.getTransport = function() { 
	    var f = new flensed.flXHR({
			autoUpdatePlayer:true,			
			xmlResponseText:true,
			onerror:handleError,
			noCacheHeader:false}); 
		return f;
     };
}

function handleError(errObj) {
	alert("Error: "+errObj.number
		+"\nType: "+errObj.name
		+"\nDescription: "+errObj.description
		+"\nSource Object Id: "+errObj.srcElement.instanceId
	);
}

function handleLoading(XHRobj) {
	if (XHRobj.readyState == 4) {
		alert("readyState:"+XHRobj.readyState
			+"\nresponseText:"+XHRobj.responseText
			+"\nstatus:"+XHRobj.status
			+"\nstatusText:"+XHRobj.statusText
			+"\nSource Object Id: "+XHRobj.instanceId
		);
	}
}

function hideresults() {
	rp = $('resultspane');
	rp.style.padding="0px";
	rp.innerHTML = "";
	setupPanes();
}

function setStatus(msg) 
{
	$('status').innerHTML = msg;
}

function clearStatus(msg) 
{
	
	i = Math.floor(Math.random()*messages.length)
	$('status').innerHTML = messages[i];
}

function itemsearch(responseObject) 
{

	setStatus("Retrieved Results...");
	try {
		XMLDOM = responseObject.responseXML;
		items = XMLDOM.getElementsByTagName('Item');
	} catch(err) {
		alert(err);
		setStatus("Parsing Error");
	}
	setStatus("Parsing Results...");
	
	if (items.length == 0)
	{
		hideresults();
		setStatus("No Results :(");
		return;
	}
	var s = "";
	
	for (var i = 0; i < items.length; i++) 
	{	
		try {
			var item = items[i];
			var asinid = item.getElementsByTagName("ASIN")[0].textContent;
			
			// only add if this entry isn't already in one of the panes.
			if ($(asinid) == null) {
				var imageurl = item.getElementsByTagName("MediumImage")[0].getElementsByTagName("URL")[0].textContent;
				var title = item.getElementsByTagName("ItemAttributes")[0].getElementsByTagName("Title")[0].textContent;
				var platform = item.getElementsByTagName("ItemAttributes")[0].getElementsByTagName("Platform")[0].textContent;
				title = title + "<br>(" + platform +")";
				s += makeStamp(asinid, title, imageurl);
			}
		} catch(err) {
			// Probably there was no image etc
		}
	}
	clearStatus();
	$('resultspane').innerHTML = s;
	$('resultspane').style.padding="6px";
	
	opts = {
		tag:'span',overlap:'horizontal',constraint: false, 
		containment:["resultspane"],
	}
	Sortable.create('resultspane', opts);
	setupPanes();
}

function search(){
	setStatus("Querying Amazon...");
    var url = 'http://ecs.amazonaws.com/onca/xml';
	var search = escape($F('keywords').replace(/'/g,"").replace(/"/g,"")).replace(/%20/g, ",");
	
	var pars = { Service:"AWSECommerceService", AWSAccessKeyId:"0WP94RV66RVMX6FYBMG2",
			     Operation:"ItemSearch", 
				 ResponseGroup:"Images,ItemAttributes", Keywords:search,
				 SearchIndex:"VideoGames" };

	
    var myAjax = new Ajax.Request( url, { method: 'get', parameters:pars, onSuccess:function(response) {itemsearch(response)} });
}

checkSize = function(elmt) {
	if (elmt.width > elmt.height) {
		elmt.width = elmt.height;
	}
}
		

makeStamp = function(id, title, imageurl) 
{
	s =  '<span class="stamp" id='+id+'>';
	s += '<img onload="checkSize(this)" class="cover" src="'+ imageurl + '" onmouseover=\'showelmt("' + id + 'text' + '");\' onmouseout=\'hideelmt("' + id + 'text' + '")\'/>';
	s += '<div class="stamptext" id=' + id + 'text' + '>' + title +'</div></span> \n';
	return s;
}

doStamp = function(i) {
	s = makeStamp(i, "Game " + i, "missingimage.png" );
	//document.write('<span class="stamp" id=sa_' + i + '"1">');
	//document.write('<img class="cover" id=a_' + i + '"1" src="fallout3.jpg" alt="" />')
	//document.write('<br>This is game number ' + i)
	//document.write('</span>');
	document.write(s);
}

toggleCheckBox = function(name) {
$(name).checked = !( $(name).checked);
}

checkAll = function(chks) {
	for (i=0;i<chks.length;i++) {
	  $(chks[i]).checked = true;
	}
}

checkNone = function(chks) {
	for (i=0;i<chks.length;i++) {
	  $(chks[i]).checked = false;
	}
}

doMenu = function(name, title, itms) {
	document.write('<span class="menuheading" onmouseover=showelmt("' + name + '") onmouseout=hideelmt("' + name + '") )><div class="menuheadingtext">'+title+'</div>' );
	document.write('<div class="menu" id="' + name + '" > ' );

	var chks = []
	for (i=0;i<itms.length;i++)
	{	
	    var chkname = 'chk' + name + i
		itm = itms[i];
		document.write('<div class="menuitem' + i%2 + '" onClick=toggleCheckBox("'+chkname+'");>' );
		document.write('<input type="checkbox" id="'+chkname+'" onClick=toggleCheckBox("'+chkname+'");>' + itm + '</div>');
		chks.push("'" + chkname + "'");
	}
	document.write('<div><span class="minilink" onclick=checkAll(['+chks+'])>Check All</span><span class="minilink" onclick=checkNone(['+chks+'])>None</span></div>');
	document.write('</div></span>');
	hideelmt(name);
}

showelmt = function(elmnt)
{
document.getElementById(elmnt).style.visibility="visible";
}
hideelmt = function(elmnt)
{
document.getElementById(elmnt).style.visibility="hidden";
}

setupPanes = function()
{
	opts = {
		tag:'span',overlap:'horizontal',constraint: false, 
		containment:["pane1", "pane2", "pane3", "resultspane"],
	}
	Sortable.create('pane1', opts);
	Sortable.create('pane2', opts);
	Sortable.create('pane3', opts);
	setStatus(messages[0]);
 }