<template>
  <div class="my-8 flex flex-col items-center justify-center px-4 md:flex-row">
    <div class="mb-4 flex max-w-6xl flex-col items-center">
      <div
        class="black:divide-blue-400 flex w-full flex-col space-y-2 divide-x-0 divide-y-2 divide-blue-600 lg:space-y-0 lg:space-x-2 md:divide-y-0 lg:divide-x-2 lg:flex-row"
      >
        <div class="">
          <home-stat-card
            :number="4"
            :number-text="'home.homeFourth.stat.first.numberText'"
          ></home-stat-card>
          <home-stat-card
            :number="51"
            :number-text="'home.homeFourth.stat.second.numberText'"
          ></home-stat-card>
        </div>
        <div>
          <home-stat-card
            :number="12"
            :number-text="'home.homeFourth.stat.third.numberText'"
          ></home-stat-card>
          <home-stat-card
            :number="93"
            :number-text="'home.homeFourth.stat.fourth.numberText'"
          ></home-stat-card>
        </div>
      </div>
    </div>
  </div>
</template>
