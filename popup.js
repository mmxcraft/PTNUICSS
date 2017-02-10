// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function onchange(e) {
	if(e.target.id != "clearcss")
	{
		chrome.tabs.executeScript(null, {code:"var css_id='" + e.target.id + "'; var css_value='" + e.target.value + "';"});
		if(e.target.checked)
			chrome.tabs.executeScript(null, {file:"append_css.js"});
		else
			chrome.tabs.executeScript(null, {file:"remove_css.js"});
	}
}

document.addEventListener('DOMContentLoaded', function () {

  var csslist = chrome.extension.getBackgroundPage().csslist;
  var original_css = chrome.extension.getBackgroundPage().original_css;
  var csslist_html = "<p align='center'><b>Available StyleSheets</b></p><hr>";
  csslist_html += "<table width='600' cellpadding='1' cellspacing='1'>";
  var bgGray = true;
  for(var j = 0; j < csslist.length; j++)
  {
	  var isFind = false;
	  for(var x = 0; x < original_css.length; x++)
	  {
		if(original_css[x].name == csslist[j].name)
		{
			isFind = true;
			break;
		}
	  }
	  csslist_html += "<tr bgcolor='" + (bgGray ? "#EEEEEE" : "#FFFFFF") + "'><td><input id='" + csslist[j].name + "' type='checkbox' value='" + csslist[j].href + "' " + (isFind ? "checked" : "") + " /></td><td>" + csslist[j].name + "</td><td>" + csslist[j].descr + "</td></tr>";
	  bgGray = bgGray ? false : true;

  }
  csslist_html += "</table>";
  $("#csslist").html(csslist_html); 
  var divs = document.querySelectorAll('input');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('change', onchange);
	divs[i].addEventListener('click', onclick);
  }
});
