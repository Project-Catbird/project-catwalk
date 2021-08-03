/* eslint-disable indent */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import actions from '../../state/actions/index.js';
import axios from 'axios';
import AtelierAPI from '../../lib/atelierAPI.js';

const ReviewComponent = (props) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => {
    return {
      reviews: state.reviews.reviewInfo,
      metadata: state.reviews.metadataInfo
    };
  });

  const [noClickCount, incrementCount] = useState(0);

  const renderShowMoreButton = (body, index) => {
    if (body.length > 250) {
      return (<div id={`show-more-${index}`} onClick={() => {
        document.getElementById(`review-body-${index}`).hidden = true;
        document.getElementById(`show-more-${index}`).hidden = true;
        document.getElementById(`review-fullbody-${index}`).hidden = false;
      }}>Show More</div>);
    }
  };

  const isRecommended = (boolean) => {
    if (boolean) {
      return (
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
         </svg>
         <span>  I recommend this product</span>
        </div>
      );
    }
  };

  const isVerifiedUser = () => {
    var randomBoolean = [true, false];
    var index = Math.floor(Math.random() * 2);
    if (randomBoolean[index]) {
      return (
        <div className="review-verified">Verified User</div>
      );
    }
  };

  const getWidth = (ratingsData) => {
    let ratings = 0;
    let count = 0;
    for (var key in ratingsData) {
      count += Number(ratingsData[key]);
      ratings += (Number(key) * Number(ratingsData[key]));
    }
    let starPercentage = (ratings / count) / 5 * 100;
    if ((starPercentage % 5) < 2.5) {
      starPercentage -= (starPercentage % 5);
    } else {
      starPercentage += (5 - (starPercentage % 5));
    }
    return starPercentage;
  };

  return (
    <div className="review-component">
      {reviews.reviews.results.map((review, index) => {
        return (
          <div key={index}>
            <div className="review-tile-top">

              <span id="review-tile-star">
                <span className="review-tile-star-outer">
                  <span className="review-tile-star-inner" style={{ width: `${getWidth(reviews.metadata.ratings)}%`}}></span>
                </span>
              </span>

              <span className="review-user-info">
                <span className="reviewer-name">{review.reviewer_name}</span>
                {isVerifiedUser()}
                <span className="review-date">{moment(review.date).format('MMMM DD, YYYY')}</span>
              </span>
            </div>

            <div className="review-component-body">
            <div className="review-summary">{review.summary}</div>
            <div id={`review-body-${index}`}>{review.body.slice(0, 251)}</div>
            {renderShowMoreButton(review.body, index)}
            <div id={`review-fullbody-${index}`} hidden>{review.body}</div>

              <div className="review-recommend">{isRecommended(review.recommend)}</div>

              <div className="review-component-helpful">
                <span className="helpful-col-1">Was this review helpful?</span>
                <span id="helpful-yes" onClick={() => {
                  axios(`${AtelierAPI.url}/reviews/${review.review_id}/helpful`, {
                    method: 'put',
                    headers: AtelierAPI.headers,
                    data: {
                      helpfulness: review.helpfulness + 1
                    }
                    })
                    .then(() => {
                      actions.setReviews(dispatch, props.productId, 1, reviews.reviews.results.length, 'relevant');
                      document.getElementById('helpful-yes').hidden = true;
                      document.getElementById('helpful-yes-count').hidden = false;
                      document.getElementById('helpful-no').hidden = true;
                      document.getElementById('helpful-no-count').hidden = false;
                    })
                    .catch(err=> console.log(err));
                  }}
                >{`    Yes (${review.helpfulness})`}</span>
                <span id='helpful-yes-count' hidden>{`    Yes (${review.helpfulness})`}</span>

                <span id="helpful-no" onClick={() => {
                  incrementCount(noClickCount + 1);
                  document.getElementById('helpful-yes').hidden = true;
                  document.getElementById('helpful-yes-count').hidden = false;
                  document.getElementById('helpful-no').hidden = true;
                  document.getElementById('helpful-no-count').hidden = false;
                }}>{`   No (${noClickCount})`}</span>

                <span id='helpful-no-count' hidden>{`    No (${noClickCount})`}</span>

              </div>

            </div>
          </div>
        );
      })}
      </div>
  );
};

export default ReviewComponent;