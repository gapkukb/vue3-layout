import http from './http';

export const queryAppConfiguration = http.post<model.app.Configuration>('/front/siteinfo');
