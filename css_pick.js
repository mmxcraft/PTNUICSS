$(window).load(function(){

function listSeleCategory()
{
	$(".CSS_Category").hide();	
	var cateSel = $("#CSS_Category").val();
	cateSel="#selectable_"+cateSel;
	$(cateSel).show(); 

	
};

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

$("#CSS_Category_Btn").click(function(e) {
	var listHtml = '<select id="CSS_Category" name="CSS_Category">'
	listHtml 	+= '<option value="None">------</option><option value="Color">Color</option><option value="Text">Text</option></select>';
	listHtml 	+= '<div id = "selectable_list"> <ol id="selectable_Color" class="CSS_Category Color">'; 
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

});


$( "#selectable_Color" ).selectable();
$( "#selectable_Text" ).selectable();

$("#AddCssBtn").click(function() {
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
	
});

$("#AppliedCssBtn").click(function() {
	var AppliedCss = $("#AppliedCssBtn").val();
	var selectedCss = $("#AddCss").val().split(",");
	for(i = 0; i < selectedCss.length; i++) {
		if(AppliedCss.indexOf(selectedCss[i]) == -1) {
			AppliedCss = AppliedCss + "," + selectedCss[i];
		}
	}

	$("#ApplyCss").val(selectedCss);
});


});


