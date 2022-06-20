<script setup>
import Header from '@/components/Header.vue';
import ItemList from '@/components/ItemList.vue';
</script>

<template>
  <Header>Vue 3 Pokémon Finder</Header>

  <main>
    <section>
      Barra de busca ...
    </section>
   <section>
    <ItemList />
   </section>
  </main>
</template>