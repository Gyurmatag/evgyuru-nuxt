<template>
  <div class="flex flex-col items-center mb-2 space-y-2 rounded">
    <div class="flex w-full justify-center py-5 text-xl text-gray-800">
      {{ $t('documents.financialStatements.title') }}
    </div>
    <div class="w-full max-w-xl p-5 bg-blue-700 text-gray-300 text-center rounded-lg">
      <div>{{ $t('documents.financialStatements.year.2021') }}</div>
      <a
        href="https://res.cloudinary.com/gyurmatag/image/upload/v1644427612/%C3%89vgy%C5%B1r%C5%B1/P%C3%A9nz%C3%BCgyi%20besz%C3%A1mol%C3%B3k/OBHGEPI_PK_742_19316750110_E%CC%81vgyu%CC%88ru%CC%88_Alapi%CC%81tva%CC%81ny_6234980117913700_323404567414.pdf"
        target="_blank"
      >
        <img
          alt="PDF ikon"
          src="../../assets/svgs/pdf.svg"
          class="m-auto h-14 p-2"
        >
      </a>
    </div>
  </div>
</template>
