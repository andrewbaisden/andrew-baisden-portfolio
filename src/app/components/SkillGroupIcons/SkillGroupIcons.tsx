import { type ReactNode, useState } from 'react';
import './SkillGroupIcons.css';
import CSS3Logo from '../CSS3Logo/CSS3Logo';
import DockerLogo from '../DockerLogo/DockerLogo';
import FigmaLogo from '../FigmaLogo/FigmaLogo';
import HTML5Logo from '../HTML5Logo/HTML5Logo';
import JavaScriptLogo from '../JavaScriptLogo/JavaScriptLogo';
import MongoDBLogo from '../MongoDBLogo/MongoDBLogo';
import NodeJSLogo from '../NodeJSLogo/NodeJSLogo';
import PythonLogo from '../PythonLogo/PythonLogo';
import ReactLogo from '../ReactLogo/ReactLogo';
import SQLLogo from '../SQLLogo/SQLLogo';
import TypeScriptLogo from '../TypeScriptLogo/TypeScriptLogo';

type SkillGroupIconsProps = {};

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
