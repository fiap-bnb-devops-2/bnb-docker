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

                        sh 'echo $DOCKER_USERNAME'

                    }

                }

            }

        }

        stage('Build e Push para o Docker') {

            steps {

                sh 'echo "Build e Push para o Docker"'

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