<template>
  <div class="flex flex-col">
    <Html>
      <Head>
        <Title>{{ $t("title.long") }}</Title>
      </Head>
    </Html>
    <div class="flex justify-center dark:bg-gray-800">
      <home-first />
    </div>
    <div class="flex justify-center bg-blue-100 bg-opacity-25 dark:bg-gray-700">
      <home-second />
    </div>
  </div>
</template>
