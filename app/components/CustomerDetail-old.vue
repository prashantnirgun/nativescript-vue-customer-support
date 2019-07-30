<template>
  <Page>
    <ActionBar title="Customer Detail" class="action-bar" />

    <TabView>
      <TabViewItem title="Customer">
        <GridLayout rows="*,70">
          <RadDataForm
            row="0"
            ref="dataform"
            :source="customerForm"
            :metadata="customerFormMetadata"
          />
          <StackLayout row="1" orientation="horizontal">
            <Button class="btn btn-primary" text="Submit"></Button>
            <Button class="btn" backgroundColor="orange" color="white" text="Cancel"></Button>
          </StackLayout>
        </GridLayout>
      </TabViewItem>
      <TabViewItem title="Co List">
        <ListView class="list-group" for="company in companys">
          <v-template>
            <card-view margin="5" elevation="40" radius="1" class="cardStyle">
              <stack-layout class="cardContent" rows="auto">
                <GridLayout rows="35,30" columns="100,100,*,*,*,*">
                  <!-- prettier-ignore-start -->
                  <Label
                    class="h3 text-uppercase"
                    :text="company.company_name"
                    row="0"
                    col="0"
                    colspan="6"
                  />
                  <!-- prettier-ignore-end -->
                  <Label class="heading" text="Books :" row="1" col="0" />
                  <Label class="content" :text="company.starting_year" row="1" col="1" />
                  <Label class="heading" text="CO :" row="1" col="2" />
                  <Label class="content" :text="company.co_id" row="1" col="3" />
                  <Label class="heading" text="YR :" row="1" col="4" />
                  <Label class="content" :text="company.current_year" row="1" col="5" />
                </GridLayout>
              </stack-layout>
            </card-view>
          </v-template>
        </ListView>
      </TabViewItem>
      <TabViewItem title="Co Detail">
        <RadDataForm row="0" ref="companyform" :source="companyForm" />
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import axios from "axios/dist/axios";

export default {
  data() {
    return {
      customer: {},
      companys: [],
      groups: [],
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
      },
      companyForm: {
        co_id: "",
        current_year: "",
        compay_name: "",
        starting_year: "",
        patti_dw: "",
        patti_format_dw: "",
        memo_dw: "",
        memo_format_dw: "",
        sale_bill: "All",
        sale_challan: "All",
        font: "",
        language: false,
        company_status: false
      }
    };
  },
  props: ["id"],
  created() {
    //console.log("id found was" + this.id);
    this.getData(this.id);
  },
  methods: {
    getData(id) {
      this.processing = true;
      axios
        .get(
          "https://express-mysql-passport-jwt-api.herokuapp.com/mobile/customer/" +
            this.id
        )
        .then(response => {
          let data = response.data.customer;
          //this.customer = data;

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

          this.companys = response.data.company;
          //   response.data.company.map(co => {
          //     console.log("co", co);
          //     //  this.company.push({co.co_id, co.company_name, co.starting_year, co.current_year});
          //   });
          //console.log(this.companys);

          //console.log(this.customer);
          //this.items = response.data;
          //this.processing = false;
        });
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
