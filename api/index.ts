import ky, { BeforeRetryState } from "ky";

const api = ky.create({
  prefixUrl: "http://localhost:3000",
  hooks: {
    beforeRetry: [
      (request: BeforeRetryState) => {
        const token = "test-token";

        console.log("request", request);
        // if (token) {
        //   request.request.headers.set("Authorization", `Bearer ${token}`);
        // }
      },
    ],
  },
});

export default api;
