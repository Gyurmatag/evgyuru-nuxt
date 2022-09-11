<template>
  <div class="my-8 flex flex-col items-center justify-center px-4 md:flex-row">
    <div class="mb-4 flex max-w-6xl flex-col items-center">
      <div class="m-8 flex flex-col items-center space-y-6">
        <h1 class="text-center text-xl text-gray-800 dark:text-gray-200">
          {{ $t("home.homeThird.reviewsTitle") }}
        </h1>
      </div>
      <div
        class="flex w-full flex-col space-y-2 lg:space-y-0 lg:space-x-2 lg:flex-row"
      >
        <home-review-card
          :review-text-key="'home.homeThird.review.first.reviewText'"
          :date-key="'home.homeThird.review.first.reviewDate'"
          :parent-name-key="'home.homeThird.review.first.parentName'"
        ></home-review-card>
        <home-review-card
          :review-text-key="'home.homeThird.review.second.reviewText'"
          :date-key="'home.homeThird.review.second.reviewDate'"
          :parent-name-key="'home.homeThird.review.second.parentName'"
        ></home-review-card>
        <home-review-card
          :review-text-key="'home.homeThird.review.third.reviewText'"
          :date-key="'home.homeThird.review.third.reviewDate'"
          :parent-name-key="'home.homeThird.review.third.parentName'"
        ></home-review-card>
      </div>
    </div>
  </div>
</template>
