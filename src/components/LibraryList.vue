<template>
  <v-row dense no-gutters justify="center">
    <library-item v-for="(item, i) in library" :key="i" :item="item"/>
  </v-row>
</template>

<script>
import LibraryItem from "@/components/LibraryItem";

export default {
  name: "LibraryList",
  components: {LibraryItem},
  props: {
    library: Array
  },
}
</script>

<style scoped>
</style>