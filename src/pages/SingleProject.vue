<template>
  <section v-if="project">
    <h1>{{ project.title }}</h1>
    <img
      :src="`${store.imageBasePath}${project.cover_img}`"
      class="card-img-top"
      alt="..."
    />
    <p>{{ project.content }}</p>
    <div v-if="project.type">
      <h5>Type: {{ project.type.name }}</h5>
    </div>

    <div v-if="project.technologies && project.technologies.length">
      <h5>Technologies</h5>
      <div>
        <span
          v-for="(technology, index) in project.technologies"
          :key="index"
          class="badge bg-info text-dark"
          >{{ technology.name }}</span
        >
      </div>
    </div>
  </section>
  <section v-else>Loading...</section>
</template>

<script>
import axios from "axios";
import { store } from "../store";
export default {
  name: "SingleProject",
  data() {
    return {
      store,
      project: null,
    };
  },
  methods: {
    getProjects() {
      console.log(this.$route);
      axios
        .get(`${this.store.apiBaseUrl}/projects/${this.$route.params.slug}`)
        .then((response) => {
          console.log(response.data);

          if (response.data.success) {
            console.log(response.data);
            this.project = response.data.results;
          } else {
            console.log(this.$router);
            this.$router.push({ name: "not found" });
          }
        });
    },
  },
  mounted() {
    this.getProjects();
  },
};
</script>

<style lang="scss" scoped></style>
