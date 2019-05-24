<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col>
        <b-card>
          <b-col>
            <div class="print-only" id="invoice-view-container" v-if="client && items">
              <div class="d-flex align-items-start mb-4">
                <img :src="companyLogo" :alt="company.name" height="50" class="mr-2">
                <div class="d-inline-block">
                  <h1 class="h3 mb-0">{{ company.name }}</h1>
                  <p>
                    <a
                      :href="company.phone"
                      class="text-decoration-none text-muted"
                    >{{ company.phone }}</a>
                    |
                    <a
                      :href="'mailto:'+company.email"
                      class="text-decoration-none text-muted"
                    >{{ company.email }}</a>
                  </p>
                </div>
                <b-button-group class="align-self-start ml-auto d-print-none" size="sm">
                  <b-button variant="success" @click="printInvoice">Print</b-button>
                  <router-link
                    :to="{name:'UpdateInvoice', params:{id: invoice.id}}"
                    class="btn btn-primary"
                  >Edit</router-link>
                  <a :href="`/api/invoices/${invoice.id}/pdf`" class="btn btn-danger">PDF</a>
                </b-button-group>
              </div>

              <div class="bg-light p-3 mb-5">
                <div class="d-flex">
                  <div class="client-details">
                    <p class="lead mb-0">INVOICE TO:</p>
                    <p class="font-weight-bold mb-0">{{ client.name }}</p>
                    <p class="font-weight-light mb-0">
                      <a
                        :href="`tel:${client.phone}`"
                        class="text-dark text-decoration-none"
                      >{{client.phone}}</a>
                    </p>
                    <p class="font-weight-light mb-0">
                      <a
                        :href="`mailto:${client.email}`"
                        class="text-dark text-decoration-none"
                      >{{ client.email }}</a>
                    </p>
                  </div>
                  <div class="invoice-details ml-auto text-right">
                    <h3 class="mb-3">INVOICE #{{ invoice.id }}</h3>
                    <p class="font-weight-light">Date of Invoice: {{ invoiceDate }}</p>
                  </div>
                </div>
              </div>

              <div class="invoice-items-table mb-5">
                <b-table :items="invoiceItems"></b-table>
              </div>

              <div class="bg-light py-4 px-5">
                <div class="d-flex text-right justify-content-end">
                  <div class="px-5">
                    <p class="mb-1">Subtotal</p>
                    <p class="mb-1">Vat %</p>
                    <p class="mb-1">
                      <b>Total</b>
                    </p>
                    <p class="mb-1">Total Paid:</p>
                    <p class="mb-1">Total Due:</p>
                  </div>
                  <div class="px-5">
                    <p class="mb-1">{{ company.currency }} {{ invoice.subtotal }}</p>
                    <p class="mb-1">{{ invoice.vat_percentage }}</p>
                    <p class="mb-1">
                      <b>{{ company.currency }} {{ invoice.total }}</b>
                    </p>
                    <p class="mb-1">{{ company.currency }} {{ invoice.total_paid }}</p>
                    <p class="mb-1">{{ company.currency }} {{ invoice.total_due }}</p>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      items: "itemStore/items",
      company: "company"
    }),

    companyLogo() {
      const { company } = this;
      if (company !== null) {
        if (company.small_logo !== null) return company.small_logo;
        else if (company.logo !== null) return company.logo;
      }
      return "./static/img/logo-symbol.png";
    },

    invoice() {
      return this.$store.getters["invoiceStore/getInvoice"](
        this.$route.params.id
      );
    },

    invoiceDate() {
      if (!this.invoice) return null;
      const d = new Date(this.invoice.date);
      return d.toLocaleDateString();
    },

    invoiceItems() {
      if (!this.invoice || !this.items) return [];
      return this.invoice.invoice_items.map((invoiceItem, index) => {
        const item = this.items.find(item => item.id === invoiceItem.item);
        return {
          Serial: index + 1,
          Item: `${item.name}(${item.model})`,
          Quantity: invoiceItem.quantity,
          Price: `${this.company.currency} ${item.price}`
        };
      });
    },

    client() {
      return this.$store.getters["clientStore/getClient"](this.invoice.client);
    }
  },

  async created() {
    await this.$store.dispatch("itemStore/getItemsFromApi");
    await this.$store.dispatch("clientStore/getClientsFromApi");
  },

  methods: {
    printInvoice() {
      window.print();
      return true;
    }
  }
};
</script>

<style>
.add-item-button {
  border: 1px solid #e0e0e0;
  width: 40px;
  color: #9a9ba1;
}
.remove-item-button {
  color: #9a9ba1;
  border: 1px solid #e7e4ea;
}
</style>
