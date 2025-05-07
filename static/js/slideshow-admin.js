function start() {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  const sliderImageContainer = document.getElementById('slider-image')
  sliderImageContainer.style.maxHeight = `${windowHeight.toString()}px`
  sliderImageContainer.style.maxWidth = `${windowWidth.toString()}px`

  const rotator = sliderImageContainer;

  const delayInSeconds = 1;

  const images = ['p1.jpg', 'p2.jpg', 'p3.jpg'];
  rotator.classList.toggle('fade-in');
  let num = 0;

  changeImage(rotator, num, images)



  // setInterval(changeImage, delayInSeconds * 3000);
};

function changeImage(rotator, num, images) {
  const imageDir = '/img/slider-test/';
  const len = images.length;

  rotator.src = imageDir + images[num++];
  if (num == len) {
    num = 0;
  }


  setTimeout(() => {
    // rotator.classList.remove('fade-in')
    // rotator.classList.add('fade-in');
    changeImage(rotator, num, images)

  }, 3000);
};

window.onload = function () {
  start();
}