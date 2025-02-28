import { getCachedGlobal } from "@/utilities/getGlobals"
import Link from "next/link"
import type { ReactElement } from "react"
import type { Footer } from "@/payload-types"
import { CMSLink } from "@/components/Link"
import { Logo } from "@/components/Logo/Logo"
import TextHighlighter from "@/components/ui/texthighlighter"

// Define valid social media types
type SocialIconType = "facebook" | "twitter" | "instagram"

const SocialIcons: Record<SocialIconType, ReactElement> = {
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
}

export async function Footer() {
  const footerData: Footer = (await getCachedGlobal("footer", 1)()) as unknown as Footer

  return (
    // <footer className="mt-auto border-t border-border">
    <footer className="container py-12 bg-black dark:bg-card text-[#F7674F] rounded-xl">
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Logo & Description */}
        <div className="space-y-4">
          <Link href="/">
            <Logo />
          </Link>
          <p className="text-muted-foreground text-white text-sm">{footerData?.description}</p>
        </div>


        {/* Services Column */}
        <div className="flex flex-col gap-3">
          <h3 className="font-normal mb-2">Services</h3>
          {footerData?.services?.map(({ link }, i) => (
            <CMSLink className="text-muted-foreground text-white text-sm" key={i} {...link} />
          ))}
        </div>

        {/* About Column */}
        <div className="flex flex-col gap-3">
          <h3 className="font-normal mb-2">About</h3>
          {footerData?.about?.map(({ link }, i) => (
            <CMSLink className="text-muted-foreground text-white text-sm" key={i} {...link} />
          ))}
        </div>

        {/* Help Column */}
        <div className="flex flex-col gap-3">
          <h3 className="font-normal mb-2">Help</h3>
          {footerData?.help?.map(({ link }, i) => (
            <CMSLink className="text-muted-foreground text-white text-sm" key={i} {...link} />
          ))}
        </div>
      </div>
      {/* Bottom Section */}
      <div className="pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          {/* Legal Links */}
          <div className="flex gap-6">
            {footerData?.legal?.map(({ link }, i) => (
              <CMSLink key={i} {...link} className="text-white text-sm hover:text-orange-300" />
            ))}
          </div>

          {/* Social Media */}
          <div className="flex items-center justify-center gap-4">
            {footerData?.social?.map(({ link }, i) => {
              const socialType = link.label?.toLowerCase().trim() as SocialIconType
              return (
                <CMSLink
                  key={i}
                  {...link}
                  label={""}
                  className="text-white hover:text-orange-300 transition-colors flex items-center justify-center"
                >
                  {socialType && SocialIcons[socialType]}
                </CMSLink>
              )
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-white text-sm mx-auto"><TextHighlighter text={footerData?.copyright} /></div>
      </div>
    </footer>
    // </footer>
  )
}

