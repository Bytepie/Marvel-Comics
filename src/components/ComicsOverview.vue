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
    await getComics(+currentPage - 1);
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
