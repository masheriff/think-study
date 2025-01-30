import { cva } from "class-variance-authority";
import { cn } from "@/utilities/ui"; // Adjust this import if needed
import * as React from "react";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground",
                secondary: "bg-secondary text-secondary-foreground",
                destructive: "bg-destructive text-destructive-foreground",
                outline: "border border-border",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "secondary" | "destructive" | "outline";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
        );
    }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
