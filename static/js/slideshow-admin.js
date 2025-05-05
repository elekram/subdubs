function start() {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  const sliderImageContainer = document.getElementById('slider-image')
  sliderImageContainer.style.maxHeight = `${windowHeight.toString()}px`
  sliderImageContainer.style.maxWidth = `${windowWidth.toString()}px`

  const rotator = sliderImageContainer;
  const imageDir = '/img/slider-test/';
  const delayInSeconds = 1;

  const images = ['p1.jpg', 'p2.jpg', 'p3.jpg'];

  let num = 0;
  const changeImage = function () {
    const len = images.length;
    rotator.src = imageDir + images[num++];
    if (num == len) {
      num = 0;
    }
  };
  setInterval(changeImage, delayInSeconds * 3000);
};
window.onload = function () {
  start();
}