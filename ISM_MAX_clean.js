autowatch = 1;
// num of max object outlets
outlets = 2;

// simple vector operations
var math = {
  add: function(vec1, vec2) {
    return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]];
  },
  subtract: function(vec1, vec2) {
    return [vec1[0] - vec2[0], vec1[1] - vec2[1], vec1[2] - vec2[2]];
  },
  cross: function(vec1, vec2) {
    return [
      vec1[1] * vec2[2] - vec1[2] * vec2[1],
      vec1[2] * vec2[0] - vec1[0] * vec2[2],
      vec1[0] * vec2[1] - vec1[1] * vec2[0]
    ];
  },
  dot: function(vec1, vec2) {
    return (
      vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2]
    );
  },
  multiply: function(value, vec) {
    return [vec[0] * value, vec[1] * value, vec[2] * value];
  },
  divide: function(value, vec) {
    return [vec[0] / value, vec[1] / value, vec[2] / value];
  },
  norm: function(vec) {
    return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
  }
};

var listener = [];
var sources  = [];
// one area must contain 4 vector3 points
var areas    = [];


function setListener(message) {
  post("Listener Msg: " + message + "\n")
  var spltMsg = message.split(" ");
  if(spltMsg[0].split("/")[2] == "xyz") {
    listener = [parseFloat(spltMsg[1]), parseFloat(spltMsg[2]), parseFloat(spltMsg[3])];

    // onChange();
  }
}

function setSources(message) {
  post("Sources Msg: " + message + "\n")
  var spltMsg = message.split(" ");
  if(spltMsg[0].split("/")[3] == "xyz" && spltMsg[1] != null) {
    var sourceIdx = spltMsg[0].split("/")[2] - 1;
    sources[sourceIdx] = [parseFloat(spltMsg[1]), parseFloat(spltMsg[2]), parseFloat(spltMsg[3])];

    // onChange();
  }
}

function setAreas(message) {
  // post("Areas Msg: " + message + "\n")
  var spltMsg = message.split(" ");

  for (var i = 1; i < spltMsg.length; i+=3) {
    spltMsg[i] = parseFloat(spltMsg[i]);
  }
  var areaIdx = spltMsg[0].split("/")[2] - 1;
  areas[areaIdx] = [[spltMsg[1], spltMsg[2], spltMsg[3]], [spltMsg[4], spltMsg[5], spltMsg[6]], [spltMsg[7], spltMsg[8], spltMsg[9]], [spltMsg[10], spltMsg[11], spltMsg[12]]];

  // onChange();
  
}

function getAreas() {
  outlet(0, areas.toString())
}
function getListener() {
  outlet(0, listener.toString())
}
function getSources() {
  outlet(0, sources.toString())
}


// check if the given area is in
function isInTwoDimSpace(area) {
  // var vec1 = math.subtract(area[0], area[parseInt((area.length-1) / 2)]);
  // var vec2 = math.subtract(area[0], area[area.length - parseInt((area.length-1) / 2)]);
  var vec1 = math.subtract(area[0], area[2]);
  var vec2 = math.subtract(area[0], area[1]);
  var normal = math.cross(vec1, vec2);
  for (var i = 0; i < area.length; i++) {
    if (math.dot(normal, area[i]) > 0.005) {
      return false;
    }
  }
  return true;
}

function getImageSoundSources(area, sources) {
    var lvec = area[0];
    var svec = math.subtract(area[0], area[1]);
    var dvec = math.subtract(area[0], area[2]);
    var normal = math.cross(dvec, svec);
    normal = math.divide(math.norm(normal), normal);
    var ISSes = [];
    for (var i = 0; i < sources.length; i++) {
      const source = sources[i];
      var levTosource = math.subtract(source, lvec);
      // calculating intersectionpoint of plane and source
      var lambda = math.dot(normal, levTosource) / (normal[0] + normal[1] + normal[2]);
      ISSes.push(math.add(source, math.multiply(2*lambda, normal)));
    }
    return ISSes;
}

function calculateIntersections(area, listener, ISSes) {
  var intersectionPoints = []
  for (var i = 0; i < ISSes.length; i++) {
    var lineVector = math.subtract(listener, ISSes);

    var planeNormal = math.cross(
      math.subtract(area[0], area[parseInt((area.length-1) / 2)]),
      math.subtract(area[0], area[area.length - parseInt((area.length-1) / 2)])
    );
  
    var t = math.dot(planeNormal, math.subtract(area[0], ISSes)) / math.dot(planeNormal, lineVector);
    intersectionPoints.push( math.add( ISSes, math.multiply( t, lineVector ) ) );
  }
    return intersectionPoints;
  }

  
function containsPoint(point, area) {
  var toReturn = false;
  for (var i = 0; i < area.length-1; i++) {
    var triangle = [area[0], area[i], area[i+1]];
    var normal = math.cross(math.subtract(triangle[1], triangle[0]), math.subtract(triangle[2], triangle[0]));

    // calculate the barycentric coordinates of the point in the constructed triangle.
    var bc = [
      math.dot(math.cross(math.subtract(triangle[1], point), math.subtract(triangle[2], point)), normal) / math.dot(normal, normal),
      math.dot(math.cross(math.subtract(triangle[2], point), math.subtract(triangle[0], point)), normal) / math.dot(normal, normal),
      math.dot(math.cross(math.subtract(triangle[0], point), math.subtract(triangle[1], point)), normal) / math.dot(normal, normal),
    ];
    // check if the point is in any of the constructed triangles
    var allCoordsValid = true;
    for (var j = 0; j < bc.length; j++) {
      if (bc[j] < 0 || bc[j] > 1) {
        allCoordsValid = false;
        break;
      }
    }
    toReturn = toReturn || allCoordsValid;
  }
  return toReturn;
}

function getDistance(ISS, microfon) {
   return math.norm(math.subtract(ISS, microfon));
}


function onChange() {
  if(typeof sources == "undefined" || typeof listener == "undefined") {
    post("source or listener are not initialed" + "\n");
    return;
  }
  for (var i = 0; i < areas.length; i++) {
    // checking if the area is not set in Max
    if(typeof areas[i] == "undefined") {
      continue;
    }
    const area = areas[i];
    // // when the given coordinates are not forming a even plane
    // if(!isInTwoDimSpace(area)){
    //   post("area " + (i+1) + "incorrect!" + "\n");
    //   continue;
    // }
    var ISSes = getImageSoundSources(area, sources);
    var intersections = calculateIntersections(area, listener, ISSes);
    for (var j = 0; j < intersections.length; j++) {
      const intersection = intersections[j];
      if(containsPoint(intersection, area)) {
        var srcIdx = sources.length * areas.length + (i + 1) * (j + 1);
        outlet(0, "/source/" + srcIdx + "/color red");
        // Converting from Spat5 to OpenGL coordinates
        outlet(0, "/source/" + srcIdx + "/xyz " + ISSes[j][0] + " " + ISSes[j][2] + " " + -ISSes[j][1]);
      }
    }
  }
}