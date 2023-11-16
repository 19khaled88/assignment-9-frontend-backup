/** @type {import('next').NextConfig} */
const nextConfig = {
    // images:{
    //     disableStaticImages:true
    // }
    reactStrictMode: false,
   images:{
    // domains:['res.cloudinary.com'],
    loader:'cloudinary',
    path:'https://res.cloudinary.com/be-fresh-ltd/image/upload/'
    // remotePatterns:[
    //     {
    //         protocol:'https',
    //         hostname:'res.cloudinary.com',
    //         pathname:'be-fresh-ltd/image/upload/**'
    //     }
    // ]
   }
   
}
module.exports = nextConfig
// export default nextConfig


// module.exports = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'res.cloudinary.com',
//           // You can add these as well
//           // port: '',
//           // pathname: 'arifscloud/image/upload/**',
//         },
//       ],
//     },
//   }


