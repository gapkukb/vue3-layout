import http from './http';

export const queryWebToken = http.post<model.app.Configuration>('/webToken', {
  __webToken: true,
});
export const queryAppConfiguration = http.post<model.app.Configuration>('/front/siteinfo');
