"use strict";
/*
 * THIS IS HEAVILY INSPIRED FROM CMATRIX
 * */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let ORIGINAL_STYLE = false;
let LINE_WIDTH = 20;
let LINE_LENGTH;
let CHARCTER_HEIGHT = 30;
// Array to hold the whole matrix
let matrixArray = [];
const asciiCharacters = "abcdefghijklmnopqrstuvwxyz1234567890*$#><{}";
class Character {
    x;
    isTail;
    y = 0;
    color;
    value = asciiCharacters[Math.floor(Math.random() * asciiCharacters.length)];
    yspeed = Math.max(1, Math.random() * 5);
    draw(context) {
        if (this.isTail) {
            context.fillStyle = "#c2c2c2";
        }
        else {
            context.fillStyle = this.color || "green";
        }
        context.font = "15px monospace";
        context.fillText(this.value, this.x, this.y);
    }
    update() {
        this.y += this.yspeed;
    }
}
function generateMatrix() {
    let array = [];
    for (let j = 0; j < canvas.width; j += LINE_WIDTH) {
        let tempArray = [];
        for (let k = 0; k <= LINE_LENGTH; k += CHARCTER_HEIGHT) {
            const newChar = new Character();
            newChar.x = j;
            newChar.color = localStorage.getItem("color") || "green";
            newChar.y += tempArray[0]
                ? tempArray[0].y + k
                : Math.floor(Math.random() * 100) + k;
            // finall character should be white but it looks weird IDK
            newChar.isTail =
                k + CHARCTER_HEIGHT > Math.round(LINE_LENGTH) ? true : false;
            tempArray.push(newChar);
        }
        array.push(tempArray);
    }
    return array;
}
function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    LINE_LENGTH = canvas.height / 1.15;
    matrixArray = generateMatrix();
}
function draw() {
    matrixArray.forEach((charArray) => {
        charArray.forEach((char) => {
            char.draw(ctx);
        });
    });
}
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(update);
    matrixArray.forEach((charArray) => {
        charArray.forEach((char) => {
            char.draw(ctx);
            if (char.y > canvas.height) {
                char.y = 0;
                char.value =
                    asciiCharacters[Math.floor(Math.random() * asciiCharacters.length)];
            }
            char.update();
        });
    });
}
function main() {
    init();
    draw();
    window.requestAnimationFrame(update);
}
addEventListener("resize", () => {
    init();
});
main();
//# sourceMappingURL=app.js.map