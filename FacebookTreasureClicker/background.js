var currentUrl = "";

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({scanFreq: 5}, function() {});
    
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {urlMatches: 'www\.facebook\.com/.*/videos/.*'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
    
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    
});