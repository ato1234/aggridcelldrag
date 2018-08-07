<template>
    <ag-grid-vue style="width: 500px; height: 500px;"
        class="ag-theme-balham"
        :enable-col-resize="false"
        :column-defs="columnDefs"
        :row-data="rowData"
        :grid-ready="onGridReady"
        :process-row-post-create="onProcessRowPostCreate">
    </ag-grid-vue>
</template>

<script>
import {AgGridVue} from "ag-grid-vue";

export default {
    name: 'App',
    data() {
        return {
            // ag-GridのAPI
            gridApi: null,
            // 列定義
            columnDefs: null,
            // データ
            rowData: null,
            // ドラッグ開始位置
            dragStartPosition: null
        }
    },
    components: {
        AgGridVue
    },
    beforeMount() {
        // 列とデータの初期化
        this.columnDefs = [
            {headerName: 'Make', field: 'make'},
            {headerName: 'Model', field: 'model'},
            {headerName: 'Price', field: 'price'}
        ];
        this.rowData = [
            {make: 'Toyota', model: 'Celica', price: 35000},
            {make: 'Ford', model: 'Mondeo', price: 32000},
            {make: 'Porsche', model: 'Boxter', price: 72000}
        ];
    },
    methods: {
        onGridReady(params) {
            // ag-Gridへデータをセット
            this.gridApi = params.api;
            this.columnApi = params.columnApi;
        },
        onProcessRowPostCreate(params) {
            // ドラッグイベントを全てのセルへセット
            Array.prototype.forEach.call(params.eRow.children, item => {
                item.draggable=true
                item.ondragstart=this.onDragStart
                item.ondragover=this.onDragOver
                item.ondrop=this.onDrop
            });
        },
        onDragStart(event) {
            // ドラッグ開始イベント
            // ドラッグが開始されたHTMLエレメントから行IDと列IDを取得する
            var colId = event.target.getAttribute('col-id')
            var rowId = event.target.parentElement.getAttribute('row-id')

            // セルが空の場合はドラッグさせない
            if (!this.rowData[rowId][colId]) {
                event.preventDefault()
            }

            // ドラッグ開始位置を保持しておく
            this.dragStartPosition = {row: rowId, col: colId}
        },
        onDragOver(event) {
            // 別の要素へドラッグされたイベント
            // ドラッグを許可する
            event.preventDefault()
        },
        onDrop(event) {
            // ドラッグ可能エリアへドロップされたイベント
            // ドロップ位置の行IDと列IDを取得する
            var colId = event.target.getAttribute('col-id')
            var rowId = event.target.parentElement.getAttribute('row-id')

            // ドラッグ開始位置を取得する
            var from = this.dragStartPosition

            // データを入れ替える
            var tmp = this.rowData[rowId][colId]
            this.rowData[rowId][colId] = this.rowData[from.row][from.col]
            this.rowData[from.row][from.col] = tmp

            // 表示を更新する
            this.gridApi.refreshCells({})
        },
    }
}
</script>