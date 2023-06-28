autowatch = 1;

const math = {
  add(vec1 = [], vec2 = []) {
    return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]];
  },
  subtract(vec1 = [], vec2 = []) {
    return [vec1[0] - vec2[0], vec1[1] - vec2[1], vec1[2] - vec2[2]];
  },
  cross(vec1 = [], vec2 = []) {
    return [
      vec1[1] * vec2[2] - vec1[2] * vec2[1],
      vec1[2] * vec2[0] - vec1[0] * vec2[2],
      vec1[0] * vec2[1] - vec1[1] * vec2[0]
    ];
  },
  dot(vec1 = [], vec2 = []) {
    return (
      vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2]
    );
  },
  multiply(value, vec = []) {
    return [vec[0] * value, vec[1] * value, vec[2] * value];
  },
  divide(value, vec = []) {
    return [vec[0] / value, vec[1] / value, vec[2] / value];
  },
  norm(vec = []) {
    return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
  }
};

var microphone = [];
var speakers   = [];
var walls      = [];

function packFromMessage(message) {
  // post(message)
  var split = message.split(" ");
  // post(split[0])
  // post(split[2])
  split.reverse();
  split.pop();
  split.reverse();
  for(var i=0; i<split.length; i++) {

      post(split[i])
  }
  
  // outlet(0, args[0])
}

function setMicrophone(message="") {
  var spltMsg = message.split(" ");
  microphone = [spltMsg[1], spltMsg[2], spltMsg[3]];
}

function setSpeaker(message="") {
  var spltMsg = message.split(" ");
  for (let i = 1; i < parseInt(spltMsg.length/3); i+=3) {
    speakers.push([spltMsg[i],spltMsg[i+1],spltMsg[i+2]])
  }
}

function setWalls(message="") {
  var spltMsg = message.split(" ");
}




// check if the given polygon is in
function isInTwoDimSpace(polygon=[]) {
  var vec1 = math.subtract(polygon[0], polygon[parseInt((polygon.length-1) / 2)]);
  var vec2 = math.subtract(polygon[0], polygon[polygon.length - parseInt((polygon.length-1) / 2)]);
  var normal = math.cross(vec1, vec2);
  for (var i = 0; i < polygon.length; i++) {
    if (math.dot(normal, polygon[i]) > 0.005) {
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
    // var svec = math.subtract(polygon[0], polygon[parseInt((polygon.length-1) / 2)]);
    // var dvec = math.subtract(polygon[0], polygon[polygon.length - parseInt((polygon.length-1) / 2)]);
    var svec = math.subtract(polygon[0], polygon[1]);
    var dvec = math.subtract(polygon[0], polygon[2]);
    var normal = math.cross(dvec, svec);
    normal = math.divide(math.norm(normal), normal);
    var levToSpeaker = math.subtract(lvec, speaker);
    // calculating intersectionpoint of plane and speaker
    var lambda = math.dot(normal, levToSpeaker) / (normal[0] + normal[1] + normal[2]);
    return math.add(speaker, math.multiply(2*lambda, normal));
}

function getImageSoundSources(polygon = [], speakers = []) {
    var lvec = polygon[0];
    // var svec = math.subtract(polygon[0], polygon[parseInt((polygon.length-1) / 2)]);
    // var dvec = math.subtract(polygon[0], polygon[polygon.length - parseInt((polygon.length-1) / 2)]);
    var svec = math.subtract(polygon[0], polygon[1]);
    var dvec = math.subtract(polygon[0], polygon[2]);
    var normal = math.cross(dvec, svec);
    normal = math.divide(math.norm(normal), normal);
    var ISSes = []
    for (const speaker of speakers) {
      var levToSpeaker = math.subtract(lvec, speaker);
      // calculating intersectionpoint of plane and speaker
      var lambda = math.dot(normal, levToSpeaker) / (normal[0] + normal[1] + normal[2]);
      ISSes.push(math.add(speaker, math.multiply(2*lambda, normal)));
    }
    // for (var i = 0; i < speakers.length; i++) {
    //   var speaker = speakers[i];
    //   var levToSpeaker = math.subtract(lvec, speaker);
    //   // calculating intersectionpoint of plane and speaker
    //   var lambda = math.dot(normal, levToSpeaker) / (normal[0] + normal[1] + normal[2]);
    //   ISSes.push(math.add(speaker, math.multiply(2*lambda, normal)));
    // }
    return ISSes;
}

function calculateIntersection(polygon=[], microphone=[], ISS=[]) {

    var lineVector = math.subtract(microphone, ISS);

    var planeNormal = math.cross(
      math.subtract(polygon[0], polygon[parseInt((polygon.length-1) / 2)]),
      math.subtract(polygon[0], polygon[polygon.length - parseInt((polygon.length-1) / 2)])
    );
  
    var t = math.dot(planeNormal, math.subtract(polygon[0], ISS)) / math.dot(planeNormal, lineVector);
    var intersectionPoint = math.add(ISS, math.multiply(t, lineVector));
  
    return intersectionPoint;
  }

function calculateIntersections(polygon=[], microphone=[], ISSes=[]) {
  var intersectionPoints = []
  for (const ISS of ISSes) {
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

  
  function containsPoint(point=[], polygon=[]) {
    var toReturn = false;
  for (var i = 0; i < polygon.length-1; i++) {
    var triangle = [polygon[0], polygon[i], polygon[i+1]];
    const normal = math.cross(math.subtract(triangle[1], triangle[0]), math.subtract(triangle[2], triangle[0]));

    // calculate the barycentric coordinates of the point in the constructed triangle.
    const bc1 = [
      math.dot(math.cross(math.subtract(triangle[1], point), math.subtract(triangle[2], point)), normal) / math.dot(normal, normal),
      math.dot(math.cross(math.subtract(triangle[2], point), math.subtract(triangle[0], point)), normal) / math.dot(normal, normal),
      math.dot(math.cross(math.subtract(triangle[0], point), math.subtract(triangle[1], point)), normal) / math.dot(normal, normal),
    ];
    // check if the point is in any of the constructed triangles
    toReturn = toReturn || bc1.every(coord => coord >= 0 && coord <= 1);
  }
  return toReturn;
}

function getDistance(ISS = [], microfon = []) {
   return math.norm(math.subtract(ISS, microfon));
}







// Example
const polygon = [[0,10,0], [10,10,0], [10,0,0], [0,0,0]];

var   speaker0 = [5,2,4];
var   speaker1 = [4,2,5];
const speakersTest = [speaker0, speaker1];
const microfon = [5,6,4];

if(isInTwoDimSpace(polygon)) {

  const isses = getImageSoundSources(polygon, speakersTest);
  console.log("iss: " + isses)
  const intersections = calculateIntersections(polygon, microfon, isses);
  for (const intersection of intersections) {
    const contains = containsPoint(intersection, polygon);
    console.log("is valid: " + contains)
  }
} else {
  console.log("Not in two dim space!")
}

var a = []
a[6] = 0;

