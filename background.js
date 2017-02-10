var data = {};
var csslist = {};
var original_css = {};
chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
	if(request.type !== "nui-css-information")
		return;
	data = request;
	csslist = JSON.parse(data.csslist);
	original_css = JSON.parse(data.original_css);
});