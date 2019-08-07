<template>
  <Page>
    <ActionBar title="Home" class="action-bar" />
    <RadListView for="item in items" key="item.name" @itemTap="onTap">
      <v-template>
        <StackLayout class="card">
          <GridLayout columns="50,*" rows="50">
            <Image v-if="item.trade === 'veg'" src="~/assets/images/fruits-icon.png" col="0" />
            <Image v-else src="~/assets/images/Cabbage-icon.png" col="0" />
            <GridLayout col="1" columns="*,90" rows="*,*">
              <Label :text="item.name" row="0" col="0" />
              <Label :text="item.gala" row="0" col="1" />
              <Image
                v-if="item.expand"
                src="~/assets/images/Arrow-Down-icon.png"
                row="1"
                col="1"
                class="pull-right"
              />
              <Image
                v-else
                src="~/assets/images/Arrow-Up-icon.png"
                row="1"
                col="1"
                class="pull-right"
              />
            </GridLayout>
          </GridLayout>
          <StackLayout v-if="item.expand">
            <StackLayout orientation="horizontal">
              <Button
                :text="'fa-phone' | fonticon"
                class="btn-round fa"
                backgroundColor="red"
                @tap
              />
              <Button
                :text="'fa-comment' | fonticon"
                class="btn-round fa"
                backgroundColor="gree"
                @tap
              />
              <Button
                :text="'fa-edit' | fonticon"
                class="btn-round fa"
                backgroundColor="orange"
                @tap
              />
              <Button
                :text="'fa-list' | fonticon"
                class="btn-round fa"
                backgroundColor="blue"
                @tap
              />
              <Button
                :text="'fa-magnet' | fonticon"
                class="btn-round fa"
                backgroundColor="pink"
                @tap
              />
            </StackLayout>
            <StackLayout orientation="horizontal">
            <Button class="btn btn-primary fa">{{'fa-phone' | fonticon}} Call</Button>
            <Button class="btn btn-primary fa">{{'fa-comment' | fonticon}} SMS</Button>
            </StackLayout>
          </StackLayout>
        </StackLayout>
      </v-template>
    </RadListView>
  </Page>
</template>

<script>
import { ObservableArray } from "tns-core-modules/data/observable-array";

export default {
  methods: {
    onTap(event) {
      if (this.id_current !== event.item.id && this.id_current >= 0) {
        this.items[this.id_current].expand = false;
      }
      event.item.expand = !event.item.expand;
      this.id_current = event.item.id;
      console.log(event.item.id, event.index);
    }
  },
  data() {
    return {
      textFieldValue: "",
      id_current: -1,
      getClass: false,
      items: [
        {
          id: 0,
          name: "Australia",
          gala: "A-14",
          trade: "veg",
          expand: false
        },
        {
          id: 1,
          name: "Belgium",
          gala: "A-14",
          trade: "veg",
          expand: false
        },
        {
          id: 2,
          name: "Bulgaria",
          gala: "A-14",
          trade: "veg",
          expand: false
        },
        {
          id: 3,
          name: "Canada",
          gala: "A-14",
          trade: "veg",
          expand: false
        },
        {
          id: 4,
          name: "Switzerland",
          gala: "A-14",
          trade: "veg",
          expand: false
        },
        {
          id: 5,
          name: "China",
          gala: "A-14",
          trade: "veg",
          expand: false
        },
        {
          id: 6,
          name: "Czech Republic",
          gala: "A-14",
          trade: "veg",
          expand: false
        },
        {
          id: 7,
          name: "Germany",
          gala: "A-14",
          trade: "veg",
          expand: false
        },
        {
          id: 8,
          name: "Spain",
          gala: "G-214",
          trade: "fruit",
          expand: false
        },
        {
          id: 9,
          name: "Ethiopia",
          gala: "G-215",
          trade: "fruit",
          expand: false
        },
        {
          id: 10,
          name: "Croatia",
          gala: "G-216",
          trade: "fruit",
          expand: false
        },
        {
          id: 11,
          name: "Hungary",
          gala: "G-217",
          trade: "fruit",
          expand: false
        },
        {
          id: 12,
          name: "Italy",
          gala: "G-218",
          trade: "fruit",
          expand: false
        },
        {
          id: 13,
          name: "Jamaica",
          gala: "G-219",
          trade: "fruit",
          expand: false
        },
        {
          id: 14,
          name: "Romania",
          gala: "G-220",
          trade: "fruit",
          expand: false
        },
        {
          id: 15,
          name: "Russia",
          gala: "G-221",
          trade: "fruit",
          expand: false
        },
        {
          id: 16,
          name: "United States",
          gala: "G-222",
          trade: "fruit",
          expand: false
        }
      ]
    };
  }
};
</script>
<style>
.card {
  margin: 2;
  border-radius: 20;
  padding: 5;
  border-color: rgb(32, 233, 216);
  border-width: 2;
}

.btn-round {
  margin: 5;
  padding-left: 10;
  padding-right: 10;
  font-size: 30;
  height: 52;
  width: 52;
  border-radius: 50%;
  border-color: red;
}
</style>