import React from 'react';
import Typist from 'react-typist';

class HomePage extends React.Component {
  render() {
    return (
			<div>
				<div className="parallax-container">
					<div id="parallax">
						<Typist className="Typist">
							<h3><p className="ptag"> Create impactful and meaningful documents...</p></h3>
						</Typist>
					</div>
				</div>
				<div className="section white">
					<div className="row container">
						<h2 className="header">Get Started</h2>
						<p className="grey-text text-darken-3 lighten-3">Go Docs brings your documents to life with smart editing and styling tools to help you easily format text and paragraphs. Choose from hundreds of fonts, add links, images, and drawings. All for free.</p>
						<button> Get Started</button>
					</div>
				</div>
			</div>
    );
  }
}

export default HomePage;
