<template>
  <Page class="page">
    <ActionBar title="Pull to Refresh Example" class="action-bar" />

   
     <StackLayout>
      <RadListView ref="listView"
                   for="item in itemList"
                   pullToRefresh="true"
                   layout="staggered"
                   gridSpanCount="4"
                   itemHeight="100"
                   @itemTap="onItemTap"
                   @pullToRefreshInitiated="onPullToRefreshInitiated">
                   <v-template name="header">
          <Label text="List header"></Label>
        </v-template>
        
        <v-template>
          <StackLayout class="item" orientation="vertical">
            <Label :text="item.name" class="nameLabel"></Label>
            <Image :src="item.imageSrc"></Image>
          </StackLayout>
        </v-template>

        <v-template name="footer">
          <Label text="List footer"></Label>
        </v-template>

      </RadListView>
    </StackLayout>
    
  </Page>
</template>


<script>
import { ObservableArray } from 'tns-core-modules/data/observable-array';

export default {
  methods: {
    refreshList(args) {
      var pullRefresh = args.object;
      setTimeout(function() {
        pullRefresh.refreshing = false;
      }, 1000);
    },
    onPullToRefreshInitiated ({ object }) {
      console.log('Pulling...');
      // in order to avoid race conditions (only on iOS),
      // in which the UI may not be completely updated here
      // we use this.$nextTick call
      this.$nextTick(() => {
        this.itemList.push({
          name: 'India',
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png"
        });
        object.notifyPullToRefreshFinished();
      });
    }
  },
  data() {
    return {
      itemList : [
        {
          name: "Australia",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png"
        },
        {
          name: "Belgium",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png"
        },
        {
          name: "Bulgaria",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png"
        },
        {
          name: "Canada",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ca.png"
        },
        {
          name: "Switzerland",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ch.png"
        },
        {
          name: "China",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cn.png"
        },
        {
          name: "Czech Republic",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cz.png"
        },
        {
          name: "Germany",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/de.png"
        },
        {
          name: "Spain",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/es.png"
        },
        {
          name: "Ethiopia",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/et.png"
        },
        {
          name: "Croatia",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hr.png"
        },
        {
          name: "Hungary",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hu.png"
        },
        {
          name: "Italy",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/it.png"
        },
        {
          name: "Jamaica",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/jm.png"
        },
        {
          name: "Romania",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ro.png"
        },
        {
          name: "Russia",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ru.png"
        },
        {
          name: "United States",
          imageSrc: "https://play.nativescript.org/dist/assets/img/flags/us.png"
        }
      ]
    };
  }
};
</script>

<style>
</style>
