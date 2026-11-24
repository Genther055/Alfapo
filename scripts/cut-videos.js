const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const ffmpegPath = path.resolve('node_modules/ffmpeg-static/ffmpeg.exe');
const inputVideo = 'D:\\Telegram Desktop\\IMG_3414.MP4';
const outputDir = path.resolve('public/videos');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 4 distinct clips:
// 1. plant-hero.mp4: Casemaker + Horizon dynamic line (~18s: 01:48 - 02:06)
// 2. book-binding.mp4: High-speed automated thread-sewing machine (~16s: 04:16 - 04:32)
// 3. packaging-line.mp4: Automated pallet stretch-wrapper & boxes (~16s: 05:18 - 05:34)
// 4. calendar-renz.mp4: High-speed spring punch & wire-o line (~16s: 07:18 - 07:34)

const clips = [
  {
    name: 'plant-hero.mp4',
    poster: 'plant-hero-poster.jpg',
    ss: '00:01:48',
    t: '16',
    crop: null
  },
  {
    name: 'book-binding.mp4',
    poster: 'book-binding-poster.jpg',
    ss: '00:04:16',
    t: '15',
    crop: null
  },
  {
    name: 'packaging-line.mp4',
    poster: 'packaging-line-poster.jpg',
    ss: '00:05:18',
    t: '15',
    crop: null
  },
  {
    name: 'calendar-renz.mp4',
    poster: 'calendar-renz-poster.jpg',
    ss: '00:07:18',
    t: '15',
    crop: null
  }
];

function runCmd(args) {
  return new Promise((resolve, reject) => {
    const p = spawn(ffmpegPath, args, { stdio: 'inherit' });
    p.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error('ffmpeg exited with code ' + code));
    });
  });
}

async function processClips() {
  for (const clip of clips) {
    const outMp4 = path.join(outputDir, clip.name);
    const outJpg = path.join(outputDir, clip.poster);

    console.log(`\n=== Processing: ${clip.name} ===`);
    // Scale to 1280x720, crf 27, preset veryfast, -an (no audio), faststart for instant streaming
    const mp4Args = [
      '-y',
      '-ss', clip.ss,
      '-i', inputVideo,
      '-t', clip.t,
      '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2',
      '-c:v', 'libx264',
      '-preset', 'veryfast',
      '-crf', '27',
      '-an',
      '-movflags', '+faststart',
      outMp4
    ];
    await runCmd(mp4Args);

    console.log(`=== Generating poster: ${clip.poster} ===`);
    const jpgArgs = [
      '-y',
      '-ss', clip.ss,
      '-i', inputVideo,
      '-vframes', '1',
      '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2',
      '-q:v', '3',
      outJpg
    ];
    await runCmd(jpgArgs);
  }
  console.log('\nAll clips created successfully!');
}

processClips().catch(err => {
  console.error(err);
  process.exit(1);
});
