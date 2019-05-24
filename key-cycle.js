const robot = require("robotjs");

module.exports = class KeyCycle {
  constructor(...keys) {
    this.index = 0;
    this.keys = keys;
  }

  next() {
    this.index = (this.index + 1) % this.keys.length;
    this._pressKeyAtIndex();
  }

  prev() {
    this.index = this.index - 1;
    if (this.index === -1) {
      this.index = this.keys.length - 1;
    }
    this._pressKeyAtIndex();
  }

  _pressKeyAtIndex() {
    const key = this.keys[this.index];
    robot.keyTap(key);
  }
};
