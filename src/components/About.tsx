import ScrollReveal from './ScrollReveal';

const About = () => {
  const awards = [
    { title: '中国国际大学生创新大赛', subtitle: '产业命题赛道 · 北斗司雨项目' },
    { title: 'Tech4City 华为创意竞赛', subtitle: 'MedBot 项目 · 产品三维建模与渲染' },
    { title: 'MFSZ2024 国际创客峰会', subtitle: '智能悬挂扶手项目 · 哈工大 Making Future 团队' },
  ];

  const honors = [
    '2023年秋季、2024年春季学期三等人民奖学金',
    '2025年度本科生二等奖学金',
    '2023-2025年度校级优秀学生',
    '2025版学生手册封面设计优秀奖',
    '广东省大学生计算机设计大赛省级三等奖',
  ];

  return (
    <section id="about" className="py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal type="left">
          <div className="section-number">01</div>
        </ScrollReveal>
        <ScrollReveal type="left" delay={100}>
          <h2 className="section-title">关于我</h2>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-5 gap-12 mt-8">
          <ScrollReveal type="left" delay={200} className="md:col-span-2">
            <img 
              src="/photo.png"
              alt="戴嘉轩"
              className="w-full aspect-[3/4] object-cover rounded-sm"
              loading="eager"
            />
          </ScrollReveal>
          
          <div className="md:col-span-3">
            <ScrollReveal type="right" delay={300}>
              <h3 className="text-2xl font-medium text-white mb-4">戴嘉轩</h3>
            </ScrollReveal>
            <ScrollReveal type="right" delay={400}>
              <p className="text-gray-400 mb-8">哈尔滨工业大学 · 未来设计学院 · 数字媒体艺术专业</p>
            </ScrollReveal>
            <ScrollReveal type="right" delay={500}>
              <p className="text-gray-300 leading-relaxed">擅长游戏引擎开发、网站搭建、UI设计与三维建模。具备平面视觉、产品动画全流程能力，多次参与竞赛与展会项目，审美敏锐，协作沟通能力强。</p>
            </ScrollReveal>
            
            <div className="mt-12">
              <ScrollReveal type="right" delay={600}>
                <h4 className="text-xl font-medium text-white mb-6">荣誉奖项</h4>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {honors.map((honor, index) => (
                  <ScrollReveal key={index} type="right" delay={700 + index * 100}>
                    <span 
                      className="px-3 py-1.5 bg-white/10 text-gray-300 text-sm rounded-lg cursor-pointer hover:bg-white/20 transition-all duration-300"
                    >
                      {honor}
                    </span>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <ScrollReveal type="bottom" delay={300}>
            <h4 className="text-xl font-medium text-white mb-6">竞赛与实践经历</h4>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <ScrollReveal key={index} type="bottom" delay={400 + index * 100}>
                <div 
                  className="p-6 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-white font-medium mb-2 block">{award.title}</span>
                  <span className="text-gray-400 text-sm block">{award.subtitle}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
