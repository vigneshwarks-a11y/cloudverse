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
    light: "/logos/azure/azure-light.svg",
    dark: "/logos/azure/azure-dark.png",
  },
  gcp: {
    light: "/logos/gcp/gcp-light.svg",
    dark: "/logos/gcp/gcp-dark.svg",
  },
  alibaba: {
    light: "/logos/alibaba/alibaba-light.svg",
    dark: "/logos/alibaba/alibaba-dark.png",
  },
  huawei: {
    light: "/logos/huawei/huawei-light.svg",
    dark: "/logos/huawei/huawei-dark.svg",
  },
  tencent: {
    light: "/logos/tencent/tencent-light.svg",
    dark: "/logos/tencent/tencent-dark.svg",
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
export const AI_GPU_PROVIDERS: LogoKey[] = ['openai', 'databricks', 'snowflake', 'kubernetes'];

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
