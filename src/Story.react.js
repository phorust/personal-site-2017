import React from 'react';
import Stories from './Stories';
import {Gallery} from './Photos.react';
import SinglePhotoGallery from './SinglePhotoGallery.react';

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
  ),
};

const Story = props => {
  const {match} = props;
  const photoElems = stories[match.params.set];
  const gallery =
    match.params.set === 'milkfat' ? (
      <SinglePhotoGallery
        photoElems={[
          <React.Fragment>
            <div className="preamble">
              milkfat<br />
              zine<br />
              <br />
              milkfat is a celebration of dairy and dairy-related packaging,
              <br />
              and an excuse to compile fresh photos.
              <br />07.28.18
            </div>
            {photoElems[0]}
          </React.Fragment>,
          ...photoElems.slice(1),
        ]}
      />
    ) : (
      <Gallery>{Stories[match.params.set](photoElems)}</Gallery>
    );
  return <div className="story">{gallery}</div>;
};

export default Story;
