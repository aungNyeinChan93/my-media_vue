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
                <h3>Follow Us</h3>
              </div>
              <!-- Flow Socail -->
              <div class="single-follow mb-45">
                <div class="single-box">
                  <div class="follow-us d-flex align-items-center">
                    <div class="follow-social">
                      <a href="#"><img src="assets/img/news/icon-fb.png" alt="" /></a>
                    </div>
                    <div class="follow-count">
                      <span>8,045</span>
                      <p>Fans</p>
                    </div>
                  </div>
                  <div class="follow-us d-flex align-items-center">
                    <div class="follow-social">
                      <a href="#"><img src="assets/img/news/icon-tw.png" alt="" /></a>
                    </div>
                    <div class="follow-count">
                      <span>8,045</span>
                      <p>Fans</p>
                    </div>
                  </div>
                  <div class="follow-us d-flex align-items-center">
                    <div class="follow-social">
                      <a href="#"><img src="assets/img/news/icon-ins.png" alt="" /></a>
                    </div>
                    <div class="follow-count">
                      <span>8,045</span>
                      <p>Fans</p>
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
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { mapGetters } from "vuex";

export default {
  name: "PostDetailView",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();
    const postId = route.params.id;
    const post = ref({});
    const category = ref("");

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

    onMounted(() => {
      // console.log(postId);
      // console.log(props.id);
      getpostData(postId);
    });

    return { getpostData, post, category };
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
};
</script>
