<?
if (error_get_last() != NULL && !array_key_exists("error", $_SESSION))
{
    $_SESSION["error"] = _("Something went wrong behind the scenes. No worries, our engineers have been alerted!");
}
?>
<?
if (array_key_exists("error", $_SESSION))
{
	echo "<table style='border:0px;'><tr><td>";
    echo "<h1>"._("Oh, Snap!")."</h1>";
    echo "<p>".$_SESSION["error"]."</p>";
    echo "<p>"._("Please don't hate us :(")."</p>";
    echo "<p>--- Team Fanglr.</p>";
	echo "</td><td><img src='fangr2a.png' onmouseover=\"this.src='fangr2b.png'\" onmouseout=\"this.src='fangr2a.png'\"></td></tr></table>";
    unset($_SESSION["error"]);
}
if ($GLOBALS['fanglr'] == FANGLR_LIVE)
{
?>
<p>
<a href="/#HOME#about.html"><? echo _("About"); ?></a> |
<a href="/#HOME#privacy.html"><?  echo _("Privacy"); ?></a> |
<a href="http://fanglr.blogspot.com/"><? echo _("Blog"); ?></a> |
<a href="http://fanglr.uservoice.com/"><? echo _("Feedback"); ?></a>
</p>
<?
}
?>
<p>&copy;2009 Fanglr</p>
<?
if ($GLOBALS['fanglr'] == FANGLR_LIVE)
{
?>
<script src="http://fanglr.uservoice.com/pages/general/widgets/tab.js?alignment=left&amp;color=00BCBA" type="text/javascript"></script>
<script src="https://rpxnow.com/openid/v2/widget"
        type="text/javascript"></script>
<script type="text/javascript">
  RPXNOW.token_url = "#SITE##HOME#login.html";
  
  RPXNOW.realm = "fanglr";
  RPXNOW.overlay = true;
</script>
<?
}
?>
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-7021515-1");
pageTracker._trackPageview();
} catch(err) {}</script>
</body>
</html>
