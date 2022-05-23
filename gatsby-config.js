require('dotenv').config({
  path: '.env.production'
})

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
module.exports = {
  siteMetadata: {
    quotes: [
      { text: 'A nice blend of prediction and surprise seem to be at the heart of the best art.', name: 'Wendy Carlos' },
      { text: 'There is no such thing as an empty space or an empty time. There is always something to see, something to hear. In fact, try as we may to make a silence, we cannot.', name: 'John Cage' },
      { text: 'I don’t have a theoretical language for music. I’m really inspired by sculpture, so I like to say, ‘you’re not making music, you’re creating a space. You’re building a room, putting some objects in it, and seeing what happens to the objects over time.', name: 'Daniel Lopatin' },
      { text: 'Music changes, and I’m gonna change right along with it.', name: 'Aretha Franklin' },
      { text: 'Ignore all hatred and criticism. Live for what you create, and die protecting it.', name: 'Lady Gaga' },
      { text: 'Don’t play what’s there, play what’s not there.', name: 'Miles Davis' },
      { text: 'A lot of artists who have a certain style are expected to more or less keep doing their style. It’s so easy to get into that rut of production.', name: 'Laurie Anderson' },
      { text: 'In music, you CAN crash your plane and walk away from it.', name: 'Brian Eno' },
      { text: 'A lot of people give up, but you can’t stop me. If you close the door, I’ll just jump out the window.', name: 'Diane Warren' },
      { text: 'If you feel safe in the area you’re working in, you’re not working in the right area. Always go a little further into the water than you feel you’re capable of being in. Go a little bit out of your depth. And when you don’t feel that your feet are quite touching the bottom, you’re just about in the right place to do something exciting.', name: 'David Bowie' },
      { text: 'The people who make it to the top – whether they’re musicians, or great chefs, or corporate honchos – are addicted to their calling … [they] are the ones who’d be doing whatever it is they love, even if they weren’t being paid.', name: 'Quincy Jones' },
      { text: 'Eventually you get to this point where you understand what you want to do, and get across, and sound like.', name: 'Kendrick Lamar' }
    ]
  },
  /* Your site config here */
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/dashboard/*', '/forum/*'] }
    },
    {
      resolve: 'gatsby-source-git',
      options: {
        name: 'preset-repo',
        remote: 'https://github.com/polarity/bitwig-community-presets.git',
        branch: 'master',
        // Only import the docs folder from a codebase.
        patterns: 'discord-presets/**'
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: require.resolve('./src/components/layout-wiki/index.js')
      }
    },
    {
      resolve: 'gatsby-source-rss-feed',
      options: {
        url: 'https://www.youtube.com/feeds/videos.xml?playlist_id=PLyCfny1Hc_bvfJ33U-3DN4H37gw9cIYTi',
        name: 'Gridniks'
      }
    }
  ]
}
