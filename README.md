# WhistleBlower

## Project URL

Frontend: https://whistle-blower.live
Server: https://whistleblower-backend.me

## Project Video URL

**Task:** Provide the link to your youtube video. Please make sure the link works. 

## Project Description

**Task:** Provide a detailed description of your app

## Development

### Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. 

- React router is used for our app's routing.

- Node Express with sessions and cookies are used to authenticate users. When a user first signs up, their passwords are stored as salted hash in our MongoDB database and this is used to authenticate using bcrypt.

- Google Cloud Vision and AWS Rekognition to identify a user's organization from their ID and verify it is their own ID. This is done in two parts, logo detection by Vision and identity verification by Rekognition. Two photos of the user are obtained using their webcam through React Webcam, this image is stored as base64 and sent to the backend which forwards it to AWS and Google to get a response.

## Deployment

### Explain how you have deployed your application.

We have two seperate applications, a React Frontend and a Node backend, both of these are containerized with Docker. We use GitLab for CI/CD which mirrors our GitHub repository for any commits, then runs a script which builds the container image and runs it on the VM. The VM is Ubuntu server hosted on DigitalOcean. We used two VMs, one for the frontend and one for the backend as it will be easier to scale to multiple services.

## Maintenance

### Explain how you monitor your deployed app to make sure that everything is working as expected.

We use GitLab for monitoring our applications which notifies us if a build failed in the CI/CD pipeline so we can roll back to a previous version build which are also saved. It saves logs if errors happen in our build so that we can fix them. It can also show us the health of our application by viewing metrics such as memory and processor usage.

## Challenges

### What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. CI/CD Containerized Docker applications stored on VM
2. 
3. 

## Contributions

Describe the contribution of each team member to the project. Please provide the full name of each team member (but no student number). 

### Wisam Mohiuddin
- Logo Identification with Google Cloud Vision with React Webcam
- ID Verification with selfie using AWS Rekognition with React Webcam
- Containerization of frontend and backend with Docker
- Deployment on Ubuntu VM stored on DigitalOcean
- Integration with GitLab for CI/CD of both applications
- Domain names from Name.com and Namecheap.com
- NGINX reverse proxy and LetsEncrypt SSL Certificates for both applications
- Signup, Login, Signout with Express sessions and cookies, storing salt hashed passwords
- React Router and Navbar

### Chang Chuy
- 

# One more thing?

### Any additional comment you want to share with the course staff? 

Our app uses sessions and cookies for user authentication, as done in the homework assignments. However, due to some issues with NGINX reverse proxy and SSL certificates, we were not able to use this in production. We spent quite some time trying to fix this issue but were unsuccessful. We understand using local storage for storing usernames is not safe but had to do this to get the app working.