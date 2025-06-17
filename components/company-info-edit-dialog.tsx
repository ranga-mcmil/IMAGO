'use client';

import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { createOrUpdateImagoInfoAction } from "@/actions/imago-info";
import { ImagoInfo } from "@/lib/http-service/imago-info/types";

interface CompanyInfoEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedInfo: ImagoInfo) => void;
  existingInfo?: ImagoInfo | null;
}

export function CompanyInfoEditDialog({
  isOpen,
  onClose,
  onSuccess,
  existingInfo
}: CompanyInfoEditDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        setErrors({});
        const result = await createOrUpdateImagoInfoAction(formData);

        if (result.success && result.data) {
          toast({
            title: "Success",
            description: existingInfo 
              ? "Company information updated successfully" 
              : "Company information added successfully",
          });
          onSuccess(result.data);
        } else {
          if (result.fieldErrors) {
            setErrors(result.fieldErrors);
          }
          toast({
            title: "Error",
            description: result.error || "Failed to save company information",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error saving company info:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  const handleClose = () => {
    if (!isPending) {
      setErrors({});
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {existingInfo ? 'Edit Company Information' : 'Add Company Information'}
            </DialogTitle>
            <DialogDescription>
              {existingInfo 
                ? 'Update your company details below.' 
                : 'Enter your company information to get started.'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Enter company name"
                defaultValue={existingInfo?.companyName || ''}
                disabled={isPending}
                className={errors.companyName ? 'border-red-500' : ''}
              />
              {errors.companyName && (
                <p className="text-sm text-red-500">{errors.companyName[0]}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                defaultValue={existingInfo?.email || ''}
                disabled={isPending}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email[0]}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter phone number"
                defaultValue={existingInfo?.phoneNumber || ''}
                disabled={isPending}
                className={errors.phoneNumber ? 'border-red-500' : ''}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500">{errors.phoneNumber[0]}</p>
              )}
              <p className="text-xs text-gray-500">
                Format: +1234567890 or (123) 456-7890
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-maroon hover:bg-maroon/90 text-white"
              disabled={isPending}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {existingInfo ? 'Update' : 'Add'} Information
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}