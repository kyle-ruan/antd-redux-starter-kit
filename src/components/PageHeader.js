import React from 'react';

const PageHeader = (props) => {
    return (
        <div className="page-header pageHeader">
            <div className="page-header__col page-header__col--title">
                { props.title}

                { props.children }
            </div>
            <div className="page-header__col page-header__col--breadcrumbs">

            </div>
        </div>
    );
};

export default PageHeader;
