import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '隐私政策',
  description: '了解我们如何收集、使用和保护您的个人信息。XX科技高度重视您的隐私与数据安全。',
};

export default function PrivacyPage() {
  const lastUpdated = '2024年5月1日';

  return (
    <div className="pt-32 pb-20">
      <div className="container-page max-w-3xl">
        <h1 className="text-h1-mobile md:text-h1 text-brand-heading mb-4">隐私政策</h1>
        <p className="text-caption text-brand-muted mb-10">最后更新日期：{lastUpdated}</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-h3 text-brand-heading mb-4">引言</h2>
            <p className="text-body text-brand-body leading-relaxed">
              XX科技（以下简称"我们"）深知个人信息对您的重要性，我们将按照法律法规的规定，
              保护您的个人信息安全。本隐私政策旨在说明我们如何收集、使用和保护您的个人信息，请您仔细阅读。
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-brand-heading mb-4">信息收集</h2>
            <p className="text-body text-brand-body leading-relaxed mb-3">
              我们可能收集以下类型的信息：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-body text-brand-body">
              <li><strong>您主动提供的信息</strong>：当您填写联系表单或使用我们的在线客服时提供的姓名、邮箱、电话、公司名称等。</li>
              <li><strong>自动采集的信息</strong>：当您访问我们的网站时，我们可能自动收集您的IP地址、浏览器类型、访问时间、浏览页面等日志数据。</li>
              <li><strong>Cookie及类似技术</strong>：我们使用Cookie和类似技术来提升您的浏览体验和分析网站使用情况。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 text-brand-heading mb-4">信息使用</h2>
            <p className="text-body text-brand-body leading-relaxed mb-3">
              我们收集的信息将用于以下目的：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-body text-brand-body">
              <li>提供、维护和改善我们的产品与服务</li>
              <li>与您沟通，包括回复您的咨询、发送服务相关通知</li>
              <li>分析网站使用情况，优化用户体验</li>
              <li>遵守法律法规的要求</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 text-brand-heading mb-4">Cookie政策</h2>
            <p className="text-body text-brand-body leading-relaxed">
              我们使用必要Cookie以确保网站基本功能正常运行，以及分析Cookie以了解网站访问情况。
              您可以通过浏览器设置管理或禁用Cookie，但这可能影响部分功能的使用。
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-brand-heading mb-4">数据共享与披露</h2>
            <p className="text-body text-brand-body leading-relaxed">
              我们不会向第三方出售您的个人信息。除以下情形外，我们不会将您的个人信息共享给第三方：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-body text-brand-body">
              <li>获得您的明确同意</li>
              <li>法律法规要求或政府主管部门的强制性要求</li>
              <li>与为我们提供服务的供应商共享（如云服务提供商），且受严格的数据处理协议约束</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 text-brand-heading mb-4">数据安全</h2>
            <p className="text-body text-brand-body leading-relaxed">
              我们采用业界通行的安全防护措施保护您的个人信息，包括但不限于SSL/TLS加密传输、
              访问控制、数据脱敏、定期安全审计等。但请注意，任何互联网传输都无法保证100%的安全。
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-brand-heading mb-4">您的权利</h2>
            <p className="text-body text-brand-body leading-relaxed mb-3">
              根据适用的数据保护法律，您享有以下权利：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-body text-brand-body">
              <li>访问和获取您的个人信息副本</li>
              <li>更正不准确的个人信息</li>
              <li>删除您的个人信息</li>
              <li>限制或反对我们对您信息的处理</li>
              <li>撤回同意</li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 text-brand-heading mb-4">政策更新</h2>
            <p className="text-body text-brand-body leading-relaxed">
              我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，
              重大变更我们会通过网站公告或邮件通知。
            </p>
          </section>

          <section>
            <h2 className="text-h3 text-brand-heading mb-4">联系我们</h2>
            <p className="text-body text-brand-body leading-relaxed">
              如果您对本隐私政策有任何疑问、意见或投诉，请通过以下方式联系我们：
              <br />
              邮箱：privacy@company.com
              <br />
              地址：XX市XX区XX路XX号
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
