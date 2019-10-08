
function showHideToc()
{
	
	var tocMenu = document.getElementsByClassName("md-sidebar--secondary");
	var divContent = document.getElementsByClassName("md-content");
	
	 
	var disp = tocMenu[0].style.display;
	if (disp == "none") //currently it's hide
	{
		tocMenu[0].removeAttribute("style");
		divContent[0].removeAttribute("style");
	}
	else
	{
		tocMenu[0].setAttribute("style","display:none;");
		divContent[0].setAttribute("style", "margin-right:0px!important;");
	}
	
}