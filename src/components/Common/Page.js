import React from 'react';

const Page = (props) => {
  return (
    <section className='page-box'>
      {props.children}
    </section>
  )
}

export default Page;
