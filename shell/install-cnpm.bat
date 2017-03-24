@echo off
set currentPath=%cd%
echo The current directory is: %currentPath%
echo Installing cnpm ...
npm install -g cnpm --registry=https://registry.npm.taobao.org