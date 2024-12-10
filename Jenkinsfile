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

                    /*docker.withRegistry('https://index.docker.io/v1/', 'docker-credentials') {

                        echo "Logado no Docker"

                    }*/

                    withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {

                        sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin";

                    }

                }

            }

        }

        stage('Build e Push para o Docker') {

            steps {

                script {

                    docker.build("orafaribeiro/bnb-api:0.0.1", '-f ./api/Dockerfile ./api')
                    sh 'echo "Build e Push para o Docker"'

                }

            }

        }

        stage('Login na Azure') {

            steps {

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