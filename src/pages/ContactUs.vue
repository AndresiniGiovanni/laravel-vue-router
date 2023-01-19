<template>
  <section class="container">
    <div class="row">
      <div class="col-12">
        <ContactForm></ContactForm>
      </div>
    </div>
  </section>
</template>

<script>
import ContactForm from "../components/ContactForm.vue";
export default {
  name: "ContactUs",
  components: {
    ContactForm,
  },
};
</script>

<style lang="scss" scoped></style>
