Event.observe(window, 'load', init, false);

function init(){
     
     Event.observe('asin', 'keyup', search, false);
     Ajax.getTransport = function() {
    return Try.these(
        function() {return new SWFHttpRequest()},
        function() {return new XMLHttpRequest()},
        function() {return new ActiveXObject('Msxml2.XMLHTTP')},
        function() {return new ActiveXObject('Microsoft.XMLHTTP')}
    ) || false;
};
}

function search(){
     var url = 'http://ecs.amazonaws.com/onca/xml';
	
     var service = "AWSECommerceService";
     var key = "0WP94RV66RVMX6FYBMG2";
     var operation = "ItemLookup";
     var item = escape($F('asin'));
     
     var pars={ Service:service, AWSAccessKeyId:key, 
		Operation:operation, ItemId:item};

     document.getElementById("status").innerHTML = url + pars

     var myAjax = new Ajax.Request( url, {
	method: 'get', 
	parameters: pars,
	onSuccess: function(transport) {alert(transport.responseText);} });
}