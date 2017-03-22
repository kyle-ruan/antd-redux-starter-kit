// local config
// export const apiConfig = {
//   coreplusWebClientURL: "http://192.168.2.33:30721/",
//   headers: {
//     "X-SessionId": "20E47C21-00D1-4360-96FD-56C8223147AC",
//     "content-type": "application/json"
//   }
// };

// dev2 config
// export const apiConfig = {
//   coreplusWebClientURL: "https://dev2.coreplus.com.au/",
//   headers: {
//     "X-SessionId": "20E47C21-00D1-4360-96FD-56C8223147AC",
//     "content-type": "application/json"
//   }
// };

// qa/prod config
const apiConfig = top.webClientApiConfig();
apiConfig.headers['content-type'] = 'application/json';
export { apiConfig };

export const reportConfig = {
  pageSize: 30
};
