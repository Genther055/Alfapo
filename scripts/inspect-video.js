const cp = require('child_process');
const ffmpeg = require('ffmpeg-static');

const inputFile = 'D:/Telegram Desktop/IMG_3414.MP4';
try {
  cp.execFileSync(ffmpeg, ['-i', inputFile], { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
} catch (err) {
  console.log(err.stderr);
}
