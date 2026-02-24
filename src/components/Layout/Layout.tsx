import { ReactNode } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { ClickTracker } from '../ClickTracker/ClickTracker'
import { LeadGenBlock } from '../LeadGenBlock/LeadGenBlock'
import { LeadGenPopup } from '../LeadGenPopup/LeadGenPopup'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <ClickTracker />
      <Header />
      <main className="main-content">
        {children}
        <LeadGenBlock />
      </main>
      <Footer />
      <LeadGenPopup />
    </div>
  )
}

export default Layout

