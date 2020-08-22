var interval_id;
var treasure_clicked;

function init(){
    chrome.storage.sync.set({status: "ok"}, function() {
        console.log("[FacebookTreasureClicker] FacebookTreasureClicker Start Success");
    });
    chrome.storage.sync.set({treasure: []}, function() {});
    chrome.storage.sync.get(['scanFreq'], function(items) {
        console.log("[FacebookTreasureClicker] Scan period : "+items.scanFreq+" second"+((items.scanFreq!=1)?"s":""));
        scanRun(items.scanFreq);
    });
    treasure_clicked = false;
}

function scanRun(freq)
{
    interval_id = setInterval(function(){
        checkTreasureExist();
        checkLivePaused();
    },freq*1000);
}

function checkTreasureExist(){
    var click_btn = document.getElementsByClassName("oajrlxb2 s1i5eluu gcieejh5 bn081pho humdl8nn izx4hr6d rq0escxv nhd2j8a9 j83agx80 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys d1544ag0 qt6c0cv9 tw6a2znq i1ao9s8h esuyzwwr f1sip0of lzcic4wl l9j0dhe7 abiwlrkh p8dawk7l beltcj47 p86d2i9g aot14ch1 kzx2olss cbu4d94t taijpn5t ni8dbmo4 stjgntxs k4urcfbm qypqp5cg");
    var close_btn = document.getElementsByClassName("oajrlxb2 s1i5eluu gcieejh5 bn081pho humdl8nn izx4hr6d rq0escxv nhd2j8a9 j83agx80 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys d1544ag0 qt6c0cv9 tw6a2znq i1ao9s8h esuyzwwr f1sip0of lzcic4wl l9j0dhe7 abiwlrkh p8dawk7l beltcj47 p86d2i9g aot14ch1 kzx2olss cbu4d94t taijpn5t ni8dbmo4 stjgntxs k4urcfbm qypqp5cg");
    
    var prize_tag = document.getElementsByClassName("oi732d6d ik7dh3pa d2edcug0 qv66sw1b c1et5uql a8c37x1j s89635nw ew0dbk1b a5q79mjw g1cxx5fr ekzkrbhg oo9gr5id hzawbc8m");
    
    if(click_btn.length > 0 && !treasure_clicked)
    {
        click_btn[0].click();
        console.log("[FacebookTreasureClicker] Treasure Clicked");
        treasure_clicked = true;
    }
    else if(close_btn.length > 0 && treasure_clicked)
    {
        var time = getClickTime();
        var prize_str = (typeof prize_tag == "undefined")?"":prize_tag[0].innerHTML;
        getTreasure(time, prize_str);
        
        close_btn[0].click();
        console.log("[FacebookTreasureClicker] Treasure Panel Closed");
        treasure_clicked = false;
    }
}

function checkLivePaused()
{
    var pause_btn_hide = document.getElementsByClassName("_1jto _bsl _4ubd _3htz hidden_elem");
    var pause_btn = document.getElementsByClassName("_1jto _bsl _4ubd _3htz");
    
    if(pause_btn_hide.length == 0 && pause_btn.length > 0)
    {
        pause_btn[0].click();
        //console.log('Pause clicked');
    }
}

function getClickTime()
{
    var d = new Date();
    return addZero(d.getHours()) + ":" + addZero(d.getMinutes()) + ":" + addZero(d.getSeconds());
}

function addZero(i) {
    if(i < 10) i = "0" + i;
    return i;
}

function getTreasure(time, prize)
{
    chrome.storage.sync.get(['treasure'], function(items) {
        var treasure_array = items.treasure;
        treasure_array.push({'time': time, 'prize': prize});
        chrome.storage.sync.set({treasure: treasure_array}, function() {});
    });
    
}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

    if(msg.action == 'getStatus')
    {
        chrome.storage.sync.get(['status'], function(items) {
            if(items.status == "ok") chrome.runtime.sendMessage({action: "setStatusOK"});
        });
    }
    else if(msg.action == 'getTreasure')
    {
        chrome.storage.sync.get(['treasure'], function(items) {
            chrome.runtime.sendMessage({action: "showTreasure", data: items.treasure});
        });
    }
    else if(msg.action == 'newPage')
    {
        init();
    }
});

window.addEventListener('DOMContentLoaded', function () {
    init();
});
