import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputFeild from "./form/TextInputFeild";
import styleUtils from "../styles/utils.module.css"

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void
}

export const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  
  const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<SignUpCredentials>();
  
  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await UsersApi.SignUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputFeild 
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{required: "Required"}}
            error={errors.username}
          />
          <TextInputFeild 
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{required: "Required"}}
            error={errors.email}
          />
          <TextInputFeild 
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{required: "Required"}}
            error={errors.password}
          />
          <Button type="submit" disabled={isSubmitting} className={styleUtils.width100}>
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SignUpModal