<template>
  <div
    class="my-8 flex max-w-6xl flex-col items-center justify-center px-4 md:flex-row"
  >
    <div class="flex w-screen flex-col space-y-4 p-4">
      <common-hint-card
        v-if="!userStore.user.isActivated"
        :hint-key="'profile.notActivatedHint'"
      ></common-hint-card>
      <div class="flex justify-between">
        <div class="flex flex-col font-bold text-gray-800 dark:text-gray-200">
          <div
            class="flex cursor-pointer items-center space-x-1 text-2xl hover:text-gray-600 dark:hover:text-gray-400"
            @click="isProfileSettingsExpanded = !isProfileSettingsExpanded"
          >
            <p>
              {{ $t("profile.greeting", { name: userStore.user.fullName }) }}
            </p>
            <span
              class="material-icons-outlined origin-center transform font-black transition duration-300"
              :class="isProfileSettingsExpanded ? 'rotate-90' : ''"
            >
              arrow_right
            </span>
          </div>
          <common-transition-expand>
            <!-- TODO: ha itt lesz több minden, ki kell szervezni külön komponensbe -->
            <div v-if="isProfileSettingsExpanded">
              <div
                class="mb-3 mt-3 flex items-center text-xs text-gray-600 transition duration-300 ease-in-out hover:text-red-700 dark:text-gray-300 dark:hover:text-red-700"
                @click="
                  isProfileDeleteConfirmationMessageVisible =
                    !isProfileDeleteConfirmationMessageVisible
                "
              >
                <span class="material-icons-outlined cursor-pointer font-light">
                  delete
                </span>
                <span class="cursor-pointer">{{
                  $t("profile.accountActions.deleteAccount")
                }}</span>
              </div>
              <common-transition-expand>
                <common-delete-confirmation-panel
                  v-if="isProfileDeleteConfirmationMessageVisible"
                  confirmation-msg-key="profile.accountActions.deleteAccountConfirmationMessage"
                  @cancel-delete="
                    isProfileDeleteConfirmationMessageVisible = false
                  "
                  @delete="deleteAccount()"
                ></common-delete-confirmation-panel>
              </common-transition-expand>
            </div>
          </common-transition-expand>
        </div>
        <button
          v-if="!isProfileSettingsExpanded"
          class="text-sm text-red-600 hover:text-red-700"
          @click="logoutUser"
        >
          {{ $t("profile.logout") }}
        </button>
      </div>
      <profile-moderator-course-feed
        v-if="userStore.hasModeratorRole"
      ></profile-moderator-course-feed>
      <profile-user-course-feed
        v-else-if="userStore.isSimpleUser"
      ></profile-user-course-feed>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { FetchMethods } from "~/models/enums";

const userStore = useUserStore();

const isProfileSettingsExpanded = ref(false);
const isProfileDeleteConfirmationMessageVisible = ref(false);

const logoutUser = async () => {
  await navigateTo({
    path: "/",
  });
  userStore.$reset();
};

// TODO: error kezelés
const deleteAccount = async () => {
  const { data } = await useCustomFetch({
    path: `${AUTH}/${DELETE}`,
    method: FetchMethods.DELETE,
    isAuthenticated: true,
  });

  if (data) {
    await logoutUser();
  }
};
</script>
