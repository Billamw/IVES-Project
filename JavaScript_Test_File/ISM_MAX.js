autowatch = 1;


function add(vec1=[], vec2=[]) {
  return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]];
}
function subtract(vec1=[], vec2=[]) {
  return [vec1[0] - vec2[0], vec1[1] - vec2[1], vec1[2] - vec2[2]];
}
function cross(vec1=[], vec2=[]) {
  return [vec1[1] * vec2[2] - vec1[2] * vec2[1],
          vec1[2] * vec2[0] - vec1[0] * vec2[2],
          vec1[0] * vec2[1] - vec1[1] * vec2[0]];
}
function dot(vec1=[], vec2=[]) {
  return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2];
}
function multiply(value, vec=[]) {
  return [vec[0] * value, vec[1] * value, vec[2] * value];
}
function divide(value, vec=[]) {
  return [vec[0] / value, vec[1] / value, vec[2] / value];
  
}
function norm(vec=[]){
  return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
}
// check if the given polygon is in
function isInTwoDimSpace(polygon=[]) {
  let vec1 = subtract(polygon[0], polygon[parseInt((polygon.length-1) / 2)]);
  let vec2 = subtract(polygon[0], polygon[polygon.length - parseInt((polygon.length-1) / 2)]);
  let normal = cross(vec1, vec2);
  for (let i = 0; i < polygon.length; i++) {
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
    let lvec = polygon[0];
    // let svec = subtract(polygon[0], polygon[parseInt((polygon.length-1) / 2)]);
    // let dvec = subtract(polygon[0], polygon[polygon.length - parseInt((polygon.length-1) / 2)]);
    let svec = subtract(polygon[0], polygon[1]);
    let dvec = subtract(polygon[0], polygon[2]);
    let normal = cross(dvec, svec);
    normal = divide(normal, norm(normal));
    let levToSpeaker = subtract(lvec, speaker);
    // calculating intersectionpoint of plane and speaker
    let lambda = dot(normal, levToSpeaker) / (normal[0] + normal[1] + normal[2]);
    return add(speaker, multiply(2*lambda, normal));
}

function calculateIntersection(polygon=[], microphone=[], ISS=[]) {

    let lineVector = subtract(microphone, ISS);

    let planeNormal = cross(
      subtract(polygon[0], polygon[parseInt((polygon.length-1) / 2)]),
      subtract(polygon[0], polygon[polygon.length - parseInt((polygon.length-1) / 2)])
    );
  
    let t = dot(planeNormal, subtract(polygon[0], ISS)) / dot(planeNormal, lineVector);
    let intersectionPoint = add(ISS, multiply(t, lineVector));
  
    return intersectionPoint;
  }

  
  function containsPoint(point=[], polygon=[]) {
    let toReturn = false;
  for (let i = 0; i < polygon.length-1; i++) {
    let triangle = [polygon[0], polygon[i], polygon[i+1]];
    const normal = cross(subtract(triangle[1], triangle[0]), subtract(triangle[2], triangle[0]));

    // calculate the barycentric coordinates of the point in the constructed triangle.
    const bc1 = [
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


const polygon = [[0,10,0], [10,10,0], [10,0,0], [0,0,0]];

const speaker = [5,2,4];
const microfon = [5,6,4];

if(isInTwoDimSpace(polygon)) {

  const iss = getImageSoundSource(polygon, speaker);
  console.log("iss: " + iss)
  const intersection = calculateIntersection(polygon, microfon, iss);
  const contains = containsPoint(intersection, polygon);
  console.log("is valid: " + contains)
} else {
  console.log("Not in two dim space!")
}



// Beispielanwendung
  // var polygon3D = [[0, 0, 0], [0, 5, 0], [5, 5, 0], [5, 0, 0]];
  // var point3D = [0, 0, 0];
  // // var isInside3D = pointInPolygon3D(point3D, polygon3D);
  // // var isInPolygon1 = isInPolygon(point3D, polygon3D);
  // var isInPolygon = containsPoint(point3D, polygon3D);
  // var isTwoDim = isInTwoDimSpace(polygon3D);
  // // console.log(isInPolygon1)
  // console.log("is inside: " + isInPolygon); // true
  // console.log("is two dim: " + isTwoDim);
        