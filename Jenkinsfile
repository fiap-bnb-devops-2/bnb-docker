pipeline {

    agent any

    stages {

        stage('Conferindo Webhook do Jenkins') {

            steps {

                sh 'echo "Conferindo Webhook do Jenkins"'
                sh 'sudo chown -R jenkins:jenkins /var/lib/jenkins/workspace/deploy-api/api'
                sh 'sudo chmod -R 777 /var/lib/jenkins/workspace/deploy-api/api'

            }

        }

        stage('Login no Docker') {

            steps {

                script {

                    /*docker.withRegistry('https://index.docker.io/v1/', 'docker-credentials') {

                        echo "Logado no Docker"

                    }*/

                    withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {

                        sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD https://index.docker.io/v1/";

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