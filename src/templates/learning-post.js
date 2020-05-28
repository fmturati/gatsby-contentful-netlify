import React, { Component } from "react";

import { graphql, Link } from "gatsby";
import Img from "gatsby-image"
import Header from "../components/header";
import Layout from "../components/layout";

class LearningPost extends Component {
    render() {
        console.log(this.props)

        const data = this.props.data;
        const { notes, title, type, category } = data.contentfulLearning;
        const { previous, next } = this.props.pageContext
        return (
            <Layout siteTitle={data.site.siteMetadata.title}>


                <h2>{title}</h2>
                {/* <Img fluid={category.fluid} /> */}
                <div dangerouslySetInnerHTML={{ __html: notes.childContentfulRichText.html }}>


                </div>

                <ul>
                    {previous &&
                        <li>
                            <Link to={previous.slug} rel="prev"> {previous.title}</Link>
                        </li>
                    }
                    {next &&
                        <li>
                            <Link to={next.slug} rel="prev"> {next.title}</Link>
                        </li>
                    }
                </ul>
            </Layout>)
    }
}

export default LearningPost;

export const pageQuery = graphql`
query ContentfulLearningBySlug($slug: String!) {
    site {
        siteMetadata {
            title
            author
        }
    }
    contentfulLearning (slug: { eq: $slug }) {
        title
        type
        notes {
            childContentfulRichText {
                html
            }
        }
        category {
            title
            icon {
                file {
                    url
                    contentType
                    fileName
                }
            }
            createdAt
          }
          updatedAt
    }

}`