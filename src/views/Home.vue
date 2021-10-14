<template>
  <div class="home">
    <div
      class="
        product-card
        justify-around
        flex
        bg-yellow-300
        items-center
        h-screen
      "
    >
      <div class="p-1">
        <div class="flex justify-center">
          <div class="mr-3" v-if="user">
            <img width="50" height="50" :src="user.photoURL" alt="fotoGmail" />
          </div>
          <button
            v-if="!isLogin"
            @click="signIn"
            class="
              px-10
              py-4
              bg-blue-400
              text-white text-xs
              font-bold
              uppercase
              rounded
            "
          >
            Sign In
          </button>
          <button
            v-else
            @click="signOut"
            class="
              px-10
              py-4
              bg-blue-400
              text-white text-xs
              font-bold
              uppercase
              rounded
            "
          >
            Sign Out
          </button>
        </div>
        <ProductCard v-if="isLogin" />
      </div>
    </div>
  </div>
  x
</template>

<script lang="ts">
import { useAuth } from "@/firebase";
import ProductCard from "@/components/ProductCard.vue";

export default {
  components: { ProductCard },
  setup() {
    const { user, isLogin, signOut, signIn } = useAuth();

    console.log("user");

    return { user, isLogin, signOut, signIn };
  },
};
</script>
