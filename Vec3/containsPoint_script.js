autowatch = 1;

var p               = this.patcher;
var leftSpace       = 176;
var topSpace        = 200;
var verticalInlet   = 100;
var horizontalInlet = 120;
var triangleInlet   = 400;

var maxCorners      = 15; // just to be sure it wont crash if something happens

function deleteObjects() {
  // deletes existings objects 
  for (var i = 0; i < maxCorners; i++) {
    p.remove(p.getnamed("unpack"));

    p.remove(p.getnamed("subtract10" + i));
    p.remove(p.getnamed("subtract20" + i));
    p.remove(p.getnamed("normal" + i));

    p.remove(p.getnamed("subtract0p" + i));
    p.remove(p.getnamed("subtract1p" + i));
    p.remove(p.getnamed("subtract2p" + i));

    p.remove(p.getnamed("dot_Normal" + i));

    p.remove(p.getnamed("cross0" + i));
    p.remove(p.getnamed("cross1" + i));
    p.remove(p.getnamed("cross2" + i));

    p.remove(p.getnamed("dot0" + i));
    p.remove(p.getnamed("dot1" + i));
    p.remove(p.getnamed("dot2" + i));

    p.remove(p.getnamed("divide0" + i));
    p.remove(p.getnamed("divide1" + i));
    p.remove(p.getnamed("divide2" + i));

    p.remove(p.getnamed("if1" + i));

  }
  p.remove(p.getnamed("if2"));
}

