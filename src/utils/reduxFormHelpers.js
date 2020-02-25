import {reduxForm as orgReduxForm} from "redux-form";

export const required = value => (value || typeof value === 'number' ? undefined : 'Required');

// Length
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength15 = maxLength(15);
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength2 = minLength(2);

export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const minValue13 = minValue(13);

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined;

export const genSyncValidateFunc = (vlds)=>{
//  console.log(vlds);
  return (values)=>(

    Object.keys(vlds).map(field => {

      if(Array.isArray(vlds[field]))
        for (const func of vlds[field]){
          const r = func(values[field]);
          if(r)
            return ({[field]:r});
        }

      return {};

    }).reduce((acc,curr)=>Object.assign(curr,acc),{})

  )
};

export const reduxForm = (config)=> (form)=>{
//  console.log(typeof config.validate);
  if(config.validate && typeof config.validate === "object") {
    config.validate = genSyncValidateFunc(config.validate);
  }
  return orgReduxForm(config)(form)
};
