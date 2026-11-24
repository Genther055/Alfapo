const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');

const outDir = path.join(__dirname, 'frames');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Extract 1 frame every 15 seconds: 8m17s = ~497s -> ~33 frames
const inputFile = 'D:/Telegram Desktop/IMG_3414.MP4';
const args = [
  '-i', inputFile,
  '-vf', 'fps=1/15,scale=640:360',
  '-q:v', '3',
  path.join(outDir, 'frame_%03d.jpg')
];

console.log('Extracting timeline frames...');
cp.execFileSync(ffmpeg, args, { stdio: 'inherit' });
console.log('Frames extracted.');
