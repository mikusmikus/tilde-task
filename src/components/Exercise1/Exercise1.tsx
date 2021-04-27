import React, { FC, useRef, useState, useEffect } from 'react';
import Button from '../Button/Button';
import './Exercise1.scss';

type Data = {
  id: number;
  content: string;
  extraContent: string;
  showExtraContent: boolean;
};

type Props = {
  data: Data[];
};

const Exercise1: FC<Props> = ({ data }) => {
  const [task1Data, setTask1Data] = useState(data);

  const itemsRef = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, data.length);
  }, [data]);


  // find how extra paragraph height should be and set it to new height.
  const handleToggleParagraph = (i: number) => {
    const item = itemsRef.current[i];

    const aboutHeight = item.clientHeight;
    const aboutScrollHeight = item.scrollHeight;

    const collapsed = !aboutHeight;
    const noHeight = !item.style.height;

    if (collapsed || noHeight) {
      item.style.height = `${aboutScrollHeight}px`;
    } else {
      item.style.height = '0px';
    }
    if (noHeight) handleToggleParagraph(i);
  };

  // toggle showExtraContent property in paragraphs array. change button text 
  const handleExtraParagraph = (index: number) => {
    handleToggleParagraph(index);
    const copyData = [...task1Data];
    copyData[index].showExtraContent = !copyData[index].showExtraContent;
    setTask1Data(copyData);
  };

  return (
    <div className="tilde-container">
      <div className="exercise1">
        {data.map(({ id, content, extraContent, showExtraContent }, i) => {
          return (
            <div className="paragraph-wrapper" key={id}>
              <Button onClick={() => handleExtraParagraph(i)}>
                {showExtraContent ? 'Show extra' : 'Hide extra'}
              </Button>
              <p className="paragraph">{content}</p>
              <div
                className="extra-paragraph"
                ref={(el) => {
                  itemsRef.current[i] = el as HTMLParagraphElement;
                }}
              >
                <p>{extraContent}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Exercise1;
