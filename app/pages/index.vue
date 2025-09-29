<template>
  <div>
    <!-- Hero Section -->
    <section
      class="px-4 md:px-8 flex flex-col md:flex-row gap-10 items-center justify-between py-16 md:py-24 bg-gradient-to-tr from-gray-200 via-gray-50 to-white w-full">
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

      <div class="flex-1 grid place-items-center">
        <NuxtImg class="rounded-full xl:h-96 xl:w-96 h-64 w-64 md:h-72 md:w-72 object-cover shadow-lg" format="webp"
          src="https://images.pexels.com/photos/5836435/pexels-photo-5836435.jpeg" />
      </div>
    </section>

    <!-- Recipe Cards Section -->
    <section>
      <div v-if="pending">
        <LoadingSpinLoading />
      </div>

      <div v-else class="grid md:grid-cols-2 xl:grid-cols-3 px-2 md:px-5 xl:container mx-auto py-10 gap-5">
        <HomePageRecipeCard v-for="(item, index) in recipeData" :key="item.id" :item="item"
          @click="navigateTo(`/${item.id}`)" :data-aos-delay="index * 150" data-aos="fade-up" data-aos-duration="800"
          data-aos-offset="200" />
      </div>
    </section>
  </div>
</template>

<script setup>
const { $axios } = useNuxtApp()

const recipeData = ref([]) // SHow on UI
const allRecipes = ref([]) // Store data
const currentPage = ref(1)
const limitedItems = ref(10)
const pending = ref(false)
const { $refreshAos } = useNuxtApp()

async function getData() {
  try {
    pending.value = true
    const { data } = await $axios.get("https://dummyjson.com/recipes")
    allRecipes.value = data?.recipes || []
    recipeData.value = []
    currentPage.value = 1
    loadMore()
  } catch (err) {
    console.error("API Error:", err)
  } finally {
    pending.value = false
  }
}

// Pagination logic
function loadMore(page = currentPage.value) {
  if (allRecipes.value.length) {
    const start = (page - 1) * limitedItems.value
    const end = page * limitedItems.value
    const newArray = allRecipes.value.slice(start, end)

    recipeData.value.push(...newArray)
    currentPage.value++
  }
}

// Infinite scroll check
function checkScrollPosition() {
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 300 &&
    !pending.value
  ) {
    loadMore()
  }
}

onMounted(() => {
  getData()
  window.addEventListener("scroll", checkScrollPosition)
  $refreshAos()
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", checkScrollPosition)
})
</script>
