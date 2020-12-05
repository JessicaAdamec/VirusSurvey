import React from 'react';
import ReactDOM from 'react-dom';
import SurveyPdfComponent from './SurveyPdfComponent';
import createServiceWorker from './createServiceWorker';

ReactDOM.render(<SurveyPdfComponent />, document.getElementById('surveyPdfContainer'));
createServiceWorker();




// import React from 'react';
// import ReactDOM from 'react-dom';
// import SurveyComponent from './SurveyComponent';

// ReactDOM.render(<SurveyComponent />, document.getElementById('surveyElement'));

