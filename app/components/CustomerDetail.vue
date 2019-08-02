<template>
  <Page>
    <ActionBar title="Customer Detail" class="action-bar" />

    <TabView :selectedIndex="selectedIndex" @selectedIndexChange="selectedIndex = $event.value">
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
      companyData: {},
      selectedIndex: 0
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
    ///onItemTap(event) {
    //console.log(event.index);
    //console.log(event.item.co_id);
    //this.co_id = event.item.co_id;
    //},
    onClickChild(obj) {
      this.companyData = {
        id: obj.id,
        customer_id: this.customer_id,
        action: obj.action
      };
      this.selectedIndex = 2;
      console.log("received from child", obj);
    },
    onChildSubmit() {
      this.selectedIndex = 1;
    }
  }
};
</script>

<style scoped>
</style>
