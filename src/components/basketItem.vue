<template>
  <div class="flex flex-col md:grid basket-order__item basket-order__row border
             border-weathered-stone rounded-sm p-4 mt-3">
    <div class="flex"></div>
    <div class="flex flex-col md:flex-row items-center">
      <img @click="test(item.ID)"
           class="w-14 h-14 md:mr-7"
           :src="item.IMG"
           :alt="item.NAME"
      />
      <div class="flex flex-col">
        <a :href="item.DETAIL_PAGE_URL" class="font-medium">{{ item.NAME }}</a>
<!--        <span class=" text-black-warm text-sm self-center md:self-auto">-->
<!--          Рисунок <span>1099-18</span>-->
<!--        </span>-->
      </div>
    </div>
    <div class="flex items-center font-bold xl:text-lg">
      <span>₽</span><span>{{ priceToFix }}</span>
    </div>
    <div class="flex">
      <div class="card-counter mr-0 md:mr-8">
        <button class="card-counter__btn" @click="item.QUANTITY--">–</button>
        <input
          class="card-counter__input"
          type="text"
          v-model.number="item.QUANTITY"
          @keypress="isNumber($event)"
      />
        <button class="card-counter__btn" @click="item.QUANTITY++">+</button>
      </div>
    </div>
    <div class="flex items-center font-bold xl:text-lg">
      <span>₽</span><span>{{ priceToFix * item.QUANTITY }}</span>
    </div>
    <div class="flex">
      <svg @click="DeleteItem(item.ID)" class="basket-item_trash cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <g clip-path="url(#clip0)">
          <path d="M8.88393 8.00078L15.8169 1.06772C16.061 0.823631 16.061 0.427882 15.8169 0.18382C15.5729 -0.0602425
          15.1771 -0.0602738 14.933 0.18382L7.99999 7.11687L1.06697 0.18382C0.822881 -0.0602738 0.427132 -0.0602738
          0.18307 0.18382C-0.0609921 0.427913 -0.0610233 0.823662 0.18307 1.06772L7.11609 8.00075L0.18307
          14.9338C-0.0610233 15.1779 -0.0610233 15.5736 0.18307 15.8177C0.305101 15.9397 0.465069 16.0007
          0.625038 16.0007C0.785006 16.0007 0.944944 15.9397 1.06701 15.8177L7.99999 8.88468L14.933 15.8177C15.055
          15.9397 15.215 16.0007 15.375 16.0007C15.5349 16.0007 15.6949 15.9397 15.8169 15.8177C16.061 15.5736 16.061
          15.1779 15.8169 14.9338L8.88393 8.00078Z" fill="#C7AB91"/>
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="16" height="16" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  </div>
</template>
<!--todo: удаление товара без получения списка товаров (удаление из массива) -->
<script>
import axios from "axios";
import _ from "lodash";
export default {
  name: "basketItem",
  props: {
    BasketItem: Object,
  },
  emits: [
    'basketUpdate'
  ],
  watch: {
    'item.QUANTITY': {
      handler: function(newVal, oldVal) {
        newVal = newVal.toString().replace(/[^0-9]/g, '')
        if(!newVal || parseFloat(newVal) <= 0){
          newVal = 1;
          this.item.QUANTITY = 1
        }
        if(newVal !== parseFloat(oldVal)){
          this.SetQuantity(this.item.ID, this.item.QUANTITY)
        }

      },
    }
  },
  methods: {
    DeleteItem(id){
      let params = {
        id: id,
      }
      axios.post(`http://localhost:8080/BasketApi/DeleteItem?id=${id}`, params,{withCredentials: true}).then((response) => {
        if(response.data.status === 'success'){
          this.$emit('basketUpdate');
        } else {
          console.log(response.data.status);
        }
      });
    },
    SetQuantity:_.debounce(function(id, quantity)
      {
        let params = {
          id: id,
          quantity: quantity
        }
        axios.post(`http://localhost:8080/BasketApi/SetQuantity?id=${id}&quantity=${quantity}`, params,{withCredentials: true}).then((response) => {
          console.log(response.data.status);
          if(response.data.status === 'success'){
            this.$emit('basketUpdate')
          }
        });
      }, 500),
    isNumber(e){
      const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const keyPressed = e.key;

      if (!keysAllowed.includes(keyPressed)) {
        e.preventDefault()
      }
    },
  },
  computed:{
    priceToFix: function(){
      return parseFloat(this.item.PRICE).toFixed(2)
    },
    item: function() {
      return this.BasketItem
    }
  }
}
</script>

<style scoped>

</style>
