<template>
  <div class="animated fadeIn">
    <b-card>
      <b-row class="mb-4">
        <b-col>
          <h3>Items List</h3>
        </b-col>
        <b-col sm="4">
          <router-link :to="{name: 'CreateItem'}">
            <b-btn variant="success" class="float-right align-middle" size="sm">Create Item</b-btn>
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
          <a href="/api/items/pdf" target="_blank">
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
              <span v-if="props.column.field === 'stock'">
                <div class="w-100 text-center">
                  <template v-if="props.row.stock === null"></template>
                  <template v-else>{{ props.row.stock }}</template>
                </div>
              </span>
              <span
                v-else-if="props.column.field === 'price'"
              >{{ company.currency }} {{ props.row.price }}</span>
              <span v-else-if="props.column.field === 'after'">
                <span>
                  <router-link :to="{name: 'UpdateItem', params: {id: props.row.id}}">
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
      { label: "Name", field: "name" },
      { label: "Model", field: "model" },
      { label: "Serial #", field: "serial_number" },
      { label: "Stock", field: "stock", thClass: "text-center" },
      {
        label: "Price",
        field: "price",
        type: "decimal",
        globalSearchDisabled: true
      },
      {
        label: "",
        field: "after",
        globalSearchDisabled: true,
        sortable: false
      }
    ],
    page_num: 1,
    per_page: 10,
    selected_id: null
  }),

  methods: {
    onDelete(id) {
      this.$store
        .dispatch("itemStore/removeItem", id)
        .then(() => {})
        .catch(e => console.log(e));
    }
  },

  computed: {
    ...mapGetters({
      rows: "itemStore/items",
      company: "company"
    })
  },

  created() {
    this.$store
      .dispatch("itemStore/getItemsFromApi")
      .then(msg => console.log(msg))
      .catch(e => console.log(e));
  }
};
</script>
