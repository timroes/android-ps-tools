// Android Elements
// Author: Tim Roes <mail@timroes.de>

/*
<javascriptresource>
<name>Android Elements</name>
<category>Android_PS_Tools</category>
<about>Insert Android elements into your document.</about>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

#target photoshop
#include "./~android-funcs.js"

app.bringToFront();

var search;

var win;
var elList;
var holoDark, holoLight;
var backbutton;

var currentFolder;

/**
 * Click in list (or Enter) will either show subelements,
 * or include the element in the current document.
 */
function clickList(ev) {
	
	var sel = elList.selection.file_object;
	search.text = "";
	if(sel instanceof File) {
		importFile(sel);
		win.close();
	} else if(sel instanceof Folder) {
		// We selected a folder, so go deeper
		currentFolder = sel;
		loadSubElements(sel);
	} 

}

/**
 * Go Back to element selection.
 */
function goBack() {
	loadElements();
}

/**
 * When holo theme changed, try to find the current resource in 
 * new holo theme, otherwise go back to selection.
 */
function holoChanged(ev) {
	if(currentFolder) {
		var notHolo = (getHolo() == HOLO_DARK) ? HOLO_LIGHT : HOLO_DARK;
		var newPath = currentFolder.fullName.replace(notHolo, getHolo());
		currentFolder = new Folder(newPath);
		if(!currentFolder) {
			loadElements();
		} else {
			loadSubElements(currentFolder);
		}
	} else {
		loadElements();
	}
}

function buildElementUI() {

	win = new Window('dialog', 'Android Elements');
	win.alignChildren = "fill";
	win.addEventListener("keydown", function(ev) {
		// If user hit Enter, select first item in list.
		if(ev.keyName == "Enter" && elList.items.length > 0) {
			elList.selection = 0;
			clickList(null);
		}
		if(ev.keyName == "Escape" && ev.shiftKey) {
			goBack();
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

	backbutton = holoGroup.add("button", undefined, "&Select other");
	backbutton.alignment = "right";
	backbutton.hide();
	backbutton.onClick = goBack;

	elList = win.add("listbox", [0, 0, 300, 200]);
	elList.onClick = clickList;
	var font = elList.graphics.font;
	elList.graphics.font = ScriptUI.newFont(font.name, font.style, 16);

	holoChanged();
	win.show();
	
}

/**
 * Sort all elements, that are loaded alphabeticaly by their
 * display name.
 */
function sortElements() {
	allElements.sort(function(a, b) {
		return a.displayName > b.displayName;
	});
}

/**
 * Load subelements inside a specific folder.
 */
function loadSubElements(folder) {
	
	allElements = new Array();
	loadDir(folder);
	sortElements();
	updateList();

	// We are no in the deeper level, so show back button
	backbutton.show();

}

/**
 * Load all elements.
 */
function loadElements() {

	// Load holo dark or light elements
	var dir = Folder.commonFiles;
	dir.changePath(DIR);
	dir.changePath(EL_DIR);
	dir.changePath(getHolo());
	
	allElements = new Array();

	loadDir(dir);

	// Load general holo elements
	dir = Folder.commonFiles;
	dir.changePath(DIR);
	dir.changePath(EL_DIR);
	dir.changePath(HOLO);

	loadDir(dir);

	sortElements();
	updateList();

	// Hide back button, we are on highest level
	backbutton.hide();
	currentFolder = null;

}

/**
 * Load all files inside a given directory and add them to the list.
 */
function loadDir(dir) {
	var elements = dir.getFiles();

	for(var i in elements) {
		allElements.push(elements[i]);
	}
}

function getHolo() {
	return (holoDark.value == true) ? HOLO_DARK : HOLO_LIGHT;
}

/**
 * Update the list of elements, taking the current search filter into respect.
 */
function updateList() {

	var filter = search.text.toLowerCase();

	elList.removeAll();

	for(var i in allElements) {
		var e = allElements[i];
		if(!filter || e.displayName.toLowerCase().indexOf(filter) !== -1) {
			var item = elList.add("item", stripExt(e.displayName));
			if(e instanceof Folder) {
				item.text += " \u00BB";
			}
			item.file_object = e;
		}
	}

}

/**
 * Import a file into the current document.
 * This will open the file and duplicate its active layer into the current
 * document. This assumes, that every file will have one root layer set, that
 * is then automaticaly selected by photoshop, when opened.
 */
function importFile(file) {
	
	var curDoc = app.activeDocument;

	var f = open(file);
	
	f.activeLayer.duplicate(curDoc, ElementPlacement.PLACEATBEGINNING);
	f.close(SaveOptions.DONOTSAVECHANGES);

	app.activeDocument = curDoc;

}

if(!documents.length) {
	alert('There are no documents open.', 'No Documents Open', true);
} else if(parseInt(version, 10) < 10) {
	alert('This script requires at least Photoshop CS3.', 'Wrong Photoshop Version', true);
} else {
	try {
		buildElementUI();
	} catch(e) {
		alert(e, 'Android Elements Error', true);
	}
}
