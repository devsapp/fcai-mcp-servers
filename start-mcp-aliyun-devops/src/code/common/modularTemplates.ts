/**
 * 模块化流水线模板定义
 * 基于云效Flow官方文档，将Sources、构建步骤、部署组件分离
 */

import { TemplateVariables } from './pipelineTemplates.js';

// ===== 源码模板 (Sources Templates) =====

export interface SourceTemplate {
  type: string;
  name: string;
  description: string;
  keywords: string[];
  template: string;
  defaultVariables: Partial<TemplateVariables>;
}

// Codeup 源码模板
export const CODEUP_SOURCE_TEMPLATE: SourceTemplate = {
  type: 'codeup',
  name: 'Codeup 代码源',
  description: '阿里云 Codeup 代码仓库',
  keywords: ['codeup', 'aliyun', '阿里云'],
  template: `sources:
  main_repo:
    type: codeup
    name: {{serviceName || '项目'}}
    endpoint: {{repoUrl || 'https://codeup.aliyun.com/your-org/your-repo.git'}}
    branch: {{branch || 'main'}}
    triggerEvents: push
    certificate:
      type: serviceConnection
      serviceConnection: {{serviceConnectionId || 'your-service-connection-id'}}`,
  defaultVariables: {
    branch: 'main'
  }
};

// GitHub 源码模板
export const GITHUB_SOURCE_TEMPLATE: SourceTemplate = {
  type: 'github',
  name: 'GitHub 代码源',
  description: 'GitHub 代码仓库',
  keywords: ['github'],
  template: `sources:
  main_repo:
    type: github
    name: {{serviceName || '项目'}}
    endpoint: {{repoUrl || 'https://github.com/your-org/your-repo.git'}}
    branch: {{branch || 'main'}}
    triggerEvents: push
    certificate:
      type: serviceConnection
      serviceConnection: {{serviceConnectionId || 'your-service-connection-id'}}`,
  defaultVariables: {
    branch: 'main'
  }
};

// ===== 构建步骤模板 (Build Step Templates) =====

export interface BuildStepTemplate {
  type: string;
  name: string;
  description: string;
  keywords: string[];
  languages: string[];
  buildTools: string[];
  template: string;
  defaultVariables: Partial<TemplateVariables>;
}

// Java Maven 构建步骤
export const JAVA_MAVEN_BUILD_TEMPLATE: BuildStepTemplate = {
  type: 'java_maven',
  name: 'Java Maven 构建',
  description: 'Java项目使用Maven进行构建',
  keywords: ['java', 'maven', 'mvn'],
  languages: ['java'],
  buildTools: ['maven'],
  template: `      build_job:
        name: Maven构建
        runsOn: 
          group: public/cn-beijing
          container: build-steps-public-registry.cn-beijing.cr.aliyuncs.com/build-steps/alinux3:latest
        steps:
          setup_maven_settings_step:
            name: "下载MavenSettings"
            step: SetupMavenSettings
            with:
              mavenSettingXmlPath: "/root/.m2/settings.xml"
          setup_java_step:
            name: "安装Java环境"
            step: SetupJava
            with:
              jdkVersion: {{jdkVersion || "1.8"}}
              mavenVersion: {{mavenVersion || "3.5.2"}}
          command_step:
            name: "执行命令"
            step: Command
            with:
              run: |
                {{buildCommand || 'mvn clean package -Dmaven.test.skip=true'}}`,
  defaultVariables: {
    jdkVersion: '"1.8"',
    mavenVersion: '"3.5.2"',
    buildCommand: 'mvn clean package -Dmaven.test.skip=true',
    testCommand: 'mvn test',
    artifactPath: 'target/'
  }
};

