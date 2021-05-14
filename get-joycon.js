const { listConnectedJoyCons } = require("switch-joy-con");
const onExit = require("on-exit");
const sleep = require("./sleep");

module.exports = function getJoycon() {
  const joycons = listConnectedJoyCons().map((joycon) => joycon.open());
  console.log("Joycons:", joycons);

  let joyconL = null;
  for (const joycon of joycons) {
    if (joycon.side === "left" && !joyconL) {
      joyconL = joycon;
    } else {
      joycon.close();
    }
  }

  if (!joyconL) {
    throw new Error("No connected left Joy-Con");
  }

  process.on("SIGINT", function() {
    process.exit(0);
  });

  if (process.platform === "win32") {
    const rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("SIGINT", function() {
      process.emit("SIGINT");
    });
  }

  sleep(200).then(() => {
    joyconL.setPlayerLEDs(joyconL.LED_VALUES.ONE);
  });

  onExit(() => {
    joyconL.setPlayerLEDs(
      joyconL.LED_VALUES.ONE_FLASH +
        joyconL.LED_VALUES.TWO_FLASH +
        joyconL.LED_VALUES.THREE_FLASH +
        joyconL.LED_VALUES.FOUR_FLASH
    );
    joyconL.close();
  });

  return joyconL;
};
