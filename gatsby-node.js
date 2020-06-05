const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const learningPost = path.resolve(`./src/templates/learning-post.js`);
  const sitePages = path.resolve(`./src/templates/page-template.js`);
  const categoriesPage = path.resolve(`./src/templates/category-pages.js`);

  return graphql(`
    {
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
      allContentfulCategory {
        edges {
          node {
            updatedAt
            title
            slug
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
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // create the pages

    const learnings = result.data.allContentfulLearning.edges;
    const pages = result.data.allContentfulPages.edges;
    const categories = result.data.allContentfulCategory.edges;
    console.log("exports.createPages -> categories", categories)
    // console.log("exports.createPages -> learnings", learnings)

    learnings.forEach((learning, index) => {
      const previous =
        index === learnings.length - 1 ? null : learnings[index + 1].node;
      const next = index === 0 ? null : learnings[index - 1].node;

      createPage({
        path: learning.node.slug,
        component: learningPost,
        context: {
          slug: learning.node.slug,
          previous,
          next,
        },
      });
    });

    categories.forEach((category, index) => {
      console.log("exports.createPages -> category", category)
      const previous = index === categories.length - 1 ? null : categories[index + 1].node;
      const next = index === 0 ? null : categories[index - 1].node;


      createPage({
        path: category.node.slug,
        component: categoriesPage,
        context: {
          slug: category.node.slug,
          previous,
          next
        }
      })
    });



    pages.forEach((page, index) => {
      const previous =
        index === pages.length - 1 ? null : pages[index + 1].node;
      const next = index === 0 ? null : pages[index - 1].node;

      createPage({
        path: page.node.slug,
        component: sitePages,
        context: {
          slug: page.node.slug,
          previous,
          next,
        },
      });
    });
  });
};
