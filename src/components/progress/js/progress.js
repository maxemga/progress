class ProgressComponent {
  constructor(selector) {
    this.progressBlock = document.querySelector(selector);
    this.circumference = 314; // Длина дуги
  }

  setProgress(value) {
    const offset = this.circumference - (value / 100) * this.circumference;
    this.progressBlocsk.style.strokeDashoffset = offset;
  }

  animateProgress() {
    this.progressBlock.style.animation = 'rotate 2s linear infinite';
  }

  stopAnimation() {
    this.progressBlock.style.animation = 'none';
  }

  hide() {
    this.progressBlock.style.display = 'none';
  }

  show() {
    this.progressBlock.style.display = 'block';
  }
}