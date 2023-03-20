pipeline {

  agent any

  tools {nodejs "nodejs-16"}

  parameters {
    choice(
        name: 'env',
        choices: "dev\nproduction\nuat",
        description: 'Select the evironment to run automation'),
    choice(
        name: 'Test',
        choices: "singapore\nvietnam",
        description: 'Select country to run with localization')

  }

  stages {
    stage('Checkout source code') {
      steps {
        git(url: 'https://github.com/hitz-group/apps-e2e-automation/', 
        branch: 'main', 
        credentialsId: '990cc9e7-dc83-4cbf-8259-1fe882167d48')
      }
    }

    stage('Installing Package') {
      steps {
        sh 'yarn install'
        sh 'npx playwright install'
        sh 'npm install -g cross-env'      
      }
    }

    stage("Running automation test") {
      steps {
        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
           sh "cross-env test_env=staging yarn run playwright test --grep @${Test}"
        }   
      }
    }

    stage('reports') {
        steps {
            script {
                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'test-output/allure-results']]
                ])
            }
        }
    }

  }

  post{
    always{
      script {
        reportName = sh(script: "ls ${env.WORKSPACE}/playwright-report", returnStdout: true)
        echo "${reportName}"
        echo "This is report folder path ${reportName}"
      }   

      publishHTML([
      allowMissing: false,
      alwaysLinkToLastBuild: true,
      keepAll: true,
      reportDir: "playwright-report/${reportName}",
      reportFiles: "index.html",
      reportName: "HTML Report",
      reportTitles: "HTML Report"
      ])

      cleanWs()
    }   
  }
}