'use client'

import React from 'react'

import useAuth from '../../hooks/useAuth'
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

const Login = () => {
  const [input, setInput] = React.useState({
    email: '',
    password: '',
  })
  const [error, setError] = React.useState('')
  const { signIn } = useAuth()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    signIn(input)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'email') {
      if (!value.includes('@')) {
        setError('Please enter a valid email address')
      } else {
        setError('')
      }
    } else {
      if (value.length < 6) {
        setError('Password must be at least 6 characters')
      } else {
        setError('')
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-center mt-20">
        <Title />
      </div>
      <div className="flex justify-center mt-10">
        <Form className="w-[314px]" onSubmit={handleSubmit}>
          <FormField name="email">
            <FormLabel>Email</FormLabel>
            {error && <FormMessage>{error}</FormMessage>}
            <FormInput
              type="email"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormMessage match="valueMissing">Invalid email</FormMessage>
          </FormField>
          <FormField name="password">
            <FormLabel>Password</FormLabel>
            <FormInput
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormMessage match="valueMissing">Invalid password</FormMessage>
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
            <Button type="submit" size="medium">
              Sign in
            </Button>
          </FormSubmit>
        </Form>
      </div>
      <div className="flex justify-center items-center flex-col mt-20 gap-6 ">
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
    </>
  )
}

export default Login
