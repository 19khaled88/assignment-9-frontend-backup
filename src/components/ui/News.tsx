'use client'
import Image from "next/image"
import { ReactNode, useEffect, useState } from "react"
import basketBall from '../../../public/basket.jpg'
import badminton from '../../../public/badminton.jpg'
import cricket from '../../../public/cricket.jpg'
import football from '../../../public/football.jpg'
import hockey from '../../../public/hockey.jpg'
import volleyball from '../../../public/volleyball.jpg'

const news = [
    {
        id: 1,
        type: 'basketball',
        image: basketBall,
        title: "Timberwolves sting short-handed Heat, 106-90",
        news: "October 29 - Reserve Naz Reid scored 11 of his 25 points in the fourth quarter as the Minnesota Timberwolves pulled away down the stretch and beat the short-handed Miami Heat 106-90 on Saturday night. Minnesota won its eighth straight home opener by dominating the final 16-plus minutes. Tyler Herro's 3-pointer gave Miami a 70-68 lead with 4:47 remaining in the third period, but the Timberwolves took the lead for good at 72-70 when Kyle Anderson sank a floater with 3:31 remaining."
    },
    {
        id: 2,
        type: 'cricket',
        image: cricket,
        title: "Trials, treks and front-row seats to South ",
        news: "Air India 112 landed from London an hour and 15 minutes ago. After a dash to the ITC Maurya Hotel, I am in room 1530 with a tailor. There is bad if unsurprising news: off the back of me emailing some iffy measurements last month, the suit that is the ICC commentators' uniform for the tournament doesn't fit. He promptly measures most of me again, while his translator explains that the cutting rooms are an hour away but not to worry, they will be back at 8.30 with alterations and elegance assured. I find this difficult to believe, on both counts."
    },
    {
        id: 3,
        type: 'volley ball',
        image: volleyball,
        title: "The Polish star guided the Panthers to a ",
        news: "Since 2016-2017, Imoco have claimed the Supercoppa title a whopping seven times, only failing to do it in 2017-2018, then they fell to Igor Gorgonzola Novara and finished second. Milano, who played in the event for the first time, were the third different opponent beaten by the reigning Italian champions in the final."
    },
    {
        id: 4,
        type: 'badminton',
        image: badminton,
        title: "Watch: PV Sindhu, Carolina Marin clash ",
        news: "Sindhu, who has not been at her best in recent outings, endured a tough 18-21, 21-19, 7-21 defeat against Spain's Carolina Marin in the semifinals. Two-time Olympic medallist PV Sindhu's journey came to an end at the Denmark Open Super 750 tournament in Odense on Saturday. Sindhu, who has not been at her best in recent outings, endured a tough 18-21, 21-19, 7-21 defeat against Spain's Carolina Marin in the semifinals."
    },
    {
        id: 5,
        type: 'hockey',
        image: hockey,
        title: "Pastrnak gets 3 points, Bruins defeat ",
        news: "David Pastrnak had two goals and an assist for the Boston Bruins, who extended their season-opening point streak to eight games with a 4-1 win against the Detroit Red Wings at TD Garden on Saturday. Pavel Zacha and Charlie McAvoy scored, and Jeremy Swayman made 22 saves for Boston (7-0-1), which was coming off its first loss of the season on Thursday (4-3 in overtime to the Anaheim Ducks). “I thought that we neutralized their speed through their rush attack,” Bruins coach Jim Montgomery said. “I thought we protected our house from the back of the net and from the passes to the slot. It's a real gifted offensive team there, the Red Wings are, and I thought our focus on defense and our focus on offense, both of them, the game plan, the players went out and executed it great.”Joe Veleno scored his fifth goal in as many games, and Ville Husso made 27 saves for Detroit (5-3-1), which has lost three straight (0-2-1). "
    },
    {
        id: 6,
        type: 'football',
        image: football,
        title: "Pastrnak gets 3 points, Bruins defeat Red Wings",
        news: "David Pastrnak had two goals and an assist for the Boston Bruins, who extended their season-opening point streak to eight games with a 4-1 win against the Detroit Red Wings at TD Garden on Saturday. Pavel Zacha and Charlie McAvoy scored, and Jeremy Swayman made 22 saves for Boston (7-0-1), which was coming off its first loss of the season on Thursday (4-3 in overtime to the Anaheim Ducks). “I thought that we neutralized their speed through their rush attack,” Bruins coach Jim Montgomery said. “I thought we protected our house from the back of the net and from the passes to the slot. It's a real gifted offensive team there, the Red Wings are, and I thought our focus on defense and our focus on offense, both of them, the game plan, the players went out and executed it great.”Joe Veleno scored his fifth goal in as many games, and Ville Husso made 27 saves for Detroit (5-3-1), which has lost three straight (0-2-1). "
    }
]

// const randomElement = Math.floor(Math.random() * news.length);





const News = () => {
    const [newsValue, setNewsValue] = useState<Record<string, unknown>[]>([])
    const [isLoading, setIsLoading] = useState(true)
    
    
    const showRecentNews = (selected: any) => {
    
        let array: any[] = []
        selected?.map((item: any, index: number) => {
            array.push(
                <div key={index} className="flex flex-col gap-2 w-2/3 mx-auto md:w-full h-72">
                    <Image src={item.image} alt="No Image" width={500} height={200} className="w-full h-52"/>
                    <p>{item.title}</p>
                </div>
            )
        })
        return array
    }
    useEffect(()=>{
        const shuffled = news.sort(() => 0.5 - Math.random());

        // Get sub-array of first n elements after shuffled
        let selected = shuffled.slice(0, 3);
        setNewsValue(selected)
        setIsLoading(false)
    },[news])


    
    return (
        <div className="flex flex-col  mx-5 lg:mx-0 xl:mx-0 mb-8">
            <h1 className="text-center py-5 text-3xl font-bold text-gray-500" data-aos="zoom-in">Weekly news updates</h1>
            <div className=" grid md:grid-rows2 lg:grid-cols-5 xl:grid-cols-3 gap-4 mx-3">
                <div className="lg:col-span-3 xl:col-span-2">
                    <p className="text-gray-400 text-xl pb-5">Recent news</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {
                            showRecentNews(newsValue)
                        }
                    </div>
                </div>
                <div className="lg:col-span-2 xl:col-span-1">
                    <p className="text-gray-400 text-xl pb-5">Top stories</p>
                    <ul className="flex flex-col gap-1">
                        <li className="underline text-gray-400">McDavid likely to return for Heritage Classic</li>
                        <li className="underline text-gray-400">Thornton retires from NHL after 24 seasons</li>
                        <li className="underline text-gray-400">Miller scores in OT, Rangers edge Canucks</li>
                        <li className="underline text-gray-400">Flames seek spark to reset season in Heritage Classic</li>
                        <li className="underline text-gray-400">Josi scores in OT to give Predators win against Maple Leafs</li>
                        <li className="underline text-gray-400">Varlamov, Islanders shut out Blue Jackets</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default News