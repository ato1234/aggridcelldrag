import Vue from 'vue'
import "../node_modules/ag-grid/dist/styles/ag-grid.css";
import "../node_modules/ag-grid/dist/styles/ag-theme-balham.css";

import agdragcelldrag from './agdragcelldrag.vue'

var vm = new Vue({
    el: "#main",
    components: {
        'agdragcelldrag': agdragcelldrag
    },
})