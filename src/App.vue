<script setup>
import Header from '@/components/Header.vue';
import ItemList from '@/components/ItemList.vue';
import SearchField from '@/components/SearchField.vue';
import ItemView from '@/components/ItemView.vue';

let searchValue = $ref('')

function emptySearchValue(){
  searchValue = ''
  clickedItem = ''
}

let clickedItem = $ref(null)

function openItemDetails(item){
  clickedItem = item
}

</script>

<template>
  <Header>Vue 3 Pokémon Finder</Header>

  <main>

    <section class="flex justify-center items-center p-6 lg:p-8 bg-gray-200 border-b border-gray-300">
      <SearchField class="w-full max-w-md" v-model="searchValue" />
    </section>

   <section class="w-full max-w-screen-xl m-auto p-6 lg:p-8">
    <ItemList :search="searchValue" 
    @clear-search="emptySearchValue" 
    @item-clicked="openItemDetails" />
   </section>

  </main>

  <ItemView v-if="clickedItem" :url="clickedItem.url" @clear-search="emptySearchValue" class="fixed text-center top-2 left-2 right-2 border border-black/40
  bg-white rounded shadow-lg" />

</template>