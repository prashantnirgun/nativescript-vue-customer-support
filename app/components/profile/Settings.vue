<template>
  <StackLayout class="form">
    <StackLayout class="input-field">
      <Label text="ID" class="label font-weight-bold m-b-5" />
      <TextField class="input" v-model="customer_id" />
    </StackLayout>
    <StackLayout class="input-field">
      <Label text="Language" class="label font-weight-bold m-b-5" />
      <TextField class="input" v-model="language" />
      <StackLayout class="hr-light"></StackLayout>
    </StackLayout>
    <GridLayout rows="auto, auto" columns="*, *">
      <Button text="Save" @tap="save" class="btn btn-primary" row="0" col="0" />
    </GridLayout>
  </StackLayout>
</template>

<script>
export default {
  data() {
    return {
      customer_id: 0,
      language: "Marathi"
    };
  },
  methods: {}
};
</script>

<style>
</style>
