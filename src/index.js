import React from 'react';
import ReactDOM from 'react-dom';
import SurveyPdfComponent from './App';
import createServiceWorker from './createServiceWorker';

ReactDOM.render(<SurveyPdfComponent />, document.getElementById('surveyPdfContainer'));
createServiceWorker();




