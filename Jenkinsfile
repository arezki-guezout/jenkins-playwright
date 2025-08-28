pipeline{
    agent any
    parameters{
        choice(name:'TAG', choices:['@regression', '@sanity'])
        booleanParam(name:'ALLURE', defaultValue: false, description: 'generation de rapport allure')
    }
    stages{
        stage('global stage'){
            agent{
                docker{
                    image 'mcr.microsoft.com/playwright:v1.54.0-noble'
                }
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
                        stash name: 'allure-results', includes: 'allure-results/*'
                    }
                    else{
                        sh "npx playwright test --grep ${params.TAG} --reporter=junit"
                        stash name: 'junit-report', includes: 'playwright-report/junit/*'
                    }
                }
                
            }
        }
            }
        }
        
    }
    post{
        always{
            //unstash 'junit-report'
            //junit 'playwright-report/junit/results.xml'
            script{
                if(params.ALLURE){
                    archiveArtifacts 'allure-results/**'
                    unstash 'allure-results'
                    allure includeProperties:
                     false,
                     jdk: '',
                     results: [[path: 'allure-results/']]
                }
            }
            
        }
    }
}