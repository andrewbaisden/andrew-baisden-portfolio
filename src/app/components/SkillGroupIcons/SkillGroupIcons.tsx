import { useState, ReactNode } from 'react';
import './SkillGroupIcons.css';
import HTML5Logo from '../HTML5Logo/HTML5Logo';
import CSS3Logo from '../CSS3Logo/CSS3Logo';
import JavaScriptLogo from '../JavaScriptLogo/JavaScriptLogo';
import TypeScriptLogo from '../TypeScriptLogo/TypeScriptLogo';
import ReactLogo from '../ReactLogo/ReactLogo';
import PythonLogo from '../PythonLogo/PythonLogo';
import NodeJSLogo from '../NodeJSLogo/NodeJSLogo';
import MongoDBLogo from '../MongoDBLogo/MongoDBLogo';
import SQLLogo from '../SQLLogo/SQLLogo';
import DockerLogo from '../DockerLogo/DockerLogo'
import FigmaLogo from '../FigmaLogo/FigmaLogo';

interface SkillGroupIconsProps {}

export const SkillGroupIcons = ({ ...props }: SkillGroupIconsProps) => {
  const [technicalStack] = useState<{ image: ReactNode }[]>([
    {
      image: <HTML5Logo />,
    },
    {
      image: <CSS3Logo />,
    },
    {
      image: <JavaScriptLogo />,
    },
    {
      image: <TypeScriptLogo />,
    },
    {
      image: <ReactLogo />,
    },
    {
      image: <PythonLogo />,
    },
    {
      image: <NodeJSLogo />,
    },
    {
      image: <MongoDBLogo />,
    },
    {
      image: <SQLLogo />,
    },
    {
      image: <DockerLogo />,
    },
    {
      image: <FigmaLogo />,
    },
  ]);

  return (
    <>
      <div className="tech-stack-container">
        {technicalStack.map((skill) => (
          <div className="tech-stack" key={Math.random()}>
            {skill.image}
          </div>
        ))}
      </div>
    </>
  );
};

export default SkillGroupIcons;
