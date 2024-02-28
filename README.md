# :mag:  KSA API Conformance Suite :mag:
A simple API conformance service that uses [wiretap](https://pb33f.io/wiretap/) to validate API conformance.

## Prerequisites
You will need node to be able to run the tests

## Headless
You can run the tests headless by starting the service locally and running the tests
```bash
npm run service
npm run wiretap
npm run test
```

This will start the service, wiretap will start to proxy the traffic between client and server and finally, the test will be able to validate conformance. In this case, the results can be found under the results folder.

## Headed
Wiretap provides us with an excellent UI experience as well. So to utilize it start the service(s) and head over to localhost:9091. Once on the dashboard, you can either run the tests using the command above or make API calls directly to the service. Please note that the requests have to be made to localhost:9090 instead of 3000 which is the default port for the service.
<img width="1460" alt="Screenshot 2024-02-05 at 1 54 14 AM" src="https://github.com/ReshailLean/ksa-conformance-suite/assets/98384896/23b1d977-b2a9-4f82-b236-511034207a4a">

# Work in progress
- Please note that this is a work in progress, currently the service uses static raw bank responses from Alinma, Once we get security sign off this will start to get the responses from S3 and no longer use static files
- The test is just a POC so it runs all endpoints at once and shares the response in a single json file, this will need to be improved
- You can update the responses under resources to run conformance for any bank or response that follows the KSA open API spec
- The docker file needs a bit more work, but once it works I will update the readme so its easier to run the tests
