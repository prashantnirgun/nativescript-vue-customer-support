<template>
  <Page>
    <ActionBar title="Attendance">
      <ActionItem
        @tap="showSearch"
        ios.systemIcon="9"
        ios.position="left"
        android.systemIcon="ic_menu_search"
        android.position="actionBar"
      />
    </ActionBar>

    <TabView :selectedIndex="selectedIndex" @selectedIndexChange="selectedIndex = $event.value">
      <TabViewItem title="Attendance">
        <Location />
      </TabViewItem>
      <TabViewItem title="List">
        <List :isSearch="isMonthlySearch" @searchHandler="isMonthlySearch = $event" />
      </TabViewItem>
      <TabViewItem title="Summary">
        <Summary :isSearch="isSummarySearch" @searchHandler="isSummarySearch = $event" />
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import Location from "./Location";
import Summary from "./Summary";
import List from "./List";

export default {
  watch: {
    isMonthlySearch: function() {
      console.log("isMonthlySearch watcher ======>", this.isMonthlySearch);
    }
  },
  components: {
    Location,
    List,
    Summary
  },
  data() {
    return {
      isMonthlySearch: false,
      isSummarySearch: false,
      selectedIndex: 0
    };
  },
  methods: {
    ev(data) {
      console.log("=================>from child", data, this.isMonthlySearch);
    },
    showSearch() {
      console.log("search button before", this.isMonthlySearch);
      switch (this.selectedIndex) {
        case 1:
          this.isMonthlySearch = !this.isMonthlySearch;
          break;
        case 2:
          this.isSummarySearch = !this.isSummarySearch;
          break;
        default:
          break;
      }

      console.log("after", this.isMonthlySearch);
    }
  }
};
</script>

<style>
</style>
