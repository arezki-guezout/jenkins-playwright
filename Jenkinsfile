pipeline{
    agent{
        docker{
            image 'mcr.microsoft.com/playwright:v1.54.0-noble'
        }
    }
    parameters{
        choice(name:'TAG', choices:['@regression', '@sanity'])
    }
    stages{
        stage('install deps'){
            steps{
                sh 'npm ci'
            }
        }
        stage('run smoke test'){
            steps{
                sh 'npx playwright test --grep @smoke'
            }
        }
        stage('run user test'){
            steps{
                sh "npx playwright test --grep ${params.TAG}"
            }
        }
    }
    post{
        always{
            archiveArtifacts 'playwright-report/**'
        }
    }
}