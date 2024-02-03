const RSS = require('rss');

function generateRssFeed(newsData) {
  const feed = new RSS({
    title: 'Your News Site',
    description: 'Latest news from Your News Site',
    feed_url: 'https://yournews.site/rss',
    site_url: 'https://yournews.site',
  });

  newsData.forEach((article) => {
    feed.item({
      title: article.title,
      description: article.description,
      url: article.link,
      date: article.pubDate,
    });
  });

  return feed.xml();
}

exports.rss = functions.https.onRequest((req, res) => {
    const newsData = [
      // Your news articles data
    ];
  
    const xml = generateRssFeed(newsData);
  
    res.set('Content-Type', 'text/xml');
    res.send(xml);
  });