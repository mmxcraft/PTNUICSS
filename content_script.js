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

/*var allobjs = $("div");
for(var i = 0; i < allobjs.length; i++)
{
	allobjs[i].addEventListener("mouseover", __OnMouseOver_Element__);
}
*/

function escapeID(id) {
		var str = id;
		str = str.replace(/:/g,"\\:");  
		str = str.replace(/\./g,"\\.");  
		str = str.replace(/\//g,"\\/");  
		str = str.replace(/\$/g,"\\$");  
		str = str.replace(/\[/g,"\\[");  
		str = str.replace(/\]/g,"\\]");
		return str;
}

function showCssDialog(e)
{
	var listHtml = '<select id="MofengCSS_Category" name="MofengCSS_Category">';
	listHtml 	+= '<option value="None">------</option><option value="Color">Color</option><option value="Text">Text</option>';
	listHtml 	+= '<option value="Border">Border</option><option value="Radius">Radius</option><option value="Control">Control</option><option value="Display">Display</option>'
	listHtml 	+= '<option value="Image">Image</option><option value="Header">Header</option><option value="Label">Label</option><option value="Sizing">Sizing</option>'
	listHtml 	+= '<option value="Padding">Padding</option><option value="Margin">Margin</option><option value="Position">Position</option><option value="Align">Align</option><option value="Scroll">Scroll</option>'
	listHtml 	+= '<option value="Font25to95em">Font25to95em</option><option value="Font1to2em">Font1to2em</option>';
	
	listHtml 	+= '</select>';
	listHtml 	+= '<div id = "selectable_list">';
	
	listHtml 	+= '<ol id="selectable_Color" class="MofengCSS_Category Color">'; 
	listHtml    += '<li>psc_primary</li><li>psc_transparent</li><li>psc_selected</li><li>psc_grid-rowgradient</li><li>psc_grid-rowgradientodd</li><li>psc_grid-rowgradienteven</li><li>psc_grid-highlightrow</li>';
	listHtml    += '</ol>';
	
	listHtml 	+= '<ol id="selectable_Border" class="MofengCSS_Category Border">'; 
	listHtml 	+= '<li>psc_border-none</li><li>psc_border-standard</li><li>psc_border-transparent</li><li>psc_border-thicker</li><li>psc_border-toponly</li><li>psc_border-bottomonly</li><li>psc_border-leftonly</li>'
	listHtml 	+= '<li>psc_border-rightonly</li><li>psc_grid-rowborderbottom</li><li>psc_grid-border</li><li>psc_grid-cellborders</li>'
	listHtml    += '</ol>';
	
	listHtml 	+= '<ol id="selectable_Radius" class="MofengCSS_Category Radius">'; 
	listHtml 	+= '<li>psc_radius-none</li><li>psc_radius-1px</li><li>psc_radius-10px</li><li>psc_radius-top1px</li><li>psc_radius-top2px</li><li>psc_radius-01em</li><li>psc_radius-1em</li>'
	listHtml 	+= '<li>psc_radius-2em</li><li>psc_radius-top01em</li><li>psc_radius-top1em</li><li>psc_radius-top2em</li>'
	listHtml    += '</ol>';
	
	listHtml 	+= '<ol id="selectable_Control" class="MofengCSS_Category Control">'; 
	listHtml 	+= '<li>psc_control-heightauto</li><li>psc_control-fullwidth</li><li>psc_displayonlyastext_adjust</li><li>psc_control-width1pct</li><li>psc_control-width100pct</li><li>psc_control-width1px</li>'
	listHtml 	+= '<li>psc_control-width100px</li><li>psc_control-width1em</li><li>psc_control-width100em</li><li>psc_control-height1pct</li><li>psc_control-height100pct</li>'
	listHtml 	+= '<li>psc_control-height1px</li><li>psc_control-height100px</li><li>psc_control-height1em</li><li>psc_control-height100em</li>'
	listHtml    += '</ol>';
	
	listHtml 	+= '<ol id="selectable_Display" class="MofengCSS_Category Display">'; 
	listHtml 	+= '<li>psc_shadow-standard</li><li>ps_apps_pageheader</li><li>ps_proc_pageheader</li><li>psc_data-image</li><li>psc_data-primary</li><li>psc_data-secondary</li><li>psc_body_background</li>'
	listHtml 	+= '<li>ps_hidden</li><li>psc_hidden</li><li>psc_force-hidden</li><li>psc_invisible</li><li>ps_inline</li><li>psc_inline</li><li>psc_display-inline</li><li>psc_display-inlineblock</li>'
	listHtml 	+= '<li>psc_display-block</li><li>psc_badge-image</li><li>psc_badge-text</li><li>psc_link-normaltext</li><li>psc_disabled-normaltext</li><li>psc_size-medium</li><li>psc_size-large</li>'
	listHtml 	+= '<li>psc_size-xsmall</li><li>psc_notext</li><li>psc_text-example</li>'
	listHtml    += '</ol>';
	
	listHtml 	+= '<ol id="selectable_Image" class="MofengCSS_Category Image">'; 
	listHtml 	+= '<li>psc_image-widthauto</li><li>psc_image-width1em</li><li>psc_image-width15em</li><li>psc_image-heightauto</li><li>psc_image-height1em</li><li>psc_image-height15em</li><li>psc_image-maxwidthauto</li>'
	listHtml 	+= '<li>psc_image-maxwidth1em</li><li>psc_image-maxwidth15em</li><li>psc_image-maxheightauto</li><li>psc_image-maxheight1em</li><li>psc_image-maxheight15em</li>'
	listHtml    += '</ol>';
	
	listHtml 	+= '<ol id="selectable_Header" class="MofengCSS_Category Header">'; 
	listHtml 	+= '<li>psc_margin-headernone</li><li>psc_header-innerfloat</li><li>psc_header-outerfloat</li><li>psc_header-outerfloatul</li><li>psc_header-nospacing</li><li>psc_header-none</li>'
	listHtml    += '</ol>';
	
	listHtml 	+= '<ol id="selectable_Label" class="MofengCSS_Category Label">'; 
	listHtml 	+= '<li>psc_simple_label</li><li>psc_nolabel</li><li>psc_label-none</li><li>psc_label-invisible</li><li>psc_label-opacity0</li><li>psc_label-opacity1</li><li>psc_label-top</li><li>psc_label-valigntop</li>'
	listHtml 	+= '<li>psc_label-valignbottom</li><li>psc_label-valignbaseline</li><li>psc_label-valignmiddle</li><li>psc_label-halignleft</li><li>psc_label-halignright</li><li>psc_label-haligncenter</li>'
	listHtml 	+= '<li>psc_label-width1pct</li><li>psc_label-width100pct</li><li>psc_label-width1px</li><li>psc_label-width100px</li><li>psc_label-width1em</li><li>psc_label-width100em</li>'
	listHtml 	+= '<li>psc_label-widthauto</li><li>psc_grid-norowlabels</li>'
	listHtml    += '</ol>';
	
	listHtml 	+= '<ol id="selectable_Sizing" class="MofengCSS_Category Sizing">'; 
	listHtml 	+= '<li>psc_width-auto</li><li>psc_width-1pct</li><li>psc_width-100pct</li><li>psc_width-1em</li><li>psc_width-100em</li><li>psc_width-1px</li><li>psc_width-100px</li><li>psc_maxwidth-40em</li>'
	listHtml 	+= '<li>psc_maxwidth-60em</li><li>psc_maxwidth-100pct</li><li>psc_minwidth-20em</li><li>psc_minwidth-0pct</li><li>psc_minwidth-100pct</li><li>psc_minwidth-none</li><li>psc_auto_size</li>'
	listHtml 	+= '<li>psc_block</li><li>psc_fullsize_button</li>'
	listHtml    += '</ol>';
	
	
	listHtml 	+= '<ol id="selectable_Padding" class="MofengCSS_Category Padding">'; 
	listHtml 	+= '<li>psc_padding-none</li><li>psc_padding-bottomnone</li><li>psc_padding-topnone</li><li>psc_padding-leftnone</li><li>psc_padding-rightnone</li><li>psc_force-paddingnone</li>'
	listHtml 	+= '<li>psc_force-nopadding</li><li>psc_padding-05x1em</li><li>psc_padding-075x1em</li><li>psc_padding-1px</li><li>psc_padding-100px</li><li>psc_padding-0_5pct</li>'
	listHtml 	+= '<li>psc_padding-1pct</li><li>psc_padding-50pct</li><li>psc_padding-0_1em</li><li>psc_padding-30em</li><li>psc_padding-50em</li><li>psc_padding-top1px</li>'
	listHtml 	+= '<li>psc_padding-bottom1px</li><li>psc_padding-left1px</li><li>psc_padding-right1px</li><li>psc_padding-sides1px</li>'
	listHtml    += '</ol>';


	listHtml 	+= '<ol id="selectable_Margin" class="MofengCSS_Category Margin">'; 
	listHtml 	+= '<li>psc_margin-none</li><li>psc_margin-bottomnone</li><li>psc_margin-topnone</li><li>psc_margin-leftnone</li><li>psc_margin-rightnone</li><li>psc_force-marginnone</li>'
	listHtml 	+= '<li>psc_force-nomargin</li><li>psc_margin-standard</li><li>psc_margin-auto</li><li>psc_margin-center</li><li>psc_margin-1px</li><li>psc_margin-100px</li>'
	listHtml 	+= '<li>psc_margin-0_5pct</li><li>psc_margin-1pct</li><li>psc_margin-50pct</li><li>psc_margin-01em</li><li>psc_margin-30em</li><li>psc_margin-50em</li><li>psc_margin-top1px</li>'
	listHtml 	+= '<li>psc_margin-bottom1px</li><li>psc_margin-left1px</li><li>psc_margin-right1px</li><li>psc_margin-sides1px</li>'
	listHtml    += '</ol>';
	
	listHtml 	+= '<ol id="selectable_Position" class="MofengCSS_Category Position">'; 
	listHtml 	+= '<li>psc_float-left</li><li>psc_float-right</li><li>psc_float-none</li><li>psc_force-floatnone</li><li>psc_float-clear</li><li>psc_force-floatclear</li><li>psc_float-clearleft</li>'
	listHtml 	+= '<li>psc_float-clearright</li><li>psc_float-clearoverflow</li><li>psc_pos-absolute</li><li>psc_pos-relative</li><li>psc_pos-static</li><li>psc_pos-fixed</li>'
	listHtml    += '</ol>';
	

	listHtml 	+= '<ol id="selectable_Align" class="MofengCSS_Category Align">'; 
	listHtml 	+= '<li>psc_halign-right</li><li>psc_halign-left</li><li>psc_halign-center</li><li>psc_valign-top</li><li>psc_valign-bottom</li><li>psc_valign-middle</li><li>psc_valign-baseline</li>'
	listHtml 	+= '<li>psc_lineheight-full</li><li>psc_lineheight-100pct</li>'
	listHtml    += '</ol>';


	listHtml 	+= '<ol id="selectable_Scroll" class="MofengCSS_Category Scroll">'; 
	listHtml 	+= '<li>psc_noscroll</li><li>psc_scroll</li><li>ps_scrollable_h</li><li>ps_scrollable_v</li><li>ps_scrollable_both</li><li>psc_overflow-hidden</li><li>psc_overflow-auto</li>'
	listHtml 	+= '<li>psc_overflow-xhidden</li><li>psc_overflow-yhidden</li><li>psc_overflow-xauto</li><li>psc_overflow-yauto</li>'
	listHtml    += '</ol>';

	listHtml 	+= '<ol id="selectable_Font1to2em" class="MofengCSS_Category Font1to2em">'; 
	listHtml 	+= '<li>psc_font-size1em</li><li>psc_font-size11em</li><li>psc_font-size12em</li><li>psc_font-size13em</li><li>psc_font-size14em</li><li>psc_font-size15em</li>';
	listHtml 	+= '<li>psc_font-size16em</li><li>psc_font-size17em</li><li>psc_font-size18em</li><li>psc_font-size19em</li><li>psc_font-size2em</li>';
	listHtml 	+= '</ol>';
	
	listHtml 	+= '<ol id="selectable_Font25to95em" class="MofengCSS_Category Font25to95em">'; 
	listHtml 	+= '<li>psc_font-size025em</li><li>psc_font-size033em</li><li>psc_font-size05em</li><li>psc_font-size06em</li><li>psc_font-size07em</li><li>psc_font-size075em</li>';
	listHtml 	+= '<li>psc_font-size08em</li><li>psc_font-size085em</li><li>psc_font-size09em</li><li>psc_font-size095em</li>';
	listHtml 	+= '</ol>';
	
	listHtml    += '<ol id="selectable_Text" class="MofengCSS_Category Text">';
	listHtml    += '<li>psc_title-page</li><li>psc_title-sub</li><li>psc_title-h1</li><li>psc_title-h2</li><li>psc_title-h3</li><li>psc_title-h4</li><li>psc_title-h5</li><li>psc_title-h6</li><li>psc_link-textsize</li>';
	listHtml    += '<li>psc_link-normaltext</li><li>psc_text-example</li><li>psc_strong</li><li>psc_wrap</li><li>psc_nowrap</li><li>psc_text_center</li>'
	listHtml	+= '</ol></div>';
	listHtml    += '<label for="orgCss">Org CSS </label><textarea name="Org CSS" id="orgCss" cols="50" rows="2"></textarea><BR></BR>';
	listHtml    += '<label for="newCss">New CSS</label><textarea name="New CSS" id="newCss" cols="50" rows="4" ></textarea><BR></BR>';
	
	var strOwner =  e.currentTarget.id;
		strOwner = strOwner.replace(/:/g,"\\:");  
		strOwner = strOwner.replace(/\./g,"\\.");  
		strOwner = strOwner.replace(/\//g,"\\/");  
		strOwner = strOwner.replace(/\$/g,"\\$");  
		strOwner = strOwner.replace(/\[/g,"\\[");  
		strOwner = strOwner.replace(/\]/g,"\\]");
	
	$("#MofengSelectId").val("#"+strOwner);
	
	$("#PTNUICSSdialog").html(listHtml).dialog({
	title:"CSS Picker",
	width:600,
	modal: true,
	open: function(event, ui){
			$(".MofengCSS_Category").hide();
			var selectedId = $("#MofengSelectId").val();
			var orgCss=$(selectedId).attr('class');
			$("#orgCss").val(orgCss);
			$("#newCss").val(orgCss);

			$("#MofengCSS_Category").change(function(e){
					listSeleCategory(e);
			});
	},
	buttons: {
			  "Add CSS": function() {
				addCss();
			 },
			
			 "Apply CSS":function() {
				applyCss();  
			 }
			}
	});

}

function listSeleCategory(e)
{
	$(".MofengCSS_Category").hide();	
	var cateSel = $("#MofengCSS_Category").val();
	cateSel="#selectable_"+cateSel;
	$(cateSel).show();
	
	$('.MofengCSS_Category').selectable();
}

function addCss()
{
	var cateSel = $("#MofengCSS_Category").val();
	cateSel="#selectable_"+cateSel;
	cateSel= cateSel + "> li.ui-selected"
	var userSeleCss = new Array();
	for(i = 0; i < $(cateSel).length; i++) {
		userSeleCss[i] = $(cateSel)[i].innerText;
	}
	var selectedCss = $("#newCss").val();
	if(selectedCss == "") {
		$("#newCss").val(userSeleCss);
	} else {
		for(i = 0; i < userSeleCss.length; i++) {
			if(selectedCss.indexOf(userSeleCss[i]) == -1) {
				selectedCss = selectedCss + " " + userSeleCss[i];
			}
		}
		$("#newCss").val(selectedCss);
	}

}

function applyCss()
{
	var selectedId = $("#MofengSelectId").val();
	$(selectedId).attr("class", $("#newCss").val());
}

$('<div id="selector"><div id="selector-top"></div><div id="selector-left"></div><div id="selector-right"></div><div id="selector-bottom"></div></div>').appendTo("body");
$('<div id="PTNUICSSdialog"></div>').appendTo("body");
$('<div id="MofengSelectId"></div>').appendTo("body");

var elements = {
    top: $('#selector-top'),
    left: $('#selector-left'),
    right: $('#selector-right'),
    bottom: $('#selector-bottom')
};

$(document).mousemove(function(event) {
    if(event.target.id.indexOf('selector') !== -1 || event.target.tagName === 'BODY' || event.target.tagName === 'HTML') return;
	
	var id = escapeID(event.target.id);
	
	var idTagName = $("#" + id).prop("tagName");

    //console.log("id=%s, idTagname=%s, tagname=%s",id, idTagName, event.target.tagName);
	
	//if(idTagName != 'DIV') return;
    
    var $target = $(event.target);
        targetOffset = $target[0].getBoundingClientRect(),
        targetHeight = targetOffset.height,
        targetWidth  = targetOffset.width;
    
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

$("div").mousedown(function(event){
	if(2 != event.which) {
		return;
	}
	var id = escapeID(event.currentTarget.id);
	var idTagName = $("#" + id).prop("tagName");
	console.log("id=%s, idTagname=%s, tagname=%s",id, idTagName, event.currentTarget.tagName);

	var curDivId = $("#" + id).prop("id");
	var parentDivId = $("#" + id).parent().prop("id");

	if(event.currentTarget.tagName == "DIV" && curDivId.indexOf(parentDivId) == -1) {
		showCssDialog(event);
		event.stopPropagation();
	}
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