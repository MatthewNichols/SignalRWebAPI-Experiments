window.signalRService = (function() {

    var channelHub;

    function init() {
        //Set up SignalR 
        channelHub = $.connection.channelHub;

        //#region Wire up all the connection events to the Console.
        $.connection.hub.connectionSlow(function(e) {
            console.log("connectionSlow", e);
        });

        $.connection.hub.disconnected(function (e) {
            console.log("disconnect", e);
        });
        
        $.connection.hub.error(function (e) {
            console.log("error", e);
        });

        $.connection.hub.received(function (e) {
            console.log("received", e);
        });

        $.connection.hub.reconnected(function (e) {
            console.log("reconnect", e);
        });

        $.connection.hub.stateChanged(function (e) {
            console.log("stateChanged", e);
        });

        //#endregion

        //Called by server-side hub when a registered channel is called on the WebApi
        channelHub.client.receiveMessage = function(message) {
            utilities.log("recieveMessage " + message);
        };

        //Activate the Hub connection and open the UI when complete
        var signalRPromise = $.connection.hub.start();
        signalRPromise.done(function() {
            $('#appArea').fadeIn();
        });
    }

    function registerForChannel(ele, channelName) {
        var ele$ = $(ele);
        var elementData = ele$.data();
        if (!elementData.registered) {
            elementData.registered = true;
            ele$.addClass('registered');
            channelHub.server.registerForChannelNotifications(channelName);
        } else {
            elementData.registered = false;
            ele$.removeClass('registered');
            channelHub.server.unregisterForChannelNotifications(channelName);
        }
    }
    
    return {
        init: init,
        registerForChannel: registerForChannel
    }
}());