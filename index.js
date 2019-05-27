const { listConnectedJoyCons } = require("switch-joy-con");
const onExit = require("on-exit");
const KeyCycle = require("./key-cycle");
const keyboard = require("./keyboard");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const joycons = listConnectedJoyCons();
const leftJoycons = joycons.filter((device) => device.product.match("(L)"));
if (leftJoycons.length === 0) {
  throw new Error("No connected left Joy-Con");
}

const joyconL = leftJoycons[0].open();
onExit(() => {
  joyconL.close();
});

joyconL.setPlayerLEDs(joyconL.LED_VALUES.ONE);
console.log("Connected to Joy-Con");

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
  keyboard.down("option");
});
joyconL.on("up:l", () => {
  keyboard.up("option");
});

// minus for command+tab
joyconL.on("down:minus", () => {
  keyboard.tap("tab", "command");
});

// zl for undo
joyconL.on("down:zl", () => {
  keyboard.tap("z", "command");
});

// sl for redo
joyconL.on("down:sl", () => {
  keyboard.tap("y", "command");
});

// sr for save
joyconL.on("down:sr", () => {
  keyboard.tap("s", "command");
});

// Analog up/down for zoom
joyconL.on("change:analogStick", async (value) => {
  switch (value) {
    case joyconL.Directions.UP: {
      keyboard.tap("=", "command");
      break;
    }
    case joyconL.Directions.DOWN: {
      keyboard.tap("-", "command");
      break;
    }
    case joyconL.Directions.RIGHT: {
      keyboard.tap("tab", "command");
      await sleep(100);
      keyboard.tap("enter");
    }
    case joyconL.Directions.LEFT: {
      keyboard.tap("tab", ["shift", "command"]);
      await sleep(100);
      keyboard.tap("enter");
    }
  }
});

// Press analog stick to reset zoom (and rotate, if you bind reset rotate to F12)
joyconL.on("down:analogStickPress", () => {
  keyboard.tap("0", ["command", "alt"]);
  keyboard.tap("f12");
});
