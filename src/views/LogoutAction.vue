<template>
  <div></div>
</template>

<script>
import router from "@/router";
import axios from "axios";
import { onMounted } from "vue";
import { mapGetters, useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const logout = async () => {
      try {
        const res = await axios.post("http://localhost:8000/api/users/logout", {
          headers: {
            Authorization: store.getters.getToken,
          },
        });
        router.push({ name: "login" });
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const actionToken = (data) => store.dispatch("actionToken", data);
    const actionUserData = (data) => store.dispatch("actionUserData", data);

    const cleartoken = () => {
      actionToken(null);
      actionUserData(null);
      if (!store.getters.getToken && !store.getters.getUserData) {
        router.push({ name: "login" });
      }
    };

    onMounted(() => {
      //   logout();
      //   console.log(store.getters.getToken);
      cleartoken();
    });

    return { logout, cleartoken };
  },
  computed: {
    ...mapGetters(["getToken", "getUserData"]),
  },
};
</script>
