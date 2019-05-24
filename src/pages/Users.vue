<template>
  <div class="animated fadeIn">
    <b-card>
      <b-row class="mb-4">
        <b-col>
          <h3>Users List</h3>
        </b-col>
        <b-col sm="4">
          <router-link :to="{name: 'CreateUser'}">
            <b-btn variant="success" class="float-right align-middle" size="sm">Create User</b-btn>
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
          <a href="/api/users/pdf" target="_blank">
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
              <span v-if="props.column.field == 'after'">
                <span>
                  <router-link :to="{name:'UpdateUser', params:{username: props.row.username}}">
                    <b-button variant="outline-primary" size="sm" class="mr-2 mb-1">
                      <i class="cui-pencil icons"></i>
                    </b-button>
                  </router-link>
                  <b-button
                    variant="outline-danger"
                    size="sm"
                    class="mb-1"
                    v-b-modal.confirmDelete
                    @click="selected_username = props.row.username"
                  >
                    <i class="cui-trash icons"></i>
                  </b-button>
                </span>
              </span>
              <span v-else-if="props.column.field == 'is_active'">
                <b-badge variant="success" v-if="props.formattedRow[props.column.field]">Active</b-badge>
                <b-badge variant="danger" v-else>Inactive</b-badge>
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
      @ok="onDelete(selected_username)"
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
      { label: "First Name", field: "first_name" },
      { label: "Last Name", field: "last_name" },
      { label: "Email", field: "email" },
      { label: "Username", field: "username" },
      {
        label: "Status",
        field: "is_active",
        tdClass: "text-center",
        thClass: "text-center",
        globalSearchDisabled: true
      },
      { label: "", field: "after", sortable: false, globalSearchDisabled: true }
    ],
    page_num: 1,
    per_page: 10,
    selected_id: null
  }),

  methods: {
    onDelete(username) {
      this.$store
        .dispatch("userStore/removeUser", username)
        .then(() => {})
        .catch(e => console.log(e));
    }
  },

  computed: {
    ...mapGetters({
      rows: "userStore/users"
    })
  },

  created() {
    this.$store
      .dispatch("userStore/getUsersFromApi")
      .then(msg => console.log(msg))
      .catch(e => console.log(e));
  }
};
</script>