// Node.js NPM 构建步骤
export const NODEJS_NPM_BUILD_TEMPLATE: BuildStepTemplate = {
  type: 'nodejs_npm',
  name: 'Node.js NPM 构建',
  description: 'Node.js项目使用NPM进行构建',
  keywords: ['nodejs', 'node.js', 'npm', 'javascript'],
  languages: ['nodejs', 'javascript', 'js'],
  buildTools: ['npm'],
  template: `      build_job:
        name: Node.js构建
        runsOn: 
          group: public/cn-beijing
          container: build-steps-public-registry.cn-beijing.cr.aliyuncs.com/build-steps/alinux3:latest
        steps:
          setup_npmrc_step:
            name: "下载npmrc"
            step: SetupNpmrc
            with:
              npmPrivateRepoConfigPath: "/root/.npmrc"
          setup_node_step:
            name: "安装Node"
            step: SetupNode
            with:
              versionType: "predefined"  # 支持填写 predefined、custom、nvmrc
              nodeVersion: {{nodeVersion || "18.12"}}
              npmType: "npm"
          command_step:
            name: "执行命令"
            step: Command
            with:
              run: |
                {{buildCommand || 'npm install && npm run build'}}`,
  defaultVariables: {
    nodeVersion: '"18.12"',
    buildCommand: 'npm install && npm run build',
    testCommand: 'npm test',
    artifactPath: 'dist/'
  }
};

// Python 构建步骤
export const PYTHON_BUILD_TEMPLATE: BuildStepTemplate = {
  type: 'python',
  name: 'Python 构建',
  description: 'Python项目构建',
  keywords: ['python', 'pip'],
  languages: ['python'],
  buildTools: ['pip', 'poetry'],
  template: `      build_job:
        name: Python构建
        runsOn: 
          group: public/cn-beijing
          container: build-steps-public-registry.cn-beijing.cr.aliyuncs.com/build-steps/alinux3:latest
        steps:
          setup_python_step:
            name: "安装Python"
            step: SetupPython
            with:
              pythonVersion: {{pythonVersion || "3.7"}}
          command_step:
            name: "执行命令"
            step: Command
            with:
              run: |
                {{buildCommand || 'python --version'}}`,
  defaultVariables: {
    pythonVersion: '"3.7"',
    buildCommand: 'python --version',
    testCommand: 'python -m pytest',
    artifactPath: '.'
  }
};

// Go 构建步骤
export const GO_BUILD_TEMPLATE: BuildStepTemplate = {
  type: 'go',
  name: 'Go 构建',
  description: 'Go项目构建',
  keywords: ['go', 'golang'],
  languages: ['go', 'golang'],
  buildTools: ['go'],
  template: `      build_job:
        name: Go构建
        runsOn: 
          group: public/cn-beijing
          container: build-steps-public-registry.cn-beijing.cr.aliyuncs.com/build-steps/alinux3:latest
        steps:
          golang_build_step:
            name: "安装 Golang"
            step: SetupGo
            with:
              goVersion: {{goVersion || "1.21"}}            
          command_step:
            name: "执行命令"
            step: Command
            with:
              run: |
                {{buildCommand || 'make build'}}`,
  defaultVariables: {
    goVersion: '"1.21"',
    buildCommand: 'make build',
    testCommand: 'go test ./...',
    artifactPath: '.'
  }
};

// .NET Core 构建步骤
export const DOTNET_BUILD_TEMPLATE: BuildStepTemplate = {
  type: 'dotnet',
  name: '.NET Core 构建',
  description: '.NET Core项目构建',
  keywords: ['dotnet', '.net', 'csharp'],
  languages: ['csharp'],
  buildTools: ['dotnet'],
  template: `      build_job:
        name: .NET Core构建
        runsOn: 
          group: public/cn-beijing
          container: build-steps-public-registry.cn-beijing.cr.aliyuncs.com/build-steps/dotnetcore:8.0
        steps:
          command_step:
            name: "执行命令"
            step: Command
            with:
              run: |
                dotnet --info
                {{buildCommand || 'dotnet restore && dotnet publish -c Release -o out'}}`,
  defaultVariables: {
    buildCommand: 'dotnet restore && dotnet publish -c Release -o out',
    testCommand: 'dotnet test',
    artifactPath: 'out/'
  }
};

// ===== 构建物上传模板 (Artifact Upload Templates) =====

export interface ArtifactUploadTemplate {
  type: string;
  name: string;
  description: string;
  template: string;
  defaultVariables: Partial<TemplateVariables>;
}

