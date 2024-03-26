# ✨ :mag: KSA API Conformance Suite :mag: ✨

A simple API conformance service that uses [wiretap](https://pb33f.io/wiretap/) to validate API conformance.

## Prerequisites ✨

* A sprinkle of Node.js magic is all you need to embark on this adventure!

## Testing Options: Choose Your Own Adventure!

### Headless Mode (For the Code Ninjas)

1. **Fire up the engines:** `npm run service`
2. **Let Wiretap weave its magic:** `npm run wiretap`
3. **Unleash the tests:** `npm run test`

This will start the service, wiretap will start to proxy the traffic between client and server, and finally, the test will be able to validate conformance. In this case, the results can be found under the results folder.

### Headed Mode (For the Visual Explorers) ✨

1. **Launch the services:** (Same as step 1 above)
2. **Navigate to the Wiretap dashboard:** Point your browser to `http://localhost:9091`.
3. **Choose your testing weapon:**
   *  Run the automated tests (same command as above).
   *  Manually craft API calls to `http://localhost:9090` (remember, not the usual port 3000).

![Wiretap Dashboard](https://github.com/ReshailLean/ksa-conformance-suite/assets/98384896/23b1d977-b2a9-4f82-b236-511034207a4a)

## Running in Docker

To run the project in Docker, follow these steps:

1. **Build Docker Image**:
   Navigate to the directory where your Dockerfile is located and run the following command to build the Docker image:
   ```bash
   docker build -t <image_name>:<version> .
   ```
2. **Run Docker Container**:
   Once the image is built, you can run a Docker container from the image using the following command:
   ```bash
   docker run -p 9090:9090 -p 9091:9091 --name <container_name> <image_name>:<version>
   ```

This command maps port 9090 and 9091 from the container to the same ports on your host machine, allowing you to access the services running inside the container. The `--name` flag is used to specify a name for the container.

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
