<template>
  <AppHeaderDropdown right>
    <template slot="header">
      <i class="icon-user"></i>
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center">
        <strong>Data</strong>
      </b-dropdown-header>
      <b-dropdown-item :to="{ name: 'Invoices' }">
        <i class="icon-speech"/> Invoices
        <b-badge variant="secondary">{{ invoicesCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item :to="{ name: 'Clients' }">
        <i class="icon-people"/> Clients
        <b-badge variant="secondary">{{ clientsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item :to="{ name: 'Items' }">
        <i class="icon-present"/> Items
        <b-badge variant="secondary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-header tag="div" class="text-center">
        <strong>Settings</strong>
      </b-dropdown-header>
      <b-dropdown-item :to="{ name: 'Users'}">
        <i class="icon-user"/> Users
      </b-dropdown-item>
      <b-dropdown-item :to="{ name: 'UpdateCompany' }">
        <i class="icon-wrench"/> Settings
      </b-dropdown-item>
      <b-dropdown-item @click.prevent="logout">
        <i class="icon-lock"/> Logout
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
import { mapGetters } from "vuex";

export default {
  name: "DefaultHeaderDropdownAccnt",
  components: {
    AppHeaderDropdown
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.push({ name: "login" }));
    }
  },
  computed: {
    ...mapGetters(["itemsCount", "invoicesCount", "clientsCount"])
  }
};
</script>
