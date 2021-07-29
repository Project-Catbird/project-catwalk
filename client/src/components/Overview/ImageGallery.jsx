import React from 'react';
import { useSelector } from 'react-redux';

import DefaultView from './ImageGallery-Default.jsx';
import ExpandedView from './ImageGallery-Expanded.jsx';

export default () => {
  const state = useSelector(state => {
    return {
      style: state.product.styleInfo.results[state.style],
      thumbnail: state.thumbnail,
      defaultView: state.defaultView,
    };
  });

  if (state.defaultView) {
    return <DefaultView state={state}/>;
  }
  return <ExpandedView state={state}/>;
};