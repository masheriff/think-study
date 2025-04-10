// src/utilities/teleCRMHelper.ts

export type TeleCRMPayload = {
    fields: {
        name: string;
        phone: string;
        status: string;
        email?: string; // Added email as an optional field
        [key: string]: string | undefined; // For any additional fields
    }
}

/**
 * Maps form data to teleCRM format
 * @param formData The form data from react-hook-form
 * @returns Formatted data for teleCRM API
 */
export const mapToTeleCRMFormat = (formData: Record<string, unknown>): TeleCRMPayload => {
    // Extract field values, handling different possible structures
    const extractValue = (field: unknown): string => {
        if (field === undefined || field === null) return '';
        if (typeof field === 'object' && 'value' in field) {
            return String(field.value);
        }
        // Convert any field to string, including numbers
        return String(field);
    }

    // Get name from various possible form field names
    const name = extractValue(
        formData.name ||
        formData.fullName ||
        (formData.firstName && formData.lastName
            ? `${extractValue(formData.firstName)} ${extractValue(formData.lastName)}`
            : '')
    );

    // Get phone from various possible form field names
    const phone = extractValue(
        formData.phone ||
        formData.phoneNumber ||
        formData.mobileNumber ||
        formData.mobile
    );

    // Get email from various possible form field names
    const email = extractValue(
        formData.email ||
        formData.emailAddress ||
        formData.userEmail
    );

    // Format phone number to 00919XXXXXXXXX format for Indian numbers
    let formattedPhone = '';

    // Clean the phone number of any non-digit characters
    const digits = phone.replace(/\D/g, '');

    // Check if the number is already in the correct format with 0091 prefix
    if (digits.startsWith('0091') && digits.length >= 12) {
        formattedPhone = digits;
    }
    // Has +91 or 91 prefix (remove + if present)
    else if (digits.startsWith('91') && digits.length >= 12) {
        formattedPhone = `00${digits}`;
    }
    // Just 10 digits - assume it's an Indian number without any prefix
    else if (digits.length === 10) {
        formattedPhone = `0091${digits}`;
    }
    // If it has country code without 00 prefix
    else if (digits.startsWith('91') && digits.length === 12) {
        formattedPhone = `00${digits}`;
    }
    // If number has no prefix but could be valid Indian mobile
    else if (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) {
        formattedPhone = `0091${digits}`;
    }
    // Try to extract last 10 digits if longer
    else if (digits.length > 10) {
        const last10 = digits.substring(digits.length - 10);
        // Check if the last 10 digits look like a valid Indian mobile
        if (/^[6-9]\d{9}$/.test(last10)) {
            formattedPhone = `0091${last10}`;
        } else {
            // Just use whatever is provided with prefix
            formattedPhone = `0091${digits}`;
        }
    }
    // Fallback for any other format
    else {
        formattedPhone = `0091${digits}`;
    }

    // Build the basic payload with status always set to 'Fresh'
    const payload: TeleCRMPayload = {
        fields: {
            name,
            phone: formattedPhone,
            status: 'Fresh' // Always set to 'Fresh' regardless of form input
        }
    };

    // Add email only if it exists
    if (email && email.trim() !== '') {
        payload.fields.email = email;
    }

    return payload;
}