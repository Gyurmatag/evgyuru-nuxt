<template>
  <!-- TODO: megnézni hogy mi ez a marginos összeolvadás? -->
  <div class="flex w-full flex-col p-2.5">
    <label for="fileUpload">
      <span
        class="cursor-pointer rounded-md rounded-lg border-2 border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700 transition duration-300 ease-in-out hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-500"
        :class="uploadPending ? 'disabled animate-pulse' : ''"
      >
        <i
          class="material-icons-outlined text-sm"
          :class="{ 'text-green-600': uploadDone }"
        >
          {{ uploadDone ? "check" : "attach_file" }}
        </i>
        {{
          uploadDone ? $t("common.replacePicture") : $t("common.browsePicture")
        }}
      </span>
    </label>
    <input
      id="fileUpload"
      type="file"
      class="hidden"
      accept="image/*"
      @change="uploadFileSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { useCustomFetch } from "~/composables/myFetch";
import { FetchMethods } from "~/models/enums";
import { BaseResponse } from "~/models/baseResponse";
import { Image } from "~/models/image";

const uploadPending = ref(false);
const uploadDone = ref(false);

const emit = defineEmits<{
  (e: "imageUploaded", url: string): void;
}>();

// TODO: hiba kezelés
const uploadFileSelected = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const fileData = await toBase64(input.files[0]);
  uploadPending.value = true;
  const { data } = await useCustomFetch<BaseResponse<Image>>({
    path: `${EXTERNAL}/${IMAGE_UPLOAD}`,
    method: FetchMethods.POST,
    isAuthenticated: true,
    body: {
      image: fileData,
    },
  });
  uploadPending.value = false;
  uploadDone.value = true;
  emit("imageUploaded", data.value.result.secure_url);
};
</script>
