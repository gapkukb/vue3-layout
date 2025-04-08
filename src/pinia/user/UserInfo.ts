import { autobind } from '@/decorators';

export default class {
  username = '';

  @autobind
  updateUser(user: typeof this) {
    Object.assign(this, user);
  }
}
