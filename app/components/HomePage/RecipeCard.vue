<template>
    <div class="group flex flex-col gap-2 justify-between shadow-md rounded-2xl bg-white">
        <!-- Image -->
        <div class="md:h-60 w-full overflow-hidden rounded-t-2xl">
            <NuxtImg
                class="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                format="webp" :src="props.item.image" />
        </div>

        <!-- Content -->
        <div class="p-5 flex flex-col justify-between flex-grow">
            <h1 class="text-xl md:text-2xl py-2 font-semibold line-clamp-2">
                {{ props.item.name }}
            </h1>
            <button
                class="mt-2 w-[180px] cursor-pointer bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-lg px-6 py-3 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                View Ingredients
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})
</script>
