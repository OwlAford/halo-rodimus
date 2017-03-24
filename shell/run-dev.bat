@echo off
cd ../
set currentPath=%cd%
echo The current directory is: %currentPath%
echo [NODE_ENV=development]
npm run dev