/** @type {import('next').NextConfig} */
const nextConfig = {
    // images:{
    //     disableStaticImages:true
    // }
    reactStrictMode: false,
    images:{
        domains:['res.cloudinary.com'],
        loader:'cloudinary',
        path:'https://api.cloudinary.com/v1_1/be-fresh-ltd/image/upload'
    },
   
}

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

module.exports = nextConfig
