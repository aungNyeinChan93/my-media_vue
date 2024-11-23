<template>
  <div class="home">
    <main>
      <!-- Whats New Start -->
      <section class="whats-news-area pt-50 pb-20">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="row d-flex justify-content-between">
                <div class="col-lg-3 col-md-3">
                  <div class="section-tittle mb-30">
                    <h3>Whats New</h3>
                  </div>
                </div>
                <div class="col-lg-9 col-md-9">
                  <div class="properties__button">
                    <!--Nav Button  -->
                    <nav>
                      <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a
                          class="nav-item nav-link active"
                          id="nav-home-tab"
                          data-toggle="tab"
                          href="details.htmlnav-home"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                          @click="categorySearch(null)"
                          >All
                        </a>
                        <a
                          v-for="category of categories"
                          :key="category.id"
                          class="nav-item nav-link"
                          id="nav-home-tab"
                          data-toggle="tab"
                          href="details.htmlnav-home"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                          @click="categorySearch(category.name)"
                          >{{ category.name }}
                        </a>
                      </div>
                    </nav>
                    <!--End Nav Button  -->
                  </div>
                </div>
              </div>
              <!-- search bar -->
              <div class="row">
                <div class="col-3 offset-9">
                  <div class="d-flex my-2 justify-content-around">
                    <input
                      type="text"
                      name="search"
                      class="p-1 border-0 hover:border-1"
                      placeholder="Search"
                      v-model="searchKey"
                      @keyup.enter="searchPosts"
                    />

                    <div class="pt-1" @click="searchPosts">
                      <i class="fas fa-search"></i>
                    </div>
                    <!-- <button class="btn btn-sm btn-secondary">Search</button> -->
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <!-- Nav Card -->
                  <div class="tab-content" id="nav-tabContent">
                    <!-- card one -->
                    <div
                      ref="col-6"
                      class="tab-pane fade show active"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <div class="whats-news-caption">
                        <div class="row">
                          <!-- empty posts -->
                          <div
                            v-if="!posts.length"
                            class="min-vh-100 mx-auto d-flex align-items-center"
                            style="height: 80vh"
                          >
                            <div class="alert alert-danger">Empty Posts</div>
                          </div>
                          <!-- empty posts end -->

                          <div
                            v-show="posts.length"
                            class="col-lg-4 col-md-6"
                            v-for="post of posts"
                            :key="post.id"
                          >
                            <div class="single-what-news mb-100">
                              <div class="what-img">
                                <img alt="" :src="post.image" />
                              </div>
                              <div class="what-cap">
                                <span class="color1">{{ post.title }}</span>
                                <h4>
                                  <a href="details.html">{{ post.title }}</a>
                                  <router-link
                                    :to="{ name: 'postDetail', params: { id: post.id } }"
                                  >
                                    {{ post.title }}
                                  </router-link>
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- End Nav Card -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Whats New End -->

      <!--Start pagination -->
      <div class="pagination-area pb-45 text-center">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <div class="single-wrap d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-start">
                    <li class="page-item">
                      <a class="page-link" href="details.html"
                        ><span class="flaticon-arrow roted"></span
                      ></a>
                    </li>
                    <li class="page-item active">
                      <a class="page-link" href="details.html">01</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="details.html">02</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="details.html">03</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="details.html"
                        ><span class="flaticon-arrow right-arrow"></span
                      ></a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End pagination  -->
    </main>
  </div>
</template>

<script>
import router from "@/router";
import axios from "axios";
import { onMounted, ref } from "vue";

// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
  setup() {
    const error = ref("");
    const categories = ref([]);
    const posts = ref([]);
    const searchKey = ref("");

    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/categories");
        if (res.statusText !== "OK") {
          throw new Error("fail category data");
        }
        categories.value = res.data.data;
      } catch (err) {
        error.value = err.message;
        console.log(err.message);
      }
    };

    const getPostsData = async () => {
      const res = await axios.get("http://localhost:8000/api/posts");
      // console.log(res.data);
      if (res.data.mess == "success") {
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].image != null) {
            res.data.data[
              i
            ].image = `http://localhost:8000/postsImage/${res.data.data[i].image}`;
          } else {
            res.data.data[i].image = `http://localhost:8000/postsImage/default.png`;
          }
        }
        posts.value = res.data.data;
      }
    };

    // backend filter
    const searchPosts = async () => {
      const res = await axios.post("http://localhost:8000/api/posts/search", {
        key: searchKey.value,
      });
      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].image != null) {
          res.data.data[
            i
          ].image = `http://localhost:8000/postsImage/${res.data.data[i].image}`;
        } else {
          res.data.data[i].image = `http://localhost:8000/postsImage/default.png`;
        }
      }
      posts.value = res.data.data;
    };

    const categorySearch = async (category) => {
      const res = await axios.post(`http://localhost:8000/api/categories/search`, {
        key: category,
      });
      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].image != null) {
          res.data.data[
            i
          ].image = `http://localhost:8000/postsImage/${res.data.data[i].image}`;
        } else {
          res.data.data[i].image = "http://localhost:8000/postsImage/default.png";
        }
        posts.value = res.data.data;
      }
    };

    // const postDetail = (id) => {
    //   router.push({ name: "postDetail", params: { postId: id } });
    // };

    onMounted(() => {
      getData();
      getPostsData();
    });

    return {
      getData,
      error,
      categories,
      getPostsData,
      posts,
      searchKey,
      searchPosts,
      categorySearch,
      // postDetail,
    };
  },
};
</script>
