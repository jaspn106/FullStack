import { FormGroup } from "react-bootstrap"
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form"
import { Form } from "react-bootstrap"

interface TextInputFeildProps {
  name: string,
  label: string,
  register: UseFormRegister<any>,
  registerOptions?: RegisterOptions,
  error?: FieldError,
  [x: string]: any,
}

const TextInputFeild = ({name, label, register, registerOptions, error, ...props} :TextInputFeildProps ) => {
  
  
  return (
    <FormGroup className="mb-3" controlId={name+"-input"}>
      <Form.Label>{label}</Form.Label>
      <Form.Control 
        {...props}
        {...register(name, registerOptions)}
        isInvalid={!!error}
      />
      <Form.Control.Feedback type="invalid">
        {error?.message}
      </Form.Control.Feedback>
    </FormGroup>
  )
}

export default TextInputFeild