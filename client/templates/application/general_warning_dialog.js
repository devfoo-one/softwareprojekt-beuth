showWarning = function(header, message, okCallback, buttonLabels) {
    var dialog = $('#generalWarningPopup');

    buttonLabels = buttonLabels || {};
    var okLabel = buttonLabels.ok || "OK";
    var cancelLabel = buttonLabels.cancel || "Cancel";

    dialog.find('#warningHeader').html(header);
    dialog.find('#warningMessage').html(message);

    dialog.find('#warningOKButton').html(okLabel);
    dialog.find('#warningOKButton').click(function(e) {
        okCallback();
        dialog.modal('hide');
    });
    dialog.find('#warningCancelButton').html(cancelLabel);
    dialog.find('#warningCancelButton').click(function(e) {
        dialog.modal('hide');
    });
    dialog.modal('show');
}
