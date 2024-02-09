import { useMutation } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ADD_USER } from '../../graphql/mutations/user.mutation'
import Button from '../../ui/button/Button'
import ButtonConnection from '../../ui/buttonConnection/ButtonConnection'
import {
  Form,
  FormField,
  FormInput,
  FormLabel,
  FormMessage,
  FormSubmit,
} from '../../ui/input/Input'
import Title from '../../ui/title/Title'

const Register = () => {
  const navigate = useNavigate()
  const [input, setInput] = React.useState({
    email: '',
    username: '',
    password: '',
  })
  const [isEmailValid, setIsEmailValid] = React.useState(false)
  const [error, setError] = React.useState('')
  const [addUserInDb] = useMutation(ADD_USER, {
    onCompleted: (data) => {
      if (data.CreateUser?.message) {
        alert(data.CreateUser?.message)
      } else {
        navigate('/login')
      }
    },
    onError: () => {
      console.log(error)
    },
  })
  const emailValidation = (e: React.FocusEvent<HTMLInputElement>) => {
    const pattern =
      /^[\w-]+(?:\.[\w-]+)*@(?:gmail\.com|hotmail\.com|(?:[\w-]+\.)+[a-zA-Z]{2,4}|[a-zA-Z0-9._%+-]+\.com)$/
    const emailValue = e.target.value
    if (!emailValue.match(pattern)) {
      setError('Please enter a valid email address')
      setIsEmailValid(false) // Adresse e-mail invalide
    } else {
      setError('')
      setIsEmailValid(true) // Adresse e-mail valide
    }
  }

  const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
    if (name === 'email') {
      emailValidation(e)
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addUserInDb({
      variables: {
        userToCreate: {
          email: input.email,
          username: input.username,
          password: input.password,
        },
      },
    })
  }

  return (
    <div>
      <div className="flex items-center justify-center mt-16">
        <Title />
      </div>
      <div className="flex justify-center mt-10">
        <Form onSubmit={handleSubmit} className="w-[314px]">
          <FormField name="email">
            <FormLabel>Email</FormLabel>
            {error && (
              <FormMessage className="text-red-500">{error}</FormMessage>
            )}
            <FormInput
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={handleChange}
              required
            />
            <FormMessage match="valueMissing">Enter an email</FormMessage>
          </FormField>
          <FormField name="username">
            <FormLabel>Username</FormLabel>
            <FormInput
              type="text"
              placeholder="Username"
              name="username"
              value={input.username}
              onChange={handleChange}
            />
            <FormMessage match="valueMissing">Enter a username</FormMessage>
          </FormField>
          <FormField name="password">
            <FormLabel>Password</FormLabel>
            <FormInput
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
            <FormMessage match="valueMissing">Enter a password</FormMessage>
          </FormField>
          <div>
            <a href="/">Forgot password</a>
          </div>
          <div className="my-10">
            <p>
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
          <FormSubmit>
            <Button
              type="submit"
              disabled={!isEmailValid}
              className={
                !isEmailValid ? 'cursor-not-allowed' : 'cursor-pointer'
              }
              size="medium"
            >
              Register
            </Button>
          </FormSubmit>
        </Form>
      </div>
      <div className="flex justify-center items-center flex-col mt-8 gap-6 ">
        <ButtonConnection size="medium" variant="google">
          Continue with Google
        </ButtonConnection>
        <ButtonConnection size="medium" variant="apple">
          Sign in with Apple
        </ButtonConnection>
        <ButtonConnection size="medium" variant="github">
          Sign up with Github
        </ButtonConnection>
      </div>
    </div>
  )
}

export default Register
