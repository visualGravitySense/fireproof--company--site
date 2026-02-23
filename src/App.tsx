import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import { PageVisitNotifier } from './components/PageVisitNotifier/PageVisitNotifier'
import { PageTimeTracker } from './components/PageTimeTracker/PageTimeTracker'
import HomePage from './pages/HomePage'

// Lazy load non-critical pages to reduce TBT and initial bundle size
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ProjectCategoryPage = lazy(() => import('./pages/ProjectCategoryPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'))
const MaterialsPage = lazy(() => import('./pages/MaterialsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ChristmasCardPage = lazy(() => import('./pages/ChristmasCardPage'))

function PageFallback() {
  return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true" />
}

function App() {
  return (
    <>
      <PageVisitNotifier />
      <PageTimeTracker />
      <Routes>
        <Route path="/christmas" element={
          <Suspense fallback={<PageFallback />}>
            <ChristmasCardPage />
          </Suspense>
        } />
        <Route path="*" element={
        <Layout>
          <ScrollToTop />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/:section" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:service" element={<ServiceDetailPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:category" element={<ProjectCategoryPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/materials" element={<MaterialsPage />} />
              <Route path="/materials/:material" element={<MaterialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
          </Layout>
        } />
      </Routes>
    </>
  )
}

export default App

