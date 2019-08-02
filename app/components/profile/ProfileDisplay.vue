<template>
  <Page>
    <ActionBar title="Customer Profile" class="action-bar" />
    <TabView>
      <TabViewItem title="Personal">
        <StackLayout>
          <Label text="This is Label in Tab 1" />
          <TextField hint="Customer ID" v-model="input.customer_id" />
          <TextField hint="RMN" v-model="input.rmn" keyboardType="number" />

          <Button text="load" @tap="load" />
          <Button text="save" @tap="save" />
        </StackLayout>
      </TabViewItem>
      <TabViewItem title="Company">
        <StackLayout>
          <Label text="This is Label in Tab 2" />
          <Button text="go" />
        </StackLayout>
      </TabViewItem>
      <TabViewItem title="Settings">
        <StackLayout>
          <Settings />
        </StackLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
/*
https://www.nativescript.org/blog/key-value-local-storage-in-a-vue.js-nativescript-app-with-vuex
*/
import Settings from "./Settings";
import * as ApplicationSettings from "application-settings";
export default {
  components: {
    Settings
  },
  mounted() {
    this.$store.subscribe((mutations, state) => {
      ApplicationSettings.setString("store", JSON.stringify(state));
      this.input.customer_id = state.customer_id;
      this.input.language = state.language;
      this.input.rmn = state.rmn;
      /*
      this.input.trade = state.trade;
      this.input.companyCount = state.companyCount;
      this.input.coName1 = state.coName1;
      this.input.coName2 = state.coName2;
      this.input.coName3 = state.coName3;
      this.input.coName4 = state.coName4;
      */
      console.log("state data", state.customer_id, state.language, state.rmn);
    });
  },
  data() {
    return {
      input: {
        customer_id: "",
        language: "English",
        rmn: 555 /* ,
        trade: "",
        companyCount: 0,
        coName1: "",
        coName2: "",
        coName3: "",
        coName4: ""
        */
      }
    };
  },
  methods: {
    load() {
      this.$store.commit("load");
      //console.log("index", this.tabIndex);
    },
    save() {
      this.$store.commit("save", this.input);
    },
    tabIndex({ arg }) {
      console.log(arg);
    }
  }
};
</script>

<style>
</style>