// Packages 制品库上传
export const PACKAGES_UPLOAD_TEMPLATE: ArtifactUploadTemplate = {
  type: 'packages',
  name: 'Packages 制品库上传',
  description: '上传到云效制品库',
  template: `          upload_step:
            step: ArtifactUpload
            name: 构建物上传
            with:
              uploadType: packages
              serviceConnection: {{packagesServiceConnection || 'your-packages-service-connection-id'}}
              repo: {{packagesRepoId || 'flow_generic_repo'}}
              artifact: {{artifactName || 'default'}}
              version: {{artifactVersion || '1.0.0'}}
              filePath:
                - {{artifactPath || '.'}}
              includePathInArtifact: {{includePathInArtifact || false}}`,
  defaultVariables: {
    uploadType: 'packages',
    artifactName: 'default',
    artifactVersion: '1.0.0',
    includePathInArtifact: false
  }
};

// Flow Public 上传
export const FLOW_PUBLIC_UPLOAD_TEMPLATE: ArtifactUploadTemplate = {
  type: 'flowPublic',
  name: 'Flow Public 上传',
  description: '上传到Flow公共存储',
  template: `          upload_step:
            step: ArtifactUpload
            name: 构建物上传
            with:
              uploadType: flowPublic
              artifact: {{artifactName || 'default'}}
              filePath:
                - {{artifactPath || '.'}}
              includePathInArtifact: {{includePathInArtifact || false}}`,
  defaultVariables: {
    uploadType: 'flowPublic',
    artifactName: 'default',
    includePathInArtifact: false
  }
};

// ===== 部署组件模板 (Deploy Component Templates) =====

export interface DeployComponentTemplate {
  type: string;
  name: string;
  description: string;
  keywords: string[];
  deployTargets: string[];
  template: string;
  defaultVariables: Partial<TemplateVariables>;
}

// 主机部署组件
export const VM_DEPLOY_COMPONENT_TEMPLATE: DeployComponentTemplate = {
  type: 'vm_deploy',
  name: '主机部署',
  description: '部署到虚拟主机/ECS',
  keywords: ['vm', 'host', '主机', 'ecs'],
  deployTargets: ['vm', 'host', '主机'],
  template: `      deploy_job:
        name: 主机部署
        component: VMDeploy
        with:
          artifact: $[stages.build_stage.build_job.upload_step.artifacts.{{artifactName || 'default'}}]
          machineGroup: {{machineGroupId || 'your-machine-group-id'}}
          artifactDownloadPath: {{artifactDownloadPath || '/home/admin/app/package.tgz'}}
          executeUser: {{executeUser || 'root'}}
          pauseStrategy: {{pauseStrategy || 'firstBatchPause'}}
          batchNumber: {{batchNumber || 2}}
          run: |
            cd /home/admin/app
            tar -xzf package.tgz
            {{deployCommand || 'echo "请配置部署命令"'}}`,
  defaultVariables: {
    executeUser: 'root',
    artifactDownloadPath: '/home/admin/app/package.tgz',
    pauseStrategy: 'firstBatchPause',
    batchNumber: 2
  }
};

// Kubernetes 部署组件
export const KUBERNETES_DEPLOY_COMPONENT_TEMPLATE: DeployComponentTemplate = {
  type: 'kubernetes_deploy',
  name: 'Kubernetes发布',
  description: '部署到Kubernetes集群',
  keywords: ['kubernetes', 'k8s', 'kubectl', 'deploy', 'apply'],
  deployTargets: ['kubernetes', 'k8s'],
  template: `      kubectl_apply_job:
        name: Kubernetes发布
        runsOn:
          group: public/cn-beijing
          container: build-steps-public-registry.cn-beijing.cr.aliyuncs.com/build-steps/alinux3:latest
        setps:
          kubectl_apply:
            step: KubectlApply
            name: "Kubectl 发布"
            with:
              kubernetesCluster: {{kubernetesClusterId || 'your-kubernetesCluster-id'}}
              kubectlVersion: {{kubectlVersion || "1.27.9"}}
              namespace: {{namespace || default}}
              yamlPath: {{yamlPath || app-configs/manifest-app}}
              variables:
                - key: image
                  value: $[stages.java_build_stage.java_build_job.acr_docker_build_step.artifacts.{{dockerImage || my_image}}]`,
  defaultVariables: {
    namespace: 'default',
    kubectlVersion: "1.27.9",
    yamlPath: 'app-configs/manifest-app'
  }
};

