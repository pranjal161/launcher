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

def addStagesCustomCodeQuality() {

    stage('Code Quality ESLint') {
        sh '''
            echo 'Install TypeScript'
            npm install typescript
        '''

        sh '''
            echo 'Install ESLint & plugins'
            npm install eslint@6.8.0 --save-dev
            npm install eslint-plugin-filenames@latest --save-dev
            npm install eslint-plugin-react@latest --save-dev
            npm install eslint-plugin-react-hooks@latest --save-dev
            npm install @typescript-eslint/eslint-plugin@latest --save-dev
            npm install @typescript-eslint/parser --save-dev
        '''

        sh '''
            echo 'Check code quality using ESLint'
            npm run lint
        '''
    }
}

def addStagesCustom() {

    stage('Downloading bundle') {
        if (env.BRANCH_NAME == 'development') {
            withCredentials([[
                $class: 'AmazonWebServicesCredentialsBinding',
                credentialsId: 'DIAAS-AWS-CLI',
                accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
            ]]) {
                withAWS(role:'arn:aws:iam::665158502186:role/ISS_DIAAS_PowerUser'){
                    sh '''
                        rm -rf ui-package/react
                        aws s3 cp s3://dev.eu.standard.project/omnichannel/react/ ./ui-package/react/ --recursive
                    '''
                }
            }
        }
    }

    stage ('Zipping Artifact All') {
        if (env.BRANCH_NAME == 'development') {
            sh '''
                rm -rf omnichannel-standard-ui.zip
                mkdir -p ui-package/react
                cp -r ./build/* ./ui-package/react/
                cp -r ./ui-package omnichannel-standard-ui-dev
            '''
            zip zipFile: 'omnichannel-standard-ui.zip', archive: false, dir: 'ui-package'
        }
    }

    stage('Upload Artifact All') {
        if (env.BRANCH_NAME == 'development') {
            withCredentials([usernamePassword(credentialsId:'diaas-rw', passwordVariable:'ARTIF_PASSWORD', usernameVariable:'ARTIF_USER')]) {
                sh '''
                    curl -u${ARTIF_USER}:${ARTIF_PASSWORD} -T ./omnichannel-standard-ui.zip "https://artifactory.csc.com/artifactory/diaas-generic/graphtalk-launcher/${BRANCH_NAME}/graphtalk-launcher-bundle.${BRANCH_NAME}.zip"
                '''
            }
        }
    }

    stage('Push Artifact React') {
        if (env.BRANCH_NAME == 'development') {
            withCredentials([[
                $class: 'AmazonWebServicesCredentialsBinding',
                credentialsId: 'DIAAS-AWS-CLI',
                accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
            ]]) {
                withAWS(role:'arn:aws:iam::665158502186:role/ISS_DIAAS_PowerUser'){
                    sh '''
                        aws s3 rm s3://dev.eu.standard.project/omnichannel/react/ --recursive
                        aws s3 cp ./ui-package/react/ s3://dev.eu.standard.project/omnichannel/react/ --recursive
                        aws s3 ls s3://dev.eu.standard.project/omnichannel/react --recursive --human-readable --summarize
                    '''
                }
            }
        }
    }
}

// Add custom stages
def stagesMap = [:]
stagesMap['install'] = ['skip': false, 'func': this.&addStagesCustomCodeQuality]
stagesMap['upload'] = ['skip': false, 'func': this.&addStagesCustom]

// Stages to skip
stagesMap['codequality'] = ['skip': true]
stagesMap['customDeploy'] = ['skip': true]

pipelineRunner(stagesMap, pipelineUtils, 'docker/Dockerfile')

/********************************************************************************************************/
/**************************************** FUNCTIONS *****************************************************/
/********************************************************************************************************/

// Teams notifications
def myOffice365ConnectorSend(String status, String message, factDefinitionsTeams=[]) {
    def color

    switch (status) {
        case 'Success':
            color = '#36A64F'
            break
        case 'Failure':
            color = 'FF0000'
            break
        case 'Information':
            color = '#F2C744'
            break
        default:
            color = '#0099CC'
            break
    }

    if (factDefinitionsTeams == null) {
        office365ConnectorSend color: color,
                            message: message,
                            status: status,
                            webhookUrl: TEAMS_WEBHOOK_URL
    }
    else {
        office365ConnectorSend color: color,
                            message: message,
                            status: status,
                            webhookUrl: TEAMS_WEBHOOK_URL,
                            factDefinitions : factDefinitionsTeams
    }
} 