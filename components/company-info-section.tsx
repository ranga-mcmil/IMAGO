'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Building2, Mail, Phone } from "lucide-react";
import { getImagoInfoAction } from "@/actions/imago-info";
import { ImagoInfo } from "@/lib/http-service/imago-info/types";
import { CompanyInfoEditDialog } from "@/components/company-info-edit-dialog";

export function CompanyInfoSection() {
  const [companyInfo, setCompanyInfo] = useState<ImagoInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCompanyInfo();
  }, []);

  const loadCompanyInfo = async () => {
    try {
      setIsLoading(true);
      const response = await getImagoInfoAction();
      
      if (response.success && response.data) {
        setCompanyInfo(response.data);
        setError(null);
      } else {
        // If no company info exists yet, that's not an error
        setCompanyInfo(null);
        setError(null);
      }
    } catch (err) {
      console.error('Error loading company info:', err);
      setError('Failed to load company information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInfoUpdated = (updatedInfo: ImagoInfo) => {
    setCompanyInfo(updatedInfo);
    setIsEditDialogOpen(false);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Information
            </CardTitle>
            <Button variant="outline" size="sm" disabled>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 py-3 border-b">
            <div className="text-sm font-medium">Company Name</div>
            <div className="h-5 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-4 py-3 border-b">
            <div className="text-sm font-medium">Email</div>
            <div className="h-5 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-4 py-3">
            <div className="text-sm font-medium">Phone Number</div>
            <div className="h-5 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-red-600 text-sm">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={loadCompanyInfo}
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Information
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {companyInfo ? 'Edit' : 'Add'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {companyInfo ? (
            <>
              <div className="grid grid-cols-2 gap-4 py-3 border-b">
                <div className="text-sm font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-500" />
                  Company Name
                </div>
                <div className="text-sm">{companyInfo.companyName}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-b">
                <div className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  Email
                </div>
                <div className="text-sm">{companyInfo.email}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3">
                <div className="text-sm font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  Phone Number
                </div>
                <div className="text-sm">{companyInfo.phoneNumber}</div>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                No company information
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Add your company details to get started
              </p>
              <Button 
                size="sm" 
                className="bg-maroon hover:bg-maroon/90 text-white"
                onClick={() => setIsEditDialogOpen(true)}
              >
                Add Company Info
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <CompanyInfoEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSuccess={handleInfoUpdated}
        existingInfo={companyInfo}
      />
    </>
  );
}