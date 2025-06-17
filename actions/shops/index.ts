'use server';

import { APIResponse } from "@/lib/http-service/apiClient"; 
import { shopsService } from "@/lib/http-service/shops";
import { CreateCategorySchema, UpdateBranchSchema } from "@/lib/http-service/shops/schema";
import { CreateCategoryPayload, CreateCategoryResponse, GetCategoriesResponse, UpdateBranchPayload, } from "@/lib/http-service/shops/types";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export async function createCategoryAction(initialData: any, formData: FormData) {
    
    const icon = formData.get('icon');
    const description = formData.get('description');
    const name = formData.get('name');

    if (!(icon instanceof File)) {
        console.error('No file uploaded.');
        return { error: 'Please select a file.' };
    }

    const externalFormData = new FormData();
    externalFormData.append('icon', icon); // Append the file with a name the external API expects
    // You might need to append other fields as required by the external API
    externalFormData.append("category", `{\"name\": \"${name}\",\"description\": \"${description}\"}`);

    const externalApiUrl = 'http://82.25.119.4:1900/api/categories'; // Replace with the actual URL

    try {
        const externalFormData = new FormData();
        externalFormData.append('icon', icon);
        externalFormData.append('description', description as string);
        externalFormData.append('name', name as string);

        // You might need to append other fields as required by the external API
        // externalFormData.append("category", `{\"name\": \"${name}\",\"description\": \"${description}\"}`);
        // externalFormData.append("", "");
        
        const response = await fetch(externalApiUrl, {
            method: 'POST',
            body: externalFormData,
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImV4cCI6MTc1MDE0NDAzNiwiaWF0IjoxNzUwMDU3NjM2LCJpc3MiOiJGaXNjSVQifQ.6H8eTgZhN2d48f0XCGhR_gWOPFgaRH1MiWDD7jxECGkeKlyd-0AU0qrvlAsiA7Da74tKJqyRFQ623Yu4Tcuvvw'
            }
            // Important: Do NOT set Content-Type header if you are sending FormData with a file.
            // The browser will automatically set the correct multipart/form-data header
            // with the necessary boundary.
        });

        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log(response)
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")
        console.log("")


        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error sending data to external API:', errorData);
            return { error: `Failed to send data: ${response.statusText}` };
        }

        const result = await response.json();
        console.log('External API response:', result);
        revalidatePath('/'); // Optional: Revalidate routes that might be affected by this action
        return { success: 'File uploaded and sent successfully!', data: result };
    } catch (error) {
        console.error('Error during fetch:', error);
        return { error: 'An unexpected error occurred.' };
    }
    
    const rawData = {
        name,
        description,
    };

    // // Validate the form data
    // const validatedData = CreateCategorySchema.safeParse(externalFormData)

    // if (!validatedData.success) {
    //     return {
    //         success: false,
    //         error: 'Please fix the errors in the form',
    //         fieldErrors: validatedData.error.flatten().fieldErrors,
    //         inputData: rawData
    //     }
    // }

    const res = await shopsService.createCategory(externalFormData);
    console.log('... ... ... ... ... ... ... ... ...')
    console.log('res:  ', res)
    if (res.success) {
        revalidatePath('/branches');
        return {
            success: true,
            data: res.data,
        };
    } else {
        return {
            success: false,
            error: res.error,
            inputData: rawData
        }
    }
}

// export async function updateBranchAction(formData: FormData, branchId: string): Promise<APIResponse<UpdateBranchResponse, UpdateBranchPayload>>  {
//     const rawData: UpdateBranchPayload = {
//         name: formData.get('name') as string,
//         address: {
//             street: formData.get('street') as string,
//             city: formData.get('city') as string,
//             province: formData.get('province') as string,
//             country: formData.get('country') as string,
//             postalCode: formData.get('postalCode') as string,
//         },
//         location: formData.get('location') as string,
//     }

//     // Validate the form data
//     const validatedData = UpdateBranchSchema.safeParse(rawData)

//     if (!validatedData.success) {
//         return {
//             success: false,
//             error: 'Please fix the errors in the form',
//             fieldErrors: validatedData.error.flatten().fieldErrors,
//             inputData: rawData
//         }
//     }

//     const res = await shopsService.updateBranch(validatedData.data as UpdateBranchPayload, branchId);

//     if (res.success) {
//         revalidatePath(`/branches/${branchId}`);
//         revalidatePath('/branches');
//         revalidatePath(`/branches/${branchId}/edit`);
//         return {
//             success: true,
//             data: res.data,
//         };
//     } else {
//         return {
//             success: false,
//             error: res.error,
//             inputData: rawData
//         }
//     }
// }

// export async function deleteBranchAction(branchId: string): Promise<APIResponse<void>> {
//     return await shopsService.deleteBranch(branchId);
// }

export async function getCategoriessAction(): Promise<APIResponse<GetCategoriesResponse>> {
    return await shopsService.get_categories();
}

