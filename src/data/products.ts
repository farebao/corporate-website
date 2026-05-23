import type { Service } from '@/types';

export const products: Service[] = [
  {
    id: 'tech-rd',
    icon: 'Code2',
    title: '技术研发',
    summary: '基于云原生的全栈技术研发服务，涵盖Web应用、移动端、小程序及中台系统定制开发。',
    category: 'tech',
    features: ['云原生', '微服务', '全栈开发', 'DevOps'],
  },
  {
    id: 'brand-marketing',
    icon: 'Megaphone',
    title: '品牌营销',
    summary: '数据驱动的整合营销解决方案，从品牌策略、内容创意到效果广告的端到端服务。',
    category: 'marketing',
    features: ['品牌策略', '内容营销', 'SEM/SEO', '社交运营'],
  },
  {
    id: 'digital-transformation',
    icon: 'Rocket',
    title: '数字化转型咨询',
    summary: '为传统企业提供数字化战略规划、流程再造与技术架构设计，加速业务转型升级。',
    category: 'tech',
    features: ['战略规划', '流程优化', '架构设计', '落地陪跑'],
  },
  {
    id: 'data-analytics',
    icon: 'BarChart3',
    title: '数据分析服务',
    summary: '基于大数据和AI的数据采集、清洗、建模及可视化服务，让数据驱动业务决策。',
    category: 'tech',
    features: ['BI看板', '用户画像', '预测分析', '数据中台'],
  },
  {
    id: 'ui-ux-design',
    icon: 'Palette',
    title: 'UI/UX设计',
    summary: '以用户为中心的产品体验设计，从用户研究、交互设计到视觉界面的全链路设计服务。',
    category: 'marketing',
    features: ['用户研究', '交互设计', '视觉设计', '设计系统'],
  },
  {
    id: 'operation-support',
    icon: 'Headphones',
    title: '运营支持',
    summary: '提供7×24小时技术运维、内容运营及增长运营支持，确保业务持续稳定增长。',
    category: 'operation',
    features: ['技术运维', '内容运营', '用户增长', '客服外包'],
  },
];

export const productCategories = [
  { key: 'all', label: '全部' },
  { key: 'tech', label: '技术研发' },
  { key: 'marketing', label: '品牌营销' },
  { key: 'operation', label: '运营支持' },
];
