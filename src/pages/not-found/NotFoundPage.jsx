import { Component } from 'react';

import './NotFoundPage.css';

class NotFoundPage extends Component {
    state = {}

    render() {
        return (
            <div className='page-not-found'>
                <h1 className='page-not-found__error-code'>
                    404
                </h1>
                <h2 className='page-not-found__error-message'>
                    Page not found
                </h2>
            </div>
        );
    }
}

export default NotFoundPage;
