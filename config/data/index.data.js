export default {
  template: '!!ejs-compiled-loader!src/index.ejs',
  minify: { collapseWhitespace: true, removeComments:true, minifyCSS: true, minifyJS: true },
  prefix: 'cv',
  head: {
    title: 'Mariano Alvarez | FE Dev',
    ogType: 'website',
    ogUrl: 'http://mahcr.github.io/',
    ogImg: '',
  },
  img: 'src/app/assets/imgs/me.jpg',
  imgAlt: 'Mariano Alvarez Profile image',
  figureCaption: 'Yep, That\'s me :D',
  name: 'Mariano Alvarez',
  jobTitle: 'Front-End Dev',
  passion: 'Love: ',
  description: 'I\'m a Front-End developer who love Javascript and new technologies. I consider myself as a easy going person and with a spark of fun. Some of my hobbies are: Play Xbox, go to off-road rides and discover new beers.',
  social: {
    linkedin: 'https://www.linkedin.com/in/mahcr',
    mail: 'mailto:malvarezhcr@gmail.com'
  }
}
