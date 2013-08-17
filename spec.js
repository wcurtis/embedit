
/**
 * Embedit.io
 * Embed any content on the web in a simple and consistant way
 *
 * Domains to support
 * Youtube
 * Vine
 * Instagram
 * Any (follow redirects and grab meta)
 * 
 * Eventaully
 * Vimeo
 * Dailymotion
 * .jpg/.png/etc direct link
 * .mov/.avi/etc direct link
 * Instagram video
 * Twitter
 * Facebook
 */




/**
 * Youtube
 * Eg. http://www.youtube.com/watch?v=rtUcsroeucg
 *
 * Resources
 * http://gdata.youtube.com/feeds/api/videos/rtUcsroeucg?v=2&prettyprint=true&alt=json
 */
api.embedit.io/page?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DrtUcsroeucg%0A
{
  title: "Kelso's Kosher Burn",
  description: "disclaimer - DONT OWN ANY OF THIS!!!!",
  images: [
    {
      url: "http://i1.ytimg.com/vi/rtUcsroeucg/default.jpg",
      height: 90,
      width: 120,
    },
    {
      url: "http://i1.ytimg.com/vi/rtUcsroeucg/mqdefault.jpg",
      height: 180,
      width: 320,
    },
    {
      url: "http://i1.ytimg.com/vi/rtUcsroeucg/hqdefault.jpg",
      height: 360,
      width: 480,
    }
  ],

  caption: "Kelso's Kosher Burn",
  thumbnail: "http://i1.ytimg.com/vi/rtUcsroeucg/default.jpg",
  media: "http://www.youtube.com/v/rtUcsroeucg",
  embed: '<iframe width="560" height="315" src="//www.youtube.com/embed/rtUcsroeucg" frameborder="0" allowfullscreen></iframe>',
  mediaType: "video",
  sourceType: "youtube",
  sourceId: "rtUcsroeucg",
  sourceDomain: "youtube.com",
  shortUrl: "http://youtu.be/rtUcsroeucg"
}

/**
 * Instagram
 * Eg. http://instagram.com/p/cIuIvBrOXp
 * 
 * Resources
 * http://stackoverflow.com/questions/12682039/how-can-i-get-an-direct-instagram-link-from-a-twitter-entity
 * http://instagram.com/developer/embedding/
 */
api.embedit.io/page?url=http%3A%2F%2Finstagram.com%2Fp%2FcIuIvBrOXp
{
  title: "",
  description: "Fun cooking dinner al fresco tonight for the fam:heirloom caprese salad,grilled corn w/chile coconut lime aoli&spicy chicken sausage.Don't leave,summer.Please.",
  images: [
    url: "http://distilleryimage1.ak.instagram.com/54ab7430f41e11e2956c22000aa802b4_6.jpg"
  ],

  caption: "Fun cooking dinner al fresco tonight for the fam:heirloom caprese salad,grilled corn w/chile coconut lime aoli&spicy chicken sausage.Don't leave,summer.Please.",
  thumbnail: "http://distilleryimage1.ak.instagram.com/54ab7430f41e11e2956c22000aa802b4_6.jpg",
  media: "http://distilleryimage1.ak.instagram.com/54ab7430f41e11e2956c22000aa802b4_6.jpg",
  embed: '<iframe src="//instagram.com/p/cIuIvBrOXp/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
  mediaType: "image",
  sourceType: "instagram",
  sourceId: "cIuIvBrOXp",
  sourceDomain: "instagram.com"
  shortUrl: "http://instagr.am/p/cIuIvBrOXp"
}

/**
 * Vine
 * Eg. https://vine.co/v/hWEgv65gzTr
 * 
 * Resources
 * http://halgatewood.com/php-get-vine-app-video-thumbnail/
 */
api.embedit.io/page?url=https%3A%2F%2Fvine.co%2Fv%2FhWEgv65gzTr
{
  title: "Oh Canada. #cottagelife",
  description: "",
  images: [
    url: "https://v.cdn.vine.co/r/thumbs/05E846C17F965433176732385280_1373131034695_image_pdTUSSV726looRjG12351337643.9GBDQ2FqkUT5W0ghbr3ab8VzmQFSjIeTiN82KNkY6HNGWS.jpg"
  ],

  caption: "Oh Canada. #cottagelife",
  thumbnail: "https://v.cdn.vine.co/r/thumbs/05E846C17F965433176732385280_1373131034695_image_pdTUSSV726looRjG12351337643.9GBDQ2FqkUT5W0ghbr3ab8VzmQFSjIeTiN82KNkY6HNGWS.jpg"
  media: "https://v.cdn.vine.co/r/videos/65486D17CF965433169564291072_13731310346954aa3242953.mp4_PBp72RgKSbicNpR2bEyma.9vAA1bIy0iceydUKCr7sLJEZQMtyoh9Mzw8mnwbxk1.mp4",
  embed: '<iframe class="vine-embed" src="https://vine.co/v/hWEgv65gzTr/embed/simple" width="600" height="600" frameborder="0"></iframe><script async src="//platform.vine.co/static/scripts/embed.js" charset="utf-8"></script>',
  mediaType: "video",
  sourceType: "vine",
  sourceId: "hWEgv65gzTr",
  sourceDomain: "vine.co"
  shortUrl: "https://vine.co/v/hWEgv65gzTr"
}


