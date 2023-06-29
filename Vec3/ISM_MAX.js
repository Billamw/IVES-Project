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

var microphone = [];
var speakers   = [];
var walls      = [[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0]];


function setMicrophone(message) {
  var spltMsg = message.split(" ");
  if(spltMsg[0].split("/")[2] == "xyz") {
    microphone = [parseFloat(spltMsg[1]), parseFloat(spltMsg[2]), parseFloat(spltMsg[3])];
    onChange();
  }
}

function setSpeakers(message) {
  var spltMsg = message.split(" ");
  for (var i = 1; i < spltMsg.length; i+=3) {
    speakers.push([parseFloat(spltMsg[i]), parseFloat(spltMsg[i+1]), parseFloat(spltMsg[i+2])])
  }
  onChange();
}
// /area/8/xyz 8 6 3 1 0
function setWalls(message) {
  var spltMsg = message.split(" ");
  spltMsg.reverse();
  var areaNum = spltMsg.pop().split("/")[2] - 1;
  spltMsg.reverse();

  for (var i = 0; i < spltMsg.length; i++) {
    spltMsg[i] = parseFloat(spltMsg[i]);
    
  }
  // outlet(0, "bang")
  walls[areaNum] = spltMsg;
  onChange();
  
}

// testing set funktions
// setSpeakers("dfdsjs 5 5 5 4 4 4 6 6 6")
// setWalls("sd/sdsd/6 5 4 3 2 1");
// console.log(speakers)
// console.log(walls)




// check if the given polygon is in
function isInTwoDimSpace(wall) {
  // var vec1 = math.subtract(wall[0], wall[parseInt((wall.length-1) / 2)]);
  // var vec2 = math.subtract(wall[0], wall[wall.length - parseInt((wall.length-1) / 2)]);
  var vec1 = math.subtract(wall[0], wall[2]);
  var vec2 = math.subtract(wall[0], wall[1]);
  var normal = math.cross(vec1, vec2);
  for (var i = 0; i < wall.length; i++) {
    if (math.dot(normal, wall[i]) > 0.005) {
      return false;
    }
  }
  return true;
}

//lvec: location vector ist the first vector of each wall
//svec: support vector wall[3]-wall[0]
//dvec: direction vector wall[1]-wall[0]
function getImageSoundSource(polygon, speaker) {
    var lvec = polygon[0];
    var svec = math.subtract(polygon[0], polygon[1]);
    var dvec = math.subtract(polygon[0], polygon[2]);
    var normal = math.cross(dvec, svec);
    normal = math.divide(math.norm(normal), normal);
    var levToSpeaker = math.subtract(lvec, speaker);
    // calculating intersectionpoint of plane and speaker
    var lambda = math.dot(normal, levToSpeaker) / (normal[0] + normal[1] + normal[2]);
    return math.add(speaker, math.multiply(2*lambda, normal));
}

function getImageSoundSources(polygon, speakers) {
    var lvec = polygon[0];
    var svec = math.subtract(polygon[0], polygon[1]);
    var dvec = math.subtract(polygon[0], polygon[2]);
    var normal = math.cross(dvec, svec);
    normal = math.divide(math.norm(normal), normal);
    var ISSes = []
    for (var speaker in speakers) {
      var levToSpeaker = math.subtract(lvec, speaker);
      // calculating intersectionpoint of plane and speaker
      var lambda = math.dot(normal, levToSpeaker) / (normal[0] + normal[1] + normal[2]);
      ISSes.push(math.add(speaker, math.multiply(2*lambda, normal)));
    }
    return ISSes;
}

function calculateIntersection(polygon, microphone, ISS) {

    var lineVector = math.subtract(microphone, ISS);

    var planeNormal = math.cross(
      math.subtract(polygon[0], polygon[parseInt((polygon.length-1) / 2)]),
      math.subtract(polygon[0], polygon[polygon.length - parseInt((polygon.length-1) / 2)])
    );
  
    var t = math.dot(planeNormal, math.subtract(polygon[0], ISS)) / math.dot(planeNormal, lineVector);
    var intersectionPoint = math.add(ISS, math.multiply(t, lineVector));
  
    return intersectionPoint;
  }

function calculateIntersections(polygon, microphone, ISSes) {
  var intersectionPoints = []
  for (var ISS in ISSes) {
    var lineVector = math.subtract(microphone, ISS);

    var planeNormal = math.cross(
      math.subtract(polygon[0], polygon[parseInt((polygon.length-1) / 2)]),
      math.subtract(polygon[0], polygon[polygon.length - parseInt((polygon.length-1) / 2)])
    );
  
    var t = math.dot(planeNormal, math.subtract(polygon[0], ISS)) / math.dot(planeNormal, lineVector);
    intersectionPoints.push( math.add( ISS, math.multiply( t, lineVector ) ) );
  }
    return intersectionPoints;
  }

  
function containsPoint(point, polygon) {
  var toReturn = false;
  for (var i = 0; i < polygon.length-1; i++) {
    var triangle = [polygon[0], polygon[i], polygon[i+1]];
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
  for (var i = 0; i < walls.length; i++) {
    const wall = walls[i];
    if(typeof wall == 'undefined') {
      return;
    }
    if(!isInTwoDimSpace(wall)){
      post("Wall " + (i+1) + "incorrect!");
      post();
      return;
    }
    var ISSes = getImageSoundSources(wall, speakers);
    var intersections = calculateIntersections(wall, microphone, ISSes);
    for (var i = 0; i < intersections.length; i++) {
      const intersection = intersections[i];
      if(containsPoint(intersection, wall)) {
        outlet(0, "/source/" + (10) + "/color red");
        outlet(0, "/source/" + (10) + "/xyz " + ISSes[i][0] + " " + ISSes[i][1] + " " + ISSes[i][2]);
      }
    }
  }
}





// Example
// var polygon = [[0,10,0], [10,10,0], [10,0,0], [0,0,0]];

// var   speaker0 = [5,2,4];
// var   speaker1 = [4,2,5];
// var speakersTest = [speaker0, speaker1];
// var microfon = [5,6,4];

// if(isInTwoDimSpace(polygon)) {

//   var isses = getImageSoundSources(polygon, speakersTest);
//   console.log("iss: " + isses)
//   var intersections = calculateIntersections(polygon, microfon, isses);
//   for (var intersection in intersections) {
//     var contains = containsPoint(intersection, polygon);
//     console.log("is valid: " + contains)
//   }
// } else {
//   console.log("Not in two dim space!")
// }

