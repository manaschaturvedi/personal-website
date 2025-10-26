import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  asChild = false,
  ...props
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg border border-primary-600',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 hover:shadow-md border border-neutral-200',
    outline: 'border border-neutral-300 bg-transparent text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 hover:shadow-md',
    ghost: 'hover:bg-neutral-100 text-neutral-700',
  };

  const sizes = {
    sm: 'h-8 px-4 text-sm',
    md: 'h-10 px-6 py-2',
    lg: 'h-12 px-8 text-lg',
  };

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  if (asChild) {
    return <span className={classes}>{children}</span>;
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
