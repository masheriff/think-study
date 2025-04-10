import { getCachedGlobal } from "@/utilities/getGlobals"
import type { Footer } from "@/payload-types"
import { FooterClient } from './Component.client'

export async function Footer() {
  const footerData: Footer = (await getCachedGlobal("footer", 1)()) as unknown as Footer

  return <FooterClient data={footerData} />
}