<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import type { Ref } from 'vue';
import { useRoute, useRouter } from "vue-router";

import { useComics } from '@/composables/marvelApi';
import type { Comic } from '@/types/marvel';

import LoadingIndicator from './LoadingIndicator.vue';
import ComicCard from './ComicCard.vue'
import Pagination from './Pagination.vue';

const route = useRoute();
const router = useRouter();

const currentPage: Ref<number | string> = ref(0);
const totalPages: Ref<number> = ref(0);

const isLoading: Ref<boolean> = ref(false);
const data: Ref<Comic[] | undefined> = ref();

if (route.params.page) {
    currentPage.value = +route.params.page;
}

const getComics = async (page: number = 0): Promise<void> => {
    try {
        isLoading.value = true;
        const comics = await useComics(page);

        currentPage.value = comics?.offset / comics?.limit || 0;
        totalPages.value = Math.ceil(comics.total / comics.limit);
        console.log(`\n${comics?.offset} offset  /  ${comics?.limit} limit`);

        console.log(`\n${currentPage.value}\n${totalPages.value}`);

        data.value = comics.results;
        isLoading.value = false;
    } catch (e) {
        router.push({ path: 'error', query: { info: e as string } })
    }
};

watch(
    () => route.params.page, // first argument
    async (newPage) => { // 2nd argument
        /* The +newPage syntax is used to convert the newPage string to a number,
        since route.params.page is likely a string. 
        This ensures that the correct type is passed to getComics.*/
        await getComics(+newPage - 1);
    }
);

onMounted(async () => {
    // if (+currentPage.value === 0 || +currentPage.value === 1) {
    //     await getComics(1);
    // } else {
    await getComics(+currentPage - 1);
    // }
});

</script>

<template>
    <div class="text-white">
        <LoadingIndicator v-if="isLoading" text="Loading comics..." />
        <div v-if="data && !isLoading">
            <Pagination :totalPages="totalPages" :currentPage="+currentPage + 1" path="/">
            </Pagination>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ComicCard :key="comic.id" v-for="comic in data" :comic="comic"></ComicCard>
            </div>
            <Pagination :totalPages="totalPages" :currentPage="+currentPage + 1" path="/">
            </Pagination>
        </div>
    </div>
</template>


<!-- <template>
    <div class="relative">
        <div v-if="isLoading">
            <div class="flex items-center justify-center h-screen w-screen">
                <div class="relative">
                    <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div
                        class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                    </div>
                </div>
            </div>
        </div>
        <div v-if="data && !isLoading">
            <div class="grid grid-flow-row grid-cols-2 gap-8 lg:gap-20 md:grid-cols-4 lg:grid-cols-5 p-2">
                <div :key="comic.id" v-for="comic in data" class="">
                    <div class="flex flex-col h-full justify-end gap-2 grow">
                        <img class="rounded-xl w-full hover:ring"
                            :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`" alt="{{ comic.title }}">
                        <h2>{{ comic.title }}</h2>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template> -->