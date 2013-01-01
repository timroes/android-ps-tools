Android Photoshop Tools
=======================

The Android Photoshop Tools are some small tools, meant to simplify the
design process of Android applications in Photoshop. The different tools
are described further down.


Installation
------------

To install the tools do the following steps:

1. Download all files (use the ZIP button above).
2. Move all .jsx and .js files to the Photoshop Script folder
   - Windows: C:\Program Files\Adobe\Adobe Photoshop CSx\Presets\Scripts\
   - Mac: /Applications/Photoshop CSx/Presets/Scripts/
3. Move the `AndroidTool` directory to its place:
   - Windows: C:\Program Files\Common Files\
   - Mac: /Library/Application Support/
4. If you now start Photoshop, you can start the tool you want 
   via File->Scripts->TOOL NAME. 
5. You can now set shortcuts for the scripts in the shortcut menu.


How To Update
-------------

If you want to update, from a previous version, you do the following steps:

1. Remove all previous android script files from the Photoshop script folder (for destination
   see point 2 under installation). (All the scriptnames contain the word Android.)
2. Remove the `AndroidTool` directory (destination see point 3 under Installation).
3. Continue with regular Installation notices.

If you placed some additional icons or elements in the `AndroidTool` folder, make sure
you have a backup of them to place them after installation again.

It is not absolutely necessary to delete the old version, you could also just copy the new
version over the old one. But sometimes file names changed or have been moved, so you will
leave orphaned (or double) files in your folders.


License
-------

This tools are licensed under MIT license and are thus free to use, modify
and distribute however you wish.

The Android Icons and Sources belong to Google and were downloaded from
http://developer.android.com/design/downloads/index.html
Refere to that page for usage information.

The device frames are from the official Device Art Generator (http://developer.android.com/distribute/promote/device-art.html)
and the Device Frame Generator (http://android-ui-utils.googlecode.com/hg/asset-studio/dist/device-frames.html).


Tested
------

All tools have been tested with Adobe Photoshop CS5, but hopefully will also work
with other versions (from CS3 and above).

If you find errorsm have problems using the tools or suggestions on how to improve them,
drop me a notice. You can reach me either via the Github Issues for this project, my 
mail address (mail@timroes.de) or most of the time in the #android-dev channel on irc.freenode.net.


Android Icons
-------------

This tool allow easy access to the Android Action Bar Icons.

You can search for icon names and chose a Holo theme (either by selecting
in the UI or by pressing Alt + D (Holo Dark) or Alt + L (Holo Light)).
If you click on an icon in the list (or press Enter for the first item in the list), 
it will be placed in a new layer in your currently active document.

All Icons are mdpi resolution, since also the Android sources are in mdpi 
resolution.

You can use this tool also for additional icons. Just place them  (must be png files)
into `AndroidTools/Icons/holo_dark` or `AndroidTools/Icons/holo_light` (see
Installation above for the location of the `AndroidTools` folder).


Android Elements
----------------

This tool allow easier access to different Android elements.

You works nearly the same, as the Android Icons tool does. Some elements might have
different states, orientation or similiar (indicated by an arrow behind the name). 
If you click on these (or press Enter, for the first item in the list), you will be shown
all variations of this element. Select one and it gets inserted into your current document.

You can use this tool also for additional elements. Just place them into `AndroidTools/Elements/holo_dark`,
`AndroidTools/Elements/holo_light` or `AndroidTools/Elements/holo` (for elements, that are the same in Dark
and Light theme). You can either place a file (any format Photoshop can open) directly into that folder, or
use an arbitrary deep folder structure for different states, orientation and such.


New Android document
--------------------

This tool allow easy creation of a new document, containing a device frame, navigation and statusbar.

Just start the tool via the script menu (or set a shortcut) and select the device type and size, the orientation
and if the tool should add the navigation and/or statusbar to the new document.
