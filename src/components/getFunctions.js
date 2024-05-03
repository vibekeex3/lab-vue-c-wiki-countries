async function getCountries() {
  try {
    const resp = await fetch(
      "https://ih-countries-api.herokuapp.com/countries"
    );
    if (!resp.ok) {
      throw new Error("Failed to fetch the information");
    }
    const countriesData = await resp.json();
    return countriesData;
  } catch (error) {
    console.error("Error fetching countries: ", error);
    return null;
  }
}

async function getCountry(country) {
  try {
    const resp = await fetch(
      `https://ih-countries-api.herokuapp.com/countries/${country}`
    );
    if (!resp.ok) {
      throw new Error("Failed to fetch the information");
    }
    const countriesData = await resp.json();
    return countriesData;
  } catch (error) {
    console.error("Error fetching country: ", error);
    return null;
  }
}

export { getCountries, getCountry };
