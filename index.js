const JoyConL = require("./joycon-l");
const KeyCycle = require("./key-cycle");
const robot = require("robotjs");
const execSync = require("child_process").execSync;

function osascript(script) {
  execSync(`osascript -e '${script}'`);
}

const joyconL = new JoyConL();
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
  robot.keyToggle("space", "down");
});
joyconL.on("up:dpadDown", () => {
  robot.keyToggle("space", "up");
});

// Hold dpad up for rotate tool
joyconL.on("down:dpadUp", async () => {
  osascript(`
    tell application "System Events" to key down shift
  `);
  robot.keyToggle("space", "down");
});
joyconL.on("up:dpadUp", async () => {
  robot.keyToggle("space", "up");
  osascript(`
    tell application "System Events" to key up shift
  `);
});

// Hold L for picker tool
joyconL.on("down:l", () => {
  osascript(`
    tell application "System Events" to key down option
  `);
});
joyconL.on("up:l", () => {
  osascript(`
    tell application "System Events" to key up option
  `);
});

// minus for command+tab
joyconL.on("down:minus", () => {
  robot.keyTap("tab", "command");
});

// zl for undo
joyconL.on("down:zl", () => {
  robot.keyTap("z", "command");
});

// sl for redo
joyconL.on("down:sl", () => {
  robot.keyTap("y", "command");
});

// sr for save
joyconL.on("down:sr", () => {
  robot.keyTap("s", "command");
});

// Analog up/down for zoom
joyconL.on("change:analogStick", (value) => {
  if (value === JoyConL.Directions.UP) {
    robot.keyTap("=", "command");
  } else if (value === JoyConL.Directions.DOWN) {
    robot.keyTap("-", "command");
  }
});

// Press analog stick to reset zoom (and rotate, if you bind reset rotate to F12)
joyconL.on("down:analogStickPress", () => {
  robot.keyTap("0", ["command", "alt"]);
  robot.keyTap("f12");
});
