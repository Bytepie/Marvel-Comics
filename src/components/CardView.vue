<template>
    <article class="p-4 bg-black border border-red-900 bg-opacity-75 rounded-lg drop-shadow-md place-content-start text-slate-100">
        <header>
            <h1 class="pb-5 text-lg font-semibold">
                <slot name="header"></slot>
            </h1>
        </header>
        <slot></slot>
    </article>
</template>