import type { CMSLinkType } from "@/components/Link";

/**
 * Transforms link properties to ensure they match the expected CMSLinkType format
 * Specifically handles the popup property to ensure correct structure
 * 
 * @param link The link object to transform
 * @returns A transformed link object that matches CMSLinkType
 */
export const transformLinkProps = (link: any): CMSLinkType => {
    if (!link) return link;

    const transformedLink = { ...link };

    // Transform popup property if it exists and is not in the correct format
    if (link.popup && typeof link.popup !== 'object') {
        // If popup is a number or some other non-object value
        transformedLink.popup = {
            id: link.popup,
            relationTo: 'popups',
            value: link.popup
        };
    } else if (link.popup && !link.popup.relationTo) {
        // If popup is an object but missing the relationTo property
        transformedLink.popup = {
            id: link.popup.id || link.popup,
            relationTo: 'popups',
            value: link.popup
        };
    }

    return transformedLink;
};