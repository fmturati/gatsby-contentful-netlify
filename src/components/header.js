import { Link, StaticQuery, graphql } from 'gatsby';
import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const TopHeader = styled.div`
  background: linear-gradient(
    90deg,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );
  z-index: 10;
  position: relative;
  margin-bottom: 1.45rem;
`;

const HeaderContainer = styled.div`
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1020px;
  padding: 1.45rem 1.0875rem;


  h1 {
    color: white;
    text-decoration: none;
    
    a {
      font-size: 35px;
    }
  }
`;

const ListResults = styled.div`
max-width: 350px;
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
  max-width: 350px;
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

const DropDownMenu = styled.ul`
    margin: 0px;
    padding: 0;
    display: flex;
    flex-direction: column;
    width: 145px;
    position: absolute;
    background: white;
    top: 30px;
    right: 0;
    box-shadow: rgba(0,0,0,0.12) 0px 2px 15px;

    
    `

const DropDownMenuItem = styled.li`
    background: ${(props) => props.isOdd ? '#f9f9f9' : '#ffffff'};
    padding: 0;

    a {
      text-decoration: none;
      font-size: 14px;
      color: #808080 !important;     
      transition: all 0.2s ease;
      padding: 5px 10px !important;

      &:hover {
        text-decoration: underline;  
        transform: scale(1.01);
        transition: all 0.2s ease;
      }
    }    
  `

const TopMenu = styled.ul`
    display: flex;
    list-style: none;
    margin: 0px;
    padding: 0px;
    align-items: center;
    position: relative;
    
    li {
      margin: 0px;
      padding: 0 20px;
      color: #ffffff;
      text-decoration: none;
      cursor: pointer;
      display: flex;
      align-items: center;

      svg {
        margin-left: 5px;
      }

      a {
      color: #ffffff;
      text-decoration: none;
      padding: 0 20px;
      }
      
    }
    
    `

class Header extends Component {
  constructor() {
    super();
    this.state = {
      siteTitle: 'I Just Learned!',
      isSearch: false,
      querySearch: '',
      dropDownMenu: false
    };

    this.handleInputSearch = this.handleInputSearch.bind(this);
  }

  handleInputSearch = (e) => {
    this.setState({ querySearch: e.target.value });
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
                  category {
                    title
                    slug
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
            allContentfulCategory {
              edges {
                node {
                  updatedAt
                  title
                  slug
                }
              }
            }
          }
        `}
        render={(data) => {
          const learnings = data.allContentfulLearning.edges;
          const categories = data.allContentfulCategory.edges;
          console.log("Header -> render -> categories", categories)
          console.log("Header -> render -> learnings", learnings)

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
                <TopMenu>
                  <li>
                    <Link
                      to="/"

                    >
                      Home
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      console.log('clicked');
                      this.setState({ dropDownMenu: !this.state.dropDownMenu });
                    }}>
                    Categories <FontAwesomeIcon icon={faAngleDown} />
                    {this.state.dropDownMenu && <DropDownMenu>
                      {categories && categories.map(({ node }, index) => {
                        const isOdd = index % 2 === 0;
                        return (
                          <DropDownMenuItem isOdd={isOdd}>
                            <Link to={node.slug}>{node.title}</Link>
                          </DropDownMenuItem>
                        )
                      })}
                    </DropDownMenu>
                    }
                  </li>
                </TopMenu>

                <SearchForm>
                  <InputSearch
                    type="text"
                    placeholder="Search for..."
                    onChange={(e) => this.handleInputSearch(e)}
                  />

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



export default Header;
