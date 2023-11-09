# WhistleBlower

## Project Description

This is an online social web platform where user can create, signup and login to make post about this work places. User can create story and post about their work, to share their experience with the their own respective community. User who are not login can browse posts and comments, for those that are logged in can create post and comments. There is also this verification step where user can take a picture of their ID (eg: UofT student Card), and following the step step of taking a selfie, We would then compare the two image and check for similarity, which then verify the user identity relative to the associated work/education environment. Verified would then be able to share post along with their specified tags, tags that are verified by our platform.

## Development

We start out by picking the MERNG Stack, Mongo, Express, React and Node. Since Graphql was incorporated in our design as well, we did some research on design and code practice the first few weeks. When creating our backend we follow setting and naming conventions, such that each Model has its own file (type, mutation, query, resolver, Db) with both mongodb and graphql. On the Frontend we used React same with the backend we followed convention by creating components so it could be used from other pages when necessary, api and actions to handle CRUD, Create, Read, Update and Delete. React router is used for our app's routing. Node Express with sessions and cookies are used to authenticate users. When a user first signs up, their passwords are stored as salted hash in our MongoDB database and this is used to authenticate using bcrypt. Google Cloud Vision and AWS Rekognition to identify a user's organization from their ID and verify it is their own ID. This is done in two parts, logo detection by Vision and identity verification by Rekognition. Two photos of the user are obtained using their webcam through React Webcam, this image is stored as base64 and sent to the backend which forwards it to AWS and Google to get a response.

## Deployment

We have two separate applications, a React Frontend and a Node backend, both of which are containerized with Docker. We use GitLab for CI/CD which mirrors our GitHub repository for any commits, then runs a script which builds the container image and runs it on the VM. The VM is an Ubuntu server hosted on DigitalOcean. We used two VMs, one for the frontend and one for the backend as it will be easier to scale. We use Cloud MongoDB for our database.

## Maintenance

We use GitLab for monitoring our applications which notifies us if a build failed in the CI/CD pipeline so we can roll back to a previous version build which are also saved. It saves logs if errors happen in our build so that we can fix them. It can also show us the health of our application by viewing metrics such as memory and processor usage.

We test our functionality thoroughly to make sure functionality is on par. We incorporate codes, such that if there are functionality issues when a new feature is added we can identify the source of the bug efficiently. Although, it's frustrating to mention deployment had shown to be an unsuspected hurdle.

## Challenges

1. CI/CD Containerized Docker applications stored on VM
2. Learning React, Docker, Mongo, Graphql, GitLab, Digitalocean. The amount of content is extremely dense with the limited time span.
3. Making Frontend dynamically responsive.

## Contributions

### Wisam Mohiuddin

- Logo Identification with Google Cloud Vision with React Webcam
- ID Verification with selfie using AWS Rekognition with React Webcam
- Containerization of frontend and backend with Docker
- Deployment on Ubuntu VM stored on DigitalOcean
- Integration with GitLab for CI/CD of both applications
- Domain names from Name.com and Namecheap.com
- NGINX reverse proxy and LetsEncrypt SSL Certificates for both applications
- Signup, Login, Signout with Express sessions and cookies
- React Router

### Chang Chuy

- Created, set up Backend MongoBb
- Created, set up Frontend React
- Connecting frontend and backend application
- Post functionality: Display dynamically along with eact Create, Like, Dislike, Delete operation.
- Comment functionality: Display dynamically along with eact Create, Delete operation.
