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
                          >All</a
                        >
                        <a
                          class="nav-item nav-link"
                          id="nav-profile-tab"
                          data-toggle="tab"
                          href=""
                          role="tab"
                          aria-controls="nav-profile"
                          aria-selected="false"
                          >Lifestyle</a
                        >
                        <a
                          class="nav-item nav-link"
                          id="nav-contact-tab"
                          data-toggle="tab"
                          href=""
                          role="tab"
                          aria-controls="nav-contact"
                          aria-selected="false"
                          >Travel</a
                        >
                        <a
                          class="nav-item nav-link"
                          id="nav-last-tab"
                          data-toggle="tab"
                          href=""
                          role="tab"
                          aria-controls="nav-contact"
                          aria-selected="false"
                          >Fashion</a
                        >
                        <a
                          class="nav-item nav-link"
                          id="nav-Sports"
                          data-toggle="tab"
                          href=""
                          role="tab"
                          aria-controls="nav-contact"
                          aria-selected="false"
                          >Sports</a
                        >
                        <a
                          class="nav-item nav-link"
                          id="nav-technology"
                          data-toggle="tab"
                          href="details.htmlnav-techno"
                          role="tab"
                          aria-controls="nav-contact"
                          aria-selected="false"
                          >Technology</a
                        >
                      </div>
                    </nav>
                    <!--End Nav Button  -->
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
                          <div
                            class="col-lg-6 col-md-6"
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

    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/categories");
        if (res.statusText !== "OK") {
          throw new Error("fail category data");
        }
        categories.value = res.data;
      } catch (err) {
        error.value = err.message;
        console.log(err.message);
      }
    };

    const getPostsData = async () => {
      const res = await axios.get("http://localhost:8000/api/posts");
      console.log(res.data);
      if (res.data.mess == "success") {
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].image != null) {
            res.data.data[
              i
            ].image = `http://localhost:8000/postsImage/${res.data.data[i].image}`;
          } else {
            res.data.data[
              i
            ].image = `http://localhost:8000/postsImage/default.png`;
          }
        }
        posts.value = res.data.data;
      }
    };

    onMounted(() => {
      getData();
      getPostsData();
    });

    return { getData, error, categories, getPostsData, posts };
  },
};
</script>
