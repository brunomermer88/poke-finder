<script setup>
import IconDismissCircle from '@/assets/icons/dismiss-circle.svg?component'
import { promiseTimeout, useFetch, useTitle } from '@vueuse/core';
import { onMounted, watchEffect } from 'vue';
import { padZeros,removeCharacter,capitalize } from '@/helpers/filters.js';
import LikeButton from '@/components/LikeButton.vue'

const props = defineProps({ search: String, orderby: Boolean })
const emit = defineEmits(['clear-search','item-clicked'])

// Starting reactive object to handle the state of the API fetch.
let fetchState = $ref({ isFetching: true, error: null, data: null })
// When the component is mounted in the DOM.
onMounted(async () => {
  // Simulate a delay to see loading state..
  // await promiseTimeout(1000)

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
});

const filteredItems1 = $computed(() => {
  return items.filter(
    (item) => 
    item.name.indexOf(props.search.toLowerCase()) > -1 ||
    item.id === Number(props.search)
  )
})

const filteredItems = $computed(() => {
  return props.orderby ? filteredItems1.sort((a,b) => a.name.localeCompare(b.name)) : filteredItems1.sort((a,b) => a.id - b.id )
})

// Computed message with count of items found after a search.
const itensFoundMessage = $computed(() => {
  if (fetchState.isFetching || !props.search) return ''

  const count = filteredItems.length
  return `${count} item${count === 1 ? '' : 's'} found`
})

// Watch changes to `itensFoundMessage`, to reactively update window title.
watchEffect(() =>
  useTitle(itensFoundMessage ? `${itensFoundMessage} - PokéDex` : 'PokéDex')
)

</script>
<template>

    <p>{{ itensFoundMessage }}</p>

    <!-- In case we have an API fetch error, show it. -->
    <div v-if="fetchState.error">
      <h2 class="font-bold text-xl text-red-700 mb-2">Oops!</h2>
      <p>Sorry, it wasn't possible to load the list.</p>
      <p>Error: <i>{{ fetchState.error }}</i></p>
    </div>

    <div v-else-if="fetchState.isFetching">
      Loading...
    </div>

    <template v-else>
      <div
        v-if="props.search"
        class="mb-8 flex gap-4 flex-wrap items-center justify-center"
      >
        <p class="text-gray-700">
          Search results for <b>{{ props.search }}</b
          >: <i>{{ itensFoundMessage }}</i
          >.
        </p>

        <button
          class="inline-flex gap-2 items-center h-8 px-3 rounded active:text-black/60 border border-black/5 border-b-black/40 bg-white/70 hover:bg-neutral-900/5 active:bg-neutral-700/5 active:border-black/5 outline outline-2 outline-offset-1 outline-transparent focus-visible:outline-black transition-all"
          @click="emit('clear-search')"
        >
          <IconDismissCircle class="w-4 h-4" />
          <span>Clear</span>
        </button>

      </div>

      <ol
        
        class="flex flex-wrap justify-center gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      >
        <li v-for="item of filteredItems" class="flex-initial flex rounded bg-white shadow h-24 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)]">
          <a :href="`#${item.id}`"
          class="relative flex-1 flex flex-col justify-center rounded border border-white bg-white outline outline-2 outline-offset-1 outline-transparent focus-visible:outline-black hover:bg-red-600 hover:border-black/50 group transition-all"
          @click.prevent="emit('item-clicked', item.url)"
          >
            <small class="opacity-70 transition-colors group-hover:text-white">#{{ padZeros(item.id) }}</small>
            <strong class="transition-colors group-hover:text-white">{{ capitalize(removeCharacter(item.name,'-')) }}</strong>

            <LikeButton :name="item.name" class="absolute top-1 right-1" />

          </a>
        </li>
      </ol>

    </template>

</template>