import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';

import Arrow from '../images/images.png';

const GridCards = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 20px;
`;

const LearningCard = styled.div`
  width: 100%;
  max-width: ${(props) => (props.maxId == props.id ? '100%' : '430px')};
  // max-width: 430px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 15px;
  text-align: center;
  transition: all 0.2s ease;
  position: relative;
  margin: 20px;
  border-radius: 20px;
  min-height: 360px;

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
  p {
    font-size: 14px;
    color: #808080;
    padding: 5px 10px;
  }
`;

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
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  h3 {
    margin-bottom: 0px;
  }
`;

const ListLearnings = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const IconExpand = styled.div`
  position: absolute;
  right: 9px;
  top: 15px;
  opacity: 0.3;
  z-index: 2;
  cursor: pointer;
  width: 22px;
  height: 22px;
  margin: 0;
  padding: 0;
`;

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteTitle: 'My Learnings',
      isSearch: false,
      querySearch: '',
      isMaximized: false,
      maxId: null,
    };

    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMaximized = this.handleMaximized.bind(this);

    // this.learnRef = React.createRef();
    this.learnRef = [];
  }

  // On component mount, scroll to ref
  // componentDidMount() {
  //   this.scrollToMyRef();
  // }

  handleInputSearch = (e) => {
    this.setState({ querySearch: e.target.value });
  };

  handleSearch = (e) => {
    e.preventDefault();
    const query = this.state.querySearch;
  };

  handleMaximized = (id) => {
    this.setState({ isMaximized: !this.state.isMaximized, maxId: id });
  };

  render() {
    const { data } = this.props;
    const categories = data.allContentfulCategory.edges;

    return (
      <Layout>
        <SEO title="Home" />

        <GridCards>
          {categories.map(({ node }, index) => {
            // console.log("IndexPage -> render -> node", node)
            return (
              <LearningCard
                key={index}
                ref={(learnRef) => (this.learnRef[index] = learnRef)}
                id={index}
                maxId={this.state.maxId}
                isMaximized={this.state.isMaximized}
              >
                <IconExpand
                  onClick={(item) => {
                    this.learnRef[index].scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                    });
                    this.handleMaximized(index);
                  }}
                >
                  <img src={Arrow} alt="Expand Icon" />
                </IconExpand>
                <CardHeader>
                  <img src={`https:${node.icon.file.url}`} alt={node.title} />
                  <h3>{node.title}</h3>
                </CardHeader>
                <ListLearnings>
                  {node && node.learning ? (
                    node.learning.map((item) => {
                      // console.log("IndexPage -> render -> item", item)
                      const { slug, title } = item;
                      return (
                        <Link key={item} to={`/${slug}`}>
                          › {title.slice(0, 50)}...
                        </Link>
                      );
                    })
                  ) : (
                      <p>Nothing here yet...</p>
                    )}
                </ListLearnings>
              </LearningCard>
            );
          })}
        </GridCards>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.object,
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allContentfulCategory {
      edges {
        node {
          title
          learning {
            title
            link
            tags
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
`;
