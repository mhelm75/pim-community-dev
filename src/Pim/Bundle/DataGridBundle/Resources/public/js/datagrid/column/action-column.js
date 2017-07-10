/* global define */
import _ from 'underscore';
import Backgrid from 'backgrid';
import ActionCell from 'oro/datagrid/action-cell';
    

    /**
     * Column of grid that contains row actions
     *
     * @export  oro/datagrid/action-column
     * @class   oro.datagrid.ActionColumn
     * @extends Backgrid.Column
     */
    export default Backgrid.Column.extend({

        /** @property {Object} */
        defaults: _.extend({}, Backgrid.Column.prototype.defaults, {
            name: '',
            label: '',
            editable: false,
            cell: ActionCell,
            headerCell: Backgrid.HeaderCell.extend({
                className: 'AknGrid-headerCell action-column'
            }),
            sortable: false,
            actions: []
        }),

        /**
         * {@inheritDoc}
         */
        initialize: function (attrs) {
            attrs = attrs || {};
            if (!attrs.cell) {
                attrs.cell = this.defaults.cell;
            }
            if (!attrs.name) {
                attrs.name = this.defaults.name;
            }
            if (!attrs.actions || _.isEmpty(attrs.actions)) {
                this.set('renderable', false);
            }
            Backgrid.Column.prototype.initialize.apply(this, arguments);
        }
    });

