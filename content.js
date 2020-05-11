var d = document.domain;
console.log(location.host)
chrome.runtime.sendMessage({
    page: location.host.split(".").slice(-2).join(".")
});



chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
    }
);