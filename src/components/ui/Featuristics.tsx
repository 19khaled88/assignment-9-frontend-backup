import Image from "next/image"
import elder_community from '../../../public/elderly_community.jpg'
import gymnastics from '../../../public/gymnastics.jpg'
import skilled_player from '../../../public/skilled_player_hunts.jpg'
import youth_talent_group from '../../../public/youth_talent_group.jpg'
import feature from '../../../public/feature-removebg-preview.png'
const Featuristics = () => {
    return (
        <div className="flex flex-col pt-16 justify-items-center justify-center pb-10 relative">
            <h1 className="text-center  py-5 pl-16 md:pl-0 text-lg md:text-2xl font-bold text-gray-500">Features, We are working on</h1>
            <Image
                src={feature}
                alt="No Image"
                width={200}
                height={200}
                className="absolute w-32 lg:w-48 xl:w-52 top-10 lg:top-4 xl:top-4 left-6 lg:-left-16 xl:-left-16"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-24 md:gap-20 lg:gap-16 xl:gap-5 pr-10 pl-10 lg:pl-32 xl:pl-32 pt-20">
                <div className="border border-gray-400 p-5 relative">
                    <Image src={gymnastics} width={100} height={200} alt="No Image" className="absolute  -top-12 m-auto left-0 right-0 h-24 w-4/5 md:w-4/5 lg:w-4/5 xl:w-4/5" />
                    <div className="pt-16">
                        <h1 className="font-bold text-gray-500">gymnastics</h1>
                        <p className="text-sm">Our commitment is to help you to be a successful gymnastic, and start journey national-wide </p>
                    </div>
                </div>
                <div className="border border-gray-400 p-5 relative">
                    <Image src={elder_community} width={70} height={70} alt="No Image" className="absolute  -top-12 m-auto left-0 right-0 h-24 w-4/5 md:w-4/5 lg:w-4/5 xl:w-4/5" />
                    <div className="pt-16">
                        <h1 className="font-bold text-gray-500">Elderly club</h1>
                        <p className="text-sm">The aim of this club is to give friendship and remove loneliness from elder citizens</p>
                    </div>
                </div>
                <div className="border border-gray-400 p-5 relative">
                    <Image src={youth_talent_group} alt="No Image" width={70} height={70} className="absolute  -top-12 m-auto left-0 right-0 h-24 w-4/5 md:w-4/5 lg:w-4/5 xl:w-4/5" />
                    <div className="pt-16">
                        <h1 className="font-bold text-gray-500">Youth talent group</h1>
                        <p className="text-sm">Younger talents are really asset for a country</p>
                    </div>
                </div>
                <div className="border border-gray-400 p-5 relative">
                    <Image src={skilled_player} alt="No Image" width={70} height={70} className="absolute  -top-12 m-auto left-0 right-0 h-24 w-4/5 md:w-4/5 lg:w-4/5 xl:w-4/5" />
                    <div className="pt-16">
                        <h1 className="font-bold text-gray-500">Skilled player hunts</h1>
                        <p className="text-sm">We are in leading for future skilled player</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Featuristics