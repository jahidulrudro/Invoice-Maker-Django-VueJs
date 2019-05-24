<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3">
        <b-card :no-body="true" footer-class="px-3 py-2">
          <b-card-body class="p-3 clearfix">
            <i class="icon-user bg-primary p-3 font-2xl mr-3 float-left"></i>
            <div class="h5 text-primary mb-0 mt-2">{{usersCount}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Users</div>
          </b-card-body>
          <div slot="footer">
            <b-link class="font-weight-bold font-xs btn-block text-muted" to="/users">
              View More
              <i class="fa fa-angle-right float-right font-lg"></i>
            </b-link>
          </div>
        </b-card>
      </b-col>

      <b-col sm="6" lg="3">
        <b-card :no-body="true" footer-class="px-3 py-2">
          <b-card-body class="p-3 clearfix">
            <i class="icon-people bg-info p-3 font-2xl mr-3 float-left"></i>
            <div class="h5 text-primary mb-0 mt-2">{{clientsCount}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Clients</div>
          </b-card-body>
          <div slot="footer">
            <b-link class="font-weight-bold font-xs btn-block text-muted" to="/clients">
              View More
              <i class="fa fa-angle-right float-right font-lg"></i>
            </b-link>
          </div>
        </b-card>
      </b-col>

      <b-col sm="6" lg="3">
        <b-card :no-body="true" footer-class="px-3 py-2">
          <b-card-body class="p-3 clearfix">
            <i class="icon-present bg-purple p-3 font-2xl mr-3 float-left text-white"></i>
            <div class="h5 text-purple mb-0 mt-2">{{itemsCount}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Items</div>
          </b-card-body>
          <div slot="footer">
            <b-link class="font-weight-bold font-xs btn-block text-muted" to="/items">
              View More
              <i class="fa fa-angle-right float-right font-lg"></i>
            </b-link>
          </div>
        </b-card>
      </b-col>

      <b-col sm="6" lg="3">
        <b-card :no-body="true" footer-class="px-3 py-2">
          <b-card-body class="p-3 clearfix">
            <i class="icon-speech bg-teal p-3 font-2xl mr-3 float-left text-white"></i>
            <div class="h5 text-purple mb-0 mt-2">{{invoicesCount}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs">Invoices</div>
          </b-card-body>
          <div slot="footer">
            <b-link class="font-weight-bold font-xs btn-block text-muted" to="/invoices">
              View More
              <i class="fa fa-angle-right float-right font-lg"></i>
            </b-link>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-card class="chart-container">
      <h3 class="text-center">Itemwise Sales</h3>
      <highcharts :options="options" v-if="chartData && chartData.length > 0"></highcharts>
      <h5 v-else class="text-center text-secondary">No Data to Show!</h5>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "dashboard",

  computed: {
    ...mapGetters([
      "itemsCount",
      "clientsCount",
      "usersCount",
      "invoicesCount",
      "chartData"
    ]),

    options() {
      return {
        chart: {
          type: "column"
        },
        title: {
          text: ""
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          title: {
            text: "Total Number of Sales"
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: "{point.y:.0f}"
            }
          }
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
        },

        series: [
          {
            name: "Items",
            colorByPoint: true,
            data: this.chartData
              ? [...this.chartData, { name: "", y: null }]
              : []
          }
        ]
      };
    }
  },

  created() {
    this.$store.dispatch("initApp");
  }
};
</script>
