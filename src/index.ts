import "./styles";
import { createApp } from "vue";
import App from "./App.vue";
import { queryUser, queryUser2 } from "./apis";

createApp(App).mount("#app");

queryUser({
  id: null,
  name: undefined,
  age: 0,
  sex: "",
  hobbi: [],
  grade: NaN,
  address: {},
});
queryUser2(undefined, {
  //   loading: true,
});
queryUser(undefined, {
  //   loading: true,
});
queryUser2(undefined, {
  //   loading: true,
});
