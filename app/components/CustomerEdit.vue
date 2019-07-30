<template>
  <GridLayout rows="*,70">
    <RadDataForm
      row="0"
      ref="dataform"
      :source="customerForm"
      :metadata="customerFormMetadata"
      @groupUpdate="onGroupUpdate"
    />
    <StackLayout row="1" orientation="horizontal">
      <Button class="btn btn-primary" text="Submit"></Button>
      <Button class="btn" backgroundColor="orange" color="white" text="Cancel"></Button>
    </StackLayout>
  </GridLayout>
</template>

<script>
import axios from "axios/dist/axios";
import { constants } from "fs";

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
      customerForm: {
        customer_name_1: "",
        customer_name_2: "",
        owner_name: "",
        contact_person: "",
        contact_no1: "",
        contact_no2: "",
        email: "",
        no_of_company: "",
        market: "All",
        wing: "All",
        gala_no: "",
        sms: false,
        backup: false
      },
      customerFormMetadata: {
        isReadOnly: false,
        commitMode: "Immediate",
        validationMode: "Immediate",
        propertyAnnotations: [
          {
            name: "customer_name_1",
            displayName: "Customer Name",
            index: 0,
            groupName: "Personal",
            editor: "Text"
          },
          {
            name: "customer_name_2",
            displayName: "नाव (मराठीतून)",
            index: 1,
            groupName: "Personal",
            editor: "Text"
          },
          {
            name: "owner_name",
            displayName: "Owner Name",
            index: 2,
            groupName: "Personal",
            editor: "Text"
          },
          {
            name: "contact_person",
            displayName: "Contact Person",
            groupName: "Personal",
            index: 3,
            editor: "Text"
          },
          {
            name: "contact_no1",
            displayName: "Register Mobile No",
            index: 4,
            groupName: "Address",
            editor: "Text"
          },
          {
            name: "contact_no2",
            displayName: "Alternet No",
            index: 5,
            groupName: "Address",
            editor: "Text"
          },
          {
            name: "email",
            displayName: "Eamil",
            index: 6,
            groupName: "Address",
            editor: "Text"
          },
          {
            name: "no_of_company",
            displayName: "Total Companies",
            index: 7,
            groupName: "Personal",
            editor: "Text"
          },

          {
            name: "market",
            displayName: "Market",
            index: 8,
            groupName: "Address",
            editor: "Picker",
            valuesProvider: ["All", "Veg", "Fruit", "Onion", "Retail"]
          },
          {
            name: "wing",
            displayName: "Wing",
            editor: "Picker",
            groupName: "Address",
            index: 9,
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
            index: 10,
            groupName: "Address",
            editor: "Text"
          },
          {
            name: "sms",
            displayName: "SMS",
            index: 11,
            groupName: "Personal",
            editor: "Switch"
          },
          {
            name: "backup",
            displayName: "Backup",
            index: 12,
            groupName: "Personal",
            editor: "Switch"
          }
        ]
      }
    };
  },
  created() {
    this.getData(this.customer_id);
  },
  methods: {
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
            customer_name_1: data.customer_name1,
            customer_name_2: data.customer_name2,
            owner_name: data.owner_name,
            contact_person: data.contact_person,
            contact_no1: data.contact_no1,
            contact_no2: data.contact_no2,
            email: data.email,
            no_of_company: data.no_of_company,
            market: data.market,
            wing: data.wing,
            gala_no: data.gala_no,
            sms: data.sms,
            backup: data.backup,
            mobile: data.mobile
          };
        });
    }
  }
};
</script>

<style scoped>
</style>
