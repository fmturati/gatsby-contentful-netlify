import { Link, StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

const TopHeader = styled.div`
  background: linear-gradient(
    90deg,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );

  margin-bottom: 1.45rem;
`;

const HeaderContainer = styled.div`
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`;

const ListResults = styled.div`
max-width: 400px;
width: 100%;
display: flex;
flex-direction: column;
position: absolute;
right: 0;
z-index: 10;
background: white;
top: 40px;
box-shadow: 0px 1px 7px rgba(0,0,0,0.2);

a {
  text-decoration: none;
  font-size: 14px;
  color: #808080;
  border-bottom: #f7f7f7 1px solid;
  padding: 5px 10px;
}
}`;

const SearchForm = styled.div`
  list-style: none;
  margin: 0px;
  padding: 0px;
  align-items: center;
  width: 100%;
  max-width: 400px;
  display: flex;
  position: relative;
`;

const InputSearch = styled.input`
  background: #ffffff;
  width: 100%;
  color: #0e0e0e;
  border: none;
  padding: 5px 10px;
  font-size: 16px;

  &:focus {
    outline: 0;
  }
`;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      siteTitle: 'My Learnings',
      isSearch: false,
      querySearch: '',
    };

    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputSearch = (e) => {
    this.setState({ querySearch: e.target.value });
  };

  handleSearch = (e) => {
    e.preventDefault();
    const query = this.state.querySearch;

    console.log(query);
  };

  render() {
    return (
      <StaticQuery
        query={graphql`
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
          }
        `}
        render={(data) => {
          const learnings = data.allContentfulLearning.edges;

          return (
            <TopHeader>
              <HeaderContainer>
                <h1 style={{ margin: 0 }}>
                  <Link
                    to="/"
                    style={{
                      color: `white`,
                      textDecoration: `none`,
                    }}
                  >
                    {this.state.siteTitle}
                  </Link>
                </h1>

                <SearchForm>
                  {/* <form onSubmit={(e) => this.handleSearch(e)} style={{ marginBottom: '0px' }}> */}
                  <InputSearch
                    type="text"
                    placeholder="Search for..."
                    onChange={(e) => this.handleInputSearch(e)}
                  />
                  {/* <ButtonSearch type="submit">Search</ButtonSearch> */}
                  {/* </form> */}
                  {this.state.querySearch && (
                    <ListResults>
                      {this.state.querySearch &&
                        learnings
                          .filter(({ node }) => {
                            if (this.state.querySearch === null) {
                              console.log('empty');
                              return node;
                            }
                            if (
                              node.title
                                .toLowerCase()
                                .includes(
                                  this.state.querySearch.toLowerCase()
                                ) ||
                              node.category.title
                                .toLowerCase()
                                .includes(this.state.querySearch.toLowerCase())
                            ) {
                              console.log('yes', node.title);
                              return node;
                            }
                          })
                          .map(({ node }, index) => {
                            console.log(node);
                            return (
                              <Link key={index} to={node.slug}>
                                › {node.title.slice(0, 50)}...
                              </Link>
                            );
                          })}
                    </ListResults>
                  )}
                </SearchForm>
              </HeaderContainer>
            </TopHeader>
          );
        }}
      />
    );
  }
}

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Header;
