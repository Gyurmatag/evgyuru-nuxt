<template>
  <common-page-head :subtitle="'page.title.help'"></common-page-head>
  <div
    class="my-8 flex max-w-6xl flex-col items-center justify-center md:flex-row"
  >
    <!-- TODO: w-screen szép/jó megoldás itt, miért működik? -->
    <div class="flex w-screen flex-col space-y-4 p-4">
      <!-- TODO: esetlegesen ezt header szerű cuccot ki lehetne szervezni ha sok oldalon van használva -->
      <h1
        class="text-center text-3xl font-black text-gray-800 dark:text-gray-200"
      >
        {{ $t("help.title") }}
      </h1>
      <div class="flex space-x-2">
        <a
          class="cursor-pointer rounded-md border-2 border-gray-100 bg-gray-50 p-4 text-gray-800 transition duration-300 ease-in-out hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          @click="scrollToPreschoolCamps"
        >
          {{ $t("help.preschoolCamps.title") }}
        </a>
      </div>
      <h2
        ref="preschoolCamps"
        class="text-lg font-bold text-gray-800 dark:text-gray-200"
      >
        {{ $t("help.preschoolCamps.title") }}
      </h2>
      <div v-for="faq in faqList.preschoolCamps" :key="faq.question">
        <help-question-card
          :question="faq.question"
          :answer="faq.answer"
        ></help-question-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const faqList = QUESTIONS;

const preschoolCamps = ref(null);

const scrollToPreschoolCamps = () => {
  preschoolCamps.value.scrollIntoView({ behavior: "smooth" });
};
</script>
