import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Interface definida ANTES do componente
interface TextSplitAnimationProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  animationType?: 'chars' | 'words' | 'lines';
}

const TextSplitAnimation: React.FC<TextSplitAnimationProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
  animationType = 'chars'
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const text = children;
    let splitText: string[] = [];

    // Split text based on animation type
    switch (animationType) {
      case 'chars':
        splitText = text.split('');
        break;
      case 'words':
        splitText = text.split(' ');
        break;
      case 'lines':
        splitText = text.split('\n');
        break;
    }

    // Create spans for each part
    element.innerHTML = splitText
      .map((part, index) => {
        if (animationType === 'words' && index < splitText.length - 1) {
          return `<span class="inline-block">${part}</span><span class="inline-block">&nbsp;</span>`;
        }
        return `<span class="inline-block">${part === '\n' ? '<br>' : part}</span>`;
      })
      .join('');

    const spans = element.querySelectorAll('span');

    // Set initial state
    gsap.set(spans, {
      y: 100,
      opacity: 0,
      rotationX: -90,
      transformOrigin: '0% 50% -50px'
    });

    // Animate in
    const tl = gsap.timeline({ delay });
    tl.to(spans, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration,
      stagger,
      ease: 'back.out(1.7)'
    });

    return () => {
      tl.kill();
    };
  }, [children, delay, duration, stagger, animationType]);

  return <div ref={textRef} className={className} />;
};

export default TextSplitAnimation;