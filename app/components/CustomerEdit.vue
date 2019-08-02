<template>
  <GridLayout rows="auto,*,70">
    <ActivityIndicator
      row="0"
      width="100"
      height="100"
      borderRadius="50"
      :busy="isLoading"
      :visibility="isLoading? 'visible' : 'collapsed'"
    />
    <RadDataForm
      row="1"
      ref="dataform"
      :source="customerForm"
      :metadata="customerFormMetadata"
      @groupUpdate="onGroupUpdate"
    />
    <StackLayout row="2" orientation="horizontal">
      <Button class="btn btn-primary" text="Submit" color="black" @tab="submit"></Button>
      <Button class="btn" backgroundColor="orange" color="black" text="Call" @tap="call"></Button>
      <Button class="btn" backgroundColor="yellow" color="black" text="SMS" @tap="sms"></Button>
    </StackLayout>
  </GridLayout>
</template>

<script>
import axios from "axios/dist/axios";
import * as permissions from "nativescript-permissions";
import * as phone from "nativescript-phone";

export default {
  props: {
    customer_id: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      isLoading: false,
      customerForm: {
        id: 0,
        general_ledger_id: 0,
        customer_name1: "",
        customer_name2: "",
        owner_name: "",
        contact_person: "",
        contact_no1: "",
        contact_no2: "",
        email: "",
        no_of_company: 0,
        sms: "N",
        backup: "N",
        mobile: "N",
        market: "Veg",
        wing: "",
        gala_no: "",
        office_address1: "",
        office_address2: "",
        office_address3: "",
        residence_address1: "",
        residence_address2: "",
        residence_address3: ""
      },
      customerFormMetadata: {
        isReadOnly: false,
        commitMode: "Immediate",
        validationMode: "Immediate",
        propertyAnnotations: [
          {
            name: "id",
            displayName: "ID",
            index: 0,
            hidden: true
          },
          {
            name: "general_ledger_id",
            displayName: "General Ledger",
            index: 0,
            hidden: true
          },
          {
            name: "customer_name1",
            displayName: "Customer Name",
            index: 0,
            groupName: "Info",
            editor: "Text"
          },
          {
            name: "customer_name2",
            displayName: "नाव (मराठीतून)",
            index: 1,
            groupName: "Info",
            editor: "Text"
          },
          {
            name: "owner_name",
            displayName: "Owner Name",
            index: 2,
            groupName: "Info",
            editor: "Text"
          },
          {
            name: "contact_person",
            displayName: "Contact Person",
            groupName: "Info",
            index: 3,
            editor: "Text"
          },
          {
            name: "contact_no1",
            displayName: "Register Mobile No",
            index: 4,
            groupName: "Info",
            editor: "Text"
          },
          {
            name: "contact_no2",
            displayName: "Alternet No",
            index: 5,
            groupName: "Info",
            editor: "Text"
          },
          {
            name: "email",
            displayName: "Eamil",
            index: 6,
            groupName: "Info",
            editor: "Text"
          },
          {
            name: "no_of_company",
            displayName: "Total Companies",
            index: 7,
            groupName: "Account",
            editor: "Text"
          },
          {
            name: "sms",
            displayName: "SMS",
            index: 8,
            groupName: "Account",
            editor: "Switch"
          },
          {
            name: "backup",
            displayName: "Backup",
            index: 9,
            groupName: "Account",
            editor: "Switch"
          },
          {
            name: "market",
            displayName: "Market",
            index: 10,
            groupName: "Account",
            editor: "Picker",
            valuesProvider: ["Veg", "Fruit", "Onion", "Retail"]
          },
          {
            name: "wing",
            displayName: "Wing",
            editor: "Picker",
            groupName: "Account",
            index: 11,
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
          },
          {
            name: "gala_no",
            displayName: "Gala No",
            index: 12,
            groupName: "Account",
            editor: "Text"
          },
          {
            name: "office_address1",
            displayName: "Address",
            index: 13,
            groupName: "Office Address",
            editor: "Text"
          },
          {
            name: "office_address2",
            displayName: "",
            index: 14,
            groupName: "Office Address",
            editor: "Text"
          },
          {
            name: "office_address3",
            displayName: "",
            index: 15,
            groupName: "Office Address",
            editor: "Text"
          },
          {
            name: "residence_address1",
            displayName: "Address",
            index: 16,
            groupName: "Residence Address",
            editor: "Text"
          },
          {
            name: "residence_address2",
            displayName: "",
            index: 17,
            groupName: "Residence Address",
            editor: "Text"
          },
          {
            name: "residence_address3",
            displayName: "",
            index: 18,
            groupName: "Residence Address",
            editor: "Text"
          }
        ]
      }
    };
  },
  created() {
    this.getData(this.customer_id);
  },
  methods: {
    submit() {},
    call() {
      permissions
        .requestPermission(
          android.Manifest.permission.CALL_PHONE,
          "I need these permissions because I'm cool"
        )
        .then(() => {
          console.log("Woo Hoo, I have the power!");
          phone.dial("9324360777", false).then(
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
    sms() {
      phone.sms("9324360777", "My test messageMessage").then(function(args) {
        /// args.reponse: "success", "cancelled", "failed"
        console.log("SMS response", args);
      });
    },
    onGroupUpdate(args) {
      let nativeGroup = args.group;
      if (args.ios) {
        nativeGroup.collapsible = true;
      } else {
        nativeGroup.setExpandable(true);
      }
    },
    getData(id) {
      axios
        .get(
          "https://express-mysql-passport-jwt-api.herokuapp.com/mobile/customer/" +
            this.customer_id
        )
        .then(response => {
          let data = response.data;
          //console.log("get data", data);
          this.customerForm = {
            id: data.id,
            general_ledger_id: data.general_ledger_id,
            customer_name1: data.customer_name1,
            customer_name2: data.customer_name2,
            owner_name: data.owner_name,
            contact_person: data.contact_person,
            contact_no1: data.contact_no1,
            contact_no2: data.contact_no2,
            email: data.email,
            no_of_company: data.no_of_company,
            sms: data.sms,
            backup: data.backup,
            mobile: data.mobile,
            market: data.market,
            wing: data.wing,
            gala_no: data.gala_no,
            office_address1: data.office_address1,
            office_address2: data.office_address2,
            office_address3: data.office_address3,
            residence_address1: data.residence_address1,
            residence_address2: data.residence_address2,
            residence_address3: data.residence_address3
          };
        });
    }
  }
};
</script>

<style scoped>
</style>
