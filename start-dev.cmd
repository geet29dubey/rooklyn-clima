@echo off
setlocal
cd /d "%~dp0"

rem Prefer the existing Windows runtime used to build this project.
set "ROOKLYN_NODE_DIR=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin"
if exist "%ROOKLYN_NODE_DIR%\node.exe" set "PATH=%ROOKLYN_NODE_DIR%;%PATH%"

node -e "const [major,minor]=process.versions.node.split('.').map(Number); if(major<20||(major===20&&minor<9)){console.error('Node 20.9 or newer is required. Install Node 24 for Windows.');process.exit(1)} console.log('Using Node '+process.version)"
if errorlevel 1 goto failed
if not exist "node_modules\next\dist\bin\next" (
  echo Dependencies are missing. Run pnpm install from this folder with Windows Node 24.
  goto failed
)

node node_modules\next\dist\bin\next dev --hostname 127.0.0.1
if errorlevel 1 goto failed
exit /b 0

:failed
echo.
echo The development server could not start. See the message above.
pause
exit /b 1
