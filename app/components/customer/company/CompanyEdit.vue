<template>
  <GridLayout rows="auto,*,80">
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
      :source="companyForm"
      :metadata="companyFormMetadata"
      @propertyCommitted="onPropertyCommitted"
      @groupUpdate="onGroupUpdate"
    />
    <StackLayout row="2" orientation="horizontal">
      <Button class="btn btn-primary" text="Submit" @tap="onValidateTap"></Button>
    </StackLayout>
  </GridLayout>
</template>

<script>
import axios from "axios/dist/axios";
var FeedbackPlugin = require("nativescript-feedback");
var feedback = new FeedbackPlugin.Feedback();

export default {
  props: {
    companyData: {
      type: Object,
      default: {
        id: 0,
        customer_id: 0
      }
    }
  },
  data() {
    return {
      isLoading: false,
      fontProvider: [
        { key: "V", label: "VegText" },
        { key: "S", label: "Shivaji" },
        { key: "Tahoma", label: "Tahoma" }
      ],
      formSubmit: false,
      companyForm: {
        id: 0,
        co_id: 0,
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
        company_status: "Active"
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
            groupName: "Hidden",
            editor: "Number",
            hidden: true
          },
          {
            name: "co_id",
            displayName: "Company ID",
            index: 1,
            groupName: "Hidden",
            editor: "Number",
            hidden: true
          },
          {
            name: "branch_id",
            displayName: "Branch ID",
            index: 2,
            groupName: "Hidden",
            editor: "Number",
            hidden: true
          },

          {
            name: "company_name",
            displayName: "Company Name",
            index: 3,
            groupName: "Info",
            editor: "Text",
            validators: [{ name: "NonEmpty" }]
          },
          {
            name: "starting_year",
            displayName: "Books Begins",
            index: 4,
            groupName: "Info",
            editor: "Picker",
            valuesProvider: [
              "JANUARY",
              "FEBRUARY",
              "MARCH",
              "APRIL",
              "MAY",
              "JUNE",
              "JULY",
              "AUGUST",
              "SEPTEMBER",
              "OCTOBER",
              "NOVEMBER",
              "DECEMBER"
            ],
            validators: [{ name: "NonEmpty" }]
          },
          {
            name: "current_year",
            displayName: "Current Year",
            index: 5,
            groupName: "Info",
            editor: "Number",
            validators: [{ name: "NonEmpty" }]
          },
          {
            name: "company_status",
            displayName: "Company Status",
            index: 6,
            groupName: "Personal",
            editor: "Picker",
            valuesProvider: ["Active", "Inactive", "Closed"],
            validators: [{ name: "NonEmpty" }]
          },
          {
            name: "patti_dw",
            displayName: "Patti DW",
            index: 7,
            groupName: "Reports",
            editor: "Text"
          },
          {
            name: "patti_format_dw",
            displayName: "Patti Format",
            index: 8,
            groupName: "Reports",
            editor: "Text"
          },
          {
            name: "memo_dw",
            displayName: "Memo DW",
            index: 9,
            groupName: "Reports",
            editor: "Text"
          },
          {
            name: "memo_format_dw",
            displayName: "Memo Format",
            index: 10,
            groupName: "Reports",
            editor: "Text"
          },
          {
            name: "sale_bill",
            displayName: "Sales Bill",
            index: 11,
            groupName: "Reports",
            editor: "Text"
          },
          {
            name: "sale_challan",
            displayName: "Sales Challan",
            index: 12,
            groupName: "Reports",
            editor: "Text"
          },
          {
            name: "font",
            displayName: "Font",
            index: 13,
            groupName: "Personal",
            editor: "Picker",
            valuesProvider: ["VegText", "Shivaji", "Tahoma"],
            validators: [{ name: "NonEmpty" }]
          },
          {
            name: "language",
            displayName: "Language",
            index: 14,
            groupName: "Personal",
            editor: "Picker",
            valuesProvider: ["English", "Marathi"],
            validators: [{ name: "NonEmpty" }]
          }
        ]
      }
    };
  },
  watch: {
    "companyData.id": function(newValue, oldValue) {
      console.log("companyEdit => id is changed", newValue, oldValue);
      if (this.companyData.action === "C") {
        this.companyForm = {
          id: 0,
          co_id: 1,
          branch_id: 1,
          current_year: 1,
          company_name: "",
          starting_year: 1,
          patti_dw: "",
          patti_format_dw: "",
          memo_dw: "",
          memo_format_dw: "",
          sale_bill: "",
          sale_challan: "",
          font: "VegText",
          language: "Marathi",
          company_status: "A"
        };
      } else {
        if (newValue !== oldValue) {
          this.id = newValue;
          this.getData();
        }
      }
    }
  },
  methods: {
    deleteCompany() {
      console.log("CompanyEdit/Button=delete", this.id);
    },
    onGroupUpdate(args) {
      let nativeGroup = args.group;
      if (args.ios) {
        nativeGroup.collapsible = true;
      } else {
        nativeGroup.setExpandable(true);
      }
    },
    postSubmit() {
      this.$emit("childSubmit");
    },
    onPropertyCommitted(data) {
      //console.log("onPropertyCommitted", data);
    },
    validation(args) {
      console.log("validation", args);
    },
    onValidateTap() {
      let isValid = true;

      const property = this.$refs.dataform.getPropertyByName("font");

      this.$refs.dataform.validateAll().then(result => {
        //console.log(`Validation result: ${result}`);
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
    getDataCode(property, value) {
      switch (property) {
        case "status":
          switch (value.toUpperCase()) {
            case "A":
              return "Active";
              break;
            case "C":
              return "Closed";
              break;
            case "Active":
              return "A";
              break;
            default:
              return "C";
              break;
          }
          break;
        case "font":
          switch (value.toUpperCase()) {
            case "M":
              return "Marathi";
              break;
            case "E":
              return "English";
              break;
            case "Marathi":
              return "M";
              break;
            default:
              return "E";
              break;
          }
          break;
        case "language":
          switch (value.toUpperCase()) {
            case "V":
              return "VegText";
              break;
            case "S":
              return "Shivaji";
              break;
            case "T":
              return "Tahoma";
              break;
            case "VegText":
              return "V";
              break;
            case "Shivaji":
              return "S";
              break;
            default:
              return "T";
              break;
          }
      }
    },
    getData() {
      axios
        .get(
          `https://express-mysql-passport-jwt-api.herokuapp.com/mobile/company/${this.id}`
        )
        .then(response => {
          let Data = response.data[0];
          let font = this.getDataCode("font", Data.font);
          let language = this.getDataCode("font", Data.language);
          let status = this.getDataCode("status", Data.company_status);

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
            font: font,
            language: language,
            company_status: status
          };
        });
    },
    submitData() {
      let data = {
        customer_id: this.customer_id,
        id: this.companyForm.id,
        co_id: this.companyForm.co_id,
        branch_id: this.companyForm.branch_id,
        current_year: this.companyForm.current_year,
        company_name: this.companyForm.company_name,
        starting_year: this.companyForm.starting_year,
        patti_dw: this.companyForm.patti_dw,
        patti_format_dw: this.companyForm.patti_format_dw,
        memo_dw: this.companyForm.memo_dw,
        memo_format_dw: this.companyForm.memo_format_dw,
        sale_bill: this.companyForm.sale_bill,
        sale_challan: this.companyForm.sale_challan,
        font: this.companyForm.font.toString().substring(0, 1),
        language: this.companyForm.language.toString().substring(0, 1),
        company_status: this.companyForm.company_status
          .toString()
          .substring(0, 1)
      };

      axios
        .post(
          `https://express-mysql-passport-jwt-api.herokuapp.com/mobile/company`,
          data
        )
        .then(response => {
          //console.log(response.data);
          if (response.data.changedRows == 1) {
            this.isLoading = false;
            feedback.success({
              title: "successful",
              message: "Data saved.!"
              /*,
              onTap: function() {
                
              },
              onHide: function() {
                
              }
              */
            });
            this.postSubmit();
          } else {
            feedback.error({
              title: "Error",
              message: "Incomeplete Data could not saved"
            });
          }
        });
    }
  }
};
</script>

<style scopped>
DataFormEditorLabel {
  background-color: white;
  width: 80;
  position: left;
}
</style>
