#!/usr/bin/env groovy

/**
 *   Main file that is being picked by jenkins multibranch pipeline.
 *   Must only connect things common to all pipelines.
 *   Any custom logic must be defined in separate Jenkinsfiles declared at .ci/configuration.yml
 *   Example:
 *   <code>
 *   pipelines:
 *     Javascript:
 *       nodeSelector: javascript
 *   </code>
 *   corresponds to:
 *   <code>
 *   pipelines:
 *     Name:
 *       nodeSelector: condition to select jenkins node to execute pipeline
 *   </code>
 *
 *   Once you define required pipelines they will automatically be picked and executed in the same order.
 *
 *   stash/unstash is used to share state between different jenkins nodes.
 */

shared = null
newVersion = null
String repositoryUrl = null

timestamps {
    try {
        node() {
            cleanWs()
            stage('Checkout & Bootstrap') {
                def result = checkoutGit()
                echo "[INFO] Git checkout: $result"
                repositoryUrl = result.GIT_URL

                echo "[INFO] Building branch ${env.BRANCH_NAME}"

                def targetCommonsDirectory = '.ci/commons'
                if (fileExists(targetCommonsDirectory)) {
                    throw new IllegalStateException(".ci/commons must not exist")
                }
                shared = loadLibrary(targetCommonsDirectory)

                // Save folder to reuse on other nodes
                stash name: 'bootstrap', useDefaultExcludes: false

                shared.setDefaultPipelineConfiguration()

                def configuration = null;
                if (fileExists('.ci/configuration.yml')) {
                    configuration = readYaml(file: '.ci/configuration.yml')
                } else {
                    throw IllegalArgumentException("Pipeline configuration is not present")
                }

                pipelines = shared.configurePipelines(repositoryUrl, targetCommonsDirectory, configuration.pipelines)
            }
        }
        // execute pipelines in order in which they are defined
        echo "[INFO] Found pipelines: $pipelines"
        pipelines.each { name, pipeline -> shared.executePipeline(name, pipeline) }
    } catch (reason) {
        echo "[ERROR] 🔴 Exception during build: $reason"
        reason.printStackTrace()
        currentBuild.result = 'FAILURE'
    } finally { 
        node() {
            step([$class: 'ClaimPublisher'])
            cleanWs()
        }
        if (currentBuild.currentResult != 'SUCCESS') {
            shared.reportFailure(repositoryUrl)
        }
    }
}

def loadLibrary(String targetCommonsDirectory) {
    echo "[INFO] Downloading common code"
    withCredentials([usernamePassword(credentialsId: 'github_repository_access', passwordVariable: 'GIT_TOKEN', usernameVariable: 'GIT_USERNAME')]) {
        sh "git clone https://${GIT_USERNAME}:${GIT_TOKEN}@github.com/leantechnologies/jenkins-commons.git ${targetCommonsDirectory}"
    }
    load "${targetCommonsDirectory}/shared.groovy"
}

/**
 * Default checkout scm doesn't download git tags and that breaks our release process
 */
def checkoutGit() {
    checkout([
            $class                           : 'GitSCM',
            branches                         : scm.branches,
            doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
            extensions                       : [[$class: 'CloneOption', noTags: false, shallow: false, depth: 0, reference: '']],
            userRemoteConfigs                : scm.userRemoteConfigs,
    ])
}
