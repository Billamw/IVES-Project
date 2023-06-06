autowatch = 1;

var p = this.patcher;
var numObjects = 0
var maxObjects = 10;

var objectSize = 30;
var objectInset = 100;

function createObject(num) {


  if(num < 0)
    num = 0;
  if(num > maxObjects)
    num = maxObjects;
  
  var numObjects = num;

  for (var i = 0; i < maxObjects; i++) {
    var oldObject = this.patcher.getnamed("object" + i);
    var oldMessages = this.patcher.getnamed("message" + i);
    this.patcher.remove(oldObject);
    this.patcher.remove(oldMessages);
    ///////////////////////////////////////
    var oldUnpack = p.getnamed("unpack")
    p.remove(oldUnpack)
    ///////////////////////////////////////

  }

    ///////////////////////////////////////

  var unpack = "unpack";
  for (var i = 0; i < numObjects; i++) {
    unpack += " l";
  }
  post(unpack)
  var unpackObject = this.patcher.newdefault(30, 30, unpack)
  unpackObject.varname = "unpack";

    ///////////////////////////////////////

  for (var i = 0; i < numObjects; i++) {
    // var oldObject = this.patcher.getnamed("object" + i);
    // var oldMessages = this.patcher.getnamed("message" + i);
    // this.patcher.remove(oldObject);
    // this.patcher.remove(oldMessages);

    xpos = objectInset + (2 * objectSize * i);
    ypos = objectSize;

    var newObject = this.patcher.newobject("button", xpos, ypos, objectSize, 0);
    var newMessage = this.patcher.newobject("message", xpos+objectSize, ypos+objectSize+10, objectSize, objectSize);


    newObject.varname = "object" + i;
    newMessage.varname = "message" + i;

    this.patcher.hiddenconnect(newObject, 0, newMessage, 0);
    var myinteger = this.patcher.getnamed("myinteger")
    this.patcher.hiddenconnect(newMessage, 0, myinteger, 0);
    
  }
}