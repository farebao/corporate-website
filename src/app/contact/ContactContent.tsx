'use client';

import { useState, type FormEvent } from 'react';
import { Mail, MapPin, Phone, Clock, MessageCircle, Send } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { AnimateInView } from '@/components/ui/AnimateInView';
import { useToast } from '@/components/ui/Toast';
import { CONTACT_INFO } from '@/lib/constants';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactContent() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (formData.name.trim().length < 2) {
      errs.name = '请输入姓名（至少2个字符）';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errs.email = '请输入有效的邮箱地址';
    }
    if (formData.message.trim().length < 10) {
      errs.message = '请输入留言内容（至少10个字符）';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    showToast('感谢您的留言！我们会尽快与您联系。', 'success');
    setFormData({ name: '', email: '', company: '', subject: '', message: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      {/* Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-brand-accent to-brand-accent/90">
        <div className="container-page text-center">
          <h1 className="text-h1-mobile md:text-h1 text-white mb-4">联系我们</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            期待与您的交流，让我们一起探讨如何为您的业务赋能
          </p>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimateInView>
                <h2 className="text-h3 text-brand-heading mb-8">发送消息</h2>
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label="姓名 *"
                      placeholder="您的姓名"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      error={errors.name}
                    />
                    <Input
                      label="邮箱 *"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      error={errors.email}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label="公司"
                      placeholder="您的公司名称"
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                    />
                    <Input
                      label="咨询主题"
                      placeholder="如：数字化转型咨询"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                    />
                  </div>
                  <Textarea
                    label="留言内容 *"
                    placeholder="请描述您的需求或问题（至少10个字符）"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    error={errors.message}
                  />
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      '提交中...'
                    ) : (
                      <>
                        提交留言
                        <Send size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </AnimateInView>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimateInView direction="right">
                <h2 className="text-h3 text-brand-heading mb-8">联系方式</h2>
                <Card padding className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin size={20} className="text-brand-cta mt-0.5 shrink-0" />
                    <div>
                      <p className="text-caption font-medium text-brand-heading mb-1">地址</p>
                      <p className="text-caption text-brand-muted">{CONTACT_INFO.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone size={20} className="text-brand-cta mt-0.5 shrink-0" />
                    <div>
                      <p className="text-caption font-medium text-brand-heading mb-1">电话</p>
                      <p className="text-caption text-brand-muted">{CONTACT_INFO.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail size={20} className="text-brand-cta mt-0.5 shrink-0" />
                    <div>
                      <p className="text-caption font-medium text-brand-heading mb-1">邮箱</p>
                      <p className="text-caption text-brand-muted">{CONTACT_INFO.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock size={20} className="text-brand-cta mt-0.5 shrink-0" />
                    <div>
                      <p className="text-caption font-medium text-brand-heading mb-1">工作时间</p>
                      <p className="text-caption text-brand-muted">{CONTACT_INFO.workHours}</p>
                    </div>
                  </div>
                </Card>

                {/* Quick chat prompt */}
                <div className="mt-8 bg-brand-bg-secondary rounded-xl p-6 text-center">
                  <MessageCircle size={32} className="text-brand-cta mx-auto mb-3" />
                  <p className="text-body font-medium text-brand-heading mb-2">或直接与我们的顾问在线沟通</p>
                  <p className="text-caption text-brand-muted">
                    点击右下角聊天图标，AI顾问7×24小时为您服务
                  </p>
                </div>
              </AnimateInView>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
