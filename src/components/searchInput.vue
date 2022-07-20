<template>
  <div class="hidden md:flex flex-col">
    <div class="search-form search max-w-none">
      <div class="search-wrapper">
        <input
            class="max-w-none w-full"
            type="text"
            v-model="searchQuery"
            placeholder="Введите название, номер рисунка или артикул товара"/>
        <span class="search-btn"></span>
      </div>
    </div>
    <ul v-if="searchResult.length > 0">
      <li class="px-2 flex items-center search-item" v-for="searchItem in searchResult" :key="searchItem.id">
        <div class="search-title-result-item-image-container pr-2">
          <div class="search-title-result-item-image">
            <img :src="searchItem.IMG" width="75" height="75" :alt="searchItem.NAME">
          </div>
        </div>
        <div class="search-title-result-item-info flex-wrap flex items-center w-full justify-between">
          <a class="search-title-result-item-link hover:text-malin" :href="searchItem.URL">{{ searchItem.NAME }}</a>
          <button class="btn" @click="addToBasket(searchItem.ITEM_ID)">В корзину</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<!-- todo: кнопка очистки(сброса) поиска -->
<script>
import axios from "axios";
import _ from "lodash";
export default {
  name: "searchInput",
  emits: [
    'basketUpdate'
  ],
  data() {
    return {
      searchResult: [],
      searchQuery: ''
    }
  },
  methods: {
    addToBasket(id){
      axios.post(`http://localhost:8080/BasketApi/addItem?id=${id}`, { withCredentials: true })
          .then((response) => {
            if(response.data.status === 'success') {
              this.$emit('basketUpdate')
              this.searchResult = []
              this.searchQuery = ''
            }
            else {
              console.log(response.data)
            }
          })
    },
    asyncFind: _.debounce(function (query){
      axios.get(`http://localhost:8080/BasketApi/search?q=${query}`, { withCredentials: true })
          .then((response) => {
            this.searchResult = response.data;
          })
    })
  },
  watch: {
    'searchQuery' : {
      handler: function (q) {
        if(q.length >= 3) {
          this.asyncFind(q);
        } else {
          if(q.length === 0) {
            this.searchResult = []
          }
        }
      }
    }
  },
}
</script>

<style scoped>
.search-item{
  padding: 8px;
}
.search-item:hover {
  border-left: 1px;
  border-right: 1px;
  border-style: solid;
  border-color: #C7AB91;
}
</style>
