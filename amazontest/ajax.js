Event.observe(window, 'load', init, false);

function init(){

     Event.observe('asin', 'keyup', search, false);
     Ajax.getTransport = function() { 
	    /*var f = new flensed.flXHR({
			autoUpdatePlayer:true,			
			xmlResponseText:false,
			onerror:handleError,
			noCacheHeader:false}); */
		var f = new flensed.flXHR({ autoUpdatePlayer:true, instanceId:"myproxy1", xmlResponseText:false, onerror:handleError, onreadystatechange:handleLoading, noCacheHeader:false });
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

function search(){

     var url = 'http://ecs.amazonaws.com/onca/xml';
	
     var service = "AWSECommerceService";
     var key = "0WP94RV66RVMX6FYBMG2";
     var operation = "ItemLookup";
     var item = escape($F('asin'));
     
     var pars="Service=" + service + "&" +
              "AWSAccessKeyId=" + key + "&" +
	      "Operation=" + operation+ "&" + 
 		"ItemId=" + item ;
	//var pars = "";

    //document.getElementById("status").innerHTML = url + "?" + pars

    var myAjax = new Ajax.Updater( "status", url, { method: 'get', parameters:pars } );
}