<template>
  <Page :class="{ dialogOpen: dialogOpen }">
    <ActionBar title="Customer List">
      <ActionItem
        @tap="showDialog"
        ios.systemIcon="9"
        ios.position="left"
        android.systemIcon="ic_menu_search"
        android.position="actionBar"
      />
    </ActionBar>
    <GridLayout>
      <RadListView
        ref="CustomerlistView"
        for="item in items"
        pullToRefresh="true"
        @itemTap="onItemClick"
        @pullToRefreshInitiated="onPullToRefreshInitiated"
      >
        <v-template>
          <GridLayout class="item" columns="2,50,*,15,2" rows="50">
            <Image v-if="item.market === 'Veg'" src="~/assets/images/fruits-icon.png" col="1" />
            <Image
              v-else-if="item.market === 'Fruit'"
              src="~/assets/images/Cabbage-icon.png"
              col="1"
            />
            <Image v-else src="~/assets/images/business-icon.png" col="1" />
            <Label :text="item.name" class="ItemText" col="2"></Label>
            <Label :text="item.gala_no" class="ItemExtra" col="2"></Label>
          </GridLayout>
        </v-template>
      </RadListView>

      <AbsoluteLayout class="dialog-wrapper">
        <StackLayout class="dialog">
          <StackLayout orientation="vertical">
            <RadDataForm ref="dataform" :source="customerForm" :metadata="customerFormMetadata" />
          </StackLayout>
          <StackLayout orientation="horizontal">
            <Button class="btn btn-primary" text="Search" @tap="submitForm"></Button>
            <Button class="btn btn-orange btn-rounded-sm" text="Cancel" @tap="closeDialog"></Button>
          </StackLayout>
        </StackLayout>
      </AbsoluteLayout>
    </GridLayout>
  </Page>
</template>

<script>
import axios from "axios/dist/axios";
import * as Toast from "nativescript-toast";
//import CustomerDetail from "./CustomerDetail";
import { ObservableArray } from "tns-core-modules/data/observable-array";

export default {
  data() {
    return {
      items: [],
      dialogOpen: false,
      customerForm: {
        customerName: "",
        galaNo: "",
        apmc: "All",
        wing: "All"
      },
      customerFormMetadata: {
        isReadOnly: false,
        commitMode: "Immediate",
        validationMode: "Immediate",
        propertyAnnotations: [
          {
            name: "customerName",
            displayName: "Customer Name",
            index: 0,
            editor: "Text"
          },
          {
            name: "galaNo",
            displayName: "Gala No",
            index: 1,
            editor: "Text"
          },
          {
            name: "apmc",
            displayName: "A.P.M.C.",
            index: 2,
            editor: "Picker",
            valuesProvider: ["All", "Veg", "Fruit", "Onion", "Retail"]
          },
          {
            name: "wing",
            displayName: "Wing",
            editor: "Picker",
            index: 3,
            valuesProvider: [
              "All",
              "A",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H",
              "M",
              "N",
              "Open Shed",
              "Outside"
            ]
          }
        ]
      }
    };
  },
  mounted() {
    var toast = Toast.makeText("Pull to refresh");
    toast.show();
  },
  methods: {
    showDialog() {
      this.dialogOpen = true;
    },
    submitForm() {
      //console.log("data", this.customerForm.APMC);
      this.dialogOpen = false;
    },
    closeDialog() {
      this.dialogOpen = false;
    },
    onPullToRefreshInitiated({ object }) {
      axios
        .post(
          "https://express-mysql-passport-jwt-api.herokuapp.com/mobile/customerSearch",
          this.customerForm
        )
        .then(response => {
          this.items = new ObservableArray(response.data);
          object.notifyPullToRefreshFinished();
        });
    },
    getData() {
      this.processing = true;
      axios
        .get(
          "https://express-mysql-passport-jwt-api.herokuapp.com/mobile/customer"
        )
        .then(response => {
          console.log("respose");
          //console.log(response.data);
          this.items = response.data;
          this.processing = false;
        });
    },
    onItemClick({ item }) {
      let customer_id = item.id;
      console.log("Tapped on ", customer_id);
      //this.$navigateTo(CustomerDetail, { props: { customer_id } });
    }
  }
};
</script>

<style scoped>
.ItemText {
  padding: 10;
  color: #1729cc;
  font-size: 16;
  word-wrap: break-word;
}
.ItemExtra {
  padding: 10;
  font-size: 16;
  text-align: right;
}
@keyframes show {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
.dialogOpen {
  background-color: rgba(0, 0, 0, 0.575);
}

.dialogOpen .content,
.dialogOpen .action-bar {
  opacity: 0.2;
}

.dialogOpen .dialog-wrapper {
  visibility: visible;
  animation-name: show;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

.dialog-wrapper {
  visibility: collapse;
  opacity: 0;
}

.dialog {
  border-width: 1 0 1 0;
  border-color: black;
  background-color: white;
  width: 100%;
  margin-top: 100;
  padding: 20;
}

.dialog label {
  margin: 0 15 15 15;
  color: black;
}
</style>
