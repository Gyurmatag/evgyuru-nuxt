<template>
  <div class="flex flex-col">
    <Html>
      <Head>
        <Title>{{ $t("title.long") }}</Title>
      </Head>
    </Html>
    <div class="flex justify-center">
      <home-first />
    </div>
    <div class="flex justify-center bg-blue-100 bg-opacity-25">
      <home-second />
    </div>
  </div>
</template>
