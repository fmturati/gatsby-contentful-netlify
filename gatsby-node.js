const path = require('path');

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    const learningPost = path.resolve(`./src/templates/learning-post.js`);
    const sitePages = path.resolve(`./src/templates/page-template.js`);

    return graphql(`
    {
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
          allContentfulPages {
            edges {
              node {
                id
                slug
                title
                featureImage {
                  file {
                    fileName
                    url
                  }
                }
                childContentfulPagesContentRichTextNode {
                  childContentfulRichText {
                    html
                  }
                }
                content {
                  childContentfulRichText {
                    html
                  }
                }
              }
            }
          }
    }
    
    
    
    `).then(result => {
        if (result.errors) {
            throw result.errors
        }

        // create the pages

        const learnings = result.data.allContentfulLearning.edges
        // console.log("exports.createPages -> learnings", learnings)

        learnings.forEach((learning, index) => {
            const previous = index === learnings.length - 1 ? null : learnings[index + 1].node
            const next = index === 0 ? null : learnings[index - 1].node

            createPage({
                path: learning.node.slug,
                component: learningPost,
                context: {
                    slug: learning.node.slug,
                    previous,
                    next
                }

            })
        })

        const pages = result.data.allContentfulPages.edges
        console.log("exports.createPages -> pages", pages)
        // console.log("exports.createPages -> learnings", learnings)

        pages.forEach((page, index) => {
            const previous = index === pages.length - 1 ? null : pages[index + 1].node
            const next = index === 0 ? null : pages[index - 1].node

            createPage({
                path: page.node.slug,
                component: sitePages,
                context: {
                    slug: page.node.slug,
                    previous,
                    next
                }

            })
        })
    })
}


// exports.createPages = ({ graphql, actions }) => {
//     const { createPage } = actions;

//     const sitePages = path.resolve(`./src/templates/page-template.js`);
//     return graphql(`
//         {
//         allContentfulPages {
//             edges {
//               node {
//                 id
//                 slug
//                 title
//                 featureImage {
//                   file {
//                     fileName
//                     url
//                   }
//                 }
//                 childContentfulPagesContentRichTextNode {
//                   childContentfulRichText {
//                     html
//                   }
//                 }
//                 content {
//                   childContentfulRichText {
//                     html
//                   }
//                 }
//               }
//             }
//           }
//     } `).then(result => {
//         if (result.errors) {
//             throw result.errors
//         }

//         // create the pages

//         const pages = result.data.allContentfulPages.edges
//         console.log("exports.createPages -> pages", pages)
//         // console.log("exports.createPages -> learnings", learnings)

//         pages.forEach((page, index) => {
//             const previous = index === pages.length - 1 ? null : pages[index + 1].node
//             const next = index === 0 ? null : pages[index - 1].node

//             createPage({
//                 path: page.node.slug,
//                 component: sitePages,
//                 context: {
//                     slug: page.node.slug,
//                     previous,
//                     next
//                 }

//             })
//         })
//     })
// }
