'use client'

import { FC, useState, forwardRef, ReactNode } from 'react'
import { Select, SelectItem, Input, Textarea } from '@nextui-org/react'
import { Eye, EyeOff } from 'react-feather'

interface InputFieldProps {
  label?: string
  type?: string
  value?: string | number
  placeholder?: string
  isRequired?: boolean
  isInvalid?: boolean
  children?: ReactNode
  endContent?: ReactNode
  startContent?: ReactNode
  onChange?: any
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
  isInvalid,
  onChange,
  type = 'text',
  placeholder = '',
  children,
  endContent,
  startContent,
  options = [],
  register,
  className,
  value,
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
                startContent={startContent}
                isInvalid={isInvalid}
                value={value ?? register?.value}
                {...register}
                onValueChange={onChange}
                {...props}
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
                startContent={startContent}
                isInvalid={isInvalid}
                value={value ?? register?.value}
                onValueChange={onChange}
                {...register}
                {...props}
              />
            )
          case 'select':
            return (
              <Select
                label={label}
                isRequired={isRequired}
                variant={variant}
                className={className}
                errorMessage={errorMessage}
                disabled={disabled}
                isInvalid={isInvalid}
                value={value ?? register?.value}
                onSelectionChange={onChange}
                {...props}
              >
                {options.map((each, index) => (
                  <SelectItem
                    key={each.value}
                    value={each.value}
                    endContent={endContent}
                    startContent={startContent}
                    {...register}
                  >
                    {each.label}
                  </SelectItem>
                ))}
              </Select>
            )
          case 'multi-select':
            return (
              <Select
                label={label}
                isRequired={isRequired}
                variant={variant}
                className={className}
                errorMessage={errorMessage}
                disabled={disabled}
                isInvalid={isInvalid}
                selectedKeys={value ?? register?.value}
                onSelectionChange={onChange}
                selectionMode='multiple'
                {...props}
              >
                {options.map((each, index) => (
                  <SelectItem
                    key={each.value}
                    value={each.value}
                    endContent={endContent}
                    startContent={startContent}
                    {...register}
                    onSelectionChange={register.onChange ?? onChange}
                  >
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
                endContent={endContent}
                startContent={startContent}
                isInvalid={isInvalid}
                value={value ?? register?.value}
                onValueChange={onChange}
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
