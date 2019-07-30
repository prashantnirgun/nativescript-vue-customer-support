<template>
  <Page>
    <ActionBar title="Plugin Example" class="action-bar" />
    <StackLayout>
      <Button text="cardlayout" class="btn btn-primary" />
      <Button text="Toast" class="btn btn-primary" @tap="onToastTap" />
      <Button text="Fancy Alert" class="btn btn-primary" @tap="onFancyTap" />
      <Button text="Publish" class="btn btn-primary" @tap="onFeedbackTap" />
      <Button text="Pull to Refresh" class="btn btn-primary" @tap="onGoTo" />

      <card-view margin="5" elevation="40" radius="1" class="cardStyle">
        <stack-layout class="cardContent" rows="auto">
          <GridLayout rows="35,30" columns="100,100,*,*,*,*">
            <Label
              class="h2 text-uppercase"
              text="The Software Source"
              row="0"
              col="0"
              colspan="6"
            />
            <Label class="heading" text="Books :" row="1" col="0" />
            <Label class="content" text="April" row="1" col="1" />
            <Label class="heading" text="CO :" row="1" col="2" />
            <Label class="content" text="1" row="1" col="3" />
            <Label class="heading" text="YR :" row="1" col="4" />
            <Label class="content" text="12" row="1" col="5" />
          </GridLayout>
        </stack-layout>
      </card-view>
    </StackLayout>
  </Page>
</template>

<script>
import * as Toast from "nativescript-toast";
//import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";
var FeedbackPlugin = require("nativescript-feedback");
var feedback = new FeedbackPlugin.Feedback();
import Pull from "./Pull";
export default {
  methods: {
    onGoTo() {
      this.$navigateTo(Pull);
    },
    onToastTap() {
      var toast = Toast.makeText("Hello Swara");
      toast.show();
    },
    onFancyTap() {
      /*
      TNSFancyAlert.showSuccess(
        "Success!",
        "Fancy alerts are nice.",
        "Yes they are!"
      );
      */
      console.log("facncy alert testing");
    },
    onFeedbackTap() {
      feedback.success({
        title: "Success",
        message: "Easiest thing ever, right?"
      });
    }
  }
};
</script>

<style scoped>
.cardStyle {
  background-color: #bada55;
  color: #fff;
}

.cardContent {
  padding: 15;
}

.content {
  font-size: 20;
}

.heading {
  font-size: 20;
  font-weight: bold;
}
</style>
