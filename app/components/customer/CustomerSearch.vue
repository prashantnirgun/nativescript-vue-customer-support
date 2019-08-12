<template>
  <Page>
    <ActionBar title="Customer Searcg" />

    <StackLayout>
      <TextField :text="textFieldValue" hint="Customer Name..." />
      <TextField :text="textFieldValue" hint="Gala No..." />

      <StackLayout orientation="horizontal">
        <Button :text="apmc" @tap="getAPMC" />
        <Button :text="market" @tap="getMarket" />
        <Button :text="wing" @tap="getWing" />
      </StackLayout>
      <Button text="search" @tap="getData" class="bg-primary" />
    </StackLayout>
  </Page>
</template>

<script>
//import App from "./App";
export default {
  methods: {
    //  onNavigationButtonTap() {
    //    this.$navigateTo(App);
    //  }
  },
  data() {
    return {
      apmc: "All APMC",
      market: "All Market",
      wing: "All Wing"
    };
  }
};
</script>

<style>
</style>
