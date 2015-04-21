/**
 * Renders a given modal template after a specific DOM node, appends an event handler to remove modal on close and triggers the modal-show method.
 *
 * @param {Blaze.Template} modalTemplate - modal template to render (according to format)
 * @param {String} modalID - CSS selector of modal to trigger
 * @param {DOM Node} instance - DOM node to render modal into
 */
toggleModal = function toogleModal(modalTemplate, modalID, instance) {
    var modal = Blaze.render(modalTemplate, instance);
    $(modalID).on('hide.bs.modal', function (e) {
            Blaze.remove(modal);
    });
    $(modalID).modal('show');
};
