//Survey Form
import _ from 'lodash';
import React, {Component} from 'react';
import  {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField';
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';

import formFields from './formFields';

class SurveyForm extends Component {
  renderFields(){
    return _.map(formFields, ({label,name}) => {
      return <Field key = {name}
                    component = {SurveyField}
                    type = "text"
                    label = {label}
                    name = {name} />
    })
  }

  render(){
    return (
      <div>
        <form onSubmit = {this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to ="/surveys" className = "red btn-flat left white-text">
            Cancel
            <i className = "material-icons right"> cancel </i>
          </Link>
          <button className = "green btn-flat right white-text" type = "submit">
            Continue
            <i className = "material-icons right"> arrow_forward </i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({name}) => {
    if(!values[name]){
      errors[name] = 'You must provide a ' + name;
    }
  });



  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
