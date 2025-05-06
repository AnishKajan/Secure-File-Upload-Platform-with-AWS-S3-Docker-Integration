# Secure-File-Upload-Platform-with-AWS-S3-Docker-Integration
A Spring Boot web app for secure file upload, listing, and deletion via AWS S3. Features region-specific bucket handling, auto-deletion lifecycle rules, and Docker-based deployment with environment-managed AWS credentials.

In order to gain Access to AWS key for a docker-compose.yml, you will have to email me via anishkajan2005@gmail.com or on linkedin via https://www.linkedin.com/in/anish-kajan/

secure-file-upload/
├── src/
│   └── main/
│       ├── java/com/example/upload/
│       │   ├── config/
│       │   │   └── AmazonS3Config.java
│       │   ├── controller/
│       │   │   └── FileController.java
│       │   ├── service/
│       │   │   └── FileService.java
│       │   └── SecureFileUploadApplication.java
│       └── resources/
│           ├── static/
│           │   ├── index.html
│           │   └── app.js
│           └── application.properties
├── .gitignore
├── .env                  # (Optional) For storing AWS keys locally
├── Dockerfile
├── docker-compose.yml
├── pom.xml
