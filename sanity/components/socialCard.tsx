import React, { useState } from 'react'
import { Badge, Box, Button as GenerateButton, Inline, Popover, Text, Tooltip } from '@sanity/ui'
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'

export const Button = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<any>(null)

  const handleClick = async () => {
    setIsLoading(true)
    
    try {
      const result = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: "Sanity",
          estimatedReadingTime: "11",
          publishedAt: "Oct 22, 2044",
          coverImage: {
            url: `http://localhost:3001/_next/image?url=${encodeURIComponent("https://cdn.sanity.io/images/n3o7a5dl/prod/1f0d9bb5405b2b05b59900dc15cbdcda75d7f2cc-3024x4032.jpg&w=3840&q=75")}`
          }
      }),
      })
      if (result.ok) {
        setIsSuccess(true)
      } else {
        setErrorMessage(await result.json())
        throw new Error('Something went wrong')
      }
    } catch (err) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }


  return (
  <Inline space={[3, 3, 4]}>
      <GenerateButton
      disabled={isLoading || isError || isSuccess}
      fontSize={[2, 2, 3]}
      icon={!isError ? FaCheckCircle : FaExclamationTriangle}
      mode="ghost"
      padding={[3, 3, 4]}
      onClick={handleClick}
        text={isError ? "Error" : isLoading ? 'Generating...' : isSuccess ? "Done!" : "Generate Social Card"}
      />
      {isError ? <Tooltip
      content={
        <Box padding={2}>
          <Text size={2}><pre>{errorMessage?.message ? errorMessage.message : errorMessage}</pre></Text>
        </Box>
      }
      fallbackPlacements={['right', 'left']}
      placement="top"
      portal
    ><Badge tone="critical">Error</Badge></Tooltip> : isSuccess ? <Badge tone="positive">Smashing success!</Badge> : null}
    </Inline>
  )
}
