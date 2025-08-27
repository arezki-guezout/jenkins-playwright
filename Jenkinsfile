pipeline{
    agent{
        docker{
            image 'mcr.microsoft.com/playwright:v1.54.0-noble'
        }
    }
    parameters{
        choice(name:'TAG', choices:['@regression', '@sanity'])
        booleanParam(name:'ALLURE', defaultValue: false, description: 'generation de rapport allure')
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
                script{
                    if(params.ALLURE){
                        sh "npx playwright test --grep ${params.TAG} --reporter=allure-playwright"
                    }
                    else{
                        sh "npx playwright test --grep ${params.TAG}"
                    }
                }
                
            }
        }
    }
    post{
        always{
            archiveArtifacts 'playwright-report/**'
            archiveArtifacts 'test-results/**'
            script{
                if(params.ALLURE){
                    archiveArtifacts 'allure-results/**'
                }
            }
            
        }
    }
}