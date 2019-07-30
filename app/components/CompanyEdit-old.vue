<template>
  <GridLayout rows="*,80">
    <RadDataForm
      row="0"
      ref="dataform"
      :source="companyForm"
      :metadata="companyFormMetadata"
      @propertyCommitted="onPropertyCommitted"
    />
    <StackLayout row="1" orientation="horizontal">
      <Button class="btn btn-primary" text="Submit"></Button>
      <Button class="btn" backgroundColor="orange" color="white" text="Cancel"></Button>
      <Label :text="co_id" textWrap="true" />
    </StackLayout>
  </GridLayout>
</template>

<script>
import axios from "axios/dist/axios";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { fromObject } from "tns-core-modules/data/observable";
export default {
  props: {
    co_id: {
      type: Number,
      default() {
        return 0;
      }
    },
    customer_id: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      company_name: "",
      newData: {},
      companyForm: {
        id: "0",
        co_id: "0",
        branch_id: "0",
        current_year: "",
        company_name: "",
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
      },
      companyFormMetadata: {
        isReadOnly: false,
        commitMode: "Immediate",
        validationMode: "Immediate",
        propertyAnnotations: [
          {
            name: "id",
            displayName: "ID",
            index: 0,
            groupName: "Personal",
            editor: "Text"
          },
          {
            name: "co_id",
            displayName: "Company ID",
            index: 0,
            groupName: "Personal",
            editor: "Text"
          },
          {
            name: "branch_id",
            displayName: "Branch ID",
            index: 1,
            groupName: "Personal",
            editor: "Text"
          },
          {
            name: "current_year",
            displayName: "Current Year",
            index: 2,
            groupName: "Personal",
            editor: "Text"
          },
          {
            name: "company_name",
            displayName: "Company Name",
            index: 3,
            groupName: "Personal",
            editor: "Text"
          },
          {
            name: "starting_year",
            displayName: "Books Begins",
            index: 4,
            groupName: "Personal",
            editor: "Text"
          },
          {
            name: "patti_dw",
            displayName: "Patti DW",
            index: 5,
            groupName: "Personal",
            editor: "Text"
          },
          {
            name: "patti_format_dw",
            displayName: "Patti Format DW",
            index: 7,
            groupName: "Personal",
            editor: "Text"
          },
          {
            name: "memo_dw",
            displayName: "Memo DW",
            index: 8,
            groupName: "Personal",
            editor: "Text"
          },
          {
            name: "memo_format_dw",
            displayName: "Memo Format DW",
            index: 9,
            groupName: "Personal",
            editor: "Text"
          },
          {
            name: "sale_bill",
            displayName: "Sales Bill DW",
            index: 10,
            groupName: "Personal",
            editor: "Text"
          },
          {
            name: "sale_challan",
            displayName: "Sales Challan DW",
            index: 11,
            groupName: "Personal",
            editor: "Text"
          },
          {
            name: "font",
            displayName: "Font",
            index: 12,
            groupName: "Personal",
            editor: "Picker",
            valuesProvider: ["VegText", "Shivaji", "Tahoma"]
          },
          {
            name: "language",
            displayName: "Language",
            index: 13,
            groupName: "Personal",
            editor: "Picker",
            valuesProvider: ["English", "Marathi"]
          },
          {
            name: "company_status",
            displayName: "Company Status",
            index: 14,
            groupName: "Personal",
            editor: "Picker",
            valuesProvider: ["Active", "Inactive", "Closed"]
          }
        ]
      }
    };
  },
  watch: {
    co_id: function(newValue, oldValue) {
      this.co_id = newValue;
      console.log("co_id is changed", newValue, oldValue);
      //this.companyForm = { ...this.companyForm, co_id: newValue };
      this.getData();
    },
    customer_id: function(newValue, oldValue) {
      this.customer_id = newValue;
      console.log("customer_id is changed", newValue, oldValue);
    }
  },
  created() {
    console.log("created event fire");
  },
  mounted() {
    console.log("mounte event fire");
  },
  methods: {
    onPropertyCommitted(data) {
      console.log("onPropertyCommitted");
    },
    getData() {
      axios
        .get(
          "https://express-mysql-passport-jwt-api.herokuapp.com/mobile/customer-company/" +
            this.customer_id +
            "/" +
            this.co_id
        )
        .then(response => {
          //let data = new ObservableArray(response.data[0]);
          //let data = fromObject(response.data[0]);
          let Data = response.data[0];
          console.log("spread", ...Data);
          this.newData = response.data[0];
          //this.company_name = data.company_name;
          //console.log("company edit", this.company_name);
          console.log("fetch data", this.newData);
          //console.log("fetch data[0]", data[0]);
          console.log("actual data", this.companyForm);
          //console.log("Observable", data.getItem(0));
          //this.companyForm = { ...this.companyForm, co_id: data.co_id };
          //this.newData = {};
          //console.log(this.$ref.dataform);
          /*
          const viewModel = new fromObject();
          viewModel.set("company_name", "TSS");
          console.log("viewmodel", viewModel);
          */
          /*
          this.companyForm = {
            id: this.newData.id,
            co_id: this.newData.co_id,
            branch_id: this.newData.branch_id,
            current_year: this.newData.current_year,
            company_name: this.newData.company_name,
            starting_year: this.newData.starting_year,
            patti_dw: this.newData.patti_dw,
            patti_format_dw: this.newData.patti_format_dw,
            memo_dw: this.newData.memo_dw,
            memo_format_dw: this.newData.memo_format_dw,
            sale_bill: this.newData.sale_bill,
            sale_challan: this.newData.sale_challan,
            font: this.newData.font,
            language: this.newData.language,
            company_status: this.newData.company_status
          };
          */

          this.companyForm = {
            id: Data.id,
            co_id: Data.co_id,
            branch_id: Data.branch_id,
            current_year: Data.current_year,
            company_name: Data.company_name,
            starting_year: Data.starting_year,
            patti_dw: Data.patti_dw,
            patti_format_dw: Data.patti_format_dw,
            memo_dw: Data.memo_dw,
            memo_format_dw: Data.memo_format_dw,
            sale_bill: Data.sale_bill,
            sale_challan: Data.sale_challan,
            font: Data.font,
            language: Data.language,
            company_status: Data.company_status
          };
        });
    }
  }
};
</script>

<style>
</style>
