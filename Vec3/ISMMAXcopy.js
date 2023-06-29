autowatch = 1;
// num of max object outlets
outlets = 2;

// simple vector operations
function add(vec1 = [], vec2 = []) {
  return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]];
}

function subtract(vec1 = [], vec2 = []) {
  return [vec1[0] - vec2[0], vec1[1] - vec2[1], vec1[2] - vec2[2]];
}

function cross(vec1 = [], vec2 = []) {
  return [
    vec1[1] * vec2[2] - vec1[2] * vec2[1],
    vec1[2] * vec2[0] - vec1[0] * vec2[2],
    vec1[0] * vec2[1] - vec1[1] * vec2[0]
  ];
}

function dot(vec1 = [], vec2 = []) {
  return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2];
}

function multiply(value, vec = []) {
  return [vec[0] * value, vec[1] * value, vec[2] * value];
}

function divide(value, vec = []) {
  return [vec[0] / value, vec[1] / value, vec[2] / value];
}

function norm(vec = []) {
  return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
}

var microphone = [];
var speakers   = [];
var walls      = [];


function setMicrophone(message) {
  var spltMsg = message.split(" ");
  microphone = [parseFloat(spltMsg[1]), parseFloat(spltMsg[2]), parseFloat(spltMsg[3])];
}

function setSpeakers(message) {
  var spltMsg = message.split(" ");
  spltMsg.reverse();
  var areaNum = spltMsg.pop().split("/")[2] - 1;
  spltMsg.reverse();

  for (var i = 0; i < spltMsg.length; i++) {
    spltMsg[i] = parseFloat(spltMsg[i]);
    
  }
  // outlet(0, "bang")
  speakers[areaNum] = spltMsg;
}

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

}

// testing set funktions
setSpeakers("/dfdsjs/1 5 5 5")
setWalls("/sdsd/6 5 4 3 2 1");
console.log(speakers)
console.log(walls)




// check if the given polygon is in
function isInTwoDimSpace(polygon=[]) {
  var vec1 = subtract(polygon[0], polygon[parseInt((polygon.length-1) / 2)]);
  var vec2 = subtract(polygon[0], polygon[polygon.length - parseInt((polygon.length-1) / 2)]);
  var normal = cross(vec1, vec2);
  for (var i = 0; i < polygon.length; i++) {
    if (dot(normal, polygon[i]) > 0.005) {
      return false;
    }
  }
  return true;
}

//lvec: location vector ist the first vector of each wall
//svec: support vector wall[3]-wall[0]
//dvec: direction vector wall[1]-wall[0]
function getImageSoundSource(polygon = [], speaker = []) {
    var lvec = polygon[0];
    var svec = subtract(polygon[0], polygon[1]);
    var dvec = subtract(polygon[0], polygon[2]);
    var normal = cross(dvec, svec);
    normal = divide(norm(normal), normal);
    var levToSpeaker = subtract(lvec, speaker);
    // calculating intersectionpoint of plane and speaker
    var lambda = dot(normal, levToSpeaker) / (normal[0] + normal[1] + normal[2]);
    return add(speaker, multiply(2*lambda, normal));
}

function getImageSoundSources(polygon = [], speakers = []) {
    var lvec = polygon[0];
    var svec = subtract(polygon[0], polygon[1]);
    var dvec = subtract(polygon[0], polygon[2]);
    var normal = cross(dvec, svec);
    normal = divide(norm(normal), normal);
    var ISSes = []
    for (var speaker of speakers) {
      var levToSpeaker = subtract(lvec, speaker);
      // calculating intersectionpoint of plane and speaker
      var lambda = dot(normal, levToSpeaker) / (normal[0] + normal[1] + normal[2]);
      ISSes.push(add(speaker, multiply(2*lambda, normal)));
    }
    return ISSes;
}

function calculateIntersection(polygon=[], microphone=[], ISS=[]) {

    var lineVector = subtract(microphone, ISS);

    var planeNormal = cross(
      subtract(polygon[0], polygon[parseInt((polygon.length-1) / 2)]),
      subtract(polygon[0], polygon[polygon.length - parseInt((polygon.length-1) / 2)])
    );
  
    var t = dot(planeNormal, subtract(polygon[0], ISS)) / dot(planeNormal, lineVector);
    var intersectionPoint = add(ISS, multiply(t, lineVector));
  
    return intersectionPoint;
  }

function calculateIntersections(polygon=[], microphone=[], ISSes=[]) {
  var intersectionPoints = []
  for (var ISS of ISSes) {
    var lineVector = subtract(microphone, ISS);

    var planeNormal = cross(
      subtract(polygon[0], polygon[parseInt((polygon.length-1) / 2)]),
      subtract(polygon[0], polygon[polygon.length - parseInt((polygon.length-1) / 2)])
    );
  
    var t = dot(planeNormal, subtract(polygon[0], ISS)) / dot(planeNormal, lineVector);
    intersectionPoints.push( add( ISS, multiply( t, lineVector ) ) );
  }
    return intersectionPoints;
  }

  
  function containsPoint(point=[], polygon=[]) {
    var toReturn = false;
  for (var i = 0; i < polygon.length-1; i++) {
    var triangle = [polygon[0], polygon[i], polygon[i+1]];
    var normal = cross(subtract(triangle[1], triangle[0]), subtract(triangle[2], triangle[0]));

    // calculate the barycentric coordinates of the point in the constructed triangle.
    var bc1 = [
      dot(cross(subtract(triangle[1], point), subtract(triangle[2], point)), normal) / dot(normal, normal),
      dot(cross(subtract(triangle[2], point), subtract(triangle[0], point)), normal) / dot(normal, normal),
      dot(cross(subtract(triangle[0], point), subtract(triangle[1], point)), normal) / dot(normal, normal),
    ];
    // check if the point is in any of the constructed triangles
    toReturn = toReturn || bc1.every(coord => coord >= 0 && coord <= 1);
  }
  return toReturn;
}

function getDistance(ISS = [], microfon = []) {
   return norm(subtract(ISS, microfon));
}







// Example
var polygon = [[0,10,0], [10,10,0], [10,0,0], [0,0,0]];

var   speaker0 = [5,2,4];
var   speaker1 = [4,2,5];
var speakersTest = [speaker0, speaker1];
var microfon = [5,6,4];

if(isInTwoDimSpace(polygon)) {

  var isses = getImageSoundSources(polygon, speakersTest);
  console.log("iss: " + isses)
  var intersections = calculateIntersections(polygon, microfon, isses);
  for (var intersection of intersections) {
    var contains = containsPoint(intersection, polygon);
    console.log("is valid: " + contains)
  }
} else {
  console.log("Not in two dim space!")
}

