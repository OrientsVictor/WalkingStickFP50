console.log("background running.")

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab)
{
	chrome.tabs.sendMessage(tab.id, "hello");
}