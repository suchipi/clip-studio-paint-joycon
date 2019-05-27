const robot = require("robotjs");
const execSync = require("child_process").execSync;

function osascript(script) {
  execSync(`osascript -e '${script.trim()}'`);
}

module.exports = {
  down(key, modifiers) {
    console.log(
      `Key down ${key}${
        modifiers && modifiers.length > 0 ? ` (with: ${modifiers})` : ""
      }`
    );
    if (
      (key === "command" ||
        key === "shift" ||
        key === "option" ||
        key === "control") &&
      process.platform === "darwin"
    ) {
      osascript(`
        tell application "System Events" to key down ${key}
      `);
    } else {
      if (modifiers) {
        robot.keyToggle(key, "down", modifiers);
      } else {
        robot.keyToggle(key, "down");
      }
    }
  },
  up(key, modifiers) {
    console.log(
      `Key up ${key}${
        modifiers && modifiers.length > 0 ? ` (with: ${modifiers})` : ""
      }`
    );
    if (
      (key === "command" ||
        key === "shift" ||
        key === "option" ||
        key === "control") &&
      process.platform === "darwin"
    ) {
      osascript(`
        tell application "System Events" to key up ${key}
      `);
    } else {
      if (modifiers) {
        robot.keyToggle(key, "up", modifiers);
      } else {
        robot.keyToggle(key, "up");
      }
    }
  },
  tap(key, modifiers) {
    console.log(
      `Key tap ${key}${
        modifiers && modifiers.length > 0 ? ` (with: ${modifiers})` : ""
      }`
    );
    if (modifiers) {
      robot.keyTap(key, modifiers);
    } else {
      robot.keyTap(key);
    }
  },
};
