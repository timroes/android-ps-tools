// Android Icons 
// Author: Tim Roes <mail@timroes.de>

#target photoshop

app.bringToFront();

var ICON_DIR = "Icons/";
var HOLO_LIGHT = "holo_light/";
var HOLO_DARK = "holo_dark/";

var holoLight;
var holoDark;

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

/**
 * Build the UI.
 */
function buildIconUI() {
	var win = new Window('dialog', 'Android Icons');
	win.alignChildren = "left";
	win.addEventListener("keydown", function(ev) {
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

	iconList = win.add("listbox", [0, 0, 300, 200]);
	iconList.onClick = function(ev) {
		loadFileToNewLayer(iconList.selection.file_object);
		win.close();
	};

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
	iconDir.changePath("AndroidTools");
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
		if(!filter || allIcons[i].displayNametoLowerCase().indexOf(filter) !== -1) {
			var item = iconList.add("item", allIcons[i].displayName.slice(0, -4));
			item.file_object = allIcons[i];
			item.image = allIcons[i];
		}
	}

}

/**
 * Load a file into a new layer.
 */
function loadFileToNewLayer(file) {

	// Place object as layer
	// I have no idea, what all that does... But I assume there must be a more elegant way.
	var desc = new ActionDescriptor();
	desc.putPath( charIDToTypeID('null'), file );
	desc.putEnumerated( charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa') );
	var offsetDesc = new ActionDescriptor();
	offsetDesc.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0.000000 );
	offsetDesc.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0.000000 );
	desc.putObject( charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), offsetDesc );
	executeAction( charIDToTypeID('Plc '), desc, DialogModes.NO );

	// The following line is nice. I want the rest above to be looking the same.
	app.activeDocument.activeLayer.rasterize(RasterizeType.ENTIRELAYER);

}

if(!documents.length) {
	alert('There are no documents open.', 'No Documents Open', true);
} else if(parseInt(version, 10) < 10) {
	alert('This script requires at least Photoshop CS3.', 'Wrong Photoshop Version', true);
} else {
	try {
		buildIconUI();
	} catch(e) {
		alert(e, 'Android Icons Error', true);
	}
}
