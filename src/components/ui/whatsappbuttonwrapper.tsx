// WhatsappButtonWrapper.jsx (Server Component)
import { getCachedGlobal } from "@/utilities/getGlobals"
import type { Footer } from "@/payload-types"
import { WhatsappButton } from "./whatsappbutton" // Import the client component

export async function WhatsappButtonWrapper() {
    const footerData: Footer = (await getCachedGlobal("footer", 1)()) as unknown as Footer
    const { showButton, phoneNumber, message } = footerData?.whatsappButton || {}

    // Pass the data to the client component
    return (
        <WhatsappButton
            phoneNumber={phoneNumber}
            message={message || "Hello, I have a question regarding your services."}
            showButton={showButton}
        />
    )
}