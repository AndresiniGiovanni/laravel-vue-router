<template>
  <section class="container">
    <h1 class="text-white project-list-title text-center text-uppercase">
      Projects List
    </h1>

    <div class="row ms-5">
      <div
        class="col-12 col-md-4"
        v-for="(project, index) in projects"
        :key="index"
      >
        <div class="card gap-3 my-card" style="width: 20rem">
          <img
            :src="`${store.imageBasePath}${project.cover_img}`"
            class="card-img-top"
            alt=""
          />
          <div class="card-body">
            <h5 class="card-title">{{ project.title }}</h5>
            <p style="font-size: 14px" class="card-text">
              {{ truncateContent(project.content) }}
            </p>
            <router-link
              class="btn btn-secondary"
              :to="{ name: 'single-project', params: { slug: project.slug } }"
              >Show Project</router-link
            >
          </div>
        </div>
      </div>
    </div>

    <nav class="d-flex justify-content-center ">
      <ul class="pagination">
        <li class="page-item " :class="{ disabled: currentPage === 1 }">
          <button
            class="page-link bg-dark btn border-0 text-white"
            :disabled="currentPage === 1"
            @click="getProjects(currentPage - 1)"
          >
            Previous
          </button>
        </li>

        <li class="page-item" v-for="n in lastPage">
          <button class="page-link bg-dark btn border-0 text-white" @click="getProjects(n)">{{ n }}</button>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === lastPage }">
          <button
            class="page-link bg-dark btn border-0 text-white"
            :disabled="currentPage === lastPage"
            @click="getProjects(currentPage + 1)"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
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
      currentPage: 1,
      total: 0,
      contentMaxLen: 100,
      active: false,
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
          this.currentPage = response.data.results.current_page;
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
