<script setup>
import IconCircleOff from '@/assets/icons/circle-off.svg?component'
import IconDismissCircle from '@/assets/icons/dismiss-circle.svg?component'
import { promiseTimeout, useFetch, useTitle } from '@vueuse/core'
import { onMounted, watch, watchEffect } from 'vue'
import { capitalize, padZeros, removeCharacter } from '@/helpers/filters'
import { LOADING_DELAY } from '@/helpers/constants.js';

const emit = defineEmits(['clear-search'])
const props = defineProps({ url: String })

// Starting reactive object to handle the state of the API fetch.
let fetchState = $ref({ isFetching: true, error: null, data: null })

// When the component is mounted in the DOM.
onMounted(async () => {
  // Simulate a delay to see loading state...
  await promiseTimeout(LOADING_DELAY)

  // Fetch the Pokémon based on the URL received as prop.
  fetchState = await useFetch(props.url).get().json()
})

watch(
    () => props.url,
    async () => (fetchState = await useFetch(props.url).get().json())   
)

// Extract `fetchState.data` as `pokemon` just to simplify use in template.
const pokemon = $computed(() => fetchState.data)

</script>
<template>

    <div v-if="fetchState.error">
    <h2 class="font-bold text-xl text-red-700 mb-2">Oops!</h2>
    <p>Sorry, it wasn't possible to load this Pokémon.</p>
    </div>

    <div
    v-else-if="!fetchState.isFetching && !pokemon"
    class="flex flex-col items-center gap-2 text-gray-500"
    >
    <IconCircleOff class="w-24 h-24 p-2 text-gray-300" />
    <p>Pokémon not found!</p>
    </div>

    <div
    v-else-if="fetchState.isFetching"
    class="flex flex-col items-center gap-2 text-gray-500"
    >
    <IconCircleOff class="w-24 h-24 p-2 text-gray-300" />
    <p>Loading...</p>
    </div>

    <div v-else :class="$attrs.class">

        <h2 class="inline-flex gap-3 items-center text-2xl font-bold"
        >
        {{ capitalize(pokemon?.name) }}
        </h2>

        <div class="flex flex-wrap justify-center gap-6 my-10">


            <div class="flex gap-2">
                <b>ID:</b>
                <i
                class="inline-block"
                >{{ pokemon?.id }} 
                </i>
            </div>

            <div class="flex gap-2">
                <b>Height:</b>
                <i
                class="inline-block"
                >{{ pokemon?.height / 10 }} 
                </i>
            </div>

            <div class="flex gap-2">
                <b>Weight:</b>
                <i
                class="inline-block"
                >{{ pokemon?.weight }} 
                </i>
            </div>

            <button
                class="inline-flex gap-2 items-center h-8 px-3 rounded active:text-black/60 border border-black/5 border-b-black/40 bg-white/70 hover:bg-neutral-900/5 active:bg-neutral-700/5 active:border-black/5 outline outline-2 outline-offset-1 outline-transparent focus-visible:outline-black transition-all"
                @click="emit('clear-search')"
            >
            <IconDismissCircle class="w-4 h-4" />
                <span>Clear</span>
            </button>

        </div>

    </div>

</template>