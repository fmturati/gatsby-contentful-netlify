import React, { Component } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import styled from "styled-components"


const GridCards = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 20px;
`

const LearningCard = styled.div`
    width: 100%;
    max-width: 400px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 15px;
    text-align: center;
    margin: 20px;
    border-radius: 20px;
    min-height: 360px;

    a {
      text-decoration: none;
      font-size: 14px;

      &:hover {
        text-decoration: underline;
      }
    }
`

const CardHeader = styled.div`
padding: 10px;
background: #fbfbfb;
position: relative;
display: flex;
justify-content: center;
img {
  position: absolute;
  border-radius: 50%;
  width: 40px;
  height: auto;
  top: -31px; 
  box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
}
h3 {
  margin-bottom: 0px;
}
`

const ListLearnings = styled.div`
  margin-top: 25px;
     display: flex;
    flex-direction: column;
    text-align: left;
    padding: 25px;
`

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      siteTitle: 'My Learnings',
      isSearch: false,
      querySearch: ''
    }

    this.handleInputSearch = this.handleInputSearch.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleInputSearch = e => {
    this.setState({ querySearch: e.target.value })
  }


  handleSearch = (e) => {
    e.preventDefault();
    const query = this.state.querySearch;
    console.log(query)
  }


  render() {
    const { data } = this.props
    const categories = data.allContentfulCategory.edges
    return (
      <Layout>
        <SEO title="Home" />
        <GridCards >
          {categories.map(({ node }) => {
            // console.log("IndexPage -> render -> node", node)
            return (
              <LearningCard>
                <CardHeader>
                  <img src={`https:${node.icon.file.url}`} />
                  <h3>{node.title}</h3>
                </CardHeader>
                <ListLearnings>
                  {node && node.learning ? (
                    node.learning.map(item => {
                      const { slug, title } = item
                      return (
                        <Link to={`/${slug}`}>
                          {title}
                        </Link>
                      )
                    })
                  ) : (
                      <p>Nothing yet...</p>
                    )}
                </ListLearnings>
              </LearningCard>
            )
          })}
        </GridCards>
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
