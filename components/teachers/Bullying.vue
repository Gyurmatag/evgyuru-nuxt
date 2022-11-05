<template>
  <common-page-head :subtitle="'page.title.forTeachers'"></common-page-head>
  <div class="mb-4 flex max-w-6xl flex-col items-center">
    <div class="m-8 flex items-center space-y-6">
      <article class="prose prose-slate dark:prose-invert">
        <ContentDoc path="/bullying" />
        <img
          alt="main photo"
          src="https://res.cloudinary.com/gyurmatag/image/upload/v1667645504/%C3%89vgy%C5%B1r%C5%B1/bullying.png"
          class="m-auto w-full rounded-md border-8 border-blue-100 border-opacity-50 opacity-80 dark:border-blue-900 md:w-1/2"
        />
      </article>
    </div>
  </div>
</template>
