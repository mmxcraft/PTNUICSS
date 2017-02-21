$(window).load(function(){

function listSeleCategory()
{
	$(".CSS_Category").hide();	
	var cateSel = $("#CSS_Category").val();
	cateSel="#selectable_"+cateSel;
	$(cateSel).show(); 
}

function addCss()
{
	var cateSel = $("#CSS_Category").val();
	cateSel="#selectable_"+cateSel;
	cateSel= cateSel + "> li.ui-selected"
	var userSeleCss = new Array();
	for(i = 0; i < $(cateSel).length; i++) {
		userSeleCss[i] = $(cateSel)[i].innerText;
	}
	var selectedCss = $("#AddCss").val();
	if(selectedCss == "") {
		$("#AddCss").val(userSeleCss);
	} else {
		for(i = 0; i < userSeleCss.length; i++) {
			if(selectedCss.indexOf(userSeleCss[i]) == -1) {
				selectedCss = selectedCss + "," + userSeleCss[i];
			}
		}
		$("#AddCss").val(selectedCss);
	}

}

function applyCss()
{
	var AppliedCss = $("#ApplyCss").val();
	var selectedCss = $("#AddCss").val().split(",");
	for(i = 0; i < selectedCss.length; i++) {
		if(AppliedCss.indexOf(selectedCss[i]) == -1) {
			AppliedCss = AppliedCss + "," + selectedCss[i];
		}
	}

	$("#ApplyCss").val(selectedCss);
}

function showCssDialog(e)
{
	var listHtml = '<select id="CSS_Category" name="CSS_Category">'
	listHtml 	+= '<option value="allCssList">allCssList</option><option value="Color">Color</option><option value="Text">Text</option></select>';
	listHtml 	+= '<div id = "selectable_list"> ';
	listHtml    += '<label for="selectable_allCssList" class="CSS_Category allCssList">All CSS List: </label> <input id="selectable_allCssList" class="CSS_Category allCssList">';
	listHtml 	+= '<ol id="selectable_Color" class="CSS_Category Color">'; 
	listHtml    += '<li>psc_primary</li><li>psc_transparent</li><li>psc_selected</li><li>psc_grid-rowgradient</li><li>psc_grid-rowgradientodd</li><li>psc_grid-rowgradienteven</li><li>psc_grid-highlightrow</li>';
	listHtml    += '</ol>';
	listHtml    += '<ol id="selectable_Text" class="CSS_Category Text">';
	listHtml    += '<li>psc_title-page</li><li>psc_title-sub</li><li>psc_title-h1</li><li>psc_title-h2</li><li>psc_title-h3</li><li>psc_title-h4</li><li>psc_title-h5</li><li>psc_title-h6</li><li>psc_link-textsize</li>';
	listHtml    += '<li>psc_link-normaltext</li><li>psc_text-example</li><li>psc_strong</li></ol></div>';
	listHtml    += '<BR></BR>';
	listHtml    += '<label for="AddCss">Add CSS </label><textarea name="Add CSS" id="AddCss" cols="50" rows="4"></textarea><BR></BR>';
	listHtml    += '<label for="ApplyCss">Apply CSS</label><textarea name="Apply CSS" id="ApplyCss" cols="50" rows="4" ></textarea><BR></BR>';
	$("#dialog").html(listHtml).dialog({
	width:600,
	modal: true,
	open: function(event, ui){
			$(".CSS_Category").hide();
			$("#selectable_allCssList").show();
			$( "#selectable_allCssList" ).autocomplete({
				source: css_tag_list
			});

			$("#CSS_Category").change(function(e){
					listSeleCategory();
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
	$('.CSS_Category').selectable();
}

$("#CSS_Category_Btn").click(function(e) {
	showCssDialog(event);
});


$( "#selectable_Color" ).selectable();
$( "#selectable_Text" ).selectable();

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

var ii=1;

$("div").mousedown(function(event){
	if(2 != event.which) {
		return true;
	}

    console.log("id=%s,ii=%d", event.currentTarget.id,ii++);	
	if(event.currentTarget.id == 'test1') {
		showCssDialog(event);
		event.stopPropagation();
	}

});



var css_tag_list = [
"ps_apps_content",
"ps_apps_pageheader",
"ps_button_backnav",
"ps_button_bar",
"ps_button_stdheader",
"ps_collection",
"ps_grid-norowborder",
"ps_header_button",
"ps_label-hide",
"ps_label-show",
"ps_menucontainer",
"ps_menitem",
"ps_menusection",
"ps_menutype-grid",
"ps_proc_pageheader",
"psc_align-center",
"psc_auto_size",
"psc_background-transparent",
"psc_badge-hide",
"psc_badge-image",
"psc_badge-text",
"psc_baritem-first",
"psc_baritem-last",
"psc_block",
"psc_body_background",
"psc_bold",
"psc_border",
"psc_bordert",
"psc_border-bottomonly",
"psc_border-content",
"psc_border-header",
"psc_border-headernone",
"psc_border-leftonly",
"psc_border-none",
"psc_border-rightonly",
"psc_border-standard",
"psc_border-thicker",
"psc_border-toponly",
"psc_border-transparent",
"psc_button-minwidth20em",
"psc_button-next",
"psc_button-previous",
"psc_button-simple",
"psc_clip-content",
"psc_clip-overflow",
"psc_colon",
"psc_column-2",
"psc_column-3",
"psc_columnitem-1of2",
"psc_columnitem-1of2-fixed",
"psc_columnitem-1of3",
"psc_columnitem-2of2",
"psc_columnitem-2of3",
"psc_columnitem-3of10",
"psc_columnitem-3of3",
"psc_columnitem-7of10",
"psc_columnitem-auto",
"psc_confirmation-area",
"psc_confirmation-msg",
"psc_container-small",
"psc_control-fullwidth",
"psc_control-height1em",
"psc_control-height20em",
"psc_control-height1pct",
"psc_control-height100pct",
"psc_control-height1px",
"psc_control-height100px",
"psc_control-heightauto",
"psc_control-width1em",
"psc_control-width100em",
"psc_control-width1pct",
"psc_control-width100pct",
"psc_control-width1px",
"psc_control-width100px",
"psc_control-widthauto",
"psc_data-image",
"psc_data-primary",
"psc_data-secondary",
"psc_direction-row",
"psc_disabled-normaltext",
"psc_display-block",
"psc_display-inline",
"psc_display-inlineblock",
"psc_displayonlyastext_adjust",
"psc_distribute",
"psc_edit-adjustforlink",
"psc_fieldset-hidereadable",
"psc_fld-aligned",
"psc_fld-autolabel",
"psc_fld-standard",
"psc_flex-equal",
"psc_flex-least",
"psc_flex-less",
"psc_flex-more",
"psc_flex-most",
"psc_flex-none",
"psc_flex-same",
"psc_float-clear",
"psc_float-clearleft",
"psc_float-clearoverflow",
"psc_float-left",
"psc_float-none",
"psc_font-size1em",
"psc_font-size11em",
"psc_font-size12em",
"psc_font-size13em",
"psc_font-size14em",
"psc_font-size15em",
"psc_font-size16em",
"psc_font-size17em",
"psc_font-size18em",
"psc_font-size19em",
"psc_font-size2em",
"psc_font-size025em",
"psc_font-size033em",
"psc_font-size05em",
"psc_font-size06em",
"psc_font-size07em",
"psc_font-size075em",
"psc_font-size08em",
"psc_font-size085em",
"psc_font-size09em",
"psc_font-size095em",
"psc_font-sizeinitial",
"psc_fontsize-inherit",
"psc_force-floatclear",
"psc_force-floatnone",
"psc_force-hidden",
"psc_force-marginnone",
"psc_force-nomargin",
"psc_force-nopadding",
"psc_force-paddingnone",
"psc_fullsize_button",
"psc_grid-allowscroll",
"psc_grid-allowscrollv",
"psc_grid-border",
"psc_grid-borderall",
"psc_grid-borderbottom",
"psc_grid-bordernone",
"psc_grid-bordersides",
"psc_grid-bordertop",
"psc_grid-bordertopbottom",
"psc_grid-cellborders",
"psc_grid-collection",
"psc_grid-countabovebody",
"psc_grid-countabovebodyflex",
"psc_grid-headernoborder",
"psc_grid-headertopborder",
"psc_grid-hideinlist",
"psc_grid-hidereadableallhead",
"psc_grid-hidereadablecolhead",
"psc_grid-nobody",
"psc_grid-nocolheaders",
"psc_grid-nocustomheader",
"psc_grid-nocustompad",
"psc_grid-noheaderbar",
"psc_grid-noinnergroup",
"psc_grid-norowcount",
"psc_grid-norows",
"psc_grid-norowstext",
"psc_grid-nosideborder",
"psc_grid-nosystemheader",
"psc_grid-notitle",
"psc_grid-notitlearea",
"psc_grid-widthauto",
"psc_gridlist-autolabel",
"psc_gridlist-borderall",
"psc_gridlist-borderbottom",
"psc_gridlist-bordernone",
"psc_gridlist-bordersides",
"psc_gridlist-bordertop",
"psc_gridlist-bordertopbottom",
"psc_gridlist-standard",
"psc_gridrow-sep-breadcrumb",
"psc_gridrow-sep-pipe",
"psc_gridview-grid",
"psc_gridview-item",
"psc_gridview-list",
"psc_gridview-toggle",
"psc_group-special",
"psc_groupbox-noheader",
"psc_groupbox-notitle",
"psc_grouped",
"psc_grouped_fitted",
"psc_groupheader-adjust",
"psc_halign-center",
"psc_halign-left",
"psc_halign-right",
"psc_has-count",
"psc_has-link",
"psc_haslivedata",
"psc_haslivedata-1",
"psc_haslivedata-count",
"psc_haslivedata-count-none",
"psc_haslivedata-none",
"psc_header-hidereadable",
"psc_header-none",
"psc_header-nospacing",
"psc_height-1em",
"psc_height-100em",
"psc_height-1pct",
"psc_height-100pct",
"psc_height-1px",
"psc_height-100px",
"psc_height-auto",
"psc_hidden",
"psc_hide-image",
"psc_hide-pagetabs",
"psc_hide-reldispunits",
"psc_hide-reldispvalue",
"psc_hide-text",
"psc_image-1em",
"psc_image-15em",
"psc_image-height1em",
"psc_image-height15em",
"psc_image-heightauto",
"psc_image-maxheight1em",
"psc_image-maxheight15em",
"psc_image-maxheightauto",
"psc_image-maxwidth1em",
"psc_image-maxwidth15em",
"psc_image-maxwidthauto",
"psc_image-nomaxheight",
"psc_image-standardbutton",
"psc_image-width1em",
"psc_image-width15em",
"psc_image-widthauto",
"psc_invisible",
"psc_justify-center",
"psc_justify-end",
"psc_justify-inherit",
"psc_justify-initial",
"psc_justify-spacearound",
"psc_justify-spacebetween",
"psc_justify-start",
"psc_label-haligncenter",
"psc_label-halignleft",
"psc_label-halignright",
"psc_label-hide",
"psc_label-hidereadable",
"psc_label-invisible",
"psc_label-none",
"psc_label-normaltext",
"psc_label-opacity0",
"psc_label-opacity1",
"psc_label-top",
"psc_label-valignbaseline",
"psc_label-valignbottom",
"psc_label-valignmiddle",
"psc_label-valigntop",
"psc_label-visible",
"psc_label-width1em",
"psc_label-width50em",
"psc_label-width1pct",
"psc_label-width100pct",
"psc_label-widthauto",
"psc_label_filler",
"psc_legend-hidereadable",
"psc_lineheight-full",
"psc_link-drilldown",
"psc_link-normaltext",
"psc_link-textsize",
"psc_link_normalsize",
"psc_list-1col",
"psc_list-2col",
"psc_list-3col",
"psc_list-col-1",
"psc_list-col-2",
"psc_list-commonmenu",
"psc_list-detail",
"psc_list-expanded",
"psc_list-has-icon",
"psc_list-icon-medium",
"psc_list-icon-top",
"psc_list-linkitem",
"psc_list-linkmenu",
"psc_list-secondarydata",
"psc_list-settingmenu",
"psc_list-tertiary",
"psc_list-vtab",
"psc_list_count",
"psc_livedata-metrics",
"psc_livedata-metrics-label",
"psc_livedata-strong",
"psc_margin-1em",
"psc_margin-30em",
"psc_margin-0_1em",
"psc_margin-10_1em",
"psc_margin-1pct",
"psc_margin-50pct",
"psc_margin-0_5pct",
"psc_margin-49_5pct",
"psc_margin-1px",
"psc_margin-100px",
"psc_margin-auto",
"psc_margin-bottom1em",
"psc_margin-bottom30em",
"psc_margin-bottom0_1em",
"psc_margin-bottom10_1em",
"psc_margin-bottom1pct",
"psc_margin-bottom50pct",
"psc_margin-bottom0_5pct",
"psc_margin-bottom49_5pct",
"psc_margin-bottom1px",
"psc_margin-bottom100px",
"psc_margin-bottomnone",
"psc_margin-center",
"psc_margin-header",
"psc_margin-headernone",
"psc_margin-left1em",
"psc_margin-left30em",
"psc_margin-left0_1em",
"psc_margin-left10_1em",
"psc_margin-left1pct",
"psc_margin-left50pct",
"psc_margin-left0_5pct",
"psc_margin-left49_5pct",
"psc_margin-left1px",
"psc_margin-left100px",
"psc_margin-leftnone",
"psc_margin-none",
"psc_margin-right1em",
"psc_margin-right30em",
"psc_margin-right0_1em",
"psc_margin-right10_1em",
"psc_margin-right1pct",
"psc_margin-right50pct",
"psc_margin-right0_5pct",
"psc_margin-right49_5pct",
"psc_margin-right1px",
"psc_margin-right100px",
"psc_margin-rightnone",
"psc_margin-sides1em",
"psc_margin-sides30em",
"psc_margin-sides0_1em",
"psc_margin-sides10_1em",
"psc_margin-sides1pct",
"psc_margin-sides50pct",
"psc_margin-sides0_5pct",
"psc_margin-sides49_5pct",
"psc_margin-sides1px",
"psc_margin-sides100px",
"psc_margin-standard",
"psc_margin-top1em",
"psc_margin-top30em",
"psc_margin-top0_1em",
"psc_margin-top10_1em",
"psc_margin-top1pct",
"psc_margin-top50pct",
"psc_margin-top0_5pct",
"psc_margin-top49_5pct",
"psc_margin-top1px",
"psc_margin-top100px",
"psc_margin-topnone",
"psc_maxwidth-40em",
"psc_maxwidth-60em",
"psc_menu-actionsheet",
"psc_minwidth-20em",
"psc_modal-button",
"psc_modal-close",
"psc_modal-done",
"psc_modal-noheader",
"psc_more",
"psc_multiselect-hide",
"psc_noscroll",
"psc_nospace",
"psc_notext",
"psc_nowrap",
"psc_on",
"psc_opacity-085",
"psc_overflow-auto",
"psc_overflow-hidden",
"psc_overflow-xauto",
"psc_overflow-xhidden",
"psc_overflow-yauto",
"psc_overflow-yhidden",
"psc_override",
"psc_padding-1em",
"psc_padding-30emem",
"psc_padding-0_1em",
"psc_padding-10_1em",
"psc_padding-1pct",
"psc_padding-50pct",
"psc_padding-0_5pct",
"psc_padding-49_5pct",
"psc_padding-1px",
"psc_padding-100px",
"psc_padding-bottom1emem",
"psc_padding-bottom30emem",
"psc_padding-bottom0_1em",
"psc_padding-bottom10_1em",
"psc_padding-bottom1pct",
"psc_padding-bottom50pct",
"psc_padding-bottom0_5pct",
"psc_padding-bottom49_5pct",
"psc_padding-bottom1px",
"psc_padding-bottom100px",
"psc_padding-bottomnone",
"psc_padding-content",
"psc_padding-contentnone",
"psc_padding-left1em",
"psc_padding-left30em",
"psc_padding-left0_1em",
"psc_padding-left10_1em",
"psc_padding-left1pct",
"psc_padding-left50pct",
"psc_padding-left0_5pct",
"psc_padding-left49_5pct",
"psc_padding-left1px",
"psc_padding-left100px",
"psc_padding-leftnone",
"psc_padding-none",
"psc_padding-right1em",
"psc_padding-right30em",
"psc_padding-right0_1em",
"psc_padding-right10_1em",
"psc_padding-right1pct",
"psc_padding-right50pct",
"psc_padding-right0_5pct",
"psc_padding-right49_5pct",
"psc_padding-right1px",
"psc_padding-right100px",
"psc_padding-rightnone",
"psc_padding-sides1em",
"psc_padding-sides30em",
"psc_padding-side0_1em",
"psc_padding-side10_1em",
"psc_padding-sides1pct",
"psc_padding-sides50pct",
"psc_padding-sides0_5pct",
"psc_padding-sides49_5pct",
"psc_padding-sides1px",
"psc_padding-sides100px",
"psc_padding-standard",
"psc_padding-top1em",
"psc_padding-top30em",
"psc_padding-top0_1em",
"psc_padding-top10_1em",
"psc_padding-top1pct",
"psc_padding-top50pct",
"psc_padding-top0_5pct",
"psc_padding-top49_5pct",
"psc_padding-top1px",
"psc_padding-top100px",
"psc_padding-topnone",
"psc_page-container",
"psc_pageheader-darkborder",
"psc_pageheader-fixed",
"psc_pagepadding-content",
"psc_pagepadding-margin",
"psc_pagepadding-sidemargin",
"psc_panel-action",
"psc_panel-actioninterior",
"psc_panel-bottom",
"psc_panel-button",
"psc_panel-container",
"psc_panel-content",
"psc_panel-contentinterior",
"psc_panel-fixed",
"psc_panel-fullsize",
"psc_panel-overlay",
"psc_panel-right",
"psc_panel-tabcontainer",
"psc_panel-top",
"psc_pos-absolute",
"psc_pos-bottomleft",
"psc_pos-bottomright",
"psc_pos-fixed",
"psc_pos-relative",
"psc_pos-static",
"psc_pos-topleft",
"psc_pos-topright",
"psc_primary",
"psc_radius-1em",
"psc_radius-2em",
"psc_radius-01em",
"psc_radius-02em",
"psc_radius-1px",
"psc_radius-10px",
"psc_radius-none",
"psc_radius-top1em",
"psc_radius-top2em",
"psc_radius-top01em",
"psc_radius-top02em",
"psc_radius-top1px",
"psc_radius-top10px",
"psc_radius-topnone",
"psc_reldisp-container",
"psc_reldisp-field",
"psc_reldisp-prompt",
"psc_reldisp-units",
"psc_reldisp-value",
"psc_rowadd-hide",
"psc_rowdelete-hide",
"psc_rowinsert-hidden",
"psc_rowlabels-hide",
"psc_rowlabels-none",
"psc_rownumber-hide",
"psc_scroll",
"psc_scroll-content",
"psc_scroll-overflow",
"psc_scrollarea-notitle",
"psc_selected",
"psc_selection-none",
"psc_separator-breadcrumb",
"psc_separator-pipe",
"psc_shadow-standard",
"psc_show-actionable",
"psc_show-baronselect",
"psc_show-detail",
"psc_show-expanded",
"psc_show-gridonly",
"psc_show-listonly",
"psc_show-rowselected",
"psc_simple_label",
"psc_singleselect-hide",
"psc_size-large",
"psc_size-medium",
"psc_size-xsmall",
"psc_stacked",
"psc_standard",
"psc_strong",
"psc_subtitle",
"psc_tablelayout-auto",
"psc_tablelayout-fixed",
"psc_tablelayout-inherit",
"psc_text-disclaimer",
"psc_text-example",
"psc_text-important",
"psc_text_center",
"psc_tile-box-data",
"psc_tile-box-img",
"psc_tile-img",
"psc_tile_content",
"psc_tile_content-center",
"psc_tile_content-kpi-image",
"psc_tile_content-metrics",
"psc_tile_content-metricsdata",
"psc_tile_kpi",
"psc_tile_kpi-1",
"psc_tile_kpi-box-1",
"psc_tile_kpi-box-2",
"psc_tile_kpi-label",
"psc_tile_livedata",
"psc_tile_livedata-count",
"psc_tile_livedata-descr",
"psc_tile_livedata-descr-box",
"psc_tile_livedata-img",
"psc_tile_livedata-trendimage",
"psc_tile_livedata_descr1",
"psc_tile_livedata_item",
"psc_title-h1",
"psc_title-h2",
"psc_title-h3",
"psc_title-h4",
"psc_title-h5",
"psc_title-h6",
"psc_title-page",
"psc_title-sub",
"psc_toggle-imagecontainer",
"psc_toggle-imageitem",
"psc_transparent",
"psc_trigger-hidden",
"psc_valign-baseline",
"psc_valign-bottom",
"psc_valign-middle",
"psc_valign-top",
"psc_value-alignauto",
"psc_value-ellipsis",
"psc_value-fullwidth",
"psc_value-haligncenter",
"psc_value-halignleft",
"psc_value-halignright",
"psc_value-height1em",
"psc_value-height20em",
"psc_value-height1pct",
"psc_value-height100pct",
"psc_value-height1px",
"psc_value-height100px",
"psc_value-heightauto",
"psc_value-valignbaseline",
"psc_value-valignbottom",
"psc_value-valignmiddle",
"psc_value-valigntop",
"psc_value-width1em",
"psc_value-width100em",
"psc_value-width1pct",
"psc_value-width100pct",
"psc_value-width1px",
"psc_value-width100px",
"psc_value-widthauto",
"psc_width-1em",
"psc_width-100em",
"psc_width-1pct",
"psc_width-100pct",
"psc_width-1px",
"psc_width-100px",
"psc_width-auto",
"psc_wrap",
"psc_wrap-link",
"psc_wrap-linktext"
];


function monkeyPatchAutocomplete() {

      // don't really need this, but in case I did, I could store it and chain
      var oldFn = $.ui.autocomplete.prototype._renderItem;

      $.ui.autocomplete.prototype._renderItem = function( ul, item) {
          var re = new RegExp(this.term) ;
          var t = item.label.replace(re,"<span style='font-weight:bold;color:Blue;'>" + "$&" + "</span>");
          return $( "<li></li>" )
              .data( "item.autocomplete", item )
              .append( "<a>" + t + "</a>" )
              .appendTo( ul );
      };
  }

monkeyPatchAutocomplete();


});


