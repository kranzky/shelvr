Event.observe(window, 'load', init, false);

function init(){
     
     Event.observe('asin', 'keyup', search, false);
     Ajax.getTransport = function() { 
	return new flensed.flXHR({instancePooling:true,autoUpdatePlayer:true,xmlResponseText:false,onerror:handleError,loadPolicyURL:"http://ecs.amazonaws.com/crossdomain.xml"}); 
     };
}

function handleError() { alert("Errors")}

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

     document.getElementById("status").innerHTML = url + "?" + pars

     var myAjax = new Ajax.Request( url, {
	method: 'post', 
	onComplete: function(transport) {alert(transport.responseText + transport.statusNumber + transport.status);} });
}