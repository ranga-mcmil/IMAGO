"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

// Type for notification preferences
interface NotificationPreferences {
  emailNotifications: {
    orderUpdates: boolean
    newProducts: boolean
    inventoryAlerts: boolean
    securityAlerts: boolean
    promotionalEmails: boolean
  }
}

export function ProfileNotificationsForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)

  // Email notification settings
  const [emailNotifications, setEmailNotifications] = useState({
    orderUpdates: true,
    newProducts: false,
    inventoryAlerts: true,
    securityAlerts: true,
    promotionalEmails: false,
  })

  // Load notification preferences on component mount
  useEffect(() => {
    const loadNotificationPreferences = () => {
      try {
        if (typeof window !== 'undefined') {
          const savedPreferences = localStorage.getItem('notificationPreferences')
          
          if (savedPreferences) {
            const preferences: NotificationPreferences = JSON.parse(savedPreferences)
            setEmailNotifications(preferences.emailNotifications)
          }
        }
      } catch (error) {
        console.error('Error loading notification preferences:', error)
        toast({
          title: "Error loading preferences",
          description: "Using default notification settings",
          variant: "destructive",
          duration: 3000,
        })
      } finally {
        setIsPageLoading(false)
      }
    }

    loadNotificationPreferences()
  }, [toast])

  // Save preferences to localStorage
  const savePreferences = async () => {
    try {
      const preferences: NotificationPreferences = {
        emailNotifications,
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('notificationPreferences', JSON.stringify(preferences))
      }
      
      return true
    } catch (error) {
      console.error('Error saving preferences:', error)
      return false
    }
  }

  // Handle email notification toggle
  const handleEmailToggle = (key: keyof typeof emailNotifications) => {
    setEmailNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await savePreferences()
      
      if (success) {
        toast({
          title: "Notification preferences updated",
          description: "Your notification preferences have been saved successfully.",
          duration: 3000,
        })
      } else {
        throw new Error("Failed to save preferences")
      }
    } catch (error) {
      toast({
        title: "Error updating preferences",
        description: "Failed to update notification preferences. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state
  if (isPageLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b">
          <div className="space-y-0.5">
            <Label className="text-base">Order Updates</Label>
            <p className="text-sm text-muted-foreground">Receive emails about your order status and delivery updates</p>
          </div>
          <Switch
            checked={emailNotifications.orderUpdates}
            onCheckedChange={() => handleEmailToggle("orderUpdates")}
          />
        </div>

        <div className="flex items-center justify-between py-2 border-b">
          <div className="space-y-0.5">
            <Label className="text-base">New Products</Label>
            <p className="text-sm text-muted-foreground">Get notified when new products are added to the platform</p>
          </div>
          <Switch
            checked={emailNotifications.newProducts}
            onCheckedChange={() => handleEmailToggle("newProducts")}
          />
        </div>

        <div className="flex items-center justify-between py-2 border-b">
          <div className="space-y-0.5">
            <Label className="text-base">Inventory Alerts</Label>
            <p className="text-sm text-muted-foreground">Receive alerts about low stock and inventory changes</p>
          </div>
          <Switch
            checked={emailNotifications.inventoryAlerts}
            onCheckedChange={() => handleEmailToggle("inventoryAlerts")}
          />
        </div>

        <div className="flex items-center justify-between py-2 border-b">
          <div className="space-y-0.5">
            <Label className="text-base">Security Alerts</Label>
            <p className="text-sm text-muted-foreground">Get notified about important security events and login attempts</p>
          </div>
          <Switch
            checked={emailNotifications.securityAlerts}
            onCheckedChange={() => handleEmailToggle("securityAlerts")}
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <Label className="text-base">Promotional Emails</Label>
            <p className="text-sm text-muted-foreground">Receive promotional offers, discounts, and special deals</p>
          </div>
          <Switch
            checked={emailNotifications.promotionalEmails}
            onCheckedChange={() => handleEmailToggle("promotionalEmails")}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-maroon hover:bg-maroon/90 text-white" 
        disabled={isLoading}
      >
        {isLoading ? "Saving Preferences..." : "Save Preferences"}
      </Button>
    </form>
  )
}