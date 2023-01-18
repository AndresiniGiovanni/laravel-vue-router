<template>
  <section>
    <h1 class="text-white mt-5 mb-5 text-center">Projects List</h1>

    <div class="row">
      <div
        class="col-12 col-md-4"
        v-for="(project, index) in projects"
        :key="index"
      >
        <div class="card mb-3" style="width: 20rem">
          <img
            :src="`${store.imageBasePath}${project.cover_img}`"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{{ project.title }}</h5>
            <p class="card-text">{{ truncateContent(project.content) }}</p>
            <router-link
              class="btn btn-primary"
              :to="{ name: 'single-project', params: { slug: project.slug } }"
              >Show Project</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { store } from "../store";
export default {
  name: "ProjectList",
  data() {
    return {
      store,
      projects: [],
      CurrentPage: 1,
      total: 0,
      contentMaxLen: 100,
    };
  },
  methods: {
    getProjects(pagenum) {
      axios
        .get(`${this.store.apiBaseUrl}/projects`, {
          params: {
            page: pagenum,
          },
        })
        .then((response) => {
          // console.log(response.data);
          this.projects = response.data.results.data;
          this.currentpage = response.data.results.current_page;
          this.lastPage = response.data.results.last_page;
          this.total = response.data.results.total;
        });
    },
    truncateContent(text) {
      if (text.length > this.contentMaxLen) {
        return text.substr(0, this.contentMaxLen) + "...";
      }
      return text;
    },
  },
  mounted() {
    this.getProjects(1);
  },
};
</script>

<style lang="scss" scoped></style>
