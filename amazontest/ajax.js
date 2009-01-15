Event.observe(window, 'load', init, false);

function init(){

     //Event.observe('asin', 'keyup', search, false);
     Ajax.getTransport = function() { 
	    /*var f = new flensed.flXHR({
			autoUpdatePlayer:true,			
			xmlResponseText:false,
			onerror:handleError,
			noCacheHeader:false}); */
		var f = new flensed.flXHR({ autoUpdatePlayer:true, xmlResponseText:true, onerror:handleError, noCacheHeader:false });
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

function itemsearch(responseObject) 
{

	$('status').innerHTML = "Parsing...";
	XMLDOM = responseObject.responseXML;
	items = XMLDOM.getElementsByTagName('Item');

	var s = "";
	
	for (var i = 0; i < items.length; i++) 
	{	
		try {
			var item = items[i];
			var imageurl = item.getElementsByTagName("MediumImage")[0].getElementsByTagName("URL")[0].textContent;
			var asinid = item.getElementsByTagName("ASIN")[0].textContent;
			var title = item.getElementsByTagName("ItemAttributes")[0].getElementsByTagName("Title")[0].textContent;
			s += '<span class="stamp"><img class="cover" src="'+ imageurl + '"/><br/>' + title +'</span> \n';
		} catch(err) {
			// Probably there was no image etc
		}
	}

	$('results').innerHTML = s;
	$('status').innerHTML = "Done";
}

function search(){
	$('status').innerHTML = "Fetching...";
    var url = 'http://ecs.amazonaws.com/onca/xml';
	var search = escape($F('keywords').replace(/'/g,"").replace(/"/g,"")).replace(/%20/g, ",");
	
	var pars = { Service:"AWSECommerceService", AWSAccessKeyId:"0WP94RV66RVMX6FYBMG2",
			     Operation:"ItemSearch", //ItemId:escape($F('asin')),
				 ResponseGroup:"Images,ItemAttributes", Keywords:search,
				 SearchIndex:"VideoGames" };

	
    var myAjax = new Ajax.Request( url, { method: 'get', parameters:pars, onSuccess:function(response) {itemsearch(response)} });
}
