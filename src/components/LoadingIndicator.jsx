import React from 'react';
import { ReactComponent as LoaderSVG } from '../assets/images/loading-indicator.svg';

export default function LoadingIndicator(props) {
  return (
    <div className='loading-indicator'>
      <LoaderSVG />
    </div>
  );
}
