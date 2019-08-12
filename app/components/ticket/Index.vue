<template>
  <Page>
    <ActionBar title="Ticketing">
      <ActionItem
        @tap="showSearch"
        ios.systemIcon="9"
        ios.position="left"
        android.systemIcon="ic_input_add"
        android.position="actionBar"
      />

      <ActionItem
        @tap="showSearch"
        ios.systemIcon="9"
        ios.position="left"
        android.systemIcon="ic_menu_search"
        android.position="actionBar"
      />
    </ActionBar>

    <TabView :selectedIndex="selectedIndex" @selectedIndexChange="selectedIndex = $event.value">
      <TabViewItem title="Dashboard">
        <Label text="Dashaord" textWrap="true" />
      </TabViewItem>
      <TabViewItem title="Ticket List">
        <Label text="Ticket List" textWrap="true" />
      </TabViewItem>
      <TabViewItem title="Reply">
        <Label text="Reply" textWrap="true" />
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0
    };
  }
};
</script>