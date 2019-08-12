<template>
  <StackLayout class="border">
    <RadDataForm
      ref="dataform"
      :source="searchForm"
      :metadata="searchFormMeta"
      border-color="blue"
    />
    <StackLayout orientation="horizontal">
      <Button text="Search" class="btn btn-primary" />
      <Button text="Close" class="btn btn-primary" />
    </StackLayout>
  </StackLayout>
</template>

<script>
import format from "date-fns/format";
export default {
  data() {
    return {
      searchForm: {
        employeeName: "Amol Tajane",
        startDate: format(Date(), "DD-MM-YYYY"),
        endDate: format(Date(), "DD-MM-YYYY"),
        date_status: "All"
      },
      searchFormMeta: {
        isReadOnly: false,
        commitMode: "Immediate",
        validationMode: "Immediate",
        propertyAnnotations: [
          {
            name: "employeeName",
            displayName: "Person",
            groupName: "Criteria",
            index: 0,
            editor: "Picker",
            valuesProvider: ["Amol Tajane", "Prashant Nirgun"]
          },
          {
            name: "startDate",
            displayName: "Start Date",
            groupName: "Criteria",
            index: 1,
            editor: "DatePicker"
          },
          {
            name: "endDate",
            displayName: "End Date",
            groupName: "Criteria",
            index: 2,
            editor: "DatePicker"
          },
          {
            name: "date_status",
            displayName: "Day Status",
            groupName: "Criteria",
            index: 3,
            editor: "Picker",
            valuesProvider: ["All", "Absent", "Present", "Sunday", "Holiday"]
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
.border {
  padding: 5;
  margin: 5;
  border-color: #303f9f;
  border-width: 2;
  border-radius: 5;
}
</style>
