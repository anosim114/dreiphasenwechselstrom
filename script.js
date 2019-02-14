const BALLS = 25;
const BALLSIZE = 13;
const SPACING = 35;
const FPS = 60;
const multiplierBias = 7;

const rgbRED = [233, 30, 99];
const rgbYELLOW = [255, 235, 59]; // e8d71e
const redStep = (rgbYELLOW[0] - rgbRED[0]) / BALLS;
const greenStep = (rgbYELLOW[1] - rgbRED[1]) / BALLS;
const blueStep = (rgbYELLOW[2] - rgbRED[2]) / BALLS;

const ballarr = [];

function setup() {
    let canvas = createCanvas(1800, 300);
    canvas.parent('canvas-wrapper');
    frameRate(FPS);

    for (let i = 0; i < BALLS; i++) {
        let a = PI;
        let R = 75;
        let m = .005 * (i + multiplierBias);
        ballarr[i] = {
            R: R,
            a: a,
            y: R * Math.sin(a),
            multiplier: m
        };
    }
}

function draw() {
    translate(0, height / 2);
    clear();
    background(45);
    for (let i = 0; i < BALLS; i++) {
        const nextColor = `rgb(
      ${Math.floor(rgbRED[0] + (redStep * i))},
      ${Math.floor(rgbRED[1] + (greenStep * i))},
      ${Math.floor(rgbRED[2] + (blueStep * i))})`;
        fill(nextColor);
        stroke(nextColor);

        let x = SPACING + (i * SPACING);
        let y = ballarr[i].y;

        if (i < BALLS - 3) {
            let nextX = SPACING + ((i + 3) * SPACING);
            let nextY = ballarr[i + 3].y;

            line(x, y, nextX, nextY);
        }
        ellipse(x, y, BALLSIZE, BALLSIZE);

    }

    for (let i = 0; i < BALLS; i++) {
        ballarr[i].a += ballarr[i].multiplier;
        ballarr[i].y = ballarr[i].R * Math.sin(ballarr[i].a);
    }
}

document.getElementById('multiplier').onchange = e => {
    const newMultiplier = e.target.value;

    for (let i = 0; i < BALLS; i++) {
        ballarr[i].multiplier = (newMultiplier * .0005) * (i + multiplierBias);
    }

};