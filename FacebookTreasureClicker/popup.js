
$(document).ready(function (){
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {action: "getStatus"});
        chrome.tabs.sendMessage(activeTab.id, {action: "getTreasure"});
    });
});


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if(msg.action == 'setStatusOK')
    {
        $(".container-fluid").css({"border": "4px solid #1EA362"});
        $(".status").css({"backgroundColor": "#1EA362"});
        $(".status").html("<i class=\"fa fa-check-circle\"></i> 啟用中");
    }
    else if(msg.action == 'showTreasure')
    {
        if(msg.data.length > 0)
        {
            var treasure_str = '';
            
            treasure_str += '<hr>';
            for(let i=0; i<msg.data.length; i++)
            {
                treasure_str += '<div class="row">';
                treasure_str += '   <div class="col-xs-12 treasure"><font style="color: #1EA362;"><i class="fa fa-gift"></i></font>&nbsp;&nbsp;<font style="color: blue;">'+msg.data[i]['time']+'</font> 獲得 <font style="color: red; font-weight: bold;">'+msg.data[i]['prize']+'</font></div>';
                treasure_str += '</div>';
                treasure_str += '<hr>';
            }
            $(".treasure").html(treasure_str);
        }
    }
    return true;
});