import { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const Works = ({ selectedProject, onProjectExpand }) => {
  const projects = [
    { id: '01', title: 'MORIOR ITER', video: '/mori/123456.mp4' },
    { id: '02', title: '步步生香' },
    { id: '03', title: 'MORE WORKS' },
  ];

  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [fromNavbar, setFromNavbar] = useState(false);
  const projectRefs = useRef({});
  const targetRefs = useRef({}); // 用于更精准的滚动目标
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // MORE WORKS的四个模块数据
  const moreWorksModules = [
    {
      id: 'project-showcase',
      title: 'KIDULT',
      subtitle: 'Lost Childhood 网站设计',
      images: [
        '/kid/0.png',
        '/kid/1.png',
        '/kid/2.png',
        '/kid/3.png',
        '/kid/4.png',
        '/kid/5.png',
        '/kid/6.png'
      ]
    },
    {
      id: 'design-gallery',
      title: 'AUTOMOBILE',
      subtitle: '三维动画制作',
      images: [
        '/car/0.png',
        '/car/3.mp4',
        '/car/2.png',
        '/car/1.png'
      ]
    },
    {
      id: 'creative-space',
      title: '国风智能 悬挂扶手',
      subtitle: 'Maker Faire 深圳',
      images: [
        '/mf/1.jpg',
        '/mf/2.jpg',
        '/mf/055f5d9c591bab5339847a73f3bbdf3.jpg',
        '/mf/79c28d881b15cb04c25d2eff5b65fee.png'
      ]
    },
    {
      id: 'inspiration-hub',
      title: 'EATER',
      subtitle: 'VR 叙事恐怖游戏',
      images: [
        '/eater/0.jpg',
        'https://daijiaxuan.oss-cn-shenzhen.aliyuncs.com/eater/eater.mp4',
        '/eater/1.png',
        '/eater/2.png',
        '/eater/4.png'
      ]
    }
  ];

  useEffect(() => {
    if (selectedProject) {
      if (selectedProject === '03') {
        // MORE WORKS不需要展开，只需要滚动
        setExpandedProject(null);
        setTimeout(() => {
          const element = targetRefs.current['more-works'];
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      } else if (selectedProject === '02') {
        // 步步生香直接滚动到海报总览
        setExpandedProject(selectedProject);
        setFromNavbar(true);
        setTimeout(() => {
          const element = targetRefs.current['poster-overview'];
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      } else {
        // MORIOR ITER直接滚动到项目描述
        setExpandedProject(selectedProject);
        setFromNavbar(true);
        setTimeout(() => {
          const element = targetRefs.current['mori-desc'];
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      }
      
      onProjectExpand(selectedProject);
    }
  }, [selectedProject, onProjectExpand]);

  const toggleExpand = (e, projectId: string) => {
    // 阻止所有可能的默认行为和跳转
    e.preventDefault();
    e.stopPropagation();
    
    // 记录当前滚动位置
    const currentScrollPosition = window.scrollY;
    
    // 完全阻止滚动，临时禁用滚动条
    document.body.style.overflow = 'hidden';
    
    // 临时锁定滚动位置，强制多次执行
    const lockScroll = () => {
      window.scrollTo({ top: currentScrollPosition, behavior: 'auto' });
    };
    
    // 立即执行多次
    lockScroll();
    lockScroll();
    lockScroll();
    requestAnimationFrame(lockScroll);
    requestAnimationFrame(lockScroll);
    
    // 执行展开/收起操作
    if (fromNavbar && expandedProject === projectId) {
      setFromNavbar(false);
      setExpandedProject(null);
    } else {
      setExpandedProject(expandedProject === projectId ? null : projectId);
      setFromNavbar(false);
    }
    
    // 持续锁定一段时间后恢复滚动
    setTimeout(lockScroll, 0);
    setTimeout(lockScroll, 10);
    setTimeout(lockScroll, 20);
    setTimeout(lockScroll, 50);
    setTimeout(lockScroll, 100);
    setTimeout(lockScroll, 200);
    
    // 恢复滚动
    setTimeout(() => {
      document.body.style.overflow = '';
    }, 300);
    
    return false;
  };

  return (
    <section id="works" className="py-24">
      <div className="px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="section-number">02</div>
          <h2 className="section-title">精选作品</h2>
        </div>
      </div>
      
      <div className="mt-16 space-y-24">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group"
            ref={(el) => { 
              if (el) {
                projectRefs.current[project.id] = el;
              }
            }}
          >
            <div className="px-6 lg:px-12">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-start justify-between mb-6">
                  <div 
                    ref={(el) => { 
                      if (el && project.id === '01') {
                        targetRefs.current['mori-desc'] = el;
                      }
                      if (el && project.id === '02') {
                        targetRefs.current['poster-overview'] = el;
                      }
                    }}
                  >
                    <span className="section-number">PROJECT {project.id}</span>
                    <h3 className="section-title mt-2">{project.title}</h3>
                    {project.id === '01' && (
                      <p className="mt-4 text-gray-300 max-w-2xl" style={{ fontSize: '16px', lineHeight: '1.8' }}>以情绪叙事与梦境世界为核心，构建关于成长、记忆与告别的沉浸式数字体验。</p>
                    )}
                    {project.id === '02' && (
                      <p className="mt-4 text-gray-300 max-w-2xl" style={{ fontSize: '16px', lineHeight: '1.8' }}>融合东方香文化与数字视觉设计 全国计算机设计大赛省级三等奖</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
                
            {project.video ? (
              <>
                <div className="relative w-full h-[400px] overflow-hidden">
                  <img
                    src="/mori/入口 .png"
                    alt="MORIOR ITER"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 className="text-4xl md:text-5xl font-light tracking-[0.3em] mb-4" style={{ color: '#8b6f6f', fontFamily: 'Georgia, serif' }}>MORIOR ITER</h2>
                    <p className="tracking-[0.2em] mb-2" style={{ color: '#d3cfcf', fontSize: '10px' }}>A JOURNEY ABOUT GROWTH AND GOODBYE</p>
                    <p className="tracking-wider" style={{ color: '#919191', fontSize: '15px' }}>一场关于成长与告别的旅程</p>
                  </div>
                </div>
                
                <div className="px-6 lg:px-12 mt-12">
                  <div className="max-w-6xl mx-auto space-y-4">
                    <span className="text-[#e6d5a7] text-sm tracking-widest">项目视频</span>
                    <h3 className="text-3xl md:text-4xl font-light text-white">ENTER THE EMOTIONAL JOURNEY</h3>
                  </div>
                </div>
                
                <div className="px-6 lg:px-12 mt-12">
                  <div className="max-w-6xl mx-auto">
                    <video
                      src={project.video}
                      controls
                      className="w-full aspect-video bg-gray-900 rounded-sm object-cover"
                      poster="/mori/01.png"
                    />
                    
                    {/* 只有不是从导航栏选择的，才显示展开按钮 */}
                    {!(fromNavbar && expandedProject === project.id) && (
                      <div className="mt-12">
                        <div 
                          className="flex items-center justify-center cursor-pointer group"
                          onClick={(e) => toggleExpand(e, project.id)}
                        >
                          <div className="flex-1 h-px bg-[#e6d5a7]"></div>
                          <div className="px-8 flex items-center">
                            <span className="text-[#e6d5a7] text-base tracking-widest">查看完整内容</span>
                            <div className="text-[#e6d5a7] ml-3 flex flex-col items-center">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ animation: 'bounce 4s infinite', width: '25px', height: '15px' }}>
                                {expandedProject === project.id ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                )}
                              </svg>
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ animation: 'bounce 4s infinite', width: '25px', height: '15px' }}>
                                {expandedProject === project.id ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                )}
                              </svg>
                            </div>
                          </div>
                          <div className="flex-1 h-px bg-[#e6d5a7]"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* 展开内容 - 从导航栏选择或者用户点击展开都显示 */}
                    {((fromNavbar && expandedProject === project.id) || expandedProject === project.id) && (
                      <div className="mt-16">
                        <div className="grid md:grid-cols-2 gap-12 items-end">
                          <div className="space-y-8">
                            <div className="space-y-4">
                              <span className="text-[#e6d5a7] text-sm tracking-widest">设计概述</span>
                              <h3 className="text-4xl font-light text-white">A JOURNEY THROUGH MEMORY AND LIFE</h3>
                            </div>
                            <p className="text-gray-200 leading-relaxed">
                              面向9-14岁儿童的死亡教育互动项目，将抽象的生命教育转化为一段温暖的奇幻旅程。玩家将在祖父的葬礼上进入七个奇幻场景，回顾祖父的一生，在互动中理解生命、记忆与告别。
                            </p>
                            
                            <div className="space-y-6">
                              <div className="flex">
                                <span className="text-[#e6d5a7] text-sm w-12 flex-shrink-0">01</span>
                                <div className="flex-1">
                                  <h4 className="text-white font-medium mb-1">调研与设计</h4>
                                  <p className="text-gray-500 text-sm">针对9-14岁儿童做深度调研，确定温暖治愈的项目基调，用童话式场景消解死亡的沉重</p>
                                </div>
                              </div>
                              <div className="flex">
                                <span className="text-[#e6d5a7] text-sm w-12 flex-shrink-0">02</span>
                                <div className="flex-1">
                                  <h4 className="text-white font-medium mb-1">游戏化开发</h4>
                                  <p className="text-gray-500 text-sm">用Unity开发互动游戏，加入收集、解谜玩法，让孩子在互动中学习</p>
                                </div>
                              </div>
                              <div className="flex">
                                <span className="text-[#e6d5a7] text-sm w-12 flex-shrink-0">03</span>
                                <div className="flex-1">
                                  <h4 className="text-white font-medium mb-1">全链路落地</h4>
                                  <p className="text-gray-500 text-sm">同步开发配套网站、线下快闪店，打造完整的品牌体验</p>
                                </div>
                              </div>
                              <div className="flex">
                                <span className="text-[#e6d5a7] text-sm w-12 flex-shrink-0">04</span>
                                <div className="flex-1">
                                  <h4 className="text-white font-medium mb-1">场景搭建</h4>
                                  <p className="text-gray-500 text-sm">负责游戏零/五场景搭建，Unity视角切换程序，过场动画制作</p>
                                </div>
                              </div>
                              <div className="flex">
                                <span className="text-[#e6d5a7] text-sm w-12 flex-shrink-0">05</span>
                                <div className="flex-1">
                                  <h4 className="text-white font-medium mb-1">线下落地</h4>
                                  <p className="text-gray-500 text-sm">快闪店场景渲染，把游戏的场景搬到线下，打造沉浸式体验</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <img
                              src="/mori/图片12.png"
                              alt="MORIOR ITER"
                              className="w-full max-w-sm rounded-sm"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-16">
                          <ScrollReveal type="left">
                            <span className="text-[#e6d5a7] text-sm tracking-widest uppercase">宣传海报</span>
                          </ScrollReveal>
                          <ScrollReveal type="left" delay={100}>
                            <h3 className="text-4xl font-light text-white mt-2">EMOTIONAL FRAGMENTS</h3>
                          </ScrollReveal>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            {['宣传海报/图片1(1)_compressed.jpg', '宣传海报/图片2(1)_compressed.jpg', '宣传海报/图片3(1)_compressed.jpg', '宣传海报/图片4(1)_compressed.jpg'].map((img, index) => (
                              <ScrollReveal key={index} type="left" delay={200 + index * 100} className="cursor-pointer">
                                <img
                                  src={`/mori/${img}`}
                                  alt={`Poster ${index + 1}`}
                                  className="w-full aspect-[3/4] object-cover rounded-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                />
                              </ScrollReveal>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-16">
                          <ScrollReveal type="left">
                            <h3 className="text-4xl font-light text-white">FRAGMENTS OF THE WORLD</h3>
                          </ScrollReveal>
                          <ScrollReveal type="left" delay={100}>
                            <p className="text-[#e6d5a7] text-sm tracking-widest mt-2">场景设计</p>
                          </ScrollReveal>
                          
                          <div className="grid grid-cols-3 gap-6 mt-8">
                            {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => {
                              // 2字型顺序：第一行从左到右(1-3)，第二行从右到左(4-6反向)，第三行从左到右(7-9)
                              const order = [1, 2, 3, 6, 5, 4, 7, 8, 9];
                              const delay = order.indexOf(num) * 100 + 200;
                              return (
                                <ScrollReveal key={num} type="left" delay={delay} className="cursor-pointer">
                                  <img
                                    src={`/mori/cj/图片${num}.png`}
                                    alt={`Scene ${num}`}
                                    className="w-full rounded-lg transition-all duration-300 hover:shadow-xl"
                                  />
                                </ScrollReveal>
                              );
                            })}
                          </div>
                          
                          <div className="mt-16">
                            <ScrollReveal type="left">
                              <div className="mb-8">
                                <h3 className="font-light text-white tracking-wider" style={{ fontSize: '36px' }}>MECHANIC INTRODUCTION</h3>
                                <p className="text-[#e6d5a7] text-sm mt-1">机制简介</p>
                              </div>
                            </ScrollReveal>
                            <div className="grid md:grid-cols-5 gap-8">
                              <ScrollReveal type="left" delay={100} className="md:col-span-1">
                                <p className="text-gray-500 text-sm leading-relaxed">
                                  玩家通过收集记忆碎片，点亮内心的光，解锁新的能力与场景，完成自我成长的旅程。
                                </p>
                              </ScrollReveal>
                              <div className="md:col-span-4">
                                <div className="grid grid-cols-4 gap-8">
                                  {[
                                    { title: "收集碎片", desc: "探索场景，收集记忆碎片。" },
                                    { title: "点亮记忆", desc: "点亮碎片，唤起内心的力量。" },
                                    { title: "解锁能力", desc: "获得新的能力，继续前进。" },
                                    { title: "成长与告别", desc: "面对告别，完成心灵的成长。" }
                                  ].map((item, index) => (
                                    <ScrollReveal key={index} type="left" delay={200 + index * 100} className="text-center">
                                      <h4 className="text-white font-medium mt-4">{item.title}</h4>
                                      <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
                                    </ScrollReveal>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <ScrollReveal type="bottom" className="flex items-center justify-center mt-12">
                            <div className="flex items-center w-12 h-px bg-gray-300"></div>
                            <span className="mx-6 text-gray-200 tracking-widest">MORIOR ITER 品牌展示</span>
                            <div className="flex items-center w-12 h-px bg-gray-300"></div>
                          </ScrollReveal>
                          
                          <div className="mt-12">
                            <div className="grid grid-cols-2 gap-8 mb-8">
                              <ScrollReveal type="left" delay={100} className="rounded-3xl overflow-hidden shadow-lg bg-white/5">
                                <div className="aspect-video bg-white/10">
                                  <img src="/mori/图片7.png" alt="Website Overview" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6">
                                  <div className="h-px bg-gray-200 mb-4"></div>
                                  <h4 className="text-2xl font-light text-gray-200 mb-2">WEBSITE OVERVIEW</h4>
                                  <p className="text-[#e6d5a7] text-sm">网站概览</p>
                                </div>
                              </ScrollReveal>
                              <ScrollReveal type="right" delay={100} className="rounded-3xl overflow-hidden shadow-lg bg-white/5">
                                <div className="aspect-video bg-white/10">
                                  <img src="/mori/图片8.png" alt="Merchandise" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6">
                                  <div className="h-px bg-gray-200 mb-4"></div>
                                  <h4 className="text-2xl font-light text-gray-200 mb-2">MERCHANDISE</h4>
                                  <p className="text-[#e6d5a7] text-sm">周边产品</p>
                                </div>
                              </ScrollReveal>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                              <ScrollReveal type="left" delay={200} className="rounded-3xl overflow-hidden shadow-lg bg-white/5">
                                <div className="aspect-video bg-white/10">
                                  <img src="/mori/图片9.png" alt="Concept Pop-up Store" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6">
                                  <div className="h-px bg-gray-200 mb-4"></div>
                                  <h4 className="text-2xl font-light text-gray-200 mb-2">CONCEPT POP-UP STORE</h4>
                                  <p className="text-[#e6d5a7] text-sm">概念快闪店</p>
                                </div>
                              </ScrollReveal>
                              <ScrollReveal type="right" delay={200} className="rounded-3xl overflow-hidden shadow-lg bg-white/5">
                                <div className="aspect-video bg-white/10">
                                  <img src="/mori/图片10.png" alt="Meme Culture" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6">
                                  <div className="h-px bg-gray-200 mb-4"></div>
                                  <h4 className="text-2xl font-light text-gray-200 mb-2">MEME CULTURE</h4>
                                  <p className="text-[#e6d5a7] text-sm">迷因</p>
                                </div>
                              </ScrollReveal>
                            </div>
                            
                            <div className="mt-8">
                              <div className="rounded-3xl overflow-hidden shadow-lg bg-white/5">
                                <div className="grid grid-cols-2">
                                  <div className="aspect-video bg-white/10">
                                    <img src="/mori/13.jpg" alt="Cultural Exhibition 1" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="aspect-video bg-white/10">
                                    <img src="/mori/14.jpg" alt="Cultural Exhibition 2" className="w-full h-full object-cover" />
                                  </div>
                                </div>
                                <div className="p-6">
                                  <div className="h-px bg-gray-200 mb-4"></div>
                                  <h4 className="text-2xl font-light text-gray-200 mb-2">CULTURAL EXHIBITION</h4>
                                  <p className="text-[#e6d5a7] text-sm">文博会展览 MORIOR ITER 的情绪世界从数字叙事延伸至品牌体验、空间与视觉文化。</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="px-6 lg:px-12">
                <div className="max-w-6xl mx-auto">
                  {project.title === '步步生香' ? (
                    <>
                      <div className="space-y-4">
                    <ScrollReveal type="left">
                      <span className="text-[#e6d5a7] text-sm tracking-widest">海报总览</span>
                    </ScrollReveal>
                    <ScrollReveal type="left" delay={100}>
                      <h3 className="text-3xl md:text-4xl font-light text-white">MAIN POSTER</h3>
                    </ScrollReveal>
                  </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <ScrollReveal key={num} type="left" delay={200 + num * 100} className="cursor-pointer">
                            <img
                              src={`/xiang/${num}.jpg`}
                              alt={`Poster ${num + 1}`}
                              className="w-full aspect-[3/4] object-cover rounded-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            />
                          </ScrollReveal>
                        ))}
                      </div>
                      
                      <div className="mt-16 space-y-6">
                        <div>
                          <h4 className="text-xl font-medium text-white mb-4">项目简介｜步步生香</h4>
                        </div>
                        <p className="text-gray-200 leading-relaxed">
                          《步步生香》是一项以中国传统香文化为核心的视觉设计项目，通过信息图表、插画与版式设计相结合的方式，对香囊文化、香料历史、香囊纹样、制香工艺以及香方配伍进行系统梳理与再设计。
                        </p>
                        <p className="text-gray-200 leading-relaxed">
                          项目以柔和雅致的东方色彩与传统纹样语言为基础，将古代香文化中的礼仪、美学与生活智慧转化为现代视觉表达，使观者在阅读与观赏中重新感受中国传统香文化的魅力与温度。
                        </p>
                      </div>
                      
                      {/* 展开内容 - 步步生香默认展开，其他项目需要点击展开 */}
                      {(project.title === '步步生香' || (fromNavbar && expandedProject === project.id) || expandedProject === project.id) && (
                        <div className="mt-16">
                          <div className="grid md:grid-cols-2 gap-12 items-end">
                            <div>
                              <img
                                src="/xiang/总海报.jpg"
                                alt="总海报"
                                className="w-full rounded-lg"
                              />
                            </div>
                            <div className="space-y-6 flex flex-col justify-end">
                              <ScrollReveal type="right" className="text-right space-y-4">
                                <span className="text-[#e6d5a7] text-sm tracking-widest">周边产品</span>
                                <h3 className="text-3xl md:text-4xl font-light text-white">PERIPHERAL PRODUCTS</h3>
                              </ScrollReveal>
                              <div className="grid grid-cols-2 gap-3 mt-6">
                                {[6, 7, 8, 9].map((num, index) => (
                                  <ScrollReveal key={num} type="right" delay={100 + index * 100} className="cursor-pointer">
                                    <img
                                      src={`/xiang/${num}.jpg`}
                                      alt={`Peripheral ${num}`}
                                      className="w-full aspect-square object-cover rounded-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                    />
                                    <span className="block text-center text-gray-400 text-xs mt-2">
                                      {num === 6 ? '折页' : num === 7 ? '提包' : num === 8 ? '香薰' : '宣传贴'}
                                    </span>
                                  </ScrollReveal>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="mt-16">
                            <div className="space-y-4 mb-12">
                              <ScrollReveal type="left">
                                <span className="text-[#e6d5a7] text-sm tracking-widest">香的长卷</span>
                              </ScrollReveal>
                              <ScrollReveal type="left" delay={100}>
                                <h3 className="text-3xl md:text-4xl font-light text-white">Interactive Scroll</h3>
                              </ScrollReveal>
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                              {[
                                { title: "先秦", desc: "香主要用于祭祀与驱秽" },
                                { title: "汉唐", desc: "香文化逐渐融入日常生活与佩饰文化" },
                                { title: "宋元", desc: "香文化达到鼎盛，焚香、佩香、品香成为文人雅士的重要生活方式" },
                                { title: "明清", desc: "香囊工艺与香料配伍更加精细，形成兼具审美、礼仪与养生功能的香文化体系" },
                                { title: "现代", desc: "传统香文化逐渐成为东方美学与非遗文化的重要代表之一" }
                              ].map((item, index) => (
                                <ScrollReveal key={index} type="left" delay={200 + index * 100} className="text-center">
                                  <div className="w-3 h-3 bg-[#e6d5a7] rounded-full mx-auto mb-4"></div>
                                  <h4 className="text-xl font-medium text-white mb-2">{item.title}</h4>
                                  <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                                </ScrollReveal>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="px-6 lg:px-12">
                      <div className="max-w-6xl mx-auto">
                        <div 
                          ref={(el) => { 
                            if (el) {
                              targetRefs.current['more-works'] = el;
                            }
                          }}
                          className="mt-12"
                        >
                          <div className="grid grid-cols-2 gap-8 mb-8">
                            {moreWorksModules.slice(0, 2).map((module, index) => (
                              <ScrollReveal 
                                key={module.id} 
                                type={index % 2 === 0 ? "left" : "right"} 
                                delay={100}
                                className="rounded-3xl overflow-hidden shadow-lg bg-white/5 cursor-pointer transition-all duration-300 hover:shadow-xl"
                                onClick={() => setActiveModal(module.id)}
                              >
                                <div className="aspect-video bg-white/10 overflow-hidden">
                                  <img 
                                    src={module.images[0]} 
                                    alt={module.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                  />
                                </div>
                                <div className="p-6">
                                  <div className="text-gray-400 text-xs mb-2 tracking-widest">点击查看</div>
                                  <div className="h-px bg-gray-200 mb-4"></div>
                                  <h4 className="text-2xl font-light text-gray-200 mb-2">{module.title}</h4>
                                  <p className="text-[#e6d5a7] text-sm">{module.subtitle}</p>
                                </div>
                              </ScrollReveal>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 gap-8">
                            {moreWorksModules.slice(2, 4).map((module, index) => (
                              <ScrollReveal 
                                key={module.id} 
                                type={index % 2 === 0 ? "left" : "right"} 
                                delay={200}
                                className="rounded-3xl overflow-hidden shadow-lg bg-white/5 cursor-pointer transition-all duration-300 hover:shadow-xl"
                                onClick={() => setActiveModal(module.id)}
                              >
                                <div className="aspect-video bg-white/10 overflow-hidden">
                                  <img 
                                    src={module.images[0]} 
                                    alt={module.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                  />
                                </div>
                                <div className="p-6">
                                  <div className="text-gray-400 text-xs mb-2 tracking-widest">点击查看</div>
                                  <div className="h-px bg-gray-200 mb-4"></div>
                                  <h4 className="text-2xl font-light text-gray-200 mb-2">{module.title}</h4>
                                  <p className="text-[#e6d5a7] text-sm">{module.subtitle}</p>
                                </div>
                              </ScrollReveal>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* 悬浮窗 */}
      {activeModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 z-50"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-2xl font-light text-black">
                {moreWorksModules.find(m => m.id === activeModal)?.title}
              </h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-gray-500 hover:text-black text-3xl"
              >
                ×
              </button>
            </div>
            
            {/* 图片内容 */}
            <div className="p-8">
              {activeModal === 'creative-space' ? (
                <div className="space-y-6">
                  {/* 描述文字 */}
                  <div className="text-gray-700 leading-relaxed text-center">
                    结合 AI 人体扫描技术的智能公共交通扶手，可自动检测乘客身高并调节至合适高度。用户可进一步手动微调，并通过按钮锁定扶手位置，提升乘车舒适性与站立安全性。
                  </div>
                  {/* 上面两张竖版 */}
                  <div className="grid grid-cols-2 gap-4">
                    {moreWorksModules
                      .find(m => m.id === activeModal)
                      ?.images.slice(0, 2)
                      .map((img, index) => (
                        <div key={index} className="aspect-[3/4]">
                          <img
                            src={img}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg shadow-md"
                          />
                        </div>
                      ))}
                  </div>
                  {/* 下面两张横版 */}
                  <div className="grid grid-cols-2 gap-4">
                    {moreWorksModules
                      .find(m => m.id === activeModal)
                      ?.images.slice(2, 4)
                      .map((img, index) => (
                        <div key={index + 2} className="aspect-[4/3]">
                          <img
                            src={img}
                            alt={`Image ${index + 3}`}
                            className="w-full h-full object-cover rounded-lg shadow-md"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ) : activeModal === 'project-showcase' ? (
                <div className="space-y-6">
                  {/* 描述文字 */}
                  <div className="text-gray-700 leading-relaxed text-center">
                    我们旨在通过童年符号可视化创造一个帮助20- 30岁城市青年在很短的碎片时间也可以获得情绪减压体验，数字疗愈网站。
                  </div>
                  {/* 第一行三个 */}
                  <div className="grid grid-cols-3 gap-4">
                    {moreWorksModules
                      .find(m => m.id === activeModal)
                      ?.images.slice(1, 4)
                      .map((img, index) => (
                        <div key={index}>
                          <img
                            src={img}
                            alt={`Image ${index + 1}`}
                            className="w-full aspect-square object-cover rounded-lg shadow-md"
                          />
                        </div>
                      ))}
                  </div>
                  {/* 第二行三个 */}
                  <div className="grid grid-cols-3 gap-4">
                    {moreWorksModules
                      .find(m => m.id === activeModal)
                      ?.images.slice(4, 7)
                      .map((img, index) => (
                        <div key={index + 3}>
                          <img
                            src={img}
                            alt={`Image ${index + 4}`}
                            className="w-full aspect-square object-cover rounded-lg shadow-md"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ) : activeModal === 'design-gallery' ? (
                <div className="space-y-6">
                  {/* 描述文字 */}
                  <div className="text-gray-700 leading-relaxed text-center">
                    以汽车为主题创作动画，讲述外表可爱的 A 车遭嚣张 B 车挑衅后变形反击，凸显反差戏剧效果；含调研预设、2D+3D 制作，传递不以外表评判他人等寓意。
                  </div>
                  {/* 视频 */}
                  <div className="aspect-video">
                    <video
                      src="/car/3.mp4"
                      controls
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                  {/* 图片和文字 */}
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div>
                      <img
                        src="/car/2.png"
                        alt="脚本分镜1"
                        className="w-full aspect-square object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div>
                      <img
                        src="/car/1.png"
                        alt="脚本分镜2"
                        className="w-full aspect-square object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="text-2xl font-light text-black">脚本分镜</h4>
                    </div>
                  </div>
                </div>
              ) : activeModal === 'inspiration-hub' ? (
                <div className="space-y-4">
                  {/* 描述文字 */}
                  <div className="text-gray-700 leading-relaxed text-center">
                    《Eater》是一款以海洋生态危机为现实基底、具身认知为设计核心的VR 叙事恐怖游戏，以 “七天吃鱼→鱼体变异→视角反转” 为核心机制，用日常用餐的荒诞感与缓慢累积的心理恐怖，传递海洋污染反噬人类的环保反思，实现 “体验式警示” 而非说教式宣传。
                  </div>
                  {/* 第一行：视频 */}
                  <div className="aspect-video">
                    <video
                      src="https://daijiaxuan.oss-cn-shenzhen.aliyuncs.com/eater/eater.mp4"
                      controls
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                  {/* 第二行：图片1、2 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <img
                        src="/eater/1.png"
                        alt="EATER 1"
                        className="w-full aspect-square object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <div>
                      <img
                        src="/eater/2.png"
                        alt="EATER 2"
                        className="w-full aspect-square object-cover rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                  {/* 第三行：图片3 */}
                  <div>
                    <img
                      src="/eater/3.png"
                      alt="EATER 3"
                      className="w-full rounded-lg shadow-md"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {moreWorksModules
                    .find(m => m.id === activeModal)
                    ?.images.map((img, index) => (
                      <div key={index}>
                        <img
                          src={img}
                          alt={`Image ${index + 1}`}
                          className="w-full rounded-lg shadow-md"
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Works;
