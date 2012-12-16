Android Photoshop Tools
=======================

The Android Photoshop Tools are some small tools, meant to simplify the
design process of Android applications in Photoshop. The different tools
are described further down.


Installation
------------

To install the tools do the following steps:

1. Download all files (use the ZIP button above).
2. Move all .jsx files to the Photoshop Script folder
   - Windows: C:\Program Files\Adobe\Adobe Photoshop CSx\Presets\Scripts\
   - Mac: /Applications/Photoshop CSx/Presets/Scripts/
3. Move the `AndroidTool` directory to its place:
   - Windows: C:\Program Files\Common Files\
   - Mac: /Library/Application Support/
4. If you now start Photoshop, you can start the tool you want 
   via File->Scripts->TOOL NAME. 
5. You can now set shortcuts for the scripts in the shortcut menu.


License
-------

This tools are licensed under MIT license and are thus free to use and modify
an distribute however you wish.

The Android Icons and Sources belong to Google and were downloaded from
http://developer.android.com/design/downloads/index.html
Refere to that page for usage information.


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
If you click on an icon in the list, it will be placed in a new layer in
your currently active document.

All Icons are mdpi resolution, since also the Android sources are in mdpi 
resolution.

You can use this tool also for additional icons. Just place them  (must be png files)
into `AndroidTools/Icons/holo_dark` or `AndroidTools/Icons/holo_light` (see
Installation above for the location of the `AndroidTools` folder).
