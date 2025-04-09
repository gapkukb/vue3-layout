<script setup lang="ts">
import Terms from './Terms.vue';
import Privacy from './Privacy.vue';
</script>

<template>
  <Terms />
  <Privacy />


</template>

<style lang="scss">
.terms {
  @apply text-14 p-16;

  h2 {
    @apply text-#111 text-20 font-600 text-center;
  }

  h3,
  h4 {
    @apply text-#111 font-600;
  }

  h3 {
    @apply pt-16 pb-4;
  }

  h4 {
    @apply py-16;
  }

  section,
  p,
  div {
    @apply text-#666 font-400;
  }

  p+p,
  p+div,
  div+p,
  div+div {
    padding-top: 16px;
  }

  div>p {
    padding-left: 16px;
  }
}
</style>
