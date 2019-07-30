<template>
  <Page actionBarHidden="true">
    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent backgroundColor="#ffffff">
        <Label class="drawer-header" text="TSS" />
        <Label text="Buy" padding="10" backgroundColor="lightgray" />
        <Label class="drawer-item" text="SMS" />
        <Label class="drawer-item" text="Software" />
        <Label class="drawer-item" text="Hardware" />
        <Label text="Support" padding="10" backgroundColor="lightgray" />
        <Label class="drawer-item" text="Hardware" />
        <Label class="drawer-item" text="Software" @tap="goTo('test')" />
        <Label text="Misc" padding="10" backgroundColor="lightgray" />
        <Label class="drawer-item" text="Customer List" @tap="goTo('customer')" />
        <Label class="drawer-item" text="Call Logs" @tap="goTo('plugin')" />
        <Label class="drawer-item" text="About" @tap="goTo('about')" />
      </StackLayout>

      <GridLayout ~mainContent columns="*" rows="*">
        <Frame>
          <Page>
            <ActionBar>
              <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0" />
                <Label class="title" text="Business Plus Plus" col="1" />
              </GridLayout>
            </ActionBar>
            <Label class="message" :text="msg" col="0" row="0" />
            <GridLayout width="150" height="150">
              <Image src="~/assets/images/Logo.jpg" class="img-circle m-y-5" />
            </GridLayout>
          </Page>
        </Frame>
      </GridLayout>
    </RadSideDrawer>
  </Page>
</template>

<script >

import CustomerList from "./CustomerList";
import Plugin from "./Plugin";
import About from "./About";
import Test from "./Test";

export default {
  data() {
    return {
      msg: "Hello World!"
    };
  },
  methods: {
    goTo(page) {
      switch (page) {
        case "customer":
          this.$navigateTo(CustomerList);
          break;
        case "plugin":
          this.$navigateTo(Plugin);
          break;
        case "test":
          this.$navigateTo(Test);
          break;
        default:
          this.$navigateTo(About);
          break;
      }
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #1e21e0;
  color: #ffffff;
}

.title {
  text-align: left;
  padding-left: 16;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}

.drawer-header {
  padding: 50 16 16 16;
  margin-bottom: 16;
  background-color: #1e21e0;
  color: #ffffff;
  font-size: 24;
}

.drawer-item {
  padding: 8 16;
  color: #333333;
  font-size: 16;
}
</style>
