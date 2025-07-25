// Marketing website header

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useTranslations, useLocale } from 'next-intl';

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = useTranslations('Marketing.Header');
  const locale = useLocale();

  const navigation = [
    { name: t('features'), href: '#features' },
    { name: t('pricing'), href: `/${locale}/subscription` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('blog'), href: `/${locale}/blog` },
    { name: t('contact'), href: `/${locale}/contact` },
  ]

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href={`/${locale}`} className="-m-1.5 p-1.5 flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                {process.env.NEXT_PUBLIC_APP_NAME?.[0] || 'F'}
              </span>
            </div>
            <span className="font-bold text-xl">
              {process.env.NEXT_PUBLIC_APP_NAME || 'FinHome'}
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center">
          <ThemeToggle />
          <Link href={`/${locale}/auth/login`}>
            <Button variant="ghost">{t('signIn')}</Button>
          </Link>
          <Link href={`/${locale}/auth/signup`}>
            <Button>{t('getStarted')}</Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href={`/${locale}`} className="-m-1.5 p-1.5 flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    {process.env.NEXT_PUBLIC_APP_NAME?.[0] || 'F'}
                  </span>
                </div>
                <span className="font-bold text-xl">
                  {process.env.NEXT_PUBLIC_APP_NAME || 'FinHome'}
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-muted-foreground hover:bg-accent"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-2">
                  <Link
                    href={`/${locale}/auth/login`}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-muted-foreground hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('signIn')}
                  </Link>
                  <Link href={`/${locale}/auth/signup`} onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">{t('getStarted')}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}