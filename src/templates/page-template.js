import React, { Component } from "react"

import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

class PageTemplate extends Component {
  render() {
    // console.log(this.props)
    const {
      title,
      content,
      slug,
      featureImage,
    } = this.props.data.contentfulPages
    return (
      <Layout>
        <h2>{title}</h2>
        <img src={featureImage.file.url} alt={title} />
        <div
          dangerouslySetInnerHTML={{
            __html: content.childContentfulRichText.html,
          }}
        />
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageTemplateBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    contentfulPages(slug: { eq: $slug }) {
      id
      slug
      title
      featureImage {
        file {
          fileName
          url
        }
      }
      childContentfulPagesContentRichTextNode {
        childContentfulRichText {
          html
        }
      }
      content {
        childContentfulRichText {
          html
        }
      }
    }
  }
`
