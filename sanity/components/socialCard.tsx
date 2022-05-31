import React from 'react'
import { Button as GenerateButton, Inline } from '@sanity/ui'
import { FaCheckCircle } from 'react-icons/fa'

export const Button = () => {
  return (
  <Inline space={[3, 3, 4]}>
    <GenerateButton
      fontSize={[2, 2, 3]}
      icon={FaCheckCircle}
      mode="ghost"
      padding={[3, 3, 4]}
      text="Generate Social Card"
    />
    </Inline>
  )
}
