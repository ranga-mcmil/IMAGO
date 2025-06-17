"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function ProfileNotifications() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Email notification settings
  const [emailNotifications, setEmailNotifications] = useState({
    orderUpdates: true,
    newProducts: false,
    inventoryAlerts: true,
    securityAlerts: true,
    promotionalEmails: false,
  })

  // In-app notification settings
  const [appNotifications, setAppNotifications] = useState({
    orderUpdates: true,
    newProducts: true,
    inventoryAlerts: true,
    securityAlerts: true,
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    frequency: "realtime",
    quietHoursStart: "22:00",
    quietHoursEnd: "07:00",
    sound: true,
  })

  // Subscription settings
  const [subscriptionSettings, setSubscriptionSettings] = useState({
    marketing: false,
    productUpdates: true,
    newsletter: false,
  })

  // Handle email notification toggle
  const handleEmailToggle = (key: keyof typeof emailNotifications) => {
    setEmailNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Handle app notification toggle
  const handleAppToggle = (key: keyof typeof appNotifications) => {
    setAppNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Handle notification settings change
  const handleSettingsChange = (key: keyof typeof notificationSettings, value: string | boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Handle subscription toggle
  const handleSubscriptionToggle = (key: keyof typeof subscriptionSettings) => {
    setSubscriptionSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been updated successfully.",
      duration: 3000,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Email Notifications Card */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div className="space-y-0.5">
                  <Label className="text-base">Order Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive emails about your order status</p>
                </div>
                <Switch
                  checked={emailNotifications.orderUpdates}
                  onCheckedChange={() => handleEmailToggle("orderUpdates")}
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <div className="space-y-0.5">
                  <Label className="text-base">New Products</Label>
                  <p className="text-sm text-muted-foreground">Get notified when new products are added</p>
                </div>
                <Switch
                  checked={emailNotifications.newProducts}
                  onCheckedChange={() => handleEmailToggle("newProducts")}
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <div className="space-y-0.5">
                  <Label className="text-base">Inventory Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts about inventory changes</p>
                </div>
                <Switch
                  checked={emailNotifications.inventoryAlerts}
                  onCheckedChange={() => handleEmailToggle("inventoryAlerts")}
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <div className="space-y-0.5">
                  <Label className="text-base">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified about security-related events</p>
                </div>
                <Switch
                  checked={emailNotifications.securityAlerts}
                  onCheckedChange={() => handleEmailToggle("securityAlerts")}
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <Label className="text-base">Promotional Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive promotional offers and discounts</p>
                </div>
                <Switch
                  checked={emailNotifications.promotionalEmails}
                  onCheckedChange={() => handleEmailToggle("promotionalEmails")}
                />
              </div>
            </CardContent>
          </Card>

          {/* In-App Notifications Card */}
          <Card>
            <CardHeader>
              <CardTitle>In-App Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div className="space-y-0.5">
                  <Label className="text-base">Order Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive in-app notifications about order status</p>
                </div>
                <Switch
                  checked={appNotifications.orderUpdates}
                  onCheckedChange={() => handleAppToggle("orderUpdates")}
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <div className="space-y-0.5">
                  <Label className="text-base">New Products</Label>
                  <p className="text-sm text-muted-foreground">Get notified when new products are added</p>
                </div>
                <Switch checked={appNotifications.newProducts} onCheckedChange={() => handleAppToggle("newProducts")} />
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <div className="space-y-0.5">
                  <Label className="text-base">Inventory Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts about inventory changes</p>
                </div>
                <Switch
                  checked={appNotifications.inventoryAlerts}
                  onCheckedChange={() => handleAppToggle("inventoryAlerts")}
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <Label className="text-base">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified about security-related events</p>
                </div>
                <Switch
                  checked={appNotifications.securityAlerts}
                  onCheckedChange={() => handleAppToggle("securityAlerts")}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="frequency">Notification Frequency</Label>
                <Select
                  value={notificationSettings.frequency}
                  onValueChange={(value) => handleSettingsChange("frequency", value)}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly digest</SelectItem>
                    <SelectItem value="daily">Daily digest</SelectItem>
                    <SelectItem value="weekly">Weekly digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Quiet Hours</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="quietHoursStart" className="sr-only">
                      Start Time
                    </Label>
                    <input
                      id="quietHoursStart"
                      type="time"
                      value={notificationSettings.quietHoursStart}
                      onChange={(e) => handleSettingsChange("quietHoursStart", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quietHoursEnd" className="sr-only">
                      End Time
                    </Label>
                    <input
                      id="quietHoursEnd"
                      type="time"
                      value={notificationSettings.quietHoursEnd}
                      onChange={(e) => handleSettingsChange("quietHoursEnd", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Don't send notifications during these hours</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notification-sound">Notification Sound</Label>
                  <p className="text-sm text-muted-foreground">Play sound for new notifications</p>
                </div>
                <Switch
                  id="notification-sound"
                  checked={notificationSettings.sound}
                  onCheckedChange={(checked) => handleSettingsChange("sound", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Subscription Card */}
          <Card>
            <CardHeader>
              <CardTitle>Email Subscriptions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Promotional offers and campaigns</p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={subscriptionSettings.marketing}
                  onCheckedChange={() => handleSubscriptionToggle("marketing")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="product-updates">Product Updates</Label>
                  <p className="text-sm text-muted-foreground">New features and improvements</p>
                </div>
                <Switch
                  id="product-updates"
                  checked={subscriptionSettings.productUpdates}
                  onCheckedChange={() => handleSubscriptionToggle("productUpdates")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newsletter">Newsletter</Label>
                  <p className="text-sm text-muted-foreground">Monthly newsletter with industry insights</p>
                </div>
                <Switch
                  id="newsletter"
                  checked={subscriptionSettings.newsletter}
                  onCheckedChange={() => handleSubscriptionToggle("newsletter")}
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full bg-maroon hover:bg-maroon/90 text-white" disabled={isLoading}>
            {isLoading ? "Saving Preferences..." : "Save Preferences"}
          </Button>
        </div>
      </div>
    </form>
  )
}
