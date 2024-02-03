const RSS = require('rss');
const fs = require('fs');
const filePath ='./Available-articles/articles.txt';
const newsData = fs.readFileSync(filePath,"utf8").split(/\r?\n/);
console.log(newsData);
function generateRssFeed(newsData) {
  const feed = new RSS({
    title: 'Heavy Local',
    description: 'Latest news from Heavy Local',
    feed_url: 'https://heavy-local.com/rss',
    site_url: 'https://heavy-local.com',
  });
  newsData.forEach((article) => {
    console.log( 'https://heavy-local.com/articles/'+ article+'.json');
    if(!article){
      return;
    }
    fetch('https://heavy-local.com/articles/'+ article+'.json')
    .then(async response => {
        feed.item({
      title: response.title,
      description: response.description,
      url: "https://heavy-local.com/articles/" + article,
      date: article.date,
    });
    
       response = await response.json();
      console.log(response)
    }).catch(console.log)
  
  });

  return feed.xml();
}
exports.rss = functions.https.onRequest((req, res) => {
    const xml = generateRssFeed(newsData);
  
    res.set('Content-Type', 'text/xml');
    res.send(xml);
  });