const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

function createWindow() {
    app.whenReady().then(() => {
        const primaryDisplay = screen.getPrimaryDisplay();
        const { width, height } = primaryDisplay.workAreaSize;
        const mainWindow = new BrowserWindow({
            width: width / 2,
            height: height / 2,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                sandbox: false,
                nodeIntegration: false, // for security reasons
                contextIsolation: true,  // for security reasons
                enableRemoteModule: false // for security reasons
            },
            resizable: true
        });

        mainWindow.loadFile(path.join(__dirname, 'web/index.html'));
        if (process.env.NODE_ENV === 'development')
            mainWindow.webContents.openDevTools();
    });
}
app.whenReady().then(createWindow);

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
