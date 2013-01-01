// Android Icons 
// Author: Tim Roes <mail@timroes.de>

/*
<javascriptresource>
<name>Android Icons</name>
<category>Android_PS_Tools</category>
<about>Insert Android icons into your document.</about>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

#target photoshop
#include "./~android-funcs.js"

app.bringToFront();

var holoLight;
var holoDark;

var donotclose;
var win;
var search;

var iconList;
var allIcons;

/**
 * Change color of the list and reload icons, when holo theme changes.
 */
var holoChanged = function(ev) {
	var bgColor = (holoDark.value == true) ? [0.13, 0.13, 0.13] : [0.95, 0.95, 0.95];
	var color = (holoDark.value == true) ? [1, 1, 1] : [0, 0, 0];
	iconList.graphics.backgroundColor = iconList.graphics.newBrush(iconList.graphics.BrushType.SOLID_COLOR, bgColor);
	iconList.graphics.foregroundColor = iconList.graphics.newPen(iconList.graphics.PenType.SOLID_COLOR, color, iconList.graphics.foregroundColor.lineWidth);
	loadIcons();
};

function clickList(ev) {
	placeFile(iconList.selection.file_object);
	if(!donotclose.value)
		win.close();
}

/**
 * Build the UI.
 */
function buildIconUI() {
	win = new Window('dialog', 'Android Icons');
	win.alignChildren = "left";
	win.addEventListener("keydown", function(ev) {
		if(ev.keyName == "Enter" && iconList.items.length > 0) {
			iconList.selection = 0;
			clickList(null);
		}
		search.active = true;
	});

	var searchGroup = win.add("group");
	var searchLabel = searchGroup.add("statictext");
	searchLabel.text = "Search:";
	search = searchGroup.add("edittext");
	search.characters = 30;
	search.active = true;
	search.onChanging = function(ev) {
		updateList();
	};

	var holoGroup = win.add("group");
	holoGroup.orientation = "row";
	holoLight = holoGroup.add("radiobutton", undefined, "Holo &Light");
	holoDark = holoGroup.add("radiobutton", undefined, "Holo &Dark");
	holoLight.value = true;
	holoLight.onClick = holoChanged;
	holoDark.onClick = holoChanged;

	iconList = win.add("listbox", [0, 0, 350, 400]);
	iconList.onClick = clickList;

	donotclose = win.add("checkbox", undefined, "&Don't close window after insert");

	holoChanged();
	win.show();
}

function getHolo() {
	return (holoDark.value == true) ? HOLO_DARK : HOLO_LIGHT;
}

/**
 * Load all icons from the icon path and the selected Holo theme.
 */
function loadIcons() {

	// Find all icons
	var iconDir = Folder.commonFiles;
	iconDir.changePath(DIR);
	iconDir.changePath(ICON_DIR);
	iconDir.changePath(getHolo());

	var icons = iconDir.getFiles("*.png");
	allIcons = new Array();
	
	for(var icon in icons) {
		allIcons.push(icons[icon]);
	}

	allIcons.sort();
	updateList();

}

/**
 * Update the list of icons, taking the current search filter into respect.
 */
function updateList() {

	var filter = search.text.toLowerCase();

	iconList.removeAll();

	for(var i in allIcons) {
		if(!filter || allIcons[i].displayName.toLowerCase().indexOf(filter) !== -1) {
			var item = iconList.add("item", stripExt(allIcons[i].displayName));
			item.file_object = allIcons[i];
			item.image = allIcons[i];
		}
	}

}

if(!documents.length) {
	alert('There are no documents open.', 'No Documents Open', true);
} else if(parseInt(version, 10) < 10) {
	alert('This script requires at least Photoshop CS3.', 'Wrong Photoshop Version', true);
} else {
	var defaultRulerUnits = app.preferences.rulerUnits;
	app.preferences.rulerUnits = Units.PIXELS;
	try {
		app.activeDocument.suspendHistory('Insert Android icon', 'buildIconUI();');
	} catch(e) {
		alert(e, 'Android Icons Error', true);
	}
	app.preferences.rulerUnits = defaultRulerUnits;
}
