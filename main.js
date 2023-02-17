let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayScale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let myImg = document.getElementById("img");
let reset = document.getElementById("reset");
let imgBox = document.querySelector(".img-box");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

function resetValue() {
  context.filter = "none";
  context.drawImage(myImg, 0, 0, canvas.width, canvas.height);
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayScale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";
}
reset.onclick = resetValue;

window.onload = function () {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};
upload.onchange = function () {
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    myImg.src = file.result;
  };
  myImg.onload = function () {
    canvas.width = myImg.width;
    canvas.height = myImg.height;
    context.drawImage(myImg, 0, 0, canvas.width, canvas.height);
    myImg.style.display = "none";
  };
};

let filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
  filter.addEventListener("input", function () {
    context.filter = `
      saturate(${saturate.value}%)
      contrast(${contrast.value}%)
      brightness(${brightness.value}%)
      sepia(${sepia.value}%)
      grayscale(${grayScale.value})
      blur(${blur.value}px)
      hue-rotate(${hueRotate.value}deg)
    `;
    context.drawImage(myImg, 0, 0, canvas.width, canvas.height);
  });
});

download.onclick = function () {
  download.href = canvas.toDataURL("image/jpeg");
};
