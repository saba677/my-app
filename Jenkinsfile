pipeline {
    agent any

    environment {
        REGISTRY_USER = 'your_dockerhub_username'
        IMAGE_NAME    = 'my-app'
        REGISTRY_CRED = 'dockerhub-credentials-id'
    }

    stages {
        stage('Checkout Source Code') {
            steps {
                checkout scm
                script {
                    GIT_SHA = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    echo "Building for Git Commit SHA: ${GIT_SHA}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${REGISTRY_USER}/${IMAGE_NAME}:${GIT_SHA}")
                }
            }
        }

        stage('Push Image to Registry') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${REGISTRY_CRED}") {
                        dockerImage.push("${GIT_SHA}")
                        dockerImage.push("latest")
                    }
                }
            }
        }
    }

    post {
        always {
            sh "docker rmi ${REGISTRY_USER}/${IMAGE_NAME}:${GIT_SHA} || true"
        }
    }
}
