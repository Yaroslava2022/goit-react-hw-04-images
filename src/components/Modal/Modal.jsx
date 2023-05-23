import { Component } from 'react';
import css from './Modal.module.css';


export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscapeHandler);
  
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeHandler);
  }
 
  handleBackdrop = e => {
 
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  onEscapeHandler = e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  

  render() {
    return( 
      <div className={css.overlay} onClick={this.handleBackdrop}>
        <div className={css.modal}>
          <img src={this.props.largeImageURL} alt={this.props.tags} />
        </div>
      </div>)
  }
}