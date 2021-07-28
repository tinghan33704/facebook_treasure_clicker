var currentUrl = "";

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set(
        {
            scanFreq: 5,
            defaultClickBtnClass: "rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw taijpn5t bp9cbjyn owycx6da btwxx1t3 kt9q3ron ak7q8e6j isp2s0ed ri5dt5u2 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 d1544ag0 tw6a2znq s1i5eluu qypqp5cg", 
            defaultCloseBtnClass: "rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw taijpn5t bp9cbjyn owycx6da btwxx1t3 kt9q3ron ak7q8e6j isp2s0ed ri5dt5u2 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 d1544ag0 tw6a2znq s1i5eluu qypqp5cg",
            clickBtnClass: "",
            closeBtnClass: ""
        }, 
        function() {}
    );
    
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