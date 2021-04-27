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

  // polygons points for svg polygon
  const [polygonPoints, setPolygonPoints] = useState('');

  // store svg width/height size
  const svgSize = useRef(200);

  // store max value of coordinates from custom data object
  const maxCoordinates = useRef(0);

  // on component did mount and customData object, calls handleCustomPoints function
  useEffect(() => {
    handleCustomPoints();
  }, [customData]);

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

  // check if polygone is clockwise or not
  const isClockwise = (poly: Coordinates[]) => {
    const polyArea = calculateArea(poly);
    if (polyArea < 0) {
      setSolution('yes');
    } else {
      setSolution('no');
    }
  };

  // make polygone points from custom data coordinates
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
    maxCoordinates.current = Math.max(maxX, maxY);
    const polygoneSizeMultiplier = Math.floor(svgSize.current / maxCoordinates.current);

    let output = '';
    customData.forEach((item, i) => {
      output += ` ${item.x * polygoneSizeMultiplier}, `;
      output += `${item.y * polygoneSizeMultiplier}`;
    });
    setPolygonPoints(output);
  };

  // add new coordinates objext to custom data array
  const addNextPoint = () => {
    const newPoint = { x: 0, y: 0 };
    setCustomData([...customData, newPoint]);
  };

  // handle custom coordinates inputs. allowed only positive number <100
  const handleInputCoordinates = (value: string, index: number, axis: 'x' | 'y') => {
    const copyData = [...customData];
    if (!value || value === 'NaN') {
      copyData[index][axis] = 0;
      setCustomData(copyData);
    }
    if (parseInt(value, 10) < 0 || parseInt(value, 10) > 100) {
      return;
    }
    copyData[index][axis] = parseInt(value, 10);
    setCustomData(copyData);
  };

  // delete coordinates object from custom coordinates array
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
          <h3>Custom coordinates (only positive numbers, max 100)</h3>
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
            <div className="svg-wrapper">
              <span className="max-x">{maxCoordinates.current}</span>
              <span className="max-y">{maxCoordinates.current}</span>
              <svg height={svgSize.current} width={svgSize.current}>
                <polygon points={polygonPoints} fill="none" />
              </svg>
            </div>
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
