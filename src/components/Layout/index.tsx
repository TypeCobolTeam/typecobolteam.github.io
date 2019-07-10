import * as React from "react"

import { Layout, ConfigProvider } from "antd"

import Footer from "@components/Footer"
import HelmetInit from "@components/Helmet"
import Header from "@components/Header"
import SideNavigation from "@components/SideNavigation"
import { WindowLocation } from "@reach/router"
import "./index.less"

import { Breadcrumb as GBreadcrumb } from "gatsby-plugin-breadcrumb"
import Helmet from "react-helmet"

const { Content } = Layout

interface CLayoutProps {
  showHeader?: boolean
  showFooter?: boolean
  sideNavigation?: any
  customContentLayout?: boolean
  children?: React.ReactNode
  Breadcrumb: {
    location: WindowLocation
    label: string
  }
  translationCode?: string
}

const CLayout: React.StatelessComponent<CLayoutProps> = (
  props: CLayoutProps
) => {
  const {
    showHeader,
    showFooter,
    sideNavigation,
    customContentLayout,
    Breadcrumb,
    children,
    translationCode,
  } = props
  const langCode = translationCode || "en"
  return (
    <>
      <HelmetInit />
      {Breadcrumb.location.pathname !== "/" && (
        <Helmet title={Breadcrumb.label}>
          <html lang={langCode} />
        </Helmet>
      )}
      <ConfigProvider prefixCls="tc">
        <Layout>
          {showHeader && <Header translationCode={langCode} />}
          <Layout
            style={{
              flexDirection: sideNavigation ? "row" : "column",
            }}
          >
            {sideNavigation && <SideNavigation navigation={sideNavigation} />}
            <Layout>
              {customContentLayout ? (
                children
              ) : (
                <Layout style={{ padding: "0 24px 24px 24px" }}>
                  <div style={{ padding: "16px 24px" }}>
                    <GBreadcrumb
                      location={Breadcrumb.location}
                      crumbLabel={Breadcrumb.label}
                      crumbWrapperStyle={{ class: "tc-breadcrumb-wrapper" }}
                      crumbSeparator="/"
                    />
                  </div>
                  <Content
                    style={{
                      background: "#fff",
                      margin: 0,
                      minHeight: 280,
                      padding: 24,
                    }}
                  >
                    <div
                      style={{
                        minHeight: "calc(100vh - 234px)",
                        padding: 24,
                      }}
                    >
                      {children}
                    </div>
                  </Content>
                </Layout>
              )}
              {showFooter && <Footer />}
            </Layout>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  )
}

export default CLayout
