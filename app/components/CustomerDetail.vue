<template>
  <Page>
    <ActionBar title="Customer Detail" class="action-bar" />

    <TabView ref="tab">
      <TabViewItem title="Customer">
        <CustomerEdit :customer_id="customer_id" />
      </TabViewItem>
      <TabViewItem title="Co List">
        <CompanyList :customer_id="customer_id" @clicked="onClickChild" />
      </TabViewItem>
      <TabViewItem title="Co Detail">
        <CompanyEdit :companyData="companyData" @childSubmit="onChildSubmit" />
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
//import axios from "axios/dist/axios";
import CustomerEdit from "./CustomerEdit";
import CompanyEdit from "./CompanyEdit";
import CompanyList from "./CompanyList";

export default {
  components: {
    CustomerEdit,
    CompanyEdit,
    CompanyList
  },
  data() {
    return {
      companyData: {}
    };
  },
  props: {
    customer_id: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  methods: {
    onItemTap(event) {
      //console.log(event.index);
      //console.log(event.item.co_id);
      //this.co_id = event.item.co_id;
    },
    onClickChild(obj) {
      this.companyData = {
        id: obj.id,
        customer_id: this.customer_id,
        action: obj.action
      };

      console.log("received from child", obj);
    },
    onChildSubmit() {
      //this.$refs.tab.selectedIndex = 1;
      //this.$refs.tab.set("selectedIndex", 1);
      //console.log("going to change tab", this.$refs.tab);
      //this.$refs.tab.tabSelectedIndex = 1;
    }
  }
};
</script>

<style scoped>
</style>
