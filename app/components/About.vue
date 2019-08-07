<template>
  <Page>
    <StackLayout>
      <card-view margin="10" elevation="40" radius="1" class="cardStyle">
        <stack-layout class="cardContent">
          <Image
            src="~/assets/images/profile.jpg"
            width="150"
            height="150"
            class="img-circle m-y-5"
          />
          <StackLayout class="hr-light p-y-20"></StackLayout>
          <label text="Name : Prashant Nirgun" class="info" />
          <label text="Email : info@tss.net.in" />
          <label text="Contact : 9324360777" />
          <StackLayout orientation="horizontal">
            <Button
              :text="'fa-comment' | fonticon"
              class="fa take-picture-icon btn-primary"
              color="green"
              @tap="sms"
            />
            <Button
              :text="'fa-phone-volume' | fonticon"
              class="fa take-picture-icon"
              color="blue"
              @tap="call"
            />
            <Button class="fa take-picture-icon" @tap="setVerbose">{{'fa-search' | fonticon}} Search</Button>
          </StackLayout>
        </stack-layout>
      </card-view>
    </StackLayout>
  </Page>
</template>

<script>
import * as permissions from "nativescript-permissions";
import * as phone from "nativescript-phone";

export default {
  methods: {
    setVerbose() {
      console.log("store output");
      this.$store.commit("setVerbose", true);
      console.log(this.$store.state.verbose);
    },
    call() {
      permissions
        .requestPermission(
          android.Manifest.permission.CALL_PHONE,
          "I need these permissions because I'm cool"
        )
        .then(() => {
          console.log("Woo Hoo, I have the power!");
          phone.dial("9324360777", false).then(
            args => {
              console.log("call response", args);
            },
            err => {
              console.log("Error: " + err);
            }
          );
        })
        .catch(() => {
          console.log("Uh oh, no permissions - plan B time!");
        });
    },
    sms() {
      //New Method for single number is phone.sms(["212-555-1234"],"My Message")
      phone.sms("9324360777", "My test messageMessage").then(function(args) {
        /// args.reponse: "success", "cancelled", "failed"
        console.log("SMS response", args);
      });
    }
  }
};
</script>

<style scoped>
.cardStyle {
  background-color: #fff;
  color: rgb(43, 43, 43);
}

.cardContent {
  padding: 20;
  font-weight: bold;
  font-size: 25;
}

.take-picture-icon {
  horizontal-align: center;
  padding: 15;
  border-width: 1.2;
  border-color: black;
  border-radius: 14;

  color: black;

  width: auto;
}
</style>
