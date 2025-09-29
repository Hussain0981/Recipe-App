<template>
    <div>
        <div v-if="pending">
            <LoadingSpinLoading />
        </div>

        <div v-else-if="item" class="flex flex-col md:flex-row gap-5 px-2 md:px-6 xl:container mx-auto py-10">
            <div class="flex-1 grid place-items-center">
                <NuxtImg :src="item.image" class="w-96 h-96 object-center object-cover rounded-md shadow-md" />
            </div>

            <div class="flex-1">
                <h1 class="text-3xl font-semibold text-black py-2">{{ item.name }}</h1>

                <h2 class="text-2xl font-semibold text-black py-2">Instructions</h2>
                <div v-for="(step, index) in item.instructions" :key="index" class="flex gap-2 gap-y-6">
                    <span>{{ step }}</span>
                </div>

                <h2 class="text-2xl font-semibold text-black py-2 mt-4">Ingredients</h2>
                <div v-for="(ing, index) in item.ingredients" :key="index" class="flex gap-2 gap-y-6">
                    <span>{{ ing }}</span>
                </div>
            </div>
        </div>

        <div v-else>
            <p class="text-red-500">No recipe found.</p>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const { $axios } = useNuxtApp()

const item = ref(null)
const pending = ref(false)

async function getData(id) {
    try {
        pending.value = true
        const res = await $axios.get(`https://dummyjson.com/recipes/${id}`)
        item.value = res.data
    } catch (error) {
        console.error("API Error:", error)
        item.value = null
    } finally {
        pending.value = false
    }
}

watch(
    () => route.params.id,
    (newVal) => {
        if (newVal) getData(newVal)
    },
    { immediate: true }
)
</script>
