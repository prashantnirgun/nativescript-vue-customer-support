import Vue from "vue";
import Vuex from "vuex";
import * as ApplicationSettings from "application-settings";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    customer_id: "",
    language: "English",
    rmn: 0 /*,
    trade: "",
    companyCount: 0,
    coName1: "",
    coName2: "",
    coName3: "",
    coName4: ""
    */
  },
  mutations: {
    load(state) {
      if (ApplicationSettings.getString("store")) {
        this.replaceState(
          Object.assign(
            state,
            JSON.parse(ApplicationSettings.getString("store"))
          )
        );
      }
    },
    save(state, data) {
      state.customer_id = data.customer_id;
      state.language = data.language;
      state.rmn = data.rmn;
      /*state.trade = data.trade;
      state.companyCount = data.companyCount;
      state.coName1 = data.coName1;
      state.coName2 = data.coName2;
      state.coName3 = data.coName3;
      state.coName4 = data.coName4;
      */
    }
  },
  actions: {}
});
