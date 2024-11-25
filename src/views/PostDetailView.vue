<template>
  <section>
    <main>
      <!-- About US Start -->
      <div class="about-area">
        <div class="container">
          <!-- login section -->
          <div class="row">
            <div class="col-lg-12">
              <div class="d-sm-block d-lg-flex justify-content-between my-3">
                <div class="btn btn-blue">
                  <router-link :to="{ name: 'home' }">Home</router-link>
                </div>
                <div class="btn btn-blue" v-if="!getToken">
                  <router-link :to="{ name: 'login' }">Login</router-link>
                </div>
                <div class="btn btn-blue" v-if="getToken">
                  <router-link :to="{ name: 'logoutAction' }">Logout</router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- login section end -->

          <div class="row">
            <div class="col-lg-8">
              <!-- Trending Tittle -->
              <div class="about-right mb-90">
                <div class="about-img">
                  <img :src="post.image" alt="" />
                </div>
                <div class="section-tittle mb-30 pt-30">
                  <h3>{{ post.title }}</h3>
                </div>
                <div class="section-tittle mb-30 pt-30">
                  <h5>Category - {{ category }}</h5>
                </div>
                <div class="about-prea">
                  <p class="about-pera1 mb-25">
                    {{ post.description }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <!-- Section Tittle -->

              <div class="section-tittle mb-40">
                <h3>Reaction</h3>
              </div>

              <!-- Flow Socail -->
              <div class="single-follow mb-45">
                <div class="single-box">
                  <div class="follow-us d-flex align-items-center">
                    <div class="follow-social">
                      <!-- <a href="#"><img src="assets/img/news/icon-fb.png" alt="" /></a> -->
                      LIKE
                    </div>
                    <div class="follow-count">
                      <span>8,045</span>
                      <p>Fans</p>
                    </div>
                  </div>

                  <div class="follow-us d-flex align-items-center">
                    <div class="follow-social">
                      <!-- <a href="#"><img src="assets/img/news/icon-tw.png" alt="" /></a> -->
                      COMMENT
                    </div>
                    <div class="follow-count">
                      <span>8,045</span>
                      <p>Fans</p>
                    </div>
                  </div>

                  <div class="follow-us d-flex align-items-center">
                    <div class="follow-social">
                      <i class="fas fa-eye"></i>
                      <!-- <a href="#"><img src="assets/img/news/icon-ins.png" alt="" /></a> -->
                    </div>
                    <div class="follow-count">
                      <span>{{ viewCounts }}</span>
                      <p v-if="viewCounts <= 1">view</p>
                      <p v-else>views</p>
                    </div>
                  </div>

                  <div class="follow-us d-flex align-items-center">
                    <div class="follow-social">
                      <a href="#"><img src="assets/img/news/icon-yo.png" alt="" /></a>
                    </div>
                    <div class="follow-count">
                      <span>8,045</span>
                      <p>Fans</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- New Poster -->
              <div class="news-poster d-none d-lg-block">
                <img src="assets/img/news/news_card.jpg" alt="" />
              </div>
            </div>
          </div>

          <!-- back btn -->
          <div class="row">
            <div class="col-2">
              <router-link class="btn my-2" :to="{ name: 'home' }">Back</router-link>
            </div>
          </div>
          <!-- back btn end  -->
        </div>
      </div>
      <!-- About US End -->
    </main>
  </section>
</template>

<script>
import store from "@/store";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { mapGetters, mapState, useStore } from "vuex";

export default {
  name: "PostDetailView",
  props: {
    id: {
      // type: Number,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();
    const route = useRoute();
    const postId = route.params.id;
    const post = ref({});
    const category = ref("");
    const viewCounts = ref("");

    const getpostData = async (id) => {
      const res = await axios.get(`http://localhost:8000/api/posts/detail/${id}`);
      // console.log(res.data);
      if (res.data.data.image != null) {
        res.data.data.image = `http://localhost:8000/postsImage/${res.data.data.image}`;
      } else {
        res.data.data.image = `http://localhost:8000/postsImage/default.png}`;
      }
      post.value = res.data.data;
      category.value = res.data.category;
    };

    const auth = store.state.userData;

    const viewActionlog = async (user_id, post_id) => {
      try {
        const res = await axios.post("http://localhost:8000/api/actionLogs/post/view", {
          user_id: user_id,
          post_id: post_id,
        });
        // console.log(res.data);
        viewCounts.value = res.data.viewsCounts;
      } catch (e) {
        console.log(e.message);
      }
    };

    onMounted(() => {
      getpostData(postId);
      viewActionlog(auth.id, props.id);
      // console.log(postId);
      // console.log(props.id);
      // console.log(store.getters.getUserData);
      // console.log(store.state.userData);
      // console.log(auth.id);
      // console.log(props.id);
    });

    return { getpostData, post, category, viewCounts };
  },
  computed: {
    ...mapGetters(["getToken", "getUserData"]),
    ...mapState(["userData"]),
  },
};
</script>
