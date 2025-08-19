import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 200, // number of virtual users
  duration: '10s', // how long test runs, can change to '6h' or more
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete < 500ms
    http_req_failed: ['rate<0.01'], // less than 1% errors
  },
};

export default function () {
  const url = 'https://pxxxinvsvu.us-east-1.awsapprunner.com/v1/product-categories';
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.get(url, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body is not empty': (r) => r.body && r.body.length > 0,
  });

  sleep(1); // wait for 1 second before next request
}
