<template>
  <div class="flex flex-col">
    <Html>
      <Head>
        <Title>{{ $t('title.long') }}</Title>
      </Head>
    </Html>
    <div class="flex justify-center bg-gradient-to-b from-cyan-500 to-blue-700">
      <home-first />
    </div>
    <div class="flex justify-center bg-gray-100">
      <home-second />
    </div>
  </div>
</template>
