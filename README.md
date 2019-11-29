# Wiki Circuit - Client

## Project Overview
Wiki Circuit allows users to analyze connectivity between Wikipedia articles. The application downloads an initial input
article. From this input, it will find all the links to other articles inside the body and download the linked articles. 
It will precede to download articles in a recursive fashion upto a specified depth. The links will be parsed and counted 
to build a map of which articles are linked to each other. 

In a web user interface, the generated data is used to display diagrams to visualize the linkage between articles. The user
can select diagram segments to drill down into the data in a more detail. The UI piece is still a work in progress.

Wiki Circuit requires two components to function:

* [https://github.com/LinkedMink/wiki-circuit-client (Current Project)](https://github.com/LinkedMink/wiki-circuit-client)
* [https://github.com/LinkedMink/wiki-circuit-server](https://github.com/LinkedMink/wiki-circuit-server)

Note that the code was never written to be production ready. It was written mainly to demonstrate the various technologies
used to build the software.

## Client Project
This project host a React based application that allows the user to submit a query for a specified article. This kicks off
a job on the server with the client tracking the progress of the specified job. When the job completes, the return data
is downloaded. The downloaded data is then used a generate the chord visualization. An evolving array of controls allows
the user to control the visualization and interact with it to get more information.

### Screenshot
![UI Screenshot](https://github.com/LinkedMink/wiki-circuit-client/raw/master/screenshot.png)

### Sample App
Try it out: [https://wiki-circuit.apps.linkedmink.space/](https://wiki-circuit.apps.linkedmink.space/)

## Scripts
To run the application, install cross-env globally.

```bash
npm install -g cross-env
```

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run lint`
Run the linter on the src directory.

### `npm run startProduction`
Serve the production bundle that results from `npm run build`. The built bundle can run on any web server, 
but the serve package has been included to keep Node.js as a single dependency.

### `npm run containerize`
Package the application as a docker container. Set the environmental variable REACT_APP_SERVER_BASE_URL.

## Deployment - Docker
There is no requirement to run on docker, but the project has been configured to do so if desired. Install 
the development dependencies for both the server and client.

```bash
npm install -g cross-env
cd ./wiki-circuit-server
npm install
cd ../wiki-circuit-client
npm install
```

Containerize both the server and client application. You will have to set the server URL at build time for 
the client app since it's contained in the built bundle.

```bash
cd ./wiki-circuit-server
npm run containerize
cd ../wiki-circuit-client
npx cross-env REACT_APP_SERVER_BASE_URL=https://api.mydomain.com:55000 \
  npm run containerize
```

Run the containers on the target machine. Networking can be configured by environmental variables.

```bash
docker run -d \
  -p 55000:8080 \
  -e ALLOWED_ORIGINS=http://mydomain.com:8080 \
  --name wiki-circuit-server \
  linkedmink/wiki-circuit-server

docker run -d \
  -p 8080:80 \
  --name wiki-circuit-client \
  linkedmink/wiki-circuit-client
```

The project contains a sample deployment.yaml file for deploying to a Kubernetes cluster. Edit the 
file as necessary. Then apply the changes to your cluster.

```sh
docker push linkedmink/wiki-circuit-server
docker push linkedmink/wiki-circuit-client
kubectl apply -f ./deployment.yaml
```

IMPORTANT: wiki-circuit-server is not designed to be load balanced since it relies on an internal
memory cache. Only a single running instance is supported.