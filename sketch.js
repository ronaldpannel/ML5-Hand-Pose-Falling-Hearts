let handPose;
let video;
let hands = [];
let options = { flipped: true };
let pts = [];
let heartColor = 255;
let hearts = [];
let heartCreated = false;

let colorPallet = [
  "#B32134",
  "#C13450",
  "#CE476B",
  "#DC5987",
  "#E96CA2",
  "#F77FBE",
];

function preload() {
  handPose = ml5.handPose(options);
}

function setup() {
  createCanvas(640, 480);

  // Create the video and hide it
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0, width, height);

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let handedness = hand.handedness;
    let keypoints = hand.keypoints;

    if (handedness == "Left") {
      pts[0] = keypoints[4];
      pts[1] = keypoints[3];
      pts[2] = keypoints[2];
      pts[3] = keypoints[5];
      pts[4] = keypoints[6];
      pts[5] = keypoints[7];
      pts[6] = keypoints[8];
    }

    if (handedness == "Right") {
      pts[7] = keypoints[8];
      pts[8] = keypoints[7];
      pts[9] = keypoints[6];
      pts[10] = keypoints[5];
      pts[11] = keypoints[2];
      pts[12] = keypoints[3];
      pts[13] = keypoints[4];
    }
  }
  beginShape();
  for (let i = 0; i < pts.length; i++) {
    if (pts[i]) {
      noStroke();
      stroke(0);
      fill(heartColor)
      vertex(pts[i].x, pts[i].y);
    }
  }
  endShape(CLOSE);

  checkForHeart();
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].display();
    hearts[i].update();
    if (hearts[i].done) {
      hearts.splice(i, 1);
    }
  }

   for (let i = 0; i < hearts.length; i++) {

     if (hearts[i].done) {
       hearts.splice(i, 1);
     }
   }
   console.log(hearts.length);
}

function checkForHeart() {
  let leftThumb = pts[0];
  let rightThumb = pts[13];
  let leftIndex = pts[6];
  let rightIndex = pts[7];

  if (leftThumb && rightThumb && leftIndex && rightIndex) {
    let thumbDist = dist(rightThumb.x, rightThumb.y, leftThumb.x, leftThumb.y);
    let indexDist = dist(rightIndex.x, rightIndex.y, leftIndex.x, leftIndex.y);
    
    if (thumbDist < 30 && indexDist < 30 && !heartCreated) {
      hearts.push(new Heart(pts));
      heartCreated = true;
    } else if (thumbDist > 40 || indexDist > 40) {
      heartCreated = false;
    }
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}
