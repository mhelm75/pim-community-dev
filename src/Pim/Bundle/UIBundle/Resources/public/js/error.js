import _ from 'underscore';
import Backbone from 'backbone';
import routing from 'routing';
import app from 'oro/app';
import Modal from 'oro/modal';


var defaults = {
    header: 'Server error',
    message: 'Error! Incorrect server response.',
    forbiddenAccess: 'You don\'t have the permission to open this page'
};

    /**
     * @export oro/error
     * @name oro.error
     */
var error = {
    dispatch: function (model, xhr, options) {
        var self = error.dispatch;
        self.init(model, xhr, _.extend({}, defaults, options));
    }
};
var sync = Backbone.sync;

    // Override default Backbone.sync
Backbone.sync = function (method, model, options) {
    options = options || {};
    if (!_.has(options, 'error')) {
        options.error = error.dispatch;
    }

    sync.call(Backbone, method, model, options);
};

_.extend(error.dispatch, {
        /**
         * Error dispatch
         *
         * @param {Object} model
         * @param {Object} xhr
         * @param {Object} options
         */
    init: function (model, xhr, options) {
        if (xhr.status === 401) {
            this._processRedirect();
        } else if (xhr.readyState === 4) {
            if (xhr.status === 403) {
                options.message = options.forbiddenAccess;
            }
            this._processModal(xhr, options);
        }
    },

        /**
         * Shows modal window
         * @param {Object} xhr
         * @param {Object} options
         * @private
         */
    _processModal: function (xhr, options) {
        var modal;
        var message = options.message;
        if (app.debug) {
            message += '<br><b>Debug:</b>' + xhr.responseText;
        }

        modal = new Modal({
            title: options.header,
            content: message,
            cancelText: false
        });

        modal.open();
    },

        /**
         * Redirects to login
         * @private
         */
    _processRedirect: function () {
        document.location.href = routing.generate('oro_user_security_login');
    }
});

export default error;

