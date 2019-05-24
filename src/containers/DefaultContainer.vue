<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile/>
      <b-link class="navbar-brand" to="/">
        <img class="navbar-brand-full" :src="companyLogo" height="40" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" :src="companySymbol" height="40" alt="Invoisu Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg"/>
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item class="px-3" to="/clients">Clients</b-nav-item>
        <b-nav-item class="px-3" to="/items">Items</b-nav-item>
        <b-nav-item class="px-3" to="/invoices">Invoices</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
      <!-- <AsideToggler class="d-none d-lg-block"/> -->
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb class="d-print-none" :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <TheFooter class="d-print-none">
      <!--footer-->
      <div>
        <a href="https://synchronisebd.com/">Synchronise IT</a>
        <span class="ml-1">&copy; 2018</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="https://coreui.io">CoreUI Vue</a>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import nav from "@/_nav";
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  AsideToggler,
  Footer as TheFooter,
  Breadcrumb
} from "@coreui/vue";
import DefaultAside from "./DefaultAside";
import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";

export default {
  name: "DefaultContainer",
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data() {
    return {
      nav: nav.items
    };
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    },
    companyLogo() {
      const { company } = this.$store.state;
      if (company !== null && company.logo !== null) {
        return company.logo;
      }
      return "./static/img/logo.png";
    },
    companySymbol() {
      const { company } = this.$store.state;
      if (company !== null && company.small_logo !== null) {
        return company.small_logo;
      }
      return "./static/img/logo-symbol.png";
    }
  }
};
</script>

<style>
@media print {
  .main {
    padding: 0;
  }
  .card {
    width: 100%;
    border-radius: 0;
    border: none;
    box-shadow: none;
    padding: 0;
  }
  #invoice-view-container {
    width: 100%;
  }
  #invoice-view-container .bg-light {
    background-color: #f0f3f5 !important;
  }
  #invoice-view-container table {
    border: none;
  }
}
</style>
