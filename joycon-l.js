const EventEmitter = require("events");
const HID = require("node-hid");
const onExit = require("on-exit");

const Directions = {
  RIGHT: 0x00,
  DOWN_RIGHT: 0x01,
  DOWN: 0x02,
  DOWN_LEFT: 0x03,
  LEFT: 0x04,
  UP_LEFT: 0x05,
  NONE: 0x08,
  UP: 0x06,
  UP_RIGHT: 0x07,
};

class JoyConL extends EventEmitter {
  constructor() {
    super();

    this.buttons = {
      dpadUp: false,
      dpadDown: false,
      dpadLeft: false,
      dpadRight: false,
      minus: false,
      screenshot: false,
      sl: false,
      sr: false,
      l: false,
      zl: false,
      analogStickPress: false,
      analogStick: Directions.NONE,
    };

    const devices = HID.devices();
    let path;
    for (let device of devices) {
      if (device.product === "Joy-Con (L)") {
        path = device.path;
        break;
      }
    }

    if (path == null) {
      throw new Error(
        "It appears no left JoyCon is connected to your computer. Check your bluetooth settings and try again."
      );
    }

    this.device = new HID.HID(path);

    onExit(() => {
      this.device.close();
    });

    this.device.on("data", (bytes) => {
      this.handleData(bytes);
    });
  }

  // emit(...args) {
  //   console.log(...args);
  //   super.emit(...args);
  // }

  handleData(bytes) {
    const nextButtons = {
      dpadLeft: Boolean(bytes[1] & 0x01),
      dpadDown: Boolean(bytes[1] & 0x02),
      dpadUp: Boolean(bytes[1] & 0x04),
      dpadRight: Boolean(bytes[1] & 0x08),

      minus: Boolean(bytes[2] & 0x01),
      screenshot: Boolean(bytes[2] & 0x20),

      sl: Boolean(bytes[1] & 0x10),
      sr: Boolean(bytes[1] & 0x20),

      l: Boolean(bytes[2] & 0x40),
      zl: Boolean(bytes[2] & 0x80),

      analogStickPress: Boolean(bytes[2] & 0x04),
      analogStick: bytes[3],
    };

    Object.entries(nextButtons).forEach(([name, nextValue]) => {
      const currentValue = this.buttons[name];
      if (currentValue === false && nextValue === true) {
        this.emit(`down:${name}`);
      } else if (currentValue === true && nextValue === false) {
        this.emit(`up:${name}`);
      }

      if (currentValue !== nextValue) {
        this.emit(`change:${name}`, nextValue);
      }
    });

    this.buttons = nextButtons;
    this.emit("change");
  }
}

JoyConL.Directions = Directions;

module.exports = JoyConL;
