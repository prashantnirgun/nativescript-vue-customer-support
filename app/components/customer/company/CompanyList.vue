<template>
  <GridLayout rows="*,80">
    <RadListView
      row="0"
      ref="CompanylistView"
      for="item in items"
      pullToRefresh="true"
      @itemTap="onItemClick"
      @pullToRefreshInitiated="onPull"
    >
      <v-template>
        <GridLayout
          class="card"
          :class="getStatusClass(item.company_status)"
          columns="80,80,*,*,*,*"
          rows="*,*"
        >
          <Label
            :text="item.company_name"
            class="card-heading font-weight-bold"
            row="0"
            col="0"
            colSpan="6"
          ></Label>
          <Label text="Book" class="font-weight-bold" row="1" col="0" />
          <Label :text="item.starting_year" row="1" col="1" />
          <Label text="Co" class="font-weight-bold" row="1" col="2" />
          <Label :text="item.co_id" row="1" col="3" />
          <Label text="Year" class="font-weight-bold" row="1" col="4" />
          <Label :text="item.company_status" row="1" col="5" />
        </GridLayout>
      </v-template>
    </RadListView>
    <Button text="New Company" class="btn btn-primary" row="1" @tap="createCopany" />
  </GridLayout>
</template>

<script>
import axios from "axios/dist/axios";
import { ObservableArray } from "tns-core-modules/data/observable-array";
export default {
  data() {
    return {
      items: []
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
    axios
      .get(
        "https://express-mysql-passport-jwt-api.herokuapp.com/mobile/customer-company-list/" +
          this.customer_id
      )
      .then(response => {
        this.items = new ObservableArray(response.data);
      });
  },
  methods: {
    getStatusClass(status) {
      console.log("item status", status);
      return status === "A" ? "active" : "closed";
    },
    onPull({ object }) {
      axios
        .get(
          "https://express-mysql-passport-jwt-api.herokuapp.com/mobile/customer-company-list/" +
            this.customer_id
        )
        .then(response => {
          this.items = new ObservableArray(response.data);
          object.notifyPullToRefreshFinished();
        });
    },
    onItemClick(event) {
      this.$emit("clicked", { action: "U", id: event.item.id });
    },
    createCopany() {
      this.$emit("clicked", { action: "C", id: 0 });
    }
  }
};
</script>

<style scoped>
.card {
  margin: 10;
  border-radius: 20;
  padding: 10;

  color: #131636;
  height: 86%;
}

.card-heading {
  text-transform: uppercase;
  color: #0f1e39;
  font-family: Passion, PassionOne, PassionOne-Regular;
  font-size: 16;
}

.active {
  background-color: #e3e9f8;
}

.closed {
  background-color: rgba(236, 126, 23, 0.979);
}
</style>
