<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Person"></ActionBar>
    <StackLayout class="form">
      <StackLayout class="input-field">
        <Label text="First Name" class="label font-weight-bold m-b-5" />
        <TextField class="input" v-model="input.firstname" />
        <StackLayout class="hr-light"></StackLayout>
      </StackLayout>
      <StackLayout class="input-field">
        <Label text="Last Name" class="label font-weight-bold m-b-5" />
        <TextField class="input" v-model="input.lastname" />
        <StackLayout class="hr-light"></StackLayout>
      </StackLayout>
      <GridLayout rows="auto, auto" columns="*, *">
        <Button text="Save" @tap="save" class="btn btn-primary" row="0" col="0" />
        <Button text="Load" @tap="load" class="btn btn-primary" row="0" col="1" />
        <Button text="Clear" @tap="clear" class="btn btn-primary" row="1" col="0" colspan="2" />
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import * as ApplicationSettings from "application-settings";
export default {
  data() {
    return {
      input: {
        firstname: "",
        lastname: ""
      }
    };
  },
  mounted() {
    this.$store.subscribe((mutations, state) => {
      ApplicationSettings.setString("store", JSON.stringify(state));
      this.input.firstname = state.firstname;
      this.input.lastname = state.lastname;
    });
  },
  methods: {
    save() {
      this.$store.commit("save", this.input);
    },
    load() {
      this.$store.commit("load");
    },
    clear() {
      this.input.firstname = "";
      this.input.lastname = "";
    }
  }
};
</script>