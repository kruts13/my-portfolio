
const getVideo = document.getElementById('video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('../models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
    faceapi.nets.faceExpressionNet.loadFromUri('../models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        mediaStream => getVideo.srcObject = mediaStream,
        err => console.error(err)
    )
}

getVideo.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(getVideo);

    document.body.append(canvas);
    const displaySize = {
        width: getVideo.width,
        height: getVideo.height
    };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
        const detections = await faceapi.detectSingleFace(getVideo,
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        new faceapi.draw.DrawFaceLandmarks(resizedDetections.landmarks, {
            drawLines: true, lineColor: 'yellow', lineWidth: 4,
            drawPoints: false, pointColor: 'yellow'
        }).draw(canvas);

        // Get positions of all contours
        const landmarks = detections.landmarks.positions;

        // Get the positions of individual contours,
        // only available for 68 point face ladnamrks (FaceLandmarks68)
        const jawOutline = detections.landmarks.getJawOutline();
        const mouth = detections.landmarks.getMouth();
        const leftEye = detections.landmarks.getLeftEye();
        const rightEye = detections.landmarks.getRightEye();
        const leftEyeBbrow = detections.landmarks.getLeftEyeBrow();
        const rightEyeBrow = detections.landmarks.getRightEyeBrow();
        const nose = detections.landmarks.getNose();
        // console.log(nose);
        var ctx = canvas.getContext("2d");
        let a = document.getElementById('green');

        for (let i = 0; i < nose.length; i++) {
            let x = nose[i].x;
            let y = nose[i].y;
            if (nose[i].x > 60 && nose[i].x < 160 && nose[i].y > 70 && nose[i].y < 200) {
                console.log('yellow');
                sounds.play('sound1');
            }
            if (nose[i].x > 450 && nose[i].x < 580 && nose[i].y > 50 && nose[i].y < 130) {
                console.log('blue');
                sounds.play('sound2');
            }
            if (nose[i].x > 60 && nose[i].x < 150 && nose[i].y > 300 && nose[i].y < 410) {
                console.log('green');
                sounds.play('sound3');
            }
            if (nose[i].x > 470 && nose[i].x < 530 && nose[i].y > 310 && nose[i].y < 410) {
                console.log('red');
                sounds.play('sound4');
            }
        }

        // faceapi.draw.drawFaceDescriptor(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        if (detections.expressions.happy > 0.7) {
            console.log('happy');
            sounds.play('happy');
        } else if (detections.expressions.neutral > 0.7) {
            console.log('neutral');
            sounds.play('neutral');
        } else if (detections.expressions.angry > 0.7) {
            console.log('angry');
            sounds.play('angry');
        } else if (detections.expressions.surprised > 0.7) {
            console.log('surprised');
            sounds.play('surprised');
        } else if (detections.expressions.sad > 0.7) {
            console.log('sad');
            sounds.play('sad');
        }
    }, 100)
});


let audioInfo = {
    "resources": [
        "sounds.webm",
        "sounds.mp3"
    ],
    "spritemap": {
        "angry": {
            "start": 0,
            "end": 0.9623356009070295,
            "loop": false
        },
        "sad": {
            "start": 2,
            "end": 3.4571655328798183,
            "loop": false
        },
        "happy": {
            "start": 5,
            "end": 6.3750113378684805,
            "loop": false
        },
        "neutral": {
            "start": 8,
            "end": 8.821950113378685,
            "loop": false
        },
        "sound1": {
            "start": 10,
            "end": 10.536303854875284,
            "loop": false
        },
        "sound2": {
            "start": 12,
            "end": 12.78047619047619,
            "loop": false
        },
        "sound3": {
            "start": 14,
            "end": 14.675034013605442,
            "loop": false
        },
        "sound4": {
            "start": 16,
            "end": 16.605804988662133,
            "loop": false
        },
        "surprised": {
            "start": 18,
            "end": 18.987142857142857,
            "loop": false
        }
    }
}

const spriteMap = {};
for (const sprite in audioInfo.spritemap) {
    spriteMap[sprite] = [
        (audioInfo.spritemap[sprite].start * 1000),
        ((audioInfo.spritemap[sprite].end - audioInfo.spritemap[sprite].start) * 1000),
        audioInfo.spritemap[sprite].loop
    ];
}

const sounds = new Howl(
    {
        src: [
            "./sounds/sounds.webm",
            "./sounds/sounds.mp3"
        ],
        sprite: spriteMap,
        html5: true,
        volume: 1.0
    }
);

// sounds.play('angry');

const greenDiv = document.querySelector('#green');
greenDiv.addEventListener('click', () => {
    console.log(event.target.dataset.sound);
    let soundToPlay = event.target.dataset.sound;
    sounds.play(soundToPlay);
});