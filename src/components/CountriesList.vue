<script setup>
import { ref, onMounted } from "vue";
import { getCountries } from "./getFunctions.js";

const countriesData = ref([]);

onMounted(async () => {
  countriesData.value = await fetchCountriesData();
});

async function fetchCountriesData() {
  try {
    const data = await getCountries();
    return data;
  } catch (error) {
    console.error("Error fetching countries", error);
    return [];
  }
}
</script>

<template>
  <div class="col-5" style="max-height: 90vh; overflow: scroll">
    <div
      class="list-group"
      v-for="(country, index) in countriesData"
      :key="index"
    >
      <router-link
        class="list-group-item list-group-item-action"
        :to="`/list/${country.alpha3Code}`"
      >
        <img
          :src="`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`"
        />
        <p>{{ country.name.common }}</p>
      </router-link>
    </div>
  </div>
</template>

<style></style>
