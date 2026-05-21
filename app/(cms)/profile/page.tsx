"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { LockIcon, UserIcon, CameraIcon, TrashIcon } from "@phosphor-icons/react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/cms/page-header"

export default function ProfilePage() {
  const router = useRouter()
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [avatarUrl, setAvatarUrl] = React.useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file")
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB")
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        if (result) {
          setAvatarUrl(result)
          toast.success("Profile photo updated")
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setAvatarUrl("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast.info("Profile photo removed")
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Profile updated successfully")
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Password changed successfully")
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        eyebrow="CMS Settings"
        title="Telkom AI CoE Profile"
        description="Manage your admin profile photo, contact details, organization metadata, and security credentials for the Landing CMS."
      />
      
      <div className="grid gap-6 px-4 pb-12 lg:grid-cols-[1fr_360px] lg:px-6">
        {/* Left column - Forms */}
        <div className="flex flex-col gap-6">
          {/* Profile Details Form */}
          <form onSubmit={handleSaveProfile}>
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <div className="flex size-10 items-center justify-center bg-primary/10 text-primary">
                  <UserIcon className="size-5" />
                </div>
                <div>
                  <CardTitle>Employee Details</CardTitle>
                  <CardDescription>View and manage your identity within the Telkom AI Center of Excellence CMS.</CardDescription>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <FieldGroup>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field>
                      <FieldLabel>Full Name</FieldLabel>
                      <Input defaultValue="Aditya Satrio" placeholder="Enter your full name" />
                    </Field>
                    <Field>
                      <FieldLabel>Employee ID (NIK)</FieldLabel>
                      <Input defaultValue="940123" disabled className="bg-muted/50" />
                      <FieldDescription>Managed by corporate HC directory.</FieldDescription>
                    </Field>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field>
                      <FieldLabel>Role / Title (Jabatan)</FieldLabel>
                      <Input defaultValue="Super Admin" disabled className="bg-muted/50" />
                      <FieldDescription>Assigned role for CMS controls.</FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel>Unit / Division</FieldLabel>
                      <Input defaultValue="Digital Business (DBB) - AI Center of Excellence" disabled className="bg-muted/50" />
                      <FieldDescription>Assigned unit within Telkom Group.</FieldDescription>
                    </Field>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field>
                      <FieldLabel>Email Address</FieldLabel>
                      <Input type="email" defaultValue="aditya.satrio@telkom.co.id" placeholder="Enter your email" />
                    </Field>
                    <Field>
                      <FieldLabel>Phone Number</FieldLabel>
                      <Input type="tel" defaultValue="+62 812-3456-7890" placeholder="Enter your phone number" />
                    </Field>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="submit">Save Profile Changes</Button>
                  </div>
                </FieldGroup>
              </CardContent>
            </Card>
          </form>

          {/* Security & Password Form */}
          <form onSubmit={handleUpdatePassword}>
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <div className="flex size-10 items-center justify-center bg-primary/10 text-primary">
                  <LockIcon className="size-5" />
                </div>
                <div>
                  <CardTitle>Security & Password</CardTitle>
                  <CardDescription>Update your login credentials regularly to keep your administrator account secure.</CardDescription>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <FieldGroup>
                  <Field>
                    <FieldLabel>Current Password</FieldLabel>
                    <Input type="password" placeholder="••••••••" />
                  </Field>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field>
                      <FieldLabel>New Password</FieldLabel>
                      <Input type="password" placeholder="••••••••" />
                    </Field>
                    <Field>
                      <FieldLabel>Confirm New Password</FieldLabel>
                      <Input type="password" placeholder="••••••••" />
                    </Field>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="submit" variant="outline">Change Password</Button>
                  </div>
                </FieldGroup>
              </CardContent>
            </Card>
          </form>
        </div>

        {/* Right column - Avatar Upload */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
              <CardDescription>Upload a professional photo. This will be shown on logs and the admin menu.</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col items-center justify-center pt-6">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              <div 
                className="relative group size-36 rounded-full overflow-hidden border border-border bg-muted/30 cursor-pointer shadow-sm transition-all duration-200 hover:ring-2 hover:ring-primary/20"
                onClick={() => fileInputRef.current?.click()}
              >
                {avatarUrl ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white gap-1">
                      <CameraIcon className="size-5" />
                      <span className="text-[10px] font-medium">Change Photo</span>
                    </div>
                  </>
                ) : (
                  <div className="size-full flex flex-col items-center justify-center bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <span className="text-3xl font-semibold tracking-wider font-heading">AS</span>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white gap-1">
                      <CameraIcon className="size-5" />
                      <span className="text-[10px] font-medium">Upload Photo</span>
                    </div>
                  </div>
                )}
              </div>

              {avatarUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="mt-4 flex items-center gap-1 text-xs text-destructive hover:underline cursor-pointer bg-transparent border-none"
                >
                  <TrashIcon className="size-3.5" />
                  Remove photo
                </button>
              )}
              
              <p className="mt-4 text-center text-[11px] text-muted-foreground max-w-[200px]">
                Accepts JPG, PNG, or WebP. Maximum file size is 5MB.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
