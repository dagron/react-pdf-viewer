import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { connect } from '../helpers/connect';
import SideMenu from './side_menu';
import Preview from './preview';
import Card from './doc_card';

import { requestDocs } from '../../actions/docs_actions';


class Demo extends Component {
  constructor() {
    super();
    this.state = {
      showPreview: false,
      renderToSvg: false,
      docLink: 'https://dl.dropboxusercontent.com/u/30395115/In%20The%20Wood%202015.pdf'
    };
  }
  componentWillMount() {
    this.props.requestDocs();
  }
  fetcher = () => {
    console.log('Fetch docs');
    this.props.requestDocs();
  }
  previewHandler = () => {
    this.setState({ showPreview: !this.state.showPreview });
  }
  renderToggleHandler = (e) => {
    const value = e.target;
    console.log(value);
    this.setState({ renderToSvg: !this.state.renderToSvg });
  }
  renderDocs() {
    if (this.props.docs.isFetching) return 'Fetching docs';
    return this.props.docs.docList
      .map(doc => (
        <Card {...doc} onClick={this.setPreviewURI} />
      ));
  }
  setPreviewURI = (docLink) => {
    console.log('setPreviewURI docLink: ', docLink);
    this.setState({ docLink }, this.previewHandler());
  }
  openPreview = (docLink) => {
    console.log('openPreview, docLink: ', docLink);
    docLink && this.setState({ docLink });
    this.setState({ showPreview: true });
  }
  closePreview = () => {
    this.setState({ showPreview: false });
  }
  render() {
    const { showPreview } = this.state;
    const { openPreview, closePreview } = this;
    const { renderToSvg, docLink } = this.state;

    return (
      <div className='df fm m_t-10 m_b-10'>
        <div className={`demo-container fm frn ${showPreview ? 'hide' : ''}`}>
          <div className='files-container raised fm'>
            <div className='files-header'>
              <h3>Documents</h3>
            </div>
            <div>
              <h3>Files</h3>
              <button
                className='button text-button prim-dark m_r-10'
                onClick={() => { openPreview(); }}
              >
                Show Preview
              </button>
              <button
                className='button text-button prim-dark'
                onClick={this.fetcher}
              >
                Fetch docs
              </button>
              <div className='frn'>
                {this.renderDocs()}
              </div>
            </div>
          </div>
          <SideMenu
            renderToggleHandler={this.renderToggleHandler}
            renderToSvg={renderToSvg}
            setPreviewURI={openPreview}
          />
        </div>
        { showPreview ?
          <Preview
            closePreview={closePreview}
            svg={renderToSvg}
            docLink={docLink}
          /> :
          null
        }
      </div>
    );
  }
}

// const mapStateToProps = ({ docs }) => (
//   { docs }
// );
//
// const mapDispatchToProps = dispatch => bindActionCreators({
//   requestDocs
// }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(Demo);
const { docs, otherProp } = {};

export default connect({
  docs,
  otherProp,
  requestDocs
})(Demo);
