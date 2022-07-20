<template>
  <basket-items/>
</template>

<script>
import BasketItems from "@/components/basketItems";

export default {
  name: 'App',
  components: {
    BasketItems,
  },
  data() {
    return {
      searchResult: []
    }
  }
}
</script>

<style>
</style>
