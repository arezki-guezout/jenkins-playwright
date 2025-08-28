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
                        sh "npx playwright test --grep ${params.TAG} --reporter=junit,allure-playwright"
                    }
                    else{
                        sh "npx playwright test --grep ${params.TAG} --reporter=junit"
                    }
                }
                
            }
        }
    }
    post{
        always{
            archiveArtifacts 'playwright-report/**'
            archiveArtifacts 'test-results/**'
            junit 'playwright-report/results.xml'
            script{
                if(params.ALLURE){
                    archiveArtifacts 'allure-results/**'
                    allure includeProperties:
                     false,
                     jdk: '',
                     results: [[path: 'allure-results/']]
                }
            }
            
        }
    }
}