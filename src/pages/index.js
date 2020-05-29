import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

class IndexPage extends Component {
  render() {
    const { data } = this.props
    const learnings = data.allContentfulLearning.edges
    const categories = data.allContentfulCategory.edges
    // console.log(this.props)
    return (
      <Layout>
        <SEO title="Home" />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            margin: "20px",
          }}
        >
          {categories.map(({ node }) => {
            return (
              <div
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                  textAlign: "center",
                  padding: "15px",
                  margin: "20px",
                }}
              >
                <div>
                  <img
                    src={`https:${node.icon.file.url}`}
                    height="30"
                    width="auto"
                  />
                  <h2>{node.title}</h2>
                </div>
                <div>
                  {node && node.learning ? (
                    node.learning.map(item => {
                      const { slug, title } = item
                      return (
                        <div>
                          <Link to={`/${slug}`}>
                            <h4>{title}</h4>
                          </Link>
                        </div>
                      )
                    })
                  ) : (
                    <p>Nothing yet...</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allContentfulCategory {
      edges {
        node {
          title
          learning {
            title
            link
            slug
            type
          }
          icon {
            file {
              url
            }
          }
        }
      }
    }
    allContentfulLearning {
      edges {
        node {
          title
          slug
          childContentfulLearningNotesRichTextNode {
            childContentfulRichText {
              html
            }
          }
          category {
            title
            icon {
              file {
                url
              }
            }
            createdAt
          }
          type
          updatedAt
        }
      }
    }
  }
`
