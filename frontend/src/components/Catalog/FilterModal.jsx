import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Modal from "react-bootstrap/Modal";

export class FilterModal extends Component {
  constructor(props) {
    super(props);
      this.state = {
        showModal: this.props.showFilters
      }
  }

  hideModal = () => {
    this.setState({showModal: false})
  };

  render() {
    return (
      <Modal show={this.props.showFilters}>
        <div className="filter">
          <div className="filter-modal">
            <ReactMultiSelectCheckboxes options={this.props.options} placeholderButtonLabel={"Hi"}/>
            <button className="btn-bt-primary-inverted" onClick={this.hideModal}> 
            Cancel </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default FilterModal;