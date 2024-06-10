[Setup]
AppName=Instone
AppVersion=1.0
DefaultDirName={autopf}\Instone
OutputBaseFilename=InstoneAppSetup
OutputDir=output
ArchitecturesInstallIn64BitMode=x64

[Files]
Source: "C:\Users\Cameron Black\Documents\cse110-sp24-group3\application\dist\application-win32-x64\*"; DestDir: "{app}"; Flags: recursesubdirs; Excludes: "C:\Users\Cameron Black\Documents\cse110-sp24-group3\dist\application-win32-x64\resources\app\*";

[Icons]
Name: "{group}\Instone"; Filename: "{app}\instone.exe"
Name: "{userdesktop}\Instone"; Filename: "{app}\instone.exe"