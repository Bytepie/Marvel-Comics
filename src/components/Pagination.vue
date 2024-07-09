<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
    totalPages: number;
    maxPagesShown?: number;
    currentPage: number;
    path: string;
}>();


const isOnFirstPage = props.currentPage === 1;
const isOnLastPage = props.currentPage === props.totalPages;


console.log(props);

const bufferPagination = computed((): number[] => {
    const pagesArray: number[] = [];
    if (props.currentPage >= 5 && props.currentPage <= props.totalPages) {
        for (let i = props.currentPage - 2; i < props.currentPage + 3; i++) {
            if (props.currentPage > 2 && i < props.totalPages) {
                pagesArray.push(i);
            }
        }
    }
    if (props.currentPage <= 4 && props.currentPage + 4 < props.totalPages) {
        for (let i = props.currentPage - 1; i < props.currentPage + 5; i++) {
            if (i > 2 && i < 8) {
                pagesArray.push(i);
            }
        }
    }
    if (props.totalPages > 2 && props.totalPages < 5) {
        for (let i = props.currentPage - 1; i < props.currentPage + 5; i++) {
            if (i > 2) {
                pagesArray.push(i);
            }
        }
    }
    return pagesArray;
});

</script>

<template>
    <div class="flex flex-col items-center">
        <nav v-if="totalPages > 1" class="flex justify-center mt-4 mb-2">
            <span class="mr-1">
                <router-link class="px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"
                    :to="`${path}${currentPage - 1}`" v-if="!isOnFirstPage && currentPage !== 1">Previous</router-link>
                <span
                    class="opacity-40  px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"
                    v-else aria-hidden="true">Previous</span>
            </span>

            <div class="hidden sm:flex">
                <span class="mr-1">
                    <router-link
                        class="px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"
                        :to="`${path}1`" v-if="!isOnFirstPage && currentPage !== 1">1</router-link>
                    <span
                        class="opacity-40  px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"
                        v-else aria-hidden="true">1</span>
                </span>
                <span class="mr-1">
                    <router-link
                        class="px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"
                        :to="`${path}2`" v-if="currentPage !== 2">2</router-link>
                    <span
                        class="opacity-40  px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"
                        v-else aria-hidden="true">2</span>
                </span>
                <span class="mr-1 opacity-50" v-if="currentPage > 5 && currentPage <= totalPages">...</span>

                <span class="mr-1" v-for="thisPage in bufferPagination">
                    <router-link
                        class="px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"
                        :to="`${path}${thisPage}`" v-if="thisPage !== currentPage">{{ thisPage }}</router-link>
                    <span
                        class="opacity-40  px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"
                        v-else aria-hidden="true">{{ thisPage
                        }}</span>
                </span>
                <span class="mr-1 opacity-50" v-if="currentPage + 3 < totalPages">...</span>
                <span class="mr-1">
                    <router-link
                        class="px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"
                        :to="`${path}${totalPages}`" v-if="!isOnLastPage">{{ totalPages }}</router-link>
                    <span
                        class="opacity-40  px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"
                        v-else aria-hidden="true">{{ totalPages
                        }}</span>
                </span>
            </div>
            <span class="mr-1">
                <router-link class="px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"
                    :to="`${path}${currentPage + 1}`" v-if="!isOnLastPage">Next</router-link>
                <span
                    class="opacity-40  px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"
                    v-else aria-hidden="true">Next</span>
            </span>
        </nav>
        <div class="my-2">Page <span class="font-bold">{{ currentPage }}</span> of {{ totalPages }}</div>
    </div>
</template>


<!-- 
<template>
    <nav v-if="totalPages > 1" class="flex justify-center my-8">
        <span class="mr-1">
            <router-link class="px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"  :to="`${path}${currentPage - 1}`"
                v-if="!isOnFirstPage && currentPage !== 1">Previous</router-link>
            <span class="opacity-40  px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800" v-else aria-hidden="true">Previous</span>
        </span>

        <div class="hidden sm:flex gap-2">
            <span class="mr-1">
                <router-link class="px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"  :to="`${path}1`" v-if="!isOnFirstPage && currentPage !== 1">1</router-link>
                <span class="opacity-40  px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800" v-else aria-hidden="true">1</span>
            </span>
            <span class="mr-1 opacity-50" v-if="currentPage > 5 && currentPage < totalPages - 5">...</span>
            <div v-if="currentPage < totalPages - 5">
                <span class="mr-1" v-for="thisPage in currentPage + 4">
                    <router-link class="px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"  :to="`${path}${thisPage}`" v-if="thisPage !== thisPage">{{ thisPage }}</router-link>
                    <span class="opacity-40  px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800" v-else aria-hidden="true">{{ thisPage }}</span>
                </span>
            </div>
            <span class="mr-1 opacity-50" v-if="currentPage + 5 < totalPages">...</span>
        </div>
        <span class="mr-1">
            <router-link class="px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"  :to="`${path}${totalPages}`" v-if="!isOnLastPage">{{ totalPages }}</router-link>
            <span class="opacity-40  px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800" v-else aria-hidden="true">{{ totalPages }}</span>
        </span>
        <span class="mr-1">
            <router-link class="px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800"  :to="`${path}${currentPage + 1}`" v-if="!isOnLastPage">Next</router-link>
            <span class="opacity-40  px-2 flex items-center rounded bg-gray-800 shadow-md hover:ring-1 ring-red-800" v-else aria-hidden="true">Next</span>
        </span>
    </nav>
</template> -->