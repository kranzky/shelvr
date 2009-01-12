Event.observe(window, 'load', init, false);

function init(){
     $('go').style.display = 'none';
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

     var service = "Service=AWSECommerceService";
     var key = "AWSAccessKeyId=0WP94RV66RVMX6FYBMG2";
     var operation = "Operation=ItemLookup";
     var item = "ItemId="+escape($F('asin'));
     
     var pars=url + service + "&" + key + "&" + operation + "&" + item

     var myAjax = new Ajax.Updater("results", url, {method: 'get', parameters: pars});
}