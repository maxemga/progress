const circleSvg = document.querySelector('.circle-svg');
const circleComponent = document.querySelector('.circle-fill');
const progressValue = document.querySelector('.progress-value');
const animateToggle = document.querySelector('.switch-animate');
const hideToggle = document.querySelector('.switch-visible');

progressValue.addEventListener('input', handleInput);
animateToggle.addEventListener('change', handleAnimate);
hideToggle.addEventListener('change', handleVisible);

function updateProgress(percent) {
  const CIRCUMFERENCE = Math.PI * 80 * 2.5;

  const dashOffset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  circleComponent.style.strokeDasharray = `${CIRCUMFERENCE}, 1000`;
  circleComponent.style.strokeDashoffset = dashOffset;
}

let intervalID = null;

function startAnimation() {
  const updateProgressWithAnimation = setInterval(() => {
    const currentValue = parseInt(progressValue.value, 10) || 0;
    const isInvalidValue = currentValue + 1 > 100;

    if (isInvalidValue) {
      stopAnimation();

      return;
    }

    progressValue.value = currentValue + 1;

    updateProgress(progressValue.value);
  }, 1000);

  return updateProgressWithAnimation;
}

function stopAnimation() {
  animateToggle.checked = false;

  clearInterval(intervalID);
}

function hideCircle() {
  circleSvg.style.display = 'none';

  stopAnimation();

  toggleState();
}

function showCircle() {
  circleSvg.style.display = 'block';

  toggleState();
}

function toggleState() {
  progressValue.classList.toggle('disabled');
  progressValue.disabled = !progressValue.disabled;

  animateToggle.checked = false;
  animateToggle.parentNode.classList.toggle('disabled');
  animateToggle.disabled = !animateToggle.disabled;
}

function handleInput(e) {
  const value = e.target.value;

  progressValue.value = value.replace(/^0+/, '').replace(/\D/g, '').replace(/^$/, '0');

  if (parseInt(progressValue.value) > 100) {
    progressValue.value = '100';
  }

  updateProgress(progressValue.value);
}

function handleAnimate(e) {
  const isActive = e.target.checked;

  if (isActive) {
    intervalID = startAnimation();

    return;
  }

  stopAnimation();
}

function handleVisible(e) {
  const isActive = e.target.checked;

  if (isActive) {
    hideCircle();
    
    return;
  } 

  showCircle();
}