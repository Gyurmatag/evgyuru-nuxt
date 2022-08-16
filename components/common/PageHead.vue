<template>
  <Head>
    <!-- TODO: ide refakt kell, a script-ben kéne ezt összerakni computed property-ben, vagy i18n-es fallback-el, csak nem találom, hol  lehet script oldalon i18n-t használni nuxt 3-ban -->
    <Title>
      {{
        subtitle
          ? isDynamicData
            ? `${subtitle} | `
            : `${$t(subtitle)} | `
          : ""
      }}
      {{ $t("title.long") }}
    </Title>
    <Meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />
  </Head>
</template>

<script setup lang="ts">
defineProps({
  subtitle: {
    type: String,
    required: false,
    default: "",
  },
  isDynamicData: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
