<template>
  <Page :class="{ dialogOpen: dialogOpen }">
    <StackLayout>
      <AbsoluteLayout class="dialog-wrapper">
        <GridLayout rows="*,80" class="dialog">
          <StackLayout row="0" orientation="vertical">
            <RadDataForm
              ref="dataform"
              :source="searchForm"
              :metadata="searchFormMeta"
              @editorUpdate="onEditorUpdate($event)"
            />
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
      <RadListView for="item in items" marginTop="5" @itemTap="onTap">
        <v-template>
          <GridLayout class="card" columns="2,75,90,90,100,2" rows="25,30,auto,auto">
            <Label
              :text="item.date"
              fontWeight="bold"
              textWrap="true"
              marginRight="15"
              textAlignment="center"
              color="blue"
              row="0"
              col="1"
              rowSpan="2"
            />
            <Label text="Check In" fontWeight="bold" color="green" row="0" col="2" />
            <Label text="Check Out" fontWeight="bold" color="green" row="0" col="3" />
            <Label
              :text="getDayStatus(item.day_status)"
              color="green"
              fontWeight="bold"
              row="0"
              col="4"
            />
            <Label
              v-if="item.expand"
              text="Latitude"
              fontWeight="bold"
              color="green"
              row="2"
              col="1"
            />
            <Label
              v-if="item.expand"
              text="Longitude"
              fontWeight="bold"
              color="green"
              row="3"
              col="1"
            />

            <!-- <Label :text="item.attendance_date" row="1" col="1"  /> -->
            <Label :text="item.check_in" row="1" col="2" />
            <Label :text="item.check_out" row="1" col="3" />
            <Label row="1" col="4">{{item.hours}} Hrs.</Label>

            <Label v-if="item.expand" :text="item.check_in_latitude" row="2" col="2" />
            <Label v-if="item.expand" :text="item.check_in_longitude" row="3" col="2" />

            <Label v-if="item.expand" :text="item.check_out_latitude" row="2" col="3" />

            <Label v-if="item.expand" :text="item.check_out_longitude" row="3" col="3" />
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
import { type } from "os";
var FeedbackPlugin = require("nativescript-feedback");
var feedback = new FeedbackPlugin.Feedback();
const employeeList = {
  1: "Prashant Nirgun",
  2: "Amol Tajane",
  3: "Santosh Bochare"
};
const statusList = {
  X: "All",
  A: "Absent",
  P: "Present",
  S: "Sunday",
  H: "Holiday"
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
      id_old: -1,
      items: [],
      searchForm: {
        employeeName: "Amol Tajane",
        start_date: "",
        end_date: "",
        day_status: "All"
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
          },
          {
            name: "day_status",
            displayName: "Day Status",
            index: 3,
            editor: "Picker",
            valuesProvider: ["All", "Absent", "Present", "Sunday", "Holiday"]
          }
        ]
      }
    };
  },
  methods: {
    onTap(event) {
      if (this.id_old !== event.item.id && this.id_old >= 0) {
        this.items[this.id_old].expand = false;
      }
      event.item.expand = !event.item.expand;
      this.id_old = event.item.id;
      console.log(event.item.id, event.index);
    },

    expand(id) {
      if (id == this.id_old) {
        // this.id_old = id;
        return true;
      }
      return false;
    },
    getDayStatus(status) {
      switch (status) {
        case "A":
          return "Absent";
          break;
        case "P":
          return "Present";
          break;
        case "H":
          return "Holiday";
          break;
        default:
          return "Sunday";
          break;
      }
    },
    onEditorUpdate(args) {
      //console.log("EDITOR UPDATED", args.editor);
      if (args.propertyName === "start_date") {
        //args.editor.setDateFormat(this.simpleDateFormat);
      }
    },
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
        end_date: this.searchForm.end_date,
        day_status: getByValues(statusList, this.searchForm.day_status)
      };
      console.log("data ready to send", data, this.searchForm.start_date);

      axios
        .get(
          `https://express-mysql-passport-jwt-api.herokuapp.com/mobile/attendance`,
          { params: data }
        )
        .then(response => {
          console.log(response.data);
          this.isLoading = false;
          let data = [];
          response.data.map(item => {
            data.push({ ...item, expand: false });
          });
          this.items = data;
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
