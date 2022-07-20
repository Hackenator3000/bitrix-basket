<template>
  <div @click="getList">
  </div>
    <div class="container">
      <div class="breadcrumbs flex">
        <a class="breadcrumbs__item breadcrumbs__link">Главная</a
        ><span class="breadcrumbs__item">Корзина</span>
      </div>
      <h1 class="title">Моя корзина</h1>
      <h2 class="font-bold mb-4 hidden md:flex">
        Найти и добавить товар в корзину:
      </h2>
      <div class="flex flex-col xl:flex-row basket-order gap-7">
        <div class="flex flex-col basket-order__main">
          <SearchInput @basketUpdate="refresh"/>
          <div
              class="basket-order__header basket-order__row
              text-plombir hidden md:grid" style="grid-template-columns: 0.1fr 2fr 1fr 1fr 1fr 0.5fr">
            <span class="font-medium xl:text-lg">№</span>
            <span class="font-medium xl:text-lg">Товары</span>
            <span class="font-medium xl:text-lg">Цена</span>
            <span class="font-medium xl:text-lg">Количество</span>
            <span class="font-medium xl:text-lg">Сумма</span>
            <span class="font-medium justify-self-end xl:text-lg">
              Удалить
            </span>
          </div>
          <div v-if="!basketItems">
            Ваша корзина пуста
          </div>
          <div v-else class="basket-order__items">
            <div v-for="item in basketItems" :key="item.ID">
              <basket-item :BasketItem="item" @basketUpdate="refresh"></basket-item>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-grow bg-light-cream p-7 h-fit xl:w-1/2 xxl:w-1/3">
          <span class="text-3lg font-bold">Заказ</span><span class="text-plombir"><span>Всего товаров: </span><span>{{ basketItems.length }}</span></span>
          <span class="text-plombir">
            <span>на сумму: </span><span>{{ basketTotal }}</span>
          </span>
          <span class="text-rose mt-5" v-if="basketDiscount > 0">
            <span>Скидка:</span>
            <span>{{basketDiscount}}</span>
          </span>
          <span class="text-3lg font-bold mt-5">
            <span>Итого: </span><span>{{ basketTotal }} руб</span></span>
          <a class="btn px-2 mt-6 w-fit">Оформить заказ</a>
        </div>
      </div>
    </div>
</template>
<!-- todo: поправить удаление последней позиции из корзины -->
<script>
import axios from "axios";
import BasketItem from "@/components/basketItem";
import SearchInput from "@/components/searchInput";
export default {
  name: "basketItems",
  components: {SearchInput, BasketItem},
  props: {
    hello : {
      type: String,
      default: 'hello world',

    }
  },
  data(){
    return{
      basketItems: {},
      basketTotal: 0,
      basketDiscount: 0,
      searchQuery: '',
      selected: null,
      options: ['list', 'of', 'options'],
    }
  },
  methods: {
    getList() {
      axios.get('http://localhost:8080/BasketApi/GetBasket',{withCredentials: true})
          .then((response) => {
            if(response.data.status === 'success') {
              this.basketItems = response.data.basket
              this.basketTotal = response.data.total.Price
              if((response.data.total.BasePrice - response.data.total.Price) > 0){
                this.basketDiscount = response.data.total.BasePrice - response.data.total.Price
              }
            }
            else {
              return console.log('error')
            }
          });
    },
    refresh(){
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
}
</script>
<style scoped>

</style>
