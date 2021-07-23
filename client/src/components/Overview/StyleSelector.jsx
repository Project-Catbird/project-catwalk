import React from 'react';
import axios from 'axios';

import StylesList from './StylesList.jsx'
import atelierAPI from '../../lib/atelierAPI.js'
import '../../../dist/styles/overview/StyleSelector.css'

class StyleSelector extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      product: []
    }

    this.handleSelected = this.handleSelected.bind(this);
  }

  componentDidMount() {
    axios.get(`${atelierAPI.url}/products/16060/styles`, {
      headers: atelierAPI.headers
    })
      .then(styles => {
        // let thumbnails = res.data.results.map(style => {
        //   return style.photos;
        // });
        // thumbnails = [].concat(...thumbnails);

        let selected;
        styles.data.results.forEach(style => {
          if (style['default?'] === true) {
            selected = style.name;
          }
        })

        this.setState({
          product: styles.data.results,
          selected
          // thumbnails
        })
      })
      .catch(err => console.error(err));
  }

  handleSelected(e) {
    e.preventDefault;
    console.log(e.target);
    this.setState({
      selected: e.target.name
    });
  }

  render() {
    return (
      <div id="body-overview-styleselector">
        <div className="selection-title">{this.state.selected}</div>
        <div className="style-thumbnails">
          {/* <button className="btn-more-styles">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"/>
            </svg>
          </button> */}
          {this.state.product.map(style => {
            return <StylesList
              key={style.style_id}
              style={style}
              selected={this.state.selected}
              handleSelected={this.handleSelected}/>
          })}
          {/* <button className="btn-more-styles">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-compact-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>
            </svg>
          </button> */}
        </div>
    </div>
    )
  }
}

export default StyleSelector;