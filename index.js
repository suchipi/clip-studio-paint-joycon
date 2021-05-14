const getJoycon = require("./get-joycon");
const KeyCycle = require("./key-cycle");
const keyboard = require("./keyboard");
const sleep = require("./sleep");

const joyconL = getJoycon();
console.log("Connected to Joy-Con");

const isWindows = process.platform === "win32";

// dpadUp
// dpadDown
// dpadLeft
// dpadRight
// minus
// screenshot
// sl
// sr
// l
// zl
// analogStickPress
// analogStick

const tools = new KeyCycle(
  "p", // Pencil
  "p", // Pen
  "b", // Brush
  "e" // Eraser
);

// Cycle through tools with dpad left/right
joyconL.on("down:dpadLeft", () => {
  tools.prev();
});
joyconL.on("down:dpadRight", () => {
  tools.next();
});

// Hold dpad down for hand tool
joyconL.on("down:dpadDown", () => {
  keyboard.down("space");
});
joyconL.on("up:dpadDown", () => {
  keyboard.up("space");
});

// Hold dpad up for rotate tool
joyconL.on("down:dpadUp", async () => {
  keyboard.down("shift");
  keyboard.down("space");
});
joyconL.on("up:dpadUp", async () => {
  keyboard.up("space");
  keyboard.up("shift");
});

// Hold L for picker tool
joyconL.on("down:l", () => {
  if (isWindows) {
    keyboard.down("alt");
  } else {
    keyboard.down("option");
  }
});
joyconL.on("up:l", () => {
  if (isWindows) {
    keyboard.up("alt");
  } else {
    keyboard.up("option");
  }
});

// minus for command+tab
joyconL.on("down:minus", () => {
  if (isWindows) {
    keyboard.tap("tab", "alt");
  } else {
    keyboard.tap("tab", "command");
  }
});

// zl for undo
joyconL.on("down:zl", () => {
  if (isWindows) {
    keyboard.tap("z", "control");
  } else {
    keyboard.tap("z", "command");
  }
});

// sl for redo
joyconL.on("down:sl", () => {
  if (isWindows) {
    keyboard.tap("y", "control");
  } else {
    keyboard.tap("y", "command");
  }
});

// sr for save
joyconL.on("down:sr", () => {
  if (isWindows) {
    keyboard.tap("s", "control");
  } else {
    keyboard.tap("s", "command");
  }
});

// Analog up/down for zoom
joyconL.on("change:analogStick", async (value) => {
  switch (value) {
    case joyconL.Directions.UP: {
      if (isWindows) {
        keyboard.tap("=", "control");
      } else {
        keyboard.tap("=", "command");
      }
      break;
    }
    case joyconL.Directions.DOWN: {
      if (isWindows) {
        keyboard.tap("-", "control");
      } else {
        keyboard.tap("-", "command");
      }
      break;
    }
    case joyconL.Directions.RIGHT: {
      if (isWindows) {
        keyboard.tap("tab", "alt");
      } else {
        keyboard.tap("tab", "command");
        await sleep(50);
        keyboard.tap("enter");
      }
      break;
    }
    case joyconL.Directions.LEFT: {
      if (isWindows) {
        keyboard.tap("tab", "alt");
      } else {
        keyboard.tap("tab", ["command", "shift"]);
        await sleep(50);
        keyboard.tap("enter");
      }
      break;
    }
  }
});

// Press analog stick to reset zoom (and rotate, if you bind reset rotate to F12)
joyconL.on("down:analogStickPress", () => {
  if (isWindows) {
    keyboard.tap("0", ["control", "alt"]);
  } else {
    keyboard.tap("0", ["command", "alt"]);
  }
  keyboard.tap("f12");
});
