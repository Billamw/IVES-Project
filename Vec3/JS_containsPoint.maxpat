{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 5,
			"revision" : 4,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 35.0, 84.0, 1065.0, 713.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"assistshowspatchername" : 0,
		"boxes" : [ 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-1780",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 176.0, 1186.0, 30.0, 30.0 ],
					"varname" : "out1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-368",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 111.0, 52.0, 43.0, 22.0 ],
					"text" : "list.len",
					"varname" : "polygonSize"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-73",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 96.0, 222.0, 82.0, 22.0 ],
					"text" : "deleteObjects"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 80.0, 134.0, 100.0, 22.0 ],
					"text" : "createPatcher $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 80.0, 86.0, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 80.0, 176.0, 140.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "containsPoint_script.js",
						"parameter_enable" : 0
					}
,
					"text" : "js containsPoint_script.js"
				}

			}
, 			{
				"box" : 				{
					"comment" : "point to check",
					"id" : "obj-2",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 253.170212149620056, 39.765957713127136, 30.0, 30.0 ],
					"varname" : "inl2"
				}

			}
, 			{
				"box" : 				{
					"comment" : "polygon with max 8 corners",
					"id" : "obj-1",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 176.170212149620056, 39.765957713127136, 30.0, 30.0 ],
					"varname" : "inl1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1781",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 176.0, 1100.0, 133.0, 22.0 ],
					"text" : "if $i1 >= 1 then 1 else 0",
					"varname" : "if2"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1782",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 176.0, 200.0, 100.0, 22.0 ],
					"text" : "unpack l l l",
					"varname" : "unpack"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1783",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 176.0, 300.0, 100.0, 22.0 ],
					"text" : "Vec3_subtract",
					"varname" : "subtract100"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1784",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 296.0, 300.0, 100.0, 22.0 ],
					"text" : "Vec3_subtract",
					"varname" : "subtract200"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1785",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 176.0, 400.0, 100.0, 22.0 ],
					"text" : "Vec3_cross",
					"varname" : "normal0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1786",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 176.0, 500.0, 100.0, 22.0 ],
					"text" : "Vec3_subtract",
					"varname" : "subtract0p0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1787",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 296.0, 500.0, 100.0, 22.0 ],
					"text" : "Vec3_subtract",
					"varname" : "subtract1p0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1788",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 416.0, 500.0, 100.0, 22.0 ],
					"text" : "Vec3_subtract",
					"varname" : "subtract2p0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1789",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 176.0, 600.0, 100.0, 22.0 ],
					"text" : "Vec3_dot",
					"varname" : "dot_Normal0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1790",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 176.0, 700.0, 100.0, 22.0 ],
					"text" : "Vec3_cross",
					"varname" : "cross00"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1791",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 296.0, 700.0, 100.0, 22.0 ],
					"text" : "Vec3_cross",
					"varname" : "cross10"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1792",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 416.0, 700.0, 100.0, 22.0 ],
					"text" : "Vec3_cross",
					"varname" : "cross20"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1793",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 176.0, 800.0, 100.0, 22.0 ],
					"text" : "Vec3_dot",
					"varname" : "dot00"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1794",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 296.0, 800.0, 100.0, 22.0 ],
					"text" : "Vec3_dot",
					"varname" : "dot10"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1795",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 416.0, 800.0, 100.0, 22.0 ],
					"text" : "Vec3_dot",
					"varname" : "dot20"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1796",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 176.0, 900.0, 100.0, 22.0 ],
					"text" : "/",
					"varname" : "divide00"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1797",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 296.0, 900.0, 100.0, 22.0 ],
					"text" : "/",
					"varname" : "divide10"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1798",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 416.0, 900.0, 100.0, 22.0 ],
					"text" : "/",
					"varname" : "divide20"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1799",
					"linecount" : 4,
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 176.0, 1000.0, 100.0, 64.0 ],
					"text" : "if 0 <= $i1 <= 1 & 0 <= $i2 <= 1 & 0 <= $i3 <= 1 then 1 else 0",
					"varname" : "if10"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-1782", 0 ],
					"hidden" : 1,
					"order" : 0,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-368", 0 ],
					"order" : 1,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1780", 0 ],
					"hidden" : 1,
					"source" : [ "obj-1781", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1783", 1 ],
					"hidden" : 1,
					"order" : 1,
					"source" : [ "obj-1782", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1783", 0 ],
					"hidden" : 1,
					"order" : 3,
					"source" : [ "obj-1782", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1784", 0 ],
					"hidden" : 1,
					"order" : 1,
					"source" : [ "obj-1782", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1784", 1 ],
					"hidden" : 1,
					"order" : 0,
					"source" : [ "obj-1782", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1786", 0 ],
					"hidden" : 1,
					"order" : 2,
					"source" : [ "obj-1782", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1787", 0 ],
					"hidden" : 1,
					"order" : 0,
					"source" : [ "obj-1782", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1788", 0 ],
					"hidden" : 1,
					"source" : [ "obj-1782", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1785", 0 ],
					"hidden" : 1,
					"source" : [ "obj-1783", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1785", 1 ],
					"hidden" : 1,
					"source" : [ "obj-1784", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1789", 1 ],
					"hidden" : 1,
					"order" : 3,
					"source" : [ "obj-1785", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1789", 0 ],
					"hidden" : 1,
					"order" : 4,
					"source" : [ "obj-1785", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1793", 1 ],
					"hidden" : 1,
					"order" : 2,
					"source" : [ "obj-1785", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1794", 1 ],
					"hidden" : 1,
					"order" : 1,
					"source" : [ "obj-1785", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1795", 1 ],
					"hidden" : 1,
					"order" : 0,
					"source" : [ "obj-1785", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1791", 1 ],
					"hidden" : 1,
					"order" : 1,
					"source" : [ "obj-1786", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1792", 0 ],
					"hidden" : 1,
					"order" : 0,
					"source" : [ "obj-1786", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1790", 0 ],
					"hidden" : 1,
					"order" : 1,
					"source" : [ "obj-1787", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1792", 1 ],
					"hidden" : 1,
					"order" : 0,
					"source" : [ "obj-1787", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1790", 1 ],
					"hidden" : 1,
					"order" : 1,
					"source" : [ "obj-1788", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1791", 0 ],
					"hidden" : 1,
					"order" : 0,
					"source" : [ "obj-1788", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1796", 1 ],
					"hidden" : 1,
					"order" : 2,
					"source" : [ "obj-1789", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1797", 1 ],
					"hidden" : 1,
					"order" : 1,
					"source" : [ "obj-1789", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1798", 1 ],
					"hidden" : 1,
					"order" : 0,
					"source" : [ "obj-1789", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1793", 0 ],
					"hidden" : 1,
					"order" : 0,
					"source" : [ "obj-1790", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1796", 0 ],
					"hidden" : 1,
					"order" : 1,
					"source" : [ "obj-1790", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1794", 0 ],
					"hidden" : 1,
					"order" : 0,
					"source" : [ "obj-1791", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1797", 0 ],
					"hidden" : 1,
					"order" : 1,
					"source" : [ "obj-1791", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1795", 0 ],
					"hidden" : 1,
					"order" : 0,
					"source" : [ "obj-1792", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1798", 0 ],
					"hidden" : 1,
					"order" : 1,
					"source" : [ "obj-1792", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1799", 0 ],
					"hidden" : 1,
					"source" : [ "obj-1796", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1799", 1 ],
					"hidden" : 1,
					"source" : [ "obj-1797", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1799", 2 ],
					"hidden" : 1,
					"source" : [ "obj-1798", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1781", 0 ],
					"hidden" : 1,
					"source" : [ "obj-1799", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1786", 1 ],
					"hidden" : 1,
					"order" : 2,
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1787", 1 ],
					"hidden" : 1,
					"order" : 1,
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1788", 1 ],
					"hidden" : 1,
					"order" : 0,
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-73", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-8", 0 ]
				}

			}
 ],
		"dependency_cache" : [ 			{
				"name" : "Vec3_cross.maxpat",
				"bootpath" : "G:/Meine Ablage/TH Koeln/TH Unterricht/HiWi Job/Pörschmann/Max/Vec3",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "Vec3_dot.maxpat",
				"bootpath" : "G:/Meine Ablage/TH Koeln/TH Unterricht/HiWi Job/Pörschmann/Max/Vec3",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "Vec3_subtract.maxpat",
				"bootpath" : "G:/Meine Ablage/TH Koeln/TH Unterricht/HiWi Job/Pörschmann/Max/Vec3",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "containsPoint_script.js",
				"bootpath" : "G:/Meine Ablage/TH Koeln/TH Unterricht/HiWi Job/Pörschmann/Max/Vec3",
				"patcherrelativepath" : ".",
				"type" : "TEXT",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
