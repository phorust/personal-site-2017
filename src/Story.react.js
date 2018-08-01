import React from 'react';
import Stories from './Stories';
import {Gallery} from './Photos.react';

// const importAllAsDict = r =>
// r
// .keys()
// .reduce(
// (agg, cur) => ({...agg, [cur]: <img key={cur} src={r(cur)} />}),
// {},
// );
const importAllAsArray = r =>
  r.keys().reduce((agg, cur) => [...agg, <img key={cur} src={r(cur)} />], []);
const stories = {
  'oakland just yesterday': importAllAsArray(
    require.context(
      './stories/oakland just yesterday',
      false,
      /\.(png|jpe?g|svg)$/,
    ),
  ),
  ghosts: importAllAsArray(
    require.context('./stories/ghosts', false, /\.(png|jpe?g|svg)$/),
  ),
  milkfat: importAllAsArray(
    require.context('./stories/milkfat', false, /\.(png|jpe?g|svg)$/),
  ).map((photoElem, i) => <div key={i}>{photoElem}</div>),
};

const Story = props => {
  const {match} = props;
  const photoElems = stories[match.params.set];
  return (
    <div className="story">
      <Gallery vertical={match.params.set === 'milkfat' ? true : null}>
        {Stories[match.params.set](photoElems)}
      </Gallery>
    </div>
  );
};

export default Story;
