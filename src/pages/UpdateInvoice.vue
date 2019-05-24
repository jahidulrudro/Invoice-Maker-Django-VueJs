<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="7" class="mx-auto">
        <b-card>
          <b-col>
            <b-form @submit.prevent="onSubmit">
              <h1>Update Invoice</h1>
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-user"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-select v-model="form.client" :options="client_options" required>
                  <template slot="first">
                    <option :value="null" disabled>Select your client</option>
                  </template>
                </b-form-select>
              </b-input-group>
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-menu"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  type="text"
                  class="form-control"
                  placeholder="Payment Terms"
                  required
                  v-model="form.payment_term"
                />
              </b-input-group>
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-grid"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input type="date" required v-model="form.date"/>
              </b-input-group>

              <p class="text-muted">
                <b-btn
                  variant="light"
                  class="mr-2 add-item-button"
                  @click="form.invoice_items.push({item: null, quantity: 1})"
                >
                  <i class="fa fa-plus"></i>
                </b-btn>Add Items
              </p>

              <div class="items-container mb-3">
                <b-input-group
                  class="mb-2"
                  v-for="(invoiceItem, index) in form.invoice_items"
                  :key="index"
                >
                  <b-input-group-prepend>
                    <b-btn
                      variant="light"
                      class="remove-item-button"
                      @click="removeInvoiceItem(index)"
                    >
                      <i class="fa fa-remove"></i>
                    </b-btn>
                  </b-input-group-prepend>
                  <b-form-select v-model="invoiceItem.item" :options="item_options" required></b-form-select>
                  <b-form-input
                    v-model="invoiceItem.quantity"
                    v-if="invoiceItem.item === null"
                    type="number"
                    required
                    disabled
                    placeholder="Quantity"
                  />
                  <b-form-input
                    v-model="invoiceItem.quantity"
                    v-else
                    type="number"
                    required
                    min="1"
                    placeholder="Quantity"
                  />
                </b-input-group>
              </div>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>Subtotal</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input :value="subtotal" readonly></b-form-input>
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text required type="number">Vat %</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input v-model="form.vat_percentage" min="0"></b-form-input>
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text type="number">Total Paid</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input required v-model="form.total_paid"></b-form-input>
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>Total Due</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input :value="total_due" readonly></b-form-input>
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>Total</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input :value="total" readonly></b-form-input>
              </b-input-group>

              <b-button type="submit" variant="success" block>Update Invoice</b-button>
            </b-form>
          </b-col>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    form: {
      invoice_items: [{ item: null, quantity: 1 }],
      date: "",
      vat_percentage: 0,
      total_paid: 0,
      payment_term: "",
      client: null
    }
  }),

  computed: {
    ...mapGetters({
      items: "itemStore/items",
      clients: "clientStore/clients"
    }),

    subtotal() {
      let sum = 0;
      this.form.invoice_items
        .filter(invoiceItem => invoiceItem.item !== null)
        .forEach(invoiceItem => {
          const item = this.items.find(i => i.id === invoiceItem.item);
          sum += parseFloat(item.price) * parseInt(invoiceItem.quantity);
        });
      return sum.toFixed(2);
    },

    total() {
      const subtotal = parseFloat(this.subtotal);
      let vat_percentage = 0;
      let vat_amount = 0;
      if (this.form.vat_percentage) {
        vat_percentage = parseFloat(this.form.vat_percentage) / 100;
        vat_amount = subtotal * vat_percentage;
      }
      return (subtotal + vat_amount).toFixed(2);
    },

    total_due() {
      let total_due = 0;
      if (this.form.total_paid)
        total_due = this.total - parseFloat(this.form.total_paid);
      else total_due = parseFloat(this.total);
      return total_due.toFixed(2);
    },

    item_options() {
      return this.items.map(item => ({
        value: item.id,
        text: `${item.name}(${item.model})`
      }));
    },

    client_options() {
      return this.clients.map(client => ({
        value: client.id,
        text: client.name
      }));
    }
  },

  created() {
    const id = this.$route.params.id;
    const invoice = this.$store.getters["invoiceStore/getInvoice"](id);
    this.$store.dispatch("itemStore/getItemsFromApi").then(() => {
      this.$store.dispatch("clientStore/getClientsFromApi").then(() => {
        this.form = {
          invoice_items: [...invoice.invoice_items],
          date: invoice.date,
          vat_percentage: invoice.vat_percentage,
          total_paid: invoice.total_paid,
          payment_term: invoice.payment_term,
          client: invoice.client
        };
      });
    });
  },

  methods: {
    onSubmit() {
      const {
        invoice_items,
        date,
        vat_percentage,
        total_paid,
        payment_term,
        client
      } = this.form;
      const { subtotal, total, total_due } = this;
      const filtered_invoice_items = invoice_items.filter(
        invoiceItem => invoiceItem.item !== null
      );
      const id = this.$route.params.id;
      if (
        filtered_invoice_items.length > 0 &&
        date &&
        vat_percentage !== "" &&
        total_paid !== "" &&
        payment_term &&
        client !== null
      ) {
        this.$store
          .dispatch("invoiceStore/updateInvoice", {
            formData: {
              invoice_items: [...filtered_invoice_items],
              date,
              subtotal,
              vat_percentage,
              total,
              total_paid,
              total_due,
              payment_term,
              client
            },
            id
          })
          .then(() => this.$router.push({ name: "Invoices" }))
          .catch(e => console.error(e));
      }
    },

    removeInvoiceItem(index) {
      this.form.invoice_items.splice(index, 1);
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
