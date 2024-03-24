# ✨ :mag:  KSA API Conformance Suite :mag: ✨
A simple API conformance service that uses [wiretap](https://pb33f.io/wiretap/) to validate API conformance.

## Prerequisites ✨

* A sprinkle of Node.js magic is all you need to embark on this adventure!

## Testing Options: Choose Your Own Adventure!

### Headless Mode (For the Code Ninjas)

1. **Fire up the engines:**  `npm run service`
2. **Let Wiretap weave its magic:**  `npm run wiretap`
3. **Unleash the tests:**  `npm run test`

This will start the service, wiretap will start to proxy the traffic between client and server and finally, the test will be able to validate conformance. In this case, the results can be found under the results folder.


### Headed Mode (For the Visual Explorers) ✨

1. **Launch the services:** (Same as step 1 above)
2. **Navigate to the Wiretap dashboard:** Point your browser to  `http://localhost:9091`.
3. **Choose your testing weapon:**
   *  Run the automated tests (same command as above).
   *  Manually craft API calls to `http://localhost:9090` (remember, not the usual port 3000).

<img width="1460" alt="Screenshot 2024-02-05 at 1 54 14 AM" src="https://github.com/ReshailLean/ksa-conformance-suite/assets/98384896/23b1d977-b2a9-4f82-b236-511034207a4a">

## Linting for Code Quality Assurance ✨

We're committed to keeping our code squeaky clean! Here's our linting setup:

* **ESLint:**  The watchful guardian of JavaScript style and potential errors.
* **Prettier:**  Our code formatting superhero, ensuring consistency.
* **Husky:**  Automates linting before each commit, keeping bad code at bay. 
* **lint-staged:**  This clever tool focuses linting efforts on staged files for efficiency.

# Work in progress
- Please note that this is a work in progress, currently the service uses static raw bank responses from Alinma, Once we get security sign off this will start to get the responses from S3 and no longer use static files
- The test is just a POC so it runs all endpoints at once and shares the response in a single json file, this will need to be improved
- You can update the responses under resources to run conformance for any bank or response that follows the KSA open API spec
- The docker file needs a bit more work, but once it works I will update the readme so its easier to run the tests
