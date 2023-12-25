const circleAPI = {
  intervalID: null,
  CIRCUMFERENCE: Math.PI * 80 * 2.5,

  circleComponent: document.querySelector('.circle-fill'),
  circleSvg: document.querySelector('.circle-svg'),

  updateProgress(percent) {
    const dashOffset = this.CIRCUMFERENCE - (percent / 100) * this.CIRCUMFERENCE;

    this.circleComponent.style.strokeDasharray = `${this.CIRCUMFERENCE}, 1000`;
    this.circleComponent.style.strokeDashoffset = dashOffset;
  },

  startAnimation() {
    this.intervalID = setInterval(() => {
      let currentValue = parseInt(progressValue.value, 10) || 0;

      if (currentValue + 1 > 100) {
        this.stopAnimation();
        animateToggle.checked = false;

        return;
      }

      currentValue += 1;
      this.updateProgress(currentValue);
      progressValue.value = currentValue;
    }, 1000); 
  },

  stopAnimation() {
    clearInterval(this.intervalID);
  },

  hide() {
    this.circleSvg.style.display = 'none';

    progressValue.classList.add('disabled')
    progressValue.disabled = true;

    animateToggle.checked = false;
    animateToggle.parentNode.classList.add('disabled')
    animateToggle.disabled = true;

    this.stopAnimation();
  },

  show() {
    progressValue.classList.remove('disabled')
    progressValue.disabled = false;

    animateToggle.checked = false;
    animateToggle.parentNode.classList.remove('disabled')
    animateToggle.disabled = false;

    this.circleSvg.style.display = 'block';
  },
};

function handleInput(e) {
  const value = e.target.value;
  
  progressValue.value = value.replace(/^0+/, '').replace(/\D/g, '').replace(/^$/, '0');

  if (parseInt(progressValue.value) > 100) {
    progressValue.value = '100';
  }

  circleAPI.updateProgress(progressValue.value);
}

function handleAnimate(e) {
  const isActive = e.target.checked;

  if (isActive) {
    circleAPI.startAnimation();
  } else {
    circleAPI.stopAnimation();
  }
}

function handleVisible(e) {
  const isActive = e.target.checked;

  if (isActive) {
    circleAPI.hide();
  } else {
    circleAPI.show();
  }
}

const progressValue = document.querySelector('.progress-value');
const animateToggle = document.querySelector('.switch-animate');
const hideToggle = document.querySelector('.switch-visible');

progressValue.addEventListener('input', handleInput);
animateToggle.addEventListener('change', handleAnimate);
hideToggle.addEventListener('change', handleVisible);
