//hot load
if (module.hot) {
  module.hot.accept();
  // window.addEventListener('message', e => {
  //     //  if ('production' !== process.env.NODE_ENV) {
  //     //      //console.clear();
  //     //  }
  //  });
}

//styles
import 'Client/styles/index.less'
//
import React from 'react'
import ReactDom from 'react-dom'

import Root from 'App/containers/Root'

ReactDom.render(<Root />, document.getElementById("root"))
