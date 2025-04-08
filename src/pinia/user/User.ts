import { Mixin } from 'ts-mixer';
import UserInfo from './UserInfo';
import Token from './Token';

export default class extends Mixin(UserInfo, Token) {}
