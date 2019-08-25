import React from 'react';
import { Link } from '@reach/router'

import LoadingIndicator from '../components/LoadingIndicator';
import checkImageLoaded from '../helpers/checkImageLoaded';

export default class LandingPageView extends React.Component {
	componentDidMount() {
		var image = document.createElement('img');
		image.src = checkImageLoaded(document.getElementsByClassName('landing-background-image')[0]);
		image.onload = () => {
		    document.getElementsByClassName('landing-background-image')[0].style.opacity = '1';
		};
	}

	render() {
		return (
			<div className="landing-background-image">
				<div className="landing-text has-text-grey-darker">
					<span className="is-size-1 is-header has-text-weight-bold">Once Upon a Book</span>
					<span className="is-size-4">Turn the page on a whole new reading experience.</span>
					<Link to="/table">
						<a class="button is-large is-rounded is-dark is-outlined">
						    <span class="icon">
						      <i class="fas fa-book-open"></i>
						    </span>
						    <span>Enter</span>
						</a>
					</Link>
				</div>
			</div>
		);
	}
}