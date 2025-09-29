<template>
    <div>
        <!-- Hero Section -->
        <section
            class="px-4 md:px-8 flex flex-col md:flex-row gap-10 items-center justify-between py-16 md:py-24 bg-gradient-to-tr from-gray-200 via-gray-50 to-white w-full">
            <!-- Left Content -->
            <div class="flex-1 md:px-10 text-center md:text-left">
                <h1 class="text-3xl xl:text-5xl font-extrabold uppercase tracking-wide leading-tight">
                    FlavorBook – Your Pocket Kitchen Companion.
                </h1>
                <p class="mt-6 text-gray-700 leading-relaxed tracking-wide max-w-lg mx-auto md:mx-0">
                    FlavorBook is a modern recipe app that helps you discover, save, and
                    cook delicious meals with ease. Explore flavors, organize favorites,
                    and make cooking simple, fun, and inspiring daily.
                </p>
                <button
                    class="mt-6 cursor-pointer bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-lg px-6 py-3 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                    Contact Us
                </button>
            </div>

            <!-- Right Image -->
            <div class="flex-1 grid place-items-center">
                <NuxtImg class="rounded-full xl:h-96 xl:w-96 h-64 w-64 md:72 md:h-72 object-cover shadow-lg"
                    format="webp" src="https://images.pexels.com/photos/5836435/pexels-photo-5836435.jpeg" />
            </div>
        </section>
        <section class="grid md:grid-cols-2 xl:grid-cols-3 px-2 md:px-5 xl:container mx-auto py-10 gap-5 ">
            <HomePageRecipeCard v-for="item in recipeData" :key="item.id" :item="item"
                @click="navigateTo(`/${item.id}`)" />
        </section>
    </div>
</template>


<script setup>
const { data: recipes, pending, error } = await useAsyncData('recipes', () =>
  $fetch('https://dummyjson.com/recipes')
)

const recipeData = ref([])
const currentPage = ref(1)
const limitedItems = ref(10)

function loadMore(page = 1) {
  if (recipes.value?.recipes) {
    const start = (page - 1) * limitedItems.value
    const end = page * limitedItems.value
    const newArray = recipes.value.recipes.slice(start, end)

    recipeData.value.push(...newArray)
    currentPage.value++
  }
}

function checkScrollPosition() {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
    !pending.value
  ) {
    loadMore(currentPage.value)
  }
}

onMounted(() => {
  loadMore()
  window.addEventListener("scroll", checkScrollPosition)
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", checkScrollPosition)
})
</script>
