@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo           Starting Vibe-Trading AI Agent
echo ===================================================

cd /d "%~dp0"

:: Check if .venv exists
if not exist ".venv\Scripts\activate.bat" (
    echo [.venv not found. Creating virtual environment...]
    python -m venv .venv
    call .venv\Scripts\activate.bat
    pip install -r agent\requirements.txt
) else (
    call .venv\Scripts\activate.bat
)

set PYTHONPATH=%CD%\agent

:: Launch backend in a separate window
echo [Starting Backend on http://127.0.0.1:8899...]
start "Vibe-Trading Backend" /min cmd /k "call .venv\Scripts\activate.bat && set PYTHONPATH=%CD%\agent && python agent\api_server.py"

:: Launch frontend
echo [Starting Frontend on http://127.0.0.1:5899...]
cd frontend
if not exist "node_modules" (
    echo [Installing npm dependencies...]
    call npm install
)

start "Vibe-Trading Frontend" cmd /k "npm run dev -- --host 127.0.0.1 --port 5899"

:: Open browser
timeout /t 3 /nobreak >nul
start http://127.0.0.1:5899

echo ===================================================
echo   Vibe-Trading is running at http://127.0.0.1:5899
echo ===================================================
