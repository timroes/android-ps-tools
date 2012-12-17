// New Android Document
// Author: Tim Roes <mail@timroes.de>

/*
<javascriptresource>
<name>New Android Document</name>
<category>Android_PS_Tools</category>
<about>Create a new document with a device frame.</about>
</javascriptresource>
*/

#target photoshop
#include "./~android-funcs.js"

var devicelist, portrait, landscape, statusbar, navbar, win;

app.bringToFront();

function createDocument(width, height) {
	app.documents.add(width, height, 72, null, null, DocumentFill.TRANSPARENT);
	app.activeDocument.suspendHistory('Creating device frame', 'fillDocument();');
}

function startCreating(ev) {
	switch(parseInt(devicelist.selection)) {
		case 0:
			createDocument('428px', '838px');
			break;
		case 1:
			createDocument('758px', '1226px');
			break;
		case 2:
			createDocument('1062px', '1548px');
			break;
	}
}

function fillDocument() {
	switch(parseInt(devicelist.selection)) {
		case 0:
			createDevice('Smartphone.png');
			if(portrait.value) {
				createStatusbar('Portrait 360dp.psd', 34, 106);
				var bar = (navbar.selection == 0) ? 'Portrait/Normal Back.psd' : 'Portrait/Normal Dismiss.psd';
				createNavbar(bar, 34, 698);
			} else {
				createStatusbar('Landscape 360dp.psd', 105, 34);
				var bar = (navbar.selection == 0) ? 'Landscape/Normal Back.psd' : 'Landscape/Normal Dismiss.psd';
				createNavbar(bar, 704, 34);
			}
			break;
		case 1:
			createDevice('Tablet600.png');
			if(portrait.value) {
				createStatusbar('Portrait 600dp.psd', 79, 139);
				var bar = (navbar.selection == 0) ? 'Tablet/600dp Back.psd' : 'Tablet/600dp Dismiss.psd';
				createNavbar(bar, 80, 1043);
			} else {
				createStatusbar('Landscape 600dp.psd', 138, 78);
				var bar = (navbar.selection == 0) ? 'Tablet/960dp Back.psd' : 'Tablet/960dp Dismiss.psd';
				createNavbar(bar, 139, 630);
			}
			break;
		case 2:
			createDevice('Tablet800.png');
			if(portrait.value) {
				var bar = (navbar.selection == 0) ? 'Tablet/Combined 800dp.psd' : 'Tablet/Combined 800dp Dismiss.psd';
				createNavbar(bar, 127, 1367);
			} else {
				var bar = (navbar.selection == 0) ? 'Tablet/Combined 1280dp.psd' : 'Tablet/Combined 1280dp Dismiss.psd';
				createNavbar(bar, 134, 888);
			}
			break;
	} 

	win.close();
}

function createDevice(tempFilename) {

	// Load template file
	var temp = Folder.commonFiles;
	temp.changePath(DIR);
	temp.changePath(TEMP_DIR);
	var tempFile = new File(temp.fullName + "/" + tempFilename);
	placeFile(tempFile);

	// Move file to center
	var layer = app.activeDocument.activeLayer;
	layer.translate(-1, -1);
	// Lock layer
	layer.allLocked = true;

	if(landscape.value == true) {
		app.activeDocument.rotateCanvas(-90);
	}
	
}

function createStatusbar(barFile, x, y) {
	if(!statusbar.value) return;
	insertFile('Statusbar', barFile, x, y);
}

function createNavbar(navFile, x, y) {
	insertFile('Navigationbar', navFile, x, y);
}

function insertFile(pathPart, fileName, x, y) {

	var folder = Folder.commonFiles;
	folder.changePath(DIR);
	folder.changePath(EL_DIR);
	folder.changePath("holo");
	folder.changePath(pathPart);

	var file = new File(folder.fullName + '/' + fileName);
	importFile(file);

	var layer = app.activeDocument.activeLayer;
	layer.translate(x, y);

}

function buildUI() {

	win = new Window('dialog', 'New Android Device');
	win.alignChildren = 'fill';
	win.addEventListener("keydown", function(ev) {
		if(ev.keyName == "Enter") {
			startCreating(null);
		}
	});

	var g1 = win.add('group');
	g1.orientation = 'row';
	g1.add('statictext', undefined, 'Device:');
	devicelist = g1.add('dropdownlist', [0, 0, 250, 20], ['Smartphone (360dp)', 'Tablet (600dp)', 'Tablet (800dp)']);
	devicelist.selection = 0;
	devicelist.onChange = function(ev) {
		statusbar.enabled = devicelist.selection != 2;
		statusbar.value = devicelist.selection != 2;
		landscape.value = devicelist.selection == 2;
		portrait.value = devicelist.selection != 2;
	};

	var g2 = win.add('group');
	g2.orientation = 'row';
	g2.add('statictext', undefined, 'Orientation:');
	portrait = g2.add('radiobutton', undefined, 'Portrait');
	landscape = g2.add('radiobutton', undefined, 'Landscape');
	portrait.value = true;

	var g3 = win.add('group');
	g3.orientation = 'row';
	g3.add('statictext', undefined, 'Navigation Bar:');
	navbar = g3.add('dropdownlist', undefined, ['Back Key', 'Dismiss Keyboard Key']);
	navbar.selection = 0;
	
	statusbar = win.add('checkbox', undefined, 'Add Statusbar');
	statusbar.value = true;

	var g4 = win.add('group');
	g4.alignment = 'right';

	var del = g4.add('button', undefined, 'C&ancel');
	del.alignment = 'right';
	del.onClick = function(ev) {
		win.close();
	};

	var create = g4.add('button', undefined, '&Create');
	create.alignment = 'right';
	create.onClick = startCreating;

	win.show();
	
}


if(parseInt(version, 10) < 10) {
	alert('This script requires at least Photoshop CS3.', 'Wrong Photoshop Version', true);
} else {
	try {
		buildUI();
	} catch(e) {
		alert(e, 'Android Document Error', true);
	}
}
