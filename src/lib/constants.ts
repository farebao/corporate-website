import type { NavItem, FAQItem } from '@/types';

export const SITE_NAME = 'XX科技';
export const SITE_DESCRIPTION = '专注企业级解决方案，助力品牌卓越增长';
export const SITE_URL = 'https://www.example.com';

export const NAV_ITEMS: NavItem[] = [
  { label: '首页', href: '/' },
  { label: '关于我们', href: '/about' },
  { label: '产品服务', href: '/products' },
  { label: '案例展示', href: '/cases' },
  { label: '新闻资讯', href: '/news' },
  { label: '联系我们', href: '/contact' },
];

export const CONTACT_INFO = {
  address: 'XX市XX区XX路XX号',
  phone: '400-XXX-XXXX',
  email: 'contact@company.com',
  workHours: '工作日 9:00 - 18:00',
};

export const SOCIAL_LINKS = {
  wechat: '#',
  weibo: '#',
  linkedin: '#',
};

export const CHAT_FAQ: FAQItem[] = [
  {
    keywords: ['你好', '您好', 'hi', 'hello', '嗨'],
    answer: '您好！我是AI智能顾问，很高兴为您服务。您可以问我关于产品、案例、合作流程等任何问题。',
  },
  {
    keywords: ['服务', '业务范围', '你们做什么', '提供什么', '做什么的'],
    answer: '我们提供一体化的企业级解决方案，涵盖技术研发、品牌营销、数字化转型咨询等。您可以在"产品服务"页面了解详情。',
  },
  {
    keywords: ['价格', '报价', '多少钱', '费用', '收费'],
    answer: '具体价格根据您的需求范围和定制化程度确定。方便的话，您可以留下联系方式，我们将安排顾问为您提供专属报价。',
  },
  {
    keywords: ['案例', '成功案例', '做过哪些', '项目经验', '客户'],
    answer: '我们已成功服务超过500家企业，涵盖科技、金融、消费等领域。您可以查看"案例展示"页面，了解具体成效。需要我为您推荐相关行业的案例吗？',
  },
  {
    keywords: ['合作', '合作流程', '怎么合作', '步骤', '流程'],
    answer: '通常流程为：初步沟通 → 需求分析 → 方案提案 → 签约启动 → 交付与支持。我会请顾问与您详细沟通，点击下方"预约咨询"可快速安排。',
  },
  {
    keywords: ['联系方式', '地址', '电话', '邮箱', '联系你们'],
    answer: '公司地址：XX市XX区XX路XX号。联系电话：400-XXX-XXXX。邮箱：contact@company.com。您也可以直接在对话框留下信息，我们会尽快联系。',
  },
  {
    keywords: ['工作时间', '客服', '几点下班', '上班时间'],
    answer: '我们的人工客服工作时间为工作日9:00-18:00。您可随时在此留言，我们会及时处理。当前我是AI助手，可7×24小时解答常见问题。',
  },
  {
    keywords: ['隐私', '隐私政策', '数据安全', '个人信息', '隐私保护'],
    answer: '我们高度重视您的隐私与数据安全，严格遵守相关法律法规。详细信息请访问"隐私政策"页面查看。',
  },
  {
    keywords: ['咨询', '项目需求', '寻求合作', '有需求', '想了解'],
    answer: '非常感谢！请简单描述您的需求或直接留下联系方式，我会立即通知顾问与您对接。',
  },
  {
    keywords: ['谢谢', '感谢', 'thanks', '多谢'],
    answer: '不客气！如有其他问题，随时找我。祝您生活愉快~',
  },
  {
    keywords: ['人工', '转人工', '客服', '真人'],
    answer: '您的问题已记录，请稍后，正在为您转接人工顾问...（模拟）若长时间无响应，建议拨打400电话。',
  },
];

export const CHAT_SUGGESTIONS = [
  '你们的服务有哪些？',
  '可以看一些案例吗？',
  '如何获取报价？',
];

export const CHAT_FALLBACK = '抱歉，我暂时无法理解您的问题。您可以尝试换个方式描述，或留下联系方式，让顾问为您提供1对1解答。';
