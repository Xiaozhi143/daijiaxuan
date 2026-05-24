import ScrollAnimate from './ScrollAnimate';

const Skills = () => {
  const skillCategories = [
    {
      icon: '🎮',
      title: '3D与交互开发',
      subtitle: '3D建模 · 交互开发 · 游戏化设计',
      skills: ['C#', 'Unity', 'UE5', 'Blender'],
    },
    {
      icon: '🎨',
      title: '视觉与动效',
      subtitle: '视觉设计 · 动效设计 · 品牌设计',
      skills: ['Photoshop', 'Figma', 'TouchDesigner', '视频剪辑', 'AE/PR'],
    },
    {
      icon: '🌐',
      title: '网页与前端',
      subtitle: '网站开发 · 前端开发 · 沉浸式网页',
      skills: ['代码编程', 'ai编程', 'react'],
    },
    {
      icon: '✨',
      title: '情绪叙事设计',
      subtitle: '世界观构建 ·数字疗愈',
      skills: ['分镜设计', '情感化UI', '故事板'],
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 lg:px-12 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimate>
          <div className="section-number">03</div>
        </ScrollAnimate>
        <ScrollAnimate delay={100}>
          <h2 className="section-title">技能</h2>
        </ScrollAnimate>
        <ScrollAnimate delay={200}>
          <p className="section-subtitle">从创意到落地，用技术为设计赋能。</p>
        </ScrollAnimate>

        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {skillCategories.map((category, index) => (
            <ScrollAnimate key={index} delay={300 + index * 100}>
              <div 
                className="p-5 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-medium text-white mb-2">{category.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{category.subtitle}</p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-base text-gray-300 px-3 py-1.5 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollAnimate>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
