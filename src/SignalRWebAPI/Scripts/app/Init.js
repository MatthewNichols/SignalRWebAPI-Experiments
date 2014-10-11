$(function () {

    //Set up SignalR 
    var channelHub = $.connection.channelHub;

    //Called by server-side hub when a registered channel is called on the WebApi
    channelHub.client.receiveMessage = function (message) {
        console.log("recieveMessage", message);
    };

    //Activate the Hub connection and open the UI when complete
    var signalRPromise = $.connection.hub.start();
    signalRPromise.done(function() {
        $('#appArea').fadeIn();
    });

    //#region Wire up calls that send messages to the WebApi
    $('#callChannelA').click(function() {
        webApiClient.callChannelA();
    });

    $('#callChannelB').click(function () {
        webApiClient.callChannelB();
    });

    $('#callChannelC').click(function () {
        webApiClient.callChannelC();
    });

    //#endregion
    
    //#region Wire up the Register Channel links requesting to be notified when the WebApi is called

    $('#registerChannelA').click(function () {
        registerForChannel(this, "A");
    });

    $('#registerChannelB').click(function () {
        registerForChannel(this, "B");
    });

    $('#registerChannelC').click(function () {
        registerForChannel(this, "C");
    });

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

    //#endregion
});