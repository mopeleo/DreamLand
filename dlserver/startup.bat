@echo off
title DreamLand Server

set SRC_BASE=%~dp0
set SERVER_DIR=%SRC_BASE%

echo ======DreamLand Server======================
start "DreamLand Server" /D %SERVER_DIR% /B node server.js

pause