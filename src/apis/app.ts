import http from './http';

export const queryWebToken = http.post<model.app.Configuration>('/webToken');
export const queryAppConfiguration = http.post<model.app.Configuration>('/front/siteinfo');
