/* 
This background script is executed when the extension is installed.
This is WalkingStick.
Final Project for CS50x by Sourjya Sarkar.
*/

chrome.runtime.onInstalled.addListener(function () {
    window.open("startup/startup.html");
});