for(var i = 0; i < $('link').length; i++)
{
	if($('link')[i].rel.toLowerCase() == 'stylesheet')
	{
		var regex = /\/cs\/ps\/cache\/[A-Z_]*_[0-9]*.css/gi;
		var match = $('link')[i].href.match(regex);
		if(typeof match != "undefined" && null != match)
		{
			if(css_value == match[0])
			{
				console.log(match[0]);
				$('link')[i].parentNode.removeChild($('link')[i]);
				break;
			}
		}
	}
}