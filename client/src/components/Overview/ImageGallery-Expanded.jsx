import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import '../../../dist/styles/overview/ImageGallery-Expanded.css';
import actions from '../../state/actions/index.js';
import _ from 'lodash';

const ARROW_LEFT = '<';
const ARROW_RIGHT = '>';

const zoomPan = e => {
  const el = document.getElementById('imagegallery-expanded-main-in');
  var box = e.target.getBoundingClientRect();

  var mouseX = e.clientX - box.left;
  var mouseY = e.clientY - box.top;
  var xPercent = (mouseX / box.width) * 100;
  var yPercent = (mouseY / box.height) * 100;

  el.style.backgroundPositionX = xPercent + '%';
  el.style.backgroundPositionY = yPercent + '%';
};

const dispatchThumbnail = (dispatch, direction, state) => {
  dispatch(
    actions.selectThumbnail.expandedView(
      state.thumbnail.index + direction,
      state.style.photos.length - 1,
      0
    ));
};

export default ({ state }) => {

  const dispatch = useDispatch();

  var backgroundImage = state.style.photos[state.thumbnail.index].url;

  let styleObj = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'relative',
    backgroundPosition: '50% 50%',
  };

  let mouseFunction = () => {};
  let divId = 'out';
  if (state.view.zoomed) {
    styleObj.backgroundSize = '';
    mouseFunction = zoomPan;
    divId = 'in';
  }

  return (
    <div id="imagegallery-expanded-main">
      <button
        disabled={divId === 'in'}
        className={'imagegallery-expanded-main-button' + (divId === 'in' ? '-disabled' : '')}
        onClick={() => dispatchThumbnail(dispatch, -1, state)}>
        {ARROW_LEFT}
      </button>
      <div
        id={`imagegallery-expanded-main-${divId}`}
        style={styleObj}
        onMouseMove={e => mouseFunction(e) }
        onClick={() => {
          if (!state.view.default) {
            const el = document.getElementById(`imagegallery-expanded-main-${divId}`);
            el.style.backgroundPosition = '50% 50%';
            dispatch(actions.setViews.zoomView());
          }
        }}>
        <div
          id='imagegallery-expanded-close'
          onClick={() => dispatch(actions.setViews.defaultView())}>
          <span
            id='image-gallery-expanded-close-x'
            onMouseMove={e => e.stopPropagation()}>
            {'X'}
          </span>
        </div>
        <div id='imagegallery-expanded-thumbnail'>
          {_.map(state.style.photos, (photo, i) => {
            return (
              <div
                hidden={divId === 'in'}
                key={i}
                className={'image-gallery-expanded-thumbnail-indicator' + (state.thumbnail.index === i ? '-selected' : '')}
                onMouseMove={e => e.stopPropagation()}
                onClick={e => {
                  e.stopPropagation();
                  dispatch(
                    actions.selectThumbnail.defaultView(
                      i,
                      state.style.photos.length - 1,
                      0));
                }}>
              </div>
            );
          })}
        </div>
      </div>
      <button
        disabled={divId === 'in'}
        className={'imagegallery-expanded-main-button' + (divId === 'in' ? '-disabled' : '')}
        onClick={() => dispatchThumbnail(dispatch, 1, state)}>
        {ARROW_RIGHT}
      </button>
    </div>

  );
};



