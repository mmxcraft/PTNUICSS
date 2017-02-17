//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//define anonymous function
(function() {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function __Update_CSSFile__()
{
	var styleSheetList = document.styleSheets;
			   
	var selcss = $("select#PEOPLETOOLS_NUI_ASSISTANT_CSS_FILE_LIST");
	selcss.empty();
	selcss.append("<option value='-1'>-- CSS --</option>");
	for(var j = 0; j < styleSheetList.length; j++) {
		if(styleSheetList[j].href != null)
		{
			var match = styleSheetList[j].href.match(/[^/]*_/i);
			if(typeof match != "undefined" && null != match)
			{
				var css_name = match[0].substr(0, match[0].length - 1);
				selcss.append("<option value='" + j + "'>" + $("<div></div>").text(css_name).html() + "</option>");
			}
		}
	}
}

function __Update_CSSRule__(index)
{
	if(index == -1)
		return;
	var styleSheetList = document.styleSheets;
	var selrule = $("select#PEOPLETOOLS_NUI_ASSISTANT_CSS_RULE_LIST");
	selrule.empty();
	selrule.append("<option value=''>--  Class -- </option>");
	//console.log(styleSheetList[index].rules.length);
	for(var j = 0; j < (styleSheetList[index].rules.length); j++) {
		if(styleSheetList[index].rules[j].type == CSSRule.STYLE_RULE)
		{
		//console.log(styleSheetList[index].rules[j].selectorText);
		var match = styleSheetList[index].rules[j].selectorText.match(/\.[a-z0-9_\-\.,]*[^\s]/gi);
		if(typeof match != "undefined" && null != match)
			{
				for(var x = 0; x < match.length; x++)
				{
					var css_rule = match[x].substr(1);
					//console.log(css_rule);
					selrule.append("<option value='" + $("<div></div>").text(css_rule).html() + "'>" + $("<div></div>").text(css_rule).html() + "</option>");
				}
			}
		}
	}
}

function __Add_CSSRule__()
{
	$("input#PEOPLETOOLS_NUI_ASSISTANT_ELEMENT_OWNER_CLASS").val($("input#PEOPLETOOLS_NUI_ASSISTANT_ELEMENT_OWNER_CLASS").val() + " " + $("select#PEOPLETOOLS_NUI_ASSISTANT_CSS_RULE_LIST").val());
}

function __Apply_CSSRule__(ele_id)
{
	$("#" + ele_id).attr("class", $("input#PEOPLETOOLS_NUI_ASSISTANT_ELEMENT_OWNER_CLASS").val());
}

function __OnChange_CSSRule__(e)
{
	__Update_CSSRule__(e.target.value);
}

function __OnChange_Elements__(e)
{
	console.log(e.target.value);
	$("input#PEOPLETOOLS_NUI_ASSISTANT_ELEMENT_OWNER_CLASS").val($("#" + e.target.value).attr("class"));
}

function __OnMouseOver_Element__(e)
{
	var id_prefix = e.target.id.substr(0, 26);
	var className = e.target.className;
	//var filterClass = className.indexOf('ps_box-scrollarea-row') || className.indexOf(')
	if(e.ctrlKey && e.altKey && id_prefix != "PEOPLETOOLS_NUI_ASSISTANT_")
	//if(e.ctrlKey && e.altKey && id_prefix != "PEOPLETOOLS_NUI_ASSISTANT_" || className.indexOf('ps_') !== -1 || className.indexOf('psc_') !== -1)	
	{
		if(!$(e.target).attr("id") || $(e.target).attr("id") == "undefined" || $(e.target).attr("id") == "")
		{
			$(e.target).attr("id", e.target.tagName + "_" + (new Date()).getTime());
		}

		/*if(!$(e.target).attr("original-style") || $(e.target).attr("original-style") == "undefined" || $(e.target).attr("original-style") == "" || $(e.target).attr("original-style") != "SAVED")
		{

			//$(e.target).attr("original-border-color", $(e.target).css("border-color"));
			//$(e.target).attr("original-border-width", $(e.target).css("border-width"));
			//$(e.target).attr("original-border-style", $(e.target).css("border-style"));
			//$(e.target).attr("original-padding", $(e.target).css("padding"));
			
			$(e.target).attr("original-style", "SAVED");
		}
		*/
		//$(e.target).css({"border-color": "#C1E0FF", "border-width": "1px", "border-style": "dashed"});
		//$(e.target).css({"padding": "10px 10px 10px 10px"});
		
		var strOwner =  e.target.id;
		strOwner = strOwner.replace(/:/g,"\\:");  
		strOwner = strOwner.replace(/\./g,"\\.");  
		strOwner = strOwner.replace(/\//g,"\\/");  
		strOwner = strOwner.replace(/\$/g,"\\$");  
		strOwner = strOwner.replace(/\[/g,"\\[");  
		strOwner = strOwner.replace(/\]/g,"\\]");
	
		$("div#PEOPLETOOLS_NUI_ASSISTANT_HTML_ELEMENT_MASK_OWNERID_HTML_ELEMENT_MASK").attr("owner", strOwner);
		$("div#PEOPLETOOLS_NUI_ASSISTANT_HTML_ELEMENT_MASK_OWNERID_HTML_ELEMENT_MASK").css({'left': $(e.target).offset().left, 'top': $(e.target).offset().top, 'width': e.target.offsetWidth + 'px', 'height': e.target.offsetHeight + 'px'});
		$("div#PEOPLETOOLS_NUI_ASSISTANT_HTML_ELEMENT_MASK_OWNERID_HTML_ELEMENT_MASK").css({ display : 'block'});
	}
}

function __OnMouseOut_Element__(e) {
	e.target.style.display = "none";
	var strOwner = $(e.target).attr("owner");
	console.log("Owner: " + strOwner);
	
	/*console.log($("#" + strOwner).attr("original-border-color"));
	console.log($("#" + strOwner).attr("original-border-width"));
	console.log($("#" + strOwner).attr("original-border-style"));
	console.log($("#" + strOwner).attr("original-padding"));*/
	
	/*$("#" + strOwner).css({
		"border-color": $("#" + strOwner).attr("original-border-color"),
		"border-width": $("#" + strOwner).attr("original-border-width"),
		"border-style": $("#" + strOwner).attr("original-border-style"),
		"padding": $("#" + strOwner).attr("original-padding")
	});*/
	
	
	$("#" + strOwner).attr("original-style", "");			
}

function __OnMouseOut_Mask__(e) {
	//console.log(e.target.tagName + "<mouseout>: " + e.target.id + ": " + e.target.className);
}

function __OnDblclick_Element__(e) {
	var selele = $("select#PEOPLETOOLS_NUI_ASSISTANT_ELEMENTS_LIST");
	selele.empty();
	var strOwner = $(e.target).attr("owner");
	for(j = 0, ele = $("#" + strOwner); j < 3 && ele != ele.parent(); j++, ele = ele.parent())
	{
		if(!ele.attr("id") || ele.attr("id") == "undefined" || ele.attr("id") == "")
		{
			ele.attr("id", ele.prop("tagName") + "_" + (new Date()).getTime());
		}
		var strID = ele.attr("id");
		var strEscapeID = ele.attr("id");
		strEscapeID = strEscapeID.replace(/:/g,"\\:");  
		strEscapeID = strEscapeID.replace(/\./g,"\\.");  
		strEscapeID = strEscapeID.replace(/\//g,"\\/");  
		strEscapeID = strEscapeID.replace(/\$/g,"\\$");  	
		strEscapeID = strEscapeID.replace(/\[/g,"\\[");  
		strEscapeID = strEscapeID.replace(/\]/g,"\\]");
		
		var padding = new Array();
		padding[0] = "&nbsp;&nbsp;&nbsp";
		padding[1] = "&nbsp;&nbsp";
		padding[2] = "&nbsp";
		selele.append("<option value='" + strEscapeID + "'>" + padding[j] + ele.prop("tagName") + ":" + $("<div></div>").text(strID).html() + "</option>");
	}
	
	$("input#PEOPLETOOLS_NUI_ASSISTANT_ELEMENT_OWNER_CLASS").val($("#" + $(e.target).attr("owner")).attr("class"));
	$(function() {
	   $("#PEOPLETOOLS_NUI_ASSISTANT_HTML_ELEMENT_MASK_OWNERID_HTML_DIALOG").dialog({
		  height: 400,
		  width: 600,
		  modal: true,
		  title: 'Select StyleSheet',
		  open: function(event, ui){
			  __Update_CSSFile__();
		  },
		  buttons: {
			  "Ok": function() {
				  __Apply_CSSRule__($("#PEOPLETOOLS_NUI_ASSISTANT_ELEMENTS_LIST").val());
				  $(this).dialog("close"); 
				  }
		 }  
		});
	});
}

var allobjs = $("div");
for(var i = 0; i < allobjs.length; i++)
{
	allobjs[i].addEventListener("mouseover", __OnMouseOver_Element__);
}
$('<div id="selector"><div id="selector-top"></div><div id="selector-left"></div><div id="selector-right"></div><div id="selector-bottom"></div></div>').appendTo("body");
var elements = {
    top: $('#selector-top'),
    left: $('#selector-left'),
    right: $('#selector-right'),
    bottom: $('#selector-bottom')
};

$(document).mousemove(function(event) {
    if(event.target.id.indexOf('selector') !== -1 || event.target.tagName === 'BODY' || event.target.tagName === 'HTML') return;
    
    var $target = $(event.target);
        targetOffset = $target[0].getBoundingClientRect(),
        targetHeight = targetOffset.height,
        targetWidth  = targetOffset.width;
    //console.log(targetOffset);
    
    elements.top.css({
        left:  (targetOffset.left - 4),
        top:   (targetOffset.top - 4),
        width: (targetWidth + 5)
    });
    elements.bottom.css({
        top:   (targetOffset.top + targetHeight + 1),
        left:  (targetOffset.left  - 3),
        width: (targetWidth + 4)
    });
    elements.left.css({
        left:   (targetOffset.left  - 5),
        top:    (targetOffset.top  - 4),
        height: (targetHeight + 8)
    });
    elements.right.css({
        left:   (targetOffset.left + targetWidth + 1),
        top:    (targetOffset.top  - 4),
        height: (targetHeight + 8)
    });
    
});


/*var maskNode = document.createElement('div');
maskNode.id = 'PEOPLETOOLS_NUI_ASSISTANT_HTML_ELEMENT_MASK_OWNERID_HTML_ELEMENT_MASK';
maskNode.style = "width:100%; height:100%; background-color:#000099; filter:alpha(opacity=50); -moz-opacity:0.5; opacity:0.5;  position:absolute; left:0px; top:0px; display:none; z-index:99;";
maskNode.addEventListener("mouseout", __OnMouseOut_Element__);
maskNode.addEventListener("dblclick", __OnDblclick_Element__);
document.body.appendChild(maskNode);

var divNode = document.createElement('div');
divNode.id = 'PEOPLETOOLS_NUI_ASSISTANT_HTML_ELEMENT_MASK_OWNERID_HTML_DIALOG';
divNode.style.display = "none";

var sel0Node = document.createElement('select');
sel0Node.id = 'PEOPLETOOLS_NUI_ASSISTANT_ELEMENTS_LIST';
sel0Node.addEventListener("change", __OnChange_Elements__);

var sel1Node = document.createElement('select');
sel1Node.id = 'PEOPLETOOLS_NUI_ASSISTANT_CSS_FILE_LIST';
sel1Node.addEventListener("change", __OnChange_CSSRule__);

var sel2Node = document.createElement('select');
sel2Node.id = 'PEOPLETOOLS_NUI_ASSISTANT_CSS_RULE_LIST';

var addClassNode = document.createElement('input');
addClassNode.type = "button";
addClassNode.value = "Add Class"
addClassNode.id = 'PEOPLETOOLS_NUI_ASSISTANT_CSS_RULE_LIST_ADD_CLASS';
addClassNode.addEventListener("click", __Add_CSSRule__);

var ownerClassNode = document.createElement('input');
ownerClassNode.type = "text";
ownerClassNode.size = "50"
ownerClassNode.value = ""
ownerClassNode.id = 'PEOPLETOOLS_NUI_ASSISTANT_ELEMENT_OWNER_CLASS';

var tblNode = document.createElement('table');
var tr0Node = tblNode.insertRow();
var tr1Node = tblNode.insertRow();
var tr2Node = tblNode.insertRow();
var tr3Node = tblNode.insertRow();
var tr4Node = tblNode.insertRow();
var tdNode0 = tr0Node.insertCell();
var tdNode1 = tr1Node.insertCell();
var tdNode2 = tr2Node.insertCell();
var tdNode3 = tr3Node.insertCell();
var tdNode4 = tr4Node.insertCell();

tdNode0.appendChild(sel0Node);
tdNode1.appendChild(sel1Node);
tdNode2.appendChild(sel2Node);
tdNode3.appendChild(addClassNode);
tdNode4.appendChild(ownerClassNode);

divNode.appendChild(tblNode);
document.body.appendChild(divNode);

var msg = {};
var host = "null";
if(typeof url == "undefined" || null == url)
	url = window.location.href;
var match = url.match(/http[s]?:\/\/[a-z0-9]*\.us\.oracle\.com:*[0-9]*\//gi);
if(typeof match != "undefined" && null != match)
{
	host = match[0];
	var styleSheetList = document.styleSheets;
	var jsonstring2 = "[";
	for(var j = 0; j < styleSheetList.length; j++)
	{
		if(styleSheetList[j].href != null)
		{
			var match1 = styleSheetList[j].href.match(/[^/]*_/i);
			if(typeof match1 != "undefined" && null != match1)
			{
				var css_name = match1[0].substr(0, match1[0].length - 1);
				jsonstring2 += "{\"name\" : \"" + css_name + "\"},";
			}
		}
	}
	jsonstring2 += "]";
	jsonstring2 = jsonstring2.replace(/,\]/g, "]");
	//console.log(host);
	var ajaxobj = $.ajax({url:"/psc/ps/EMPLOYEE/QE_LOCAL/s/WEBLIB_PTBR.ISCRIPT1.FieldFormula.IScript_ListCSS",async:false});
	var jsonstring1 = ajaxobj.responseText;
	jsonstring1 = jsonstring1.replace(/,\]/g, "]");
	jsonstring1 = jsonstring1.replace(/'/g, "\"");
	msg = {
			type: "nui-css-information",
			csslist : jsonstring1,
			original_css: jsonstring2,
			url: document.URL
		};

}

chrome.runtime.sendMessage(msg);*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//call anonymous function
}());
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////