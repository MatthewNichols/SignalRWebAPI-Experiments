window.utilities = (function () {

    var output$ = $("#output");

    function log(message) {
        var currentText = output$.text();
        output$.text(currentText + message + '\n');
    }

    return {
        log: log
    }
}());