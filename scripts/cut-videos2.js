const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const ffmpegPath = path.resolve('node_modules/ffmpeg-static/ffmpeg.exe');
const inputVideo2 = 'D:\\Telegram Desktop\\VN20261117_102837.mp4';
const outputDir = path.resolve('public/videos');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 2 new high-value clips from 4K video:
// 1. roll-label-vorey.mp4: Vorey VD3350 roll-to-roll die-cutting & label finishing line (~10s: 00:00:12 - 00:00:22)
// 2. konica-digital.mp4: Konica Minolta digital printing & sheet feeder output (~10s: 00:00:02 - 00:00:12)
// 3. hero-ambient.mp4: SWEI casemaker + Horizon + Vorey smooth ambient loop for Hero sections (~16s)

const clips = [
  {
    name: 'roll-label-vorey.mp4',
    poster: 'roll-label-vorey-poster.jpg',
    ss: '00:00:12',
    t: '10',
  },
  {
    name: 'konica-digital.mp4',
    poster: 'konica-digital-poster.jpg',
    ss: '00:00:02',
    t: '10',
  },
  {
    name: 'hero-ambient.mp4',
    poster: 'hero-ambient-poster.jpg',
    ss: '00:00:13',
    t: '8',
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
    const mp4Args = [
      '-y',
      '-ss', clip.ss,
      '-i', inputVideo2,
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
      '-i', inputVideo2,
      '-vframes', '1',
      '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2',
      '-q:v', '3',
      outJpg
    ];
    await runCmd(jpgArgs);
  }
  console.log('\nAll new clips created successfully!');
}

processClips().catch(err => {
  console.error(err);
  process.exit(1);
});
