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
      <Button class="btn btn-primary" color="black" text="Submit" @tap="save"></Button>
      <Button class="btn" backgroundColor="orange" color="black" text="Call" @tap="call"></Button>
      <Button class="btn" backgroundColor="yellow" color="black" text="SMS" @tap="sms"></Button>
    </StackLayout>
  </GridLayout>
</template>

<script>
import axios from "axios/dist/axios";
import * as permissions from "nativescript-permissions";
import * as phone from "nativescript-phone";
import { getByKeys, getByValues } from "../../helper";
import { constants } from "fs";
const yesnoList = { Y: "Yes", N: "No" };
const marketList = { V: "Veg", F: "Fruit", O: "Onion", R: "Retail" };
import format from "date-fns/format";

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
        sms: "No",
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
            editor: "Number",
            hidden: true
          },
          {
            name: "general_ledger_id",
            displayName: "General Ledger",
            index: 0,
            editor: "Number",
            hidden: true
          },
          {
            name: "mobile",
            displayName: "Mobile",
            index: 0,
            editor: "Text",
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
            editor: "Number"
          },
          {
            name: "sms",
            displayName: "SMS",
            index: 8,
            groupName: "Account",
            editor: "Picker",
            valuesProvider: ["Yes", "No"]
          },
          {
            name: "backup",
            displayName: "Backup",
            index: 9,
            groupName: "Account",
            editor: "Picker",
            valuesProvider: ["Yes", "No"]
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
            displayName: "2",
            index: 14,
            groupName: "Office Address",
            editor: "Text"
          },
          {
            name: "office_address3",
            displayName: "3",
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
            displayName: "2",
            index: 17,
            groupName: "Residence Address",
            editor: "Text"
          },
          {
            name: "residence_address3",
            displayName: "3",
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
    save() {
      this.$refs.dataform.validateAll().then(result => {
        if (result == false) {
          feedback.warning({
            title: "Warning",
            message: "Incomeplete Data could not saved"
          });
          console.log("form submit failed");
        } else {
          this.isLoading = true;
          this.submitData();
        }
      });
    },
    submitData() {
      let data = {
        id: this.customerForm.id,
        general_ledger_id: this.customerForm.general_ledger_id,
        customer_name1: this.customerForm.customer_name1,
        customer_name2: this.customerForm.customer_name2,
        owner_name: this.customerForm.owner_name,
        contact_person: this.customerForm.contact_person,
        contact_no1: this.customerForm.contact_no1,
        contact_no2: this.customerForm.contact_no2,
        email: this.customerForm.email,
        no_of_company: this.customerForm.no_of_company,
        sms: getByValues(yesnoList, this.customerForm.sms.toString()),
        backup: getByValues(yesnoList, this.customerForm.backup.toString()),
        mobile: this.customerForm.mobile,
        market: getByValues(marketList, this.customerForm.market.toString()),
        wing: this.customerForm.wing,
        gala_no: this.customerForm.gala_no,
        office_address1: this.customerForm.office_address1,
        office_address2: this.customerForm.office_address2,
        office_address3: this.customerForm.office_address3,
        residence_address1: this.customerForm.residence_address1,
        residence_address2: this.customerForm.residence_address2,
        residence_address3: this.customerForm.residence_address3
      };
      console.log("inside submit data", data);

      axios
        .post(
          `https://express-mysql-passport-jwt-api.herokuapp.com/mobile/customer/${data.id}`,
          data
        )
        .then(response => {
          this.isLoading = false;
          //console.log(response);
          if (response.data.changedRows == 1) {
            feedback.success({
              title: "successful",
              message: "Data saved.!"
            });
          } else {
            feedback.error({
              title: "Error",
              message: "Incomeplete Data could not saved"
            });
          }
        });
    },
    call() {
      permissions
        .requestPermission(
          android.Manifest.permission.CALL_PHONE,
          "I need these permissions because I'm cool"
        )
        .then(() => {
          console.log("Woo Hoo, I have the power!");
          phone.dial(this.customerForm.contact_no1, false).then(
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
      // let currentDate = new Date();
      // let timestamp =
      //   currentDate.getFullYear() +
      //   "-" +
      //   currentDate.getUTCMonth +
      //   "-" +
      //   currentDate.getDay;
      // console.log(new Date().getFullYear());
      console.log(format(this.due, "YYYY-MM-Do"));

      phone
        .sms(this.customerForm.contact_no1, "My test messageMessage")
        .then(function(args) {
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
            sms: getByKeys(yesnoList, response.data.sms.toString()),
            backup: getByKeys(yesnoList, response.data.backup.toString()),
            mobile: data.mobile,
            market: getByKeys(marketList, response.data.market.toString()),
            wing: data.wing,
            gala_no: data.gala_no,
            office_address1: data.office_address1,
            office_address2: data.office_address2,
            office_address3: data.office_address3,
            residence_address1: data.residence_address1,
            residence_address2: data.residence_address2,
            residence_address3: data.residence_address3
          };
          //console.log("data fetch", this.customerForm);
        });
    }
  }
};
</script>

<style scoped>
</style>
