export type LogoVariant = {
  light: string;
  dark: string;
};

export type LogoKey = 
  | 'aws' 
  | 'azure' 
  | 'gcp' 
  | 'alibaba' 
  | 'huawei' 
  | 'tencent' 
  | 'openai' 
  | 'databricks' 
  | 'snowflake' 
  | 'kubernetes' 
  | 'oracle'
  | 'nvidia';

export const LOGOS: Record<LogoKey, LogoVariant> = {
  aws: {
    light: "/logos/aws/aws-light.svg",
    dark: "/logos/aws/aws-dark.png",
  },
  azure: {
    light: "/logos/azure/azure-cloud.png",
    dark: "/logos/azure/azure-dark.png",
  },
  gcp: {
    light: "/logos/gcp/gcp-light.png",
    dark: "/logos/gcp/gcp-dark.png",
  },
  alibaba: {
    light: "/logos/alibaba/alibaba-cloud.png",
    dark: "/logos/alibaba/alibaba-dark.png",
  },
  huawei: {
    light: "/logos/huawei/huawei-cloud.png",
    dark: "/logos/huawei/huawei-dark.png",
  },
  tencent: {
    light: "/logos/tencent/tencent-cloud.png",
    dark: "/logos/tencent/tencent-dark.png",
  },
  openai: {
    light: "/logos/openai/openai-light.svg",
    dark: "/logos/openai/openai-dark.svg",
  },
  databricks: {
    light: "/logos/databricks/databricks-light.svg",
    dark: "/logos/databricks/databricks-dark.svg",
  },
  snowflake: {
    light: "/logos/snowflake/snowflake-light.svg",
    dark: "/logos/snowflake/snowflake-dark.svg",
  },
  kubernetes: {
    light: "/logos/kubernetes/kubernetes-light.svg",
    dark: "/logos/kubernetes/kubernetes-dark.svg",
  },
  oracle: {
    light: "/logos/oracle.png",
    dark: "/logos/oracle-dark.png",
  },
  nvidia: {
    light: "/logos/nvidia.png",
    dark: "/logos/nvidia.png",
  },
};

export const CLOUD_PROVIDERS: LogoKey[] = ['aws', 'azure', 'gcp', 'alibaba', 'huawei', 'tencent', 'oracle'];
export const AI_GPU_PROVIDERS: LogoKey[] = ['openai', 'snowflake', 'nvidia'];

export const LOGO_DISPLAY_NAMES: Record<LogoKey, string> = {
  aws: 'AWS',
  azure: 'Azure',
  gcp: 'Google Cloud',
  alibaba: 'Alibaba Cloud',
  huawei: 'Huawei Cloud',
  tencent: 'Tencent Cloud',
  openai: 'OpenAI',
  databricks: 'Databricks',
  snowflake: 'Snowflake',
  kubernetes: 'Kubernetes',
  oracle: 'Oracle Cloud',
  nvidia: 'NVIDIA',
};
