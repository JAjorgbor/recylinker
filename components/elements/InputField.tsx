'use client'

import { FC, useState, forwardRef, ReactNode } from 'react'
import { Select, SelectItem, Input, Textarea } from '@nextui-org/react'
import { Eye, EyeOff } from 'react-feather'

interface InputFieldProps {
  label?: string
  type?: string
  placeholder?: string
  isRequired?: boolean
  children?: ReactNode
  endContent?: ReactNode
  options?: { value: string; label: string }[]
  register?: any
  className?: string
  disabled?: boolean
  errorMessage?: string
  minRows?: number
  maxRows?: number
  variant?: 'flat' | 'faded' | 'bordered' | 'underlined'
  props?: any[]
}

const InputField: FC<InputFieldProps> = ({
  label,
  isRequired,
  type = 'text',
  placeholder = '',
  children,
  endContent,
  options = [],
  register,
  className,
  errorMessage,
  variant = 'flat',
  disabled = false,
  maxRows,
  minRows,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <>
      {(() => {
        switch (type) {
          case 'password':
            return (
              <Input
                label={label}
                isRequired={isRequired}
                type={isVisible ? 'text' : 'password'}
                placeholder={placeholder}
                variant={variant}
                disabled={disabled}
                errorMessage={errorMessage}
                className={className}
                endContent={
                  <button
                    className='focus:outline-none'
                    type='button'
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeOff size={18} className='pointer-events-none' />
                    ) : (
                      <Eye size={18} className='pointer-events-none' />
                    )}
                  </button>
                }
                {...props}
              />
            )
          case 'textarea':
            return (
              <Textarea
                label={label}
                minRows={minRows}
                maxRows={maxRows}
                isRequired={isRequired}
                variant={variant}
                disabled={disabled}
                placeholder={placeholder}
                errorMessage={errorMessage}
                className={className}
                endContent={endContent}
                {...register}
                {...props}
              />
            )
          case 'select':
            return (
              <Select
                className={className}
                errorMessage={errorMessage}
                disabled={disabled}
                {...props}
              >
                {options.map((each, index) => (
                  <SelectItem key={each.value} value={each.value} {...register}>
                    {each.label}
                  </SelectItem>
                ))}
              </Select>
            )
          default:
            return (
              <Input
                type={type}
                label={label}
                isRequired={isRequired}
                errorMessage={errorMessage}
                disabled={disabled}
                placeholder={placeholder}
                variant={variant}
                className={className}
                {...register}
                {...props}
              />
            )
        }
      })()}
    </>
  )
}

InputField.displayName = 'InputField'

export default InputField
