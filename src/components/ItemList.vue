<script setup>
import { promiseTimeout, useFetch } from '@vueuse/core';
import { onMounted } from 'vue';
import { padZeros,removeCharacter,capitalize } from '@/helpers/filters.js';

/* const items = $ref([
  {id: 1, name: 'Poke 1'},
  {id: 2, name: 'Poke 2'},
  {id: 3, name: 'Poke 3'},
  {id: 4, name: 'Poke 4'}
]) */

// Starting reactive object to handle the state of the API fetch.
let fetchState = $ref({ isFetching: true, error: null, data: null })
// When the component is mounted in the DOM.
onMounted(async () => {
  // Simulate a delay to see loading state..
  await promiseTimeout(1000)

  // This API doesn't support server-side search, all records loaded.
  fetchState = await useFetch('https://pokeapi.co/api/v2/pokemon/?limit=30')
    .get()
    .json()
})
// Computed manipulated list of API results.

// Computed manipulated list of API results.
const items = $computed(() => {
  return fetchState.data.results.map((item, index) => ({
    id: index + 1,
    ...item
  }))
})

</script>
<template>

    <!-- In case we have an API fetch error, show it. -->
    <div v-if="fetchState.error">
      <h2 class="font-bold text-xl text-red-700 mb-2">Oops!</h2>
      <p>Sorry, it wasn't possible to load the list.</p>
      <p>Error: <i>{{ fetchState.error }}</i></p>
    </div>

    <div v-else-if="fetchState.isFetching">
      Loading...
    </div>

    <ol
      v-else
      class="flex flex-wrap justify-center gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    >
      <li v-for="item of items" class="flex-initial flex rounded bg-white shadow h-24 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)]">
        <a>
          <small class="opacity-70 transition-colors group-hover:text-white">#{{ padZeros(item.id) }}</small>
          <strong class="transition-colors group-hover:text-white">{{ capitalize(removeCharacter(item.name,'-')) }}</strong>
        </a>
      </li>
    </ol>

</template>