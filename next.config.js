/** @type {import('next').NextConfig} */
const nextConfig = {
    // images:{
    //     disableStaticImages:true
    // }
    reactStrictMode: false,
   images:{
    domains:['res.cloudinary.com'],
   }
   
}
module.exports = nextConfig
// export default nextConfig

// const nextConfig = {
//     // images:{
//     //     disableStaticImages:true
//     // }
//     reactStrictMode: false,
//     images:{
//         domains:['res.cloudinary.com'],
        
//     },
   
// }

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


