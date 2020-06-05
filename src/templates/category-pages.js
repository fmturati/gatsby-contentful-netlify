import React, { Component } from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarAlt, faAngleRight } from "@fortawesome/free-solid-svg-icons";


const CategoryHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid #ececec;
    margin-bottom: 40px;
        
    img {
        opacity: 0.1;
        text-align: center;
        margin: auto;
        width: auto;
        height: 100px;
    }
`

const LearningItem = styled.div`
 
    a {
        margin: 0;
        text-decoration: none;
        color: grey;
        transition: all 0.2s ease;


        &:hover {
            text-decoration: underline;  
            transform: scale(1.02);
            transition: all 0.2s ease;
          }
    }

    p {
        color: #7d55cb;
        font-size: 14px;
        padding-left: 12px;
    }
`

class CategoryPage extends Component {


    render() {
        // console.log(this.props)

        const { title, learning, updatedAt, icon } = this.props.data.contentfulCategory;
        return (
            <Layout>
                <CategoryHeader>
                    <img src={icon.file.url} alt={title} />
                    <h2>{title}</h2>
                </CategoryHeader>
                <div>

                    <div>
                        {learning && learning.map((item, index) => {
                            const { updatedAt, slug, title } = item;
                            console.log("CategoryPage -> render -> item", item)
                            const date = new Date(updatedAt).toLocaleDateString().toString();

                            return (
                                <LearningItem>
                                    <Link to={slug}>
                                        <FontAwesomeIcon icon={faAngleRight} /> {title}
                                    </Link>
                                    <p>
                                        <FontAwesomeIcon icon={faCalendarAlt} /> Posted on {date}
                                    </p>
                                </LearningItem>
                            )
                        })}
                    </div>
                </div>
            </Layout>
        )
    }
}


export default CategoryPage;

export const pageQuery = graphql`    
    query CategoryQuery($slug: String!) {
        contentfulCategory(slug: { eq: $slug }) {
            slug
            title
            icon {
                file {
                  url
                }
              }
            updatedAt
            learning {
                title
                type
                slug
                link
                updatedAt
                content {
                    childMarkdownRemark {
                        html
                    }
                }
            }
        }
    }          
    
`