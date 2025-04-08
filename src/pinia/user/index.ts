import User from './User';

export default defineStore('user', () => {
  const user = ref(new User());
  const authenticated = computed(() => !!user.value.accessToken);

  return {
    user,
    authenticated,
    updateUser: user.value.updateUser,
    updateToken: user.value.updateToken,
  };
});
