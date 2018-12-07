// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron');

let mainWindow;
const template = [
    {
        label: 'Reload',
        click() {
            mainWindow.reload();
        }
    },
    {
        label: 'Console',
        role: 'toggleDevTools'
    }
];

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 1266, height: 629});

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});
