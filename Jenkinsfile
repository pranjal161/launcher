@Library('pdxc-pipeline-lib@assure')

import org.pdxc.util.ValuesUtils
import org.pdxc.jenkins.JenkinsContext

pipelineRunner = null
pipelineUtils = null

/**
 * Get the Assure Library source files: configure git and clone the repository. This is always needed to be able to
 * load and use any of the library methods. Please notice that this is not a Jenkins Shared Library, but a repository
 * where the Assure generic functions are stored to be used in combination with the Jenkins Shared Library.
 */
def cloneAndLoadAssurePipeline() {
    def configData = readYaml file: 'conf.yml'
    // Set up git
    def cred = ValuesUtils.getVariable(configData, 'gitHubCredential')
    def mail = ValuesUtils.getVariable(configData, 'gitEmail')
    def user = ValuesUtils.getVariable(configData, 'gitUsername')
    def url = ValuesUtils.getVariable(configData, 'gitHubUrl')
    functiongroup_git.setup(cred, mail, user, url)

    // Clone Assure library repo
    def org = ValuesUtils.getVariable(configData, 'libraryOrg')
    def repo = ValuesUtils.getVariable(configData, 'libraryRepo')
    def branch = ValuesUtils.getVariable(configData, 'libraryBranch')
    functiongroup_git.clone(org, repo, branch)

    // Load pipeline for this type of component
    def path = ValuesUtils.getVariable(configData, 'libraryRunnerPath')
    def key = ValuesUtils.getVariable(configData, 'pipelineType')
    def pipelineLoader = load "${repo}${path}"
    pipelineLoader.setContext(this)

    //Get the shared Assure pipeline utils
    pipelineUtils = pipelineLoader.getUtils()
    //Get the pipeline to be run
    pipelineRunner = pipelineLoader.getPipeline(pipelineLoader."${key}")
}

// Initial node to clone the library repo and determine the pipeline to be run.
node {
    sh 'cd /'
    deleteDir()
    checkout scm
    JenkinsContext.setContext(this)
    cloneAndLoadAssurePipeline()
}

def addStagesCustom() {
    stage('Downloading bundles from AWS development env') {
        when { expression {branch == 'development' | branch == 'development-deploy-ntg'} }
        steps {
            withCredentials([[
                $class: 'AmazonWebServicesCredentialsBinding',
                credentialsId: 'DIAAS-AWS-CLI',
                accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
            ]]) {
                withAWS(role:"arn:aws:iam::665158502186:role/ISS_DIAAS_PowerUser"){
                    sh '''
                        rm -rf ui-package/react --recursive
                        aws s3 cp s3://dev.eu.standard.project/omnichannel/react/ ./ui-package/react/ --recursive
                    '''
                }
            }
        }
    }
    stage ('Zipping Artifact from DEV') {
        when { expression {branch == 'development' | branch == 'development-deploy-ntg'} }
        steps {
            sh '''
                rm -rf omnichannel-standard-ui.zip
                mkdir -p ui-package/react
                cp ./dist/* ./ui-package/react --recursive
                cd ./ui-package/react
                gzip *.*
                find -type f -name '*.gz' | while read f; do mv "$f" "${f%.gz}"; done
                cd ./../../
                cp -r ./ui-package omnichannel-standard-ui-dev
            '''
            zip zipFile: 'omnichannel-standard-ui.zip', archive: false, dir: 'ui-package'
        }
    }
    stage('Upload Artifact All') {
        when { expression {branch == 'development' | branch == 'development-deploy-ntg'} }
        steps {
            withCredentials([usernamePassword(credentialsId:"diaas-rw", passwordVariable:"ARTIF_PASSWORD", usernameVariable:"ARTIF_USER")]) {
                sh '''
                    curl -u${ARTIF_USER}:${ARTIF_PASSWORD} -T ./omnichannel-standard-ui.zip "https://artifactory.csc.com/artifactory/diaas-generic/graphtalk-launcher/${BRANCH_NAME}/graphtalk-launcher-bundle.${BRANCH_NAME}.zip"
                '''
            }
        }
    }
    stage('Push Artifact to DEV') {
        when { expression {branch 'development' | branch 'development-deploy-ntg'} }
        steps {
            withCredentials([[
                $class: 'AmazonWebServicesCredentialsBinding',
                credentialsId: 'DIAAS-AWS-CLI',
                accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
            ]]) {
                withAWS(role:"arn:aws:iam::665158502186:role/ISS_DIAAS_PowerUser"){
                    sh '''
                        aws s3 rm s3://dev.eu.standard.project/omnichannel/react/ --recursive
                        aws s3 cp ./ui-package/react/ s3://dev.eu.standard.project/omnichannel/react/ --include='*' --exclude='*.json' --recursive --content-encoding gzip --region eu-west-1
                        aws s3 cp ./ui-package/react/ s3://dev.eu.standard.project/omnichannel/react/ --exclude='*' --include='*.json'  --recursive --region eu-west-1
                    '''
                }
            }
        }
    }
}

def functions = [:]
functions["customDeploy"] = ["skip": false, "func": this.&addStagesCustom]
//pipeline_generic(stagesMap)

//functions = [:]
// functions['test'] = ['skip': true]

pipelineRunner(functions, pipelineUtils, "docker/Dockerfile")