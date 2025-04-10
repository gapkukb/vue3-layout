import Template from './Template.vue';

const frament = document.createDocumentFragment();
document.body.appendChild(frament);

const app = createApp(Template, {
  className: 'global-loading',
  teleport: 'body',
});

const vm = app.mount(frament as any) as InstanceType<typeof Template>;

class Loading {
  open() {
    vm.toggle(true);
  }
  close() {
    vm.toggle(false);
  }
}

const loading = new Loading();
export default loading;
