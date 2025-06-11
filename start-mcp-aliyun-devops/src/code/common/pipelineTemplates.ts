/**
 * 流水线模板相关类型定义
 * 保留核心接口供模块化架构使用
 */

// 模板变量接口定义
export interface TemplateVariables {
  // 基础信息
  repoUrl?: string;
  branch?: string;
  serviceName?: string;
  serviceConnectionId?: string;
  
  // 构建相关
  buildCommand?: string;
  testCommand?: string;
  artifactPath?: string;
  
  // 版本相关
  jdkVersion?: string;
  mavenVersion?: string;
  nodeVersion?: string;
  pythonVersion?: string;
  goVersion?: string;
  kubectlVersion?: string;
  
  // 部署相关
  deployTarget?: string;
  deployCommand?: string;
  machineGroupId?: string;
  namespace?: string;
  dockerImage?: string;
  executeUser?: string;
  artifactDownloadPath?: string;
  
  // VM部署相关
  pauseStrategy?: string;
  batchNumber?: number;
  
  // Kubernetes部署相关
  kubernetesClusterId?: string;
  yamlPath?: string;
  
  // 构建物上传相关
  uploadType?: string;
  artifactName?: string;
  artifactVersion?: string;
  packagesServiceConnection?: string;
  packagesRepoId?: string;
  includePathInArtifact?: boolean;
  
  // 环境变量
  environmentVariables?: Record<string, string>;
}

// 流水线模板类型枚举（保留用于类型兼容性）
export enum PipelineTemplateType {
  JAVA_MAVEN = 'java_maven',
  NODEJS_NPM = 'nodejs_npm',
  PYTHON = 'python',
  GO = 'go',
  KUBERNETES_DEPLOY = 'kubernetes_deploy',
  VM_DEPLOY = 'vm_deploy',
  // 新增更多类型
  JAVA_GRADLE = 'java_gradle',
  NODEJS_YARN = 'nodejs_yarn',
  PYTHON_POETRY = 'python_poetry',
  DOTNET_CORE = 'dotnet_core'
}