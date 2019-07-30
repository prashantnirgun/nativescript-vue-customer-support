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
    </StackLayout>
  </GridLayout>
</template>

<script>
import axios from "axios/dist/axios";
export default {
  props: {
    id: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      companyForm: {
        id: 0,
        co_id: 0
        /*,
        branch_id: "0",
        current_year: "",
        company_name: "",
        starting_year: "",
        patti_dw: "",
        patti_format_dw: "",
        memo_dw: "",
        memo_format_dw: "",
        sale_bill: "",
        sale_challan: "",
        font: "VegText",
        language: "Marathi",
        company_status: false
        */
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
            editor: "Number"
          },
          {
            name: "co_id",
            displayName: "Company ID",
            index: 0,
            groupName: "Personal",
            editor: "Number"
          } /*,
          {
            name: "branch_id",
            displayName: "Branch ID",
            index: 1,
            groupName: "Personal",
            editor: "Number"
          },
          {
            name: "current_year",
            displayName: "Current Year",
            index: 2,
            groupName: "Personal",
            editor: "Number"
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
          */
        ]
      }
    };
  },
  watch: {
    id: function(newValue, oldValue) {
      console.log("companyEdit => id is changed", newValue, oldValue);

      if (newValue !== oldValue) {
        this.id = newValue;
        this.getData();
      }
    }
  },
  methods: {
    onPropertyCommitted(data) {
      console.log("onPropertyCommitted");
    },
    validation(args) {
      console.log("validation", args);
    }
  }
};
</script>

<style>
</style>