// ===== 模板集合 =====

export const SOURCE_TEMPLATES: SourceTemplate[] = [
  CODEUP_SOURCE_TEMPLATE,
  GITHUB_SOURCE_TEMPLATE
];

export const BUILD_STEP_TEMPLATES: BuildStepTemplate[] = [
  JAVA_MAVEN_BUILD_TEMPLATE,
  NODEJS_NPM_BUILD_TEMPLATE,
  PYTHON_BUILD_TEMPLATE,
  GO_BUILD_TEMPLATE,
  DOTNET_BUILD_TEMPLATE
];

export const ARTIFACT_UPLOAD_TEMPLATES: ArtifactUploadTemplate[] = [
  PACKAGES_UPLOAD_TEMPLATE,
  FLOW_PUBLIC_UPLOAD_TEMPLATE
];

export const DEPLOY_COMPONENT_TEMPLATES: DeployComponentTemplate[] = [
  VM_DEPLOY_COMPONENT_TEMPLATE,
  KUBERNETES_DEPLOY_COMPONENT_TEMPLATE
];

// ===== 模板匹配函数 =====

export function findMatchingSourceTemplate(keywords: string[]): SourceTemplate {
  const normalizedKeywords = keywords.map(k => k.toLowerCase());
  
  const matched = SOURCE_TEMPLATES.find(template =>
    template.keywords.some(keyword =>
      normalizedKeywords.some(nk => nk.includes(keyword) || keyword.includes(nk))
    )
  );
  
  return matched || CODEUP_SOURCE_TEMPLATE; // 默认使用 Codeup
}

export function findMatchingBuildTemplate(keywords: string[], languages: string[], buildTools: string[]): BuildStepTemplate | null {
  const normalizedKeywords = keywords.map(k => k.toLowerCase());
  const normalizedLanguages = languages.map(l => l.toLowerCase());
  const normalizedBuildTools = buildTools.map(t => t.toLowerCase());
  
  // 使用评分系统选择最佳匹配模板
  let bestTemplate: BuildStepTemplate | null = null;
  let bestScore = 0;
  
  for (const template of BUILD_STEP_TEMPLATES) {
    let score = 0;
    
    // 语言匹配 (权重最高)
    for (const lang of template.languages) {
      if (normalizedLanguages.some(nl => nl.includes(lang) || lang.includes(nl))) {
        score += 10;
      }
    }
    
    // 构建工具匹配 (权重中等)
    for (const tool of template.buildTools) {
      if (normalizedBuildTools.some(nt => nt.includes(tool) || tool.includes(nt))) {
        score += 5;
      }
    }
    
    // 关键词匹配 (权重较低)
    for (const keyword of template.keywords) {
      if (normalizedKeywords.some(nk => nk.includes(keyword) || keyword.includes(nk))) {
        score += 2;
      }
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestTemplate = template;
    }
  }
  
  return bestTemplate;
}

export function findMatchingUploadTemplate(uploadType: string): ArtifactUploadTemplate {
  return ARTIFACT_UPLOAD_TEMPLATES.find(template => template.type === uploadType) 
    || FLOW_PUBLIC_UPLOAD_TEMPLATE; // 默认使用 flowPublic
}

export function findMatchingDeployTemplate(keywords: string[], deployTargets: string[]): DeployComponentTemplate | null {
  const normalizedKeywords = keywords.map(k => k.toLowerCase());
  const normalizedTargets = deployTargets.map(t => t.toLowerCase());
  
  return DEPLOY_COMPONENT_TEMPLATES.find(template => {
    return template.keywords.some(keyword =>
      normalizedKeywords.some(nk => nk.includes(keyword) || keyword.includes(nk))
    ) ||
    template.deployTargets.some(target =>
      normalizedTargets.some(nt => nt.includes(target) || target.includes(nt))
    );
  }) || null;
}

