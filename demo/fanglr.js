doStamp = function(i) {
	document.write('<span class="stamp" id=sa_' + i + '"1">');
	document.write('<img class="cover" id=a_' + i + '"1" src="fallout3.jpg" alt="" />')
	document.write('<br>This is game number ' + i)
	document.write('</span>');
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
	document.write('<span class="menuheading" onmouseover=showmenu("' + name + '") onmouseout=hidemenu("' + name + '") )><div class="menuheadingtext">'+title+'</div>' );
	document.write('<div class="menu" id="' + name + '" > ' );

	var chks = []
	for (i=0;i<itms.length;i++)
	{	
	    var chkname = 'chk' + name + i
		itm = itms[i];
		document.write('<div class="menuitem' + i%2 + '" onClick=toggleCheckBox("'+chkname+'");>' );
		document.write('<input type="checkbox" id="'+chkname+'">' + itm + '</div>');
		chks.push("'" + chkname + "'");
	}
	document.write('<div><span class="minilink" onclick=checkAll(['+chks+'])>Check All</span><span class="minilink" onclick=checkNone(['+chks+'])>None</span></div>');
	document.write('</div></span>');
	hidemenu(name);
}

function showmenu(elmnt)
{
document.getElementById(elmnt).style.visibility="visible";

}
function hidemenu(elmnt)
{
document.getElementById(elmnt).style.visibility="hidden";
}