function createPatcher(num) {

  if(p.getnamed("polygonSize").value != undefined) 
    num = p.getnamed("polygonSize").value;

  if(num > maxCorners)
    num = maxCorners;

  deleteObjects();

  if(num < 3) {
    post("Invalid size");
    return;
  }

  var ifString = "if "
  for (var i = 0; i < num-2; i++) {
    if(i == 0)
      ifString += "$i1";
    else
      ifString += " + $i" + (i+1);
  }
  ifString += " >= 1 then 1 else 0"
  var if2 = p.newdefault(leftSpace, topSpace + 9 * verticalInlet, ifString);
  if2.varname = "if2";

  // creates a unpack with num many list outputs
  var unpack = "unpack";
  for (var i = 0; i < num; i++) {
    unpack += " l";
  }

  var unpackObject = p.newdefault(leftSpace, topSpace, unpack);
  unpackObject.varname = "unpack";
  p.connect(p.getnamed("inl1"), 0, unpackObject, 0);

  for (var i = 0; i < num-2; i++) {
    var unpack = p.getnamed("unpack");

    var subtract10 = p.newdefault(i * triangleInlet + leftSpace,                   topSpace + 1 * verticalInlet, "Vec3_subtract");
    var subtract20 = p.newdefault(i * triangleInlet + leftSpace + horizontalInlet, topSpace + 1 * verticalInlet, "Vec3_subtract");
    var normal     = p.newdefault(i * triangleInlet + leftSpace,                   topSpace + 2 * verticalInlet, "Vec3_cross");
    subtract10.varname = "subtract10" + i;
    subtract20.varname = "subtract20" + i;
    normal.varname = "normal" + i;
    p.connect(unpack, i,   subtract10, 0);
    p.connect(unpack, 0,   subtract10, 1);

    p.connect(unpack, i+1, subtract20, 0);
    p.connect(unpack, 0,   subtract20, 1);

    p.connect(subtract10, 0, normal, 0);
    p.connect(subtract20, 0, normal, 1);

    var point = p.getnamed("inl2")
    var subtract0p = p.newdefault(i * triangleInlet + leftSpace + 0 * horizontalInlet, topSpace + 3 * verticalInlet, "Vec3_subtract");
    var subtract1p = p.newdefault(i * triangleInlet + leftSpace + 1 * horizontalInlet, topSpace + 3 * verticalInlet, "Vec3_subtract");
    var subtract2p = p.newdefault(i * triangleInlet + leftSpace + 2 * horizontalInlet, topSpace + 3 * verticalInlet, "Vec3_subtract");
    subtract0p.varname = "subtract0p" + i;
    subtract1p.varname = "subtract1p" + i;
    subtract2p.varname = "subtract2p" + i;
    p.connect(unpack, 0,   subtract0p, 0);
    p.connect( point, 0,   subtract0p, 1);

    p.connect(unpack, i+1, subtract1p, 0);
    p.connect( point, 0,   subtract1p, 1);

    p.connect(unpack, i+2, subtract2p, 0);
    p.connect( point, 0,   subtract2p, 1);

    var dot_Normal = p.newdefault(i * triangleInlet + leftSpace, topSpace + 4 * verticalInlet, "Vec3_dot");
    dot_Normal.varname = "dot_Normal" + i;
    p.connect(normal, 0, dot_Normal, 0);
    p.connect(normal, 0, dot_Normal, 1);

    var cross0 = p.newdefault(i * triangleInlet + leftSpace + 0 * horizontalInlet, topSpace + 5 * verticalInlet, "Vec3_cross");
    var cross1 = p.newdefault(i * triangleInlet + leftSpace + 1 * horizontalInlet, topSpace + 5 * verticalInlet, "Vec3_cross");
    var cross2 = p.newdefault(i * triangleInlet + leftSpace + 2 * horizontalInlet, topSpace + 5 * verticalInlet, "Vec3_cross");
    cross0.varname = "cross0" + i;
    cross1.varname = "cross1" + i;
    cross2.varname = "cross2" + i;
    p.connect(subtract1p, 0, cross0, 0);
    p.connect(subtract2p, 0, cross0, 1);

    p.connect(subtract2p, 0, cross1, 0);
    p.connect(subtract0p, 0, cross1, 1);

    p.connect(subtract0p, 0, cross2, 0);
    p.connect(subtract1p, 0, cross2, 1);

    var dot0 = p.newdefault(i * triangleInlet + leftSpace + 0 * horizontalInlet, topSpace + 6 * verticalInlet, "Vec3_dot");
    var dot1 = p.newdefault(i * triangleInlet + leftSpace + 1 * horizontalInlet, topSpace + 6 * verticalInlet, "Vec3_dot");
    var dot2 = p.newdefault(i * triangleInlet + leftSpace + 2 * horizontalInlet, topSpace + 6 * verticalInlet, "Vec3_dot");
    dot0.varname = "dot0" + i;
    dot1.varname = "dot1" + i;
    dot2.varname = "dot2" + i;
    p.connect(cross0, 0, dot0, 0);
    p.connect(normal, 0, dot0, 1);

    p.connect(cross1, 0, dot1, 0);
    p.connect(normal, 0, dot1, 1);

    p.connect(cross2, 0, dot2, 0);
    p.connect(normal, 0, dot2, 1);

    var divide0 = p.newdefault(i * triangleInlet + leftSpace + 0 * horizontalInlet, topSpace + 7 * verticalInlet, "/");
    var divide1 = p.newdefault(i * triangleInlet + leftSpace + 1 * horizontalInlet, topSpace + 7 * verticalInlet, "/");
    var divide2 = p.newdefault(i * triangleInlet + leftSpace + 2 * horizontalInlet, topSpace + 7 * verticalInlet, "/");
    divide0.varname = "divide0" + i;
    divide1.varname = "divide1" + i;
    divide2.varname = "divide2" + i;
    p.connect(cross0,     0, divide0, 0);
    p.connect(dot_Normal, 0, divide0, 1);

    p.connect(cross1,     0, divide1, 0);
    p.connect(dot_Normal, 0, divide1, 1);

    p.connect(cross2,     0, divide2, 0);
    p.connect(dot_Normal, 0, divide2, 1);

    var if1 = p.newdefault(i * triangleInlet + leftSpace, topSpace + 8 * verticalInlet, "if 0 <= $i1 <= 1 & 0 <= $i2 <= 1 & 0 <= $i3 <= 1 then 1 else 0");
    // if1.setattr("width", 160);
    if1.varname = "if1" + i;

    p.connect(divide0, 0, if1, 0);
    p.connect(divide1, 0, if1, 1);
    p.connect(divide2, 0, if1, 2);

    p.connect(if1, 0, if2, i);
  }

  p.connect(if2, 0, p.getnamed("out1"), 0);

}