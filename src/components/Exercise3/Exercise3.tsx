import React, { useEffect, useRef, useState } from 'react';
import './Exercise3.scss';

import Card from './Card/Card';
import Button from '../Button/Button';

type Coordinates = {
  x: number;
  y: number;
};

type Props = {
  data: Coordinates[][];
};

const Exercise3 = ({ data }: Props) => {
  const [customData, setCustomData] = useState<Coordinates[]>([
    { x: 5, y: 10 },
    { x: 15, y: 20 },
    { x: 20, y: 7 },
  ]);
  const [solution, setSolution] = useState('');
  const [polygonPoints, setPolygonPoints] = useState('');

  const svgSize = useRef(200);

  const calculateArea = (poly: Coordinates[]) => {
    const polyLength = poly.length;
    let polyArea = 0;
    let a = 0;
    let b = 0;

    for (let i = 0; i < polyLength; i++) {
      if (i === polyLength - 1) {
        a = poly[i].x * poly[0].y;
        b = poly[0].x * poly[i].y;
        polyArea += a - b;
      } else {
        a = poly[i].x * poly[i + 1].y;
        b = poly[i + 1].x * poly[i].y;
        polyArea += a - b;
      }
    }
    return polyArea;
  };

  const isClockwise = (poly: Coordinates[]) => {
    const polyArea = calculateArea(poly);
    if (polyArea < 0) {
      setSolution('yes');
    } else {
      setSolution('no');
    }
  };

  const handleCustomPoints = () => {
    const maxX = Math.max(
      ...customData.map((e) => {
        return e.x;
      })
    );
    const maxY = Math.max(
      ...customData.map((e) => {
        return e.y;
      })
    );
    const polygoneSizeMultiplier = Math.floor(svgSize.current / Math.max(maxX, maxY));

    let output = '';
    customData.forEach((item, i) => {
      output += ` ${item.x * polygoneSizeMultiplier}, `;
      output += `${item.y * polygoneSizeMultiplier}`;
    });
    setPolygonPoints(output);
  };

  useEffect(() => {
    handleCustomPoints();
  }, [customData]);

  const addNextPoint = () => {
    const newPoint = { x: 0, y: 0 };
    setCustomData([...customData, newPoint]);
  };



  const handleInputCoordinates = (value: string, index: number, axis: 'x' | 'y') => {
    const copyData = [...customData];
    if (!value || value === 'NaN') {
      copyData[index][axis] = 0;
      setCustomData(copyData);
    }
    if (parseInt(value, 10) < 0 || parseInt(value, 10) > 50) {
      return;
    }
    copyData[index][axis] = parseInt(value, 10);
    setCustomData(copyData);
  };

  const deleteCoordinates = (i: number) => {
    const copyData = [...customData];
    copyData.splice(i, 1);
    setCustomData(copyData);
  };

  return (
    <div className="tilde-container">
      <div className="exercise3">
        <div className="cards-wrapper">
          {data.map((coordinatesArr, i) => {
            return (
              <Card
                key={`${Date() + i}`}
                data={coordinatesArr}
                dataIndex={i}
                onClick={() => isClockwise(data[i])}
              />
            );
          })}
        </div>
        {solution && (
          <div className="result">
            {solution === 'yes' ? (
              <h1>Yes, list of points is clockwise</h1>
            ) : (
              <h1>No, list of points is counterclockwise </h1>
            )}
          </div>
        )}
        <div className="custom-coordinates">
          <h3>Custom coordinates (only positive numbers, max 50)</h3>
          <div className="content">
            <div className="coordinates-cards-wrapper">
              {customData.map((item, i) => {
                return (
                  <div className="coordinates" key={`${i + i}`}>
                    <Button onClick={() => deleteCoordinates(i)} disabled={customData.length <= 3}>
                      delete
                    </Button>
                    <label>
                      x:{' '}
                      <input
                        type="text"
                        value={item.x || 0}
                        placeholder="x"
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          handleInputCoordinates(e.target.value, i, 'x');
                        }}
                      />
                    </label>
                    <label>
                      y:{' '}
                      <input
                        type="text"
                        value={item.y || 0}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          handleInputCoordinates(e.target.value, i, 'y');
                        }}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
            <svg
              height={svgSize.current}
              width={svgSize.current}
            >
              <polygon points={polygonPoints} fill="none" />
            </svg>
          </div>
          <div className="add-next">
            <Button onClick={addNextPoint}>add next point</Button>
          </div>
          <div className="solution">
            <Button onClick={() => isClockwise(customData)}>IS IT CLOCKWISE?</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise3;
