<template>
  <div class="product-card">
    <div class="py-6">
      <div class="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          class="w-1/3 bg-cover"
          style="
            background-image: url('https://file.sitama.co.id/storage/steam/20210629IK02004522/FotoUploadSelling/05b71309-e078-443b-833d-d2f7a2475433.jpeg');
          "
        ></div>
        <div class="w-2/3 p-4">
          <h1 class="text-gray-900 font-bold text-2xl">Mobil</h1>
          <p class="mt-2 text-gray-600 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit In odit
            exercitationem fuga id nam quia
          </p>
          <div class="flex item-center justify-between mt-3">
            <div>
              <div class="custom-number-input h-10 w-100 mr-3">
                <div
                  class="
                    flex flex-row
                    h-10
                    w-full
                    rounded-lg
                    relative
                    bg-transparent
                    mt-1s
                  "
                >
                  <button
                    @click="decrement"
                    class="
                      bg-gray-300
                      text-gray-600
                      hover:text-gray-700 hover:bg-gray-400
                      h-full
                      w-20
                      rounded-l
                      cursor-pointer
                      outline-none
                    "
                  >
                    <span class="m-auto text-2xl font-thin">−</span>
                  </button>
                  <input
                    type="string"
                    class="
                      outline-none
                      focus:outline-none
                      text-center
                      w-full
                      bg-gray-300
                      font-semibold
                      text-md
                      hover:text-black
                      focus:text-black
                      md:text-basecursor-default
                      flex
                      items-center
                      text-gray-700
                      outline-none
                    "
                    name="custom-input-number"
                    :value="formatBidInput"
                    disabled
                  />
                  <button
                    @click="increment"
                    class="
                      bg-gray-300
                      text-gray-600
                      hover:text-gray-700 hover:bg-gray-400
                      h-full
                      w-20
                      rounded-r
                      cursor-pointer
                    "
                  >
                    <span class="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>
            </div>
            <button
              class="
                px-5
                bg-gray-800
                text-white text-xs
                font-bold
                uppercase
                rounded
              "
              @click="submitBid"
            >
              Bid
            </button>
          </div>
        </div>
      </div>
    </div>
    <h4
      v-for="d in priceList"
      :key="d.id"
      class="text-gray-700 font-bold text-center"
    >
      {{ d.nama }} - {{ formatPrice(d.price) }}
      <!-- {{ priceList }} -->
    </h4>
  </div>
</template>
<script lang="ts">
import { reactive, ref, computed, onMounted, watch } from "vue";
import { useBid } from "@/firebase";

export default {
  setup() {
    const { priceList, sendPrice } = useBid();

    const data = reactive({
      bid: 0,
      nominal: 1000000,
    });

    const decrement = () => {
      if (data.bid === 0) return;
      data.bid -= data.nominal;
    };

    const increment = () => {
      data.bid += data.nominal;
    };

    const submitBid = () => {
      sendPrice(data.bid);
    };

    onMounted(() => {
      console.log("harga", priceList);
      // priceList.forEach((element) => {
      //   console.log(element);
      // });
      // data.bid = 1000000000;
    });

    watch(priceList.value, (price) => {
      console.log("bid", price.value._rawValue);
    });

    const formatPrice = (price: number) => {
      return (
        "Rp " +
        Math.floor(price)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
      );
    };

    const formatBidInput = computed(() => {
      return formatPrice(data.bid);
    });

    return {
      data,
      decrement,
      increment,
      formatPrice,
      formatBidInput,
      submitBid,
      priceList,
    };
  },
};
</script>
