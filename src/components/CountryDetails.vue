<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getCountry } from "./getFunctions";

const route = useRoute();
const currentRoute = ref("");
const cc = ref("");

async function fetchCountryData(country) {
  try {
    const data = await getCountry(country);
    return data;
  } catch (error) {
    console.error("Error fetching countries", error);
    return [];
  }
}
onMounted(async () => {
  cc.value = await fetchCountryData(route.params.alpha3Code);
});
watch(route, async () => {
  cc.value = await fetchCountryData(route.params.alpha3Code);
});
</script>

<template>
  <div class="col-7" v-if="cc">
    <img
      :src="`https://flagpedia.net/data/flags/w580/${cc.alpha2Code.toLowerCase()}.webp`"
      alt="country flag"
      style="width: 300px"
    />
    <h1>{{ cc.name.common }}</h1>
    <table class="table">
      <tbody>
        <tr>
          <td style="width: 30%">Capital</td>
          <td>{{ cc.capital[0] }}</td>
        </tr>
        <tr>
          <td>Area</td>
          <td>{{ cc.area }} km <sup>2</sup></td>
        </tr>
        <tr>
          <td>Borders</td>
          <td>
            <ul v-for="(borderCountry, index) in cc.borders" :key="index">
              <li>
                <router-link class="" :to="`/list/${borderCountry}`">{{
                  borderCountry
                }}</router-link>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
