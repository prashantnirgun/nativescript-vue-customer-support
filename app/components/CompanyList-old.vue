<template>
  <RadListView
    ref="CompanylistView"
    for="item in items"
    pullToRefresh="true"
    @pullToRefreshInitiated="onPull"
  >
    <v-template>
      <GridLayout class="item" columns="100,100,*,*,*,*" rows="*">
        <Label class="ItemText" :text="item.company_name" row="0" col="2" colspan="6"></Label>
      </GridLayout>
    </v-template>
  </RadListView>
</template>

<script>
import axios from "axios/dist/axios";
import { ObservableArray } from "tns-core-modules/data/observable-array";
export default {
  data() {
    return {
      items: new ObservableArray([
        { company_name: "The Software Source" },
        { company_name: "Xplore Systems Pvt Ltd" }
      ])
    };
  },
  props: {
    customer_id: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  created() {
    console.log("created event ", this.customer_id);
    // axios
    //   .get(
    //     "https://express-mysql-passport-jwt-api.herokuapp.com/mobile/company/" +
    //       this.customer_id
    //   )
    //   .then(response => {
    //     //console.log("company list", response.data);
    //     //var parsedobj = JSON.parse(JSON.stringify(response.data));
    //     //console.log("parser data =======>", parsedobj);
    //     //console.log("data ", response.data.length);
    //     //this.items = new ObservableArray(response.data);
    //     this.items = response.data;
    //     //this.items[0] = { company_name: "The Software Source" };
    //     /*
    //     this.items = [];
    //     response.data.map(item => {
    //       //console.log(item);
    //       this.items.push({
    //         company_name: item.company_name,
    //         starting_year: item.starting_year,
    //         co_id: item.co_id,
    //         current_year: item.current_year
    //       });
    //     });
    //     */
    //     console.log(this.items);
    //   });
  },
  methods: {
    onPull({ object }) {
      axios
        .get(
          "https://express-mysql-passport-jwt-api.herokuapp.com/mobile/company/" +
            this.customer_id
        )
        .then(response => {
          //this.items = response.data;
          //this.items = [];
          let data = [];
          response.data.map(item => {
            console.log("item", item);
            //this.items.push(item);
            data.push(item);
          });

          //console.log("data before observableArray", data);
          this.items = new ObservableArray(data);
          //console.log("response", data);

          /*          this.items = new ObservableArray([
            { company_name: "Saikrupa Enterprises" },
            { company_name: "Om Photos" }
          ]);
          */
          console.log("items", this.items);

          //this.items = new ObservableArray(JSON.parse(response.data));
          //object.notifyPullToRefreshFinished();
          this.$nextTick(() => {
            object.notifyPullToRefreshFinished();
          });
        });

      // this.$nextTick(() => {
      //   this.fruitList.push({
      //     name: 'Berry',
      //   });
      //   object.notifyPullToRefreshFinished();
      // });
    },
    onItemTap(event) {
      //console.log(event.index);
      console.log(event.item.co_id);
      //this.co_id = event.item.co_id;
    }
  }
};
</script>

<style scoped>
.cardStyle {
  background-color: #bada55;
  color: #fff;
}

.cardContent {
  padding: 15;
}

.content {
  font-size: 20;
}

.heading {
  font-size: 20;
  font-weight: bold;
}
</style>
