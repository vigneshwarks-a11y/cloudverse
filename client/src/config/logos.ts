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
  | 'oracle';

export const LOGOS: Record<LogoKey, LogoVariant> = {
  aws: {
    light: "/logos/aws/aws-light.svg",
    dark: "/logos/aws/aws-dark.svg",
  },
  azure: {
    light: "/logos/azure/azure-cloud.png",
    dark: "/logos/azure/azure-cloud.png",
  },
  gcp: {
    light: "/logos/gcp/gcp-light.svg",
    dark: "/logos/gcp/gcp-dark.svg",
  },
  alibaba: {
    light: "/logos/alibaba/alibaba-cloud.png",
    dark: "/logos/alibaba/alibaba-cloud.png",
  },
  huawei: {
    light: "/logos/huawei/huawei-cloud.png",
    dark: "/logos/huawei/huawei-cloud.png",
  },
  tencent: {
    light: "/logos/tencent/tencent-cloud.png",
    dark: "/logos/tencent/tencent-cloud.png",
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
    light: "/logos/oracle/oracle-light.svg",
    dark: "/logos/oracle/oracle-dark.svg",
  },
};

export const CLOUD_PROVIDERS: LogoKey[] = ['aws', 'azure', 'gcp', 'alibaba', 'huawei', 'tencent'];
export const AI_GPU_PROVIDERS: LogoKey[] = ['openai', 'snowflake', 'kubernetes'];

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
};
