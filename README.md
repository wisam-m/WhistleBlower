# WhistleBlower

## Project Description

This is an online social web platform where users can create, sign up, and log in to make posts about their workplaces. Users can create stories and post about their work to share their experiences with their respective communities. Users who are not logged in can browse posts and comments, while those who are logged in can create posts and comments. There is also a verification step where users can take a picture of their ID (e.g., UofT student card) and follow the steps to take a selfie. The system then compares the two images to check for similarity, which verifies the user's identity relative to the associated work or education environment. Verified users can then share posts along with their verified tags.

## Development

Uses MERNG (Mongo, Express, React, Node & GraphQL). APIs and actions are implemented to handle CRUD operations (Create, Read, Update, Delete). React Router is used for the app's routing. Node Express with sessions and cookies is utilized for user authentication. When a user first signs up, their passwords are stored as salted hashes in the MongoDB database, and this is used for authentication using bcrypt. Google Cloud Vision and AWS Rekognition are used to identify a user's organization from their ID and verify that it belongs to them. This is done in two parts: logo detection by Vision and identity verification by Rekognition. Two photos of the user are captured using their webcam through React Webcam. The image is stored as base64 and sent to the backend, which then forwards it to AWS and Google to obtain a response.

## Deployment

The project consists of two separate applications: a React frontend and a Node backend, both of which are containerized with Docker. GitLab is used for CI/CD, which mirrors the GitHub repository for any commits and then runs a script to build the container image and run it on the VM. The VM is an Ubuntu server hosted on DigitalOcean. Two VMs are used, one for the frontend and one for the backend to make scaling easier. Cloud MongoDB is used for the database.

## Maintenance

GitLab is used to monitor the applications, which notifies the team if a build fails in the CI/CD pipeline so that they can roll back to a previous version (which are also saved). It saves logs when errors occur in the builds so that they can be fixed. It can also show the health of the application by displaying metrics such as memory and processor usage.

## Top features

- Logo Identification with Google Cloud Vision with React Webcam
- ID Verification with selfie using AWS Rekognition with React Webcam
- Containerization of frontend and backend with Docker
- Deployment on Ubuntu VM stored on DigitalOcean
- Integration with GitLab for CI/CD of both applications
- Domain names from Name.com and Namecheap.com
- NGINX reverse proxy and LetsEncrypt SSL Certificates for both applications
- Signup, Login, Signout with Express sessions and cookies
- React Router
