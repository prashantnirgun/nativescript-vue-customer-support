<template>
<Page>
  <CompanyList :customer_id="customer_id" />
</Page>
  
</template>

<script>
import CompanyList from "./CompanyList";

export default {
  components: {
    CompanyList
  },
  data() {
    return {
      customer_id: 20
    };
  },
  methods: {}
};
</script>

<style scoped>
</style>