// ===== 模块化流水线生成器 =====

export interface ModularPipelineOptions {
  sourceType?: string;
  buildLanguages?: string[];
  buildTools?: string[];
  uploadType?: string;
  deployTargets?: string[];
  keywords?: string[];
  variables?: TemplateVariables;
}

export function generateModularPipeline(options: ModularPipelineOptions): string {
  const {
    sourceType,
    buildLanguages = [],
    buildTools = [],
    uploadType = 'flowPublic',
    deployTargets = [],
    keywords = [],
    variables = {}
  } = options;

  // 1. 选择源码模板
  const sourceTemplate = findMatchingSourceTemplate(keywords);
  
  // 2. 选择构建模板
  const buildTemplate = findMatchingBuildTemplate(keywords, buildLanguages, buildTools);
  
  // 3. 选择上传模板
  const uploadTemplate = findMatchingUploadTemplate(uploadType);
  
  // 4. 选择部署模板
  const deployTemplate = deployTargets.length > 0 
    ? findMatchingDeployTemplate(keywords, deployTargets)
    : null;

  // 5. 合并默认变量
  const mergedVariables: TemplateVariables = {
    ...sourceTemplate.defaultVariables,
    ...buildTemplate?.defaultVariables,
    ...uploadTemplate.defaultVariables,
    ...deployTemplate?.defaultVariables,
    ...variables
  };

  // 6. 生成完整YAML
  let pipeline = sourceTemplate.template;
  
  if (buildTemplate) {
    pipeline += `

stages:
  build_stage:
    name: 构建阶段
    jobs:
${buildTemplate.template}
${uploadTemplate.template}`;
  }
  
  if (deployTemplate) {
    pipeline += `

  deploy_stage:
    name: 部署阶段
    jobs:
${deployTemplate.template}`;
  }

  // 7. 替换变量
  return replaceTemplateVariables(pipeline, mergedVariables);
}

// 变量替换函数 (复用原有逻辑)
function replaceTemplateVariables(template: string, variables: TemplateVariables): string {
  let result = template;
  
  result = result.replace(/\{\{([^}]+)\}\}/g, (match, expression) => {
    const trimmed = expression.trim();
    
    if (trimmed.includes('||')) {
      const [varName, defaultValue] = trimmed.split('||').map((s: string) => s.trim());
      const cleanVarName = varName.trim();
      const cleanDefaultValue = defaultValue.replace(/['"]/g, '');
      
      const value = (variables as any)[cleanVarName];
      
      if (value !== undefined && value !== null) {
        if (cleanVarName === 'repoUrl' && (value === '<your-repository-url>' || value.includes('<your-') || value.includes('>'))) {
          const serviceName = (variables as any)['serviceName'];
          if (serviceName && serviceName !== '<service-name>') {
            return `https://codeup.aliyun.com/your-org/${serviceName}.git`;
          }
        }
        
        if (cleanVarName === 'serviceConnectionId' && (value === '<your-service-connection-id>' || value.includes('<your-'))) {
          return 'your-service-connection-id';
        }
        
        if (cleanVarName === 'machineGroupId' && (value === '<your-machine-group-id>' || value.includes('<your-'))) {
          return 'your-machine-group-id';
        }
        
        return value;
      } else {
        return cleanDefaultValue;
      }
    } else {
      const value = (variables as any)[trimmed];
      if (value !== undefined && value !== null) {
        if (typeof value === 'string' && value.includes('<your-')) {
          if (trimmed === 'repoUrl') {
            const serviceName = (variables as any)['serviceName'];
            return serviceName && !serviceName.includes('<') ? 
              `https://codeup.aliyun.com/your-org/${serviceName}.git` : 
              'https://codeup.aliyun.com/your-org/your-repo.git';
          }
          if (trimmed === 'serviceConnectionId') {
            return 'your-service-connection-id';
          }
          if (trimmed === 'machineGroupId') {
            return 'your-machine-group-id';
          }
        }
        return value;
      }
      return match;
    }
  });
  
  return result;
} 