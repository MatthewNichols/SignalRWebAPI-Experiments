$(function () {

    signalRService.init();
    
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
        signalRService.registerForChannel(this, "A");
    });

    $('#registerChannelB').click(function () {
        signalRService.registerForChannel(this, "B");
    });

    $('#registerChannelC').click(function () {
        signalRService.registerForChannel(this, "C");
    });

    //#endregion
});