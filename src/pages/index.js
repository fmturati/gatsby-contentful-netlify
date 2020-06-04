import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const GridCards = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.gridCols}, 1fr);
  grid-gap: 50px 30px;
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
    props.maxId == props.id && props.isMaximized ? 'auto' : '0'};
  height: ${(props) =>
    props.maxId == props.id && props.isMaximized ? '70%' : 'inherit'};
  left: ${(props) =>
    props.maxId == props.id && props.isMaximized ? '0' : 'inherit'};
  right: ${(props) =>
    props.maxId == props.id && props.isMaximized ? '0' : 'inherit'};
  background: white;
  min-height: 360px;


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
`;

const ListItem = styled.div`
  svg {
    margin-right: 10px;
  }

  a {
    background: ${(props) => props.isOdd ? '#f9f9f9' : '#ffffff'};
    transition: all 0.2s ease;
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    text-decoration: none;
    font-size: 14px;
    color: #808080;
    padding: 5px 10px;
 
    

    &:hover {
      text-decoration: underline;

      transform: scale(1.01);
      transition: all 0.2s ease;
    }
  }
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

// const OverlayBackground = styled.div`
//     width: 100%;
//     height: 100%;
//     position: fixed;
//     top: 0;
//     overflow: hidden;
//     z-index: 3;
//     left: 0;
//     background: #424242;
// }`;

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

    return (
      <Layout>
        {/* {this.state.isMaximized && (
          <OverlayBackground
            onClick={() => this.setState({ isMaximized: false })}
          />
        )} */}
        <GridSelector>
          <FontAwesomeIcon icon={faThLarge} size="lg" />
          <select
            onChange={(e) => this.handleColumns(e)}
            defaultValue={this.state.gridCols}
          >
            <option value="1" name="1">
              1 Column
            </option>
            <option value="2" name="2">
              2 Columns
            </option>
            <option value="3" name="3">
              3 Columns
            </option>
          </select>
        </GridSelector>

        <GridCards gridCols={this.state.gridCols}>
          {categories
            .sort(() => Math.random() - 0.5)
            .map(({ node }, index) => {
              return (
                <LearningCard
                  gridCols={this.state.gridCols}
                  key={node.title}
                  ref={(learnRef) => (this.learnRef[index] = learnRef)}
                  id={index}
                  maxId={this.state.maxId}
                  isMaximized={this.state.isMaximized}
                >
                  <CardHeader>
                    <img src={`https:${node.icon.file.url}`} alt={node.title} />
                    <h3>{node.title}</h3>
                  </CardHeader>
                  <ListLearnings>
                    {node && node.learning ? (
                      node.learning
                        .sort(
                          (a, b) =>
                            new Date(b.updatedAt) - new Date(a.updatedAt)
                        )
                        .map((item, i) => {
                          const { slug, title } = item;
                          const isOdd = i % 2 == 0;
                          return (
                            <ListItem key={item.title} isOdd={isOdd}>
                              <Link to={`/${slug}`}>
                                <FontAwesomeIcon
                                  icon={faAngleRight}
                                  size="lg"
                                />
                                {title.slice(0, 50)}...
                              </Link>
                            </ListItem>
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
            updatedAt
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
