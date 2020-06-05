import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';

const MetaSection = styled.section`
  border-bottom: 1px solid #e0e0e0;
  color: grey;
  text-align: right;
  font-size: 14px;
  margin-bottom: 20px;

  p {
    margin-bottom: 10px;
  }
`;

const LearnRelated = styled.ul`
  margin-top: 80px;

  li {
    a {
      text-decoration: none;
      font-size: 14px;
      color: #808080;
      padding: 5px 10px;
      border-bottom: #f7f7f7 1px solid;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const car = 0;


class LearningPost extends Component {
  render() {
    const { data } = this.props;
    console.log('LearningPost -> render -> data', data);
    const {
      title,
      type,
      category,
      content,
      updatedAt,
    } = data.contentfulLearning;
    const { previous, next } = this.props.pageContext;
    const date = new Date(updatedAt).toLocaleString().toString();
    // console.log('LearningPost -> render -> date', date);
    return (
      <Layout siteTitle={data.site.siteMetadata.title}>
        <MetaSection>
          <p>
            Published on {date} | Category: {category.title}
          </p>
        </MetaSection>
        <h2>{title}</h2>
        {/* <Img fluid={category.fluid} /> */}
        <div
          dangerouslySetInnerHTML={{
            __html: content.childMarkdownRemark.html,
          }}
        />

        <LearnRelated>
          <h3>More Learnings:</h3>
          {previous && (
            <li>
              <Link to={previous.slug} rel="prev">
                {' '}
                {previous.title}
              </Link>
            </li>
          )}
          {next && (
            <li>
              <Link to={next.slug} rel="prev">
                {' '}
                {next.title}
              </Link>
            </li>
          )}
        </LearnRelated>
      </Layout>
    );
  }
}

LearningPost.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
};

LearningPost.defaultPropTypes = {
  pageContext: {},
};

export default LearningPost;

export const pageQuery = graphql`
  query ContentfulLearningBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    contentfulLearning(slug: { eq: $slug }) {
      title
      type
      content {
        childMarkdownRemark {
          html
          rawMarkdownBody
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
  }
`;
