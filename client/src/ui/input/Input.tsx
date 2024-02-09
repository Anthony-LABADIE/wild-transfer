import * as FormPrimitive from '@radix-ui/react-form'
import cn from 'classnames'
import React from 'react'

/**
 * A form primitive that provides the foundation for form components.
 * @see Docs https://radix-ui.com/primitives/docs/primitives/components/form
 * @see Source
 * 
 * For example :
 * 
"use client";
import React from 'react';
import { Form, FormField, FormLabel, FormMessage, FormInput, FormSubmit } from '../ui/input';
import Button from '@/ui/button';

export default function Home() {
    return <div > 
        <Form className='w-[314px]'>
            <FormField name='email'>
                <FormLabel>Email</FormLabel>
                <FormInput type="email" placeholder="Email" />
                <FormMessage match="valueMissing" >Invalid email</FormMessage>
            </FormField>
            <FormField name='password'>
                <FormLabel>Password</FormLabel>
                <FormInput type="password" placeholder="Password" />
                <FormMessage match="valueMissing">Invalid password</FormMessage>
            </FormField>
            <FormSubmit>
                <Button type="submit" size="medium">
                    Sign in
                </Button>
            </FormSubmit>
        </Form>
    </div>;
}

 */

const Form = FormPrimitive.Root

const FormField = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Field>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Field>
>(({ name, className, ...props }, ref) => {
  return (
    <FormPrimitive.Field
      className={cn('grid mb-[10px]', className)}
      {...props}
      ref={ref}
      name={name}
    ></FormPrimitive.Field>
  )
})
FormField.displayName = FormPrimitive.Field.displayName

const FormLabel = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Label>
>(({ children, className, ...props }, ref) => {
  return (
    <div className="flex items-baseline justify-between">
      <FormPrimitive.Label
        className={cn(
          'text-[15px] font-medium leading-[35px] text-[#2f3030]',
          className,
        )}
        {...props}
        ref={ref}
      >
        {children}
      </FormPrimitive.Label>
    </div>
  )
})
FormLabel.displayName = FormPrimitive.Label.displayName

const FormMessage = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Message>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Message>
>(({ match, children, className, ...props }, ref) => {
  return (
    <FormPrimitive.Message
      className={cn('text-[13px] text-[#2f3030] opacity-[0.8]', className)}
      {...props}
      ref={ref}
      match={match}
    >
      {children}
    </FormPrimitive.Message>
  )
})
FormMessage.displayName = FormPrimitive.Message.displayName

const FormInput = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Control>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Control>
>(({ type, className, ...props }, ref) => {
  return (
    <FormPrimitive.Control
      className={cn(
        'box-border w-full  inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-[#2f3030] shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white',
        className,
      )}
      {...props}
      ref={ref}
      type={type}
      required
    ></FormPrimitive.Control>
  )
})
FormInput.displayName = FormPrimitive.Control.displayName

const FormSubmit = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Submit>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Submit>
>(({ ...props }, ref) => {
  return (
    <FormPrimitive.Submit asChild {...props} ref={ref}></FormPrimitive.Submit>
  )
})
FormSubmit.displayName = FormPrimitive.Submit.displayName

export { Form, FormField, FormLabel, FormMessage, FormInput, FormSubmit }
