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

	// Set up the sortable panes
	//setupPanes();
	
	setTimeout( function(){getStampsMulti( 	{ pane1:["B001BXA9CE","B001CM0PR8","B001ASJIS6","B00140P9BA","WRONGASIN"], 
											  pane2:["B00009ZVHU","B000FQ9QVI","B0006B0O9U","B000UU5T7E","B000MK694E"],
											  pane3:[] 
											} 
										 ) 
						  }, 500);	
	
	hideresults();
	 
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

function handleItemLookup(responseObject, pane) 
{
	
	var multipane = false;
	if (typeof pane != 'string') 
	{
		multipane = true;
	}

	setStatus("Retrieved Results...");
	try {
		XMLDOM = responseObject.responseXML;
		items = XMLDOM.getElementsByTagName('Item');
	} catch(err) {
		alert(err);
		$("debug").innerHTML = responseObject.responseText;
		setStatus("Parsing Error");
		return -1;
	}
	setStatus("Parsing Results...");
	
	if (items.length == 0)
	{
		alert(responseObject.responseText);
		$("debug").innerHTML = responseObject.responseText;
		return -2;
	}
	
	var s = {};

	for (var i = 0; i < items.length; i++) 
	{	

		try {
			var item = items[i];
			var asinid = item.getElementsByTagName("ASIN")[0].textContent;
			
			// only add if this entry isn't already in one of the panes.
			if ($(asinid) == null && s[asinid] == null) {
				var imageurl = item.getElementsByTagName("MediumImage")[0].getElementsByTagName("URL")[0].textContent;
				var title = item.getElementsByTagName("ItemAttributes")[0].getElementsByTagName("Title")[0].textContent;
				var platform = item.getElementsByTagName("ItemAttributes")[0].getElementsByTagName("Platform")[0].textContent;
				title = title + "<br>(" + platform +")";
				var stamp = makeStamp(asinid, title, imageurl);
				s[asinid] = stamp;
			} 
		} catch(err) {
			// Probably there was no image etc
		}
	}
	clearStatus();
	
	if (multipane)
	{
		var panes = pane;
		
		for (p in panes)
		{
			var stamps = "";
			for (var i = 0; i < panes[p].length; i++) 
			{
				asin = panes[p][i]
				stamp = s[asin];
				if (stamp != null)
					stamps += s[asin];
			}
			$(p).innerHTML = stamps;
		}
	}
	else
	{	
		var stamps = "";
		for (asin in s)
		{
			stamps += s[asin];
		}
		$(pane).innerHTML = stamps;
	}
	
	setupPanes();
	return 0;
}

function itemsearch(response)
{
	var returncode = handleItemLookup(response, "resultspane");
	if ( returncode == 0)
	{
		$('resultspane').style.padding="6px";
		Sortable.create('resultspane', opts);
	} 
	else 
	{
		hideresults();
		if (returncode == -2)
		{
			setStatus("No Results :(");
		}
	}
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

function getStampsMulti( paneHashes )
{
	asins = "";
	for (var pane in paneHashes)
	{
		for (var i=0;i<paneHashes[pane].length;i++) {
			if (asins == "")
				asins += paneHashes[pane][i];
			else
				asins += "," + paneHashes[pane][i];
		}
			
	}

	setStatus("Querying Amazon...");
    var url = 'http://ecs.amazonaws.com/onca/xml';
	var search = escape($F('keywords').replace(/'/g,"").replace(/"/g,"")).replace(/%20/g, ",");
	
	var pars = { Service:"AWSECommerceService", AWSAccessKeyId:"0WP94RV66RVMX6FYBMG2",
			     Operation:"ItemLookup", ItemId:asins,
				 ResponseGroup:"Images,ItemAttributes" };

	setStatus("sending itemlookup request...");
    var myAjax = new Ajax.Request( url, { method: 'get', parameters:pars, onSuccess:function(response) {handleItemLookup(response, paneHashes)} });

}


getStamps = function( asins, panename )
{
	setStatus("Querying Amazon...");
    var url = 'http://ecs.amazonaws.com/onca/xml';
	var search = escape($F('keywords').replace(/'/g,"").replace(/"/g,"")).replace(/%20/g, ",");
	
	var pars = { Service:"AWSECommerceService", AWSAccessKeyId:"0WP94RV66RVMX6FYBMG2",
			     Operation:"ItemLookup", ItemId:asins,
				 ResponseGroup:"Images,ItemAttributes" };

	setStatus("sending itemlookup request...");
    var myAjax = new Ajax.Request( url, { method: 'get', parameters:pars, onSuccess:function(response) {handleItemLookup(response, panename)} });
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
		tag:'span',overlap:'horizontal',constraint: false, dropOnEmpty:true,
		containment:["pane1", "pane2", "pane3", "resultspane"],
	}
	Sortable.create('pane1', opts);
	Sortable.create('pane2', opts);
	Sortable.create('pane3', opts);
	setStatus(messages[0]);
 }