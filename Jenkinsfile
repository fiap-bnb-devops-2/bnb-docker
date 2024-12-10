pipeline {

    agent any

    stages {

        stage('Conferindo Webhook do Jenkins') {

            steps {

                sh 'echo "Conferindo Webhook do Jenkins"'

            }

        }

        stage('Login no Docker') {

            steps {

                script {

                    withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {

                        sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD https://index.docker.io/v1/";

                    }

                }

            }

        }

        stage('Build da imagem Docker') {

            steps {

                sh "docker build --rm --pull -f ./api/Dockerfile -t orafaribeiro/bnb-api:${env.GIT_COMMIT} ./api";
                sh 'echo "Build da imagem Docker"'

            }

        }

        stage('Push para o Docker Hub') {

            steps {

                sh "docker push orafaribeiro/bnb-api:${env.GIT_COMMIT}"
                sh 'echo "Push para o Docker Hub"'

            }

        }

        stage('Login na Azure') {

            steps {

                script {

                    withCredentials([string(credentialsId: 'AZURE_CLIENT_ID', variable: 'AZURE_CLIENT_ID'), string(credentialsId: 'AZURE_PASSWORD', variable: 'AZURE_PASSWORD'), string(credentialsId: 'AZURE_TENANT', variable: 'AZURE_TENANT'), string(credentialsId: 'AZURE_SUBSCRIPTION', variable: 'AZURE_SUBSCRIPTION')]) {

                        sh "az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_PASSWORD --tenant $AZURE_TENANT";

                        sh "az account set --subscription $AZURE_SUBSCRIPTION";

                    }

                }

                sh 'echo "Login na Azure"'

            }

        }

        stage('Atualizar Cluster Kubernetes') {

            steps {

                sh 'echo "Atualizar Cluster Kubernetes"'

            }

        }

    }

}