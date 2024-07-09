<script setup lang="ts">
import { computed } from "vue";
import type { Comic } from "@/types/marvel";

import CardView from "./CardView.vue";

const props = defineProps<{
    comic: Comic;
}>();

const lf = new Intl.ListFormat("en");

const charactersList = computed(() =>
    props.comic.characters.items.map((c) => c.name)
);
const creatorsList = computed(() =>
    props.comic.creators.items.map((c) => c.name)
);
</script>
<template>
    <CardView>
        <!-- we can also use
            <template #header> {{ comic.title }} </template>
-->
        <template v-slot:header>
            {{ comic.title }}
        </template>
        <template v-slot:default>
            <img class="aspect-[150/228] shadow-xl float-left mr-4 rounded border"
                :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`" width="150" />
            <dl>
                <dt>Series:</dt>
                <dd>{{ comic.series.name }}</dd>
                <div v-if="charactersList.length > 0">
                    <dt>Characters:</dt>
                    <dd>{{ lf.format(charactersList) }}</dd>
                </div>
                <div v-if="creatorsList.length > 0">
                    <dt>Creators:</dt>
                    <dd>{{ lf.format(creatorsList) }}</dd>
                </div>
            </dl>
        </template>
    </CardView>
</template>