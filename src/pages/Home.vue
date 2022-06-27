<script setup>
import ItemList from '@/components/ItemList.vue';
import SearchField from '@/components/SearchField.vue';
import { useTitle } from '@vueuse/core';
import { useRouter } from 'vue-router'

let searchValue = $ref('')
let orderByName = $ref(false)

function emptySearchValue(){
  searchValue = ''
}

function actOrder(tipo = false){
  orderByName = tipo;
}

const router = useRouter()

function openItemDetails(url){
  console.log(url)
  const identifier = url.split('/').slice(-2, -1)[0]
  router.push(`/${identifier}`)
}

</script>

<template>

    <section class="flex justify-center items-center p-6 lg:p-8 bg-gray-200 border-b border-gray-300">
      <SearchField class="w-full max-w-md" v-model="searchValue" />
    </section>

    <a class="cursor-pointer" @click="actOrder(true)">Ordernar por nome</a> | <a class="cursor-pointer" @click="actOrder(false)">Ordernação padão</a>

   <section class="w-full max-w-screen-xl m-auto p-6 lg:p-8">
    <ItemList :orderby="orderByName" :search="searchValue" 
    @clear-search="emptySearchValue" 
    @item-clicked="openItemDetails" />
   </section>

</template>