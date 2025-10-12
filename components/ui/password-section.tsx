'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Input } from './input'
import { Button } from './button'

interface PasswordSectionProps {
  children?: React.ReactNode
}

export function PasswordSection({ children }: PasswordSectionProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    if (password === 'Chase@4321') {
      setIsAuthenticated(true)
    } else {
      setError('Password is incorrect. Please try again or email ipshita.chatterjee02@gmail.com')
    }
    
    setIsLoading(false)
  }

  // If authenticated, show the protected content without any blur effects
  if (isAuthenticated) {
    return (
      <div className="relative">
        {/* Fading content that becomes clear when authenticated */}
        <div className="relative z-0">
          <div className="text-gray-600 mb-4">
            The solution involved creating a comprehensive design system and implementing modern UX patterns to address these challenges. Our approach focused on user-centered design principles and iterative development to ensure the final product met both user needs and business requirements.
          </div>
          <div className="text-gray-600 mb-4">
            Through extensive user research and stakeholder interviews, we identified key pain points in the existing system and developed targeted solutions to improve the overall experience for correspondents and loan agents.
          </div>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Fading overlay effect - only shown when not authenticated */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none z-10" />
      
      {/* Faded content above password section */}
      <div className="relative z-0 opacity-50">
        <div className="text-gray-600 mb-4">
          The solution involved creating a comprehensive design system and implementing modern UX patterns to address these challenges. Our approach focused on user-centered design principles and iterative development to ensure the final product met both user needs and business requirements.
        </div>
        <div className="text-gray-600 mb-4">
          Through extensive user research and stakeholder interviews, we identified key pain points in the existing system and developed targeted solutions to improve the overall experience for correspondents and loan agents.
        </div>
      </div>
      
      {/* Password protection section */}
      <div className="relative z-20 bg-white pt-8">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <h3 className="text-2xl font-bold">
              🔒 This case study is password protected
            </h3>
            <CardDescription className="text-base">
              Enter a password to view the rest of the case study, or email{' '}
              <a 
                href="mailto:ipshita.chatterjee02@gmail.com" 
                className="underline"
              >
                ipshita.chatterjee02@gmail.com
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                {isLoading ? 'Accessing...' : 'Access'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
