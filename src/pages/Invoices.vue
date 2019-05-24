<template>
  <div class="animated fadeIn">
    <b-card>
      <b-row class="mb-4">
        <b-col>
          <h3>Invoices List</h3>
        </b-col>
        <b-col sm="4">
          <router-link :to="{name: 'CreateInvoice'}">
            <b-btn variant="success" class="float-right align-middle" size="sm">Create Invoice</b-btn>
          </router-link>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col>
          <downloadCSV :data="rows" class="mr-2 d-inline-block">
            <b-btn size="sm" variant="primary">CSV</b-btn>
          </downloadCSV>
          <downloadExcel :data="rows" class="mr-2 d-inline-block">
            <b-btn size="sm" variant="primary">Excel</b-btn>
          </downloadExcel>
          <a href="/api/invoices/pdf" target="_blank">
            <b-btn size="sm" variant="primary">PDF</b-btn>
          </a>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <vue-good-table
            :columns="columns"
            :rows="rows"
            :search-options="{
              enabled: true
            }"
            :pagination-options="{
              enabled: true,
              dropdownAllowAll: false
            }"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'total'">{{company.currency}} {{props.row.total}}</span>
              <span
                v-else-if="props.column.field === 'total_due'"
              >{{company.currency}} {{props.row.total_due}}</span>
              <span
                v-else-if="props.column.field === 'total_paid'"
              >{{company.currency}} {{props.row.total_paid}}</span>
              <span v-else-if="props.column.field === 'status'" class="text-center">
                <span
                  v-if="parseFloat(props.row.total_due) <= 0"
                  class="badge badge-success badge-pill"
                >Paid</span>
                <span v-else class="badge badge-warning badge-pill">Unpaid</span>
              </span>
              <span v-else-if="props.column.field == 'after'">
                <span>
                  <router-link :to="{name:'ViewInvoice', params:{id: props.row.id}}">
                    <b-button variant="outline-info" size="sm" class="mr-2 mb-1">
                      <i class="fa fa-eye icons"></i>
                    </b-button>
                  </router-link>
                  <a :href="`/api/invoices/${props.row.id}/pdf`" target="_blank">
                    <b-button variant="outline-success" size="sm" class="mr-2 mb-1">
                      <i class="icon-book-open"></i>
                    </b-button>
                  </a>
                  <router-link :to="{name:'UpdateInvoice', params:{id: props.row.id}}">
                    <b-button variant="outline-primary" size="sm" class="mr-2 mb-1">
                      <i class="cui-pencil icons"></i>
                    </b-button>
                  </router-link>
                  <b-button
                    variant="outline-danger"
                    size="sm"
                    class="mb-1"
                    v-b-modal.confirmDelete
                    @click="selected_id = props.row.id"
                  >
                    <i class="cui-trash icons"></i>
                  </b-button>
                </span>
              </span>
              <span v-else>{{props.formattedRow[props.column.field]}}</span>
            </template>
          </vue-good-table>
        </b-col>
      </b-row>
    </b-card>
    <b-modal
      id="confirmDelete"
      :hide-header="true"
      :lazy="true"
      centered
      class="text-center"
      ok-title="Delete"
      ok-variant="danger"
      @ok="onDelete(selected_id)"
    >
      <h2>
        <i class="icon-close fa-4x text-danger"></i>
      </h2>
      <p class="mt-3">
        <b>Are you sure?</b>
      </p>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    columns: [
      {
        label: "ID",
        field: "id",
        width: "50px",
        thClass: "text-center",
        tdClass: "text-center",
        type: "number"
      },
      {
        label: "Status",
        field: "status",
        width: "60px",
        sortable: false,
        globalSearchDisabled: true,
        thClass: "text-center",
        tdClass: "text-center"
      },
      { label: "Date", field: "date", width: "100px" },
      { label: "Subtotal", field: "subtotal" },
      {
        label: "VAT %",
        field: "vat_percentage",
        thClass: "text-center",
        tdClass: "text-center"
      },
      {
        label: "Total",
        field: "total",
        thClass: "text-right",
        tdClass: "text-right"
      },
      {
        label: "Total Paid",
        field: "total_paid",
        thClass: "text-right",
        tdClass: "text-right"
      },
      {
        label: "Total Due",
        field: "total_due",
        thClass: "text-right",
        tdClass: "text-right"
      },
      { label: "", field: "after", sortable: false, globalSearchDisabled: true }
    ],
    page_num: 1,
    per_page: 10,
    selected_id: null
  }),

  computed: {
    ...mapGetters({
      rows: "invoiceStore/invoices",
      company: "company"
    })
  },

  methods: {
    onDelete(id) {
      this.$store
        .dispatch("invoiceStore/removeInvoice", id)
        .then(() => {})
        .catch(e => console.log(e));
    }
  },

  created() {
    this.$store
      .dispatch("invoiceStore/getInvoicesFromApi")
      .then(msg => console.log(msg))
      .catch(e => console.log(e));
  }
};
</script>
