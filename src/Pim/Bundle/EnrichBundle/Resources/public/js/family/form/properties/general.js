

/**
 * Extension used for family properties tab general tab section
 *
 * @author    Alexandr Jeliuc <alex@jeliuc.com>
 * @copyright 2017 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
import _ from 'underscore';
import __ from 'oro/translator';
import BaseForm from 'pim/form';
import FetcherRegistry from 'pim/fetcher-registry';
import propertyAccessor from 'pim/common/property';
import template from 'pim/template/form/tab/section';
import LoadingMask from 'oro/loading-mask';
import 'jquery.select2';
export default BaseForm.extend({
    className: 'tabsection',
    template: _.template(template),
    errors: [],

            /**
             * {@inheritdoc}
             */
    initialize: function (config) {
        this.config = config.config;

        BaseForm.prototype.initialize.apply(this, arguments);
    },

            /**
             * {@inheritdoc}
             */
    configure: function () {

        return BaseForm.prototype.configure.apply(this, arguments);
    },

            /**
             * {@inheritdoc}
             */
    render: function () {
        this.$el.html(this.template({
            sectionTitle: __(this.config.label),
            dropZone: this.config.dropZone
        }));

        this.renderExtensions();
    },

            /**
             * Get the validation errors for the given field
             *
             * @param {string} field
             *
             * @return {mixed}
             */
    getValidationErrorsForField: function (field) {
        return propertyAccessor
                    .accessProperty(
                        this.errors,
                        field,
                        []
                    );
    },

            /**
             * Sets errors
             *
             * @param {Object} errors
             */
    setValidationErrors: function (errors) {
        this.errors = errors.response;
    },

            /**
             * Resets validation errors
             */
    resetValidationErrors: function () {
        this.errors = {};
        this.render();
    },

            /**
             * Shows the loading mask
             */
    showLoadingMask: function () {
        this.loadingMask = new LoadingMask();
        this.loadingMask.render().$el.appendTo(this.getRoot().$el).show();
    },

            /**
             * Hides the loading mask
             */
    hideLoadingMask: function () {
        this.loadingMask.hide().$el.remove();
    }
});


