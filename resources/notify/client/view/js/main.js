window.addEventListener('load', () => {
  alt.emit('notify:loaded');
})

const container = document.querySelector('.container');
const template = document.querySelector('.notification');
class Notification {
  constructor({
    text = '',
    timeout = 5000,
    textColor = '#000000',
    backgroundColor = 'rgba(236,236,255,0.85)',
    lineColor = '#6c7ae0'
  }) {
    const clone = template.cloneNode(true);
    clone.hidden = false;
    clone.style.backgroundColor = backgroundColor;
    clone.style.color = textColor;
    this.line = clone.querySelector('.notification__line');
    this.line.style.backgroundColor = lineColor;
    const content = clone.querySelector('.notification__text');
    content.innerHTML = text.toString();
    container.append(clone);
    this.element = clone;
    this.timeout = timeout;
    setTimeout(() => this.show(), 100);
  }
  show() {
    this.element.classList.add('show');
    this.line.style.animationName = 'lineout';
    this.line.style.animationDuration = this.timeout + 'ms';
    setTimeout(() => this.hide(), this.timeout);
  }
  hide() {
    this.element.classList.add('hide');
    this.line.style.width = '0%';
    setTimeout(() => this.element.remove(), 500);
  }
};

alt.on('notify:send', (options) => {
  new Notification(options);
})