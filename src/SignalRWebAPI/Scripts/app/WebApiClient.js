window.webApiClient = (function ()
{
    function callChannel(channel, message) {
        console.log("callChannel(channel)", channel, message);

        $.ajax({
            url: "/api/channel",
            type: "POST",
            data: { name: channel, message: message }
        });

    }

    return {
        callChannelA: function() { callChannel("A", "Q"); },
        callChannelB: function() { callChannel("B", "R"); },
        callChannelC: function() { callChannel("C", "S"); }
    }
    
})();   