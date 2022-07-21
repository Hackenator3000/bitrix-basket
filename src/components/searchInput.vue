<template>
  <div class="hidden md:flex flex-col mb-12">
    <div class="search-form search max-w-none">
      <div class="search-wrapper">
        <input
            class="max-w-none w-full"
            type="text"
            v-model="searchQuery"
            placeholder="Введите название, номер рисунка или артикул товара"/>
        <svg @click="clearSearch" class="basket-item_trash cursor-pointer mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><g clip-path="url(#clip0)"><path d="M8.88393 8.00078L15.8169 1.06772C16.061 0.823631 16.061 0.427882 15.8169 0.18382C15.5729 -0.0602425
          15.1771 -0.0602738 14.933 0.18382L7.99999 7.11687L1.06697 0.18382C0.822881 -0.0602738 0.427132 -0.0602738
          0.18307 0.18382C-0.0609921 0.427913 -0.0610233 0.823662 0.18307 1.06772L7.11609 8.00075L0.18307
          14.9338C-0.0610233 15.1779 -0.0610233 15.5736 0.18307 15.8177C0.305101 15.9397 0.465069 16.0007
          0.625038 16.0007C0.785006 16.0007 0.944944 15.9397 1.06701 15.8177L7.99999 8.88468L14.933 15.8177C15.055
          15.9397 15.215 16.0007 15.375 16.0007C15.5349 16.0007 15.6949 15.9397 15.8169 15.8177C16.061 15.5736 16.061
          15.1779 15.8169 14.9338L8.88393 8.00078Z" fill="#191A1C"></path></g><defs><clipPath id="clip0"><rect width="16" height="16" fill="white"></rect></clipPath></defs></svg>
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
    clearSearch(){
      this.searchQuery = '';
      this.searchResult = [];
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
