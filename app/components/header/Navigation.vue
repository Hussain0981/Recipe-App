<template>
    <nav class="shadow-sm">
        <div class="flex items-center justify-between px-2 md:px-6 xl:container mx-auto h-16 md:h-20">
            <div>
                <NuxtLink to="/">
                    <h1 class="text-xl md:text-2xl font-semibold p-2 cursor-pointer">Recipe App</h1>
                </NuxtLink>
            </div>
            <div class="flex gap-x-3">
                <NuxtLink v-for="item in navigation" :key="item.id" :to="item.path"
                    :class="[isActive(`${item.path}`) ? 'text-black' : 'text-gray-500' ]"
                    class=" hover:text-gray-900 transition-all duration-200 font-medium p-2">{{ item.nav }}
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>
<script setup>
const navigation = reactive([
    {
        id: 1,
        nav: 'Home',
        path: '/',
        subtitle: false
    },
    {
        id: 2,
        nav: 'About',
        path: '/about',
        subtitle: false
    },
])
const route = useRoute();
const isActive = (path) => route.path === path

</script>