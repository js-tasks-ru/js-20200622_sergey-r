export default class NotificationMessage {
  static activeNotification;

  constructor(message, {
    duration = 2000,
    type = 'success',
  } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.removeActiveNotification();
    this.render();
  }

  get template() {
    return `<div class="notification ${this.type}" style="--value:${Math.round(this.duration / 100)}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header"> ${this.type}</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
    </div>`;
  }

  removeActiveNotification() {
    if (NotificationMessage.activeNotification) {
      NotificationMessage.activeNotification.remove();
    }
  }

  render() {
    const element = document.createElement('div')
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  show(elem = document.body) {
    elem.append(this.element);
    NotificationMessage.activeNotification = this;
    setTimeout(() => {
      this.destroy();
    },
    this.duration
    );
  }

  remove()
  {
    this.element.remove();
  }

  destroy()
  {
    this.remove();
    NotificationMessage.activeNotification = null;
  }
}
