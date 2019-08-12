<template>
  <Page :class="{ dialogOpen: dialogOpen }">
    <StackLayout>
      <AbsoluteLayout class="dialog-wrapper">
        <GridLayout rows="*,80" class="dialog">
          <StackLayout row="0" orientation="vertical">
            <RadDataForm ref="dataform" :source="searchForm" :metadata="searchFormMeta" />
          </StackLayout>
          <StackLayout row="1" orientation="horizontal">
            <Button class="btn btn-primary" text="Search" @tap="submitForm"></Button>
            <Button class="btn btn-orange btn-rounded-sm" text="Cancel" @tap="closeDialog"></Button>
          </StackLayout>
        </GridLayout>
      </AbsoluteLayout>

      <ActivityIndicator
        row="0"
        width="100"
        height="100"
        borderRadius="50"
        :busy="isLoading"
        :visibility="isLoading? 'visible' : 'collapsed'"
      />
      <RadListView for="item in items" marginTop="5">
        <v-template>
          <GridLayout class="card" columns="2,50,40,60,60,60,60,2" rows="25,25">
            <Label
              :text="item.month"
              fontWeight="bold"
              textWrap="true"
              textAlignment="center" marginTop="5" marginRight="5" color="blue"
              row="0"
              col="1"
              rowSpan="2"
            />
            <Label text="Days" fontWeight="bold" color="green" row="0" col="2" />
            <Label text="Sunday" fontWeight="bold" color="green" row="0" col="3" />
            <Label text="Holiday" fontWeight="bold" color="green" row="0" col="4" />
            <Label text="Absent" fontWeight="bold" color="green" row="0" col="5" />
            <Label text="Present" fontWeight="bold" color="green" row="0" col="6" />

            <Label :text="item.total" textAlignment="center" row="1" col="2" />
            <Label :text="item.Sunday" textAlignment="center" row="1" col="3" />
            <Label :text="item.Holiday" textAlignment="center" row="1" col="4" />
            <Label :text="item.Absent" textAlignment="center" row="1" col="5" />
            <Label :text="item.Present" textAlignment="center" row="1" col="6" />
          </GridLayout>
        </v-template>
      </RadListView>
    </StackLayout>
  </Page>
</template>

<script>
import format from "date-fns/format";
import axios from "axios/dist/axios";
import { getByValues } from "../../helper";
var FeedbackPlugin = require("nativescript-feedback");
var feedback = new FeedbackPlugin.Feedback();
const employeeList = {
  1: "Prashant Nirgun",
  2: "Amol Tajane",
  3: "Santosh Bochare"
};

export default {
  mounted() {
    console.log(this.searchForm.start_date);
  },
  props: {
    isSearch: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  watch: {
    isSearch: function(val) {
      if (val) {
        this.showDialog();
      } else {
        this.closeDialog();
      }
      //this.dialogOpen = this.isSearch = val;
      console.log("List watcher isSearch", this.isSearch, val);
    }
  },
  data() {
    return {
      isLoading: false,
      dialogOpen: false,
      items: [],
      searchForm: {
        employeeName: "Amol Tajane",
        start_date: "",
        end_date: ""
      },
      searchFormMeta: {
        isReadOnly: false,
        commitMode: "Immediate",
        validationMode: "Immediate",
        propertyAnnotations: [
          {
            name: "employeeName",
            displayName: "Person",
            index: 0,
            editor: "Picker",
            valuesProvider: [
              "Amol Tajane",
              "Prashant Nirgun",
              "Santosh Bochare"
            ]
          },
          {
            name: "start_date",
            displayName: "Start Date",
            index: 1,
            editor: "DatePicker"
          },
          {
            name: "end_date",
            displayName: "End Date",
            index: 2,
            editor: "DatePicker"
          }
        ]
      }
    };
  },
  methods: {
    showDialog() {
      this.dialogOpen = true;
      console.log("showDialog called");
    },
    submitForm() {
      this.dialogOpen = false;
      this.isLoading = true;
      let data = {
        employee_id: getByValues(employeeList, this.searchForm.employeeName),
        start_date: this.searchForm.start_date,
        end_date: this.searchForm.end_date
      };
      console.log("data ready to send", data, this.searchForm.start_date);

      axios
        .get(
          `https://express-mysql-passport-jwt-api.herokuapp.com/mobile/attendance-summary`,
          { params: data }
        )
        .then(response => {
          console.log(response.data);
          this.isLoading = false;
          this.items = response.data;
        })
        .catch(error => {
          this.isLoading = false;
          feedback.error({
            title: "Error",
            message: "Incomeplete Data could not saved"
          });
        });
    },
    closeDialog() {
      //this.$set("isSearch", false);
      //this.isSearch = false;
      this.dialogOpen = false;
      console.log(
        "**********************inside closeDialog()******",
        this.isSearch
      );

      this.$emit("searchHandler", false);
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

  padding: 10;
}

.dialog label {
  margin: 0 15 15 15;
  color: black;
}
</style>
