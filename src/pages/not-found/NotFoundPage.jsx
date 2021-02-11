import { Component } from 'react';

import './NotFoundPage.css';

class NotFoundPage extends Component {
    state = {}

    render() {
        return (
            <div className='page-not-found'>
                <div className='page-not-found__error-code'>
                    404
                </div>
                <div className='page-not-found__error-message'>
                    Page not found
                </div>
            </div>
        );
    }
}

export default NotFoundPage;
