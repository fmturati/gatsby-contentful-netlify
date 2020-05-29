import { Link, StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React, { Component } from "react"
import styled from "styled-components"

class Header extends Component {
  constructor() {
    super()
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


    const ListResults = styled.div`
    max-width: 370px;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 50px;
    z-index: 10;
    background: white;
    top: 70px;
    padding: 20px;
    box-shadow: 0px 1px 7px rgba(0,0,0,0.2);
}`

    const SearchForm = styled.div`
    list-style: none;
    margin: 0px;
    padding: 0px;
    align-items: center;
    width: 100%;
    max-width: 400px;
    `

    const InputSearch = styled.input`
    background: transparent;
    color: white;
    border: 1px solid #341258;
    border-top-left-radius: 5px;    
    border-bottom-left-radius: 5px;
    padding: 3px 10px;
    font-size: 16px;
    `

    const ButtonSearch = styled.button`
    background: #341258;
    color: white;
    padding: 3px;
    border: 1px solid transparent;
    margin: 0;
      border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
     `

    return <StaticQuery
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
      render={data => {
        // console.log(data);

        const learnings = data.allContentfulLearning.edges

        return (
          <>
            <header
              style={{
                background: `rebeccapurple`,
                marginBottom: `1.45rem`,
              }}
            >
              <div
                style={{
                  margin: `0 auto`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  maxWidth: 960,
                  padding: `1.45rem 1.0875rem`,
                }}
              >
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
                {/* <ul style={{ display: 'flex', listStyle: 'none', margin: '0px', padding: '0px', alignItems: 'center' }}> */}
                {/* <li style={{ margin: '0px', padding: '0px 20px' }}>
                    <Link
                      to="/about-me"
                      style={{
                        color: `white`,
                        textDecoration: `none`,
                      }}
                    >
                      About Me
                     </Link></li>
                  <li style={{ margin: '0px', padding: '0px 20px' }}>
                    <Link
                      to="/portfolio"
                      style={{
                        color: `white`,
                        textDecoration: `none`,
                      }}
                    >
                      Portfolio
             </Link>
                  </li> */}
                <div style={{
                  listStyle: 'none',
                  margin: '0px',
                  padding: '0px',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: '400px'
                }}>
                  <form onSubmit={(e) => this.handleSearch(e)} style={{ marginBottom: '0px' }}>
                    <input type="text" placeholder="Search for..." onChange={(e) => this.handleInputSearch(e)} style={{ width: '80%', padding: '3px 7px', border: '0' }} />
                    <ButtonSearch type="submit">Search</ButtonSearch>
                  </form>
                </div>

                {/* </ul> */}
              </div>
            </header>
            {
              this.state.querySearch &&
              <>


                <ListResults>



                  {this.state.querySearch && learnings.filter(({ node }) => {
                    if (this.state.querySearch === null) {
                      console.log('empty')
                      return node;
                    }
                    if (node.title.toLowerCase().includes(this.state.querySearch.toLowerCase()) || node.category.title.toLowerCase().includes(this.state.querySearch.toLowerCase())) {
                      console.log('yes', node.title)
                      return node;
                    }
                  }).map(({ node }) => {
                    console.log(node);
                    return (
                      <Link to={node.slug}>
                        {node.title}
                      </Link>
                    )
                  })}
                </ListResults>
              </>
            }
          </>
        )
      }}
    />



  }
}



// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Header;


// export const pageQuery = graphql`
//   query {
//     allContentfulLearning {
//       edges {
//         node {
//           title
//           slug
//           childContentfulLearningNotesRichTextNode {
//             childContentfulRichText {
//               html
//             }
//           }
//           category {
//             title
//             icon {
//               file {
//                 url
//               }
//             }
//             createdAt
//           }
//           type
//           updatedAt
//         }
//       }
//     }
//   }
// `
