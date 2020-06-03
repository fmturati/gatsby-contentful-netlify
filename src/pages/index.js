import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThLarge,
  faAngleRight,
  faExpand,
  faExpandAlt,
  faCompressAlt,
} from '@fortawesome/free-solid-svg-icons';

const GridCards = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.gridCols}, 1fr);
  grid-gap: 30px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const LearningCard = styled.div`
  width: ${(props) =>
    props.maxId == props.id && props.isMaximized ? '90%' : '100%'};
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 15px;
  text-align: center;
  transition: all 0.2s ease;
  position: ${(props) =>
    props.maxId == props.id && props.isMaximized ? 'fixed' : 'relative'};
  z-index: ${(props) =>
    props.maxId == props.id && props.isMaximized ? '10' : '1'};
  margin: ${(props) =>
    props.maxId == props.id && props.isMaximized ? 'auto' : '20px 0'};
  height: ${(props) =>
    props.maxId == props.id && props.isMaximized ? '70%' : 'inherit'};
  left: ${(props) =>
    props.maxId == props.id && props.isMaximized ? '0' : 'inherit'};
  right: ${(props) =>
    props.maxId == props.id && props.isMaximized ? '0' : 'inherit'};
  background: white;
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
    top: -30px;
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

  svg {
    margin-right: 10px;
  }

  a {
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.02);
      transition: all 0.2s ease;
    }
  }
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

const GridSelector = styled.div`
  text-align: right;
  padding-bottom: 40px;

  svg {
    margin-right: 10px;

    path {
      fill: rgba(210, 210, 210, 0.7);
    }
  }
  select {
    font-size: 16px;
  }
`;

const OverlayBackground = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    overflow: hidden;
    z-index: 3;
    left: 0;
    background: #424242;
}`;

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      querySearch: '',
      isMaximized: false,
      maxId: null,
      gridCols: '2',
    };

    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.handleMaximized = this.handleMaximized.bind(this);
    this.handleColumns = this.handleColumns.bind(this);

    // creating ref
    this.learnRef = [];
  }

  handleInputSearch = (e) => {
    this.setState({ querySearch: e.target.value });
  };

  handleMaximized = (id) => {
    this.setState({ isMaximized: !this.state.isMaximized, maxId: id });
  };

  handleColumns = (e) => {
    this.setState({ gridCols: e.target.value });
  };

  render() {
    const { data } = this.props;
    const categories = data.allContentfulCategory.edges;

    console.log(this.state.isMaximized);

    return (
      <Layout>
        {this.state.isMaximized && (
          <OverlayBackground
            onClick={() => this.setState({ isMaximized: false })}
          />
        )}
        <GridSelector>
          <FontAwesomeIcon icon={faThLarge} size="lg" />
          <select onChange={(e) => this.handleColumns(e)}>
            <option value="1" name="1">
              1 Column
            </option>
            <option value="2" name="2" defaultChecked>
              2 Columns
            </option>
            <option value="3" name="3">
              3 Columns
            </option>
          </select>
        </GridSelector>

        <GridCards gridCols={this.state.gridCols}>
          {categories.map(({ node }, index) => {
            // console.log("IndexPage -> render -> node", node)
            return (
              <LearningCard
                gridCols={this.state.gridCols}
                key={index}
                ref={(learnRef) => (this.learnRef[index] = learnRef)}
                id={index}
                maxId={this.state.maxId}
                isMaximized={this.state.isMaximized}
              >
                <IconExpand
                  onClick={(item) => {
                    // this.learnRef[index].scrollIntoView({
                    //   behavior: 'smooth',
                    //   block: 'center',
                    // });
                    this.setState({ isMaximized: !this.state.isMaximized });
                    this.handleMaximized(index);
                  }}
                >
                  {this.state.isMaximized ? (
                    <FontAwesomeIcon icon={faCompressAlt} size="lg" />
                  ) : (
                      <FontAwesomeIcon icon={faExpandAlt} size="lg" />
                    )}
                </IconExpand>
                <CardHeader>
                  <img src={`https:${node.icon.file.url}`} alt={node.title} />
                  <h3>{node.title}</h3>
                </CardHeader>
                <ListLearnings key={node.title}>
                  {node && node.learning ? (
                    node.learning.map((item) => {
                      // console.log("IndexPage -> render -> item", item)
                      const { slug, title } = item;
                      return (
                        <Link key={item} to={`/${slug}`}>
                          <FontAwesomeIcon icon={faAngleRight} size="lg" />
                          {title.slice(0, 50)}...
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
