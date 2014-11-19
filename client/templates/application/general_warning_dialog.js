showWarning = function(header, message, okCallback) {
    var dialog = $('#generalWarningPopup');

    dialog.find('#warningHeader').html(header);
    dialog.find('#warningMessage').html(message);
    dialog.find('#warningOKButton').click(function(e) {
        okCallback();
        dialog.modal('hide');
    });
    dialog.find('#warningCancelButton').click(function(e) {
        dialog.modal('hide');
    });
    dialog.modal('show');
}
