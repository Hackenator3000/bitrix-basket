<template>
    <div class="container relative">
      <div class="breadcrumbs flex">
        <a class="breadcrumbs__item breadcrumbs__link">Главная</a>
        <span class="breadcrumbs__item">Корзина</span>
      </div>
      <h1 class="title">Моя корзина</h1>
      <h2 class="font-bold mb-4 hidden md:flex">
        Найти и добавить товар в корзину:
      </h2>
      <div class="flex flex-col xl:flex-row basket-order gap-7">
        <div class="flex flex-col basket-order__main">
          <SearchInput @basketUpdate="refresh"/>
          <drag-and-drop/>
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
              <basket-item v-for="(item, index) in basketItems" :key="item.ID" :BasketItem="item" @basketUpdate="refresh" :index="index+1"></basket-item>
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
        <div class="pWrap" v-if="isPreload === true">
          <div class="pInner">
            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" id="Layer_1" width="100%" height="100%" x="0" y="0" version="1.1" viewBox="0 0 467 469">
              <path fill="none" stroke="#7C0830" stroke-dasharray="1395 1397" stroke-dashoffset="1396" d="m218 17-20 20c-5 3-5 3-14 3-11 0-18 3-26 11s-11 15-10 26c1 7 0 7-1 7-5 0-10 6-10 12 0 1-17 19-68 70L0 234l53 53 52 54c-1 2-8 5-14 6s-6 1-5 4c4 8 13 13 25 15l8 1v5l-1 6 8 1 14 1h6l44 44 44 45 117-117 116-118-69-69c-53-54-68-69-67-70V77l-5-3c-5-2-6-3-7-6-2-5-4-7-8-9-3-2-12-2-17-1h-4l-3-6-3-9c0-2-1-3-7-4-6-2-6-2-24-20L234 0l-16 17z" style="animation:BBxMWPfr_draw_0 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="107 109" stroke-dashoffset="108" d="M257 37c0 2-20 7-24 7-3 0-5 0-8-4l-8-4c-3-1-3-1 7-11l10-11 12 12 11 11z" style="animation:BBxMWPfr_draw_1 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="988 990" stroke-dashoffset="989" d="m218 41 7 4c4 3 4 3 9 3l17-4c11-3 21-3 27-2 2 1 2 2 2 4l3 7c4 6 4 8 0 14-3 5-5 9-3 9l2-2c5-8 13-14 21-13 6 0 8 0 11 7 3 5 5 7 9 9 5 3 6 4 6 7 0 5-2 10-4 13l-8 3-8 5c-4 4-9 13-8 13l8-7c8-9 12-10 17-5l5 2c3 0 7 5 7 7l2 5c2 3 2 3 0 10-2 5-2 6-1 10 2 8 1 11-3 15-5 7-14 11-24 11-11 1-12 0-10-6 1-4 8-12 17-19 3-3 3-3 1-4l-7-2c-8 0-15 3-26 10l-9 5 3-8c8-19 4-34-14-59l-9-14c-1-6-2-9-4-11-6-5-18-6-27-2l-6 3-5-4c-9-5-13-2-21 14-5 10-8 14-14 20-9 11-11 13-11 21l3 9 3 3-3 4c-3 5-3 10 0 15 3 6 8 9 13 9 2 0 3 1 3 2l2 6 2 3-9 1c-10 1-19 5-21 9-3 3-8 2-14-4-3-3-4-3-12-3-11 0-12 0-10-9 3-17 12-29 27-34l5-3-8-4c-4-1-11-12-11-17s2-7 7-9l6-2-1-3c-3-15 4-29 18-36 6-3 7-3 16-3 8 0 11 0 17-2 8-3 12-3 15-1z" style="animation:BBxMWPfr_draw_2 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="517 519" stroke-dashoffset="518" d="M213 59c5 3 10 3 18 0 9-3 19-2 22 3 3 6 0 14-9 25-20 25-34 54-34 68 0 6-1 6-3 6-3 0-9-3-12-6-5-5-6-15-2-28 3-8 13-35 15-37h5l7 1c1-1 0-1-4-4-8-4-11-10-5-11 2-1 6 0 10 1 8 2 12 2 14 1 3-1 2-3-2-3l-9-1c-6-2-14-2-17 0-2 1-2 3-2 6 0 7-3 16-8 26-6 12-9 21-10 30 0 8-1 8-7 6-3-1-4-3-5-5s-1-3 2-9l3-7-3-3c-3-3-4-8-2-13 0-2 5-8 9-13l14-20c5-10 9-16 11-16l4 3z" style="animation:BBxMWPfr_draw_3 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="227 229" stroke-dashoffset="228" d="m258 77 8 11 10 14c7 12 5 27-6 42l-9 9c-4 3-4 3-21 4h-17l9-6c14-10 19-16 20-25 1-4 0-6-3-14-4-9-4-10-3-15 1-6 12-24 12-20z" style="animation:BBxMWPfr_draw_4 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="133 135" stroke-dashoffset="134" d="M246 114c6 12 1 20-15 28l-10 6-6 3c-1-1 4-16 9-26l11-19 5-9 2 7c1 3 2 8 4 10z" style="animation:BBxMWPfr_draw_5 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="1094 1096" stroke-dashoffset="1095" d="m144 112 4 4c3 1 2 2-2 4s-13 11-17 16c-5 8-8 24-6 28 1 3 8 5 13 5 3 0 6 1 10 4l9 5c2 1 2 1 1 6-1 8 2 17 6 21 3 2 5 4 11 5 7 1 9 2 12 6 12 13 12 13 17 14l14 1c10 0 10 0 11 2 2 4 6 7 14 12s13 11 15 16c1 6 1 6-3 9l-3 2 3 5c4 9 7 20 7 27l-1 8c-1 1-3-2-6-5-4-4-6-5-9-5s-3 0-3-4c0-6-3-11-10-15s-9-4-12-2c-2 2-3 2-5 1-3-2-15-6-19-6-2 0-5-1-10-6a62 62 0 0 1-22-32c-1-5-4-11-6-13-6-10-20-21-35-27-12-4-13-5-19-13-9-12-12-13-15-5-2 5-1 17 0 21l2 3-5 7-6 11-3 4-4 2c-2 1-2 1-2 7 1 8 5 17 12 25l5 6-3 2-2 3 4 6c10 15 23 22 43 22 6 0 7 1 6 2-1 4-1 5 4 8l4 4-11 5c-2 0-14 6-14 8v4c2 3 2 3-1 3l-5-1-50-50-48-48 63-62 64-63 3 3z" style="animation:BBxMWPfr_draw_6 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="811 813" stroke-dashoffset="812" d="m399 180 54 54-9 10c-30 31-41 43-44 44-4 2-4 0 1-6l4-7 6-7c7-7 9-13 3-16-3-1-3-2 0-8l2-11v-5h-11l1-3c2-8-1-31-6-36l-10 5-9 6-4-2c-3-1-4-2-9-1-4 0-7 1-21 8l-2-3c-1-2-2-3-4-3-3 0-10 4-12 7l-11 11c-12 10-13 11-14 16l-5 7-3 3v13l1 12-4 7c-4 8-4 8-5 22 0 15-2 20-6 23-5 4-5 4-5-15 0-21-2-36-7-50l-3-9 4-7c3-3 5-8 5-9 0-4 3-9 5-11l9-2c7 0 8 0 10-2l6-9c2-5 4-8 9-11l6-6c1-2 1-13-1-17 0-2 0-2 5-3 6 0 12-3 15-8 2-4 2-5 2-15 0-11 1-20 3-20l54 54z" style="animation:BBxMWPfr_draw_7 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="246 248" stroke-dashoffset="247" d="m314 139-7 7-8 9-2 15c-1 14-3 20-9 22-8 4-17 3-24-2-2-2-4-2-9-2-7 0-10-2-19-10-6-5-14-10-17-10h-3l3-2c4-3 15-6 33-7 20-2 27-3 37-10l18-10h7z" style="animation:BBxMWPfr_draw_8 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="412 414" stroke-dashoffset="413" d="m195 167 6 4 11 2c14 1 16 2 25 10 9 9 11 10 18 9 5-1 6-1 9 2 7 6 10 7 20 3 9-2 12-5 15-13l4-7c2-2 11-2 14 0 2 2 2 3 1 6s-1 4-6 7c-6 3-10 7-14 15-3 6-3 6-8 7-2 0-6 1-8 3-11 7-13 8-16 8-5 0-9-4-13-13l-3-7-6 13c-1 4-16 9-27 9-10 0-15-2-24-10-8-7-11-9-21-10-7-1-10-3-12-10-4-11 4-24 16-28 5-2 15-2 19 0z" style="animation:BBxMWPfr_draw_9 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="372 374" stroke-dashoffset="373" d="M97 183c5 4 7 8 11 22 3 12 5 17 9 21 3 3 8 5 12 5 3 0 3 1 4 6 4 13 5 14 17 18l12 6 15 13-6 1c-5 1-5 2-4 7l1 4-11 3c-16 4-25 5-35 4-11 0-19-4-27-11-9-10-9-12 0-15 5-2 6-4 3-4l-6-2c-10-4-17-14-19-27v-4h10l-1-4c0-4 0-5 4-10l7-8c1-3 1-4-1-11-2-8-3-13-1-16 1-2 2-2 6 2z" style="animation:BBxMWPfr_draw_10 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="993 995" stroke-dashoffset="994" d="M398 205c3 10 4 18 3 24l-1 5 5-1 6-2v4l-4 11-3 8 5 1c3 0 5 1 5 2 0 2-6 9-9 11l-5 7-5 8c-2 3-2 3-7 2l-9-2c-3-1-4-1-2 1l9 4c6 2 9 4 9 5l3 4c2 3-12 11-22 12-5 1-6 1-4 4 1 2 0 3-2 5-6 4-15 6-30 5-13 0-14 0-22-4-9-4-15-5-19-2l-9 8-15 11c-14 7-18 14-11 19l3 2-3 2c-5 4-11 14-19 30l-7 15c-1 2-3-3-6-13 0-2 1-5 5-11 18-34 26-55 26-74 0-10-1-17-5-25l-2-6 2-4c3-5 2-10-2-18-3-6-5-8-14-13-8-4-12-7-12-9l6-4 11-7 4-4 4 4c4 5 7 11 7 14l-2 5c-3 4-3 4 0 5s3 1 7 19a158 158 0 0 1 2 65c1 1 12-2 14-3s4-4 5-7c2-4 3-7 3-17 1-17 2-22 6-27 4-4 4-6 3-18v-10l4-3 2-3c0-4 5-13 7-15l11-10c9-8 16-12 18-11l1 7v7l3-5c2-3 4-5 11-8 7-4 9-5 13-5 7 0 7 2 5 9l-1 5 7-7c6-6 12-11 14-10l3 8z" style="animation:BBxMWPfr_draw_11 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="177 179" stroke-dashoffset="178" d="M123 204c12 5 22 12 26 16l9 17a179 179 0 0 0 10 20c0 1-20-6-24-9l-4-5-3-10c-2-7-5-10-12-11-6 0-7 0-9-4l-3-10a376 376 0 0 0-1-10l11 6z" style="animation:BBxMWPfr_draw_12 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="105 107" stroke-dashoffset="106" d="M116 242c0 8 23 31 33 34 8 2 6-1-7-9a125 125 0 0 1-26-25z" style="animation:BBxMWPfr_draw_13 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="220 222" stroke-dashoffset="221" d="m364 248-16 8c-23 11-34 21-38 34l-1 5 7-5c9-8 12-10 26-10h11c1-2-16-4-22-3h-5c0-2 11-10 23-17 9-4 16-9 19-12l4-5-8 5z" style="animation:BBxMWPfr_draw_14 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="488 490" stroke-dashoffset="489" d="m200 281 12 4 6 3 2-2 3-3 7 4c7 4 8 7 7 13-2 6-1 10 1 12 3 4 5 7 5 10 0 8-6 15-16 18l-6 2v5c0 8-2 13-7 19-4 4-13 9-16 9-2 0-5-3-5-6-1-2-1-1-3 2-4 6-8 9-16 11-8 3-8 3-11 0l-1-10v-9l-2 4c-4 6-9 9-21 9l-14-1c-3-1-3-1-3-4 2-7 2-7-3-8-17-3-27-7-27-10l4-3 12-6c8-5 16-9 19-9s2-1-2-4l-3-3c0-1 16-9 25-12l8-3-7-3c-10-4-11-5-5-10 5-5 13-8 22-9l7-1-1-5v-5l3-1c6-1 19 0 26 2z" style="animation:BBxMWPfr_draw_15 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="152 154" stroke-dashoffset="153" d="M197 311c-11 3-18 8-37 26l-5 5 14-9 17-10c8-4 19-7 27-7 9 0 10-1 5-5-4-2-13-2-21 0z" style="animation:BBxMWPfr_draw_16 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path><path fill="none" stroke="#7C0830" stroke-dasharray="701 703" stroke-dashoffset="702" d="M252 313c3 3 3 4 3 11 0 6 0 10-2 14-4 11-11 26-18 37-9 14-9 12-6 21 2 4 3 10 3 15l2 8 3-1c3-3 13-21 18-31 4-11 9-19 14-25l4-5-3-3-3-3c0-2 4-7 10-10 3-1 9-7 15-12 7-7 9-10 12-10l9 5 7 4 16 1a164 164 0 0 0 22 0L235 453a666 666 0 0 1-63-64l10-3c7-4 8-4 11-3 12 3 28-10 33-27 1-6 2-7 4-8 4-2 11-9 13-14 3-8 3-15 0-23 0-2 0-2 3-1l6 3z" style="animation:BBxMWPfr_draw_17 4200ms ease-in 0ms infinite,BBxMWPfr_fade 4200ms linear 0ms infinite"></path>
            </svg>
          </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import BasketItem from "@/components/basketItem";
