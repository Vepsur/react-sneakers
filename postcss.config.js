module.exports = {
  addons: [
    'storybook-addon-sass-postcss',
    {
      name: 'storybook-addon-sass-postcss',
      options: {
        rule: {
          test: /\.(scss|sass)$/i,
        },
      },
    },
  ]
}