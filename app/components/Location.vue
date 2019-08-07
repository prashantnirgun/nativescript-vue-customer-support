<template>
  <Page class="page">
    <ActionBar title="Attendance" />

    <StackLayout class="home-panel">
      <Button class="btn btn-primary fa" @tap="getLocation">{{'fa-map-marker' | fonticon}} Location</Button>
      <RadDataForm :source="customerForm" :metadata="customerFormMetadata" />
      <Button class="btn btn-primary fa" @tap="submitData">{{'fa-upload' | fonticon}} Submit</Button>
      <ActivityIndicator
        row="0"
        width="100"
        height="100"
        borderRadius="50"
        :busy="isLoading"
        :visibility="isLoading? 'visible' : 'collapsed'"
      />
    </StackLayout>
  </Page>
</template>

<script>
const geolocation = require("nativescript-geolocation");
const { Accuracy } = require("tns-core-modules/ui/enums");
import format from "date-fns/format";
import axios from "axios/dist/axios";
import { getByKeys, getByValues } from "../helper";
var FeedbackPlugin = require("nativescript-feedback");
var feedback = new FeedbackPlugin.Feedback();
const employeeList = { 1: "Prashant Nirgun", 2: "Amol Tajane" };

export default {
  data() {
    return {
      isLoading: false,
      speed: "",
      addr: "",
      customerForm: {
        employeeName: "Amol Tajane",
        attendance_date: format(Date(), "DD-MM-YYYY"),
        time: format(Date(), "HH:mm:SS"),
        latitude: "",
        longitude: "",
        day_status: "Absent",
        method: "In"
      },
      customerFormMetadata: {
        isReadOnly: false,
        commitMode: "Immediate",
        validationMode: "Immediate",
        propertyAnnotations: [
          {
            name: "employeeName",
            displayName: "Person",
            index: 0,
            editor: "Picker",
            valuesProvider: ["Amol Tajane", "Prashant Nirgun"]
          },
          {
            name: "attendance_date",
            displayName: "Date",
            index: 1,
            editor: "Label"
          },
          {
            name: "time",
            displayName: "Time",
            index: 2,
            editor: "Label"
          },
          {
            name: "latitude",
            displayName: "Latitute",
            index: 3,
            editor: "Label"
          },
          {
            name: "longitude",
            displayName: "Longitude",
            index: 4,
            editor: "Label"
          },
          {
            name: "day_status",
            displayName: "Day Status",
            index: 5,
            editor: "Picker",
            valuesProvider: ["Absent", "Present", "Sunday", "Holiday"]
          },
          {
            name: "method",
            displayName: "Type",
            index: 6,
            editor: "SegmentedEditor",
            valuesProvider: ["In", "Out"]
          }
        ]
      }
    };
  },
  methods: {
    submitData() {
      //console.log("data submited", this.customerForm);
      this.isLoading = true;
      console.log("employee====>");

      console.log("employee", this.customerForm.method);
      let id = getByValues(employeeList, this.customerForm.employeeName);
      console.log("employee", id);

      let data = {
        employee_id: getByValues(employeeList, this.customerForm.employeeName),
        attendance_date: format(
          this.customerForm.attendance_date,
          "YYYY-MM-DD"
        ),
        time: this.customerForm.time,
        latitude: this.customerForm.latitude,
        longitude: this.customerForm.longitude,
        day_status: this.customerForm.day_status.toString().substring(0, 1),
        method: this.customerForm.method.toString().substring(0, 1)
      };
      console.log(data);

      axios
        .post(
          `https://express-mysql-passport-jwt-api.herokuapp.com/mobile/attendance`,
          data
        )
        .then(response => {
          this.isLoading = false;
          feedback.success({
            title: "successful",
            message: "Sign In Successful.!"
          });
        })
        .catch(error => {
          this.isLoading = false;
          feedback.error({
            title: "Error",
            message: "Incomeplete Data could not saved"
          });
        });
    },
    getLocation() {
      console.log("method is called");
      geolocation
        .getCurrentLocation({
          desiredAccuracy: Accuracy.high,
          maximumAge: 5000,
          timeout: 20000
        })
        .then(res => {
          //console.log("got response", res);
          this.latitude = res.latitude;
          this.longitude = res.longitude;
          this.speed = res.speed;

          this.customerForm = {
            ...this.customerForm,
            latitude: res.latitude.toString(),
            longitude: res.longitude.toString()
          };

          // get the address (REQUIRES YOUR OWN GOOGLE MAP API KEY!)
          fetch(
            "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
              res.latitude +
              "," +
              res.longitude +
              "&key=YOUR-API-KEY"
          )
            .then(response => response.json())
            .then(r => {
              this.addr = r.results[0].formatted_address;
            });
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  },
  mounted() {
    //geolocation.enableLocationRequest();
    this.getLocation();
  }
};
</script>

<style scoped>
</style>
