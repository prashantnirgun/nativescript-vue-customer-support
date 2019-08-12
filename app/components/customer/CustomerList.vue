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
    <GridLayout marginTop="5">
      <RadListView
        ref="CustomerlistView"
        for="item in items"
        pullToRefresh="true"
        @itemTap="onItemClick"
        @pullToRefreshInitiated="onPullToRefreshInitiated"
      >
        <v-template>
          <StackLayout class="card">
            <GridLayout columns="2,50,*,15,2" rows="50">
              <Image
                v-if="item.market === 'Veg'"
                src="~/assets/images/fruits-icon.png"
                col="1"
                row="0"
              />
              <Image
                v-else-if="item.market === 'Fruit'"
                src="~/assets/images/Cabbage-icon.png"
                row="0"
                col="1"
              />
              <Image v-else src="~/assets/images/business-icon.png" row="0" col="1" />
              <Label :text="item.name" class="ItemText" row="0" col="2"></Label>
              <Label :text="item.gala_no" class="ItemExtra" row="0" col="2"></Label>
            </GridLayout>
            <StackLayout orientation="horizontal" v-if="item.expand">
              <Button
                :text="'fa-phone' | fonticon"
                class="btn-round fa"
                backgroundColor="red"
                @tap="call(item.rmn)"
              />
              <Button
                :text="'fa-comment' | fonticon"
                class="btn-round fa"
                backgroundColor="gree"
                @tap="sms(item.rmn)"
              />
              <Button
                :text="'fa-edit' | fonticon"
                class="btn-round fa"
                backgroundColor="orange"
                @tap="edit(item.id)"
              />
              <Button
                :text="'fa-list' | fonticon"
                class="btn-round fa"
                backgroundColor="blue"
                @tap
              />
              <Button
                :text="'fa-magnet' | fonticon"
                class="btn-round fa"
                backgroundColor="pink"
                @tap
              />
            </StackLayout>
          </StackLayout>
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
import * as permissions from "nativescript-permissions";
import * as phone from "nativescript-phone";
import axios from "axios/dist/axios";
import * as Toast from "nativescript-toast";
import CustomerDetail from "./CustomerDetail";
//import { ObservableArray } from "tns-core-modules/data/observable-array";

export default {
  components: {
    CustomerDetail
  },
  data() {
    return {
      items: [],
      dialogOpen: false,
      id_old: -1,
      isExpand: false,
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
    call(rmn) {
      //console.log("call button was pressed " + rmn);
      permissions
        .requestPermission(
          android.Manifest.permission.CALL_PHONE,
          "I need these permissions because I'm cool"
        )
        .then(() => {
          console.log("Woo Hoo, I have the power!");
          phone.dial(rmn, false).then(
            args => {
              console.log("call response", args);
            },
            err => {
              console.log("Error: " + err);
            }
          );
        })
        .catch(() => {
          console.log("Uh oh, no permissions - plan B time!");
        });
    },
    sms(rmn) {
      //New Method for single number is phone.sms(["212-555-1234"],"My Message")
      phone.sms(rmn, "My test messageMessage").then(function(args) {
        /// args.reponse: "success", "cancelled", "failed"
        console.log("SMS response", args);
      });
    },
    edit(customer_id) {
      
      this.$navigateTo(CustomerDetail, { props: { customer_id } });
    },
    showDialog() {
      this.dialogOpen = true;
    },
    submitForm() {
      this.dialogOpen = false;
    },
    closeDialog() {
      this.dialogOpen = false;
    },
    onPullToRefreshInitiated({ object }) {
      let data = {
        customerName: this.customerForm.customerName,
        galaNo: this.customerForm.galaNo,
        apmc: this.customerForm.apmc,
        wing: this.customerForm.wing
      };
      axios
        .post(
          "https://express-mysql-passport-jwt-api.herokuapp.com/mobile/customerSearch",
          data
        )
        .then(response => {
          if (this.$store.state.verbose) {
            console.log("getData()", response.data);
          }

          let data1 = [];
          response.data.map(item => {
            data1.push({ ...item, expand: false });
          });
          console.log("data", data1);
          //this.items = new ObservableArray(data1);
          this.items = data1;
          object.notifyPullToRefreshFinished();
        })
        .catch(error => {
          console.log(data);
          console.log("onPullRefreshInitiatederror", error);
        });
    },
    onItemClick(event) {
      console.log(event.item.expand, this.id_old);

      if (this.id_old !== event.item.id && this.id_old >= 0) {
        //console.log("inside if condition", this.items[4]);
        this.items[this.id_old].expand = false;
      }
      event.item.expand = !event.item.expand;
      this.id_old = event.item.id;
    }
  }
};
</script>

<style scoped>
.card {
  margin: 2;
  border-radius: 20;
  padding: 5;
  border-color: rgb(32, 233, 216);
  border-width: 2;
}

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
