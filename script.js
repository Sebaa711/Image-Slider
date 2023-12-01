let currentIndexCounter = 0;
var timer;

function createButtons(images, btnContainer) {
  for (let i = 0; i < images.length; i++) {
    const button = document.createElement("div");
    button.classList.add("slider-btn");
    button.setAttribute("data-index", i);

    if (i === 0) {
      button.toggleAttribute("selected");
      images[i].toggleAttribute("selected");
    }
    btnContainer.appendChild(button);
  }
}

function getSliderNumber(imagesLength, currentIndex, step) {
  if (step < 0 && currentIndex + step < 0) return imagesLength - 1;
  if (step > 0 && currentIndex + step >= imagesLength) return 0;
  return currentIndex + step;
}

function handleMove(previousIndex, newIndex, images, sliderBtns) {
  sliderBtns[previousIndex].toggleAttribute("selected");
  images[previousIndex].toggleAttribute("selected");

  sliderBtns[newIndex].toggleAttribute("selected");
  images[newIndex].toggleAttribute("selected");
  currentIndexCounter = newIndex;
  clearTimeout(timer);
  timer = setTimeout(timerHandler, 5000);
}

function timerHandler() {
  handleMove(
    currentIndexCounter,
    getSliderNumber(images.length, currentIndexCounter, +1),
    images,
    buttons
  );
}

const images = document.querySelectorAll(".img-container img");
createButtons(images, document.querySelector(".slider-buttons"));
const buttons = document.querySelectorAll(".slider-buttons .slider-btn");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleMove(
      currentIndexCounter,
      e.target.getAttribute("data-index"),
      images,
      buttons
    );
  });
});

const backButton = document.querySelector(".back");
backButton.addEventListener("click", () => {
  handleMove(
    currentIndexCounter,
    getSliderNumber(images.length, currentIndexCounter, -1),
    images,
    buttons
  );
});

const nextButton = document.querySelector(".next");
nextButton.addEventListener("click", () => {
  handleMove(
    currentIndexCounter,
    getSliderNumber(images.length, currentIndexCounter, 1),
    images,
    buttons
  );
});

timer = setTimeout(timerHandler, 5000);
