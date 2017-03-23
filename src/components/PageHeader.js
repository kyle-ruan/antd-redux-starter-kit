import React from 'react';
import { NewClientButton } from './Buttons';

class PageHeader extends React.Component {
    render() {
        return (
            <div className="page-header pageHeader">
                <div className="page-header__col page-header__col--title">
                    {this.props.title}
                    <NewClientButton />
                </div>
                <div className="page-header__col page-header__col--breadcrumbs">

                </div>
            </div>
        )
    }
}

export default PageHeader;
