<template>
  <section>
    <div class="container">
      <div class="row my-4">
        <div class="col-6 offset-3">
          <div class="my-1" v-if="error">
            <div class="alert alert-danger">
              {{ error }}
              <small class="d-block">
                The credential don't match !
                <span class="d-block text-danger">Try Again ...</span>
              </small>
            </div>
          </div>
          <div class="card">
            <div class="card-header">Login</div>
            <div class="card doby">
              <div class="p-2">
                <form @submit.prevent="login()">
                  <div class="my-2">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      class="form-control"
                      v-model="form.email"
                    />
                  </div>
                  <div class="my-2">
                    <input
                      type="text"
                      name="password"
                      placeholder="password"
                      class="form-control"
                      v-model="form.password"
                    />
                  </div>
                  <div class="my-2 d-flex">
                    <button type="submit" class="btn btn-sm btn-success">Login</button>
                  </div>
                </form>
              </div>

              <!-- for dedug -->
              <!-- <div class="row">
                <div class="col-12">
                  <h4>for debug</h4>
                  <p v-show="userData != null">{{ getUserData }}</p>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import router from "@/router";
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { mapGetters, mapState, useStore } from "vuex";

export default {
  name: "loginView",

  setup(props) {
    const store = useStore();
    const error = ref();
    const form = reactive({
      email: "",
      password: "",
    });

    const actionToken = (data) => store.dispatch("actionToken", data);
    const actionUserData = (data) => store.dispatch("actionUserData", data);

    const login = async () => {
      try {
        const res = await axios.post("http://localhost:8000/api/users/login", {
          email: form.email,
          password: form.password,
        });

        if (res.data.token == null) {
          throw new Error("login fail !");
        }

        // console.log(res.data);
        actionToken(res.data.token);
        actionUserData(res.data.data);
        router.push({ name: "home" });

        // console.log(store.getters.getUserData);
      } catch (e) {
        console.log(e.message);
        error.value = e.message;
      }
    };

    onMounted(() => {});

    return { login, form, actionToken, actionUserData, error };
  },
  computed: {
    ...mapState(["test", "userData"]),
    ...mapGetters(["testgetter", "getToken", "getUserData"]),
    // ...mapActions(["actionToken"]),
  },
};
</script>
