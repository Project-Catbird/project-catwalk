import React from 'react';
import '../../../../dist/styles/relatedItems/ProductImage.css';
import CompareAction from '../Compare/CompareAction.jsx';
import OutfitAction from '../Outfit/OutfitAction.jsx';

export default ({ product, isModal }) => {
  if (isModal) {
    var actionElement = <CompareAction product={product}/>;
  } else {
    var actionElement = <OutfitAction product={product}/>;
  }

  return (
    <div
      className="related-products-image-thumbnail"
      style={{
        backgroundImage: `url(${product.styleInfo.results[0].photos[0].thumbnail_url})`,
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}>
      {actionElement}
    </div>
  );
};