This script binds keys on a Nintendo Switch Left Joy-Con controller to keys and keystrokes that are useful while using Clip Studio Paint.

It works on both Mac and Windows.

You are welcome to clone and edit it to use for whatever you like (MIT License).

Bindings:

- Dpad Left/Right: Scroll through Pen, Pencil, Brush, and Eraser
- Dpad Up: Hold for rotate tool
- Dpad Down: Hold for hand tool
- L: Hold for eyedropper tool
- ZL: Undo
- SL: Redo
- SR: Save
- Analog Up/Down: Increase/Decrease Zoom
- Analog Left/Right: Switch through open applications
- Analog Stick Press: Reset Zoom and Press F12 (I recommend you bind F12 to "reset rotate/invert" via File -> Shortcut Key Settings)

## Instructions

### Setup

These steps you only need to do once.

- [Download](https://github.com/suchipi/clip-studio-paint-joycon/archive/master.zip) this repo and extract it somewhere.
- Install [`fnm`](https://github.com/Schniz/fnm).
- Open a Terminal and `cd` to the folder where you extracted this repo.
- Run `fnm use` in the Terminal and say yes when it asks you if you want to install Node 12.
- Run `npm install`.

### Running it

Now, do these steps whenever you want to use the script.

- Connect a left joy-con via bluetooth by pressing the pairing button located on the joy-con rail and finding the joy-con in system preferences.
  - On my computer, I have to remove it, close system preferences, re-open system preferences, and add it.
- Open a Terminal and `cd` to the folder where you extracted the repo.
- Run `npm start`.
- The LEDs on the joy-con rail should stop flashing and instead have the player 1 led lit up.
- Press buttons on the joy-con; the terminal window will log what it sees and what it's doing.

When you are done with the script, focus the Terminal window and press Ctrl+C to stop the script. Then you can close the Terminal window.

### Troubleshooting

If it says no left joy-con is connected, make sure you are using a left joy-con. If you want to use a right joy-con instead, you will need to edit the code in `index.js`.

I've only used it with first-party joycons so I don't know if it will work with third-party ones. I don't know if there even _are_ any third-party joycons that support bluetooth.

### Customizing

You can customize the keybinds by editing the code in `index.js`.
