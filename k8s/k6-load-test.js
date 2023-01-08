import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}

export const options = {
  stages: [
    { duration: '30s', target: 1000 }, // 1000 VUs for 30 seconds
    { duration: '20s', target: 10 },  // 10 VUs for 20 seconds
    { duration: '10s', target: 0 },  // 0 VUs for 10 seconds
  ],
};

export default function () {
  const res = http.get('http://127.0.0.1:60311/'); // minikube backend ip
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}