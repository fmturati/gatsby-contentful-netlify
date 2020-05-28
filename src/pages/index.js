import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"


class IndexPage extends Component {
  render() {

    const { data } = this.props;
    const learnings = data.allContentfulLearning.edges
    console.log(this.props)
    return (
      <Layout>
        <SEO title="Home" />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {learnings.map(({ node }) => {
            console.log("IndexPage -> render -> node", node)

            return (
              <div style={{ width: '100%', maxWidth: '300px', boxShadow: '0px 2px 5px rgba(0,0,0,0.2)', textAlign: 'center', padding: '15px' }}>
                <div>
                  <img src={`https:${node.category.icon.file.url}`} height="30" width="auto" />
                  <p>{node.category.title}</p>
                </div>
                <Link to={`/${node.slug}`}><h4>{node.title}</h4></Link>
                <p>Learned from {node.type}</p>
              </div>
            )
          })}
        </div>


        {/* <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
      </Layout >
    )
  }
}

export default IndexPage;

export const pageQuery = graphql`
query {
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
}`