import SearchInput from "@/components/searchInput";
import DragAndDrop from "@/components/drag-and-drop";
export default {
  name: "basketItems",
  components: {DragAndDrop, SearchInput, BasketItem},
  data(){
    return{
      basketItems: {},
      basketTotal: 0,
      basketDiscount: 0,
      isPreload: false
    }
  },
  methods: {
    getList() {
      this.isPreload = true;
      axios.get('http://localhost:8080/BasketApi/GetBasket',{withCredentials: true})
          .then((response) => {
            if(response.data.status === 'success') {
              this.basketItems = response.data.basket
              this.basketTotal = response.data.total.Price
              if((response.data.total.BasePrice - response.data.total.Price) > 0){
                this.basketDiscount = response.data.total.BasePrice - response.data.total.Price
                this.isPreload = false;
              }
            }
            else {
              this.isPreload = false;
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
<style>
.pWrap{background: #ffffffd4;height: 100%;position: fixed;width: 100%;z-index: 100;top: 0;left: 0; display:block;}
.pInner {width: 300px;height: 300px;margin: auto;position: absolute;top: 0; left: 0; bottom: 0; right: 0;}
data-made-with="vivus-instant">@keyframes BBxMWPfr_draw{100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_fade{0%{stroke-opacity:1}90.47619047619048%{stroke-opacity:1}100%{stroke-opacity:0}}@keyframes BBxMWPfr_draw_0{19.047619047619047%{stroke-dashoffset:1396}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_1{19.047619047619047%{stroke-dashoffset:108}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_2{19.047619047619047%{stroke-dashoffset:989}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_3{19.047619047619047%{stroke-dashoffset:518}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_4{19.047619047619047%{stroke-dashoffset:228}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_5{19.047619047619047%{stroke-dashoffset:134}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_6{19.047619047619047%{stroke-dashoffset:1095}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_7{19.047619047619047%{stroke-dashoffset:812}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_8{19.047619047619047%{stroke-dashoffset:247}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_9{19.047619047619047%{stroke-dashoffset:413}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_10{19.047619047619047%{stroke-dashoffset:373}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_11{19.047619047619047%{stroke-dashoffset:994}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_12{19.047619047619047%{stroke-dashoffset:178}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_13{19.047619047619047%{stroke-dashoffset:106}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_14{19.047619047619047%{stroke-dashoffset:221}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_15{19.047619047619047%{stroke-dashoffset:489}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_16{19.047619047619047%{stroke-dashoffset:153}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes BBxMWPfr_draw_17{19.047619047619047%{stroke-dashoffset:702}66.66666666666666%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}
</style>
