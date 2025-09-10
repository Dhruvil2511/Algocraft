import React from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

const ShadcnDemo = () => {
  return (
    <div className="max-w-md mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Shadcn/ui Integration</CardTitle>
          <CardDescription>
            This demonstrates the successful integration of Shadcn/ui components with Vite.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="default">Default Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <div className="text-sm text-muted-foreground">
            Tailwind CSS is working with custom Shadcn design tokens.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ShadcnDemo