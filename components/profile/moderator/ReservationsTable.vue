<template>
  <div>
    <div class="mt-4 divide-y divide-gray-600 overflow-auto">
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">
              {{ $t("profile.moderator.courses.table.parentName") }}
            </th>
            <th scope="col" class="px-6 py-3">
              {{ $t("profile.moderator.courses.table.childName") }}
            </th>
            <th scope="col" class="px-6 py-3">
              {{ $t("profile.moderator.courses.table.telephoneNumber") }}
            </th>
            <th scope="col" class="px-6 py-3">
              {{ $t("profile.moderator.courses.table.email") }}
            </th>
            <th scope="col" class="px-6 py-3">
              {{ $t("profile.moderator.courses.table.address") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="reservation in reservationList"
            :key="reservation._id"
            class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <th class="px-6 py-4">
              {{ reservation.user.fullName }}
            </th>
            <td class="px-6 py-4">
              <div v-for="child in reservation.children" :key="child._id">
                {{ child.name }}
              </div>
            </td>
            <td class="px-6 py-4">
              {{ reservation.user.telephoneNumber }}
            </td>
            <td class="px-6 py-4">
              {{ reservation.user.email }}
            </td>
            <td class="px-6 py-4">
              {{ reservation.user.zipCode }}, {{ reservation.user.city }},
              {{ reservation.user.streetAddress }}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="!reservationList.length"
        class="py-3 text-sm dark:text-gray-400"
      >
        {{ $t("profile.moderator.courses.noReservations") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Reservation } from "~/models/reservation";

defineProps({
  reservationList: {
    type: Object as PropType<[Reservation]>,
    default: null,
  },
});
</script>
