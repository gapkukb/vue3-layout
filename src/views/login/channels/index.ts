import loginByFacebook from './facebook';
import loginByGoogle from './google';
import loginByAccount from './account';
import loginBySMS from './sms';
import loginByApp from './app';
import loginByMiniApp from './miniapp';

export enum Channels {
  Facebook = 0,
  Google = 1,
  Apple = 2,
  Account = 3,
  SMS = 4,
  // App 访问 webview使用ticket登录
  App = 5,
  // 小程序跳转h5使用token登录
  MiniApp = 6,
  /** 游客登录 */
  Guest = 7,
}

function strategy(channel: Channels, form?: any) {
  // 行为验证码ticket
  switch (channel) {
    case Channels.Facebook:
      return loginByFacebook(form);
    case Channels.Google:
      return loginByGoogle(form);
    // case Channels.Apple:
    //   return loginByAccount(form);
    case Channels.Account:
      return loginByAccount(form);
    case Channels.SMS:
      return loginBySMS(form);
    case Channels.App:
      return loginByApp(form);
    case Channels.MiniApp:
      return loginByMiniApp(form);
    default:
      throw new Error('Invalid channel');
  }
}

export default async function login(channel: Channels, form?: any) {
  const user = await strategy(channel, form);
}
